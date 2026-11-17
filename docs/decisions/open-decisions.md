# Sổ quyết định mở

Tất cả các mục bên dưới có trạng thái **OPEN**. Người chốt và kết quả đều **chưa xác định**; không mục nào có phương án mặc định. Các phương án được giữ lại để bàn luận, không phải yêu cầu được phê duyệt. Quy trình cập nhật ở [quy ước quyết định](README.md).

## Danh mục

| Mã | Vấn đề | Loại |
| --- | --- | --- |
| [DEC-001](#dec-001) | Phạm vi và ưu tiên use case | Xung đột |
| [DEC-002](#dec-002) | Thời điểm đăng ký Creator | Xung đột |
| [DEC-003](#dec-003) | OTP và khôi phục mật khẩu | Cả hai |
| [DEC-004](#dec-004) | Đường dẫn và method API | Xung đột |
| [DEC-005](#dec-005) | Chức năng thiếu hợp đồng API | Còn thiếu |
| [DEC-006](#dec-006) | Vòng đời JWT và thay đổi quyền | Cả hai |
| [DEC-007](#dec-007) | Dữ liệu hồ sơ Creator | Còn thiếu |
| [DEC-008](#dec-008) | Nơi lưu media | Xung đột |
| [DEC-009](#dec-009) | Phục vụ và vòng đời file media | Còn thiếu |
| [DEC-010](#dec-010) | Ghi nhận lượt nghe | Cả hai |
| [DEC-011](#dec-011) | Duration và thay file tác phẩm | Cả hai |
| [DEC-012](#dec-012) | Ngữ nghĩa tìm kiếm tiếng Việt | Xung đột |
| [DEC-013](#dec-013) | Hệ quản trị và phiên bản database | Xung đột |
| [DEC-014](#dec-014) | Toolchain backend và database | Còn thiếu |
| [DEC-015](#dec-015) | Điều kiện đo chất lượng | Còn thiếu |
| [DEC-016](#dec-016) | Kế hoạch và quản trị dự án | Cả hai |
| [DEC-017](#dec-017) | Quy ước hợp đồng HTTP | Còn thiếu |
| [DEC-018](#dec-018) | Quyền Admin và nội dung của tài khoản bị khóa | Còn thiếu |
| [DEC-019](#dec-019) | Thứ tự và cập nhật playlist | Còn thiếu |
| [DEC-020](#dec-020) | Bộ dữ liệu demo và media | Còn thiếu |
| [DEC-021](#dec-021) | Định dạng lyrics và show notes | Còn thiếu |
| [DEC-022](#dec-022) | Ràng buộc schema đích | Cả hai |

<a id="dec-001"></a>

## DEC-001 Phạm vi và ưu tiên use case

Trạng thái: `OPEN`. Loại: xung đột.

Một mô tả ràng buộc chốt theo 11 UC; danh mục nghiệp vụ có UC01–UC12. UC04 được phân loại Must-Have, Must/Should và Should-Have ở các mô tả khác nhau. Nhóm Should-Have có cách đếm ba hoặc bốn tính năng, khác cách gom lyrics và podcast controls.

Cần chốt danh mục nghiệm thu, ưu tiên từng yêu cầu và phần Should-Have thực sự cam kết. Ảnh hưởng: toàn bộ [use case](../requirements/use-cases.md), [quản lý](../project/management.md), [nghiệm thu](../testing/acceptance.md). Giữ đủ 12 UC để không thất lạc yêu cầu; điều đó không tự chốt cả 12 vào phạm vi nghiệm thu. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-002"></a>

## DEC-002 Thời điểm đăng ký Creator

Trạng thái: `OPEN`. Loại: xung đột.

Phương án A nhận `isCreator`, `channelName`, `bio` ngay khi tạo tài khoản và đặt `pending`. Phương án B tạo Listener trước, sau đó người đã đăng nhập nộp hồ sơ Creator riêng. Không tự cung cấp cả hai luồng để tránh việc phải quyết định.

Cần xác nhận luồng, điều kiện nộp lại và tác động tới đăng ký tài khoản. Ảnh hưởng: UC01/UC12, BR-002, API-01/API-24/API-25, `users`. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-003"></a>

## DEC-003 OTP và khôi phục mật khẩu

Trạng thái: `OPEN`. Loại: cả hai.

Có yêu cầu OTP sáu chữ số, mô phỏng tại console, hạn năm phút; mô tả khác không có OTP trong body đăng ký. Có quy tắc hủy sau ba lần sai và lựa chọn RAM/Redis, nhưng chưa có hợp đồng đầy đủ cho gửi/xác minh OTP hoặc reset mật khẩu.

Cần chốt trường request/response, mục đích mã, lưu trữ, dùng một lần, gửi lại, số lần thử, xử lý tài khoản bị khóa và tác động reset tới token. Không thêm Redis, bảng OTP hoặc route chỉ từ các ví dụ. Ảnh hưởng: UC01/UC02, BR-003, API-01/API-02, NFR-002, TC-02/TC-04. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-004"></a>

## DEC-004 Đường dẫn và method API

Trạng thái: `OPEN`. Loại: xung đột.

| Nghiệp vụ | Phương án A | Phương án B |
| --- | --- | --- |
| Upload | `POST /api/tracks` | `POST /api/tracks/upload` |
| Ghi lượt nghe | `POST /api/tracks/:id/play` | `PATCH /api/tracks/:id/play-count` |
| Tác phẩm của tôi | `GET /api/tracks/creator/my-tracks` | `GET /api/tracks/my-uploads` |
| Mới phát hành | `GET /api/tracks?sort=newest` | `GET /api/tracks/new-releases` |

Cần chốt route/method và có thật sự cần endpoint riêng hay không; chưa quyết định alias tương thích. Ảnh hưởng: UC03/UC05/UC08/UC09, API-05/API-08/API-09/API-12, hợp đồng và kiểm thử. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-005"></a>

## DEC-005 Chức năng thiếu hợp đồng API

Trạng thái: `OPEN`. Loại: còn thiếu.

Nhu cầu hồ sơ cá nhân có mô tả `GET /api/users/profile` bên cạnh `GET /api/auth/me`; có nộp hồ sơ `POST /api/users/creator-register`. Chưa xác định đầy đủ quyền, body và response cho các route mới. Sắp thứ tự playlist, gửi lại hồ sơ, khôi phục track và đổi mật khẩu khi đã đăng nhập cũng thiếu hợp đồng đầy đủ.

Cần chốt chức năng nào thuộc phạm vi và hợp đồng tương ứng trước khi thêm route. Không xem việc kiểm kê 27 endpoint là chứng minh đã bao phủ hết nghiệp vụ. Ảnh hưởng: UC02/UC07/UC11/UC12, API-04/API-17/API-25/API-27. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-006"></a>

## DEC-006 Vòng đời JWT và thay đổi quyền

Trạng thái: `OPEN`. Loại: cả hai.

JWT được mô tả có hạn 24 giờ, payload có cách gọi `userId` hoặc `id,email,role`. Logout có mô tả stateless chỉ xóa token ở bên sử dụng; khóa tài khoản lại yêu cầu thu hồi phiên ngay. Duyệt Creator yêu cầu quyền mới có hiệu lực ngay.

Cần xác nhận payload, lưu/thu hồi phiên, kiểm tra trạng thái người dùng, thay đổi quyền, logout, reset mật khẩu và token cũ sau mở khóa. Không tự thêm refresh token hoặc denylist. Ảnh hưởng: UC02/UC10/UC12, mọi protected API và TC-03/TC-05/TC-15/TC-18. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-007"></a>

## DEC-007 Dữ liệu hồ sơ Creator

Trạng thái: `OPEN`. Loại: còn thiếu.

Nhu cầu có lĩnh vực hoạt động, thời điểm gửi hồ sơ và lý do từ chối; schema chỉ có `creator_status`, `channel_name`, `bio`, `created_at` của tài khoản. Không dùng ngày tạo tài khoản làm ngày gửi hồ sơ khi chưa xác nhận. Lịch sử review và người duyệt chưa có mô hình.

Cần chốt dữ liệu lưu, mức độ cần lịch sử, gửi lại sau từ chối và thay đổi hồ sơ đã duyệt. Ảnh hưởng: UC12, `users`, API-24/API-25, BR-002, TC-18. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-008"></a>

## DEC-008 Nơi lưu media

Trạng thái: `OPEN`. Loại: xung đột.

Có phương án lưu filesystem local và phương án Cloudinary/Supabase Storage gói miễn phí. Khung repo có `backend/uploads/audio` và `images`; sự tồn tại này không phê duyệt phương án local.

Cần xác nhận đích lưu, ràng buộc demo độc lập mạng, dung lượng và chi phí. Ảnh hưởng: UC08/UC09, `tracks`, BR-005, kiến trúc và thiết lập local. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-009"></a>

## DEC-009 Phục vụ và vòng đời file media

Trạng thái: `OPEN`. Loại: còn thiếu.

Có ý định phục vụ thư mục uploads trực tiếp, đồng thời yêu cầu track bị gỡ không thể phát. Ẩn kết quả truy vấn không tự ngăn đường dẫn file đã biết. Chưa có hợp đồng phát media, HTTP Range, hành vi khi khóa chủ sở hữu, xóa vật lý, cache hoặc dọn file sau upload thất bại.

Cần chốt khả năng truy cập file, thời điểm ngừng phát, xử lý Range/seek và cơ chế nhất quán file–database. Ảnh hưởng: UC05/UC08/UC09/UC11, API-07/API-09/API-11/API-27, TC-08/TC-09/TC-17. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-010"></a>

## DEC-010 Ghi nhận lượt nghe

Trạng thái: `OPEN`. Loại: cả hai.

Có mô tả tăng khi bắt đầu phát và mô tả sau ít nhất 10 giây. Route là public nhưng chưa có quy tắc xác định lượt hợp lệ, chống lặp và tác phẩm đã gỡ. Câu lệnh tăng bộ đếm không phải cơ chế chống spam.

Cần chốt sự kiện tính lượt, ngưỡng, nhận diện lượt trùng và xử lý đồng thời. Ảnh hưởng: UC03/UC05, API-06/API-08, `tracks.play_count`, TC-10. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-011"></a>

## DEC-011 Duration và thay file tác phẩm

Trạng thái: `OPEN`. Loại: cả hai.

Request upload yêu cầu `duration`; mô tả khác yêu cầu server tính duration. Update cho phép JSON hoặc multipart khi đổi cover nhưng không có hợp đồng đầy đủ cho đổi audio, thay ảnh, file cũ và metadata liên quan.

Cần chốt nguồn duration, cách kiểm chứng, hỗ trợ thay file và xử lý thất bại. Ảnh hưởng: UC08/UC09, API-09/API-10, `tracks.duration`, TC-09/TC-11. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-012"></a>

## DEC-012 Ngữ nghĩa tìm kiếm tiếng Việt

Trạng thái: `OPEN`. Loại: xung đột.

Có yêu cầu tìm không phân biệt hoa thường bằng `ILIKE` và mô tả tìm không dấu. Hai hành vi này không đồng nhất. Chưa chốt trường tìm, chuẩn hóa Unicode, thứ tự khi bằng điểm/lượt nghe và giới hạn keyword.

Cần bộ ví dụ mong đợi, chẳng hạn quan hệ giữa “Son Tung” và “Sơn Tùng”, rồi mới chọn kỹ thuật/index. Ảnh hưởng: UC04, API-05/API-22/API-26, NFR-001, TC-07. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-013"></a>

## DEC-013 Hệ quản trị và phiên bản database

Trạng thái: `OPEN`. Loại: xung đột.

SQL hiện viết cho PostgreSQL; mô tả có PostgreSQL hoặc MySQL. Các mốc phiên bản được nêu là PostgreSQL 18, 16 hoặc 14 trở lên. Chưa có kiểm tra tương thích môi trường thực tế.

Cần xác nhận hệ quản trị đích, phiên bản hỗ trợ và môi trường demo. Không chuyển SQL sang MySQL hoặc cài PostgreSQL chỉ để đóng câu hỏi này. Ảnh hưởng: toàn bộ bảng, local setup, migration và test database. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-014"></a>

## DEC-014 Toolchain backend và database

Trạng thái: `OPEN`. Loại: còn thiếu.

Định hướng Node.js/Express có mô tả Node 18 trở lên, npm 9 trở lên; chưa chốt phiên bản được hỗ trợ, JavaScript/TypeScript, module system, package manager/lockfile, truy cập DB, cấu hình/secrets, migration, test runner và lệnh build/lint/test. Bảng API nhắc `pg`, `bcryptjs`, `jsonwebtoken`, `multer`, `express-validator`, chưa có manifest để xác nhận đã chọn/cài.

Cần chốt bộ công cụ tối thiểu và lệnh chạy trước khi giao việc bootstrap. Ảnh hưởng: toàn bộ backend, local setup và chiến lược kiểm thử. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-015"></a>

## DEC-015 Điều kiện đo chất lượng

Trạng thái: `OPEN`. Loại: còn thiếu.

Có mục tiêu đọc API dưới 500 ms và bắt đầu phát audio trong một giây, nhưng chưa có máy đo, số bản ghi, file mẫu, tải đồng thời, warm/cold cache và cách tính percentile. Mốc phát audio là phép đo tích hợp; backend chưa có SLA thành phần được xác nhận.

Cần chốt quy trình đo, ngưỡng nghiệm thu và phân loại mức độ lỗi. Ảnh hưởng: NFR-001/NFR-004, TC-20/TC-21, mục tiêu quản lý chất lượng. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-016"></a>

## DEC-016 Kế hoạch và quản trị dự án

Trạng thái: `OPEN`. Loại: cả hai.

Có kế hoạch 10 tuần, ba sprint, bốn milestone, ngày 17/09/2026–26/11/2026 tạm tính. Chuỗi gọi là đường găng gồm các công việc được ghi nối tiếp nhưng lịch gối đầu; chưa đủ quan hệ phụ thuộc/duration để chứng minh float bằng không. Có cách gọi 10 tuần là 70 ngày làm việc. Vai trò Database/QA có mô tả kiêm nhiệm và mô tả phân công riêng; công cụ theo dõi có Trello và GitHub Projects chính/Trello dự phòng.

Chi phí nhân công có mô tả chưa định giá và 300 giờ × 50.000 đồng = 15 triệu đồng học thuật. Rủi ro điểm 6 có ngưỡng ưu tiên cao nhưng cũng được phân loại trung bình. Chưa xác nhận người chốt kỹ thuật, người nghiệm thu và baseline tiến độ.

Cần thống nhất lịch, phụ thuộc, công cụ, nguồn lực, cơ sở chi phí và thang rủi ro; không tự tính lại hoặc chấp nhận chỉ số quản lý để thay quyết định. Ảnh hưởng: [management](../project/management.md), phạm vi nghiệm thu và phân công. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-017"></a>

## DEC-017 Quy ước hợp đồng HTTP

Trạng thái: `OPEN`. Loại: còn thiếu.

Ví dụ response có `success`, `data`, `message`; token và playCount đôi lúc ở cấp ngoài. Pagination có lúc ở ngoài `data`, có lúc nằm trong `data`. Không có error envelope, success status cho từng method, giới hạn page/limit toàn cục, xử lý query lạ, quy tắc null/omitted, thời gian/timezone hoặc chuẩn hóa email. JWT cũng có tên định danh khác nhau.

Cần chốt phần nào giữ nguyên theo endpoint, phần nào dùng quy ước chung. Không tự chuẩn hóa các ví dụ thành một schema mới. Ảnh hưởng: toàn bộ API, mapping snake_case–camelCase, kiểm thử hợp đồng. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-018"></a>

## DEC-018 Quyền Admin và nội dung của tài khoản bị khóa

Trạng thái: `OPEN`. Loại: còn thiếu.

Admin có quyền sửa/xóa mọi track và upload; điều kiện `creator_status=approved` chưa nói rõ ngoại lệ Admin. Playlist được mô tả cá nhân, chưa có quyền Admin can thiệp playlist người khác. Khi khóa người dùng, chưa rõ tác phẩm có bị ẩn, đang phát có dừng, và mở khóa có khôi phục nội dung nào. Chỉ có yêu cầu rõ không tự khóa Admin đang đăng nhập; quyền khóa Admin khác chưa xác định.

Cần ma trận cho các trường hợp này trước khi viết middleware hoặc truy vấn lan truyền. Ảnh hưởng: BR-001/BR-004/BR-007, UC07–UC12, TC-05/TC-15/TC-16. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-019"></a>

## DEC-019 Thứ tự và cập nhật playlist

Trạng thái: `OPEN`. Loại: còn thiếu.

Có ý định append bằng `MAX(sort_order)+1`, đọc theo thứ tự và cho phép sắp xếp lại. Chưa có hợp đồng reorder hoặc quy tắc đồng thời, khoảng trống/thứ tự trùng, track đã bị gỡ và quyền sửa playlist đã xóa. PK ngăn trùng cặp playlist–track nhưng không ngăn trùng sort_order.

Cần chốt semantics và tính nguyên tử trước khi chọn transaction hoặc constraint đích. Ảnh hưởng: UC07, API-17/API-20/API-21, `playlist_tracks`, TC-12/TC-13/TC-14. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-020"></a>

## DEC-020 Bộ dữ liệu demo và media

Trạng thái: `OPEN`. Loại: còn thiếu.

Seed có tài khoản/thể loại/track/playlist và đường dẫn media, nhưng chưa có các file tương ứng trong checkout. Mật khẩu mẫu được chú thích là `123456`; chưa kiểm chứng hash. Một số tên nghệ sĩ không trùng người sở hữu upload; chưa biết đó là dữ liệu minh họa có chủ ý hay sai lệch cần sửa. Chưa có manifest quyền sử dụng nội dung.

Cần xác nhận bộ demo, nguồn và giấy phép, cách cung cấp file, hash đăng nhập và tính nhất quán metadata trước khi dùng làm fixture nghiệm thu. Không sửa seed trong công việc docs. Ảnh hưởng: UC02/UC05/UC08, R04, TC-03/TC-08/TC-19. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-021"></a>

## DEC-021 Định dạng lyrics và show notes

Trạng thái: `OPEN`. Loại: còn thiếu.

Schema chỉ có `lyrics TEXT` và `description TEXT`; có yêu cầu các mốc thời gian tương ứng nội dung. Chưa có format lưu/trao đổi timestamp, cách parse, độ chính xác hoặc quy tắc text rỗng, nội dung có markup và độ dài. Không suy ra dữ liệu đồng bộ thời gian từ một chuỗi văn bản tự do.

Cần xác nhận backend chỉ trả text hay cung cấp cấu trúc thời gian và quy tắc kiểm tra nội dung. Ảnh hưởng: UC06/UC08/UC09, API-07/API-09/API-10, BR-006, TC-08/TC-09. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-022"></a>

## DEC-022 Ràng buộc schema đích

Trạng thái: `OPEN`. Loại: cả hai.

SQL hiện dùng `sort_order DEFAULT 1`; có mô tả dữ liệu dùng mặc định 0. Các cột ảnh có DEFAULT nhưng vẫn cho phép NULL; quy tắc nghiệp vụ về giá trị thiếu chưa đầy đủ. Duration/play_count/sort_order chưa có CHECK không âm; chưa có ràng buộc đồng bộ role–creator_status. Cơ chế soft delete được yêu cầu nhưng FK CASCADE chỉ tác động khi DELETE vật lý.

Cần xác nhận schema đích, ràng buộc đặt tại database hay nghiệp vụ, chính sách xóa vật lý/khôi phục và thứ tự trong playlist. Bản từ điển dữ liệu ghi nguyên SQL hiện có; việc ghi nhận này không chốt giữ nguyên thiết kế. Ảnh hưởng: toàn bộ schema, BR-002/BR-004/BR-008, TC-13/TC-16/TC-19. Người chốt/kết quả: chưa xác định; không có mặc định.
