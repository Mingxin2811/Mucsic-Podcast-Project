# ADR-0008 Giới hạn gửi và xác minh OTP đăng ký

Theo [ADR-0010](adr-0010-local-runtime-scope.md), hạn mức OTP theo IP thuộc hướng mở rộng. Hạn mức email và vòng đời OTP áp dụng cho bản local.

Trạng thái `Accepted` ngày 21/11/2026, Asia/Saigon. Người xác nhận là người dùng trong phiên. [Bằng chứng](open-decisions.md#evidence-registration-otp-2026-11-21).

## Quyết định

API-01/30/31 dùng PostgreSQL hiện có cho lượt gửi và trạng thái OTP. Khóa theo IP trong transaction gom các lượt đăng ký và gửi lại qua nhiều tài khoản vào cùng hạn mức. Sau commit, backend gọi Resend với timeout năm giây. Quy tắc xác minh bản ghi còn `reserved` giúp người nhận mã tiếp tục sau khi tiến trình gửi bị gián đoạn. [DEC-003](open-decisions.md#dec-003), [vòng đời OTP](../architecture/security-and-media.md#otp-delivery).

API-30 và API-31 yêu cầu mật khẩu của lần đăng ký hiện tại. Xác minh chỉ kích hoạt tài khoản khi mã và mật khẩu cùng hợp lệ, để người nhận email không vô tình kích hoạt tài khoản do người khác tạo. Nhánh đăng ký lại sau 24 giờ cho phép bắt đầu lại trên cùng bản ghi chưa xác minh. [DEC-005](open-decisions.md#dec-005), [DEC-017](open-decisions.md#dec-017), [Auth API](../api/auth.md#api-01).

## Hệ quả

Bổ sung [ADR-0005](adr-0005-simple-backend-contracts.md) và [ADR-0006](adr-0006-bootstrap-and-account-schema.md). Body API-30 có thêm `password`. Hạn mức theo IP được chia sẻ giữa các người dùng cùng IP. Quyết định dùng schema hiện hành cho OTP đăng ký. [ADR-0009](adr-0009-password-reset-otp.md) bổ sung quyết định cho reset, lịch dọn và chi tiết xử lý sai mật khẩu, `reserved`. [Kịch bản TC-01/02](../testing/acceptance.md#tc-01).
