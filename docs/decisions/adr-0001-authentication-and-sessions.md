# ADR-0001 Xác thực và phiên đăng nhập

Phạm vi online trong bối cảnh ban đầu được cập nhật thành local ở [ADR-0010](adr-0010-local-runtime-scope.md). Thiết kế JWT và phiên tiếp tục áp dụng.

Trạng thái: **Accepted**, phạm vi lựa chọn kiến trúc ghi dưới đây. Ngày: **17/11/2026**, Asia/Saigon. Người xác nhận: người dùng trong phiên làm việc; [bằng chứng](open-decisions.md#evidence-2026-11-17).

Quyết định liên quan: [DEC-003](open-decisions.md#dec-003), [DEC-006](open-decisions.md#dec-006), [DEC-017](open-decisions.md#dec-017).

## Bối cảnh

Đồ án phải sẵn sàng online và đăng ký cần email OTP thật. Logout thu hồi từng phiên, khóa/đổi mật khẩu thu hồi tất cả; quyền Creator cần cập nhật ngay. JWT stateless chỉ xóa phía client không đáp ứng các yêu cầu này.

## Quyết định

Chọn JWT gắn auth_sessions trong PostgreSQL, hạn tuyệt đối 24 giờ, nhiều phiên độc lập, chưa refresh token. Claims sub/sid/iat/exp/iss/aud, quyền lấy từ user DB. Cookie HttpOnly/Secure/SameSite=Lax khi online và CSRF, cùng origin frontend/API. Xác minh email trước login; không tự login sau verify/reset. Chi tiết lifecycle ở [security and media](../architecture/security-and-media.md).

## Phương án và đánh đổi

Đã cân nhắc JWT thuần, token_version trên user và access/refresh token. Phiên PostgreSQL đáp ứng thu hồi riêng thiết bị và tồn tại qua restart với thêm một truy vấn xác thực. Không cần thêm Redis cho lựa chọn này.

## Hệ quả và giới hạn

Cần bảng phiên, dữ liệu xác minh email và thay hợp đồng Bearer/JSON token. Provider email, lưu OTP, cookie local, giao thức CSRF và ký/khóa chưa chốt (DEC-003/DEC-014/DEC-017/DEC-022). Chưa triển khai hoặc kiểm chứng; không đóng các câu hỏi đó bằng ADR này.

Bằng chứng kiểm thử tương lai tại [acceptance](../testing/acceptance.md); triển khai/kiểm chứng tại [status](../project/status.md). Chưa có ADR bị thay thế; không thay lịch sử xác nhận của đợt docs 11/11/2026.

## Bổ sung phương án đơn giản cùng ngày 17/11/2026

[ADR-0005](adr-0005-simple-backend-contracts.md) và [xác nhận mới](open-decisions.md#evidence-simple-2026-11-17) bổ sung Resend/HMAC/scrypt/HS256/cookie-CSRF/bộ công cụ. Các câu chưa chốt ở phần hệ quả phía trên là bối cảnh thời điểm ban đầu; phần hiện hành đọc DEC-003/014/017/022. Không thay lựa chọn kiến trúc cốt lõi hoặc tự đóng schema/wire chưa đủ.
