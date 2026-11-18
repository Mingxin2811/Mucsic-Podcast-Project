# Danh mục và quy ước API backend

Hiện hành sau [xác nhận phương án đơn giản 17/11/2026](../decisions/open-decisions.md#evidence-simple-2026-11-17): **39 API-ID**, giữ API-01–29/thêm API-30–39. Method/path mới đã chốt nhưng field/response chưa đủ vẫn DRAFT. Tất cả NOT_IMPLEMENTED/NOT_RUN; chưa có OpenAPI hoàn chỉnh.

## Quy ước chung CONFIRMED

- camelCase API/snake_case SQL; email trim/lowercase, thời gian ISO 8601 UTC.
- JSON thành công `{success:true,data:...,message?:...}`; pagination ngoài data. Tạo mới 201/đọc-cập nhật 200/xóa-logout 204 không body. OTP tiếp nhận/gửi/resend/reset chưa có success status chi tiết, không tự suy ra tài khoản đã kích hoạt.
- JSON lỗi `{success:false,error:{code:...,message:...,details?:...}}`. Nhóm chung VALIDATION_ERROR, UNAUTHENTICATED, FORBIDDEN, NOT_FOUND, CONFLICT, RATE_LIMITED, SERVICE_UNAVAILABLE. Giữ TRACK_NOT_AVAILABLE/MEDIA_UNAVAILABLE/SERVICE_UNAVAILABLE riêng audio. Status/code từng nhánh chưa nêu còn DEC-017; nhóm lỗi không tự quyết định mọi mapping.
- Page mặc định 1/limit 10/max 100; query sai 400. Field/query ngoài hợp đồng 400; không tự thêm pagination cho endpoint vốn không có.
- JSON body <=128 KiB; multipart giới hạn riêng MP3/cover 30/5 MiB. PATCH rỗng 400, omitted giữ nguyên, null chỉ xóa field tùy chọn; title/artist/genre không null. Field nullable/required khác còn DEC-017.
- Password 12–128 ký tự/cho khoảng trắng/không trim/không ép ký tự đặc biệt. Lyrics/show notes theo [BR-006](../requirements/business-rules.md#br-006), keyword theo [BR-009](../requirements/business-rules.md#br-009).
- Cookie soundwave_session/HttpOnly/SameSite=Lax/path=/, Secure online, chỉ tắt riêng cho HTTP local. JWT HS256/jose + phiên PostgreSQL 24 giờ/không refresh, quyền DB; không JWT JSON/Bearer. Protected request ghi cần X-CSRF-Token ngẫu nhiên lưu cùng phiên/lấy [API-39](auth.md#api-39); kiểm Origin, auth trước login chỉ JSON/kiểm Origin. Local proxy /api cùng origin. Domain/CSRF response-lifecycle/Origin thiếu-public mutation còn DEC-017.
- Metadata dùng audioUrl, không audioFilePath/storage path. GET audio binary, HEAD không body cả lỗi; Range/no-store/error do [API-28/29](tracks.md#api-28) sở hữu, không áp JSON success vào audio.

## Danh mục endpoint hiện hành

| API | Method | Path | UC | Đặc tả |
| --- | --- | --- | --- | --- |
| [API-01](auth.md#api-01) | `POST` | `/api/auth/register` | UC01 | Lựa chọn chốt; wire DRAFT |
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
| [API-20](playlists.md#api-20) | `POST` | `/api/playlists/:id/tracks` | UC07 | Lựa chọn chốt; wire DRAFT |
| [API-21](playlists.md#api-21) | `DELETE` | `/api/playlists/:id/tracks/:trackId` | UC07 | Lựa chọn chốt; wire DRAFT |
| [API-22](admin.md#api-22) | `GET` | `/api/admin/users` | UC10 | Lựa chọn chốt; wire DRAFT |
| [API-23](admin.md#api-23) | `PATCH` | `/api/admin/users/:id/status` | UC10 | Lựa chọn chốt; wire DRAFT |
| [API-24](admin.md#api-24) | `GET` | `/api/admin/creators/pending` | UC12 | Lựa chọn chốt; wire DRAFT |
| [API-25](admin.md#api-25) | `PATCH` | `/api/admin/creators/:id/review` | UC12 | Lựa chọn chốt; wire DRAFT |
| [API-26](admin.md#api-26) | `GET` | `/api/admin/tracks` | UC11 | Lựa chọn chốt; wire DRAFT |
| [API-27](admin.md#api-27) | `DELETE` | `/api/admin/tracks/:id` | UC11 | Lựa chọn chốt; wire DRAFT |
| [API-28](tracks.md#api-28) | `GET` | `/api/tracks/:id/audio` | UC05 | Contract media chốt; chi tiết ngoài phạm vi DRAFT |
| [API-29](tracks.md#api-29) | `HEAD` | `/api/tracks/:id/audio` | UC05 | Không body cả lỗi; chi tiết ngoài phạm vi DRAFT |
| [API-30](auth.md#api-30) | `POST` | `/api/auth/verify-email` | UC01 | Method/path chốt; wire còn chi tiết |
| [API-31](auth.md#api-31) | `POST` | `/api/auth/resend-verification` | UC01 | Method/path chốt; wire còn chi tiết |
| [API-32](auth.md#api-32) | `POST` | `/api/auth/forgot-password` | UC02 | Method/path chốt; wire còn chi tiết |
| [API-33](auth.md#api-33) | `POST` | `/api/auth/reset-password` | UC02 | Method/path chốt; wire còn chi tiết |
| [API-34](auth.md#api-34) | `POST` | `/api/auth/change-password` | UC02 | Method/path chốt; wire còn chi tiết |
| [API-35](creator-applications.md#api-35) | `POST` | `/api/creator-applications` | UC12 | Method/path chốt; wire còn chi tiết |
| [API-36](creator-applications.md#api-36) | `GET` | `/api/creator-applications/me` | UC12 | Method/path chốt; wire còn chi tiết |
| [API-37](creator-applications.md#api-37) | `PATCH` | `/api/creator/channel` | UC12 | Method/path chốt; wire còn chi tiết |
| [API-38](playlists.md#api-38) | `PATCH` | `/api/playlists/:id/order` | UC07 | Method/path chốt; wire còn chi tiết |
| [API-39](auth.md#api-39) | `GET` | `/api/auth/csrf` | UC02 | Method/path chốt; wire còn chi tiết |

<a id="contract-gaps"></a>

## Phần còn thiếu sau lựa chọn mới

| Nhóm | Đã chốt | Chi tiết OPEN thực sự còn thiếu |
| --- | --- | --- |
| OTP/email | Resend HTTPS/HMAC PostgreSQL/user chưa xác minh/API-30–34 | IP rate limit/counters, timeout/gửi lỗi/đăng ký lại/status-body-response đầy đủ: DEC-003/005/017/022 |
| Auth | HS256/scrypt/cookie/local/CSRF token-header/API-39 | Key lifecycle/hash format, Domain, response-cấp lại-thu hồi CSRF/Origin thiếu/phạm vi public mutation: DEC-014/017/022 |
| Creator | API-35/36/37 và application ID API-25/role DB/hồ sơ lịch sử | Body/field lĩnh vực-lý do/response/mapping trạng thái-kênh/cột/transaction: DEC-005/017/022 |
| Playlist | API-38 ID hiển thị/ẩn cuối-hiện lại cuối/tập đổi 409/UNIQUE lúc commit | Response/validation lỗi, thêm-gỡ lặp, DDL/lock order trạng thái track-chủ: DEC-005/017/022 |
| Lượt nghe | listenedSeconds >=10/trượt 30 phút/Guest UUID ký/login đổi ID/lặp 200-counted:false/giữ bảy ngày | Cookie Guest, numeric/status chưa đủ điều kiện/response đầy đủ/schema/đếm cạnh tranh/job: DEC-014/017/022 |
| Search/text | search_text/100 ký tự-10 từ/AND không thứ tự/escape literal; BR-006 text limits | Validation nhận diện HTML/đếm ký tự/field/error cụ thể, Trending type shape; migration/index/protocol đo: DEC-017/022/015 |
| Media | API-28/29 và lifecycle/ffprobe-FFmpeg-Sharp đã chốt | Versions/timeout/concurrency/ảnh, MIME/multipart/remove cover/retry/conditional HTTP/error phụ, active-COMMIT-dọn chống race: DEC-014/017/022 |

[DEC-010/012/019/021](../decisions/open-decisions.md#evidence-simple-2026-11-17) ACCEPTED ở semantics; không xin chốt lại chúng chỉ vì wire/schema khác còn thiếu. Restore/thay audio/new-releases riêng/users-profile trùng ngoài MVP; không thêm alias cũ. [Schema đích](../architecture/data-model.md#target-model), [truy xuất](../requirements/traceability.md), [kiểm thử](../testing/acceptance.md).
