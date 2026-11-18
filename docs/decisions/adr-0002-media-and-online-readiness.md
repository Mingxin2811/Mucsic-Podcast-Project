# ADR-0002 Media local máy chủ và sẵn sàng online

Trạng thái: **Accepted**, phạm vi lựa chọn kiến trúc ghi dưới đây. Ngày: **17/11/2026**, Asia/Saigon. Người xác nhận: người dùng trong phiên làm việc; [bằng chứng](open-decisions.md#evidence-2026-11-17).

Quyết định liên quan: [DEC-008](open-decisions.md#dec-008), [DEC-009](open-decisions.md#dec-009), [DEC-011](open-decisions.md#dec-011), [DEC-018](open-decisions.md#dec-018).

## Bối cảnh

Yêu cầu online không đồng nghĩa chuyển file audio lên cloud storage. URL static có thể tiếp tục phát track đã gỡ, trái chính sách trạng thái.

## Quyết định

Nhạc/podcast lưu filesystem bền vững của máy chủ backend, đường dẫn cấu hình được. Audio qua endpoint kiểm tra track/chủ sở hữu và Range. Từ chối request mới sau gỡ/khóa, cho request đã bắt đầu hoàn tất. Soft delete giữ file; upload có vùng tạm/xử lý bù/dọn lỗi; server đọc duration, chỉ thay metadata/cover trong MVP.

## Phương án và đánh đổi

Local đã được người dùng chọn thay Cloudinary/Supabase Storage. Cần ổ đĩa/volume bền vững, quản lý dung lượng và backup. Static audio không kiểm tra trạng thái không phải phương án phục vụ đã chọn.

## Hệ quả và giới hạn

Nhà cung cấp máy chủ/email, cấu hình volume/HTTPS/backup, wire Range, cơ chế cache/cleanup và đổi cover còn DEC-009/DEC-014/DEC-016. Không tạo cấu hình deploy hoặc hứa demo toàn hệ thống offline. Tham chiếu [thiết lập](../development/local-setup.md), [media](../architecture/security-and-media.md), TC-09/TC-17/TC-21.

Bằng chứng kiểm thử tương lai tại [acceptance](../testing/acceptance.md); triển khai/kiểm chứng tại [status](../project/status.md). Chưa có ADR bị thay thế; không thay lịch sử xác nhận của đợt docs 11/11/2026.

## Bổ sung hợp đồng ngày 17/11/2026

[ADR-0004](adr-0004-audio-contract-and-file-lifecycle.md) giải quyết Range/cache/kiểm tra file/duration/publish/cleanup/cover trước đây còn thiếu trong ADR này. Đoạn “Hệ quả và giới hạn” phía trên mô tả thời điểm xác nhận ban đầu; phần media hiện hành đọc ADR-0004 và kết quả mới DEC-009/DEC-011. Lựa chọn filesystem local máy chủ vẫn giữ nguyên, không có ADR bị supersede.
