# Môi trường local và chuẩn bị online

Chưa có manifest/entrypoint/lockfile/runtime/test suite. Lựa chọn CONFIRMED 17/11/2026 tại [DEC](../decisions/open-decisions.md#evidence-simple-2026-11-17), chưa cài/chạy. [Hiện trạng](../project/status.md#simple-sync-2026-11-17), [ADR-0005](../decisions/adr-0005-simple-backend-contracts.md).

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
| Runtime | Node.js 24 LTS/Express 5/JavaScript ESM/npm | Stable tương thích/version-lockfile lúc bootstrap |
| Validation/upload/JWT | Zod/Multer ghi temp/jose HS256 | Versions/multipart/errors |
| Password | scrypt async Node, N=32768,r=8,p=3,maxmem=64 MiB/salt riêng/lưu thông số | Định dạng hash/salt |
| DB | PostgreSQL 18 minor được hỗ trợ/pg.Pool/SQL tham số hóa | Connection/pool config/schema vật lý |
| Migration | node-pg-migrate | Version/lệnh/migration chưa tạo |
| Test/lint | node:test/fetch/DB thử riêng/ESLint | Config/fixture/lệnh chưa tồn tại |
| Local | Node watch/proxy /api cùng origin | Port/bind/proxy config; không đặc tả frontend |
| Email | Resend HTTPS/fetch | Tài khoản/API key/domain gửi xác minh chưa có |
| Media | Filesystem bền vững/ffprobe/FFmpeg/Sharp/UUID | Versions/timeout/concurrency/ảnh/active-recovery state |
| Auth | soundwave_session/HttpOnly/SameSite=Lax/path=/, Secure online/X-CSRF-Token phiên | Domain/CSRF response-lifecycle/Origin policy chi tiết |

HS256 secret ngẫu nhiên >=32 byte qua môi trường, OTP HMAC secret riêng. Cấu hình cần DB/HTTP/origin/issuer-audience/JWT-OTP secrets/Resend-key-from-domain/temp-final/backup; tên biến còn DEC-014. Không ghi bí mật thật hoặc tạo .env.example trong tác vụ docs.

## Script chọn về mục đích, chưa có lệnh ứng dụng

| Script đích | Mục đích |
| --- | --- |
| dev | Node watch local |
| start | Backend process |
| test | node:test/HTTP fetch/DB thử riêng |
| lint | ESLint |
| migrate | node-pg-migrate/versioned migration |

Chưa package.json nên chưa có npm install/dev/test/migrate áp dụng ngay. Bổ sung lệnh/log sau bootstrap; bảng này không chứng minh đã chạy.

## Online và dữ liệu bền vững

HTTPS/cùng origin; chỉ tắt Secure cho HTTP local. Resend cần tài khoản/API key/domain gửi xác minh, chưa tạo/mua. Hosting/domain sản phẩm/TLS/volume/chi phí/backup còn DEC-014/016; không cam kết online miễn phí/offline hoàn toàn.

Audio local là máy chủ/bền qua restart-deploy, temp/final cùng filesystem/API-28/29 trạng thái-Range-no-store/không static bypass. [Lifecycle](../architecture/security-and-media.md#file-lifecycle) sở hữu commit/đối chiếu/dọn startup-30 phút->24 giờ/bỏ active-tham chiếu-soft delete/DB lỗi hoãn. Phiên DB bền restart. Cooldown lượt nghe giữ bảy ngày rồi dọn, lịch/cơ chế job chưa chọn, không nhầm lịch dọn file.

## SQL và thứ tự triển khai

Chuỗi migration dùng `node-pg-migrate` để dựng [schema đích](../architecture/data-model.md#target-model), bắt đầu từ PostgreSQL 18 trống theo [DEC-022](../decisions/open-decisions.md#evidence-initial-migration-2026-11-18). Seed demo chạy riêng khi có tác vụ tương ứng. SQL cũ có `DROP TABLE ... CASCADE` và `TRUNCATE ... RESTART IDENTITY CASCADE`. Hiện chưa có file migration hoặc lệnh migrate đã kiểm chứng.

Thứ tự chấp nhận: bootstrap/migration → đăng ký/OTP/login → Creator → upload/nghe → tìm kiếm → playlist; kiểm thử từng luồng. Hoàn tất chi tiết OPEN thật sự phụ thuộc trước triển khai; ghi version/lệnh/config thực. Bộ demo DEC-020/nghiệm thu-restore DEC-015/016/media limits-recovery DEC-014/022 còn thiếu, mock không thay nghiệm thu thật.
