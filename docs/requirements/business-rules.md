# Quy tắc nghiệp vụ

Các kết quả được xác nhận theo [sổ quyết định](../decisions/open-decisions.md). Phần ghi `CONFIRMED` là lựa chọn nghiệp vụ. Chi tiết validation và hợp đồng HTTP chưa xác nhận giữ `DRAFT`. Bootstrap đã chạy và API nghiệp vụ vẫn `NOT_IMPLEMENTED`. [Hiện trạng](../project/status.md#registration-otp-decisions-2026-11-21).

<a id="br-001"></a>

## BR-001 Vai trò và quyền

Phạm vi ma trận: user hoạt động, đã xác minh email; quyền phiên luôn lấy từ DB (DEC-006/DEC-018), không nhận role từ body.

| Thao tác | Guest | Listener | Creator | Admin |
| --- | --- | --- | --- | --- |
| Đọc kho public, metadata, thể loại và audio được phép | Có | Có | Có | Có |
| Playlist cá nhân | Không | Của mình | Của mình | Chỉ của mình |
| Upload | Không | Không | Đã approved | Có, không cần creator_status approved |
| Sửa/gỡ tác phẩm | Không | Không | Của mình | Mọi tác phẩm |
| Duyệt Creator, khóa/mở khóa user không phải Admin, kiểm duyệt | Không | Không | Không | Có |

CONFIRMED: Admin không khóa chính mình hoặc Admin khác trong MVP. Role không thay kiểm tra sở hữu. User bị khóa không dùng protected API; nội dung Creator bị khóa bị ẩn theo BR-004.

<a id="br-002"></a>

## BR-002 Vòng đời Creator

CONFIRMED: đăng ký Listener, xác minh email rồi login/nộp hồ sơ riêng. none/rejected → pending; pending → approved/rejected. Một pending/user, pending không sửa; rejected nộp mới/giữ lịch sử. Hồ sơ có tên kênh/bio/lĩnh vực/ngày gửi/người-ngày duyệt/lý do từ chối; kênh đã duyệt sửa tên/bio không đổi quyền.

`users.role` là nguồn quyền. `creatorStatus` suy từ hồ sơ mới nhất hoặc `none` nếu chưa có hồ sơ. API-25 dùng application ID và khóa hàng hồ sơ khi review; từ chối cần lý do. API-35/36/37 nộp, xem lịch sử và sửa dữ liệu kênh hiện tại. Ngày nộp được lưu trên hồ sơ. [DEC-005](../decisions/open-decisions.md#dec-005) chốt trường và giới hạn; thứ tự khóa giao dịch còn DEC-022. [Hợp đồng Creator](../api/creator-applications.md), [mô hình dữ liệu](../architecture/data-model.md#target-model).

<a id="br-003"></a>

## BR-003 Tài khoản và phiên

CONFIRMED: username 2–50 ký tự sau trim và có thể trùng, email trim/lowercase và duy nhất. User mới có `email_verified_at` là `NULL` và chưa thể login. Resend HTTPS gửi OTP thật; PostgreSQL lưu digest HMAC, số lần sai và thời hạn. OTP đăng ký có sáu số, hạn năm phút, dùng một lần và vô hiệu ở lần sai thứ ba. Xác minh và gửi lại yêu cầu mật khẩu của lần đăng ký hiện tại. Đăng ký và gửi lại dùng chung hạn mức năm lượt cấp mã/email/giờ, cách nhau ít nhất 60 giây, mã mới vô hiệu mã cũ. Email chưa xác minh có thể bắt đầu lại sau 24 giờ kể từ lượt cấp mã gần nhất trên cùng bản ghi. [Vòng đời OTP](../architecture/security-and-media.md#otp-delivery).

Xác minh đăng ký chỉ tăng bộ đếm sai OTP khi mật khẩu đúng và OTP được đối chiếu cho kết quả sai. Reset chỉ cấp mã cho user đã xác minh và chưa khóa. Hạn mức reset tách khỏi đăng ký, tối đa năm lượt/email/giờ, cách nhau ít nhất 60 giây. Mọi email hợp lệ về cú pháp nhận cùng phản hồi `202` và thời gian tương đương giữa các nhánh, kể cả khi chạm hạn mức email hoặc Resend lỗi. Mã reset có sáu chữ số, hạn năm phút, dùng một lần và vô hiệu hóa ở lần sai thứ ba hoặc khi cấp mã mới. User đăng nhập riêng sau verify/reset. Job mỗi giờ dọn lịch sử OTP quá bảy ngày. Hạn mức IP thuộc hướng mở rộng. [DEC-003](../decisions/open-decisions.md#dec-003).

Password 12–128 ký tự, cho khoảng trắng/không trim/không ép ký tự đặc biệt. scrypt bất đồng bộ Node, N=32768,r=8,p=3,maxmem=64 MiB, salt riêng/password/lưu thông số cùng hash. Seed Bcrypt chưa chuyển/kiểm chứng. Không trả hash/OTP/JWT trong JSON hoặc log bàn giao.

JWT HS256/jose dùng secret ngẫu nhiên 32 byte qua môi trường. Phiên độc lập hết hạn tuyệt đối sau 24 giờ, không refresh. Logout thu hồi phiên hiện tại. Khóa/đổi/reset mật khẩu thu hồi các phiên của user; đổi khóa JWT thu hồi các phiên hiện có. Mở khóa yêu cầu đăng nhập lại. Mỗi request kiểm phiên, user, quyền DB và sở hữu. Cookie `soundwave_session` dùng HttpOnly/SameSite=Lax/path=/, tắt Secure cho HTTP local. Request ghi cần xác thực gửi `X-CSRF-Token` ổn định theo phiên, lấy qua API-39. Auth trước đăng nhập dùng JSON và kiểm Origin. Chi tiết HTTP thuộc DEC-017. [Xác thực](../architecture/security-and-media.md).

<a id="br-004"></a>

## BR-004 Xóa mềm và hiển thị

CONFIRMED: track public phải chưa bị gỡ và chủ sở hữu không bị khóa; playlist đã xóa không đọc/sửa trong thư viện cá nhân. Khóa Creator chỉ tạm ẩn nội dung, không UPDATE deleted_at của track. Mở khóa hiển thị lại những track chưa bị gỡ riêng. Soft delete giữ hàng, liên kết và file; không có API xóa vật lý hoặc restore track/playlist trong MVP.

Audio qua [API-28 GET/API-29 HEAD](../api/tracks.md#api-28), kiểm tra chính sách trước request mới, Cache-Control no-store; request đã bắt đầu được phép hoàn tất (DEC-009). Track gỡ/chủ khóa/không có trả 404 TRACK_NOT_AVAILABLE; file mất 503 MEDIA_UNAVAILABLE, DB lỗi 503 SERVICE_UNAVAILABLE trong phạm vi audio; HEAD không body. FK CASCADE chỉ chạy khi DELETE vật lý, không chạy khi UPDATE deleted_at; chi tiết schema ở DEC-022.

<a id="br-005"></a>

## BR-005 Upload

CONFIRMED: MP3 bắt buộc tối đa 30 MiB (31.457.280 byte); cover JPG/PNG tùy chọn tối đa 5 MiB (5.242.880 byte). Cần title, artistName/host, genreId, trackType. creator_id từ user xác thực; Admin được upload, Creator phải approved. ffprobe đọc duration hữu hạn >0, lưu INT giây ceiling (243,7 → 244); client không gửi/sửa duration. ffprobe kiểm tra định dạng/codec MP3, FFmpeg giải mã toàn file, Sharp đọc/mã hóa lại JPG/PNG; tên UUID do server sinh. Chỉ thay cover/metadata, chưa thay audio. File lưu filesystem máy chủ, có vùng tạm, xử lý bù/dọn dở dang; audio không được phục vụ static để bỏ qua trạng thái.

CONFIRMED bổ sung: file tạm/chính cùng filesystem, validation xong mới transaction kiểm tra lại → chuyển file chính → ghi DB/commit → 201. Rollback chắc chắn dọn file mới; commit không rõ kết quả phải đối chiếu DB trước xóa. Dọn lúc khởi động/mỗi 30 phút, chỉ file quá 24 giờ thuộc nhóm tạm hoặc không tham chiếu; bỏ thao tác active và kiểm tra cả soft delete, DB lỗi hoãn dọn. Không tự xóa audio soft delete, ảnh mặc định hoặc file còn tham chiếu. Cover mới lưu trước, DB khóa hàng/cập nhật/commit rồi mới đưa ảnh cũ vào danh sách dọn; rollback giữ ảnh cũ. [Vòng đời file](../architecture/security-and-media.md#file-lifecycle) sở hữu quy trình chi tiết.

File sai 400, quá dung lượng 413. Vùng tạm được dọn an toàn. [Phiên bản và giới hạn xử lý](../architecture/security-and-media.md#upload-kiem-tra-file-va-duration) thuộc DEC-014; MIME và mã lỗi thuộc DEC-017; trạng thái thao tác và danh sách dọn thuộc DEC-022.

<a id="br-006"></a>

## BR-006 Music và podcast

CONFIRMED: track_type music/podcast; lyrics/show notes plain text, thẻ HTML trả 400/không tự strip/luôn xử lý-hiển thị text. Music lyrics <=20.000 ký tự/description <=5.000; podcast description <=20.000/lyrics null. Field tùy chọn rỗng sau trim → null; PATCH omitted giữ nguyên. [05:20] chỉ chữ, không đồng bộ/seek trong MVP; không thêm API shuffle/repeat/tốc độ/tua client.

[DEC-021](../decisions/open-decisions.md#dec-021) ACCEPTED; nhận diện HTML/đếm ký tự/validation podcast/code lỗi còn DEC-017. Không suy ra cột TEXT đã thực thi quy tắc.

<a id="br-007"></a>

## BR-007 Quyền sở hữu tài nguyên

CONFIRMED: mọi thao tác playlist kiểm tra user_id đúng chủ, kể cả Admin. Creator chỉ sửa/gỡ track có creator_id của mình; Admin được can thiệp mọi track. Không đổi chủ qua cập nhật metadata. JWT không chứa quyền để làm nguồn quyết định; dùng user DB. Wire lỗi 403/404 theo từng endpoint còn DRAFT tại DEC-017, không tự thay tất cả bằng một mã chung.

<a id="br-008"></a>

## BR-008 Thành viên và thứ tự playlist

CONFIRMED theo [DEC-019](../decisions/open-decisions.md#dec-019): không trùng cặp playlist–track; từ 1/thêm cuối/gỡ đánh lại; khóa playlist trong transaction khi đổi thành viên/thứ tự. Track ẩn không hiện/không tính trackCount nhưng giữ liên kết; đọc thứ tự liên tục; playlist xóa không sửa.

[API-38](../api/playlists.md#api-38) gửi và trả toàn bộ ID **đang hiển thị**. Backend kiểm đúng tập hiển thị, giữ liên kết ẩn ở cuối/hiện lại cuối; tập thay đổi trả 409 để tải lại. Hai reorder hợp lệ tuần tự, lần hoàn tất sau quyết định cuối; UNIQUE thứ tự kiểm lúc commit. Thêm lại track đang hiển thị giữ vị trí hiện tại. Gỡ lặp thành công khi playlist hợp lệ và thuộc người gọi. Thứ tự khóa với track/chủ đổi trạng thái còn DEC-022. [API-20/21](../api/playlists.md#api-20).

<a id="br-009"></a>

## BR-009 Khám phá và lượt nghe

CONFIRMED: Trending play_count DESC,id DESC; newest created_at DESC,id DESC. [DEC-012](../decisions/open-decisions.md#dec-012) chọn search_text từ title/artist/host, một hàm chung chuẩn hóa Unicode/viết thường/bỏ dấu/đ → d/gom khoảng trắng; cập nhật cùng metadata. Keyword tương tự, tối đa 100 ký tự/10 từ, mọi từ có mặt không cần đúng thứ tự. %, _ và backslash là ký tự thường, escape LIKE/SQL tham số hóa. Admin dùng email/username hoặc title/artist theo API. Đo 1.000 track trước thêm pg_trgm nếu cần; chưa benchmark.

[DEC-010](../decisions/open-decisions.md#dec-010): cửa sổ trượt 30 phút, client báo `listenedSeconds >= 10` và server kiểm input/cooldown. Thành viên dùng user ID; Guest dùng UUID trong cookie ký HMAC-SHA256 bằng khóa riêng. Đăng nhập chuyển user ID có thể thêm một lượt. Cooldown/đếm cùng transaction, lặp 200 với `counted: false`. Dữ liệu cooldown giữ bảy ngày. Thuộc tính cookie, validation và response ngoài phần đã chốt thuộc DEC-017; schema/giao dịch thuộc DEC-022.
