# Kế hoạch giao việc

Sử dụng [template](template.md) cho công việc nhiều bước hoặc thay đổi nhiều file/hợp đồng. Đây là quy ước dự án, tham khảo ExecPlans trong [references](../references.md); không phải file mà công cụ tự bắt buộc đọc nếu chưa được dẫn từ hướng dẫn repo.

## Tạo và duy trì

- Tên file: `YYYY-MM-DD-ten-cong-viec.md`; viết khi có công việc cụ thể được giao, không tạo hàng loạt kế hoạch tính năng chưa xác nhận phạm vi.
- Ghi đủ bối cảnh để thành viên mới bắt đầu từ repo và kế hoạch; dẫn tới tài liệu sở hữu chi tiết, tóm tắt những điều kiện quyết định trực tiếp công việc.
- Nêu rõ đầu vào, đầu ra, giới hạn, các DEC liên quan và phần nào chưa thể thực thi. Không chọn giải pháp thay người chốt.
- Mỗi milestone có kết quả quan sát được và cách kiểm chứng. Chỉ ghi lệnh tồn tại trong toolchain đã được xác nhận; điều kiện chưa có phải được nêu cụ thể.
- Cập nhật `Progress`, `Surprises & Discoveries`, `Decision Log`, `Outcomes & Retrospective` trong lúc làm. Giữ tách đề xuất và quyết định đã xác nhận.
- Kết thúc bằng bằng chứng và việc còn thiếu; không đánh dấu hoàn thành chỉ vì đã viết kế hoạch.

Quy tắc nhận việc ở [workflow](../development/workflow.md), hiện trạng chung ở [status](../project/status.md). Kế hoạch lịch sử: [documentation foundation 11/11](2026-11-11-documentation-foundation.md). Đợt đồng bộ hiện tại: [phỏng vấn và cập nhật quyết định 17/11](2026-11-17-documentation-decisions-interview.md).

Đợt bổ sung hợp đồng audio/upload sau xác nhận: [media contracts 17/11](2026-11-17-media-contracts.md). Kế hoạch đồng bộ trước đó giữ kết quả tại thời điểm hoàn tất; số API/DEC mới xem status và kế hoạch media.

Đợt [đồng bộ phương án backend đơn giản](2026-11-17-simple-backend-decisions.md) giữ riêng bằng chứng DOCSYNC-20261117-03 với hai snapshot trước.

Ngày 18/11: [đồng bộ quyết định bootstrap/schema tài khoản](2026-11-18-backend-bootstrap-decisions.md) và [triển khai bootstrap/migration đầu tiên](2026-11-18-implement-backend-bootstrap.md).

Ngày 20/11: [gom schema nghiệp vụ vào một migration](2026-11-20-consolidate-database-migration.md) theo ADR-0007.
