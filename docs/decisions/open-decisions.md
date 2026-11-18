# Sổ quyết định và phần còn mở

Cập nhật ngày **17/11/2026**, Asia/Saigon. Giữ đường dẫn `open-decisions.md` và mã DEC cũ để không phá liên kết.

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

Reorder **thay thế** quy tắc trước về gửi mọi ID liên kết: nay chỉ gửi toàn bộ ID đang hiển thị, giữ liên kết ẩn ở cuối. DEC-010/012/019/021 giải quyết phạm vi; hiện **14 ACCEPTED, 8 OPEN**. DEC-003/005/014/017/022 vẫn OPEN ở chi tiết ghi riêng. [ADR-0005](adr-0005-simple-backend-contracts.md), [kế hoạch](../plans/2026-11-17-simple-backend-decisions.md), [bằng chứng](../project/status.md#simple-sync-2026-11-17).

## Danh mục

| Mã | Vấn đề | Trạng thái hiện tại |
| --- | --- | --- |
| [DEC-001](#dec-001) | Phạm vi và ưu tiên use case | `ACCEPTED` |
| [DEC-002](#dec-002) | Thời điểm đăng ký Creator | `ACCEPTED` |
| [DEC-003](#dec-003) | OTP và khôi phục mật khẩu | `OPEN` |
| [DEC-004](#dec-004) | Đường dẫn và method API | `ACCEPTED` |
| [DEC-005](#dec-005) | Chức năng thiếu hợp đồng API | `OPEN` |
| [DEC-006](#dec-006) | Vòng đời JWT và thay đổi quyền | `ACCEPTED` |
| [DEC-007](#dec-007) | Dữ liệu hồ sơ Creator | `ACCEPTED` |
| [DEC-008](#dec-008) | Nơi lưu media | `ACCEPTED` |
| [DEC-009](#dec-009) | Phục vụ và vòng đời file media | `ACCEPTED` |
| [DEC-010](#dec-010) | Ghi nhận lượt nghe | `ACCEPTED` |
| [DEC-011](#dec-011) | Duration và thay file tác phẩm | `ACCEPTED` |
| [DEC-012](#dec-012) | Ngữ nghĩa tìm kiếm tiếng Việt | `ACCEPTED` |
| [DEC-013](#dec-013) | Hệ quản trị và phiên bản database | `ACCEPTED` |
| [DEC-014](#dec-014) | Toolchain backend và database | `OPEN` |
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

Trạng thái: `OPEN`. Xác nhận mới: người dùng trong phiên làm việc, **17/11/2026**; [bằng chứng](#evidence-simple-2026-11-17).

### Kết quả hiện hành đã xác nhận

Resend HTTPS qua fetch backend, cần tài khoản/API key/domain gửi xác minh, chưa thiết lập. Đăng ký tạo user email_verified_at NULL, chưa login. OTP sáu số/năm phút/một lần/ba sai; resend sau 60 giây hủy cũ. Digest HMAC/secret riêng, số lần sai/thời hạn lưu PostgreSQL. Tối đa 5 lần gửi/email/giờ và thêm IP limit. Mail lỗi giữ user chưa xác minh, báo tạm thời/cho resend/không tạo user trùng. Reset chỉ user đã xác minh/chưa khóa; yêu cầu reset phản hồi chung không tiết lộ email tồn tại; verify/reset không tự login.

### Phần còn thiếu và giới hạn

Còn ngưỡng/cửa sổ IP limit, cách lưu/đếm lần gửi và cạnh tranh/timeout không rõ kết quả; đăng ký lại user chưa xác minh/retention đăng ký; wire/status/error gửi/resend/reset, phản hồi chung khi provider lỗi và trạng thái OTP khi gửi lỗi. DEC-005/017/022 sở hữu wire/schema. Không tự tạo tài khoản Resend hoặc mua domain.

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

Trạng thái: `OPEN`. Xác nhận mới: người dùng trong phiên làm việc, **17/11/2026**; [bằng chứng](#evidence-simple-2026-11-17).

### Kết quả hiện hành đã xác nhận

Chọn POST /api/auth/verify-email, POST /api/auth/resend-verification, POST /api/auth/forgot-password, POST /api/auth/reset-password, POST /api/auth/change-password; POST /api/creator-applications, GET /api/creator-applications/me, PATCH /api/creator/channel, PATCH /api/playlists/:id/order; GET /api/auth/csrf theo DEC-017. Verify {email,otp}, reset {email,otp,newPassword}, đổi {currentPassword,newPassword}, reorder {trackIds:[...]}. API-25 dùng application ID. Rejected nộp POST hồ sơ mới, không thêm route resend hồ sơ. Cấp API-30–39 cho mười method/path tại API index; chưa coi đủ mọi wire.

### Phần còn thiếu và giới hạn

Còn body/response/status tiếp nhận OTP/resend/forgot; request/response hồ sơ/kênh, tên field lĩnh vực/lý do và giới hạn; response CSRF/reorder, error/field validation còn thiếu. Chưa có route thực thi hoặc OpenAPI hoàn chỉnh.

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

Phạm vi quyết định kiến trúc đã chốt. Thuật toán ký/quản lý khóa, tên cookie và giao thức CSRF chi tiết còn đặc tả ở DEC-014/DEC-017; schema vật lý ở DEC-022. Xem [ADR phiên](adr-0001-authentication-and-sessions.md).

### Bối cảnh trước xác nhận — lịch sử 11/11/2026

JWT được mô tả có hạn 24 giờ, payload có cách gọi `userId` hoặc `id,email,role`. Logout có mô tả stateless chỉ xóa token ở bên sử dụng; khóa tài khoản lại yêu cầu thu hồi phiên ngay. Duyệt Creator yêu cầu quyền mới có hiệu lực ngay.

Cần xác nhận payload, lưu/thu hồi phiên, kiểm tra trạng thái người dùng, thay đổi quyền, logout, reset mật khẩu và token cũ sau mở khóa. Không tự thêm refresh token hoặc denylist. Ảnh hưởng: UC02/UC10/UC12, mọi protected API và TC-03/TC-05/TC-15/TC-18. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-007"></a>

## DEC-007 Dữ liệu hồ sơ Creator

Trạng thái: `ACCEPTED`. Xác nhận: người dùng trong phiên làm việc, 17/11/2026; [bằng chứng](#evidence-2026-11-17).

### Kết quả đã xác nhận

Bổ sung creator_applications để lưu tên kênh, giới thiệu, lĩnh vực, ngày gửi, trạng thái, người/ngày duyệt, lý do từ chối và lịch sử. Một hồ sơ pending/user; pending không sửa; sau rejected có thể nộp hồ sơ mới. Kênh đã duyệt được sửa tên/giới thiệu, không tự thay quyền.

### Phần còn thiếu và giới hạn

Lựa chọn mô hình đã chốt; tên/kiểu cột và quan hệ nguồn trạng thái user–hồ sơ còn ở DEC-022; wire ở DEC-005.

### Bối cảnh trước xác nhận — lịch sử 11/11/2026

Nhu cầu có lĩnh vực hoạt động, thời điểm gửi hồ sơ và lý do từ chối; schema chỉ có `creator_status`, `channel_name`, `bio`, `created_at` của tài khoản. Không dùng ngày tạo tài khoản làm ngày gửi hồ sơ khi chưa xác nhận. Lịch sử review và người duyệt chưa có mô hình.

Cần chốt dữ liệu lưu, mức độ cần lịch sử, gửi lại sau từ chối và thay đổi hồ sơ đã duyệt. Ảnh hưởng: UC12, `users`, API-24/API-25, BR-002, TC-18. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-008"></a>

## DEC-008 Nơi lưu media

Trạng thái: `ACCEPTED`. Xác nhận: người dùng trong phiên làm việc, 17/11/2026; [bằng chứng](#evidence-2026-11-17).

### Kết quả đã xác nhận

Nhạc/podcast lưu filesystem local: khi online là ổ đĩa bền vững của máy chủ backend, không phải máy người nghe. Đường dẫn lưu cấu hình được. Hệ thống phải sẵn sàng triển khai online, OTP dùng email thật; không còn giả định toàn bộ demo độc lập Internet.

### Phần còn thiếu và giới hạn

Nơi lưu đã chốt; hosting, dung lượng/chi phí, volume/backup cụ thể còn DEC-014/DEC-016. Xem [ADR media](adr-0002-media-and-online-readiness.md).

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

Phạm vi hợp đồng/vòng đời trên đã ACCEPTED; chi tiết tại [API-28/29](../api/tracks.md#api-28), [media](../architecture/security-and-media.md#file-lifecycle). Chưa chọn timeout/số tiến trình, phiên bản binary/package, cơ chế ghi nhận thao tác đang chạy/hàng đợi dọn và đối chiếu commit (DEC-014/DEC-022). Chính sách phục vụ ảnh/conditional HTTP khác và upload retry còn DEC-017; không tự cấp API cover. Không tuyên bố filesystem và PostgreSQL có transaction chung.

### Bối cảnh trước xác nhận — lịch sử 11/11/2026

Có ý định phục vụ thư mục uploads trực tiếp, đồng thời yêu cầu track bị gỡ không thể phát. Ẩn kết quả truy vấn không tự ngăn đường dẫn file đã biết. Chưa có hợp đồng phát media, HTTP Range, hành vi khi khóa chủ sở hữu, xóa vật lý, cache hoặc dọn file sau upload thất bại.

Cần chốt khả năng truy cập file, thời điểm ngừng phát, xử lý Range/seek và cơ chế nhất quán file–database. Ảnh hưởng: UC05/UC08/UC09/UC11, API-07/API-09/API-11/API-27, TC-08/TC-09/TC-17. Người chốt/kết quả: chưa xác định; không có mặc định.

<a id="dec-010"></a>

## DEC-010 Ghi nhận lượt nghe

Trạng thái: `ACCEPTED`. Xác nhận mới: người dùng trong phiên làm việc, **17/11/2026**; [bằng chứng](#evidence-simple-2026-11-17).

### Kết quả hiện hành đã xác nhận

Cửa sổ trượt: tối thiểu 30 phút từ lượt được tính gần nhất. Client gửi listenedSeconds >=10; server kiểm tra input/cooldown, không coi là bằng chứng nghe thật/chống gian lận. Thành viên user ID; Guest UUID server cấp/cookie có chữ ký. Sau login dùng user ID, MVP chấp nhận có thể thêm một lượt tại ranh giới chuyển danh tính. Cooldown và tăng bộ đếm cùng transaction; lặp trả 200/counted:false. listen_cooldowns giữ mốc gần nhất theo track/người nghe, giữ bảy ngày rồi dọn.

### Phần còn thiếu và giới hạn

Semantics đã chốt; schema/FK/index/cạnh tranh ở DEC-022. Cookie Guest (tên/thuộc tính/thời hạn), chữ ký/secret, validation numeric listenedSeconds/response đầy đủ ở DEC-014/017. Giữ chính sách track gỡ/chủ khóa và không đếm từ GET/HEAD audio.

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

Lựa chọn công cụ/độ chính xác biểu diễn/kiểm tra file/vòng đời cover đã ACCEPTED, xem [ADR-0004](adr-0004-audio-contract-and-file-lifecycle.md). Phiên bản, giới hạn tiến trình và cấu hình ảnh còn DEC-014; trường PATCH nullable, MIME khai báo bất nhất, error code validation, conditional HTTP và lỗi phụ chưa chọn còn DEC-017; schema vật lý/cleanup state còn DEC-022. Chưa cài/chạy binary hoặc kiểm tra duration thực.

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

Trạng thái: `OPEN`. Xác nhận mới: người dùng trong phiên làm việc, **17/11/2026**; [bằng chứng](#evidence-simple-2026-11-17).

### Kết quả hiện hành đã xác nhận

Giữ Node.js 24/Express 5/JavaScript ESM/npm/PostgreSQL 18; một backend và PostgreSQL. Chọn Zod, Multer ghi temp, jose/HS256 secret ngẫu nhiên >=32 byte qua môi trường; scrypt bất đồng bộ Node, salt riêng/password, N=32768,r=8,p=3,maxmem=64 MiB, lưu thông số cùng hash. pg.Pool/SQL tham số hóa, node-pg-migrate, node:test/fetch/DB thử riêng, ESLint, Node watch local. Mục đích script dev/start/test/lint/migrate đã chọn; chỉ thêm lệnh cụ thể sau bootstrap. Chọn stable tương thích/khóa lockfile lúc bootstrap. Resend HTTPS/fetch; giữ ffprobe/FFmpeg/Sharp/UUID của media.

### Phần còn thiếu và giới hạn

Còn versions package/binary/kiểm chứng tương thích, lệnh/config cụ thể, định dạng hash/salt/key lifecycle, issuer/audience/tên biến và deployment/backup. Media còn timeout/concurrency/image limits. Seed Bcrypt là artifact cũ, không thay scrypt hoặc mặc định login được; chưa cài package/runtime.

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

Mục tiêu API p95 < 500 ms với 1.000 track, 100 user, 200 playlist, 10 người dùng đồng thời; warm-up rồi đo 60 giây, cold start báo riêng. Mốc bắt đầu nghe ≤ 1 giây là phép đo tích hợp riêng. Không còn Critical/High trong phần cam kết; có một lần thử backup/restore thành công.

### Phần còn thiếu và giới hạn

Cần cấu hình máy, công cụ, warm-up/request mix/network/file mẫu, điểm bắt đầu-kết thúc đo audio, phân loại lỗi và protocol backup/restore. Chặn nghiệm thu định lượng cuối cùng; không tự ghi PASS.

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

### Phần còn thiếu và giới hạn

Còn mapping status/code từng nhánh, field required/nullable/độ dài chưa nêu, username/title/channel/form Creator, trailing slash và Trending type shape. CSRF response/cấp lại/thu hồi, Origin thiếu/sai/phạm vi public mutation, cookie Domain/Guest thuộc tính/local proxy config. OTP phản hồi chung khi provider lỗi. Media multipart/remove cover/MIME/error phụ/conditional HTTP/chính sách ảnh. Không lấy bảy code chung thay mã audio đã chốt.

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

Semantics đã chốt; response/error DEC-005/017, FK/constraint deferred và giao dịch khi track/chủ đổi trạng thái DEC-022. Thêm/gỡ lặp ngoài reorder còn thiếu mapping, không tự coi mọi thao tác idempotent.

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

Trạng thái: `OPEN`. Mô hình logic được xác nhận ngày **17/11/2026** ([bằng chứng](#evidence-simple-2026-11-17)). Phạm vi migration đầu tiên được xác nhận ngày **18/11/2026**.

### Kết quả hiện hành đã xác nhận

Giữ năm bảng, thêm otp_challenges (digest/purpose/thời hạn/lần sai/đã dùng), auth_sessions (UUID/user/thời hạn/thu hồi/CSRF), creator_applications (hồ sơ/lịch sử), listen_cooldowns (track/người nghe/mốc gần nhất). User email_verified_at nullable, email chuẩn hóa UNIQUE/TIMESTAMPTZ. users.role là nguồn quyền; creatorStatus suy ra hồ sơ thay hai trạng thái độc lập; một pending/user. Khóa hàng user khi login/khóa/đổi mật khẩu, hàng hồ sơ khi review; reset thu hồi phiên nguyên tử. Migration phiên bản, seed demo riêng. search_text cùng metadata, cooldown/đếm nguyên tử. duration>0/play_count>=0/sort_order>0/UNIQUE thứ tự deferred đến commit; giữ media/path/soft delete.

<a id="evidence-initial-migration-2026-11-18"></a>

Ngày 18/11/2026 (Asia/Saigon), người dùng xác nhận trong phiên làm việc: “Migration khởi tạo DB mới”. Chuỗi migration bắt đầu trên PostgreSQL 18 trống để dựng schema đích. Phạm vi khởi tạo không bao gồm nâng cấp schema cũ, chuyển dữ liệu/hash Bcrypt/timestamp cũ hoặc nạp seed demo. [Mô hình dữ liệu](../architecture/data-model.md#target-model), [thiết lập local](../development/local-setup.md), [TC-19](../testing/acceptance.md#tc-19).

### Phần còn thiếu và giới hạn

Còn tên/kiểu cột, FK/index/default/null, mapping creatorStatus/kênh theo hồ sơ, OTP/user/counters và thứ tự khóa. Seed demo và fixture còn DEC-020. Media còn active/đối chiếu COMMIT/danh sách dọn chống race. Chín bảng nghiệp vụ đích không phải DDL hoặc giới hạn mọi bảng kỹ thuật tương lai.

### Trước lần chấp nhận phương án đơn giản — lịch sử giữ nguyên

Trạng thái: `OPEN`. Xác nhận: người dùng trong phiên làm việc, 17/11/2026; [bằng chứng](#evidence-2026-11-17).

#### Kết quả đã xác nhận

Schema đích có duration > 0, play_count >= 0, sort_order > 0 và thứ tự duy nhất/playlist; timestamp có timezone, email chuẩn hóa UNIQUE, thiếu ảnh dùng mặc định. Bổ sung dữ liệu email/OTP, phiên, Creator applications và chống ghi trùng lượt nghe. MVP không có API xóa vật lý.

#### Phần còn thiếu và giới hạn

Cần tên/kiểu cột, FK/index/default/null, lưu OTP an toàn, quan hệ role/status/hồ sơ, liên kết ẩn với reorder và chuyển dữ liệu cũ. DDL hiện tại vẫn nguyên năm bảng; chưa tạo migration. Media đã chốt INT giây ceiling, UUID và storage path nội bộ/audioUrl HTTP; còn mô hình nhận biết thao tác đang chạy, đối chiếu COMMIT không rõ và danh sách dọn cover để thực hiện an toàn DEC-009.

#### Bối cảnh trước xác nhận — lịch sử 11/11/2026

SQL hiện dùng `sort_order DEFAULT 1`; có mô tả dữ liệu dùng mặc định 0. Các cột ảnh có DEFAULT nhưng vẫn cho phép NULL; quy tắc nghiệp vụ về giá trị thiếu chưa đầy đủ. Duration/play_count/sort_order chưa có CHECK không âm; chưa có ràng buộc đồng bộ role–creator_status. Cơ chế soft delete được yêu cầu nhưng FK CASCADE chỉ tác động khi DELETE vật lý.

Cần xác nhận schema đích, ràng buộc đặt tại database hay nghiệp vụ, chính sách xóa vật lý/khôi phục và thứ tự trong playlist. Bản từ điển dữ liệu ghi nguyên SQL hiện có; việc ghi nhận này không chốt giữ nguyên thiết kế. Ảnh hưởng: toàn bộ schema, BR-002/BR-004/BR-008, TC-13/TC-16/TC-19. Người chốt/kết quả: chưa xác định; không có mặc định.
