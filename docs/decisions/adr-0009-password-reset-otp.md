# ADR-0009 OTP khôi phục mật khẩu và hạn mức yêu cầu theo IP

Theo [ADR-0010](adr-0010-local-runtime-scope.md), hạn mức và bảng đếm theo IP thuộc hướng mở rộng. Hợp đồng local giữ hạn mức email và trả `202` chung cho mọi email hợp lệ về cú pháp.

Trạng thái `Accepted` ngày 21/11/2026, Asia/Saigon. Người xác nhận là người dùng trong phiên. [DEC-003](open-decisions.md#dec-003), [bằng chứng](open-decisions.md#evidence-password-reset-otp-2026-11-21).

## Quyết định

Yêu cầu reset trả phản hồi chung và có thời gian phản hồi tương đương giữa các trạng thái tài khoản, hạn mức theo email và kết quả Resend. Hạn mức IP được kiểm trước khi tra tài khoản và tách khỏi đăng ký. Một bảng PostgreSQL riêng lưu IP và thời điểm của yêu cầu reset để tính được cả các yêu cầu đến email không có tài khoản. `otp_challenges` lưu lượt cấp mã gắn với tài khoản và trạng thái gửi. [API-32](../api/auth.md#api-32), [mô hình lưu hạn mức IP](../architecture/data-model.md#reset-request-ip-storage).

Luồng reset dùng vòng đời mã, timeout và xử lý gián đoạn như xác minh email. Khi mã hợp lệ, cập nhật mật khẩu, đánh dấu mã đã dùng và thu hồi các phiên trong cùng giao dịch. Dọn dữ liệu theo lịch mỗi giờ. [Vòng đời OTP](../architecture/security-and-media.md#otp-delivery), [API-33](../api/auth.md#api-33).

## Hệ quả

Bổ sung [ADR-0008](adr-0008-registration-otp.md) với lịch dọn và hành vi khi sai mật khẩu hoặc mã còn chờ gửi. Nguồn IP tin cậy sau proxy thuộc [DEC-014](open-decisions.md#dec-014). DDL bảng hạn mức và chi tiết đếm đồng thời thuộc [DEC-022](open-decisions.md#dec-022). Kịch bản kiểm chứng ở [TC-02](../testing/acceptance.md#tc-02) và [TC-04](../testing/acceptance.md#tc-04).
