# Môi trường local trên Windows/PowerShell

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
| Validation và auth | Zod, jose/HS256 và scrypt bất đồng bộ của Node. Hash, thủ tục thay khóa JWT local và ký cookie Guest đã chốt theo DEC-014. | Chi tiết HTTP theo DEC-017. [Xác thực](../architecture/security-and-media.md). |
| DB và migration | Baseline PostgreSQL 18.7, `pg.Pool`, SQL tham số hóa, `node-pg-migrate` | Một pool cho backend, tối đa 5 kết nối và 3 giây chờ kết nối. [Schema chín bảng](../architecture/data-model.md#target-model). |
| Test và lint | `node:test`, HTTP `fetch`, DB thử riêng và ESLint | Test bootstrap dùng fixture rollback. Giả lập Resend thuộc test của luồng auth khi có endpoint. |
| Email | Resend HTTPS qua `fetch` | Tài khoản, API key và domain gửi xác minh cần khi bật OTP thật. |
| Media | Filesystem của máy chạy backend. Thêm Multer 2.5.0, ffprobe/FFmpeg 8.1.3 và Sharp 0.35.5 ở mốc upload. | Các công cụ và [giới hạn xử lý](../architecture/security-and-media.md#upload-kiem-tra-file-va-duration) đã chọn ở mức đặc tả. |

## Biến môi trường

Tạo `.env` từ [`.env.example`](../../backend/.env.example) trong `backend/` khi chưa có file cấu hình. Điền URL của PostgreSQL 18 dành riêng cho Soundwave. Với test, đặt `TEST_DATABASE_URL` trong `.env.test` hoặc truyền qua môi trường đến một DB thử riêng. Giữ biến khóa JWT/OTP và Resend trống trong giai đoạn bootstrap. Backend dùng `APP_ORIGIN` ở dạng origin HTTP(S) chính tắc, ví dụ `http://127.0.0.1:3000`.

| Biến | Vai trò |
| --- | --- |
| `HOST`, `PORT` | Local mặc định bind `127.0.0.1:3000`; Express tắt `trust proxy`. |
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

## Demo local và dữ liệu bền vững

Demo dùng HTTP loopback. Khi có frontend dev proxy, cấu hình `APP_ORIGIN` theo origin mà trình duyệt truy cập. Gửi OTP thật từ máy local cần Internet và tài khoản, API key, domain gửi xác minh của Resend. Kiểm thử tích hợp dùng Resend giả lập. Triển khai online, backup/restore và hạn mức OTP theo IP thuộc hướng mở rộng. [ADR-0010](../decisions/adr-0010-local-runtime-scope.md).

Audio và ảnh lưu trên filesystem của máy chạy backend, bền qua restart, vùng tạm và chính thức cùng filesystem. Audio phục vụ qua API-28/29. [Vòng đời file](../architecture/security-and-media.md#file-lifecycle) sở hữu commit, đối chiếu và dọn lỗi. Phiên DB còn hạn tồn tại qua restart; cooldown lượt nghe giữ bảy ngày.

## SQL và thứ tự triển khai

`node-pg-migrate` chạy [một migration](../../backend/migrations/20261120000000000_create-initial-schema.js) để tạo chín bảng nghiệp vụ trên PostgreSQL 18 trống. Nếu đã có DB dùng migration bootstrap ba bảng, giữ DB đó và trỏ `DATABASE_URL` hoặc `TEST_DATABASE_URL` sang một DB trống riêng cho baseline mới. Seed demo chạy riêng. SQL cũ có `DROP TABLE ... CASCADE` và `TRUNCATE ... RESTART IDENTITY CASCADE`. [ADR-0007](../decisions/adr-0007-single-initial-database-migration.md), [schema khởi tạo](../architecture/data-model.md#target-model).

Thứ tự triển khai là migration cho phép `otp_challenges.request_ip` nhận `NULL` → đăng ký/OTP/login → Creator → upload/nghe → tìm kiếm → playlist. Kiểm thử từng luồng. Migration bổ sung, quy trình đo local, bộ demo và recovery file theo DEC-015/020/022. [Thay đổi schema](../architecture/data-model.md#reset-request-ip-storage).
