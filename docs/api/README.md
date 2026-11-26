# Danh mục và quy ước API backend

Danh mục có **39 API-ID**. [Xác nhận DEC-005 ngày 22/11/2026](../decisions/open-decisions.md#evidence-api-contracts-2026-11-22) bổ sung hợp đồng Auth/CSRF, Creator và playlist. Các mục ngoài phạm vi xác nhận giữ `DRAFT` theo ghi chú. Đặc tả hiện được duy trì trong Markdown. Các API nghiệp vụ có trạng thái `NOT_IMPLEMENTED` và `NOT_RUN`.

## Quy ước chung CONFIRMED

- camelCase API/snake_case SQL; email trim/lowercase, thời gian ISO 8601 UTC.
- JSON thành công `{success:true,data:...,message?:...}`; pagination ngoài data. Tạo mới 201/đọc-cập nhật 200/xóa-logout 204 không body. [OTP đăng ký](auth.md#api-01) có status riêng cho tiếp nhận và xác minh. [Yêu cầu OTP reset](auth.md#api-32) trả `202` chung cho email hợp lệ về cú pháp. [Reset](auth.md#api-33) và [đổi mật khẩu](auth.md#api-34) thành công trả `204` không body.
- JSON lỗi `{success:false,error:{code:...,message:...,details?:...}}`. Nhóm chung VALIDATION_ERROR, UNAUTHENTICATED, FORBIDDEN, NOT_FOUND, CONFLICT, RATE_LIMITED, SERVICE_UNAVAILABLE. Giữ TRACK_NOT_AVAILABLE/MEDIA_UNAVAILABLE/SERVICE_UNAVAILABLE riêng audio. Status/code từng nhánh chưa nêu còn DEC-017; nhóm lỗi không tự quyết định mọi mapping.
- Page mặc định 1/limit 10/max 100; query sai 400. Field/query ngoài hợp đồng 400; không tự thêm pagination cho endpoint vốn không có.
- JSON body <=128 KiB; multipart giới hạn riêng MP3/cover 30/5 MiB. PATCH rỗng 400, omitted giữ nguyên, null chỉ xóa field tùy chọn; title/artist/genre không null. Field nullable/required khác còn DEC-017.
- Password 12–128 ký tự/cho khoảng trắng/không trim/không ép ký tự đặc biệt. Lyrics/show notes theo [BR-006](../requirements/business-rules.md#br-006), keyword theo [BR-009](../requirements/business-rules.md#br-009).
- Cookie `soundwave_session` dùng HttpOnly/SameSite=Lax/path=/, với Secure tắt cho HTTP local. JWT HS256/jose + phiên PostgreSQL 24 giờ, quyền lấy từ DB, không refresh. Request ghi cần xác thực gửi `X-CSRF-Token` lấy qua [API-39](auth.md#api-39). Auth trước đăng nhập nhận JSON và kiểm Origin. Chi tiết Origin và cookie Domain thuộc DEC-017.
- Metadata dùng audioUrl, không audioFilePath/storage path. GET audio binary, HEAD không body cả lỗi; Range/no-store/error do [API-28/29](tracks.md#api-28) sở hữu, không áp JSON success vào audio.

## Danh mục endpoint hiện hành

| API | Method | Path | UC | Đặc tả |
| --- | --- | --- | --- | --- |
| [API-01](auth.md#api-01) | `POST` | `/api/auth/register` | UC01 | Trạng thái xác minh và nhánh đăng ký trùng đã chốt |
| [API-02](auth.md#api-02) | `POST` | `/api/auth/login` | UC02 | Lựa chọn chốt; wire DRAFT |
| [API-03](auth.md#api-03) | `POST` | `/api/auth/logout` | UC02 | Lựa chọn chốt; wire DRAFT |
| [API-04](auth.md#api-04) | `GET` | `/api/auth/me` | UC01, UC02 | Lựa chọn chốt; wire DRAFT |
| [API-05](tracks.md#api-05) | `GET` | `/api/tracks` | UC03, UC04 | Lựa chọn chốt; wire DRAFT |
| [API-06](tracks.md#api-06) | `GET` | `/api/tracks/trending` | UC03 | Lựa chọn chốt; wire DRAFT |
| [API-07](tracks.md#api-07) | `GET` | `/api/tracks/:id` | UC04, UC05, UC06 | Lựa chọn chốt; wire DRAFT |
| [API-08](tracks.md#api-08) | `POST` | `/api/tracks/:id/play` | UC05 | Lựa chọn chốt; wire DRAFT |
| [API-09](tracks.md#api-09) | `POST` | `/api/tracks` | UC08 | Lựa chọn chốt; wire DRAFT |
| [API-10](tracks.md#api-10) | `PATCH` | `/api/tracks/:id` | UC09 | Lựa chọn chốt; wire DRAFT |
| [API-11](tracks.md#api-11) | `DELETE` | `/api/tracks/:id` | UC09 | Lựa chọn chốt; wire DRAFT |
| [API-12](tracks.md#api-12) | `GET` | `/api/tracks/my-uploads` | UC09 | Lựa chọn chốt; wire DRAFT |
| [API-13](genres.md#api-13) | `GET` | `/api/genres` | UC04 | Lựa chọn chốt; wire DRAFT |
| [API-14](genres.md#api-14) | `GET` | `/api/genres/:slug` | UC04 | Lựa chọn chốt; wire DRAFT |
| [API-15](playlists.md#api-15) | `GET` | `/api/playlists` | UC07 | Lựa chọn chốt; wire DRAFT |
| [API-16](playlists.md#api-16) | `POST` | `/api/playlists` | UC07 | Lựa chọn chốt; wire DRAFT |
| [API-17](playlists.md#api-17) | `GET` | `/api/playlists/:id` | UC07 | Lựa chọn chốt; wire DRAFT |
| [API-18](playlists.md#api-18) | `PATCH` | `/api/playlists/:id` | UC07 | Lựa chọn chốt; wire DRAFT |
| [API-19](playlists.md#api-19) | `DELETE` | `/api/playlists/:id` | UC07 | Lựa chọn chốt; wire DRAFT |
| [API-20](playlists.md#api-20) | `POST` | `/api/playlists/:id/tracks` | UC07 | Thêm mới, thêm lặp và track không khả dụng đã chốt |
| [API-21](playlists.md#api-21) | `DELETE` | `/api/playlists/:id/tracks/:trackId` | UC07 | Gỡ thành công và gỡ lặp trả 204 |
| [API-22](admin.md#api-22) | `GET` | `/api/admin/users` | UC10 | Lựa chọn chốt; wire DRAFT |
| [API-23](admin.md#api-23) | `PATCH` | `/api/admin/users/:id/status` | UC10 | Lựa chọn chốt; wire DRAFT |
| [API-24](admin.md#api-24) | `GET` | `/api/admin/creators/pending` | UC12 | Response theo hồ sơ, hồ sơ cũ nhất trước |
| [API-25](admin.md#api-25) | `PATCH` | `/api/admin/creators/:id/review` | UC12 | Body, lý do từ chối và status chính đã chốt |
| [API-26](admin.md#api-26) | `GET` | `/api/admin/tracks` | UC11 | Lựa chọn chốt; wire DRAFT |
| [API-27](admin.md#api-27) | `DELETE` | `/api/admin/tracks/:id` | UC11 | Lựa chọn chốt; wire DRAFT |
| [API-28](tracks.md#api-28) | `GET` | `/api/tracks/:id/audio` | UC05 | Contract media chốt; chi tiết ngoài phạm vi DRAFT |
| [API-29](tracks.md#api-29) | `HEAD` | `/api/tracks/:id/audio` | UC05 | Không body cả lỗi; chi tiết ngoài phạm vi DRAFT |
| [API-30](auth.md#api-30) | `POST` | `/api/auth/verify-email` | UC01 | JSON và status xác minh đã chốt |
| [API-31](auth.md#api-31) | `POST` | `/api/auth/resend-verification` | UC01 | JSON và status gửi lại đã chốt |
| [API-32](auth.md#api-32) | `POST` | `/api/auth/forgot-password` | UC02 | Body và JSON phản hồi chung đã chốt |
| [API-33](auth.md#api-33) | `POST` | `/api/auth/reset-password` | UC02 | Body/status chính và lỗi xác minh chung đã chốt |
| [API-34](auth.md#api-34) | `POST` | `/api/auth/change-password` | UC02 | 204 và xóa cookie khi thành công |
| [API-35](creator-applications.md#api-35) | `POST` | `/api/creator-applications` | UC12 | Body, giới hạn trường và response đã chốt |
| [API-36](creator-applications.md#api-36) | `GET` | `/api/creator-applications/me` | UC12 | Lịch sử phân trang, mới nhất trước |
| [API-37](creator-applications.md#api-37) | `PATCH` | `/api/creator/channel` | UC12 | PATCH tên kênh và bio, trả thông tin kênh hiện tại |
| [API-38](playlists.md#api-38) | `PATCH` | `/api/playlists/:id/order` | UC07 | Thứ tự trả về, validation và lỗi khác tập đã chốt |
| [API-39](auth.md#api-39) | `GET` | `/api/auth/csrf` | UC02 | JSON token, no-store và 401 đã chốt |

<a id="contract-gaps"></a>

## Phần còn thiếu sau lựa chọn mới

| Nhóm | Đã chốt | Chi tiết OPEN thực sự còn thiếu |
| --- | --- | --- |
| OTP đăng ký | Body/status và JSON chính của API-01/30/31, hạn mức theo email, vòng đời OTP và lịch dọn. | Lỗi ngoài phần đã chốt thuộc DEC-017; nullability cột `request_ip` cần migration theo DEC-022. |
| OTP reset | Body/status API-32/33, JSON chung kể cả khi Resend lỗi hoặc chạm hạn mức email, vòng đời mã và lịch dọn. | Lỗi ngoài phần đã chốt thuộc DEC-017; hạn mức theo IP thuộc hướng mở rộng. |
| Auth | Định dạng hash scrypt, thay khóa JWT local, cookie phiên, đổi mật khẩu API-34 và response/headers/lỗi phiên API-39. | Cookie Domain, xử lý Origin và phạm vi public mutation thuộc DEC-017. |
| Creator | Trường hồ sơ/kênh, lịch sử, validation và response chính API-24/25/35/36/37. | Lỗi ngoài phần đã chốt và giao dịch review. DEC-017/022. |
| Playlist | API-20/21 thêm-gỡ lặp, API-38 trả thứ tự hiển thị và phân biệt 400/409, UNIQUE lúc commit. | Các trường/lỗi playlist ngoài phần đã chốt và thứ tự khóa giữa playlist và trạng thái track/chủ. DEC-017/022. |
| Lượt nghe | `listenedSeconds >= 10`, cooldown trượt 30 phút, UUID Guest ký HMAC-SHA256 bằng khóa riêng, lượt lặp trả `200` với `counted: false`. | Thuộc tính cookie Guest, validation/response ngoài phần đã chốt và giao dịch đếm thuộc DEC-017/022. |
| Search/text | search_text/100 ký tự-10 từ/AND không thứ tự/escape literal, BR-006 text limits và index mới nhất/trending | Validation nhận diện HTML/đếm ký tự/field/error cụ thể, Trending type shape và protocol đo trước khi cân nhắc `pg_trgm`. DEC-017/015. |
| Media | API-28/29, vòng đời file, phiên bản và giới hạn xử lý local theo DEC-014. | MIME/multipart/xóa cover/retry/conditional HTTP/lỗi phụ và cơ chế active/COMMIT/dọn chống race thuộc DEC-017/022. |

[DEC-010/012/019/021](../decisions/open-decisions.md#evidence-simple-2026-11-17) ACCEPTED ở semantics; không xin chốt lại chúng chỉ vì wire/schema khác còn thiếu. Restore/thay audio/new-releases riêng/users-profile trùng ngoài MVP; không thêm alias cũ. [Schema đích](../architecture/data-model.md#target-model), [truy xuất](../requirements/traceability.md), [kiểm thử](../testing/acceptance.md).
