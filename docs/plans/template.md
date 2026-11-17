# Mẫu kế hoạch công việc

Đây là mẫu, không phải kế hoạch tính năng đã được giao hoặc có trạng thái hoàn thành. Khi sử dụng, thay các hướng dẫn trong từng mục bằng thông tin cụ thể; không để placeholder trở thành hợp đồng sản phẩm.

## Purpose and context

Ghi kết quả người dùng/người giao việc cần, hiện trạng liên quan, UC/API/BR/NFR/bảng dữ liệu và các liên kết cần đọc. Giải thích thuật ngữ cần thiết cho người mới.

## Scope and dependencies

Ghi đầu vào, đầu ra, phạm vi thay đổi, giới hạn và các phụ thuộc. Với từng DEC ảnh hưởng, ghi trạng thái hiện tại, phần bị chặn và phần độc lập có thể làm; không tự ghi một lựa chọn mặc định.

## Progress

- [ ] Đối chiếu phạm vi và hiện trạng.
- [ ] Hoàn thành các milestone được mô tả bên dưới.
- [ ] Kiểm chứng, review và cập nhật bằng chứng/tài liệu.

Khi dùng mẫu, thay checklist bằng tiến độ thực tế có ngày giờ; tách việc hoàn thành và phần còn lại.

## Milestones and concrete steps

Mỗi milestone cần mục đích, thao tác/file hoặc thành phần cần thay đổi, đầu ra quan sát được, lệnh/cách kiểm tra tồn tại và expected dựa trên hợp đồng đã xác nhận. Nêu thứ tự phụ thuộc và cách phát hiện thất bại; không đặt expected cho quyết định OPEN.

## Validation and acceptance

Ghi kịch bản, fixture, môi trường, trạng thái trước/sau, bằng chứng cần lưu, các điều kiện để kết luận hoàn thành và giới hạn kiểm chứng. Phân biệt kiểm tra tĩnh, chạy ứng dụng và nghiệm thu nghiệp vụ. Không ghi sẵn PASS.

## Recovery and compatibility

Ghi tác động dữ liệu, khả năng lặp lại, cách khôi phục và hợp đồng cần giữ nếu thực sự liên quan. Với thay đổi chỉ có docs, ghi cách rà soát diff và sửa nội dung; không phát minh migration/rollback ứng dụng.

## Surprises & Discoveries

Ghi phát hiện có ảnh hưởng tới phạm vi, cách làm hoặc kiểm chứng; mỗi phát hiện kèm bằng chứng và liên kết DEC mới nếu cần.

## Decision Log

Ghi quyết định thực sự đã được xác nhận, lý do, người/ngày và phạm vi. Liên kết sổ DEC/ADR; không sao chép thành nguồn quyết định thứ hai. Nếu chưa có quyết định, nói rõ chưa có.

## Outcomes & Retrospective

Đối chiếu đầu ra với mục tiêu, ghi bằng chứng, điều chưa hoàn thành, giới hạn và bài học có ích cho lần sau. Cập nhật trạng thái chung khi có thay đổi liên quan.
