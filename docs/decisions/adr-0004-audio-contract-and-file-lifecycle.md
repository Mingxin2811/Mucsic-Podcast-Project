# ADR-0004 Hợp đồng audio và vòng đời file–database

Trạng thái: **Accepted**. Ngày **17/11/2026**, Asia/Saigon. Người xác nhận: người dùng trong phiên làm việc; [bằng chứng bổ sung](open-decisions.md#evidence-media-2026-11-17). Liên quan [DEC-009](open-decisions.md#dec-009), [DEC-011](open-decisions.md#dec-011), DEC-014/DEC-017/DEC-022.

## Bối cảnh

[ADR-0002](adr-0002-media-and-online-readiness.md) chọn media local máy chủ và kiểm tra trạng thái. Cần bổ sung cách phát/Range/cache, kiểm tra file, duration, lỗi file–DB và cover. Không thay thế lựa chọn lưu local của ADR-0002; giữ nguyên lý do lịch sử.

## Quyết định

GET/HEAD /api/tracks/:id/audio public theo trạng thái track/chủ, metadata audioUrl tách storage path; single Range và no-store, mã lỗi được chọn. Hợp đồng HTTP do [API-28/29](../api/tracks.md#api-28) sở hữu; không sao chép response/header thành nguồn thứ hai.

Kiểm tra MP3 bằng ffprobe và giải mã toàn file với FFmpeg; JPG/PNG đọc/mã hóa lại bằng Sharp; filename UUID. Duration ffprobe hữu hạn >0, lưu INT giây ceiling; nguồn duration server. Công cụ phải có giới hạn thời gian và số tiến trình, số cụ thể chưa chọn.

Upload file tạm rồi validation, transaction kiểm tra lại, chuyển file cùng filesystem, ghi DB/COMMIT rồi mới báo thành công. COMMIT mất kết nối phải đối chiếu kết quả trước xóa file. Cover mới được lưu trước, DB khóa hàng/cập nhật/commit, sau đó ảnh cũ mới vào danh sách dọn. Quy trình và điều kiện dọn do [media lifecycle](../architecture/security-and-media.md#file-lifecycle) sở hữu.

## Phương án và đánh đổi

Single Range đủ cho trình phát thông thường; multi-range bị bỏ qua và gửi full 200 trong MVP. no-store giảm tái sử dụng cache nhưng tăng tải khi nghe lại/tua, không thu hồi byte đã tải hoặc buffer của request hiện tại. ffprobe/FFmpeg kiểm tra sâu hơn đuôi file với chi phí cài binary và thời gian upload. Filesystem không tham gia transaction PostgreSQL nên cần xử lý bù/đối chiếu.

## Hệ quả và giới hạn

Thêm API-28 GET và API-29 HEAD, thay audioFilePath trong JSON đích bằng audioUrl, không sửa cột audio_file_path của SQL hiện có. Thêm yêu cầu volume tạm/chính cùng filesystem, dependency và dọn an toàn. DEC-014/017/022 giữ các lựa chọn còn thiếu về versions/limits, ảnh/conditional HTTP/validation và trạng thái thao tác/danh sách dọn; chưa thêm bảng hoặc queue ngầm định.

Các TC-08/09/11/17/21 được bổ sung expected; tất cả NOT_RUN. Không cài công cụ, phát audio, benchmark hoặc chạy SQL trong công việc docs này. [Hiện trạng](../project/status.md), [kế hoạch](../plans/2026-11-17-media-contracts.md).
