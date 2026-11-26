# Sổ quyết định và phần còn mở

Cập nhật ngày **22/11/2026**, Asia/Saigon. Giữ đường dẫn `open-decisions.md` và mã DEC cũ để không phá liên kết.

<a id="evidence-2026-11-17"></a>

## Nguồn xác nhận ngày 17/11/2026

Người xác nhận: **người dùng trong phiên làm việc**; không suy ra tên thật hoặc vai trò trong nhóm. Bằng chứng là chuỗi yêu cầu trong cuộc trò chuyện:

- “khi đăng kí tài khoản cần gửi opt về email để xác thực. phải sẵn sàng đưa lên online chứ không chỉ chạy được trên local”.
- “nơi lưu nhạc và postcat vẫn để ở trên local”. Khi online, local được hiểu là filesystem máy chủ backend.
- “tất cả những đề xuất còn lại đều được chấp nhận. nhưng chưa cập nhật docs”.
- Sau đề xuất JWT + phiên PostgreSQL, cookie bảo vệ và chưa có refresh token: “tôi chấp nhận đề xuất này. hãy lên kế hoạch để cập nhật docs”.
- Khi chọn độ sâu: “Đồng bộ đã chốt”; sau kế hoạch cập nhật: “Please implement the plan.”

Đợt này đồng bộ quyết định đã xác nhận, không tự hoàn tất mọi chi tiết hợp đồng. `OPEN` có thể chứa **phần đã chấp nhận** và câu hỏi cụ thể còn thiếu; không có nhãn PARTIAL mới. `ACCEPTED` chỉ áp dụng phạm vi được ghi, không chứng minh mã đã có hoặc test PASS. Bối cảnh cũ bên dưới là lịch sử trước xác nhận, không phải chỉ dẫn hiện hành. Quy trình tại [README](README.md).

<a id="evidence-media-2026-11-17"></a>

## Xác nhận bổ sung media ngày 17/11/2026

Người xác nhận: **người dùng trong phiên làm việc**. Sau phần giải thích DEC-009/DEC-011, người dùng yêu cầu đề xuất và xác nhận: “tôi chấp nhận đề xuất, hãy cập nhật docs”. Phạm vi chấp nhận gồm GET/HEAD audio, Range/status/header, no-store và lỗi, audioUrl thay storage path; ffprobe/FFmpeg/Sharp, UUID, duration làm tròn lên; upload file trước COMMIT, xử lý kết quả commit không rõ, dọn rác và thay cover. Kết quả được ghi tại DEC-009/DEC-011 và [ADR-0004](adr-0004-audio-contract-and-file-lifecycle.md). Chi tiết ngoài đề xuất vẫn OPEN; không sửa xác nhận hoặc kết quả kiểm tra đợt trước.

<a id="evidence-simple-2026-11-17"></a>

## Xác nhận phương án backend đơn giản ngày 17/11/2026

Người xác nhận: **người dùng trong phiên làm việc**, Asia/Saigon. Sau đề xuất chín nhóm DEC-003/005/010/012/014/017/019/021/022, người dùng xác nhận: “tôi chập nhận những đề xuất này. hãy cập nhật docs”. Chấp nhận công cụ, scrypt/HS256, Resend/OTP, API bổ sung, cookie/CSRF/validation, mô hình đích, lượt nghe, search_text, reorder hiển thị và giới hạn plain text. Không mở rộng sang hosting, protocol nghiệm thu, versions/limits media hoặc schema/wire chưa nêu.

Reorder **thay thế** quy tắc trước về gửi mọi ID liên kết: nay chỉ gửi toàn bộ ID đang hiển thị, giữ liên kết ẩn ở cuối. DEC-010/012/019/021 giải quyết phạm vi. Tại mốc này có **14 ACCEPTED, 8 OPEN**; DEC-003/005/014/017/022 còn chi tiết mở. [ADR-0005](adr-0005-simple-backend-contracts.md), [kế hoạch](../plans/2026-11-17-simple-backend-decisions.md), [bằng chứng](../project/status.md#simple-sync-2026-11-17).

<a id="evidence-bootstrap-auth-2026-11-18"></a>

## Xác nhận bootstrap và schema tài khoản ngày 18/11/2026

Người dùng trong phiên xác nhận: “tôi chấp nhận những đề xuất này của bạn, hãy cập nhật vào docs”. Xác nhận bao gồm baseline runtime, cấu hình và lệnh local/migrate/test, chính sách khóa JWT và định dạng hash, migration đầu tiên cho ba bảng tài khoản, thứ tự khóa và xử lý kết quả gửi OTP. [ADR-0006](adr-0006-bootstrap-and-account-schema.md), [kế hoạch cập nhật](../plans/2026-11-18-backend-bootstrap-decisions.md).

Tại mốc này, DEC-003/014/022 còn `OPEN` ở các phần ghi riêng. Ngưỡng/phạm vi IP, đăng ký lại, wire HTTP, chi tiết schema các luồng sau, media, hosting và backup tiếp tục được quản lý tại DEC tương ứng.

<a id="evidence-registration-otp-2026-11-21"></a>

## Xác nhận OTP đăng ký ngày 21/11/2026

Người dùng trong phiên trả lời “quyết định như vậy đi” khi trích phương án chi tiết cho API-01/30/31. Phương án được xác nhận yêu cầu mật khẩu của lần đăng ký hiện tại khi xác minh và gửi lại, có nhánh bắt đầu lại sau 24 giờ, giới hạn gửi theo IP và thời gian chờ 15 giây với `reserved`. [ADR-0008](adr-0008-registration-otp.md), [kế hoạch đồng bộ](../plans/2026-11-21-registration-otp-decisions.md).

<a id="evidence-password-reset-otp-2026-11-21"></a>

## Xác nhận OTP khôi phục mật khẩu ngày 21/11/2026

Người dùng trong phiên trả lời “tôi chấp nhận đề xuất này, hãy cập nhật dóc” cho phương án DEC-003. Phạm vi xác nhận gồm hợp đồng chính API-32/33, bảo vệ thông tin tài khoản trong phản hồi, hạn mức reset tách khỏi đăng ký, nơi lưu lượt yêu cầu theo IP, vòng đời mã reset, lỗi sai mật khẩu ở API-30/31, phản hồi `reserved` ở API-30 và lịch dọn dữ liệu. [ADR-0009](adr-0009-password-reset-otp.md), [kế hoạch đồng bộ](../plans/2026-11-21-password-reset-otp-decisions.md).

<a id="evidence-api-contracts-2026-11-22"></a>

## Xác nhận hợp đồng API ngày 22/11/2026

Người dùng trong phiên trả lời “tôi chấp nhận phương án này, hãy cập nhật docs” cho đề xuất DEC-005 về JSON, status, validation và lỗi của API Auth/CSRF, Creator và playlist. Phạm vi và các tài liệu sở hữu được ghi tại [DEC-005](#dec-005). [Kế hoạch đồng bộ](../plans/2026-11-22-api-contract-decisions.md).

<a id="evidence-local-runtime-2026-11-22"></a>

## Xác nhận phạm vi local ngày 22/11/2026

Người dùng xác nhận dự án chạy local, chuyển triển khai online, backup/restore và hạn mức OTP theo IP sang hướng mở rộng tương lai, rồi trả lời “tôi chấp nhận những đề xuất này” cho phương án DEC-014 đã điều chỉnh. Xác nhận gồm nền tảng Windows/PowerShell, giới hạn OTP theo email, định dạng hash, thay khóa JWT local, ký cookie Guest, công cụ/giới hạn media, migration cho phép `request_ip` nhận `NULL` và nghiệm thu local. [ADR-0010](adr-0010-local-runtime-scope.md), [kế hoạch](../plans/2026-11-22-local-runtime-decisions.md).

## Danh mục

| Mã | Vấn đề | Trạng thái hiện tại |
| --- | --- | --- |
| [DEC-001](#dec-001) | Phạm vi và ưu tiên use case | `ACCEPTED` |
| [DEC-002](#dec-002) | Thời điểm đăng ký Creator | `ACCEPTED` |
| [DEC-003](#dec-003) | OTP và khôi phục mật khẩu | `ACCEPTED` |
| [DEC-004](#dec-004) | Đường dẫn và method API | `ACCEPTED` |
| [DEC-005](#dec-005) | Chức năng thiếu hợp đồng API | `ACCEPTED` |
| [DEC-006](#dec-006) | Vòng đời JWT và thay đổi quyền | `ACCEPTED` |
| [DEC-007](#dec-007) | Dữ liệu hồ sơ Creator | `ACCEPTED` |
| [DEC-008](#dec-008) | Nơi lưu media | `ACCEPTED` |
| [DEC-009](#dec-009) | Phục vụ và vòng đời file media | `ACCEPTED` |
| [DEC-010](#dec-010) | Ghi nhận lượt nghe | `ACCEPTED` |
| [DEC-011](#dec-011) | Duration và thay file tác phẩm | `ACCEPTED` |
| [DEC-012](#dec-012) | Ngữ nghĩa tìm kiếm tiếng Việt | `ACCEPTED` |
| [DEC-013](#dec-013) | Hệ quản trị và phiên bản database | `ACCEPTED` |
| [DEC-014](#dec-014) | Toolchain backend và database | `ACCEPTED` |
| [DEC-015](#dec-015) | Điều kiện đo chất lượng | `OPEN` |
| [DEC-016](#dec-016) | Kế hoạch và quản trị dự án | `OPEN` |
| [DEC-017](#dec-017) | Quy ước hợp đồng HTTP | `OPEN` |
| [DEC-018](#dec-018) | Quyền Admin và nội dung của tài khoản bị khóa | `ACCEPTED` |
| [DEC-019](#dec-019) | Thứ tự và cập nhật playlist | `ACCEPTED` |
| [DEC-020](#dec-020) | Bộ dữ liệu demo và media | `OPEN` |
| [DEC-021](#dec-021) | Định dạng lyrics và show notes | `ACCEPTED` |
| [DEC-022](#dec-022) | Ràng buộc schema đích | `OPEN` |

<a id="dec-001"></a>

## DEC-001 Phạm vi và ưu tiên use case

Trạng thái: `ACCEPTED`. Xác nhận: người dùng trong phiên làm việc, 17/11/2026; [bằng chứng](#evidence-2026-11-17).

### Kết quả đã xác nhận

Cam kết MVP tài khoản → duyệt Creator → upload → tìm/nghe → playlist → quản trị. Trending/mới phát hành là truy vấn sắp xếp dữ liệu; UC06 trả lyrics/show notes plain text. Lyrics đồng bộ thời gian, restore track/playlist và thay audio ngoài MVP; điều khiển nghe nâng cao chưa là cam kết backend. Giữ danh mục 12 UC với mức cam kết trên.

### Phần còn thiếu và giới hạn

Không còn câu hỏi về lựa chọn phạm vi này; lịch và người nghiệm thu thuộc DEC-016.

### Bối cảnh trước xác nhận — lịch sử 11/11/2026

Một mô tả ràng buộc chốt theo 11 UC; danh mục nghiệp vụ có UC01–UC12. UC04 được phân loại Must-Have, Must/Should và Should-Have ở các mô tả khác nhau. Nhóm Should-Have có cách đếm ba hoặc bốn tính năng, khác cách gom lyrics và podcast controls.

Cần chốt danh mục nghiệm thu, ưu tiên từng yêu cầu và phần Should-Have thực sự cam kết. Ảnh hưởng: toàn bộ [use case](../requirements/use-cases.md), [quản lý](../project/management.md), [nghiệm thu](../testing/acceptance.md). Giữ đủ 12 UC để không thất lạc yêu cầu; điều đó không tự chốt cả 12 vào phạm vi nghiệm thu. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-002"></a>

## DEC-002 Thời điểm đăng ký Creator

Trạng thái: `ACCEPTED`. Xác nhận: người dùng trong phiên làm việc, 17/11/2026; [bằng chứng](#evidence-2026-11-17).

### Kết quả đã xác nhận

Tạo Listener trước, xác minh email rồi đăng nhập để nộp hồ sơ Creator riêng. Không nhận isCreator/channelName/bio trong nghiệp vụ tạo tài khoản. Gửi lại sau rejected; không có hai hồ sơ pending cho một user.

### Phần còn thiếu và giới hạn

Wire contract hồ sơ tại DEC-005; mô hình lưu tại DEC-007/DEC-022.

### Bối cảnh trước xác nhận — lịch sử 11/11/2026

Phương án A nhận `isCreator`, `channelName`, `bio` ngay khi tạo tài khoản và đặt `pending`. Phương án B tạo Listener trước, sau đó người đã đăng nhập nộp hồ sơ Creator riêng. Không tự cung cấp cả hai luồng để tránh việc phải quyết định.

Cần xác nhận luồng, điều kiện nộp lại và tác động tới đăng ký tài khoản. Ảnh hưởng: UC01/UC12, BR-002, API-01/API-24/API-25, `users`. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-003"></a>

## DEC-003 OTP và khôi phục mật khẩu

Trạng thái: `ACCEPTED`. Phạm vi hiện hành theo [xác nhận local ngày 22/11/2026](#evidence-local-runtime-2026-11-22).

### Kết quả hiện hành đã xác nhận

Local áp tối đa năm lượt cấp mã đã ghi/email/giờ, giãn ít nhất 60 giây; đăng ký và gửi lại dùng chung bộ đếm, reset dùng bộ đếm riêng. API-01/31 chạm hạn mức email trả `429 RATE_LIMITED` kèm `Retry-After`. API-32 trả phản hồi chung `202` với mọi email hợp lệ về cú pháp, kể cả khi chạm hạn mức email hoặc Resend lỗi. Hạn mức IP và việc dọn bản ghi đếm IP thuộc hướng mở rộng tương lai. Lịch dọn lịch sử OTP mỗi giờ với thời hạn giữ bảy ngày vẫn áp dụng. Chi tiết legacy và các quy tắc vòng đời còn hiệu lực được lưu ở mốc 21/11 bên dưới; khi đọc hợp đồng local dùng [API Auth](../api/auth.md) và [vòng đời OTP](../architecture/security-and-media.md#otp-delivery).

### Chính sách và xác nhận đến 21/11/2026

Resend HTTPS qua fetch backend, cần tài khoản/API key/domain gửi xác minh, chưa thiết lập. Đăng ký tạo user email_verified_at NULL, chưa login. OTP sáu số/năm phút/một lần/ba sai; resend sau 60 giây hủy cũ. Digest HMAC/secret riêng, số lần sai/thời hạn lưu PostgreSQL. Tại mốc này chọn tối đa 5 lần gửi/email/giờ và thêm IP limit. Mail lỗi giữ user chưa xác minh, báo tạm thời/cho resend/không tạo user trùng. Reset chỉ user đã xác minh/chưa khóa; yêu cầu reset phản hồi chung không tiết lộ email tồn tại; verify/reset không tự login.

Ngày 18/11/2026 đã chốt ghi lượt gửi và mã trước, gọi Resend sau commit. Lượt đã ghi tính vào hạn mức. Các trạng thái là `reserved`, `accepted`, `failed`, `unknown`. Lỗi xác định vô hiệu hóa mã. Kết quả chưa rõ giữ mã đủ điều kiện xác minh cho đến khi hết hạn hoặc bị thay. [Xác nhận](#evidence-bootstrap-auth-2026-11-18), [vòng đời OTP](../architecture/security-and-media.md#otp-delivery).

Ngày 21/11/2026 chốt cho OTP đăng ký:

- Tối đa 20 lượt đã ghi/IP/cửa sổ trượt một giờ, tính chung đăng ký và gửi lại. Khóa theo IP trong transaction PostgreSQL để kiểm và ghi lượt gửi nguyên tử giữa nhiều tài khoản. Giữ 5 lượt/email/giờ, khoảng cách 60 giây và tính cả lượt gửi lỗi. Giữ lịch sử OTP đăng ký bảy ngày trước khi dọn.
- Gọi Resend với timeout năm giây. Với `reserved` còn hiệu lực, yêu cầu xác minh trong 15 giây đầu được báo thử lại và giữ nguyên số lần sai. Từ 15 giây kể từ khi ghi mã, lần xác minh có thể chuyển mã sang `unknown` trong transaction rồi kiểm mã. Mã `unknown` giữ thời hạn ban đầu.
- Email đã xác minh trả `409`. Email chưa xác minh trả `409` và hướng sang gửi lại. Sau 24 giờ kể từ lượt cấp mã gần nhất, cho phép đăng ký lại trên cùng user chưa xác minh, cập nhật tên và hash mật khẩu, vô hiệu hóa mã cũ còn hiệu lực và cấp mã mới trong cùng transaction. Điều kiện hạn mức vẫn áp dụng.
- Xác minh và gửi lại yêu cầu mật khẩu của lần đăng ký hiện tại. Xác minh thành công đánh dấu mã đã dùng và xác minh email trong cùng transaction, sau đó đăng nhập riêng. Lựa chọn này gắn OTP với lần đăng ký có mật khẩu mà người dùng biết. [Hợp đồng Auth](../api/auth.md#api-30).

### Xác nhận bổ sung cho OTP reset và OTP đăng ký ngày 21/11/2026

- API-32 nhận `{email}`. Sau khi qua kiểm tra cú pháp và hạn mức IP, trả cùng `202` và nội dung chung cho mọi trạng thái tài khoản, hạn mức theo email và kết quả gửi, kể cả khi Resend lỗi hoặc timeout. Thời gian phản hồi phải tương đương giữa các nhánh. Chỉ cấp mã cho tài khoản đã xác minh và chưa khóa.
- Reset dùng hạn mức riêng. Mỗi email có tối đa năm lượt cấp mã đã ghi mỗi giờ, cách nhau ít nhất 60 giây. Mỗi IP có tối đa 20 yêu cầu hợp lệ về cú pháp trong cửa sổ trượt một giờ, đếm trước khi tra tài khoản. Vượt hạn mức IP trả `429 RATE_LIMITED` kèm `Retry-After`. Lượt cấp mã lưu trong `otp_challenges`; lượt yêu cầu theo IP lưu riêng trong PostgreSQL, chỉ gồm IP và thời điểm.
- Mã reset có sáu chữ số, hạn năm phút, dùng một lần và vô hiệu hóa ở lần sai thứ ba. Cấp mã mới vô hiệu hóa mã cũ. Gọi Resend sau commit với timeout năm giây. Lỗi xác định vô hiệu hóa mã; kết quả chưa rõ giữ mã đến hạn. Với mã còn hiệu lực ở trạng thái `reserved`, trong 15 giây đầu yêu cầu thử lại, giữ nguyên số lần sai. Từ mốc 15 giây, có thể chuyển sang `unknown` trong transaction rồi kiểm mã với hạn ban đầu.
- API-33 trả `204` khi đổi mật khẩu, đánh dấu mã đã dùng và thu hồi mọi phiên thành công trong cùng transaction. Tài khoản không đủ điều kiện hoặc mã sai, hết hạn, đã dùng, bị thay hay còn chờ gửi trong 15 giây đầu cùng trả `400 VALIDATION_ERROR`. Người dùng đăng nhập riêng bằng mật khẩu mới.
- API-30/31 sai mật khẩu trả `400 VALIDATION_ERROR`. API-30 chỉ tăng số lần sai OTP khi mật khẩu đúng và việc đối chiếu xác định mã sai. Với mã còn hiệu lực ở trạng thái `reserved` trong 15 giây đầu, API-30 trả `409 CONFLICT` kèm `error.details.retryAfterSeconds`.
- Mỗi giờ dọn lịch sử OTP đăng ký và reset đã quá bảy ngày, cùng các bản ghi hạn mức IP reset đã ra khỏi cửa sổ một giờ.

[Hợp đồng Auth](../api/auth.md#api-30), [vòng đời OTP](../architecture/security-and-media.md#otp-delivery), [ADR-0009](adr-0009-password-reset-otp.md).

### Phụ thuộc còn lại

[DEC-005](#dec-005) bổ sung JSON và các lỗi chính ngày 22/11. DEC-017 quản lý lỗi HTTP ngoài phần đã chốt. DEC-022 ghi thay đổi DDL cần triển khai để local lưu OTP mà không ghi IP.

### Trước lần chấp nhận phương án đơn giản — lịch sử giữ nguyên

Trạng thái: `OPEN`. Xác nhận: người dùng trong phiên làm việc, 17/11/2026; [bằng chứng](#evidence-2026-11-17).

#### Kết quả đã xác nhận

Đăng ký bắt buộc gửi OTP qua email thật để xác minh; không dùng console thay email. OTP sáu số, hạn năm phút, một lần sử dụng, tối đa ba lần sai; gửi lại sau 60 giây và hủy mã cũ. Reset mật khẩu cũng cần email thật để phù hợp yêu cầu online. Chưa tự cấp phiên sau xác minh.

#### Phần còn thiếu và giới hạn

Cần chốt nhà cung cấp/kênh email và cấu hình, vị trí lưu an toàn/chống thử vượt giới hạn, route/body/response gửi-xác minh-gửi lại và reset, trạng thái đăng ký dở dang, lỗi gửi email và reset user bị khóa. Chặn triển khai OTP/reset hoàn chỉnh; không chặn ghi các quy tắc đã chấp nhận.

#### Bối cảnh trước xác nhận — lịch sử 11/11/2026

Có yêu cầu OTP sáu chữ số, mô phỏng tại console, hạn năm phút; mô tả khác không có OTP trong body đăng ký. Có quy tắc hủy sau ba lần sai và lựa chọn RAM/Redis, nhưng chưa có hợp đồng đầy đủ cho gửi/xác minh OTP hoặc reset mật khẩu.

Cần chốt trường request/response, mục đích mã, lưu trữ, dùng một lần, gửi lại, số lần thử, xử lý tài khoản bị khóa và tác động reset tới token. Không thêm Redis, bảng OTP hoặc route chỉ từ các ví dụ. Ảnh hưởng: UC01/UC02, BR-003, API-01/API-02, NFR-002, TC-02/TC-04. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-004"></a>

## DEC-004 Đường dẫn và method API

Trạng thái: `ACCEPTED`. Xác nhận: người dùng trong phiên làm việc, 17/11/2026; [bằng chứng](#evidence-2026-11-17).

### Kết quả đã xác nhận

Chọn POST /api/tracks, POST /api/tracks/:id/play, GET /api/tracks/my-uploads và GET /api/tracks?sort=newest. Một route cho mỗi nghiệp vụ; không thêm alias các phương án cũ.

### Phần còn thiếu và giới hạn

Không còn câu hỏi về bốn lựa chọn route này; wire bổ sung ở DEC-005/DEC-009.

### Bối cảnh trước xác nhận — lịch sử 11/11/2026

| Nghiệp vụ | Phương án A | Phương án B |
| --- | --- | --- |
| Upload | `POST /api/tracks` | `POST /api/tracks/upload` |
| Ghi lượt nghe | `POST /api/tracks/:id/play` | `PATCH /api/tracks/:id/play-count` |
| Tác phẩm của tôi | `GET /api/tracks/creator/my-tracks` | `GET /api/tracks/my-uploads` |
| Mới phát hành | `GET /api/tracks?sort=newest` | `GET /api/tracks/new-releases` |

Cần chốt route/method và có thật sự cần endpoint riêng hay không; chưa quyết định alias tương thích. Ảnh hưởng: UC03/UC05/UC08/UC09, API-05/API-08/API-09/API-12, hợp đồng và kiểm thử. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-005"></a>

## DEC-005 Chức năng thiếu hợp đồng API

Trạng thái: `ACCEPTED`. Người dùng trong phiên xác nhận ngày **22/11/2026**. [Bằng chứng](#evidence-api-contracts-2026-11-22).

### Kết quả hiện hành đã xác nhận

Ngày 17/11/2026 chọn POST /api/auth/verify-email, POST /api/auth/resend-verification, POST /api/auth/forgot-password, POST /api/auth/reset-password, POST /api/auth/change-password; POST /api/creator-applications, GET /api/creator-applications/me, PATCH /api/creator/channel, PATCH /api/playlists/:id/order; GET /api/auth/csrf theo DEC-017. Verify ban đầu là {email,otp}, được cập nhật dưới đây. Reset {email,otp,newPassword}, đổi {currentPassword,newPassword}, reorder {trackIds:[...]}. API-25 dùng application ID. Rejected nộp POST hồ sơ mới, không thêm route resend hồ sơ. Cấp API-30–39 cho mười method/path tại API index; chưa coi đủ mọi wire.

Ngày 21/11/2026, API-30 chuyển từ `{email,otp}` sang `{email,otp,password}` và API-31 nhận `{email,password}`. API-01 giữ `{username,email,password}`. Mật khẩu ở API-30/31 phải khớp lần đăng ký hiện tại. [Hợp đồng Auth](../api/auth.md#api-30).

### Xác nhận bổ sung ngày 22/11/2026

- Auth dùng `data.emailVerified` cho API-01/30/31 và `error.details.nextAction` cho nhánh đăng ký trùng cần gửi lại. API-32 trả cùng thông báo chung với `data: null`; API-33 giữ hành vi của DEC-003. API-34 trả `204` và xóa cookie khi thành công, sai mật khẩu hiện tại trả `400 VALIDATION_ERROR`. API-39 trả `data.csrfToken` dạng base64url, `Cache-Control: no-store` và `401 UNAUTHENTICATED` khi thiếu phiên hợp lệ. [Auth API](../api/auth.md).
- Creator dùng `applicationId` và `submittedAt` xuyên suốt các API liên quan. Chốt body, giới hạn, nullability và response của API-35/36/37; danh sách chờ ưu tiên hồ sơ cũ nhất; review từ chối yêu cầu `rejectionReason` và dùng `404` cho hồ sơ không tồn tại, `409` cho hồ sơ đã xử lý. [API Creator](../api/creator-applications.md), [API-24/25](../api/admin.md#api-24).
- Playlist trả thứ tự hiển thị ở API-38, dùng `400` cho mảng sai kiểu hoặc trùng ID và `409` cho tập ID khác tập đang hiển thị. API-20 trả `201` khi thêm mới, `200` khi thêm lại track đang hiển thị, và `404` khi track không khả dụng. API-21 trả `204` cả khi liên kết đã vắng sau khi kiểm tra playlist và quyền sở hữu. [API-20/21](../api/playlists.md#api-20), [API-38](../api/playlists.md#api-38).

### Phụ thuộc còn lại

Các quy tắc HTTP dùng chung và lỗi ngoài phần đã chốt thuộc DEC-017. Giao dịch cạnh tranh ở Creator và playlist thuộc DEC-022. Phiên này xác nhận đặc tả trong Markdown; hiện trạng route và kiểm chứng được ghi tại [status](../project/status.md#api-contract-decisions-2026-11-22).

### Trước lần chấp nhận phương án đơn giản — lịch sử giữ nguyên

Trạng thái: `OPEN`. Xác nhận: người dùng trong phiên làm việc, 17/11/2026; [bằng chứng](#evidence-2026-11-17).

#### Kết quả đã xác nhận

Bổ sung nghiệp vụ xác minh/gửi lại OTP, reset/đổi mật khẩu, nộp/xem/gửi lại hồ sơ Creator, sửa thông tin kênh đã duyệt và reorder playlist. Dùng /api/auth/me cho user hiện tại; restore track/playlist ngoài MVP.

#### Phần còn thiếu và giới hạn

Cần chốt method/path, quyền, body, response và lỗi cho các hợp đồng bổ sung. Các nghiệp vụ trên chưa đủ wire nên chưa cấp API-ID; riêng audio đã được xác nhận và cấp API-28/29 theo DEC-009, danh mục nay có 29 API-ID.

#### Bối cảnh trước xác nhận — lịch sử 11/11/2026

Nhu cầu hồ sơ cá nhân có mô tả `GET /api/users/profile` bên cạnh `GET /api/auth/me`; có nộp hồ sơ `POST /api/users/creator-register`. Chưa xác định đầy đủ quyền, body và response cho các route mới. Sắp thứ tự playlist, gửi lại hồ sơ, khôi phục track và đổi mật khẩu khi đã đăng nhập cũng thiếu hợp đồng đầy đủ.

Cần chốt chức năng nào thuộc phạm vi và hợp đồng tương ứng trước khi thêm route. Không xem việc kiểm kê 27 endpoint là chứng minh đã bao phủ hết nghiệp vụ. Ảnh hưởng: UC02/UC07/UC11/UC12, API-04/API-17/API-25/API-27. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-006"></a>

## DEC-006 Vòng đời JWT và thay đổi quyền

Trạng thái: `ACCEPTED`. Xác nhận: người dùng trong phiên làm việc, 17/11/2026; [bằng chứng](#evidence-2026-11-17).

### Kết quả đã xác nhận

Chọn JWT + bảng auth_sessions trong PostgreSQL, thời hạn tuyệt đối 24 giờ, không gia hạn và chưa dùng refresh token. Cho nhiều phiên độc lập. Logout thu hồi phiên hiện tại; khóa tài khoản hoặc đổi/reset mật khẩu thu hồi toàn bộ phiên; mở khóa không khôi phục phiên cũ. Mỗi protected request kiểm tra phiên và user hiện tại, quyền lấy từ DB nên approve Creator có hiệu lực từ request kế tiếp. JWT chứa sub, sid, iat, exp, iss, aud; không cần email/role. Cookie HttpOnly, Secure, SameSite=Lax khi online và bảo vệ CSRF; frontend/API cùng origin khi triển khai. Phiên hết hạn/thu hồi trả 401; DB không khả dụng trả lỗi dịch vụ, không bỏ qua kiểm tra. Phiên còn hạn tồn tại qua backend restart. Hiệu lực thu hồi áp dụng cho request mới sau khi giao dịch hoàn tất.

### Phần còn thiếu và giới hạn

HS256, tên cookie và header CSRF đã chọn. Cấu hình/đổi khóa JWT và schema ba bảng tài khoản đã được bổ sung ngày 18/11 tại [DEC-014](#dec-014) và [DEC-022](#dec-022). Wire CSRF/Origin còn DEC-017. Xem [ADR phiên](adr-0001-authentication-and-sessions.md).

### Bối cảnh trước xác nhận — lịch sử 11/11/2026

JWT được mô tả có hạn 24 giờ, payload có cách gọi `userId` hoặc `id,email,role`. Logout có mô tả stateless chỉ xóa token ở bên sử dụng; khóa tài khoản lại yêu cầu thu hồi phiên ngay. Duyệt Creator yêu cầu quyền mới có hiệu lực ngay.

Cần xác nhận payload, lưu/thu hồi phiên, kiểm tra trạng thái người dùng, thay đổi quyền, logout, reset mật khẩu và token cũ sau mở khóa. Không tự thêm refresh token hoặc denylist. Ảnh hưởng: UC02/UC10/UC12, mọi protected API và TC-03/TC-05/TC-15/TC-18. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-007"></a>

## DEC-007 Dữ liệu hồ sơ Creator

Trạng thái: `ACCEPTED`. Xác nhận: người dùng trong phiên làm việc, 17/11/2026; [bằng chứng](#evidence-2026-11-17).

### Kết quả đã xác nhận

Bổ sung creator_applications để lưu tên kênh, giới thiệu, lĩnh vực, ngày gửi, trạng thái, người/ngày duyệt, lý do từ chối và lịch sử. Một hồ sơ pending/user; pending không sửa; sau rejected có thể nộp hồ sơ mới. Kênh đã duyệt được sửa tên/giới thiệu, không tự thay quyền.

### Phần còn thiếu và giới hạn

Schema khởi tạo lưu lịch sử và tách dữ liệu kênh hiện tại khỏi dữ liệu lúc nộp. Trạng thái suy từ hồ sơ mới nhất. [DEC-005](#dec-005) đã chốt hợp đồng Creator. Thứ tự khóa khi review còn DEC-022 và lỗi HTTP ngoài phần đã chốt còn DEC-017. [Mô hình dữ liệu](../architecture/data-model.md#target-model).

### Bối cảnh trước xác nhận — lịch sử 11/11/2026

Nhu cầu có lĩnh vực hoạt động, thời điểm gửi hồ sơ và lý do từ chối; schema chỉ có `creator_status`, `channel_name`, `bio`, `created_at` của tài khoản. Không dùng ngày tạo tài khoản làm ngày gửi hồ sơ khi chưa xác nhận. Lịch sử review và người duyệt chưa có mô hình.

Cần chốt dữ liệu lưu, mức độ cần lịch sử, gửi lại sau từ chối và thay đổi hồ sơ đã duyệt. Ảnh hưởng: UC12, `users`, API-24/API-25, BR-002, TC-18. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-008"></a>

## DEC-008 Nơi lưu media

Trạng thái: `ACCEPTED`. Xác nhận: người dùng trong phiên làm việc, 17/11/2026; [bằng chứng](#evidence-2026-11-17).

### Kết quả đã xác nhận

Nhạc/podcast lưu trên filesystem của máy chạy backend, qua đường dẫn cấu hình được. Bản hiện tại chạy local. OTP vẫn dùng email thật qua Resend khi demo. [Xác nhận phạm vi local](#evidence-local-runtime-2026-11-22).

### Phần còn thiếu và giới hạn

Yêu cầu online ở mốc 17/11 chuyển sang hướng mở rộng tương lai cùng backup/restore vận hành. Xem [ADR-0002](adr-0002-media-and-online-readiness.md) và [ADR-0010](adr-0010-local-runtime-scope.md).

### Bối cảnh trước xác nhận — lịch sử 11/11/2026

Có phương án lưu filesystem local và phương án Cloudinary/Supabase Storage gói miễn phí. Khung repo có `backend/uploads/audio` và `images`; sự tồn tại này không phê duyệt phương án local.

Cần xác nhận đích lưu, ràng buộc demo độc lập mạng, dung lượng và chi phí. Ảnh hưởng: UC08/UC09, `tracks`, BR-005, kiến trúc và thiết lập local. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-009"></a>

## DEC-009 Phục vụ và vòng đời file media

Trạng thái: `ACCEPTED`. Xác nhận: người dùng trong phiên làm việc, 17/11/2026; [ban đầu](#evidence-2026-11-17), [bổ sung media](#evidence-media-2026-11-17).

### Kết quả đã xác nhận

Giữ filesystem máy chủ, kiểm tra track/chủ trước request audio mới, Range/seek và soft delete giữ file. Chọn GET và HEAD /api/tracks/:id/audio (API-28/29); metadata dùng audioUrl, storage path chỉ nội bộ. GET toàn file 200, một Range hợp lệ 206, khoảng hợp lệ ngoài file 416 kèm Content-Range bytes */size, sai cú pháp 400; nhiều khoảng bỏ qua Range và trả toàn file 200. HEAD trả header không body. Audio dùng no-store; track không có/gỡ/chủ khóa trả 404 TRACK_NOT_AVAILABLE, file mất/không đọc được trả 503 MEDIA_UNAVAILABLE, DB lỗi 503 SERVICE_UNAVAILABLE. Lỗi trước stream dùng envelope JSON, HEAD không body; lỗi giữa stream đóng stream/ghi log. Request đã bắt đầu được hoàn tất sau gỡ/khóa.

Upload kiểm tra phiên/quyền/CSRF → file tạm → validation/duration → transaction kiểm tra lại → chuyển file chính thức → ghi track và COMMIT → 201. Hai thư mục cùng filesystem, tên UUID, không public static audio. Rollback chắc chắn dọn file mới; COMMIT không rõ kết quả phải đối chiếu DB trước xóa. Dọn lúc khởi động và mỗi 30 phút, chỉ file tạm/không được tham chiếu quá 24 giờ, bỏ thao tác đang chạy, kiểm tra cả soft delete, DB lỗi hoãn dọn. Không tự xóa audio soft delete. Thay cover lưu file mới rồi cập nhật DB có khóa hàng, commit xong mới đưa ảnh cũ vào danh sách dọn; rollback giữ ảnh cũ. Không xóa ảnh mặc định hoặc còn tham chiếu.

### Phần còn thiếu và giới hạn

[API-28/29](../api/tracks.md#api-28) và [vòng đời file](../architecture/security-and-media.md#file-lifecycle) sở hữu hợp đồng. DEC-014 chốt phiên bản, timeout và số tác vụ cho local. Chi tiết thao tác active, hàng đợi dọn và đối chiếu commit thuộc DEC-022. Phục vụ ảnh, conditional HTTP và retry upload thuộc DEC-017.

### Bối cảnh trước xác nhận — lịch sử 11/11/2026

Có ý định phục vụ thư mục uploads trực tiếp, đồng thời yêu cầu track bị gỡ không thể phát. Ẩn kết quả truy vấn không tự ngăn đường dẫn file đã biết. Chưa có hợp đồng phát media, HTTP Range, hành vi khi khóa chủ sở hữu, xóa vật lý, cache hoặc dọn file sau upload thất bại.

Cần chốt khả năng truy cập file, thời điểm ngừng phát, xử lý Range/seek và cơ chế nhất quán file–database. Ảnh hưởng: UC05/UC08/UC09/UC11, API-07/API-09/API-11/API-27, TC-08/TC-09/TC-17. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-010"></a>

## DEC-010 Ghi nhận lượt nghe

Trạng thái: `ACCEPTED`. Xác nhận mới: người dùng trong phiên làm việc, **17/11/2026**; [bằng chứng](#evidence-simple-2026-11-17).

### Kết quả hiện hành đã xác nhận

Cửa sổ trượt: tối thiểu 30 phút từ lượt được tính gần nhất. Client gửi listenedSeconds >=10; server kiểm tra input/cooldown, không coi là bằng chứng nghe thật/chống gian lận. Thành viên user ID; Guest UUID server cấp/cookie có chữ ký. Sau login dùng user ID, MVP chấp nhận có thể thêm một lượt tại ranh giới chuyển danh tính. Cooldown và tăng bộ đếm cùng transaction; lặp trả 200/counted:false. listen_cooldowns giữ mốc gần nhất theo track/người nghe, giữ bảy ngày rồi dọn.

### Phần còn thiếu và giới hạn

Schema đã có khóa duy nhất theo track/người nghe và index dọn. Giao dịch cạnh tranh và scheduler thuộc DEC-022. DEC-014 chốt HMAC-SHA256 và khóa riêng cho Guest. Tên/thuộc tính/thời hạn cookie và validation/response ngoài phần đã chốt thuộc DEC-017. Giữ chính sách loại track gỡ/chủ khóa và GET/HEAD không đếm. [Mô hình dữ liệu](../architecture/data-model.md#target-model).

### Trước lần chấp nhận phương án đơn giản — lịch sử giữ nguyên

Trạng thái: `OPEN`. Xác nhận: người dùng trong phiên làm việc, 17/11/2026; [bằng chứng](#evidence-2026-11-17).

#### Kết quả đã xác nhận

Ghi nhận sau 10 giây phát; tối đa một lần/track/định danh người nghe trong cửa sổ 30 phút. Thành viên dùng user ID; Guest dùng định danh server cấp. Ghi chống trùng và tăng bộ đếm nguyên tử. Sự kiện client chưa chứng minh nghe thực hoặc chống gian lận đầy đủ.

#### Phần còn thiếu và giới hạn

Cần xác định cửa sổ trượt/cố định, định danh Guest và chuyển trạng thái login, bằng chứng 10 giây, retry/response trùng và lưu/retention sự kiện. Chặn wire và schema lượt nghe hoàn chỉnh.

#### Bối cảnh trước xác nhận — lịch sử 11/11/2026

Có mô tả tăng khi bắt đầu phát và mô tả sau ít nhất 10 giây. Route là public nhưng chưa có quy tắc xác định lượt hợp lệ, chống lặp và tác phẩm đã gỡ. Câu lệnh tăng bộ đếm không phải cơ chế chống spam.

Cần chốt sự kiện tính lượt, ngưỡng, nhận diện lượt trùng và xử lý đồng thời. Ảnh hưởng: UC03/UC05, API-06/API-08, `tracks.play_count`, TC-10. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-011"></a>

## DEC-011 Duration và thay file tác phẩm

Trạng thái: `ACCEPTED`. Xác nhận: người dùng trong phiên làm việc, 17/11/2026; [ban đầu](#evidence-2026-11-17), [bổ sung media](#evidence-media-2026-11-17).

### Kết quả đã xác nhận

Duration do ffprobe đọc, phải hữu hạn và >0, lưu số nguyên giây làm tròn lên (243,7 → 244); kiểm chứng MP3 CBR/VBR, không coi làm tròn <1 giây là bảo đảm sai số phép đọc <1 giây. Client không gửi/sửa duration. MP3 ≤30 MiB, kiểm tra đuôi/định dạng và codec bằng ffprobe, FFmpeg giải mã kiểm tra toàn bộ file. JPG/PNG ≤5 MiB được Sharp đọc/mã hóa lại. File không hợp lệ 400, quá dung lượng 413, dọn file tạm. Tên UUID do server sinh; ffprobe/FFmpeg cần giới hạn thời gian/số tiến trình. Chỉ thay metadata/cover, không thay audio; cover xử lý theo DEC-009.

### Phần còn thiếu và giới hạn

[ADR-0004](adr-0004-audio-contract-and-file-lifecycle.md) ghi công cụ, kiểm tra file, duration và vòng đời cover. [DEC-014](#dec-014) chốt phiên bản và giới hạn local. PATCH nullable, MIME, lỗi validation và conditional HTTP thuộc DEC-017; trạng thái vật lý và cleanup thuộc DEC-022. Bằng chứng chạy ở status.

### Bối cảnh trước xác nhận — lịch sử 11/11/2026

Request upload yêu cầu `duration`; mô tả khác yêu cầu server tính duration. Update cho phép JSON hoặc multipart khi đổi cover nhưng không có hợp đồng đầy đủ cho đổi audio, thay ảnh, file cũ và metadata liên quan.

Cần chốt nguồn duration, cách kiểm chứng, hỗ trợ thay file và xử lý thất bại. Ảnh hưởng: UC08/UC09, API-09/API-10, `tracks.duration`, TC-09/TC-11. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-012"></a>

## DEC-012 Ngữ nghĩa tìm kiếm tiếng Việt

Trạng thái: `ACCEPTED`. Xác nhận mới: người dùng trong phiên làm việc, **17/11/2026**; [bằng chứng](#evidence-simple-2026-11-17).

### Kết quả hiện hành đã xác nhận

search_text từ title/artist/host chuẩn hóa Unicode, viết thường/bỏ dấu, đ → d, gom khoảng trắng bằng một hàm chung; cập nhật cùng transaction metadata. Keyword tương tự, tối đa 100 ký tự/10 từ; mọi từ có mặt không cần đúng thứ tự. %, _ và backslash là ký tự thường; escape LIKE/SQL tham số hóa. Admin cùng chuẩn hóa trên email/username hoặc title/artist theo API. Đo bộ 1.000 track trước, chỉ thêm pg_trgm nếu chưa đạt ngưỡng. Trending play_count DESC,id DESC; newest created_at DESC,id DESC giữ nguyên.

### Phần còn thiếu và giới hạn

Lựa chọn tìm kiếm đã chốt; index/migration DEC-022, protocol đo DEC-015. Kiểm chứng Unicode tổ hợp/tách/đ/Đ/nhiều từ; không hứa hiệu năng hoặc tự thêm extension trước phép đo.

### Trước lần chấp nhận phương án đơn giản — lịch sử giữ nguyên

Trạng thái: `OPEN`. Xác nhận: người dùng trong phiên làm việc, 17/11/2026; [bằng chứng](#evidence-2026-11-17).

#### Kết quả đã xác nhận

Tìm title và artist/host không phân biệt hoa thường/dấu, chuẩn hóa Unicode và khoảng trắng; ví dụ Son Tung → Sơn Tùng, kiểm chứng đ/Đ. Trending play_count DESC, id DESC; newest created_at DESC, id DESC.

#### Phần còn thiếu và giới hạn

Cần giới hạn/escape keyword, cách khớp nhiều từ, bộ ví dụ và quy tắc tìm admin users/tracks; kỹ thuật/index sẽ kiểm chứng trên PostgreSQL 18. Không khẳng định ILIKE tự bỏ dấu.

#### Bối cảnh trước xác nhận — lịch sử 11/11/2026

Có yêu cầu tìm không phân biệt hoa thường bằng `ILIKE` và mô tả tìm không dấu. Hai hành vi này không đồng nhất. Chưa chốt trường tìm, chuẩn hóa Unicode, thứ tự khi bằng điểm/lượt nghe và giới hạn keyword.

Cần bộ ví dụ mong đợi, chẳng hạn quan hệ giữa “Son Tung” và “Sơn Tùng”, rồi mới chọn kỹ thuật/index. Ảnh hưởng: UC04, API-05/API-22/API-26, NFR-001, TC-07. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-013"></a>

## DEC-013 Hệ quản trị và phiên bản database

Trạng thái: `ACCEPTED`. Xác nhận: người dùng trong phiên làm việc, 17/11/2026; [bằng chứng](#evidence-2026-11-17).

### Kết quả đã xác nhận

Database đích PostgreSQL 18, dùng minor còn được hỗ trợ khi thiết lập; ghi phiên bản thực chạy trong bằng chứng. Không chuyển sang MySQL.

### Phần còn thiếu và giới hạn

Lựa chọn engine/major đã chốt; môi trường chưa cài/kiểm chứng. Xem [ADR nền tảng](adr-0003-backend-and-database.md).

### Bối cảnh trước xác nhận — lịch sử 11/11/2026

SQL hiện viết cho PostgreSQL; mô tả có PostgreSQL hoặc MySQL. Các mốc phiên bản được nêu là PostgreSQL 18, 16 hoặc 14 trở lên. Chưa có kiểm tra tương thích môi trường thực tế.

Cần xác nhận hệ quản trị đích, phiên bản hỗ trợ và môi trường demo. Không chuyển SQL sang MySQL hoặc cài PostgreSQL chỉ để đóng câu hỏi này. Ảnh hưởng: toàn bộ bảng, local setup, migration và test database. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-014"></a>

## DEC-014 Toolchain backend và database

Trạng thái: `ACCEPTED`. Người dùng trong phiên xác nhận ngày **22/11/2026**. [Bằng chứng](#evidence-local-runtime-2026-11-22), [ADR-0010](adr-0010-local-runtime-scope.md).

### Kết quả hiện hành đã xác nhận

Giữ Node.js 24/Express 5/JavaScript ESM/npm/PostgreSQL 18; một backend và PostgreSQL. Chọn Zod, Multer ghi temp, jose/HS256 secret ngẫu nhiên >=32 byte qua môi trường; scrypt bất đồng bộ Node, salt riêng/password, N=32768,r=8,p=3,maxmem=64 MiB, lưu thông số cùng hash. pg.Pool/SQL tham số hóa, node-pg-migrate, node:test/fetch/DB thử riêng, ESLint, Node watch local. Mục đích script dev/start/test/lint/migrate đã chọn; chỉ thêm lệnh cụ thể sau bootstrap. Chọn stable tương thích/khóa lockfile lúc bootstrap. Resend HTTPS/fetch; giữ ffprobe/FFmpeg/Sharp/UUID của media.

Ngày 18/11/2026 đã chọn Node.js 24.22.3 LTS/PostgreSQL 18.7 làm baseline. Chốt bind local, biến cấu hình, một pool tối đa 5 kết nối với 3 giây chờ, lệnh dev/start/migrate/test/lint, DB thử riêng, phiên bản dependency stable tương thích được ghi trong lockfile và `npm ci` để tái hiện. Chốt issuer/audience, hai secret riêng mỗi môi trường, một khóa JWT mỗi thời điểm và thu hồi phiên khi thay khóa. Hash scrypt lưu chuỗi có phiên bản chứa tham số, salt 16 byte và digest 32 byte. [Xác nhận](#evidence-bootstrap-auth-2026-11-18), [thiết lập local](../development/local-setup.md), [xác thực](../architecture/security-and-media.md).

### Xác nhận bổ sung ngày 22/11/2026

- Windows/PowerShell là môi trường local mục tiêu. Backend mặc định bind `127.0.0.1:3000`, tắt `trust proxy`, dùng PostgreSQL và DB kiểm thử riêng. Resend thật dùng cho demo; kiểm thử tích hợp dùng Resend giả lập. [Thiết lập local](../development/local-setup.md).
- Hash dùng `scrypt$v1$N=32768,r=8,p=3$<salt>$<digest>` với salt và digest base64url. Đổi khóa JWT local theo trình tự dừng backend, thu hồi phiên, thay khóa, khởi động lại. Cookie Guest ký HMAC-SHA256 với khóa riêng; wire cookie theo DEC-017. [Xác thực](../architecture/security-and-media.md).
- Media dùng Multer 2.5.0, Sharp 0.35.5 và FFmpeg/ffprobe 8.1.3 tại mốc upload. Tối đa hai tác vụ upload/thay cover đồng thời; timeout ffprobe/FFmpeg/Sharp lần lượt 5/120/15 giây. Giữ MP3 30 MiB, JPG/PNG 5 MiB; ảnh đầu vào tối đa 4.096 px mỗi cạnh và 16 triệu pixel, đầu ra tối đa 1.024 px cạnh dài. Vùng tạm và chính thức cùng filesystem. [Media](../architecture/security-and-media.md#upload-kiem-tra-file-va-duration).
- Triển khai online, backup/restore vận hành và hạn mức OTP theo IP là hướng mở rộng tương lai. Phương án local giữ hạn mức OTP theo email và chọn migration tiến cho phép `request_ip` nhận `NULL`. [DEC-003](#dec-003), [DEC-022](#dec-022).

### Phụ thuộc còn lại

Wire cookie Guest và lỗi media thuộc DEC-017; cơ chế recovery và migration local thuộc DEC-022; seed demo thuộc DEC-020. Phiên bản và giới hạn media ở mức đặc tả cho mốc upload. [Hiện trạng](../project/status.md#local-runtime-decisions-2026-11-22).

### Trước lần chấp nhận phương án đơn giản — lịch sử giữ nguyên

Trạng thái: `OPEN`. Xác nhận: người dùng trong phiên làm việc, 17/11/2026; [bằng chứng](#evidence-2026-11-17).

#### Kết quả đã xác nhận

Node.js 24 LTS, Express 5, JavaScript ESM, npm và lockfile; pg, SQL tham số hóa, migration có phiên bản, test runner tích hợp Node và kiểm thử HTTP/DB. Bổ sung cấu hình email thật, HTTPS, origin, secret và đường dẫn media cho online. Media đã chọn ffprobe/FFmpeg, Sharp và UUID theo DEC-009/DEC-011; cần cài binary trên local/server, chưa có binary/package thực thi trong repo.

#### Phần còn thiếu và giới hạn

Cần phiên bản dependency/lockfile, validation/upload/hash/JWT, phiên bản ffprobe/FFmpeg/Sharp và timeout/concurrency media, công cụ migration/lint/HTTP test, script cụ thể, thuật toán ký/quản lý khóa và cấu hình deployment/backup. Chưa có manifest nên chưa có lệnh app chạy được. Xem [ADR nền tảng](adr-0003-backend-and-database.md).

#### Bối cảnh trước xác nhận — lịch sử 11/11/2026

Định hướng Node.js/Express có mô tả Node 18 trở lên, npm 9 trở lên; chưa chốt phiên bản được hỗ trợ, JavaScript/TypeScript, module system, package manager/lockfile, truy cập DB, cấu hình/secrets, migration, test runner và lệnh build/lint/test. Bảng API nhắc `pg`, `bcryptjs`, `jsonwebtoken`, `multer`, `express-validator`, chưa có manifest để xác nhận đã chọn/cài.

Cần chốt bộ công cụ tối thiểu và lệnh chạy trước khi giao việc bootstrap. Ảnh hưởng: toàn bộ backend, local setup và chiến lược kiểm thử. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-015"></a>

## DEC-015 Điều kiện đo chất lượng

Trạng thái: `OPEN`. Xác nhận: người dùng trong phiên làm việc, 17/11/2026; [bằng chứng](#evidence-2026-11-17).

### Kết quả đã xác nhận

Mục tiêu API p95 < 500 ms với 1.000 track, 100 user, 200 playlist, 10 người dùng đồng thời; warm-up rồi đo 60 giây, cold start báo riêng. Mốc bắt đầu nghe ≤ 1 giây là phép đo tích hợp riêng. Không còn Critical/High trong phần cam kết. Tiêu chí diễn tập backup/restore chuyển sang hướng mở rộng tương lai theo [xác nhận local](#evidence-local-runtime-2026-11-22).

### Phần còn thiếu và giới hạn

Cần cấu hình máy local, công cụ, warm-up/request mix/network/file mẫu, điểm bắt đầu-kết thúc đo audio và phân loại lỗi. Các chi tiết này chặn nghiệm thu định lượng cuối cùng.

### Bối cảnh trước xác nhận — lịch sử 11/11/2026

Có mục tiêu đọc API dưới 500 ms và bắt đầu phát audio trong một giây, nhưng chưa có máy đo, số bản ghi, file mẫu, tải đồng thời, warm/cold cache và cách tính percentile. Mốc phát audio là phép đo tích hợp; backend chưa có SLA thành phần được xác nhận.

Cần chốt quy trình đo, ngưỡng nghiệm thu và phân loại mức độ lỗi. Ảnh hưởng: NFR-001/NFR-004, TC-20/TC-21, mục tiêu quản lý chất lượng. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-016"></a>

## DEC-016 Kế hoạch và quản trị dự án

Trạng thái: `OPEN`. Xác nhận: người dùng trong phiên làm việc, 17/11/2026; [bằng chứng](#evidence-2026-11-17).

### Kết quả đã xác nhận

Chọn Trello; việc có người phụ trách, đầu ra, tiêu chí hoàn thành. Lập lại lịch theo nguồn lực thật; xác nhận người chốt nghiệp vụ/kỹ thuật/nghiệm thu. Các ngày/chi phí cũ vẫn là ước lượng lịch sử.

### Phần còn thiếu và giới hạn

Chưa có deadline mới, RACI/người nghiệm thu, giờ cam kết, baseline chi phí, thang rủi ro hay branch policy. Việc người dùng xác nhận trong phiên này không tự gán danh tính hoặc quyền cho thành viên khác. Không thao tác bảng Trello ngoài yêu cầu docs.

### Bối cảnh trước xác nhận — lịch sử 11/11/2026

Có kế hoạch 10 tuần, ba sprint, bốn milestone, ngày 17/09/2026–26/11/2026 tạm tính. Chuỗi gọi là đường găng gồm các công việc được ghi nối tiếp nhưng lịch gối đầu; chưa đủ quan hệ phụ thuộc/duration để chứng minh float bằng không. Có cách gọi 10 tuần là 70 ngày làm việc. Vai trò Database/QA có mô tả kiêm nhiệm và mô tả phân công riêng; công cụ theo dõi có Trello và GitHub Projects chính/Trello dự phòng.

Chi phí nhân công có mô tả chưa định giá và 300 giờ × 50.000 đồng = 15 triệu đồng học thuật. Rủi ro điểm 6 có ngưỡng ưu tiên cao nhưng cũng được phân loại trung bình. Chưa xác nhận người chốt kỹ thuật, người nghiệm thu và baseline tiến độ.

Cần thống nhất lịch, phụ thuộc, công cụ, nguồn lực, cơ sở chi phí và thang rủi ro; không tự tính lại hoặc chấp nhận chỉ số quản lý để thay quyết định. Ảnh hưởng: [management](../project/management.md), phạm vi nghiệm thu và phân công. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-017"></a>

## DEC-017 Quy ước hợp đồng HTTP

Trạng thái: `OPEN`. Xác nhận mới: người dùng trong phiên làm việc, **17/11/2026**; [bằng chứng](#evidence-simple-2026-11-17).

### Kết quả hiện hành đã xác nhận

Cookie soundwave_session/HttpOnly/SameSite=Lax/path=/; online Secure, HTTP local được tắt riêng Secure. Protected request ghi gửi X-CSRF-Token ngẫu nhiên lưu cùng phiên, lấy GET /api/auth/csrf. Kiểm tra Origin; auth trước login nhận JSON/kiểm Origin; proxy /api cùng origin local. Password 12–128 ký tự/cho khoảng trắng/không trim/không ép ký tự đặc biệt. JSON <=128 KiB, multipart giới hạn riêng; unknown field/query 400, PATCH rỗng 400. Null chỉ xóa field tùy chọn, title/artist/genre không null. Lỗi chung VALIDATION_ERROR, UNAUTHENTICATED, FORBIDDEN, NOT_FOUND, CONFLICT, RATE_LIMITED, SERVICE_UNAVAILABLE; giữ mã audio cụ thể. Giữ envelope/camelCase/UTC/pagination/201-200-204 đã chốt; text theo DEC-021.

Username 2–50 ký tự sau trim và có thể trùng. CSRF token 32 byte ngẫu nhiên và ổn định trong phiên. [Xác nhận ngày 18/11](#evidence-bootstrap-auth-2026-11-18).

Ngày 21/11/2026 chốt cho OTP đăng ký: API-01 trả `201` khi tạo tài khoản, `202` khi bắt đầu lại đủ điều kiện và `409 CONFLICT` khi đăng ký trùng ngoài nhánh bắt đầu lại. API-30 xác minh thành công trả `200`. API-31 tiếp nhận gửi lại trả `202`. Giới hạn gửi trả `429 RATE_LIMITED` kèm `Retry-After`. Lỗi gửi xác định trả `503 SERVICE_UNAVAILABLE`. Khi kết quả gửi chưa rõ, phản hồi tiếp nhận cho biết tài khoản đang chờ xác minh. [Xác nhận 21/11](#evidence-registration-otp-2026-11-21), [API Auth](../api/auth.md#api-01).

### Phần còn thiếu và giới hạn

Mốc 21/11/2026 chốt API-30/31 sai mật khẩu trả `400 VALIDATION_ERROR`, API-30 gặp `reserved` trả `409 CONFLICT` kèm `error.details.retryAfterSeconds`, API-32 trả `202` chung và API-33 trả `204` thành công hoặc `400 VALIDATION_ERROR` chung khi xác minh thất bại. Theo [xác nhận local](#evidence-local-runtime-2026-11-22), nhánh `429` theo IP của API-32 chuyển sang mở rộng; API-01/31 giữ `429` cho hạn mức email. [Xác nhận 21/11](#evidence-password-reset-otp-2026-11-21).

[DEC-005](#dec-005) chốt JSON và lỗi chính của Auth, response/header API-39 và phiên thu hồi, trường/validation hồ sơ và kênh Creator, cùng phản hồi/validation playlist. Còn mapping status/code và trường required/nullable/độ dài của các nhánh ngoài phần đã chốt, quy tắc trailing slash và cấu trúc Trending theo type. Origin thiếu/sai, phạm vi public mutation, cookie Domain, thuộc tính Guest và các lỗi CSRF ở request ghi còn mở. Media multipart/remove cover/MIME/error phụ/conditional HTTP/chính sách ảnh. Mã lỗi audio giữ theo DEC-009.

### Trước lần chấp nhận phương án đơn giản — lịch sử giữ nguyên

Trạng thái: `OPEN`. Xác nhận: người dùng trong phiên làm việc, 17/11/2026; [bằng chứng](#evidence-2026-11-17).

#### Kết quả đã xác nhận

API camelCase; thành công {success,data,message?}, danh sách thêm pagination ở cấp ngoài; lỗi {success:false,error:{code,message,details?}}. Tạo mới 201, đọc/cập nhật 200, xóa/logout 204 không body. Page mặc định 1, limit 10, tối đa 100; query sai 400. Thời gian ISO 8601 UTC; email trim/lowercase. Update PATCH: bỏ qua giữ nguyên, null chỉ xóa trường cho phép. Auth cookie theo DEC-006. Audio GET thành công là binary, HEAD luôn không body; 404 TRACK_NOT_AVAILABLE và 503 MEDIA_UNAVAILABLE/SERVICE_UNAVAILABLE của audio đã chọn tại DEC-009.

#### Phần còn thiếu và giới hạn

Cần trường required/nullable cụ thể, error code/danh mục lỗi, giới hạn body/keyword, trailing slash, response trending theo type, giao thức CSRF/cookie local và HTTP lỗi dịch vụ ngoài audio; chính sách ảnh, conditional HTTP, MIME khai báo bất nhất và mã lỗi validation media. Ví dụ còn DRAFT ở phần chưa đủ wire; chưa tạo OpenAPI hoàn chỉnh.

#### Bối cảnh trước xác nhận — lịch sử 11/11/2026

Ví dụ response có `success`, `data`, `message`; token và playCount đôi lúc ở cấp ngoài. Pagination có lúc ở ngoài `data`, có lúc nằm trong `data`. Không có error envelope, success status cho từng method, giới hạn page/limit toàn cục, xử lý query lạ, quy tắc null/omitted, thời gian/timezone hoặc chuẩn hóa email. JWT cũng có tên định danh khác nhau.

Cần chốt phần nào giữ nguyên theo endpoint, phần nào dùng quy ước chung. Không tự chuẩn hóa các ví dụ thành một schema mới. Ảnh hưởng: toàn bộ API, mapping snake_case–camelCase, kiểm thử hợp đồng. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-018"></a>

## DEC-018 Quyền Admin và nội dung của tài khoản bị khóa

Trạng thái: `ACCEPTED`. Xác nhận: người dùng trong phiên làm việc, 17/11/2026; [bằng chứng](#evidence-2026-11-17).

### Kết quả đã xác nhận

Admin upload không cần creator_status approved, sửa/gỡ mọi track, chỉ quản lý playlist của mình; không cho khóa Admin khác hoặc chính mình trong MVP. Khóa Creator tạm ẩn nội dung và chặn request audio mới. Mở khóa chỉ hiển thị lại track chưa bị gỡ riêng; không khôi phục deleted_at của track.

### Phần còn thiếu và giới hạn

Ma trận nghiệp vụ đã chốt; wire status/error code còn DEC-017.

### Bối cảnh trước xác nhận — lịch sử 11/11/2026

Admin có quyền sửa/xóa mọi track và upload; điều kiện `creator_status=approved` chưa nói rõ ngoại lệ Admin. Playlist được mô tả cá nhân, chưa có quyền Admin can thiệp playlist người khác. Khi khóa người dùng, chưa rõ tác phẩm có bị ẩn, đang phát có dừng, và mở khóa có khôi phục nội dung nào. Chỉ có yêu cầu rõ không tự khóa Admin đang đăng nhập; quyền khóa Admin khác chưa xác định.

Cần ma trận cho các trường hợp này trước khi viết middleware hoặc truy vấn lan truyền. Ảnh hưởng: BR-001/BR-004/BR-007, UC07–UC12, TC-05/TC-15/TC-16. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-019"></a>

## DEC-019 Thứ tự và cập nhật playlist

Trạng thái: `ACCEPTED`. Xác nhận mới: người dùng trong phiên làm việc, **17/11/2026**; [bằng chứng](#evidence-simple-2026-11-17).

### Kết quả hiện hành đã xác nhận

Thay gửi mọi ID liên kết bằng toàn bộ ID đang hiển thị qua PATCH /api/playlists/:id/order {trackIds:[...]}. Khóa playlist, kiểm đúng tập hiển thị; liên kết ẩn giữ ở cuối, hiện lại cuối. Tập track thay đổi trả 409/tải lại. Hai reorder hợp lệ tuần tự, lần hoàn tất sau quyết định thứ tự cuối. Từ 1/thêm cuối/gỡ đánh lại; UNIQUE thứ tự kiểm tra lúc commit. Track ẩn không hiện/không đếm, đọc thứ tự liên tục; playlist xóa không sửa.

### Phần còn thiếu và giới hạn

Schema đã có FK và unique constraint deferred. [DEC-005](#dec-005) đã chốt response, validation reorder và status khi thêm/gỡ lặp. Giao dịch khi track/chủ đổi trạng thái còn DEC-022, các lỗi HTTP ngoài phần đã chốt còn DEC-017. [Mô hình dữ liệu](../architecture/data-model.md#target-model).

### Trước lần chấp nhận phương án đơn giản — lịch sử giữ nguyên

Trạng thái: `OPEN`. Xác nhận: người dùng trong phiên làm việc, 17/11/2026; [bằng chứng](#evidence-2026-11-17).

#### Kết quả đã xác nhận

Reorder gửi toàn bộ track ID hiện có; thứ tự bắt đầu 1, thêm cuối, gỡ thì đánh lại. Thay đổi thành viên/thứ tự khóa playlist trong transaction. Track bị gỡ/ẩn không xuất hiện, không tính trackCount, vẫn giữ liên kết; đọc trả thứ tự liên tục. Playlist đã xóa không được sửa.

#### Phần còn thiếu và giới hạn

Cần route/body, cách gửi ID của track ẩn khi reorder, kết quả hai thay đổi cạnh tranh, ràng buộc thứ tự không xung đột trong transaction và response thao tác lặp. Chặn wire/transaction chi tiết.

#### Bối cảnh trước xác nhận — lịch sử 11/11/2026

Có ý định append bằng `MAX(sort_order)+1`, đọc theo thứ tự và cho phép sắp xếp lại. Chưa có hợp đồng reorder hoặc quy tắc đồng thời, khoảng trống/thứ tự trùng, track đã bị gỡ và quyền sửa playlist đã xóa. PK ngăn trùng cặp playlist–track nhưng không ngăn trùng sort_order.

Cần chốt semantics và tính nguyên tử trước khi chọn transaction hoặc constraint đích. Ảnh hưởng: UC07, API-17/API-20/API-21, `playlist_tracks`, TC-12/TC-13/TC-14. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-020"></a>

## DEC-020 Bộ dữ liệu demo và media

Trạng thái: `OPEN`. Xác nhận: người dùng trong phiên làm việc, 17/11/2026; [bằng chứng](#evidence-2026-11-17).

### Kết quả đã xác nhận

Bộ demo dùng nội dung tự tạo/có giấy phép, manifest nguồn/quyền/tên file; có music/podcast và các trạng thái cần thử. Seed tạo hash qua công cụ và kiểm chứng login thực; fixture test tách seed demo.

### Phần còn thiếu và giới hạn

Chưa chọn file/giấy phép, manifest thực tế, fixture và công cụ tạo hash. Seed hiện có vẫn chưa được xác minh, không sửa hoặc gọi là bộ demo hợp lệ trong đợt docs.

### Bối cảnh trước xác nhận — lịch sử 11/11/2026

Seed có tài khoản/thể loại/track/playlist và đường dẫn media, nhưng chưa có các file tương ứng trong checkout. Mật khẩu mẫu được chú thích là `123456`; chưa kiểm chứng hash. Một số tên nghệ sĩ không trùng người sở hữu upload; chưa biết đó là dữ liệu minh họa có chủ ý hay sai lệch cần sửa. Chưa có manifest quyền sử dụng nội dung.

Cần xác nhận bộ demo, nguồn và giấy phép, cách cung cấp file, hash đăng nhập và tính nhất quán metadata trước khi dùng làm fixture nghiệm thu. Không sửa seed trong công việc docs. Ảnh hưởng: UC02/UC05/UC08, R04, TC-03/TC-08/TC-19. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-021"></a>

## DEC-021 Định dạng lyrics và show notes

Trạng thái: `ACCEPTED`. Xác nhận mới: người dùng trong phiên làm việc, **17/11/2026**; [bằng chứng](#evidence-simple-2026-11-17).

### Kết quả hiện hành đã xác nhận

Music lyrics <=20.000 ký tự/description <=5.000; podcast description/show notes <=20.000/lyrics null. Field tùy chọn rỗng sau trim → null; PATCH omitted giữ nguyên. Thẻ HTML trả 400, luôn xử lý/hiển thị text, không tự strip. [05:20] chỉ là chữ, không parse/seek/lyrics đồng bộ trong MVP.

### Phần còn thiếu và giới hạn

Chính sách text đã chốt; nhận diện thẻ HTML/đếm ký tự, validation podcast lyrics khác null và code chi tiết DEC-017. Không coi expected là test đã chạy.

### Trước lần chấp nhận phương án đơn giản — lịch sử giữ nguyên

Trạng thái: `OPEN`. Xác nhận: người dùng trong phiên làm việc, 17/11/2026; [bằng chứng](#evidence-2026-11-17).

#### Kết quả đã xác nhận

Lyrics/show notes plain text, không nhận HTML, không đồng bộ thời gian trong MVP. Show notes có thể có chuỗi [05:20] để hiển thị; bấm mốc seek và lyrics đồng bộ để giai đoạn sau.

#### Phần còn thiếu và giới hạn

Cần độ dài, null/rỗng, xử lý input chứa markup và quy tắc từng type. Không tự công nhận mọi TEXT là hợp lệ.

#### Bối cảnh trước xác nhận — lịch sử 11/11/2026

Schema chỉ có `lyrics TEXT` và `description TEXT`; có yêu cầu các mốc thời gian tương ứng nội dung. Chưa có format lưu/trao đổi timestamp, cách parse, độ chính xác hoặc quy tắc text rỗng, nội dung có markup và độ dài. Không suy ra dữ liệu đồng bộ thời gian từ một chuỗi văn bản tự do.

Cần xác nhận backend chỉ trả text hay cung cấp cấu trúc thời gian và quy tắc kiểm tra nội dung. Ảnh hưởng: UC06/UC08/UC09, API-07/API-09/API-10, BR-006, TC-08/TC-09. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-022"></a>

## DEC-022 Ràng buộc schema đích

Trạng thái: `OPEN` cho chi tiết vận hành ngoài DDL khởi tạo. Mô hình logic được xác nhận ngày **17/11/2026**, ba bảng tài khoản ngày **18/11/2026**, và schema khởi tạo chín bảng ngày **20/11/2026**. [Bằng chứng mới](#evidence-single-migration-2026-11-20).

### Kết quả hiện hành đã xác nhận

Giữ năm bảng, thêm otp_challenges (digest/purpose/thời hạn/lần sai/đã dùng), auth_sessions (UUID/user/thời hạn/thu hồi/CSRF), creator_applications (hồ sơ/lịch sử), listen_cooldowns (track/người nghe/mốc gần nhất). User email_verified_at nullable, email chuẩn hóa UNIQUE/TIMESTAMPTZ. users.role là nguồn quyền; creatorStatus suy ra hồ sơ thay hai trạng thái độc lập; một pending/user. Khóa hàng user khi login/khóa/đổi mật khẩu, hàng hồ sơ khi review; reset thu hồi phiên nguyên tử. Migration phiên bản, seed demo riêng. search_text cùng metadata, cooldown/đếm nguyên tử. duration>0/play_count>=0/sort_order>0/UNIQUE thứ tự deferred đến commit; giữ media/path/soft delete.

<a id="evidence-initial-migration-2026-11-18"></a>

Ngày 18/11/2026 (Asia/Saigon), người dùng xác nhận trong phiên làm việc: “Migration khởi tạo DB mới”. Chuỗi migration bắt đầu trên PostgreSQL 18 trống để dựng schema đích. Phạm vi khởi tạo không bao gồm nâng cấp schema cũ, chuyển dữ liệu/hash Bcrypt/timestamp cũ hoặc nạp seed demo. [Mô hình dữ liệu](../architecture/data-model.md#target-model), [thiết lập local](../development/local-setup.md), [TC-19](../testing/acceptance.md#tc-19).

Xác nhận tiếp theo cùng ngày chọn `users`, `otp_challenges` và `auth_sessions` cho migration bootstrap ban đầu, cùng cột/khóa/index/default/null của ba bảng và thứ tự khóa auth theo hàng user trước. Phương án lúc đó bổ sung các bảng theo từng luồng. [Xác nhận](#evidence-bootstrap-auth-2026-11-18), [schema tài khoản](../architecture/data-model.md#initial-auth-schema), [giao dịch auth](../architecture/security-and-media.md#auth-transaction-order).

<a id="evidence-single-migration-2026-11-20"></a>

Ngày 20/11/2026, sau khi yêu cầu hoàn thiện database trong một migration, người dùng chọn “Chốt schema, gom thành một file cho DB trống (Khuyến nghị)”. Xác nhận schema sáu bảng còn lại trong kế hoạch, giữ DDL ba bảng tài khoản và dùng một migration cho PostgreSQL 18 trống. [Kế hoạch](../plans/2026-11-20-consolidate-database-migration.md), [ADR-0007](adr-0007-single-initial-database-migration.md), [schema chín bảng](../architecture/data-model.md#target-model).

### Phần còn thiếu và giới hạn

Còn thứ tự khóa và giao dịch khi API cập nhật nhiều bảng, gồm xét duyệt Creator, track/playlist, cooldown và recovery media. Theo [xác nhận local](#evidence-local-runtime-2026-11-22), migration tiếp theo bỏ `NOT NULL` của `otp_challenges.request_ip` để local lưu `NULL`. Migration khởi tạo chín bảng hiện vẫn bắt buộc cột này. Bảng đếm IP reset và cơ chế đếm IP thuộc hướng mở rộng tương lai. Seed demo và fixture còn DEC-020. [Mô hình dữ liệu](../architecture/data-model.md#reset-request-ip-storage), [hiện trạng migration](../project/status.md#single-database-migration-2026-11-20).

### Trước lần chấp nhận phương án đơn giản — lịch sử giữ nguyên

Trạng thái: `OPEN`. Xác nhận: người dùng trong phiên làm việc, 17/11/2026; [bằng chứng](#evidence-2026-11-17).

#### Kết quả đã xác nhận

Schema đích có duration > 0, play_count >= 0, sort_order > 0 và thứ tự duy nhất/playlist; timestamp có timezone, email chuẩn hóa UNIQUE, thiếu ảnh dùng mặc định. Bổ sung dữ liệu email/OTP, phiên, Creator applications và chống ghi trùng lượt nghe. MVP không có API xóa vật lý.

#### Phần còn thiếu và giới hạn

Cần tên/kiểu cột, FK/index/default/null, lưu OTP an toàn, quan hệ role/status/hồ sơ, liên kết ẩn với reorder và chuyển dữ liệu cũ. DDL hiện tại vẫn nguyên năm bảng; chưa tạo migration. Media đã chốt INT giây ceiling, UUID và storage path nội bộ/audioUrl HTTP; còn mô hình nhận biết thao tác đang chạy, đối chiếu COMMIT không rõ và danh sách dọn cover để thực hiện an toàn DEC-009.

#### Bối cảnh trước xác nhận — lịch sử 11/11/2026

SQL hiện dùng `sort_order DEFAULT 1`; có mô tả dữ liệu dùng mặc định 0. Các cột ảnh có DEFAULT nhưng vẫn cho phép NULL; quy tắc nghiệp vụ về giá trị thiếu chưa đầy đủ. Duration/play_count/sort_order chưa có CHECK không âm; chưa có ràng buộc đồng bộ role–creator_status. Cơ chế soft delete được yêu cầu nhưng FK CASCADE chỉ tác động khi DELETE vật lý.

Cần xác nhận schema đích, ràng buộc đặt tại database hay nghiệp vụ, chính sách xóa vật lý/khôi phục và thứ tự trong playlist. Bản từ điển dữ liệu ghi nguyên SQL hiện có; việc ghi nhận này không chốt giữ nguyên thiết kế. Ảnh hưởng: toàn bộ schema, BR-002/BR-004/BR-008, TC-13/TC-16/TC-19. Người chốt/kết quả: chưa xác định; không có mặc định.
