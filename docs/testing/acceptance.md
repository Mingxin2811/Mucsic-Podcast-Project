# Kịch bản nghiệm thu backend

Trạng thái tất cả kịch bản: **NOT_RUN**. Expected dưới đây diễn đạt thiết kế `DRAFT`; chỉ dùng làm hợp đồng thực thi sau khi các quyết định liên quan được xác nhận. Không có lần chạy API/SQL/media nào được ghi nhận ở trang này. Cách ghi kết quả ở [strategy](strategy.md).

## Danh mục

| TC | Trọng tâm | UC |
| --- | --- | --- |
| [TC-01](#tc-01) | Đăng ký và trùng email | UC01 |
| [TC-02](#tc-02) | OTP đăng ký | UC01 |
| [TC-03](#tc-03) | Login và tài khoản hiện tại | UC02 |
| [TC-04](#tc-04) | Khôi phục mật khẩu | UC02 |
| [TC-05](#tc-05) | Token và vòng đời phiên | UC02/UC10 |
| [TC-06](#tc-06) | Trending và mới phát hành | UC03 |
| [TC-07](#tc-07) | Tìm kiếm và thể loại | UC04 |
| [TC-08](#tc-08) | Chi tiết, metadata và media | UC05/UC06 |
| [TC-09](#tc-09) | Upload và nhất quán file–DB | UC08 |
| [TC-10](#tc-10) | Tính lượt nghe | UC05 |
| [TC-11](#tc-11) | Quyền quản lý tác phẩm | UC09 |
| [TC-12](#tc-12) | Vòng đời playlist | UC07 |
| [TC-13](#tc-13) | Thành viên/thứ tự playlist | UC07 |
| [TC-14](#tc-14) | Quyền sở hữu playlist | UC07 |
| [TC-15](#tc-15) | Quản trị tài khoản | UC10 |
| [TC-16](#tc-16) | Soft delete và truy vấn | UC07/UC09/UC11 |
| [TC-17](#tc-17) | Truy cập URL của track bị gỡ | UC05/UC11 |
| [TC-18](#tc-18) | Vòng đời Creator | UC12 |
| [TC-19](#tc-19) | DDL, seed và fixture | Nhiều UC |
| [TC-20](#tc-20) | Hiệu năng có điều kiện đo | UC03/UC04/UC05/UC07 |
| [TC-21](#tc-21) | Tái hiện và phục hồi | Nhiều UC |

<a id="tc-01"></a>

## TC-01 Đăng ký và trùng email

**Đầu vào:** thông tin hợp lệ với email chưa có; tên dưới 2/trên 50 ký tự, email sai, mật khẩu dưới sáu ký tự và email đã tồn tại. **Thao tác:** gọi [API-01](../api/auth.md#api-01); đọc user được tạo trong DB thử nghiệm.

**Expected dự kiến:** chỉ dữ liệu hợp lệ được tạo; password_hash khác plaintext và kiểm tra được bằng thuật toán được chọn; response không có hash; input sai báo 400, trùng email báo 409 theo mô tả. Đối chiếu trạng thái Creator theo luồng đã chốt, không tự chọn `none` hay `pending` cho trường hợp xung đột. **Phụ thuộc:** DEC-002/DEC-003/DEC-014/DEC-017/DEC-022. **Bằng chứng:** request đã loại mật khẩu, response, số hàng và kiểm tra hash không lộ hash thật.

<a id="tc-02"></a>

## TC-02 OTP đăng ký

**Đầu vào:** email, mã đúng, mã sai, hết hạn, dùng lại và nhiều lần yêu cầu. **Thao tác:** sau khi chốt hợp đồng OTP, kiểm tra gửi/xác minh và đăng ký theo từng trường hợp.

**Expected:** xác định theo [DEC-003](../decisions/open-decisions.md#dec-003); thiết kế đang nêu sáu số/năm phút và hủy sau ba lần sai nhưng chưa được xác nhận đồng bộ. Chưa có route/body để gửi thử. **Phụ thuộc:** DEC-002/DEC-003/DEC-017. **Bằng chứng cần có:** thời điểm, kết quả từng lần, thay đổi trạng thái và việc mã đã dùng; không lưu OTP thật vào log bàn giao.

<a id="tc-03"></a>

## TC-03 Login và tài khoản hiện tại

**Đầu vào:** tài khoản hoạt động với mật khẩu đúng/sai, thiếu trường, tài khoản bị khóa và token hợp lệ. **Thao tác:** [API-02](../api/auth.md#api-02), rồi [API-04](../api/auth.md#api-04).

**Expected dự kiến:** đúng tài khoản cấp token và trả đúng user không có hash; sai thông tin 401, thiếu trường 400, login user khóa 403. API me với token lỗi có 401, user không tồn tại/khóa được mô tả 404; giữ khác biệt này cho review hợp đồng, không tự sửa test. **Phụ thuộc:** DEC-006/DEC-014/DEC-017/DEC-020. **Bằng chứng:** response đã loại token và đối chiếu user hiện tại.

<a id="tc-04"></a>

## TC-04 Khôi phục mật khẩu

**Đầu vào:** tài khoản tồn tại/không tồn tại/bị khóa, OTP đúng/sai/hết hạn và mật khẩu mới. **Thao tác:** dùng hợp đồng reset sẽ được chốt, thử đăng nhập bằng mật khẩu cũ/mới và token trước đó.

**Expected:** chưa chốt route, response, trường hợp user khóa và token cũ; không có request chạy sẵn. Khi được xác nhận, mật khẩu phải đổi qua hash, không lưu plaintext. **Phụ thuộc:** DEC-003/DEC-005/DEC-006/DEC-017. **Bằng chứng:** thay đổi đăng nhập và trạng thái phiên, không ghi mật khẩu/token thật.

<a id="tc-05"></a>

## TC-05 Token và vòng đời phiên

**Đầu vào:** token bị sửa/hết hạn, token trước logout, trước khóa/mở khóa, trước reset và trước approve Creator. **Thao tác:** gọi [API-03](../api/auth.md#api-03), [API-23](../api/admin.md#api-23) hoặc thao tác lifecycle tương ứng, rồi protected request.

**Expected dự kiến:** token không hợp lệ không truy cập được protected API. Expected token cũ ở từng sự kiện phải lấy từ [DEC-006](../decisions/open-decisions.md#dec-006), chưa tự chọn invalidation hay chờ hết TTL. **Phụ thuộc:** DEC-003/DEC-006/DEC-017/DEC-018. **Bằng chứng:** thứ tự sự kiện, trạng thái user, kết quả trước/sau đã loại token.

<a id="tc-06"></a>

## TC-06 Trending và mới phát hành

**Đầu vào:** track music/podcast có lượt nghe/ngày tạo khác nhau, bằng nhau và track đã gỡ; kho rỗng. **Thao tác:** [API-05](../api/tracks.md#api-05), [API-06](../api/tracks.md#api-06).

**Expected dự kiến:** loại track bị gỡ, sort theo play_count hoặc created_at đúng thiết kế; phản ánh type/limit theo hợp đồng. Tie-break, shape khi chọn type và route new-releases chưa chốt. **Phụ thuộc:** DEC-004/DEC-010/DEC-017/DEC-018. **Bằng chứng:** fixture kiểm soát thứ tự và danh sách thực trả, không chỉ kiểm tra độ dài.

<a id="tc-07"></a>

## TC-07 Tìm kiếm và thể loại

**Đầu vào:** keyword theo title/artist, chữ hoa/thường, có/không dấu, genreId/type, page/limit hợp lệ và sai, slug có/không tồn tại. **Thao tác:** [API-05](../api/tracks.md#api-05), [API-13](../api/genres.md#api-13), [API-14](../api/genres.md#api-14).

**Expected dự kiến:** kết hợp điều kiện đúng, không trả track bị gỡ; slug không tồn tại 404; page/limit sai ở API-05 được mô tả 400. Expected bỏ dấu và phân trang toàn cục theo DEC-012/DEC-017, không suy ra từ ILIKE. **Bằng chứng:** cặp query/fixture/result, kể cả rỗng và qua ranh giới trang. **Phụ thuộc:** DEC-012/DEC-017/DEC-018.

<a id="tc-08"></a>

## TC-08 Chi tiết tác phẩm, metadata và media

**Đầu vào:** music/podcast có hoặc thiếu lyrics/description, track bị gỡ, id sai, file tồn tại/thiếu. **Thao tác:** [API-07](../api/tracks.md#api-07) và giao thức media được chốt.

**Expected dự kiến:** trả đúng trackType, duration, metadata và quan hệ; id sai 400, track không có/đã gỡ 404 theo mô tả. Xử lý nullable/timestamp và thiếu file theo DEC-009/DEC-017/DEC-021; chưa kiểm tra hành vi nghe ngoài backend. **Bằng chứng:** response metadata và HTTP media thực tế. **Phụ thuộc:** DEC-009/DEC-011/DEC-017/DEC-018/DEC-021.

<a id="tc-09"></a>

## TC-09 Upload và nhất quán file với database

**Đầu vào:** Creator hợp lệ, Listener, Admin, MP3 hợp lệ, thiếu audio, sai nội dung/đuôi, vượt giới hạn, cover thiếu/hợp lệ/quá giới hạn; metadata sai. **Thao tác:** [API-09](../api/tracks.md#api-09); gây lỗi lưu file và lỗi DB trong môi trường thử nghiệm khi cơ chế lỗi đã xác định.

**Expected dự kiến:** gắn đúng creator_id, không cho body giả mạo sở hữu; Listener bị từ chối; 400/401/403/413 theo nhánh đã mô tả. Không có trạng thái thành công giả hoặc dữ liệu/file còn dư trái chính sách được chốt. Admin status, MIME/MB, duration và rollback chưa có expected cuối. **Phụ thuộc:** DEC-004/DEC-008/DEC-009/DEC-011/DEC-017/DEC-018/DEC-021/DEC-022. **Bằng chứng:** request, phản hồi, thay đổi file/hàng DB và kết quả sau lỗi.

<a id="tc-10"></a>

## TC-10 Ghi nhận lượt nghe

**Đầu vào:** lượt đúng điều kiện, phát ngắn, lặp lại, đồng thời, id không tồn tại/track bị gỡ. **Thao tác:** [API-08](../api/tracks.md#api-08) theo method/path sẽ chốt.

**Expected:** lượng tăng phải khớp số lượt hợp lệ theo DEC-010; chưa chọn tăng ngay hoặc sau 10 giây. Kiểm tra trạng thái cuối và số cập nhật dưới đồng thời; không chỉ kiểm tra HTTP thành công. **Phụ thuộc:** DEC-004/DEC-009/DEC-010/DEC-017. **Bằng chứng:** play_count trước/sau và thứ tự request.

<a id="tc-11"></a>

## TC-11 Quyền quản lý tác phẩm

**Đầu vào:** Creator A/B và Admin, track của từng Creator, metadata hợp lệ/sai, track đã gỡ. **Thao tác:** [API-10](../api/tracks.md#api-10), [API-11](../api/tracks.md#api-11), [API-12](../api/tracks.md#api-12).

**Expected dự kiến:** Creator chỉ sửa/gỡ và liệt kê tác phẩm của mình; truy cập chéo bị từ chối và không thay dữ liệu; Admin sửa/gỡ theo quyền được mô tả. Khả năng thay file, list cá nhân của Admin và cập nhật track đã gỡ còn mở. **Phụ thuộc:** DEC-004/DEC-006/DEC-009/DEC-011/DEC-017/DEC-018/DEC-021. **Bằng chứng:** response và DB/file trước/sau.

<a id="tc-12"></a>

## TC-12 Vòng đời playlist

**Đầu vào:** Listener hoạt động, tên hợp lệ/rỗng/quá dài, playlist đã tạo và đã xóa. **Thao tác:** [API-15](../api/playlists.md#api-15) đến [API-19](../api/playlists.md#api-19).

**Expected dự kiến:** tạo gắn user xác thực; đọc/đổi title/description đúng; xóa mềm loại khỏi danh sách; không xóa track dùng chung. PUT omitted/null và thao tác lại trên playlist đã xóa phải chốt trước khi đặt expected. **Phụ thuộc:** DEC-017/DEC-018/DEC-019/DEC-022. **Bằng chứng:** luồng tạo/đọc/sửa/xóa và hàng DB.

<a id="tc-13"></a>

## TC-13 Thành viên và thứ tự playlist

**Đầu vào:** playlist có nhiều track, thêm trùng, track không tồn tại/đã gỡ, thêm đồng thời và yêu cầu reorder. **Thao tác:** [API-20](../api/playlists.md#api-20), [API-21](../api/playlists.md#api-21), API-17; reorder chỉ chạy khi có hợp đồng.

**Expected dự kiến:** PK không tạo hai cặp giống nhau; thêm trùng được mô tả 400; gỡ liên kết không xóa track. Thứ tự, khoảng trống, đồng thời và reorder theo DEC-019/DEC-022, không mặc định MAX+1 là đủ. **Phụ thuộc:** DEC-005/DEC-017/DEC-019/DEC-022. **Bằng chứng:** tập liên kết/thứ tự trước/sau, request được điều khiển đồng thời khi cần.

<a id="tc-14"></a>

## TC-14 Quyền sở hữu playlist

**Đầu vào:** Listener A/B, playlist A, token B, Admin. **Thao tác:** dùng B đọc/sửa/xóa/thêm/gỡ track playlist A qua API-17–API-21, rồi kiểm tra DB.

**Expected dự kiến:** B không được thao tác tài nguyên A, không có thay đổi dữ liệu; các route này mô tả 403. Can thiệp của Admin chưa chốt, không tự mở quyền. **Phụ thuộc:** DEC-006/DEC-017/DEC-018/DEC-019. **Bằng chứng:** response và xác nhận dữ liệu A nguyên trạng.

<a id="tc-15"></a>

## TC-15 Quản trị tài khoản

**Đầu vào:** Admin, Listener, user active/locked, chính Admin đang đăng nhập và id không tồn tại. **Thao tác:** [API-22](../api/admin.md#api-22), [API-23](../api/admin.md#api-23), login và protected request trước/sau khóa.

**Expected dự kiến:** chỉ Admin quản trị, action ban/unban cập nhật deleted_at; tự khóa bị chặn 400 theo mô tả; user khóa không login được. Quyền khóa Admin khác, tác động nội dung và phiên cũ phải theo DEC-006/DEC-018. **Phụ thuộc:** DEC-006/DEC-012/DEC-017/DEC-018/DEC-022. **Bằng chứng:** response, trạng thái và phép thử quyền trước/sau.

<a id="tc-16"></a>

## TC-16 Xóa mềm và truy vấn

**Đầu vào:** track đang trong playlist, playlist đang hoạt động và user có nội dung. **Thao tác:** gỡ track bằng API-11 hoặc [API-27](../api/admin.md#api-27); đọc public và [API-26](../api/admin.md#api-26); xóa mềm playlist bằng API-19.

**Expected dự kiến:** track có deleted_at, không còn trong truy vấn public; Admin có thể lọc kho deleted; hàng và liên kết không bị xóa vật lý chỉ vì soft delete. Track gỡ trong playlist, khóa user và restore còn cần quyết định. **Phụ thuộc:** DEC-005/DEC-009/DEC-017/DEC-018/DEC-019/DEC-022. **Bằng chứng:** kết quả truy vấn trước/sau và hàng/khóa liên kết.

<a id="tc-17"></a>

## TC-17 URL của tác phẩm đã gỡ

**Đầu vào:** URL audio đã biết, request mới/đang chạy, Range và track trước/sau gỡ. **Thao tác:** truy cập trực tiếp media, không chỉ gọi API chi tiết.

**Expected:** phải lấy từ [DEC-009](../decisions/open-decisions.md#dec-009), gồm thời điểm ngừng phục vụ và chính sách request đang chạy/cache. Không kết luận “không thể phát” chỉ từ 404 metadata. Khôi phục chỉ thử sau DEC-005. **Phụ thuộc:** DEC-005/DEC-009/DEC-018. **Bằng chứng:** HTTP status/header/byte trả về và thời điểm gỡ.

<a id="tc-18"></a>

## TC-18 Vòng đời Creator

**Đầu vào:** Listener none/pending/rejected, Creator approved, user khóa và hai thao tác review cạnh tranh. **Thao tác:** luồng nộp hồ sơ đã chốt, [API-24](../api/admin.md#api-24), [API-25](../api/admin.md#api-25), sau đó thử upload với token cũ/mới.

**Expected dự kiến:** approve tạo role creator/status approved; reject không cấp quyền; review không có/đã xử lý báo 404 theo mô tả. Ngày gửi, lý do từ chối, gửi lại, đồng thời và hiệu lực quyền chưa chốt. Không dùng created_at user làm ngày gửi hồ sơ. **Phụ thuộc:** DEC-002/DEC-005/DEC-006/DEC-007/DEC-017/DEC-018/DEC-022. **Bằng chứng:** trạng thái trước/sau và kiểm tra quyền tại ranh giới HTTP.

<a id="tc-19"></a>

## TC-19 DDL, seed và fixture

**Điều kiện:** database thử nghiệm dùng riêng, đúng engine/version được chốt, phạm vi chạy reset được giao rõ. **Thao tác tương lai:** chạy DDL/seed, kiểm tra năm bảng, FK/CHECK/UNIQUE/default, sequence sau insert và dữ liệu mẫu. Đọc [cảnh báo tác động SQL](../development/local-setup.md) trước khi chạy.

**Expected quan sát DDL:** PK/UNIQUE/FK và enum CHECK hành xử đúng khai báo; soft delete không tự cascade; sort_order default hiện tại 1, nullable đúng từ điển. Đây không phê duyệt schema đích. Kiểm tra mật khẩu mẫu, file media và quyền sử dụng riêng; không gọi seed hợp lệ khi thiếu file. **Phụ thuộc:** DEC-007/DEC-013/DEC-014/DEC-019/DEC-020/DEC-022. **Bằng chứng:** phiên bản, revision, log, truy vấn và tập file; ghi cả lỗi.

<a id="tc-20"></a>

## TC-20 Hiệu năng

**Đầu vào:** máy/runtime/DB, kích thước dữ liệu/file, query và tải theo protocol được xác nhận. **Thao tác:** đo API danh sách/tìm kiếm/playlist và thành phần media theo hợp đồng; ghi cold/warm cache và cách thống kê đã chốt.

**Expected:** ngưỡng/percentile theo [DEC-015](../decisions/open-decisions.md#dec-015); chưa đủ điều kiện đặt pass/fail cho 500 ms hoặc một giây. Mục tiêu phát audio tích hợp không được coi đã đạt từ thời gian API metadata. **Phụ thuộc:** DEC-009/DEC-012/DEC-014/DEC-015/DEC-017. **Bằng chứng:** dữ liệu đo thô, công cụ, môi trường, phương pháp tổng hợp và giới hạn phép đo.

<a id="tc-21"></a>

## TC-21 Tái hiện môi trường và phục hồi

**Đầu vào:** cấu hình được xác nhận, database/media thử nghiệm, backup hợp lệ và môi trường sạch. **Thao tác:** tái hiện thiết lập, kiểm tra API chính, backup/restore theo quy trình được chốt; kiểm tra khả năng demo không phụ thuộc mạng nếu đó là ràng buộc được xác nhận.

**Expected:** tái hiện đúng dữ liệu và tài nguyên theo protocol, không chỉ kiểm tra process có chạy. Chính sách backup/retention, phạm vi local/cloud và tiêu chí còn mở. **Phụ thuộc:** DEC-008/DEC-009/DEC-013/DEC-014/DEC-015/DEC-020/DEC-022. **Bằng chứng:** lệnh thật, phiên bản, đối chiếu trước/sau restore và file được phục hồi.
