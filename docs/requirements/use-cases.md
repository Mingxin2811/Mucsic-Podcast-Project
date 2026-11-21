# Use case nghiệp vụ và trách nhiệm backend

Lựa chọn nghiệp vụ được xác nhận ngày 17/11/2026; từng phần còn thiếu wire/validation vẫn DRAFT theo [DEC](../decisions/open-decisions.md#evidence-2026-11-17). Triển khai NOT_IMPLEMENTED, kiểm chứng NOT_RUN. Danh mục 12 UC giữ nguyên; mức cam kết MVP theo DEC-001, không suy ra đã nghiệm thu toàn bộ trải nghiệm sản phẩm.

## Danh mục

| UC | Nghiệp vụ | Tác nhân | Cam kết MVP |
| --- | --- | --- | --- |
| [UC01](#uc01) | Đăng ký tài khoản | Guest | Bắt buộc |
| [UC02](#uc02) | Đăng nhập/đăng xuất, khôi phục mật khẩu | Guest/thành viên | Bắt buộc; reset/đổi mật khẩu cần wire bổ sung |
| [UC03](#uc03) | Khám phá và Trending | Guest/thành viên | Có, mức cơ bản |
| [UC04](#uc04) | Tìm kiếm và lọc | Guest/thành viên | Bắt buộc |
| [UC05](#uc05) | Truy cập audio và ghi nhận lượt nghe | Guest/thành viên | Bắt buộc |
| [UC06](#uc06) | Nội dung bổ sung và khả năng nghe nâng cao | Guest/thành viên | Có, mức cơ bản |
| [UC07](#uc07) | Playlist cá nhân | Thành viên | Bắt buộc |
| [UC08](#uc08) | Upload tác phẩm | Creator/Admin | Bắt buộc |
| [UC09](#uc09) | Quản lý tác phẩm | Creator/Admin | Bắt buộc |
| [UC10](#uc10) | Quản lý tài khoản | Admin | Bắt buộc |
| [UC11](#uc11) | Kiểm duyệt nội dung | Admin | Bắt buộc |
| [UC12](#uc12) | Xét duyệt Creator | Listener/Admin | Bắt buộc |

<a id="uc01"></a>

## UC01 Đăng ký tài khoản

**CONFIRMED** — Tạo Listener có `email_verified_at` là `NULL`. Username 2–50 ký tự sau trim và có thể trùng. Email trim/lowercase và duy nhất. Password 12–128 ký tự, giữ nguyên khi xác minh. OTP qua Resend, sáu số/hạn năm phút/dùng một lần/ba lần sai. Gửi lại sau 60 giây vô hiệu hóa mã cũ. Tối đa 5 lượt đã ghi/email/giờ và có IP limit. Mail lỗi giữ user chưa xác minh và cho gửi lại. User đăng nhập riêng sau xác minh. [Vòng đời OTP](../architecture/security-and-media.md#otp-delivery).

BR-002/003 và TC-01/02. Còn IP limit, `reserved`, timeout cụ thể, đăng ký lại, status/response và chi tiết wire ở DEC-003/005/017/022. Nghiệm thu email thật cần tài khoản, API key và domain gửi xác minh. [API-01](../api/auth.md#api-01), [API-30](../api/auth.md#api-30), [API-31](../api/auth.md#api-31).

<a id="uc02"></a>

## UC02 Đăng nhập và quản lý phiên

**CONFIRMED:** login email/password khi verified/chưa khóa; JWT HS256/jose + auth_sessions 24 giờ/cookie soundwave_session, không refresh. Mỗi request kiểm phiên/user/quyền DB; logout riêng phiên, khóa/đổi/reset thu hồi tất cả, mở khóa login lại, approve quyền request kế tiếp. scrypt/CSRF/Origin theo BR-003/[security](../architecture/security-and-media.md).

Reset dùng Resend OTP cho user đã xác minh và chưa khóa, phản hồi yêu cầu chung. User đăng nhập riêng sau verify/reset. Đổi nhận `currentPassword` và `newPassword`. Login kiểm lại hash dưới khóa hàng user, reset đổi hash/đánh dấu OTP/thu hồi phiên cùng transaction. DEC-003/005/014/017 còn wire, timeout cụ thể, `reserved`, CSRF response, Origin và Domain. TC-03/04/05. [Auth API](../api/auth.md), [giao dịch auth](../architecture/security-and-media.md#auth-transaction-order).

<a id="uc03"></a>

## UC03 Khám phá và Trending

**Luồng CONFIRMED:** đọc track chưa gỡ và chủ sở hữu không khóa; Trending theo play_count DESC, id DESC; mới phát hành created_at DESC, id DESC qua API-05 sort=newest. Đây là truy vấn sắp xếp cơ bản trong MVP, không có route new-releases riêng.

Kho rỗng là danh sách rỗng. Page/limit theo quy ước API; shape Trending khi có type query và validation chi tiết còn DEC-017. Đếm lượt nghe theo DEC-010.

**Phụ thuộc:** [API-05](../api/tracks.md#api-05), [API-06](../api/tracks.md#api-06), BR-004/BR-009; [DEC-004](../decisions/open-decisions.md#dec-004), [DEC-010](../decisions/open-decisions.md#dec-010), [DEC-017](../decisions/open-decisions.md#dec-017). Nghiệm thu: TC-06.

<a id="uc04"></a>

## UC04 Tìm kiếm và lọc thể loại

**CONFIRMED:** search_text từ title/artist/host chuẩn hóa Unicode/hoa thường/bỏ dấu/đ → d/khoảng trắng, cập nhật cùng metadata. Keyword <=100 ký tự/10 từ, mọi từ có mặt không cần đúng thứ tự; %, _ và backslash là ký tự thường, escape LIKE/SQL tham số hóa. Kết hợp genre/type/sort/pagination/loại track gỡ-chủ khóa. Admin cùng chuẩn hóa trên trường tìm theo API.

[API-05](../api/tracks.md#api-05), [Genres](../api/genres.md), API-22/26; BR-004/009; TC-07/20. DEC-012 ACCEPTED, schema/index DEC-022, protocol đo DEC-015, field/status DEC-017. Đo 1.000 track trước thêm pg_trgm nếu cần, không hứa hiệu năng.

<a id="uc05"></a>

## UC05 Truy cập audio và lượt nghe

**Luồng CONFIRMED:** trả metadata/tham chiếu media → audio qua endpoint kiểm tra trạng thái track/chủ sở hữu → Range/seek. Sau gỡ hoặc khóa Creator từ chối request audio mới, request đã bắt đầu được hoàn tất. Client listenedSeconds >=10, cooldown trượt 30 phút/đếm cùng transaction. Guest UUID cookie ký/login chuyển user ID có thể thêm một lượt; lặp 200/counted:false/cooldown giữ bảy ngày; chưa chứng minh nghe thật.

**Ngoại lệ:** track/file mất, bị ẩn, Range sai, lượt trùng và DB/file lỗi. GET/HEAD audio API-28/29, metadata audioUrl, single Range 200/206/416/400, multi-range full 200, HEAD không body và no-store đã chốt tại DEC-009. Track không có/gỡ/chủ khóa 404; file mất/không đọc được hoặc DB lỗi 503 theo code API-28. Conditional HTTP và mã lỗi phụ còn DEC-017; semantics đã chốt DEC-010; validation/cookie/response DEC-017 và schema DEC-022 còn chi tiết. Không coi metadata 404 đủ chứng minh URL cũ không phát được.

**Phụ thuộc:** [API-07](../api/tracks.md#api-07), [API-08](../api/tracks.md#api-08), [API-28](../api/tracks.md#api-28), [API-29](../api/tracks.md#api-29), [media](../architecture/security-and-media.md); [DEC-004](../decisions/open-decisions.md#dec-004), [DEC-009](../decisions/open-decisions.md#dec-009), [DEC-010](../decisions/open-decisions.md#dec-010). Nghiệm thu: TC-08/TC-10/TC-17.

<a id="uc06"></a>

## UC06 Nội dung bổ sung cho luồng nghe

**CONFIRMED:** trackType/duration server/lyrics-show notes text. Music lyrics <=20.000 ký tự/description <=5.000; podcast description <=20.000/lyrics null. Field tùy chọn rỗng sau trim → null, PATCH omitted giữ nguyên, HTML 400/luôn xử lý text. [05:20] chỉ chữ, không đồng bộ/seek MVP.

Shuffle/repeat/tua 15 giây/tốc độ thuộc client, không API mới. [API-07](../api/tracks.md#api-07), BR-006/DEC-021 ACCEPTED; nhận diện HTML/đếm ký tự/lỗi DEC-017; TC-08 chỉ metadata/backend.

<a id="uc07"></a>

## UC07 Quản lý playlist cá nhân

**CONFIRMED:** user kể cả Admin chỉ quản lý playlist mình: tạo/đọc/PATCH/soft delete/thêm/gỡ/[API-38 reorder](../api/playlists.md#api-38). Gửi toàn bộ ID đang hiển thị; backend khóa playlist/kiểm tập, liên kết ẩn giữ ở cuối/hiện lại cuối. Tập đổi 409/tải lại; hai reorder hợp lệ tuần tự/lần hoàn tất sau quyết định cuối. Từ 1/thêm cuối/gỡ đánh lại/UNIQUE kiểm lúc commit; ẩn không hiện/không đếm nhưng giữ liên kết. Playlist xóa không đọc/sửa.

[Playlists API](../api/playlists.md), BR-004/007/008, DEC-019 ACCEPTED, TC-12/13/14/16. Response/lặp ngoài reorder/nullable DEC-005/017; schema/transaction với track-chủ đổi trạng thái DEC-022. Xóa playlist không xóa track/restore ngoài MVP.

<a id="uc08"></a>

## UC08 Upload tác phẩm

**Điều kiện:** Creator approved hoặc Admin không cần creator_status approved. **Luồng CONFIRMED:** nhận MP3 bắt buộc ≤30 MiB, JPG/PNG tùy chọn ≤5 MiB; gắn creator_id từ phiên; ffprobe đọc duration hữu hạn >0/ceiling INT giây, FFmpeg giải mã toàn file và Sharp kiểm tra/mã hóa cover. Lưu UUID vào vùng tạm/chính cùng filesystem; validation → transaction kiểm tra lại → chuyển file → ghi DB/commit → 201. Commit không rõ phải đối chiếu trước dọn; cleanup theo [vòng đời file](../architecture/security-and-media.md#file-lifecycle). Email/online không làm đổi nơi lưu audio sang cloud.

**Ngoại lệ:** quyền, metadata/file sai, quá giới hạn, lỗi DB/file. File sai 400, quá dung lượng 413. Cơ chế publish/cleanup đã chọn, nhưng versions/timeout/concurrency, MIME khai báo bất nhất và dữ liệu nhận biết thao tác còn DEC-014/DEC-017/DEC-022. Chưa coi file/DB nhất quán là hành vi đã chạy.

**Phụ thuộc:** [API-09](../api/tracks.md#api-09), BR-005/BR-006; [DEC-008](../decisions/open-decisions.md#dec-008), DEC-004/DEC-009/DEC-011/DEC-018/DEC-021. Nghiệm thu: TC-09.

<a id="uc09"></a>

## UC09 Quản lý tác phẩm đã đăng

**Luồng CONFIRMED:** Creator liệt kê tác phẩm mình qua /api/tracks/my-uploads, PATCH metadata/thay cover, xóa mềm; Admin sửa/gỡ mọi track. Không đổi chủ, không thay audio. Muốn bản thu khác tạo track mới; restore ngoài MVP.

**Ngoại lệ:** khác chủ, đã gỡ, file/DB lỗi; Cover mới được lưu trước, DB khóa hàng/cập nhật/commit rồi mới đưa cover cũ vào danh sách dọn; rollback giữ ảnh cũ. Không xóa ảnh mặc định/còn tham chiếu. Wire multipart/null, validation/thao tác lặp và recovery state còn DEC-014/DEC-017/DEC-022.

**Phụ thuộc:** [API-10](../api/tracks.md#api-10), [API-11](../api/tracks.md#api-11), [API-12](../api/tracks.md#api-12), BR-004/BR-007; DEC-004/DEC-009/DEC-011/DEC-018. Nghiệm thu: TC-11/TC-16.

<a id="uc10"></a>

## UC10 Quản lý tài khoản

**Luồng CONFIRMED:** Admin đọc/lọc user, ban đặt deleted_at và thu hồi tất cả phiên; unban đặt NULL nhưng phải login lại. Cấm khóa chính mình hoặc Admin khác. Khóa Creator tạm ẩn nội dung; mở khóa không khôi phục track đã gỡ riêng.

**Ngoại lệ:** sai quyền/action/id, DB lỗi hoặc cạnh tranh với login/đổi mật khẩu. Chi tiết transaction và wire/error còn DEC-017/DEC-022.

**Phụ thuộc:** [API-22](../api/admin.md#api-22), [API-23](../api/admin.md#api-23), BR-001/BR-003/BR-004; [DEC-006](../decisions/open-decisions.md#dec-006), DEC-018. Nghiệm thu: TC-15.

<a id="uc11"></a>

## UC11 Kiểm duyệt nội dung

**Luồng CONFIRMED:** Admin xem active/deleted, gỡ track bằng soft delete; public/playlist loại track đã gỡ, audio từ chối request mới, request đã bắt đầu được hoàn tất. Giữ hàng/liên kết/file; không có restore hoặc xóa vật lý qua API MVP.

**DRAFT:** audio API-28/29 và no-store đã chọn; conditional HTTP, audit/lý do kiểm duyệt và thao tác lặp còn DEC-017/DEC-022; không tự thêm bảng audit.

**Phụ thuộc:** [API-26](../api/admin.md#api-26), [API-27](../api/admin.md#api-27), BR-004; [DEC-005](../decisions/open-decisions.md#dec-005), DEC-009/DEC-018/DEC-022. Nghiệm thu: TC-16/TC-17.

<a id="uc12"></a>

## UC12 Xét duyệt Creator

**CONFIRMED:** Listener verified/login nộp [API-35](../api/creator-applications.md#api-35), một pending/user/pending bất biến. Admin duyệt application ID qua [API-25](../api/admin.md#api-25)/khóa hàng hồ sơ; approve role creator/approved, reject không upload. Rejected POST hồ sơ mới/giữ lịch sử qua [API-36](../api/creator-applications.md#api-36); ngày nộp khác user.created_at, có reviewer/ngày/lý do. Kênh duyệt sửa tên/bio [API-37](../api/creator-applications.md#api-37)/không đổi quyền. users.role nguồn quyền/creatorStatus suy ra hồ sơ/quyền request kế tiếp.

BR-002 và DEC-002/007/018 đã chốt. Schema suy trạng thái từ hồ sơ mới nhất và lưu riêng kênh hiện tại trên hồ sơ đã duyệt. Field/body/response và giao dịch cạnh tranh còn DEC-005/017/022. [Schema](../architecture/data-model.md#target-model), TC-18.
