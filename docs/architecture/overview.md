# Kiến trúc backend và ranh giới hệ thống

Lựa chọn kiến trúc được ghi tại [sổ DEC](../decisions/open-decisions.md). Chi tiết chưa chọn còn `DRAFT`. Bootstrap HTTP và migration chín bảng đã chạy trong môi trường thử. [Kết quả kiểm chứng](../project/status.md#single-database-migration-2026-11-20).

## Thành phần

```mermaid
flowchart LR
    C[Ben su dung API] -->|HTTPS va cookie| B[Backend REST]
    B --> A[Xac thuc phien va quyen hien tai]
    B --> N[Nghiep vu va quyen so huu]
    A --> D[(PostgreSQL 18)]
    N --> D
    N --> M[Filesystem ben vung may chu]
    B --> E[Dich vu gui email that]
```

Sơ đồ là kiến trúc đích, không phải các service/module đã có. Bộ docs không đặc tả màn hình hoặc triển khai frontend; cùng origin/cookie là ràng buộc tích hợp HTTP.

| Thành phần | Lựa chọn/trách nhiệm | Giới hạn |
| --- | --- | --- |
| HTTP backend | Node.js 24.22.3 LTS, Express 5, JavaScript ESM/npm | Bootstrap đã lắng nghe HTTP và kiểm tra kết nối DB khi khởi động. Dependency thực tế được khóa ở `backend/package-lock.json`. [Thiết lập](../development/local-setup.md). |
| Auth | JWT + auth_sessions PostgreSQL, cookie/CSRF, user/quyền DB | Cookie/header đã chọn, response/lifecycle/Origin còn DEC-017 |
| Email | OTP đăng ký/reset qua email thật | Resend HTTPS/fetch và [trạng thái gửi](security-and-media.md#otp-delivery) đã chốt. Timeout cụ thể, IP limit và wire còn DEC-003/005/017. |
| Nghiệp vụ | Listener → hồ sơ Creator → upload/nghe/playlist/quản trị | UC và BR đã đồng bộ; hợp đồng bổ sung còn DEC-005 |
| Database | PostgreSQL 18.7, pg, SQL tham số hóa, migration phiên bản | [Chín bảng nghiệp vụ](data-model.md#target-model) trong một migration khởi tạo. Giao dịch nhiều bảng và recovery còn DEC-022. |
| Media | Filesystem bền vững máy chủ; audio kiểm tra trạng thái/Range | GET/HEAD audio, single Range/no-store/cleanup đã chốt; chi tiết runtime/recovery state còn DEC-014/017/022 |

## Tổ chức mã đã có

[Entrypoint](../../backend/src/server.js) đọc cấu hình và khởi động [HTTP server](../../backend/src/app.js) với kết nối PostgreSQL. `controllers`, `middlewares`, `routes` và `uploads` vẫn là thư mục khung. Frontend/API dùng cùng origin và HTTPS online. Email dùng Resend, hosting còn mở. File audio lưu trên filesystem máy chủ.

## Luồng dữ liệu chính

**Đăng ký:** nhận thông tin Listener → gửi OTP email thật → xác minh → kích hoạt → login riêng. User mới email_verified_at NULL; Resend/digest HMAC/5 lần gửi-email-giờ đã chọn, timeout/đăng ký lại còn DEC-003/022.

**Xác thực/thay đổi:** cookie → kiểm tra chữ ký/claim, phiên và user DB → quyền hiện tại/sở hữu → cập nhật. Logout thu hồi riêng phiên; khóa/đổi mật khẩu thu hồi tất cả. Approve Creator có hiệu lực request tiếp theo. Phiên DB còn hạn qua restart; DB lỗi không cho qua xác thực.

**Đọc public:** kết hợp tracks/genres/users, chỉ trả track chưa gỡ và chủ không khóa; filter/search/pagination/sort đã chọn. Playlist loại track ẩn nhưng giữ liên kết; reorder ID hiển thị/ẩn cuối-hiện lại cuối/tập đổi 409, response/schema còn DEC-005/017/022.

**Upload:** quyền/CSRF → file tạm → ffprobe/FFmpeg/Sharp kiểm tra và duration ceiling → transaction kiểm tra lại → chuyển file chính → ghi track/commit → 201. UUID, temp/final cùng filesystem; commit không rõ phải đối chiếu trước dọn. Dọn startup/mỗi 30 phút theo điều kiện tuổi >24 giờ, tham chiếu và thao tác đang chạy; [media lifecycle](security-and-media.md#file-lifecycle) sở hữu chi tiết. Transaction DB không rollback filesystem.

**Nghe:** metadata audioUrl → API-28 GET/API-29 HEAD audio kiểm tra trạng thái, single Range và no-store → client listenedSeconds >=10/cooldown trượt 30 phút/đếm cùng transaction/lặp 200-counted:false. Guest UUID cookie ký/login chuyển user ID có thể thêm lượt/cooldown giữ bảy ngày; chưa chứng minh nghe thật. Chặn request audio mới sau gỡ/khóa; request đang chạy có thể hoàn tất.

**Creator:** nộp hồ sơ riêng → pending không sửa → approve/reject có lịch sử → role/status được cập nhật nguyên tử theo mô hình sẽ chốt. Không dùng user.created_at thay ngày nộp.

## Ranh giới đặc tả còn thiếu

Phần còn mở gồm wire auth/CSRF, IP limit, giao dịch và recovery các luồng sau, phiên bản/giới hạn media, hosting/backup và lịch. Resend cần tài khoản, khóa và domain gửi xác minh. API nghiệp vụ thuộc các luồng sau bootstrap. [Sổ DEC](../decisions/open-decisions.md), [ADR-0007](../decisions/adr-0007-single-initial-database-migration.md).

Các ADR: [auth](../decisions/adr-0001-authentication-and-sessions.md), [media/online](../decisions/adr-0002-media-and-online-readiness.md), [nền tảng](../decisions/adr-0003-backend-and-database.md), [audio/file lifecycle](../decisions/adr-0004-audio-contract-and-file-lifecycle.md). Chi tiết dữ liệu ở [data model](data-model.md), auth/media ở [security and media](security-and-media.md), wire ở [API](../api/README.md).

[ADR-0005](../decisions/adr-0005-simple-backend-contracts.md) bổ sung auth/nền tảng và thay reorder cũ; [xác nhận](../decisions/open-decisions.md#evidence-simple-2026-11-17).
