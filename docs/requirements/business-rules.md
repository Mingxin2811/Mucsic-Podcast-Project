# Quy tắc nghiệp vụ

Các kết quả được xác nhận ngày 17/11/2026 theo [sổ quyết định](../decisions/open-decisions.md#evidence-simple-2026-11-17). Phần ghi CONFIRMED là lựa chọn nghiệp vụ; validation/wire còn thiếu không được tự coi đã chốt. Chưa có middleware hoặc ứng dụng thực thi.

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

users.role là nguồn quyền, creatorStatus suy ra hồ sơ thay hai trạng thái độc lập. API-25 dùng application ID/khóa hàng hồ sơ khi review; API-35/36/37 nộp/xem lịch sử/sửa kênh. Cột/mapping trạng thái-kênh/wire còn DEC-005/017/022; không dùng user.created_at làm ngày nộp.

<a id="br-003"></a>

## BR-003 Tài khoản và phiên

CONFIRMED: email trim/lowercase UNIQUE, user mới email_verified_at NULL/chưa login. Resend HTTPS gửi OTP thật, digest HMAC/secret riêng/số thử/thời hạn trong PostgreSQL. Sáu số/năm phút/một lần/ba sai; resend sau 60 giây hủy cũ; tối đa 5 lần gửi/email/giờ, thêm IP limit (ngưỡng chưa chốt). Mail lỗi giữ user chưa xác minh/cho resend/không tạo trùng. Reset chỉ user đã xác minh/chưa khóa, yêu cầu phản hồi chung không tiết lộ email; verify/reset không tự login. Gửi timeout/đăng ký lại/transaction/wire còn [DEC-003](../decisions/open-decisions.md#dec-003).

Password 12–128 ký tự, cho khoảng trắng/không trim/không ép ký tự đặc biệt. scrypt bất đồng bộ Node, N=32768,r=8,p=3,maxmem=64 MiB, salt riêng/password/lưu thông số cùng hash. Tên 2–50 ký tự cũ vẫn DRAFT; seed Bcrypt chưa chuyển/kiểm chứng. Không trả hash/OTP/JWT trong JSON hoặc log bàn giao.

JWT HS256/jose, secret ngẫu nhiên >=32 byte qua môi trường; auth_sessions 24 giờ tuyệt đối/nhiều phiên/không refresh. Logout riêng phiên; khóa/đổi/reset thu hồi tất cả; mở khóa phải login lại. Mỗi request kiểm phiên/user/quyền DB, DB lỗi không bỏ kiểm tra. Cookie soundwave_session/HttpOnly/SameSite=Lax/path=/, Secure online, HTTP local được tắt riêng Secure. Protected request ghi gửi X-CSRF-Token ngẫu nhiên lưu cùng phiên/lấy API-39; kiểm tra Origin, auth trước login chỉ JSON/kiểm Origin. [Security](../architecture/security-and-media.md) sở hữu chi tiết; DEC-014/017/022 còn wire/config/schema.

<a id="br-004"></a>

## BR-004 Xóa mềm và hiển thị

CONFIRMED: track public phải chưa bị gỡ và chủ sở hữu không bị khóa; playlist đã xóa không đọc/sửa trong thư viện cá nhân. Khóa Creator chỉ tạm ẩn nội dung, không UPDATE deleted_at của track. Mở khóa hiển thị lại những track chưa bị gỡ riêng. Soft delete giữ hàng, liên kết và file; không có API xóa vật lý hoặc restore track/playlist trong MVP.

Audio qua [API-28 GET/API-29 HEAD](../api/tracks.md#api-28), kiểm tra chính sách trước request mới, Cache-Control no-store; request đã bắt đầu được phép hoàn tất (DEC-009). Track gỡ/chủ khóa/không có trả 404 TRACK_NOT_AVAILABLE; file mất 503 MEDIA_UNAVAILABLE, DB lỗi 503 SERVICE_UNAVAILABLE trong phạm vi audio; HEAD không body. FK CASCADE chỉ chạy khi DELETE vật lý, không chạy khi UPDATE deleted_at; chi tiết schema ở DEC-022.

<a id="br-005"></a>

## BR-005 Upload

CONFIRMED: MP3 bắt buộc tối đa 30 MiB (31.457.280 byte); cover JPG/PNG tùy chọn tối đa 5 MiB (5.242.880 byte). Cần title, artistName/host, genreId, trackType. creator_id từ user xác thực; Admin được upload, Creator phải approved. ffprobe đọc duration hữu hạn >0, lưu INT giây ceiling (243,7 → 244); client không gửi/sửa duration. ffprobe kiểm tra định dạng/codec MP3, FFmpeg giải mã toàn file, Sharp đọc/mã hóa lại JPG/PNG; tên UUID do server sinh. Chỉ thay cover/metadata, chưa thay audio. File lưu filesystem máy chủ, có vùng tạm, xử lý bù/dọn dở dang; audio không được phục vụ static để bỏ qua trạng thái.

CONFIRMED bổ sung: file tạm/chính cùng filesystem, validation xong mới transaction kiểm tra lại → chuyển file chính → ghi DB/commit → 201. Rollback chắc chắn dọn file mới; commit không rõ kết quả phải đối chiếu DB trước xóa. Dọn lúc khởi động/mỗi 30 phút, chỉ file quá 24 giờ thuộc nhóm tạm hoặc không tham chiếu; bỏ thao tác active và kiểm tra cả soft delete, DB lỗi hoãn dọn. Không tự xóa audio soft delete, ảnh mặc định hoặc file còn tham chiếu. Cover mới lưu trước, DB khóa hàng/cập nhật/commit rồi mới đưa ảnh cũ vào danh sách dọn; rollback giữ ảnh cũ. [Vòng đời file](../architecture/security-and-media.md#file-lifecycle) sở hữu quy trình chi tiết.

File sai 400, quá dung lượng 413; ảnh/file tạm lỗi phải được dọn an toàn. Giá trị timeout/số tiến trình, versions, MIME khai báo bất nhất và mã validation, trạng thái thao tác/danh sách dọn còn DEC-014/DEC-017/DEC-022. Không tự thêm bảng journal/queue hoặc coi rollback DB tự xóa file.

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

[API-38](../api/playlists.md#api-38) gửi toàn bộ ID **đang hiển thị**, thay quy tắc mọi liên kết trước đây. Backend kiểm đúng tập hiển thị, giữ liên kết ẩn ở cuối/hiện lại cuối; tập thay đổi trả 409/tải lại. Hai reorder hợp lệ tuần tự, lần hoàn tất sau quyết định cuối; UNIQUE thứ tự kiểm lúc commit. MAX+1 ngoài transaction chưa đủ. Response/thêm-gỡ lặp còn DEC-005/017, schema/lock order với track/chủ đổi trạng thái còn DEC-022.

<a id="br-009"></a>

## BR-009 Khám phá và lượt nghe

CONFIRMED: Trending play_count DESC,id DESC; newest created_at DESC,id DESC. [DEC-012](../decisions/open-decisions.md#dec-012) chọn search_text từ title/artist/host, một hàm chung chuẩn hóa Unicode/viết thường/bỏ dấu/đ → d/gom khoảng trắng; cập nhật cùng metadata. Keyword tương tự, tối đa 100 ký tự/10 từ, mọi từ có mặt không cần đúng thứ tự. %, _ và backslash là ký tự thường, escape LIKE/SQL tham số hóa. Admin dùng email/username hoặc title/artist theo API. Đo 1.000 track trước thêm pg_trgm nếu cần; chưa benchmark.

[DEC-010](../decisions/open-decisions.md#dec-010): cửa sổ trượt 30 phút từ lượt gần nhất, client listenedSeconds >=10/server kiểm input-cooldown/chưa chứng minh nghe thật. User ID cho thành viên, UUID server cấp/cookie ký cho Guest; login chuyển user ID chấp nhận có thể thêm một lượt. Cooldown/đếm cùng transaction, lặp 200/counted:false. listen_cooldowns giữ bảy ngày rồi dọn, không là lịch sử nghe cá nhân. Cookie/validation numeric/response còn DEC-014/017, schema/cạnh tranh DEC-022.
