# Use case nghiệp vụ và trách nhiệm backend

Trạng thái: `DRAFT`; triển khai `NOT_IMPLEMENTED`, kiểm chứng `NOT_RUN` theo [hiện trạng](../project/status.md). Danh mục giữ đủ UC01–UC12; phạm vi nghiệm thu và ưu tiên còn [DEC-001](../decisions/open-decisions.md#dec-001). “Must/Should được mô tả” không phải xác nhận của người giao việc.

## Danh mục

| UC | Nghiệp vụ | Tác nhân | Ưu tiên được mô tả |
| --- | --- | --- | --- |
| [UC01](#uc01) | Đăng ký tài khoản | Guest | Must |
| [UC02](#uc02) | Đăng nhập/đăng xuất, khôi phục mật khẩu | Guest/thành viên | Must; phạm vi mở rộng chưa chốt |
| [UC03](#uc03) | Khám phá và Trending | Guest/thành viên | Should |
| [UC04](#uc04) | Tìm kiếm và lọc | Guest/thành viên | Must, Must/Should hoặc Should; OPEN |
| [UC05](#uc05) | Truy cập audio và ghi nhận lượt nghe | Guest/thành viên | Must |
| [UC06](#uc06) | Nội dung bổ sung và khả năng nghe nâng cao | Guest/thành viên | Should |
| [UC07](#uc07) | Playlist cá nhân | Thành viên | Must |
| [UC08](#uc08) | Upload tác phẩm | Creator/Admin | Must |
| [UC09](#uc09) | Quản lý tác phẩm | Creator/Admin | Must |
| [UC10](#uc10) | Quản lý tài khoản | Admin | Must |
| [UC11](#uc11) | Kiểm duyệt nội dung | Admin | Must |
| [UC12](#uc12) | Xét duyệt Creator | Listener/Admin | Must |

<a id="uc01"></a>

## UC01 Đăng ký tài khoản

**Điều kiện:** Guest gửi thông tin tài khoản; email chưa được dùng. **Đầu vào:** tên 2–50 ký tự, email hợp lệ, mật khẩu ít nhất sáu ký tự theo mô tả hiện có; OTP và thông tin Creator phụ thuộc quyết định.

**Luồng backend:** kiểm tra dữ liệu và trùng email; xác minh OTP nếu luồng đó được chốt; băm mật khẩu, tạo `users`; trả thông tin tài khoản không chứa hash. Hậu điều kiện: có tài khoản Listener; trạng thái Creator `none` hoặc `pending` phụ thuộc luồng đăng ký được xác nhận. Đăng ký không được mô tả là tự cấp JWT.

**Ngoại lệ:** dữ liệu sai, email trùng; OTP sai/hết hạn nếu áp dụng; lỗi băm/DB không được báo thành công. Cơ chế nguyên tử và chuẩn hóa email chưa xác định.

**Phụ thuộc:** [API-01](../api/auth.md#api-01), [BR-002](business-rules.md#br-002), [BR-003](business-rules.md#br-003); [DEC-002](../decisions/open-decisions.md#dec-002), [DEC-003](../decisions/open-decisions.md#dec-003), [DEC-017](../decisions/open-decisions.md#dec-017). Nghiệm thu: TC-01/TC-02.

<a id="uc02"></a>

## UC02 Đăng nhập và quản lý phiên

**Điều kiện:** tài khoản tồn tại; đăng nhập yêu cầu email/mật khẩu, thao tác có phiên yêu cầu token. **Luồng:** so khớp mật khẩu băm, kiểm tra tài khoản chưa khóa, cấp JWT được mô tả TTL 24 giờ; cung cấp thông tin tài khoản hiện tại và tiếp nhận logout. **Hậu điều kiện:** xác thực thành công hoặc kết thúc phiên theo semantics còn mở.

**Ngoại lệ:** thiếu thông tin, sai thông tin, bị khóa, token sai/hết hạn hoặc user không còn hợp lệ. Reset mật khẩu là nhu cầu mở rộng: xác minh chủ tài khoản, cập nhật hash, nhưng chưa có hợp đồng hoàn chỉnh. Đổi mật khẩu khi đã đăng nhập cũng chưa được đặc tả đủ.

**Phụ thuộc:** [API auth](../api/auth.md), [BR-003](business-rules.md#br-003); [DEC-003](../decisions/open-decisions.md#dec-003), [DEC-005](../decisions/open-decisions.md#dec-005), [DEC-006](../decisions/open-decisions.md#dec-006). Nghiệm thu: TC-03/TC-04/TC-05.

<a id="uc03"></a>

## UC03 Khám phá và Trending

**Điều kiện:** kho tác phẩm có thể rỗng. **Luồng:** đọc track chưa xóa mềm, trả danh sách mới theo thời gian tạo và danh sách nhiều lượt nghe nhất. Trending dự kiến tối đa 10 theo từng loại; API có query limit. **Hậu điều kiện:** dữ liệu phản ánh bộ lọc và thứ tự đã xác nhận; không thay đổi DB.

**Ngoại lệ:** query sai hoặc DB lỗi; danh sách rỗng không có nghĩa lỗi. Tie-break, giới hạn query và endpoint mới phát hành chưa chốt.

**Phụ thuộc:** [API-05](../api/tracks.md#api-05), [API-06](../api/tracks.md#api-06), BR-004/BR-009; [DEC-004](../decisions/open-decisions.md#dec-004), [DEC-010](../decisions/open-decisions.md#dec-010), [DEC-017](../decisions/open-decisions.md#dec-017). Nghiệm thu: TC-06.

<a id="uc04"></a>

## UC04 Tìm kiếm và lọc thể loại

**Điều kiện:** Guest hoặc thành viên truy vấn kho tác phẩm. **Luồng:** tìm theo tiêu đề/nghệ sĩ hoặc host, kết hợp thể loại, loại music/podcast, sắp xếp và phân trang; đọc danh sách thể loại hoặc thể loại theo slug. **Hậu điều kiện:** trả dữ liệu phù hợp điều kiện, loại track đã gỡ theo quy tắc hiển thị.

**Ngoại lệ:** page/limit hoặc id sai, slug không tồn tại, không có kết quả. Không tự hiểu `ILIKE` là hỗ trợ bỏ dấu.

**Phụ thuộc:** [Tracks API](../api/tracks.md), [Genres API](../api/genres.md), BR-004/BR-009; [DEC-012](../decisions/open-decisions.md#dec-012), [DEC-017](../decisions/open-decisions.md#dec-017), DEC-018. Nghiệm thu: TC-07.

<a id="uc05"></a>

## UC05 Truy cập audio và lượt nghe

**Điều kiện:** track đang được phép truy cập và file tương ứng tồn tại. **Luồng backend:** trả chi tiết/đường dẫn media, phục vụ nội dung audio theo hợp đồng media được chốt và tiếp nhận sự kiện lượt nghe hợp lệ. **Hậu điều kiện:** dữ liệu/file hợp lệ có thể được sử dụng; bộ đếm chỉ tăng theo quy tắc đã xác nhận.

**Ngoại lệ:** track/file không tồn tại, bị gỡ, lỗi đọc file hoặc yêu cầu Range không được hỗ trợ theo hợp đồng đích. Backend chưa có endpoint stream được chốt. Không mô tả điều khiển phát phía ứng dụng sử dụng API trong tài liệu này.

**Phụ thuộc:** [API-07](../api/tracks.md#api-07), [API-08](../api/tracks.md#api-08), [media](../architecture/security-and-media.md); [DEC-004](../decisions/open-decisions.md#dec-004), [DEC-009](../decisions/open-decisions.md#dec-009), [DEC-010](../decisions/open-decisions.md#dec-010). Nghiệm thu: TC-08/TC-10/TC-17.

<a id="uc06"></a>

## UC06 Nội dung bổ sung cho luồng nghe

**Điều kiện:** track có metadata. **Luồng backend:** trả `trackType`, duration, lyrics và description/show notes. **Hậu điều kiện:** bên sử dụng API nhận đúng loại nội dung, kể cả trường không có dữ liệu. Format timestamp và biểu diễn rỗng chưa chốt.

Shuffle/repeat, tua 15 giây và tốc độ 1x/1.25x/1.5x là khả năng sản phẩm đang được mô tả; chưa có trách nhiệm server bổ sung ngoài dữ liệu/media. Không tự tạo route riêng cho chúng hoặc thuật toán giao diện. **Ngoại lệ:** metadata thiếu, text không có cấu trúc thời gian; không khẳng định lyrics đồng bộ chỉ vì có trường TEXT.

**Phụ thuộc:** [API-07](../api/tracks.md#api-07), BR-006; [DEC-021](../decisions/open-decisions.md#dec-021), DEC-009/DEC-011/DEC-017. Nghiệm thu backend: TC-08; nghiệm thu các hành vi khác chưa nằm trong bộ kiểm thử backend.

<a id="uc07"></a>

## UC07 Quản lý playlist cá nhân

**Điều kiện:** người dùng đã xác thực; có quyền sở hữu khi truy cập playlist cụ thể. **Luồng:** tạo/đọc/đổi tên hoặc mô tả/xóa mềm playlist, thêm track, gỡ liên kết track, đọc thứ tự phát. Nhu cầu sắp xếp lại tồn tại nhưng chưa có hợp đồng.

**Hậu điều kiện:** thay đổi chỉ tác động thư viện đúng chủ sở hữu; xóa playlist không xóa track dùng chung; gỡ track xóa hàng liên kết. **Ngoại lệ:** tài nguyên không tồn tại, playlist người khác, thêm trùng, track bị gỡ, thay đổi đồng thời. Semantics reorder và track đã gỡ trong playlist còn mở.

**Phụ thuộc:** [Playlists API](../api/playlists.md), BR-004/BR-007/BR-008; [DEC-005](../decisions/open-decisions.md#dec-005), [DEC-019](../decisions/open-decisions.md#dec-019), DEC-018/DEC-022. Nghiệm thu: TC-12/TC-13/TC-14.

<a id="uc08"></a>

## UC08 Upload tác phẩm

**Điều kiện:** Creator đã được duyệt hoặc Admin theo ma trận được chốt. **Luồng:** xác thực, nhận audio bắt buộc cùng ảnh tùy chọn, kiểm tra định dạng/dung lượng và metadata, lưu media và tạo track gắn người upload. Metadata phân biệt nhạc/podcast, lyrics/show notes. **Hậu điều kiện:** bản ghi và file nhất quán; duration có nguồn tin cậy theo quyết định.

**Ngoại lệ:** chưa xác thực/không có quyền, sai định dạng, quá giới hạn, thiếu metadata/thể loại không hợp lệ, file hoặc DB lỗi. Xử lý file còn dư và transaction chưa được thiết kế.

**Phụ thuộc:** [API-09](../api/tracks.md#api-09), BR-005/BR-006; [DEC-008](../decisions/open-decisions.md#dec-008), DEC-004/DEC-009/DEC-011/DEC-018/DEC-021. Nghiệm thu: TC-09.

<a id="uc09"></a>

## UC09 Quản lý tác phẩm đã đăng

**Điều kiện:** Creator quản lý tác phẩm mình hoặc Admin có quyền theo mô tả. **Luồng:** đọc danh sách tác phẩm của mình, sửa metadata, xóa mềm tác phẩm. **Hậu điều kiện:** thay đổi đúng tài nguyên; tác phẩm đã gỡ không xuất hiện trong truy vấn public theo quy tắc. Không suy ra xóa vật lý file từ soft delete.

**Ngoại lệ:** sửa/xóa tác phẩm người khác, tài nguyên không tồn tại hoặc đã gỡ, lỗi cập nhật; thay file và khôi phục còn thiếu hợp đồng.

**Phụ thuộc:** [API-10](../api/tracks.md#api-10), [API-11](../api/tracks.md#api-11), [API-12](../api/tracks.md#api-12), BR-004/BR-007; DEC-004/DEC-009/DEC-011/DEC-018. Nghiệm thu: TC-11/TC-16.

<a id="uc10"></a>

## UC10 Quản lý tài khoản

**Điều kiện:** Admin được xác thực. **Luồng:** đọc/lọc danh sách tài khoản, khóa bằng `deleted_at`, mở khóa bằng đặt NULL. **Hậu điều kiện:** trạng thái tài khoản thay đổi; yêu cầu ngăn đăng nhập tài khoản khóa được giữ lại. Thu hồi token và lan truyền tới nội dung cần quyết định.

**Ngoại lệ:** không có quyền, id không tồn tại, action sai, tự khóa tài khoản Admin đang đăng nhập. Khóa Admin khác chưa có chính sách.

**Phụ thuộc:** [API-22](../api/admin.md#api-22), [API-23](../api/admin.md#api-23), BR-001/BR-003/BR-004; [DEC-006](../decisions/open-decisions.md#dec-006), DEC-018. Nghiệm thu: TC-15.

<a id="uc11"></a>

## UC11 Kiểm duyệt nội dung

**Điều kiện:** Admin được xác thực. **Luồng:** xem track active/deleted, lọc theo loại/từ khóa, gỡ tác phẩm vi phạm bằng soft delete. **Hậu điều kiện:** truy vấn public loại tác phẩm bị gỡ. Yêu cầu không thể truy cập media sau khi gỡ cần thiết kế riêng.

**Ngoại lệ:** không có quyền, tài nguyên không tồn tại, DB lỗi. Nhu cầu khôi phục được nêu nhưng chưa có hợp đồng; lý do kiểm duyệt/audit chưa được mô hình hóa.

**Phụ thuộc:** [API-26](../api/admin.md#api-26), [API-27](../api/admin.md#api-27), BR-004; [DEC-005](../decisions/open-decisions.md#dec-005), DEC-009/DEC-018/DEC-022. Nghiệm thu: TC-16/TC-17.

<a id="uc12"></a>

## UC12 Xét duyệt Creator

**Điều kiện:** có tài khoản hợp lệ và yêu cầu đăng ký theo luồng được chốt; Admin có quyền review. **Luồng:** tiếp nhận hồ sơ hoặc thông tin đăng ký, đưa vào `pending`; Admin đọc hồ sơ chờ, chọn approve/reject. Approve được mô tả đổi role thành `creator`, status `approved`; reject đặt `rejected`, không tự cấp quyền upload.

**Hậu điều kiện:** kết quả xét duyệt nhất quán; quyền mới có hiệu lực theo vòng đời phiên sẽ chốt. **Ngoại lệ:** hồ sơ không tồn tại/đã xử lý, decision sai, tài khoản khóa, review đồng thời hoặc gửi lại sau từ chối. Lý do từ chối/ngày gửi/lịch sử chưa có cấu trúc đầy đủ.

**Phụ thuộc:** [API-24](../api/admin.md#api-24), [API-25](../api/admin.md#api-25), BR-002; [DEC-002](../decisions/open-decisions.md#dec-002), DEC-005/DEC-006/DEC-007/DEC-018/DEC-022. Nghiệm thu: TC-18.
