# Xây dựng nền tài liệu Soundwave

## Purpose and context

Công việc được người dùng giao ngày 11/11/2026: tạo docs tiếng Việt tự đủ nội dung cho backend, database, kiểm thử và quản lý; thêm README/AGENTS làm điểm vào; giữ các quyết định xung đột/còn thiếu ở trạng thái OPEN. Không đặc tả màn hình hay triển khai frontend. Đọc [mục lục](../README.md), [hiện trạng](../project/status.md) và [sổ quyết định](../decisions/open-decisions.md).

## Scope and dependencies

Chỉ tạo docs và hai file điểm vào ở gốc repo; không sửa ứng dụng, SQL, dependency hoặc cấu hình. Không chạy SQL, ứng dụng, seed hoặc kiểm thử runtime. Các quyết định sản phẩm không chặn việc diễn đạt đầy đủ phương án và ảnh hưởng; chúng chặn các lựa chọn triển khai phụ thuộc.

## Progress

- [x] 11/11/2026: kiểm kê checkout, schema, seed và danh mục 27 hợp đồng đang được mô tả.
- [x] 11/11/2026: tạo điểm vào, quy ước, nội dung dự án và sổ 22 quyết định OPEN.
- [x] 11/11/2026: biên soạn 12 UC, chín BR, năm NFR, kiến trúc và từ điển năm bảng.
- [x] 11/11/2026: viết năm nhóm API và 21 kịch bản nghiệm thu NOT_RUN; nối ma trận truy xuất.
- [x] 11/11/2026: kiểm tra link/anchor, coverage, giới hạn phạm vi và ba tình huống tra cứu; sửa khoảng cách HTML anchor, tham chiếu ngoại lệ không tự đủ và line ending.
- [x] 11/11/2026: ghi kết quả kiểm chứng docs vào status; hoàn thiện bộ tài liệu bàn giao.

## Milestones and concrete steps

M1 lập bản đồ nội dung, phân biệt mô tả dự kiến với artifact có sẵn và thiếu bằng chứng. M2 tạo bộ docs theo bản đồ nội dung trong mục lục, đảm bảo mỗi chủ đề có một nơi sở hữu. M3 kiểm chứng liên kết, mã và scope; đọc thử auth, thay đổi database và endpoint xung đột. Mỗi milestone được đánh giá trên file và nội dung, không qua chạy ứng dụng chưa có.

## Validation and acceptance

Kiểm tra mọi Markdown link/anchor cục bộ; xác nhận 12 UC/27 API/năm bảng được mô tả và liên kết tới test/DEC. Đối chiếu từ điển với DDL và hợp đồng với field/method/path được ghi nhận. Kiểm tra mọi DEC OPEN không có mặc định/người chốt tự gán; mọi TC NOT_RUN. Kiểm tra docs không yêu cầu tài liệu bên ngoài bộ docs để hiểu dự án, không có đặc tả giao diện. Xem diff/scope và chạy kiểm tra whitespace gồm cả file mới; báo đúng giới hạn vì git diff mặc định không bao gồm untracked.

## Recovery and compatibility

Thay đổi chỉ thêm Markdown; sửa sai bằng diff tập trung. Không có migration hoặc thao tác dữ liệu để rollback. Giữ nguyên mọi file đã có trước công việc.

## Surprises & Discoveries

- JWT stateless/logout và yêu cầu thu hồi tức thì khi khóa chưa đồng nhất; DEC-006.
- Soft delete dữ liệu không tự chặn URL file đã biết; DEC-009.
- PK playlist–track không đảm bảo thứ tự duy nhất, và default sort_order có hai mô tả; DEC-019/DEC-022.
- Tuyên bố hoàn thành/nghiệm thu thiếu runtime và log trong checkout; ghi EVID tại status, không giải quyết bằng quyết định chủ quan.

## Decision Log

Người dùng xác nhận cấu trúc docs, ngôn ngữ Việt, hai điểm vào, mức đủ giao việc và loại phần màn hình/frontend khỏi bộ docs trong yêu cầu triển khai. Không có quyết định sản phẩm/kỹ thuật nào được đóng trong đợt này; DEC-001–DEC-022 vẫn OPEN.

## Outcomes & Retrospective

Đã tạo 29 file Markdown: hai điểm vào và 27 tài liệu trong docs. Bộ tài liệu bao phủ 12 UC, 27 endpoint, năm bảng/40 cột, chín BR, năm NFR và 21 kịch bản kiểm thử. Toàn bộ 22 quyết định vẫn OPEN. Kết quả kiểm tra tĩnh và đọc thử ba luồng tra cứu được ghi ở status; không có lần chạy ứng dụng hoặc SQL phát sinh từ công việc này.

Kiểm tra whitespace cần bao gồm untracked vì git diff mặc định không bao phủ file mới. HTML anchor phải có dòng trống trước heading để tránh trình phân tích Markdown coi heading là một phần HTML block. Đây là các sửa định dạng tài liệu, không thay đổi hợp đồng sản phẩm.
