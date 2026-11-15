# Tổng quan Soundwave

Trạng thái đặc tả: `DRAFT`. Tình trạng triển khai được quản lý riêng tại [status](status.md).

Soundwave cung cấp nền tảng nghe nhạc và podcast, quản lý playlist cá nhân, cho phép Creator đăng tác phẩm và Admin quản trị tài khoản/nội dung. Đây là đồ án học phần Quản lý dự án phần mềm tại PTIT, với mục tiêu thực hành phát triển sản phẩm và quản lý phạm vi, tiến độ, chi phí, rủi ro, chất lượng.

## Mục tiêu dự kiến

Sản phẩm cần hỗ trợ luồng tài khoản → xét duyệt Creator → upload → tìm kiếm/nghe → lưu playlist → quản trị. Mục tiêu nghiệm thu là hoàn thành phần Must-Have và Should-Have được cam kết, không còn lỗi Critical trong luồng nghiệm thu. Danh sách cam kết chưa được chốt tại [DEC-001](../decisions/open-decisions.md#dec-001); điều kiện đo chất lượng ở [NFR](../requirements/quality.md).

## Tác nhân

| Tác nhân | Khả năng nghiệp vụ đang được mô tả |
| --- | --- |
| Guest | Duyệt nội dung, tìm kiếm, lọc thể loại, nghe music/podcast; đăng ký/đăng nhập |
| Listener | Các quyền nghe và thư viện cá nhân; đăng ký Creator theo luồng còn mở |
| Creator | Quyền Listener; upload và quản lý tác phẩm của mình khi được duyệt |
| Admin | Xét duyệt Creator, quản lý tài khoản, quản trị nội dung; phạm vi ngoại lệ xem DEC-018 |

Guest là trạng thái chưa xác thực, không phải giá trị `users.role`. Ba role hiện được khai báo trong SQL là `listener`, `creator`, `admin`. Ma trận chi tiết nằm tại [BR-001](../requirements/business-rules.md#br-001).

## Phạm vi sản phẩm và phạm vi tài liệu

Danh mục nghiệp vụ UC01–UC12 gồm tài khoản, khám phá, tìm kiếm, phát audio, metadata bổ sung, playlist, upload, quản lý tác phẩm, quản lý người dùng, kiểm duyệt và duyệt Creator. [Use case](../requirements/use-cases.md) chỉ mô tả trách nhiệm backend và kết quả nghiệp vụ. Các yêu cầu về trải nghiệm phát âm thanh không tự tạo thêm thuật toán hoặc endpoint phía server.

Bộ docs phục vụ backend, database, kiểm thử và quản lý dự án. Thiết kế màn hình, giao diện, điều hướng, component và cách triển khai frontend nằm ngoài phạm vi bộ tài liệu này.

Các chức năng ngoài MVP đang được mô tả: thanh toán/Premium, AI speech-to-text, nghe offline, chia sẻ playlist công khai/riêng tư, ứng dụng mobile native, hosting/domain cloud. Các phương án lưu media bên ngoài vẫn là xung đột chưa chốt ở [DEC-008](../decisions/open-decisions.md#dec-008); không đồng nhất hosting với nơi lưu file.

## Định hướng kiến trúc

Thiết kế mô tả backend Node.js/Express cung cấp REST API, database quan hệ và nơi lưu media; dự kiến demo local. Repo chưa có ứng dụng thực thi. Hệ quản trị/phiên bản, công cụ và nơi lưu file còn mở; xem [kiến trúc](../architecture/overview.md), không coi định hướng là cấu hình đã cài.

## Thuật ngữ

| Thuật ngữ | Nghĩa trong docs |
| --- | --- |
| Track | Một bài nhạc hoặc một tập podcast, phân biệt bằng `track_type` |
| Creator | Người dùng có quyền đăng tác phẩm theo quy trình xét duyệt |
| Metadata | Tiêu đề, nghệ sĩ/host, thể loại, thời lượng, lyrics/show notes và đường dẫn media |
| Soft delete | Đánh dấu `deleted_at`, giữ hàng dữ liệu; khác với DELETE vật lý |
| RBAC | Kiểm soát thao tác theo role; vẫn cần kiểm tra quyền sở hữu tài nguyên |
| JWT | Token ký để xác thực; cơ chế thay đổi/thu hồi còn mở |
| OTP | Mã dùng một lần, đang được đề xuất cho đăng ký/reset mật khẩu |
| WBS / RACI | Phân rã công việc / phân định trách nhiệm |
| ADR | Bản ghi quyết định kiến trúc và lý do |
| Fixture | Dữ liệu thử có điều kiện đầu vào xác định, không mặc định là seed hiện có |
