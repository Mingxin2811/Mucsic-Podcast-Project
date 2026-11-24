# ADR-0010 Phạm vi local và cấu hình backend

Trạng thái `Accepted` ngày 22/11/2026, Asia/Saigon. Người xác nhận là người dùng trong phiên. [Bằng chứng](open-decisions.md#evidence-local-runtime-2026-11-22).

## Quyết định

Soundwave chạy local trên Windows/PowerShell. Backend mặc định lắng nghe loopback, tắt `trust proxy`, dùng PostgreSQL local và filesystem của máy chạy backend. OTP gửi email thật qua Resend từ máy local khi demo; kiểm thử tích hợp dùng Resend giả lập. Hạn mức cấp mã tính theo email, tách đăng ký và reset. Triển khai online, backup/restore vận hành và hạn mức theo IP là hướng mở rộng tương lai. [DEC-014](open-decisions.md#dec-014), [thiết lập local](../development/local-setup.md).

Chốt cấu hình local cho định dạng hash scrypt, thao tác thay khóa JWT, khóa riêng ký cookie Guest và giới hạn công cụ media. [Xác thực và media](../architecture/security-and-media.md).

## Hệ quả

Áp dụng cho phần phạm vi online trong [ADR-0002](adr-0002-media-and-online-readiness.md) và phần hạn mức IP trong [ADR-0008](adr-0008-registration-otp.md), [ADR-0009](adr-0009-password-reset-otp.md). Các quy tắc gửi mail và vòng đời mã theo DEC-003; quy tắc công bố, phục vụ và dọn file theo DEC-009.

Một migration tiến cho phép `otp_challenges.request_ip` nhận `NULL` để local không phải ghi IP. Bảng đếm IP reset thuộc phần mở rộng. [Mô hình dữ liệu](../architecture/data-model.md#reset-request-ip-storage), [DEC-022](open-decisions.md#dec-022).

Kiểm thử hiện tại tập trung vào môi trường local, giữ dữ liệu qua restart và nhất quán DB/file khi lỗi. [TC-21](../testing/acceptance.md#tc-21).
