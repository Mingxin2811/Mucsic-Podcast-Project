# Danh mục API backend

Trạng thái đặc tả: `DRAFT`. Có **27 endpoint đang được mô tả**, chia năm nhóm. Chưa có route được triển khai hoặc kiểm chứng trong checkout ở mốc [status](../project/status.md). Danh mục này là cơ sở kiểm kê, không phải bằng chứng đủ mọi chức năng hoặc phê duyệt 27 hợp đồng.

## Quy ước đọc hợp đồng

- Mỗi API-ID cố định cho một nghiệp vụ; route/method có thể thay đổi sau quyết định. Dấu slash cuối router được bỏ trong danh mục để trình bày; chính sách HTTP trailing slash chưa xác định.
- Đầu vào ghi kiểu/điều kiện hiện có. Response JSON là ví dụ cấu trúc; sự có mặt của một trường trong mẫu không tự chốt required/nullable, enum toàn cục hoặc HTTP success status.
- Các mẫu có `success`, `message`, `data`, nhưng envelope và pagination không hoàn toàn đồng nhất. Chưa đặt error schema, giới hạn phân trang hay cách serialize timestamp mới; xem [DEC-017](../decisions/open-decisions.md#dec-017).
- `Auth(JWT)` mô tả header `Authorization: Bearer <token>` theo thiết kế; quyền hiện tại, token cũ và trạng thái user theo [DEC-006](../decisions/open-decisions.md#dec-006). `RequireRole` chưa là middleware tồn tại.
- SQL dùng snake_case và ví dụ API dùng camelCase; không giả định serializer đã có. Kiểu SERIAL/INT trong DB không tự chốt validation HTTP.
- Không có OpenAPI trong đợt này. Chỉ tạo đặc tả máy đọc được sau khi xác nhận hợp đồng và các quyết định liên quan.

## Endpoint đang được mô tả

| API | Method | Path đang mô tả | UC | Đặc tả |
| --- | --- | --- | --- | --- |
| [API-01](auth.md#api-01) | `POST` | `/api/auth/register` | UC01 | DRAFT |
| [API-02](auth.md#api-02) | `POST` | `/api/auth/login` | UC02 | DRAFT |
| [API-03](auth.md#api-03) | `POST` | `/api/auth/logout` | UC02 | DRAFT |
| [API-04](auth.md#api-04) | `GET` | `/api/auth/me` | UC01, UC02 | DRAFT |
| [API-05](tracks.md#api-05) | `GET` | `/api/tracks` | UC03, UC04 | DRAFT |
| [API-06](tracks.md#api-06) | `GET` | `/api/tracks/trending` | UC03 | DRAFT |
| [API-07](tracks.md#api-07) | `GET` | `/api/tracks/:id` | UC04, UC05, UC06 | DRAFT |
| [API-08](tracks.md#api-08) | `POST` | `/api/tracks/:id/play` | UC05 | DRAFT |
| [API-09](tracks.md#api-09) | `POST` | `/api/tracks` | UC08 | DRAFT |
| [API-10](tracks.md#api-10) | `PUT` | `/api/tracks/:id` | UC09 | DRAFT |
| [API-11](tracks.md#api-11) | `DELETE` | `/api/tracks/:id` | UC09 | DRAFT |
| [API-12](tracks.md#api-12) | `GET` | `/api/tracks/creator/my-tracks` | UC09 | DRAFT |
| [API-13](genres.md#api-13) | `GET` | `/api/genres` | UC04 | DRAFT |
| [API-14](genres.md#api-14) | `GET` | `/api/genres/:slug` | UC04 | DRAFT |
| [API-15](playlists.md#api-15) | `GET` | `/api/playlists` | UC07 | DRAFT |
| [API-16](playlists.md#api-16) | `POST` | `/api/playlists` | UC07 | DRAFT |
| [API-17](playlists.md#api-17) | `GET` | `/api/playlists/:id` | UC07 | DRAFT |
| [API-18](playlists.md#api-18) | `PUT` | `/api/playlists/:id` | UC07 | DRAFT |
| [API-19](playlists.md#api-19) | `DELETE` | `/api/playlists/:id` | UC07 | DRAFT |
| [API-20](playlists.md#api-20) | `POST` | `/api/playlists/:id/tracks` | UC07 | DRAFT |
| [API-21](playlists.md#api-21) | `DELETE` | `/api/playlists/:id/tracks/:trackId` | UC07 | DRAFT |
| [API-22](admin.md#api-22) | `GET` | `/api/admin/users` | UC10 | DRAFT |
| [API-23](admin.md#api-23) | `PATCH` | `/api/admin/users/:id/status` | UC10 | DRAFT |
| [API-24](admin.md#api-24) | `GET` | `/api/admin/creators/pending` | UC12 | DRAFT |
| [API-25](admin.md#api-25) | `PATCH` | `/api/admin/creators/:id/review` | UC12 | DRAFT |
| [API-26](admin.md#api-26) | `GET` | `/api/admin/tracks` | UC11 | DRAFT |
| [API-27](admin.md#api-27) | `DELETE` | `/api/admin/tracks/:id` | UC11 | DRAFT |

## Các biến thể và khoảng trống

[DEC-004](../decisions/open-decisions.md#dec-004) giữ các phương án upload `/api/tracks/upload`, lượt nghe `PATCH /api/tracks/:id/play-count`, danh sách của tôi `/api/tracks/my-uploads` và `/api/tracks/new-releases`, so với những route đang liệt kê. Không tự thêm alias hoặc đếm các biến thể là endpoint đã được chốt.

OTP/reset mật khẩu còn [DEC-003](../decisions/open-decisions.md#dec-003). Hồ sơ cá nhân, gửi/gửi lại hồ sơ Creator, reorder playlist, khôi phục tác phẩm và đổi mật khẩu còn [DEC-005](../decisions/open-decisions.md#dec-005). Hợp đồng HTTP phục vụ media còn [DEC-009](../decisions/open-decisions.md#dec-009). Những khoảng trống này được ghi nhận nhưng không được bổ sung bằng endpoint hay trường dữ liệu tự chọn.

Thông tin API được quản lý tại từng trang nhóm; nghiệp vụ ở [use case](../requirements/use-cases.md), cấu trúc SQL ở [data model](../architecture/data-model.md), cách kiểm chứng ở [acceptance](../testing/acceptance.md).
