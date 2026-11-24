# Xác thực và vòng đời media

Lựa chọn kiến trúc ngày 17/11/2026 đã CONFIRMED theo [DEC](../decisions/open-decisions.md#evidence-2026-11-17); wire còn thiếu được ghi riêng. Triển khai NOT_IMPLEMENTED, kiểm chứng NOT_RUN. Request/response ở [API](../api/README.md), quyền ở [business rules](../requirements/business-rules.md).

## Email, đăng ký và mật khẩu

[DEC-003/014/017](../decisions/open-decisions.md#evidence-password-reset-otp-2026-11-21): Resend HTTPS/fetch backend, cần tài khoản/API key/domain gửi xác minh. Listener mới có `email_verified_at` là `NULL` và chưa thể đăng nhập. OTP đăng ký và reset có sáu chữ số, hạn năm phút, dùng một lần và vô hiệu hóa ở lần sai thứ ba.

PostgreSQL lưu digest HMAC-SHA256 với secret riêng, số lần sai, thời hạn và các mốc dùng/vô hiệu hóa. Lỗi gửi giữ user đăng ký ở trạng thái chưa xác minh, cho gửi lại và không tạo user trùng. Reset dành cho user đã xác minh và chưa khóa. Yêu cầu reset phản hồi chung để bảo vệ thông tin tài khoản. Xác minh email và reset không tự đăng nhập.

Password 12–128 ký tự, cho khoảng trắng và giữ nguyên khi băm. Dùng scrypt bất đồng bộ Node với `N=32768`, `r=8`, `p=3`, `maxmem=64 MiB`, salt ngẫu nhiên 16 byte riêng cho mỗi mật khẩu và digest 32 byte. `password_hash` lưu `scrypt$v1$N=32768,r=8,p=3$<salt>$<digest>`, với salt và digest mã hóa base64url. Seed demo thuộc DEC-020. Che password, hash, OTP và JWT trong log và bằng chứng bàn giao. [DEC-014](../decisions/open-decisions.md#dec-014).

<a id="otp-delivery"></a>

### Ghi lượt gửi và xử lý kết quả OTP

1. Trong transaction, kiểm tra cooldown/hạn mức, đóng mã cũ khi cấp mã thay thế và ghi mã mới với `delivery_status=reserved`. Kiểm tra và ghi lượt gửi của cùng tài khoản phải nguyên tử. Mọi lượt đã ghi đều tính vào hạn mức gửi, kể cả lượt gửi lỗi.
2. Gọi Resend sau commit. Phản hồi thành công ghi `accepted`. Lỗi xác định ghi `failed` và vô hiệu hóa mã nếu còn hiệu lực. Timeout chưa rõ kết quả ghi `unknown`. Mã `unknown` còn đủ điều kiện xác minh đến khi hết hạn hoặc bị thay, theo các điều kiện dùng một lần và số lần sai.
3. Cập nhật kết quả gửi cho đúng mã. Kết quả đến muộn vẫn giữ nguyên việc mã đã dùng hoặc đã bị vô hiệu hóa.

**OTP đăng ký.** Các lượt `verify_email` tính tối đa năm lượt cấp mã đã ghi/email/giờ, cách nhau ít nhất 60 giây. API-01 và API-31 dùng chung bộ đếm. Kiểm và ghi lượt của cùng tài khoản trong transaction.

**OTP reset.** Tính tối đa năm lượt cấp mã đã ghi/email/giờ, cách nhau ít nhất 60 giây, dựa vào hàng `reset_password` và tách khỏi đăng ký. Chỉ cấp mã cho user đã xác minh và chưa khóa. Với email hợp lệ về cú pháp, API-32 luôn trả cùng `202`, cùng nội dung và thời gian phản hồi tương đương giữa các trạng thái tài khoản, hạn mức email và kết quả Resend. [API-32](../api/auth.md#api-32).

**Chờ gửi và dọn dữ liệu.** Cuộc gọi Resend cho cả hai mục đích có timeout năm giây. Trong 15 giây đầu, yêu cầu xác minh hoặc reset với mã còn hiệu lực ở trạng thái `reserved` được yêu cầu thử lại và giữ nguyên số lần sai. Từ mốc 15 giây, có thể chuyển sang `unknown` trong transaction rồi kiểm mã với hạn ban đầu. Job mỗi giờ dọn lịch sử OTP đăng ký/reset đã quá bảy ngày. [API-30](../api/auth.md#api-30), [API-33](../api/auth.md#api-33).

Hạn mức theo IP thuộc hướng mở rộng. Bản local dùng migration cho phép `request_ip` nhận `NULL`; wire còn thiếu thuộc DEC-017. [Xác nhận local](../decisions/open-decisions.md#evidence-local-runtime-2026-11-22), [mô hình dữ liệu](data-model.md#reset-request-ip-storage).

## Phiên JWT đã chọn

[DEC-006](../decisions/open-decisions.md#dec-006), [ADR xác thực](../decisions/adr-0001-authentication-and-sessions.md): JWT đi cùng bảng `auth_sessions` PostgreSQL. JWT có sub (user ID), sid (session ID), iat, exp, iss, aud; không cần email/role. Mỗi login thành công tạo phiên riêng. Token và phiên hết hạn tuyệt đối sau 24 giờ; không gia hạn, chưa có refresh token.

Protected request xác minh chữ ký HS256 và claim, sau đó đọc phiên cùng user, kiểm tra đúng chủ, còn hạn, chưa thu hồi, user hoạt động và đã xác minh email, rồi kiểm tra quyền hiện tại và sở hữu. DB lỗi trả lỗi dịch vụ. JWT dùng issuer `soundwave-api`, audience `soundwave-web` và một khóa 32 byte riêng với secret OTP. Đổi khóa local theo thứ tự dừng backend, thu hồi mọi phiên trong PostgreSQL, thay khóa rồi khởi động lại. User đăng nhập lại. [Biến môi trường](../development/local-setup.md).

| Sự kiện | Hành vi CONFIRMED |
| --- | --- |
| Login | Email đã xác minh, user hoạt động, mật khẩu đúng → tạo phiên và cookie |
| Logout | Thu hồi phiên hiện tại, các phiên khác giữ nguyên; xóa cookie; 204 không body |
| Khóa user | Chặn login, thu hồi toàn bộ phiên |
| Mở khóa | Cần login lại, phiên cũ không sống lại |
| Đổi/reset mật khẩu | Đổi hash, thu hồi tất cả phiên kể cả hiện tại, login lại |
| Approve Creator | Phiên vẫn hợp lệ, quyền mới lấy từ DB ở request tiếp theo |
| Hết hạn/thu hồi | Protected request trả 401 |
| Backend restart | Phiên chưa hết hạn/thu hồi còn hiệu lực trong DB |

Thu hồi có hiệu lực với request mới sau khi giao dịch hoàn tất.

<a id="auth-transaction-order"></a>

### Thứ tự khóa giao dịch auth

- Login, khóa tài khoản và đổi/reset mật khẩu lấy khóa hàng `users` trước khi cập nhật OTP hoặc phiên. Login tính scrypt trước khi lấy khóa. Sau khi lấy khóa, kiểm tra lại hash và trạng thái tài khoản trước khi cấp phiên.
- Verify và reset OTP lấy khóa `users` rồi tới `otp_challenges`. Lần sai thứ ba tăng bộ đếm và vô hiệu hóa mã cùng lúc. Reset thành công đánh dấu mã đã dùng, đổi hash và thu hồi mọi phiên trong cùng transaction.
- Xác minh và gửi lại OTP đăng ký kiểm tra mật khẩu của lần đăng ký hiện tại. Giao dịch kiểm lại trạng thái tài khoản và hash hiện tại khi giữ khóa hàng user. Chỉ tính lần sai OTP khi mật khẩu đúng và OTP được đem đối chiếu cho kết quả sai. Xác minh thành công đánh dấu mã đã dùng và ghi `email_verified_at` cùng nhau. Khi đăng ký lại đủ 24 giờ, cập nhật tên/hash và thay mã trong cùng transaction trên user chưa xác minh.
- Phiên và JWT cùng lấy hạn tuyệt đối 24 giờ từ mốc tạo phiên. CSRF token ngẫu nhiên 32 byte được lưu cùng phiên và giữ ổn định để các tab dùng chung.

[Schema khởi tạo](data-model.md#initial-auth-schema), [DEC-022](../decisions/open-decisions.md#dec-022).

## Cookie và CSRF

Cookie **soundwave_session** dùng HttpOnly/SameSite=Lax/path=/ và tắt Secure cho HTTP local. JWT chỉ truyền qua cookie phiên. Dùng cùng origin qua `/api` nếu có proxy phát triển. Cookie Domain thuộc DEC-017.

Protected request ghi gửi **X-CSRF-Token** lấy qua [API-39 GET /api/auth/csrf](../api/auth.md#api-39). Token ổn định trong phiên, trả dạng base64url với `Cache-Control: no-store`. Phiên thiếu, hết hạn hoặc đã thu hồi trả `401`. Auth trước login nhận JSON và kiểm tra Origin. Origin thiếu/sai, phạm vi public mutation và lỗi CSRF ở request ghi còn DEC-017. Guest vẫn truy cập audio public theo trạng thái track.

Guest đếm lượt dùng UUID trong cookie ký HMAC-SHA256 bằng khóa riêng với JWT và OTP. Tên, thuộc tính và thời hạn cookie thuộc DEC-017.

<a id="upload-kiem-tra-file-va-duration"></a>

## Upload, kiểm tra file và duration

Bổ sung CONFIRMED theo [DEC-009](../decisions/open-decisions.md#dec-009), [DEC-011](../decisions/open-decisions.md#dec-011) và [ADR-0004](../decisions/adr-0004-audio-contract-and-file-lifecycle.md). MP3 ≤30 MiB (31.457.280 byte), cover JPG/PNG ≤5 MiB (5.242.880 byte). Chưa cho thay audio; sửa metadata/cover qua API-10.

- Audio kiểm tra dung lượng, đuôi MP3, định dạng/codec MP3 bằng ffprobe; FFmpeg giải mã kiểm tra toàn bộ file. Không chỉ tin tên file hoặc Content-Type client.
- Sharp đọc và mã hóa lại JPG/PNG. Giới hạn đầu vào 4.096 px mỗi cạnh và 16 triệu pixel; đầu ra tối đa 1.024 px cạnh dài. Cách mã hóa cụ thể và MIME khai báo bất nhất thuộc DEC-017.
- Server sinh tên UUID và ghi file dưới vùng quản lý của backend. Ở mốc upload, dùng Multer 2.5.0, Sharp 0.35.5, FFmpeg/ffprobe 8.1.3. Tối đa hai tác vụ upload hoặc thay cover đồng thời; timeout ffprobe 5 giây, FFmpeg 120 giây và Sharp 15 giây xử lý ảnh.
- Duration do ffprobe đọc phải hữu hạn và >0, lưu số nguyên giây **làm tròn lên**: 243,7 → 244. Client không gửi/sửa duration. Làm tròn tăng dưới một giây không bảo đảm sai số phép đọc; phải kiểm chứng CBR/VBR và file lỗi ở TC-08/09.
- File không hợp lệ trả 400; vượt dung lượng trả 413 và dọn vùng tạm. Mã lỗi validation, timeout và lỗi công cụ cụ thể thuộc DEC-017.

[ADR-0010](../decisions/adr-0010-local-runtime-scope.md) chọn filesystem của máy chạy backend. Đường dẫn cấu hình được, vùng tạm và chính thức cùng filesystem. Audio phục vụ qua API kiểm trạng thái; online và backup/restore thuộc hướng mở rộng.

<a id="file-lifecycle"></a>

## Vòng đời file và database đã chọn

Thứ tự upload:

1. Kiểm tra phiên, quyền và CSRF trước xử lý file.
2. Ghi file vào vùng tạm riêng cho thao tác, kiểm tra metadata/file/cover và duration.
3. Mở transaction PostgreSQL, kiểm tra lại quyền/trạng thái liên quan.
4. Chuyển file hợp lệ sang vị trí chính thức cùng filesystem bằng tên UUID mới.
5. Ghi track và COMMIT; chỉ sau commit thành công trả 201.

Filesystem không cùng transaction PostgreSQL. Khi chắc chắn rollback: dọn file mới; không để bản ghi thành công trỏ file chưa sẵn sàng. Nếu mất kết nối lúc COMMIT và chưa rõ đã ghi DB hay chưa: giữ file, đối chiếu DB khi truy cập lại rồi mới quyết định dọn; không suy ra rollback từ lỗi kết nối. DB commit rồi response mất cũng không được xóa file như rollback. Wire retry upload và cơ chế nhận biết/đối chiếu thao tác còn DEC-017/DEC-022; chưa tự tạo bảng journal/queue hoặc cam kết retry không tạo trùng.

Dọn rác lúc khởi động và mỗi **30 phút**:

- Chỉ xét file đã **quá 24 giờ**, thuộc nhóm file tạm hoặc file không được tham chiếu. Điều kiện tuổi áp dụng cho cả hai nhóm.
- Bỏ qua thao tác đang chạy; kiểm tra tham chiếu DB bao gồm track soft delete và các tham chiếu ảnh dùng chung.
- DB không truy cập được hoặc kết quả commit chưa xác minh thì hoãn dọn. Không tự xóa audio soft delete, ảnh mặc định hoặc file còn tham chiếu.

Cơ chế khóa/ghi nhận thao tác, tránh race scan–delete và danh sách dọn file cần thiết kế tại DEC-022. Điều kiện tuổi và kiểm tra thao tác đang chạy đều áp dụng.

Thay cover: kiểm tra/lưu ảnh mới bằng tên mới → khóa hàng track trong transaction → cập nhật đường dẫn và COMMIT → sau commit mới đưa ảnh cũ vào danh sách dọn theo điều kiện trên. Rollback giữ ảnh cũ, dọn ảnh mới khi đã xác minh không được commit/tham chiếu. Hai lần thay cover cạnh tranh phải tôn trọng khóa hàng, không xóa ảnh cuối đang dùng. Không đổi tên/ghi đè ảnh đang được dùng để tránh mất ảnh cũ khi lỗi. Chi tiết remove cover/null còn DEC-017; đường dẫn ảnh phục vụ chưa được cấp endpoint mới.

## Truy cập audio và gỡ nội dung

[API-28 GET](../api/tracks.md#api-28) và [API-29 HEAD](../api/tracks.md#api-29) /api/tracks/:id/audio public theo trạng thái: track chưa gỡ, chủ không khóa. Mỗi request mới kiểm tra DB rồi mở file. Metadata dùng audioUrl tương đối tới endpoint; storage path chỉ nội bộ, không trả cho client. SQL audio_file_path hiện có chưa đổi; JSON cũ /uploads/audio không là URL công khai được chấp nhận.

GET full 200, single Range 206, ngoài file 416, cú pháp sai 400, multi-range bỏ qua/trả full 200; HEAD bỏ qua Range, không body cả lỗi. Audio dùng Cache-Control no-store, không cấp bản sao cache cho request sau. Header, error code và body do API-28/29 sở hữu. File mất/không đọc được 503 MEDIA_UNAVAILABLE; DB lỗi 503 SERVICE_UNAVAILABLE; track không có/gỡ/chủ khóa 404 TRACK_NOT_AVAILABLE. Lỗi trước stream dùng envelope JSON trừ HEAD; lỗi giữa stream đóng stream và ghi log, không chèn JSON vào audio.

Sau commit gỡ/khóa từ chối request mới, request đã bắt đầu được hoàn tất. Không hứa thu hồi byte/buffer đã tải; no-store làm tăng tải khi tua/nghe lại. Soft delete giữ file, mở khóa chỉ hiện track chưa gỡ riêng. Conditional HTTP (If-Range/validator), Range unit khác bytes và chính sách ảnh chưa có quyết định chi tiết ở DEC-017; không tự thêm cache validator hoặc route cover.

## Bằng chứng cần có

TC-02/TC-04: email thật, OTP dùng lại/sai/hết hạn/gửi lại, lỗi provider; TC-05: cookie/CSRF, thu hồi từng/tất cả phiên, restart và DB lỗi; TC-09: file giả, duration/CBR/VBR, file–DB lỗi, COMMIT không rõ và dọn rác; TC-11: cover cạnh tranh/rollback; TC-17: HTTP trực tiếp/HEAD/Range/cache sau gỡ/khóa; TC-18: quyền trước/sau review. Các scenario tại [acceptance](../testing/acceptance.md) đều NOT_RUN; thiếu expected wire thì báo BLOCKED khi thực thi, không tự chọn đáp án.
