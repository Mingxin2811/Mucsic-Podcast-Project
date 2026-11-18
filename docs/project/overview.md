# Tổng quan Soundwave

Phạm vi và lựa chọn nghiệp vụ đã CONFIRMED ngày 17/11/2026; chi tiết chưa chốt còn DRAFT theo [sổ DEC](../decisions/open-decisions.md#evidence-2026-11-17). Tình trạng triển khai được quản lý riêng tại [status](status.md).

Soundwave cung cấp nền tảng nghe nhạc và podcast, quản lý playlist cá nhân, cho phép Creator đăng tác phẩm và Admin quản trị tài khoản/nội dung. Đây là đồ án học phần Quản lý dự án phần mềm tại PTIT, với mục tiêu thực hành phát triển sản phẩm và quản lý phạm vi, tiến độ, chi phí, rủi ro, chất lượng.

## Mục tiêu dự kiến

Sản phẩm cần hỗ trợ luồng tài khoản → xét duyệt Creator → upload → tìm kiếm/nghe → lưu playlist → quản trị. MVP cam kết luồng trên, Trending/mới phát hành cơ bản và lyrics/show notes plain text, không còn Critical/High trong phạm vi cam kết. Lyrics đồng bộ, restore và thay audio ngoài MVP theo [DEC-001](../decisions/open-decisions.md#dec-001); điều kiện đo chất lượng ở [NFR](../requirements/quality.md).

## Tác nhân

| Tác nhân | Khả năng nghiệp vụ đang được mô tả |
| --- | --- |
| Guest | Duyệt nội dung, tìm kiếm, lọc thể loại, nghe music/podcast; đăng ký/đăng nhập |
| Listener | Các quyền nghe và thư viện cá nhân; nộp hồ sơ Creator sau khi xác minh email và đăng nhập |
| Creator | Quyền Listener; upload và quản lý tác phẩm của mình khi được duyệt |
| Admin | Xét duyệt Creator, quản lý tài khoản, quản trị nội dung; phạm vi ngoại lệ xem DEC-018 |

Guest là trạng thái chưa xác thực, không phải giá trị `users.role`. Ba role hiện được khai báo trong SQL là `listener`, `creator`, `admin`. Ma trận chi tiết nằm tại [BR-001](../requirements/business-rules.md#br-001).

## Phạm vi sản phẩm và phạm vi tài liệu

Danh mục nghiệp vụ UC01–UC12 gồm tài khoản, khám phá, tìm kiếm, phát audio, metadata bổ sung, playlist, upload, quản lý tác phẩm, quản lý người dùng, kiểm duyệt và duyệt Creator. [Use case](../requirements/use-cases.md) chỉ mô tả trách nhiệm backend và kết quả nghiệp vụ. Các yêu cầu về trải nghiệm phát âm thanh không tự tạo thêm thuật toán hoặc endpoint phía server.

Bộ docs phục vụ backend, database, kiểm thử và quản lý dự án. Thiết kế màn hình, giao diện, điều hướng, component và cách triển khai frontend nằm ngoài phạm vi bộ tài liệu này.

Ngoài MVP: thanh toán/Premium, AI speech-to-text, nghe offline, chia sẻ playlist công khai/riêng tư và ứng dụng mobile native. Hệ thống phải sẵn sàng triển khai online, dùng OTP email thật; file nhạc/podcast vẫn lưu filesystem local của máy chủ backend ([DEC-008](../decisions/open-decisions.md#dec-008)). Resend HTTPS đã chọn cho email; tài khoản/API key/domain gửi xác minh chưa thiết lập. Hosting/domain sản phẩm/cấu hình triển khai chưa chọn. Không yêu cầu toàn bộ sản phẩm chạy độc lập Internet.

## Định hướng kiến trúc

Đích là Node.js 24 LTS/Express 5, JavaScript ESM/npm, PostgreSQL 18 qua pg, JWT cùng phiên PostgreSQL/cookie bảo vệ và filesystem máy chủ. Hỗ trợ phát triển local và sẵn sàng online; repo chưa có ứng dụng thực thi. Công cụ/config và wire còn thiếu xem [kiến trúc](../architecture/overview.md); lựa chọn được xác nhận không phải cấu hình đã cài.

## Thuật ngữ

| Thuật ngữ | Nghĩa trong docs |
| --- | --- |
| Track | Một bài nhạc hoặc một tập podcast, phân biệt bằng `track_type` |
| Creator | Người dùng có quyền đăng tác phẩm theo quy trình xét duyệt |
| Metadata | Tiêu đề, nghệ sĩ/host, thể loại, thời lượng, lyrics/show notes và đường dẫn media |
| Soft delete | Đánh dấu `deleted_at`, giữ hàng dữ liệu; khác với DELETE vật lý |
| RBAC | Kiểm soát thao tác theo role; vẫn cần kiểm tra quyền sở hữu tài nguyên |
| JWT | Token ký gắn phiên PostgreSQL; hạn tuyệt đối 24 giờ, chưa refresh |
| OTP | Mã dùng một lần gửi qua email thật để xác minh đăng ký/reset mật khẩu |
| WBS / RACI | Phân rã công việc / phân định trách nhiệm |
| ADR | Bản ghi quyết định kiến trúc và lý do |
| Fixture | Dữ liệu thử có điều kiện đầu vào xác định, không mặc định là seed hiện có |

Bổ sung [phương án đơn giản](../decisions/open-decisions.md#evidence-simple-2026-11-17): một backend/PostgreSQL, công cụ đã chọn tại [local setup](../development/local-setup.md); lượt nghe là tín hiệu client/cooldown trượt 30 phút, Guest chuyển user có thể thêm lượt; search_text chuẩn hóa; reorder ID hiển thị/ẩn cuối-hiện lại cuối. Đây là phạm vi đã xác nhận, chưa là ứng dụng chạy được.
