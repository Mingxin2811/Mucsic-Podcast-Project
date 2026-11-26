# ADR-0006 Bootstrap local và schema tài khoản

Trạng thái **Accepted** trong phạm vi xác nhận ngày **18/11/2026**, Asia/Saigon. Người xác nhận là người dùng trong phiên. [Bằng chứng DEC-003/014/022](open-decisions.md#evidence-bootstrap-auth-2026-11-18).

## Bối cảnh và lựa chọn

Soundwave bắt đầu trên PostgreSQL 18 trống. Migration đầu tiên tạo ba bảng nghiệp vụ `users`, `otp_challenges` và `auth_sessions`. Các migration tiếp theo thêm bảng theo từng luồng. Seed demo cung cấp riêng. Cách này cho phép kiểm tra môi trường và luồng tài khoản trước khi triển khai Creator, media và playlist. [Schema khởi tạo](../architecture/data-model.md#initial-auth-schema).

Node.js 24.22.3 LTS và PostgreSQL 18.7 là baseline. Cài dependency stable tương thích khi bootstrap và lưu phiên bản vào lockfile. Local, migration và test có cấu hình riêng. Git lưu lockfile để cài lại bằng `npm ci`. [Thiết lập và lệnh đích](../development/local-setup.md).

Giao dịch auth lấy khóa hàng user trước. Lượt gửi OTP được ghi trước khi gọi Resend để luồng đồng thời có dữ liệu đếm mà không giữ transaction trong lúc gọi mạng. Xác minh tiếp tục với mã còn hạn khi kết quả gửi chưa rõ. [OTP](../architecture/security-and-media.md#otp-delivery), [giao dịch auth](../architecture/security-and-media.md#auth-transaction-order).

## Hệ quả và phần còn mở

ADR này bổ sung [ADR-0001](adr-0001-authentication-and-sessions.md), [ADR-0003](adr-0003-backend-and-database.md) và [ADR-0005](adr-0005-simple-backend-contracts.md). Chính sách IP, xử lý `reserved` bị gián đoạn, hợp đồng HTTP và vận hành online tiếp tục được theo dõi ở sổ DEC. Xem [kiểm chứng bootstrap](../project/status.md#backend-bootstrap-run-2026-11-18) để biết phiên bản package và môi trường thực tế.

Ngày 20/11/2026, [ADR-0007](adr-0007-single-initial-database-migration.md) thay phạm vi ba bảng theo từng luồng bằng một migration khởi tạo chín bảng. Nền tảng, DDL ba bảng tài khoản và giao dịch auth tiếp tục áp dụng.

Ngày 21/11/2026, [ADR-0008](adr-0008-registration-otp.md) chốt hạn mức IP, phục hồi `reserved` và hợp đồng chính cho OTP đăng ký.
