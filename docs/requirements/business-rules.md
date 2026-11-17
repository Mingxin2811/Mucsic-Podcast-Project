# Quy tắc nghiệp vụ

Trạng thái: `DRAFT`. Bảng sau diễn đạt ý định nghiệp vụ hiện có, không chứng minh middleware hoặc ràng buộc đã tồn tại. Mỗi lựa chọn chưa thống nhất được chuyển tới [sổ quyết định](../decisions/open-decisions.md).

<a id="br-001"></a>

## BR-001 Vai trò và quyền

| Thao tác | Guest | Listener | Creator | Admin |
| --- | --- | --- | --- | --- |
| Đọc kho public, metadata, thể loại | Có | Có | Có | Có |
| Playlist cá nhân | Không | Của mình | Của mình | Của mình; can thiệp người khác OPEN |
| Upload | Không | Không | Khi được duyệt | Có theo mô tả; điều kiện status OPEN |
| Sửa/gỡ tác phẩm | Không | Không | Của mình | Mọi tác phẩm theo mô tả |
| Duyệt Creator, khóa tài khoản, kiểm duyệt | Không | Không | Không | Có |

Role không thay thế kiểm tra sở hữu. Ma trận ngoại lệ và tài khoản khóa ở [DEC-018](../decisions/open-decisions.md#dec-018); cách nhận quyền hiện tại từ JWT ở DEC-006.

<a id="br-002"></a>

## BR-002 Vòng đời Creator

Các trạng thái được khai báo: `none`, `pending`, `approved`, `rejected`. Luồng mô tả: none/rejected → pending qua đăng ký; pending → approved khi duyệt hoặc rejected khi từ chối. Approve cấp role creator. Đầu vào đăng ký cùng tài khoản hay hồ sơ riêng còn [DEC-002](../decisions/open-decisions.md#dec-002); dữ liệu và điều kiện gửi lại ở DEC-005/DEC-007. SQL chưa ràng buộc role phải tương ứng status; không coi mọi tổ hợp hợp lệ về nghiệp vụ chỉ vì DB cho phép (DEC-022).

<a id="br-003"></a>

## BR-003 Tài khoản và phiên

Đăng ký yêu cầu tên 2–50 ký tự, email hợp lệ, mật khẩu ít nhất sáu ký tự theo đặc tả hiện có. Mật khẩu dự kiến băm Bcrypt salt rounds 10; không trả hash trong API. Email UNIQUE trong SQL; cách chuẩn hóa còn DEC-017. Tài khoản có `deleted_at` không được đăng nhập theo yêu cầu. JWT dự kiến 24 giờ; logout, khóa, đổi mật khẩu và cập nhật role theo [DEC-006](../decisions/open-decisions.md#dec-006). OTP theo DEC-003, chưa là trường bắt buộc được chốt.

<a id="br-004"></a>

## BR-004 Xóa mềm và hiển thị

`deleted_at IS NULL` biểu thị bản ghi đang hoạt động theo mô tả. Các truy vấn public cần loại track bị gỡ; playlist cá nhân cần loại playlist đã xóa. Việc khóa user, ẩn track và ẩn playlist liên quan chưa có chính sách lan truyền được chốt ([DEC-018](../decisions/open-decisions.md#dec-018)). Gỡ file khỏi khả năng truy cập trực tiếp là vấn đề khác với lọc hàng dữ liệu (DEC-009). FK CASCADE không chạy khi chỉ UPDATE deleted_at (DEC-022).

<a id="br-005"></a>

## BR-005 Upload

Audio được mô tả là `.mp3` bắt buộc, tối đa 30 MB; ảnh bìa `.jpg`/`.png` tùy chọn, tối đa 5 MB. Cần title, artistName/host, genreId, trackType. `creator_id` lấy từ người dùng được xác thực, không lấy quyền sở hữu từ body. MIME/nội dung file, đơn vị MB, lỗi quá giới hạn ảnh, đặt tên file và xử lý phần ghi dang dở chưa được chốt (DEC-009/DEC-017). Nơi lưu và nguồn duration ở [DEC-008](../decisions/open-decisions.md#dec-008), DEC-011.

<a id="br-006"></a>

## BR-006 Music và podcast

`track_type` là `music` hoặc `podcast`. Lyrics phục vụ nhạc, description chứa mô tả/show notes podcast. Duration tính bằng giây. Format text/timestamps, giới hạn và có cho phép cả lyrics/description với mọi loại hay không còn [DEC-021](../decisions/open-decisions.md#dec-021). Không suy ra server có dữ liệu thời gian đồng bộ từ text tự do.

<a id="br-007"></a>

## BR-007 Quyền sở hữu tài nguyên

Playlist gắn `user_id`; đọc/sửa/xóa/thêm/gỡ track phải kiểm tra đúng chủ. Track gắn `creator_id`; Creator quản lý của mình, Admin có ngoại lệ được mô tả cho track. Không cho phép đổi người sở hữu thông qua metadata update. Ngoại lệ Admin và tài khoản khóa cần [DEC-018](../decisions/open-decisions.md#dec-018). Khi chưa chốt response cho tài nguyên không được phép xem, không tự đổi 403 thành 404 hoặc ngược lại (DEC-017).

<a id="br-008"></a>

## BR-008 Thành viên và thứ tự playlist

PK `(playlist_id, track_id)` ngăn thêm cùng track hai lần. Gỡ track xóa liên kết, không xóa tác phẩm. Đọc theo `sort_order`; ý định thêm cuối dùng MAX+1 đang được mô tả nhưng chưa giải quyết đồng thời/thứ tự trùng. Reorder, playlist đã xóa và track đã gỡ còn [DEC-019](../decisions/open-decisions.md#dec-019). Default SQL 1 khác mô tả 0 ở DEC-022.

<a id="br-009"></a>

## BR-009 Khám phá và lượt nghe

Trending dựa trên `play_count DESC`; mới phát hành dựa trên `created_at DESC`. Tìm theo tên tác phẩm/nghệ sĩ/host, lọc genre/type. Ngưỡng ghi nhận lượt nghe, chống ghi trùng, cách xử lý bằng lượt hoặc thời gian ở [DEC-010](../decisions/open-decisions.md#dec-010), DEC-012/DEC-017. Không tự đặt giới hạn phân trang hoặc phép chuẩn hóa tìm kiếm chưa được xác nhận.
