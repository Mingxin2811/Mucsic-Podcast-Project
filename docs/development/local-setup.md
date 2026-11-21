# Môi trường local và chuẩn bị online

Bootstrap gồm manifest/lockfile, cấu hình local, entrypoint HTTP và migration đầu tiên. Baseline Node.js 24.22.3 LTS/PostgreSQL 18.7 theo ADR-0006. Lần kiểm tra trên máy dùng Node.js 24.14.1/npm 11.11.0/PostgreSQL 18.4. [Manifest](../../backend/package.json), [lockfile](../../backend/package-lock.json), [kết quả kiểm chứng](../project/status.md#backend-bootstrap-run-2026-11-18).

## Kiểm kê chỉ đọc

```powershell
git status --short
Get-ChildItem backend -Recurse -Force
Get-Content -Encoding UTF8 database/schema.sql
Get-Content -Encoding UTF8 database/seed_data.sql
```

## Bộ công cụ đích

| Phần | Đã chọn | Còn thiếu |
| --- | --- | --- |
| Runtime | Node.js 24.22.3 LTS, Express 5, JavaScript ESM và npm | Chạy `npm ci` để cài phiên bản đã khóa tại `backend/`. |
| Validation và auth | Zod, jose/HS256 và scrypt bất đồng bộ của Node | Wire, cookie Domain và Origin chi tiết còn DEC-017. [Định dạng hash và khóa](../architecture/security-and-media.md). |
| DB và migration | Baseline PostgreSQL 18.7, `pg.Pool`, SQL tham số hóa, `node-pg-migrate` | Một pool cho backend, tối đa 5 kết nối và 3 giây chờ kết nối. [Schema chín bảng](../architecture/data-model.md#target-model). |
| Test và lint | `node:test`, HTTP `fetch`, DB thử riêng và ESLint | Test bootstrap dùng fixture rollback. Giả lập Resend thuộc test của luồng auth khi có endpoint. |
| Email | Resend HTTPS qua `fetch` | Tài khoản, API key và domain gửi xác minh cần khi bật OTP thật. |
| Media | Filesystem bền vững và tên UUID. Bổ sung Multer ghi tạm, ffprobe/FFmpeg và Sharp khi làm upload. | Phiên bản, timeout, concurrency, giới hạn ảnh và recovery state còn DEC-014/022. |

## Biến môi trường

Tạo `.env` từ [`.env.example`](../../backend/.env.example) trong `backend/` khi chưa có file cấu hình. Điền URL của PostgreSQL 18 dành riêng cho Soundwave. Với test, đặt `TEST_DATABASE_URL` trong `.env.test` hoặc truyền qua môi trường đến một DB thử riêng. Giữ biến khóa JWT/OTP và Resend trống trong giai đoạn bootstrap. Backend dùng `APP_ORIGIN` ở dạng origin HTTP(S) chính tắc, ví dụ `http://127.0.0.1:3000`.

| Biến | Vai trò |
| --- | --- |
| `HOST`, `PORT` | Local mặc định bind `127.0.0.1:3000`. |
| `APP_ORIGIN` | Origin trình duyệt truy cập. Khi có proxy `/api`, dùng origin frontend từ góc nhìn trình duyệt. |
| `DATABASE_URL` | URL PostgreSQL cho backend và migration thông thường. |
| `TEST_DATABASE_URL` | URL DB riêng cho test, bắt buộc khi chạy test tích hợp. |
| `JWT_ISSUER`, `JWT_AUDIENCE` | Giá trị đã chọn là `soundwave-api` và `soundwave-web`. |
| `JWT_SECRET_BASE64URL`, `OTP_HMAC_SECRET_BASE64URL` | Mỗi biến mã hóa 32 byte ngẫu nhiên. Dùng khóa riêng theo mục đích và môi trường. |
| `RESEND_API_KEY`, `RESEND_FROM` | Khóa gửi email và địa chỉ gửi khi bật OTP thật. |

## Lệnh tại `backend/`

| Lệnh | Hành vi |
| --- | --- |
| `npm run dev` | Đọc `.env` và chạy Node watch. Kiểm tra kết nối DB trước khi lắng nghe HTTP. |
| `npm start` | Chạy backend với biến môi trường cấp cho process. |
| `npm run migrate` | Đọc `.env` nếu có, lấy `DATABASE_URL` rồi chạy các migration còn thiếu trong transaction với khóa migration. Chạy riêng trước khi khởi động app. |
| `npm test` | Đọc `.env.test` nếu có, yêu cầu `TEST_DATABASE_URL`, áp migration lên DB thử rồi chạy `node:test` và HTTP `fetch`. Chạy tuần tự, fixture dữ liệu được rollback. |
| `npm run lint` | Chạy ESLint trên mã backend. |

Sau khi chuẩn bị DB local và `.env`, dùng `npm ci`, `npm run migrate` rồi `npm run dev`. Bootstrap trả HTTP 404 ở `/` vì chưa có route nghiệp vụ. Khi `DATABASE_URL` cũng có mặt, test từ chối URL thử trùng host, port và tên DB. Dùng DB thử riêng cho mỗi lần chạy đồng thời ở các tiến trình khác nhau. [Kiểm thử bootstrap](../../backend/test/bootstrap.test.js).

## Online và dữ liệu bền vững

HTTPS/cùng origin; chỉ tắt Secure cho HTTP local. Resend cần tài khoản/API key/domain gửi xác minh, chưa tạo/mua. Hosting/domain sản phẩm/TLS/volume/chi phí/backup còn DEC-014/016; không cam kết online miễn phí/offline hoàn toàn.

Audio local là máy chủ/bền qua restart-deploy, temp/final cùng filesystem/API-28/29 trạng thái-Range-no-store/không static bypass. [Lifecycle](../architecture/security-and-media.md#file-lifecycle) sở hữu commit/đối chiếu/dọn startup-30 phút->24 giờ/bỏ active-tham chiếu-soft delete/DB lỗi hoãn. Phiên DB bền restart. Cooldown lượt nghe giữ bảy ngày rồi dọn, lịch/cơ chế job chưa chọn, không nhầm lịch dọn file.

## SQL và thứ tự triển khai

`node-pg-migrate` chạy [một migration](../../backend/migrations/20261120000000000_create-initial-schema.js) để tạo chín bảng nghiệp vụ trên PostgreSQL 18 trống. Nếu đã có DB dùng migration bootstrap ba bảng, giữ DB đó và trỏ `DATABASE_URL` hoặc `TEST_DATABASE_URL` sang một DB trống riêng cho baseline mới. Seed demo chạy riêng. SQL cũ có `DROP TABLE ... CASCADE` và `TRUNCATE ... RESTART IDENTITY CASCADE`. [ADR-0007](../decisions/adr-0007-single-initial-database-migration.md), [schema khởi tạo](../architecture/data-model.md#target-model).

Thứ tự triển khai sau migration là đăng ký/OTP/login → Creator → upload/nghe → tìm kiếm → playlist. Kiểm thử từng luồng. Bộ demo, điều kiện nghiệm thu/restore và giới hạn/recovery media còn DEC-014/015/016/020/022.
