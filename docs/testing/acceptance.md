# Kịch bản nghiệm thu backend

Các kịch bản đầy đủ vẫn **NOT_RUN**. Backend đã có `npm test` chạy bằng `node:test` trên DB thử riêng. Lần chạy ngày 20/11/2026 có bốn test bootstrap và schema qua. Phần DDL khởi tạo của [TC-19](#tc-19) đã `PASS` theo lần chạy đó. Seed/demo và các kịch bản API nghiệp vụ vẫn chờ kiểm chứng. [Thiết lập test](../development/local-setup.md), [bằng chứng lần chạy](../project/status.md#single-database-migration-2026-11-20).

Kết quả mong đợi dựa trên hợp đồng đã xác nhận. Khi thực thi nhánh còn thiếu kết quả mong đợi, ghi `BLOCKED` theo DEC tương ứng. [Chiến lược kiểm thử](strategy.md).

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

**Đầu vào và thao tác** — API-01, API-30/31. Thử username trùng và các biên 1/2/50/51 ký tự sau trim, email trùng hoặc khác hoa thường, password 11/12/128/129 ký tự, password có khoảng trắng và lỗi gửi xác định. Thử đăng ký lại với email đã xác minh và email chưa xác minh ở hai phía mốc 24 giờ. Đối chiếu ID, tên, hash và số bản ghi.

**Expected theo lựa chọn đã xác nhận** — Tạo user mới trả `201` với `email_verified_at` là `NULL` và `data.emailVerified: false`. Username 2–50 ký tự sau trim và có thể trùng, email trim/lowercase và duy nhất, password 12–128 ký tự được giữ nguyên. Email đã xác minh trả `409`. Email chưa xác minh dưới 24 giờ từ lần cấp mã gần nhất trả `409` kèm `error.details.nextAction: "resendVerification"`. Từ 24 giờ, nhánh bắt đầu lại đủ điều kiện trả `202` với `data.emailVerified: false`, giữ ID, cập nhật tên/hash và cấp mã mới nguyên tử. Mật khẩu cũ không xác minh hoặc gửi lại được sau khi thay. Lỗi gửi xác định trả `503` và giữ user chưa xác minh. Hash, OTP và JWT được bảo vệ.

**Chi tiết chưa chốt/phụ thuộc** — Ánh xạ lỗi ngoài phần đã chốt còn DEC-017. [Hợp đồng còn thiếu](../api/README.md#contract-gaps).

**Bằng chứng cần có:** Request đã che password, user trước-sau verify/Resend mail đã che mã; không coi response tiếp nhận là active.

<a id="tc-02"></a>

## TC-02 OTP đăng ký

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác** — Dùng Resend giả lập khi test tích hợp và gửi thật riêng khi demo. Thử xác minh/gửi lại với mật khẩu đúng/sai, OTP đúng/sai/hết hạn/đã dùng, mốc 60 giây, lượt thứ sáu/email và hai yêu cầu đồng thời cùng email khi còn một lượt. Thử timeout, lỗi gửi, `reserved` trước/sau 15 giây và dọn OTP sau bảy ngày.

**Expected theo lựa chọn đã xác nhận** — Xác minh đúng trả `200` với `data.emailVerified: true`; ghi xác minh email và dùng mã cùng giao dịch. Mã sai/hết hạn/đã dùng/bị thay hoặc sai mật khẩu trả `400 VALIDATION_ERROR`. Sai mật khẩu giữ nguyên số lần sai OTP. OTP sáu số, dùng một lần, hạn năm phút, vô hiệu ở lần đối chiếu sai thứ ba. Gửi lại đủ điều kiện trả `202` với `data.emailVerified: false` và vô hiệu mã cũ. API-01/31 dùng chung năm lượt/email/giờ, kể cả lượt gửi lỗi, cách nhau ít nhất 60 giây. Chỉ một yêu cầu đồng thời được cấp lượt cuối; chạm hạn mức email hoặc cooldown trả `429 RATE_LIMITED` kèm `Retry-After`. OTP local lưu `request_ip = NULL`.

Ghi mã trước khi gọi Resend với timeout năm giây. Lỗi gửi xác định trả `503 SERVICE_UNAVAILABLE`, vô hiệu hóa mã và giữ user chưa xác minh. Timeout giữ mã `unknown` đủ điều kiện xác minh trong thời hạn cũ. Với `reserved` còn hạn, trước 15 giây trả `409 CONFLICT` kèm `error.details.retryAfterSeconds` và giữ nguyên số lần sai. Từ 15 giây có thể chuyển sang `unknown` và kiểm mã. Job mỗi giờ dọn lịch sử OTP đã quá bảy ngày. [Vòng đời OTP](../architecture/security-and-media.md#otp-delivery).

**Chi tiết chưa chốt/phụ thuộc** — Migration cho phép `request_ip` nhận `NULL` thuộc DEC-022; lỗi ngoài phần đã chốt thuộc DEC-017. [Hợp đồng còn thiếu](../api/README.md#contract-gaps).

**Bằng chứng cần có:** Clock/counters/user/OTP đã che trước-sau, email thật đã che mã, không dùng mock làm bằng chứng gửi mail thật.

<a id="tc-03"></a>

## TC-03 Login và tài khoản hiện tại

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác** — API-02/04/39 trên HTTP local, user đã/chưa xác minh hoặc bị khóa, mật khẩu đúng/sai/có khoảng trắng và hai lần đăng nhập.

**Expected theo lựa chọn đã xác nhận** — Chỉ user đã xác minh và chưa khóa đăng nhập được. Hash scrypt có phiên bản, đúng cấu trúc và kích thước salt/digest theo DEC-014. JWT HS256 dùng issuer/audience đã chọn và hạn phiên 24 giờ. Cookie `soundwave_session` dùng HttpOnly/SameSite=Lax/path=/, tắt Secure cho HTTP local. Hai login tạo hai phiên độc lập, `/me` đọc quyền DB, JSON không chứa JWT. API-39 trả `200` với `data.csrfToken` ổn định, giải mã base64url ra 32 byte và `Cache-Control: no-store`. [Xác thực](../architecture/security-and-media.md).

**Chi tiết chưa chốt/phụ thuộc** — Domain, Origin và seed còn DEC-017/020. [Hợp đồng còn thiếu](../api/README.md#contract-gaps).

**Bằng chứng cần có:** Version/config đã che secret, hash verification không in hash, cookie properties, phiên/expires_at và response.

<a id="tc-04"></a>

## TC-04 Khôi phục mật khẩu

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác** — API-32/33/34, email tồn tại, không tồn tại, bị khóa, chưa xác minh và sai cú pháp; Resend lỗi/timeout. So sánh status, body và thời gian phản hồi. Thử mốc 60 giây, lượt thứ sáu/email, hai yêu cầu đồng thời ở lượt cuối, bộ đếm độc lập với đăng ký, OTP đúng/sai/hết hạn/đã dùng/bị thay, `reserved` trước/sau 15 giây, thu hồi hai phiên, đổi mật khẩu đúng/sai và job dọn.

**Expected theo lựa chọn đã xác nhận** — API-32 trả cùng `202`, `data: null`, `message` chung và thời gian phản hồi tương đương cho mọi email hợp lệ về cú pháp, gồm khi chạm hạn mức email hoặc Resend lỗi/timeout. Chỉ cấp mã cho tài khoản đã xác minh và chưa khóa, tối đa năm lượt/email/giờ và cách nhau ít nhất 60 giây. Bộ đếm tách riêng với đăng ký. OTP local lưu `request_ip = NULL`.

Mã reset có sáu chữ số, hạn năm phút, dùng một lần và vô hiệu ở lần sai thứ ba hoặc khi cấp mã mới. Gọi Resend sau commit, timeout năm giây. Lỗi xác định vô hiệu hóa mã; timeout giữ `unknown` với thời hạn cũ. `reserved` trước 15 giây giữ nguyên số lần sai; từ mốc 15 giây có thể chuyển sang `unknown` rồi kiểm mã. API-33 dùng chung `400 VALIDATION_ERROR` cho tài khoản hoặc mã không đủ điều kiện. Job mỗi giờ dọn lịch sử OTP đã quá bảy ngày.

API-33 thành công trả `204`, đồng thời đổi hash scrypt, đánh dấu mã đã dùng và thu hồi mọi phiên trong một transaction. Password cũ thất bại, user đăng nhập riêng bằng password mới. Password giữ nguyên 12–128 ký tự. API-34 nhận `currentPassword` và `newPassword`; mật khẩu hiện tại sai trả `400 VALIDATION_ERROR`; thành công trả `204` không body và xóa cookie hiện tại sau khi thu hồi mọi phiên. [Giao dịch auth](../architecture/security-and-media.md#auth-transaction-order), [vòng đời OTP](../architecture/security-and-media.md#otp-delivery).

**Chi tiết chưa chốt/phụ thuộc** — Lỗi ngoài phần đã chốt thuộc DEC-017; migration cho phép `request_ip` nhận `NULL` thuộc DEC-022. [Hợp đồng còn thiếu](../api/README.md#contract-gaps).

**Bằng chứng cần có** — Password/OTP/hash được che, status/body và thời gian phản hồi giữa các nhánh, bộ đếm email, kết quả job, user/phiên trước và sau reset, đăng nhập riêng sau reset.

<a id="tc-05"></a>

## TC-05 Token và vòng đời phiên

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác** — JWT sai chữ ký/claim/thuật toán, thiếu hoặc hết hạn cookie, thu hồi, logout một phiên, ban/unban, đổi/reset mật khẩu, approve, restart và lỗi DB. Thử đổi khóa JWT, login bằng mật khẩu cũ đang xử lý khi reset commit và API-39 từ nhiều tab. Kiểm tra `X-CSRF-Token` đúng/sai/thiếu và Origin.

**Expected theo lựa chọn đã xác nhận** — HS256 dùng secret 32 byte, phiên tuyệt đối 24 giờ, token CSRF 32 byte và ổn định trong phiên. Logout riêng phiên trả 204. Khóa/đổi-reset mật khẩu/đổi khóa JWT thu hồi toàn bộ phiên thuộc phạm vi thao tác. Mở khóa cần login lại. Login đang xử lý bằng mật khẩu cũ kiểm tra lại hash dưới khóa và không tạo phiên sau khi reset đã commit. Quyền Creator có hiệu lực ở request kế tiếp. Phiên còn hạn tồn tại qua restart. Phiên hết hạn hoặc thu hồi trả 401. Khi DB lỗi, API trả lỗi dịch vụ. [Giao dịch auth](../architecture/security-and-media.md#auth-transaction-order).

API-39 trả `401 UNAUTHENTICATED` khi thiếu phiên, phiên hết hạn hoặc đã bị thu hồi.

Khi đổi khóa local, dừng backend, thu hồi phiên, thay khóa, khởi động lại; token cũ bị từ chối, đăng nhập mới tạo phiên hợp lệ.

**Chi tiết chưa chốt/phụ thuộc** — Lỗi CSRF trên request ghi, Origin thiếu/phạm vi public mutation và status lỗi dịch vụ thuộc DEC-017. [Hợp đồng còn thiếu](../api/README.md#contract-gaps).

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

**Chi tiết chưa chốt/phụ thuộc** — Cách đo audio thuộc DEC-015; conditional HTTP, ảnh và validation text thuộc DEC-017; recovery state thuộc DEC-022. [API-28/29](../api/tracks.md#api-28).

**Bằng chứng cần có:** Đối chiếu JSON/audioUrl/header/byte; tách JSON lỗi trước stream, không chèn JSON vào stream đã mở; toàn bộ tình huống đều NOT_RUN cho tới khi có runtime.

<a id="tc-09"></a>

## TC-09 Upload và nhất quán file với database

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác:** Creator approved/pending/Listener/Admin; MP3 ≤30 MiB và vượt, giả đuôi/sai codec/giải mã lỗi; cover JPG/PNG hợp lệ/sai/vượt 5 MiB; duration client giả; lỗi file/DB tại từng bước, COMMIT chắc rollback/mất kết nối/response mất.

**Expected theo lựa chọn đã xác nhận:** Server sinh UUID, không dùng tên client; ffprobe kiểm tra MP3 và duration hữu hạn >0/ceil, FFmpeg giải mã toàn file, Sharp đọc/mã hóa ảnh. File sai 400, quá dung lượng 413; sai công cụ/thiếu binary không được mặc định coi input sai. Temp/final cùng filesystem, auth/quyền/CSRF trước file; validation → transaction kiểm tra lại → chuyển file → ghi track/commit → 201. Rollback chắc chắn dọn mới, commit không rõ phải đối chiếu trước xóa. Commit rồi response mất không được xóa file đã được tham chiếu.

Kiểm phiên bản Multer 2.5.0, Sharp 0.35.5, FFmpeg/ffprobe 8.1.3 trên Windows/PowerShell. Thử tối đa hai tác vụ upload/thay cover đồng thời, timeout ffprobe/FFmpeg/Sharp 5/120/15 giây, ảnh vượt 4.096 px mỗi cạnh hoặc 16 triệu pixel và đầu ra có cạnh dài tối đa 1.024 px.

**Chi tiết chưa chốt/phụ thuộc** — Lỗi công cụ, validation và retry thuộc DEC-017; nhận biết active, đối chiếu commit và danh sách dọn thuộc DEC-022. [Công cụ và giới hạn](../architecture/security-and-media.md#upload-kiem-tra-file-va-duration).

**Bằng chứng cần có:** File/hàng DB trước sau, failpoint ở move/insert/commit/response, đầu ra probe/decode đã loại đường dẫn nhạy cảm; temp/final không bị nhầm với audio public; dữ liệu thử dùng riêng.

<a id="tc-10"></a>

## TC-10 Ghi nhận lượt nghe

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác:** API-08 listenedSeconds dưới/đủ 10/giả, trượt trước-đúng-sau 30 phút, lặp/đồng thời; user/Guest cookie ký/Guest→login, track gỡ/chủ khóa và dọn cooldown bảy ngày.

**Expected theo lựa chọn đã xác nhận:** Client >=10/server kiểm input-cooldown, chưa chứng minh nghe thật. Một lượt/track/định danh trong 30 phút từ lượt gần nhất, UUID Guest server cấp/cookie ký. Login chuyển user ID có thể thêm lượt; dedup/tăng đếm cùng transaction, lặp 200/counted:false; cooldown giữ bảy ngày, GET/HEAD không tăng.

**Chi tiết chưa chốt/phụ thuộc** — Ký cookie Guest bằng HMAC-SHA256 với khóa riêng theo DEC-014. Thuộc tính cookie và validation/response ngoài phần xác nhận thuộc DEC-017; cạnh tranh và lịch dọn thuộc DEC-022.

**Bằng chứng cần có:** Clock điều khiển/last-counted/count trước-sau/hai request cùng lúc chỉ một lượt/cookie giả bị xử lý theo contract khi được chốt.

<a id="tc-11"></a>

## TC-11 Quyền quản lý tác phẩm

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác:** Creator A/B/Admin, API-10 PATCH metadata/cover, API-11/12; omitted/null, đổi chủ/audio; cover mới sai/lưu lỗi/rollback/commit không rõ và hai cập nhật cover đồng thời.

**Expected theo lựa chọn đã xác nhận:** Creator chỉ sửa/gỡ của mình, Admin mọi track; my-uploads của chính user. Không đổi chủ/thay audio; omitted giữ nguyên, null chỉ trường cho phép. Cover kiểm tra/lưu tên mới → transaction khóa hàng → cập nhật/commit → ảnh cũ vào danh sách dọn. Rollback giữ ảnh cũ, dọn ảnh mới khi đã rõ không commit/tham chiếu. Không xóa ảnh mặc định/còn tham chiếu hoặc ảnh cuối đang dùng sau hai cập nhật. Gỡ 204 không body, giữ audio/link.

**Chi tiết chưa chốt/phụ thuộc** — Giới hạn ảnh và timeout dùng chung với TC-09. Nullable/remove cover/multipart và lỗi lặp còn DEC-017, dọn/đối chiếu/khóa còn DEC-022.

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

**Đầu vào và thao tác** — API-17/20/21/38, playlist có track hiển thị và ẩn. Thử thêm mới/thêm lặp/thêm track ẩn, gỡ hai lần, reorder với ID trùng hoặc sai kiểu, tập khác, mảng rỗng và hai lượt reorder hợp lệ. Thử tập thay đổi trước kiểm tra, unhide và ràng buộc lúc commit.

**Expected theo lựa chọn đã xác nhận:** Chỉ gửi mọi ID hiển thị/khóa playlist/kiểm đúng tập. Ẩn giữ liên kết ở cuối/hiện lại cuối/không count/đọc liên tục. Tập đổi 409/tải lại; hai reorder hợp lệ tuần tự/lần hoàn tất sau quyết định cuối. Từ 1/thêm cuối/gỡ đánh lại, UNIQUE kiểm commit/không trùng cặp.

API-20 thêm mới trả `201`, thêm lại track đang hiển thị trả `200` với cùng dạng `data: {playlistId, trackId, sortOrder}` và thứ tự hiện tại, thêm track không khả dụng trả `404`. API-21 trả `204` kể cả khi liên kết đã vắng, sau khi kiểm tra playlist và quyền. API-38 thành công trả `200` và `{playlistId, trackIds}` đúng thứ tự đã lưu; ID trùng hoặc sai kiểu trả `400 VALIDATION_ERROR`; tập khác trả `409 CONFLICT`. Mảng rỗng thành công khi tập hiển thị rỗng.

**Chi tiết chưa chốt/phụ thuộc** — Lỗi ngoài phần đã chốt còn DEC-017; thứ tự khóa khi trạng thái track/chủ đổi còn DEC-022. [DDL deferred đã kiểm chứng](../project/status.md#single-database-migration-2026-11-20).

**Bằng chứng cần có:** Interleaving điều khiển/liên kết ẩn-thứ tự-count trước-sau/unhide/constraint commit; không MAX+1 ngoài transaction.

<a id="tc-14"></a>

## TC-14 Quyền sở hữu playlist

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác:** Listener A/B và Admin; playlist A, cookie B/Admin; đọc/PATCH/xóa/thêm/gỡ/reorder.

**Expected theo lựa chọn đã xác nhận:** Chỉ A được thao tác playlist A; Admin cũng chỉ playlist của mình. Truy cập chéo bị từ chối, dữ liệu giữ nguyên; mô tả lỗi 403 hiện là mapping DRAFT.

**Chi tiết chưa chốt/phụ thuộc** — Lỗi quyền sở hữu và CSRF trên request ghi còn DEC-017. [Sổ quyết định](../decisions/open-decisions.md#dec-017), [danh mục API](../api/README.md#contract-gaps).

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

**Đầu vào và thao tác** — API-35/36/37/24/25. Thử Listener chưa nộp, đã hoặc chưa xác minh, pending, rejected, bị khóa và Creator đã duyệt. Thử ID hồ sơ khác ID user, hai review cạnh tranh, cookie trước approve, độ dài tại và ngoài giới hạn tên kênh/lĩnh vực/bio/lý do, PATCH bỏ trường và `bio: null`.

**Expected theo lựa chọn đã xác nhận:** Một pending/user/pending bất biến/rejected nộp POST mới/lưu lịch sử; duyệt application ID/khóa hàng hồ sơ, approve role creator/quyền request kế tiếp, reject không upload. users.role nguồn quyền/creatorStatus suy ra hồ sơ; ngày nộp riêng/reviewer-ngày-lý do; PATCH kênh tên-bio không đổi quyền.

API-35 nhận tên kênh và lĩnh vực 2–100 ký tự sau trim, `bio` tối đa 1.000 hoặc `null`; trả `201` với hồ sơ `pending` và `409` khi đã có hồ sơ chờ. API-36 trả lịch sử mới nhất trước và `pagination` ở cấp ngoài; khi chưa nộp, kiểm `creatorStatus: "none"`, `channel: null` và `applications: []`. API-37 trả `200` với kênh hiện tại và xóa bio khi nhận `null`; dữ liệu lúc nộp giữ nguyên.

API-24 trả hồ sơ chờ cũ nhất trước theo `submittedAt` với `applicationId`. API-25 yêu cầu `rejectionReason` 1–500 ký tự sau trim khi từ chối và bỏ trường khi duyệt; trả `200` với hồ sơ đã cập nhật và role hiện tại, `404` khi thiếu hồ sơ và `409` khi hồ sơ đã được xử lý.

**Chi tiết chưa chốt/phụ thuộc** — Lỗi ngoài phần đã chốt còn DEC-017; thứ tự khóa giao dịch còn DEC-022. [Schema Creator](../architecture/data-model.md#target-model).

**Bằng chứng cần có:** Hồ sơ-history-user trước-sau/thử upload bằng phiên cũ/ID application không nhầm user/ngày nộp không lấy user.created_at.

<a id="tc-19"></a>

## TC-19 DDL, seed và fixture

Trạng thái: `NOT_RUN`.

**Đầu vào và thao tác** — Chạy `npm run migrate` trên DB thử riêng PostgreSQL 18 trống. Chạy `npm test` trên DB thử và đối chiếu catalog. Kiểm tra DDL/seed cũ ở môi trường riêng nếu có tác vụ tương ứng. Thử seed demo sau khi có bộ dữ liệu được xác nhận.

**Expected theo lựa chọn đã xác nhận** — Một migration tạo chín bảng nghiệp vụ trên DB trống. Kiểm tra catalog, email duy nhất, FK và CHECK của tài khoản/OTP, hồ sơ pending duy nhất, định danh cooldown, giới hạn track và UNIQUE vị trí playlist lúc COMMIT. Chạy lại giữ một dòng lịch sử. Sau `down` và `up` trên DB dùng riêng, schema có thể tái hiện. Seed demo và đăng nhập sau xác minh kiểm tra riêng. [Schema khởi tạo](../architecture/data-model.md#target-model).

Nếu kiểm riêng DDL cũ, đối chiếu năm bảng, 40 cột, chín index tường minh, `sort_order DEFAULT 1` và FK/UNIQUE/CHECK/nullable theo khai báo. Kiểm tra `UPDATE deleted_at` không cascade.

**Chi tiết chưa chốt/phụ thuộc** — Migration kế tiếp cần cho phép chèn OTP với `request_ip = NULL` trên DB đã áp migration khởi tạo. Dữ liệu cũ giữ nguyên. Phần DDL này chưa chạy. Seed/fixture còn DEC-020. [Thay đổi schema local](../architecture/data-model.md#reset-request-ip-storage).

**Bằng chứng phần DDL khởi tạo** — `PASS` theo `SCHEMA-20261120-01`, PostgreSQL 18.4 thử riêng. Đã kiểm tra chín bảng, các ràng buộc trong test, áp lại, rollback và áp mới sau rollback. TC-19 đầy đủ vẫn `NOT_RUN` vì seed/demo và DDL/seed cũ chưa chạy. [Kết quả](../project/status.md#single-database-migration-2026-11-20).

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

**Đầu vào và thao tác** — Windows/PowerShell, backend và PostgreSQL local, FFmpeg/ffprobe/Sharp, thư mục tạm/chính cùng filesystem. Khởi động lại backend, phát thử audio, mô phỏng lỗi upload/cover và kiểm DB/file. Chạy cleanup với file active, soft delete, ảnh dùng chung/mặc định hoặc DB ngắt. Kiểm gửi email thật khi demo.

**Expected theo lựa chọn đã xác nhận** — Local tái hiện được, DB và media còn sau restart, audio phát từ file của máy chạy backend qua API, phiên DB chưa hết hạn còn dùng được. Khi upload/cover lỗi, đối chiếu trạng thái DB và file. Cleanup chạy lúc khởi động và mỗi 30 phút, chỉ xét file tạm hoặc không tham chiếu quá 24 giờ, bỏ thao tác active và giữ file còn tham chiếu kể cả soft delete hoặc ảnh dùng chung/mặc định. Nếu DB ngắt hoặc chưa xác minh được commit thì hoãn dọn. Chỉ đưa cover cũ vào lịch dọn sau commit. OTP demo đến email thật. Online và backup/restore thuộc hướng mở rộng.

**Chi tiết chưa chốt/phụ thuộc** — Bộ demo và fixture thuộc DEC-020; nhận biết active, chống race và đối chiếu commit thuộc DEC-022. [Sổ quyết định](../decisions/open-decisions.md), [API-28/29](../api/tracks.md#api-28).

**Bằng chứng cần có** — Phiên bản và cấu hình đã che bí mật, trạng thái DB/file trước và sau restart/lỗi, kết quả phát audio và email thật, log cleanup và kết quả đối chiếu commit trên môi trường thử riêng.
