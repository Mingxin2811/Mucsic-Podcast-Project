# Kịch bản nghiệm thu backend

Trạng thái tất cả kịch bản: **NOT_RUN**. Đồng bộ ngày 17/11/2026: expected nghiệp vụ đã xác nhận được ghi riêng với wire/protocol còn thiếu. Chưa có ứng dụng hoặc runner; khi thực thi phần thiếu expected sẽ ghi BLOCKED theo DEC, không chọn đáp án bằng test. Không có lần chạy API/SQL/media nào được ghi nhận ở trang này. Cách ghi kết quả ở [strategy](strategy.md).

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

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác:** API-01, API-30/31; email trùng/khác hoa thường, password 11/12/128/129 ký tự/có khoảng trắng, gửi mail lỗi/đăng ký lại.

**Expected theo lựa chọn đã xác nhận:** User mới email_verified_at NULL, login bị chặn trước verify; Resend thật/không tự login sau verify. Email trim/lowercase, password 12–128/không trim, không lộ hash/OTP/JWT, gửi lỗi giữ unverified/không tạo trùng.

**Chi tiết chưa chốt/phụ thuộc:** DEC-003/005/017/022: đăng ký lại/timeout/status-response/username validation/schema. Tra [sổ DEC](../decisions/open-decisions.md#evidence-simple-2026-11-17) và [API gaps](../api/README.md#contract-gaps); không tự chọn expected còn thiếu.

**Bằng chứng cần có:** Request đã che password, user trước-sau verify/Resend mail đã che mã; không coi response tiếp nhận là active.

<a id="tc-02"></a>

## TC-02 OTP đăng ký

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác:** Resend thực, verify {email,otp}, OTP đúng/sai 1–3/hết năm phút/dùng lại, resend trước-sau 60 giây/mã cũ; sáu lần gửi/email/giờ, concurrency/provider timeout.

**Expected theo lựa chọn đã xác nhận:** Sáu số/một lần/năm phút/ba sai, resend hủy cũ/cooldown 60 giây/giới hạn 5 lần gửi-email-giờ. PostgreSQL lưu HMAC digest/secret riêng/số thử-thời hạn; lỗi mail giữ unverified/cho resend/không tạo trùng.

**Chi tiết chưa chốt/phụ thuộc:** DEC-003/005/017/022: IP threshold/cửa sổ-count gửi/timeout trạng thái mã/response/atomic update. Tra [sổ DEC](../decisions/open-decisions.md#evidence-simple-2026-11-17) và [API gaps](../api/README.md#contract-gaps); không tự chọn expected còn thiếu.

**Bằng chứng cần có:** Clock/counters/user/OTP đã che trước-sau, email thật đã che mã, không dùng mock làm bằng chứng gửi mail thật.

<a id="tc-03"></a>

## TC-03 Login và tài khoản hiện tại

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác:** API-02/04/39, verified/unverified/banned, password đúng-sai/có khoảng trắng, hai login, HTTP local và HTTPS online.

**Expected theo lựa chọn đã xác nhận:** Chỉ verified/chưa khóa login; scrypt async/salt riêng/thông số lưu đúng lựa chọn, JWT HS256/jose/24 giờ tuyệt đối, soundwave_session/HttpOnly/SameSite=Lax/path=/; Secure online, chỉ tắt riêng local. Hai phiên độc lập/me quyền DB, không JWT JSON; API-39 token gắn phiên.

**Chi tiết chưa chốt/phụ thuộc:** DEC-003/014/017/020/022: hash format/key lifecycle/Domain/CSRF response/Origin policy và seed. Tra [sổ DEC](../decisions/open-decisions.md#evidence-simple-2026-11-17) và [API gaps](../api/README.md#contract-gaps); không tự chọn expected còn thiếu.

**Bằng chứng cần có:** Version/config đã che secret, hash verification không in hash, cookie properties, phiên/expires_at và response.

<a id="tc-04"></a>

## TC-04 Khôi phục mật khẩu

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác:** API-32/33/34: email tồn tại/không/locked/unverified, OTP đúng-sai-hết hạn-resend, currentPassword sai/đúng, hai phiên; reset {email,otp,newPassword}.

**Expected theo lựa chọn đã xác nhận:** Reset chỉ verified/chưa khóa; yêu cầu phản hồi chung không tiết lộ tồn tại. Password 12–128/không trim; hash scrypt/thu hồi mọi phiên nguyên tử, không tự login; password cũ thất bại/mới login riêng. Đổi cần currentPassword/newPassword.

**Chi tiết chưa chốt/phụ thuộc:** DEC-003/005/014/017/022: response/status/provider error/timeout/hash format và race. Tra [sổ DEC](../decisions/open-decisions.md#evidence-simple-2026-11-17) và [API gaps](../api/README.md#contract-gaps); không tự chọn expected còn thiếu.

**Bằng chứng cần có:** Password/OTP/hash được che, response email chung/user-phiên trước-sau, kiểm login riêng sau reset.

<a id="tc-05"></a>

## TC-05 Token và vòng đời phiên

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác:** JWT sai chữ ký/claim/thuật toán, thiếu-hết hạn-thu hồi cookie, logout một phiên/ban-unban/password/approve/restart/DB lỗi; API-39/X-CSRF-Token đúng-sai-thiếu/Origin.

**Expected theo lựa chọn đã xác nhận:** HS256/secret >=32 byte, phiên 24 giờ không refresh; cookie đã chọn; protected mutation token ngẫu nhiên gắn phiên/Origin; auth trước login JSON/Origin. Logout riêng phiên 204, ban/đổi-reset tất cả, unban không hồi sinh, approve quyền kế tiếp, DB lỗi không bỏ kiểm tra, phiên bền restart/thu hồi-hết hạn 401.

**Chi tiết chưa chốt/phụ thuộc:** DEC-014/017/022: key lifecycle/CSRF response-cấp lại-thu hồi/Origin thiếu-phạm vi public mutation/lock order/status dịch vụ. Tra [sổ DEC](../decisions/open-decisions.md#evidence-simple-2026-11-17) và [API gaps](../api/README.md#contract-gaps); không tự chọn expected còn thiếu.

**Bằng chứng cần có:** Thứ tự commit/request/phiên-user trước-sau/headers che giá trị/clock-DB failure có điều khiển; không tuyên bố hủy request đã nhận.

<a id="tc-06"></a>

## TC-06 Trending và mới phát hành

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác:** Music/podcast có play_count/created_at khác nhau và bằng nhau, track gỡ/chủ khóa, kho rỗng; API-05 sort và API-06.

**Expected theo lựa chọn đã xác nhận:** Trending play_count DESC,id DESC; newest created_at DESC,id DESC; loại track gỡ/chủ khóa. Dùng API-05 sort=newest, không route new-releases riêng; pagination chung.

**Chi tiết chưa chốt/phụ thuộc:** DEC-017: shape khi lọc type Trending, validation trường cụ thể. Tra [sổ DEC](../decisions/open-decisions.md) và [danh mục API](../api/README.md#contract-gaps); không tự chọn expected còn thiếu.

**Bằng chứng cần có:** Fixture kiểm soát thứ tự/ẩn và danh sách thực trả, ranh giới trang; không chỉ kiểm độ dài.

<a id="tc-07"></a>

## TC-07 Tìm kiếm và thể loại

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác:** API-05/13/14/22/26: Son Tung/Sơn Tùng/đ-Đ/Unicode tổ hợp-tách/khoảng trắng, từ đảo thứ tự, %, _ và backslash; keyword 100/101 ký tự và 10/11 từ; genre/type/sort/pagination.

**Expected theo lựa chọn đã xác nhận:** search_text cùng metadata, Unicode/hoa thường/bỏ dấu/đ → d/gom khoảng trắng. Mọi từ phải có không cần thứ tự; ký tự wildcard được hiểu literal, SQL tham số hóa. Keyword <=100/10; unknown field-query 400; admin cùng chuẩn hóa đúng trường. Loại track gỡ/chủ khóa/sort ổn định/pagination chung.

**Chi tiết chưa chốt/phụ thuộc:** DEC-017: đếm ký tự/validation chi tiết/Trending type shape; DEC-022 migration-index, DEC-015 benchmark. DEC-012 semantics đã ACCEPTED. Tra [sổ DEC](../decisions/open-decisions.md#evidence-simple-2026-11-17) và [API gaps](../api/README.md#contract-gaps); không tự chọn expected còn thiếu.

**Bằng chứng cần có:** Cặp input-normalized-query-result, cập nhật metadata rồi search, boundary/literal injection; không suy ra tốc độ từ cấu trúc index.

<a id="tc-08"></a>

## TC-08 Chi tiết tác phẩm, metadata và media

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác:** Music/podcast, duration CBR/VBR hợp lệ/lỗi; JSON API-05/07/09; GET API-28 full/single Range/multi-range; HEAD API-29 có/không Range; track gỡ/chủ khóa/file mất.

**Expected theo lựa chọn đã xác nhận:** Metadata dùng audioUrl /api/tracks/:id/audio, không audioFilePath hoặc path thật. Duration ffprobe hữu hạn >0, ceiling INT giây (243,7 →244), làm tròn không là bảo đảm độ chính xác probe; kiểm chứng CBR/VBR riêng. MP3 được kiểm tra định dạng/codec và giải mã toàn file, plain text không đồng bộ; music lyrics 20.000/description 5.000 ký tự, podcast description 20.000/lyrics null, text rỗng sau trim null/omitted giữ nguyên/HTML 400. GET full 200, single Range 206 đúng byte; multi-range hợp lệ full 200. HEAD bỏ Range và không body cả lỗi, header kích thước toàn file khi 200. no-store trên response audio.

**Chi tiết chưa chốt/phụ thuộc:** DEC-014/015/017/022: versions/limits, độ chính xác probe/đo nghe, Range/conditional HTTP/ảnh, nhận diện HTML/đếm ký tự và recovery state. DEC-021 text policy đã chốt. Không dùng server thời lượng giả để gọi PASS duration. Tra [sổ DEC](../decisions/open-decisions.md) và [API-28/29](../api/tracks.md#api-28); không tự chọn expected còn thiếu.

**Bằng chứng cần có:** Đối chiếu JSON/audioUrl/header/byte; tách JSON lỗi trước stream, không chèn JSON vào stream đã mở; toàn bộ tình huống đều NOT_RUN cho tới khi có runtime.

<a id="tc-09"></a>

## TC-09 Upload và nhất quán file với database

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác:** Creator approved/pending/Listener/Admin; MP3 ≤30 MiB và vượt, giả đuôi/sai codec/giải mã lỗi; cover JPG/PNG hợp lệ/sai/vượt 5 MiB; duration client giả; lỗi file/DB tại từng bước, COMMIT chắc rollback/mất kết nối/response mất.

**Expected theo lựa chọn đã xác nhận:** Server sinh UUID, không dùng tên client; ffprobe kiểm tra MP3 và duration hữu hạn >0/ceil, FFmpeg giải mã toàn file, Sharp đọc/mã hóa ảnh. File sai 400, quá dung lượng 413; sai công cụ/thiếu binary không được mặc định coi input sai. Temp/final cùng filesystem, auth/quyền/CSRF trước file; validation → transaction kiểm tra lại → chuyển file → ghi track/commit → 201. Rollback chắc chắn dọn mới, commit không rõ phải đối chiếu trước xóa. Commit rồi response mất không được xóa file đã được tham chiếu.

**Chi tiết chưa chốt/phụ thuộc:** DEC-014/017/022: versions, timeout/concurrency và cấu hình ảnh, error code công cụ/validation, retry upload, trạng thái active/đối chiếu commit/danh sách dọn. Không tự chọn queue hoặc đáp án retry idempotency trong test. Tra [sổ DEC](../decisions/open-decisions.md) và [API-28/29](../api/tracks.md#api-28); không tự chọn expected còn thiếu.

**Bằng chứng cần có:** File/hàng DB trước sau, failpoint ở move/insert/commit/response, đầu ra probe/decode đã loại đường dẫn nhạy cảm; temp/final không bị nhầm với audio public; dữ liệu thử dùng riêng.

<a id="tc-10"></a>

## TC-10 Ghi nhận lượt nghe

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác:** API-08 listenedSeconds dưới/đủ 10/giả, trượt trước-đúng-sau 30 phút, lặp/đồng thời; user/Guest cookie ký/Guest→login, track gỡ/chủ khóa và dọn cooldown bảy ngày.

**Expected theo lựa chọn đã xác nhận:** Client >=10/server kiểm input-cooldown, chưa chứng minh nghe thật. Một lượt/track/định danh trong 30 phút từ lượt gần nhất, UUID Guest server cấp/cookie ký. Login chuyển user ID có thể thêm lượt; dedup/tăng đếm cùng transaction, lặp 200/counted:false; cooldown giữ bảy ngày, GET/HEAD không tăng.

**Chi tiết chưa chốt/phụ thuộc:** DEC-014/017/022: cookie Guest/validation numeric-response phần còn lại/thuật toán cạnh tranh/schema và lịch dọn. DEC-010 semantics đã ACCEPTED. Tra [sổ DEC](../decisions/open-decisions.md#evidence-simple-2026-11-17) và [API gaps](../api/README.md#contract-gaps); không tự chọn expected còn thiếu.

**Bằng chứng cần có:** Clock điều khiển/last-counted/count trước-sau/hai request cùng lúc chỉ một lượt/cookie giả bị xử lý theo contract khi được chốt.

<a id="tc-11"></a>

## TC-11 Quyền quản lý tác phẩm

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác:** Creator A/B/Admin, API-10 PATCH metadata/cover, API-11/12; omitted/null, đổi chủ/audio; cover mới sai/lưu lỗi/rollback/commit không rõ và hai cập nhật cover đồng thời.

**Expected theo lựa chọn đã xác nhận:** Creator chỉ sửa/gỡ của mình, Admin mọi track; my-uploads của chính user. Không đổi chủ/thay audio; omitted giữ nguyên, null chỉ trường cho phép. Cover kiểm tra/lưu tên mới → transaction khóa hàng → cập nhật/commit → ảnh cũ vào danh sách dọn. Rollback giữ ảnh cũ, dọn ảnh mới khi đã rõ không commit/tham chiếu. Không xóa ảnh mặc định/còn tham chiếu hoặc ảnh cuối đang dùng sau hai cập nhật. Gỡ 204 không body, giữ audio/link.

**Chi tiết chưa chốt/phụ thuộc:** DEC-014/017/022: cấu hình ảnh/versions, nullable/remove cover/multipart wire, lỗi lặp và cơ chế dọn/đối chiếu/khóa chống race. Không tự cấp route cover. Tra [sổ DEC](../decisions/open-decisions.md) và [API-28/29](../api/tracks.md#api-28); không tự chọn expected còn thiếu.

**Bằng chứng cần có:** HTTP/DB/file trước sau, hai transaction có interleaving điều khiển, danh sách dọn và kết quả cuối sau job; thử default/shared cover và COMMIT không rõ.

<a id="tc-12"></a>

## TC-12 Vòng đời playlist

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác:** User/playlist hoạt động, tên hợp lệ/sai, PATCH omitted/null, xóa mềm và thao tác sau xóa; API-15–API-19.

**Expected theo lựa chọn đã xác nhận:** Tạo 201 gắn user, đọc/sửa 200, xóa 204 không body; không sửa playlist đã xóa; không xóa track dùng chung; restore ngoài MVP.

**Chi tiết chưa chốt/phụ thuộc:** DEC-017/019/022: nullable field cụ thể/lỗi lặp/validation cuối; PATCH rỗng 400 đã chốt. Tra [sổ DEC](../decisions/open-decisions.md) và [danh mục API](../api/README.md#contract-gaps); không tự chọn expected còn thiếu.

**Bằng chứng cần có:** Luồng tạo/đọc/PATCH/xóa và hàng DB, xác nhận track/liên kết giữ nguyên khi soft delete.

<a id="tc-13"></a>

## TC-13 Thành viên và thứ tự playlist

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác:** API-17/20/21/38, playlist có track hiển thị-ẩn, thêm-gỡ-trùng/reorder {trackIds}, hai reorder hợp lệ; tập thay đổi trước kiểm tra; unhide và commit constraint.

**Expected theo lựa chọn đã xác nhận:** Chỉ gửi mọi ID hiển thị/khóa playlist/kiểm đúng tập. Ẩn giữ liên kết ở cuối/hiện lại cuối/không count/đọc liên tục. Tập đổi 409/tải lại; hai reorder hợp lệ tuần tự/lần hoàn tất sau quyết định cuối. Từ 1/thêm cuối/gỡ đánh lại, UNIQUE kiểm commit/không trùng cặp.

**Chi tiết chưa chốt/phụ thuộc:** DEC-005/017/022: response/validation array-ID/trùng/thêm-gỡ lặp, DDL deferred/lock order khi trạng thái track-chủ đổi. DEC-019 đã ACCEPTED, không tự thêm ETag/revision. Tra [sổ DEC](../decisions/open-decisions.md#evidence-simple-2026-11-17) và [API gaps](../api/README.md#contract-gaps); không tự chọn expected còn thiếu.

**Bằng chứng cần có:** Interleaving điều khiển/liên kết ẩn-thứ tự-count trước-sau/unhide/constraint commit; không MAX+1 ngoài transaction.

<a id="tc-14"></a>

## TC-14 Quyền sở hữu playlist

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác:** Listener A/B và Admin; playlist A, cookie B/Admin; đọc/PATCH/xóa/thêm/gỡ/reorder.

**Expected theo lựa chọn đã xác nhận:** Chỉ A được thao tác playlist A; Admin cũng chỉ playlist của mình. Truy cập chéo bị từ chối, dữ liệu giữ nguyên; mô tả lỗi 403 hiện là mapping DRAFT.

**Chi tiết chưa chốt/phụ thuộc:** DEC-005/017: response reorder/CSRF lifecycle/status-error từng nhánh; không tự chọn 404 thay 403. Tra [sổ DEC](../decisions/open-decisions.md) và [danh mục API](../api/README.md#contract-gaps); không tự chọn expected còn thiếu.

**Bằng chứng cần có:** Response đã che cookie, so sánh dữ liệu và liên kết trước/sau.

<a id="tc-15"></a>

## TC-15 Quản trị tài khoản

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác:** Admin/Listener, user thường active/locked, chính Admin và Admin khác; API-22/23, login/protected/media trước/sau ban/unban.

**Expected theo lựa chọn đã xác nhận:** Chỉ Admin quản trị; cấm khóa chính mình/Admin khác. Khóa user thu hồi tất cả phiên, không login; khóa Creator ẩn track và chặn audio mới. Unban phải login lại và chỉ hiện track chưa gỡ riêng.

**Chi tiết chưa chốt/phụ thuộc:** DEC-017/022: error/race transaction; admin search BR-009 và khóa hàng user đã chọn. Tra [sổ DEC](../decisions/open-decisions.md) và [danh mục API](../api/README.md#contract-gaps); không tự chọn expected còn thiếu.

**Bằng chứng cần có:** Trạng thái user/phiên/track trước sau; quyền/HTTP trước sau và không vô tình phục hồi track gỡ.

<a id="tc-16"></a>

## TC-16 Xóa mềm và truy vấn

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác:** Track trong playlist, user có nội dung; API-11/27 gỡ, API-05/07/17/26 đọc; API-19 xóa playlist; khóa/mở khóa chủ.

**Expected theo lựa chọn đã xác nhận:** Soft delete giữ hàng/liên kết/file; public/playlist loại track gỡ/chủ khóa, không tính count; Admin xem deleted theo query. Unban không sửa deleted_at track. Restore/hard delete ngoài MVP.

**Chi tiết chưa chốt/phụ thuộc:** DEC-017/022: conditional HTTP/filter admin chủ khóa/lỗi lặp; reorder hiển thị DEC-019 đã chọn; media/cache đã chọn tại API-28/29. Tra [sổ DEC](../decisions/open-decisions.md) và [danh mục API](../api/README.md#contract-gaps); không tự chọn expected còn thiếu.

**Bằng chứng cần có:** Truy vấn/hàng/FK và file trước sau; không suy ra soft delete cascade.

<a id="tc-17"></a>

## TC-17 URL của tác phẩm đã gỡ

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác:** URL audio cũ API-28 và HEAD API-29, full/single Range, request trước/sau commit gỡ/khóa/mở khóa; track không tồn tại, file mất/không đọc được, DB ngắt; lỗi giữa stream.

**Expected theo lựa chọn đã xác nhận:** Mỗi request mới kiểm tra DB; track không có/gỡ/chủ khóa 404 TRACK_NOT_AVAILABLE, file mất/không đọc được 503 MEDIA_UNAVAILABLE, DB lỗi 503 SERVICE_UNAVAILABLE. Range hợp lệ ngoài file 416 + Content-Range bytes */size; sai cú pháp 400; 206 có Content-Range/Content-Length đúng đoạn, full 200 đúng kích thước; multi-range hợp lệ bỏ qua full 200. HEAD bỏ Range, không body cả lỗi. Cache-Control no-store. Lỗi trước stream JSON envelope (HEAD không body), giữa stream đóng/ghi log, không chèn JSON hoặc đổi status đã gửi. Request đã bắt đầu được hoàn tất sau gỡ/khóa; unban không phục hồi track gỡ riêng. Không tăng lượt nghe từ GET/HEAD.

**Chi tiết chưa chốt/phụ thuộc:** DEC-017: mã lỗi 400/416, conditional If-Range/validator, Range unit khác bytes và header lỗi phụ. Không dùng no-store làm bằng chứng thu hồi buffer đã tải. Tra [sổ DEC](../decisions/open-decisions.md) và [API-28/29](../api/tracks.md#api-28); không tự chọn expected còn thiếu.

**Bằng chứng cần có:** Status/header/byte và JSON lỗi, thời điểm request/commit; khẳng định HEAD không body trên từng lỗi và Range; kiểm tra URL public static không bypass và log không lộ path cho client.

<a id="tc-18"></a>

## TC-18 Vòng đời Creator

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác:** API-35/36/37/24/25, Listener verified/unverified/pending/rejected/locked/Creator approved, application ID khác user ID, hai review cạnh tranh và cookie trước approve.

**Expected theo lựa chọn đã xác nhận:** Một pending/user/pending bất biến/rejected nộp POST mới/lưu lịch sử; duyệt application ID/khóa hàng hồ sơ, approve role creator/quyền request kế tiếp, reject không upload. users.role nguồn quyền/creatorStatus suy ra hồ sơ; ngày nộp riêng/reviewer-ngày-lý do; PATCH kênh tên-bio không đổi quyền.

**Chi tiết chưa chốt/phụ thuộc:** DEC-005/017/022: field lĩnh vực-lý do/body-response/required-null/mapping trạng thái-kênh/transaction. Tra [sổ DEC](../decisions/open-decisions.md#evidence-simple-2026-11-17) và [API gaps](../api/README.md#contract-gaps); không tự chọn expected còn thiếu.

**Bằng chứng cần có:** Hồ sơ-history-user trước-sau/thử upload bằng phiên cũ/ID application không nhầm user/ngày nộp không lấy user.created_at.

<a id="tc-19"></a>

## TC-19 DDL, seed và fixture

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác** — Chạy migration đích bằng `node-pg-migrate` trên DB thử riêng PostgreSQL 18 trống sau khi migration được tạo. Kiểm tra DDL/seed cũ ở môi trường riêng nếu có tác vụ tương ứng. Thử seed demo sau khi có bộ dữ liệu được xác nhận.

**Expected theo lựa chọn đã xác nhận** — Sau chuỗi migration, schema đích có năm bảng nghiệp vụ hiện có và bốn bảng bổ sung `otp_challenges`, `auth_sessions`, `creator_applications` và `listen_cooldowns`. Kiểm tra `email_verified_at`, `search_text`, `TIMESTAMPTZ`, UNIQUE thứ tự kiểm tra lúc COMMIT và soft delete. DB khởi tạo chưa có tài khoản hoặc nội dung demo. Kiểm tra scrypt và đăng nhập sau xác minh email khi chạy seed demo riêng. [Phạm vi migration đã xác nhận](../decisions/open-decisions.md#evidence-initial-migration-2026-11-18).

Nếu kiểm riêng DDL cũ, đối chiếu năm bảng, 40 cột, chín index tường minh, `sort_order DEFAULT 1` và FK/UNIQUE/CHECK/nullable theo khai báo. Kiểm tra `UPDATE deleted_at` không cascade.

**Chi tiết chưa chốt/phụ thuộc** — Cột, FK, index, thứ tự khóa, định dạng hash, lệnh chạy và fixture/media còn DEC-003/014/020/022. Chưa có migration để chạy. [Sổ DEC](../decisions/open-decisions.md#evidence-simple-2026-11-17).

**Bằng chứng cần có:** Revision/version/log DDL-migration/rollback-dữ liệu/sequence/hash-login sau verify/manifest; không reset DB cần giữ.

<a id="tc-20"></a>

## TC-20 Hiệu năng

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác:** 1.000 track, 100 user, 200 playlist, 10 người dùng đồng thời; máy/runtime/DB/network và file mẫu theo protocol sẽ chốt.

**Expected theo lựa chọn đã xác nhận:** API đọc danh sách/tìm kiếm/playlist p95 <500 ms sau warm-up, đo 60 giây; cold start báo riêng. Bắt đầu nghe ≤1 giây là phép đo tích hợp riêng, không suy ra từ API metadata.

**Chi tiết chưa chốt/phụ thuộc:** DEC-009/012/014/015/017: cấu hình, công cụ/warm-up/request mix, phép đo percentile và start/end audio. Chưa đủ protocol để ghi PASS/FAIL định lượng. Tra [sổ DEC](../decisions/open-decisions.md) và [danh mục API](../api/README.md#contract-gaps); không tự chọn expected còn thiếu.

**Bằng chứng cần có:** Dữ liệu thô, thông số môi trường và phương pháp; không ghi mẫu JSON hoặc index là bằng chứng hiệu năng.

<a id="tc-21"></a>

## TC-21 Tái hiện môi trường và phục hồi

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác:** Local/online được chọn, ffprobe/FFmpeg/Sharp, thư mục temp/final cùng filesystem, email thật, backup/restore; restart/crash upload/cover và chạy job khi có file active, soft delete/shared/default cover hoặc DB ngắt.

**Expected theo lựa chọn đã xác nhận:** Media bền qua restart/deploy, backup/restore đối chiếu DB và file. Cleanup lúc startup/mỗi 30 phút, chỉ file temp hoặc không tham chiếu đều đã quá 24 giờ; bỏ active, kiểm tra cả soft delete, không xóa audio soft delete/ảnh mặc định/shared/còn dùng; DB lỗi hoặc commit chưa xác minh hoãn dọn. Cover cũ chỉ vào danh sách dọn sau commit. Phiên DB còn hạn qua restart; OTP tới email thật; toàn hệ thống không bắt buộc offline.

**Chi tiết chưa chốt/phụ thuộc:** DEC-003/014/015/016/020/022: hosting/config/version binary, timeout/số tiến trình và scheduler, nhận biết active/chống race/đối chiếu commit, retention/protocol backup và fixture thật. Không tự đặt lease/journal hoặc coi mock là kiểm chứng phục hồi thật. Tra [sổ DEC](../decisions/open-decisions.md) và [API-28/29](../api/tracks.md#api-28); không tự chọn expected còn thiếu.

**Bằng chứng cần có:** Chạy clock/job có kiểm soát, snapshot tham chiếu/file trước sau, crash point/commit outcomes, command/version/config đã che bí mật và kết quả restore/mail. Không thực thi crash/delete trên dữ liệu cần giữ.
