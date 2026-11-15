# Quy trình ghi nhận quyết định

[Sổ quyết định mở](open-decisions.md) là nơi duy nhất quản lý câu hỏi và các phương án. Những tài liệu khác dẫn tới mã `DEC` tương ứng. Xem [hiện trạng](../project/status.md) cho thiếu hụt bằng chứng, vì sự thật chưa kiểm chứng không phải phương án để bỏ phiếu.

## Vòng đời

1. Ghi vấn đề mới bằng số `DEC` tiếp theo; không đổi số đã được dẫn ở tài liệu khác.
2. Đặt `OPEN`, ghi rõ xung đột hoặc thông tin còn thiếu, các phương án đã biết và phạm vi ảnh hưởng.
3. Không mặc định lựa chọn theo tài liệu mới hơn hoặc theo cấu trúc đang tồn tại. Người chốt chưa được chỉ định thì ghi “chưa xác định”.
4. Khi có xác nhận rõ, lưu kết quả, lý do, người/ngày, bằng chứng và các tài liệu cần cập nhật. Chỉ phạm vi được xác nhận mới chuyển `ACCEPTED` hoặc `REJECTED`.
5. Với quyết định có ý nghĩa kiến trúc, tạo ADR trong thư mục này, liên kết hai chiều với `DEC`. Nếu thay đổi lựa chọn đã chấp nhận, tạo ADR mới thay thế; giữ nguyên nội dung lý do lịch sử, chỉ cập nhật trạng thái/liên kết thay thế.

Không tự gán quyền phê duyệt kỹ thuật cho một thành viên chỉ từ chức danh quản lý. Quyền chốt chưa rõ được ghi tại [DEC-016](open-decisions.md#dec-016).

## Mẫu mục quyết định

```text
DEC-NNN Tên vấn đề
Trạng thái: OPEN
Loại: xung đột / còn thiếu / cả hai
Bối cảnh và các phát biểu hiện có:
Các phương án đã biết hoặc thông tin chưa có:
Ảnh hưởng: UC, BR/NFR, API, bảng dữ liệu, tác vụ kiểm thử
Cần bổ sung để quyết định:
Người chốt: chưa xác định
Kết quả: chưa xác định; không có phương án mặc định
Khi được chốt: lý do, ngày, người xác nhận, bằng chứng, ADR và nơi cần cập nhật
```

## Mẫu ADR

Tên tương lai: `adr-NNNN-ten-quyet-dinh.md`. Chưa tạo ADR mang trạng thái chấp nhận khi chưa có xác nhận.

```text
Tiêu đề
Trạng thái: Proposed / Accepted / Rejected / Superseded
Quyết định liên quan: DEC-NNN
Ngày và người xác nhận:
Bối cảnh và yêu cầu có ý nghĩa kiến trúc:
Các phương án và đánh đổi:
Kết quả và lý do:
Hệ quả, phạm vi, giới hạn:
Bằng chứng xác nhận:
Tài liệu, kế hoạch và kiểm thử bị ảnh hưởng:
Thay thế / được thay thế bởi:
```
