# Đồng bộ quyết định khởi tạo backend và dữ liệu tài khoản

## Purpose and context

Ghi nhận phương án người dùng chấp nhận ngày 18/11/2026 cho bootstrap local và migration ba bảng tài khoản của Soundwave. Các luồng liên quan là UC01/UC02, BR-003 và TC-01–TC-05/TC-19.

## Scope and dependencies

Cập nhật sổ quyết định, ADR, hướng dẫn local, schema, auth, khoảng trống API và nghiệm thu. Phạm vi là Markdown. Các phần chưa xác nhận của DEC-003/005/014/017/022 vẫn `OPEN`, gồm IP limit, hợp đồng HTTP, các bảng nghiệp vụ sau auth và triển khai online/media.

## Progress

- [x] 18/11/2026 Đối chiếu xác nhận với DEC-003/014/022, SQL cũ và đặc tả auth.
- [x] 18/11/2026 Ghi quyết định và ADR, cập nhật tài liệu sở hữu và truy xuất.
- [x] 18/11/2026 Kiểm tra liên kết, nội dung, phạm vi diff và ghi kết quả.

## Milestones and concrete steps

1. Ghi nguồn xác nhận, phạm vi đã chốt và phần còn mở trong sổ quyết định. Liên kết ADR với hướng dẫn local, mô hình dữ liệu và giao dịch auth.
2. Đồng bộ API, ma trận truy xuất và expected của TC-01–TC-05/TC-19. Phân biệt ba bảng nghiệp vụ của migration đầu tiên với mô hình đích đầy đủ.
3. Kiểm tra tĩnh các liên kết đổi, mã và trạng thái. Dùng `git diff --check` để kiểm tra whitespace và `git status --short` để đối chiếu phạm vi.

## Validation and acceptance

Kiểm tra tên biến, lệnh đích, cột/index của ba bảng, trạng thái gửi OTP, thứ tự khóa, thời hạn phiên và phạm vi migration. TC vẫn `NOT_RUN` vì chưa có backend hoặc migration để chạy.

## Recovery and compatibility

Đối chiếu diff với yêu cầu. Sửa lỗi tài liệu tại file sở hữu nội dung. SQL cũ và các snapshot kiểm chứng trước được giữ để tra cứu.

## Surprises & Discoveries

`otp_challenges.user_id` bắt buộc nên bảng này đếm được lượt gửi gắn với tài khoản. Nếu DEC-003 chọn đếm cả yêu cầu reset cho email không tồn tại, cơ chế lưu lượt đó cần được chốt riêng.

## Decision Log

Người dùng xác nhận phương án bootstrap và ba bảng tài khoản trong phiên ngày 18/11/2026. [Sổ quyết định](../decisions/open-decisions.md#evidence-bootstrap-auth-2026-11-18).

## Outcomes & Retrospective

Đã ghi nhận xác nhận, thêm ADR-0006 và đồng bộ tài liệu local, database, auth, API, yêu cầu và kiểm thử. Kiểm tra tĩnh trên 40 file Markdown, đối chiếu mã/trạng thái và kiểm tra whitespace cho cả file mới. Working tree chỉ có thay đổi Markdown. Chưa chạy ứng dụng, SQL, Resend hoặc kiểm thử nghiệm thu. [Bằng chứng và hiện trạng](../project/status.md#bootstrap-auth-2026-11-18).
