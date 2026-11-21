# Gom schema nghiệp vụ vào một migration

## Purpose and context

Người dùng yêu cầu hoàn thiện database trong một migration. Khi bắt đầu tác vụ, repo có một migration cho ba bảng tài khoản. Mô hình đích gồm chín bảng nghiệp vụ và bảng lịch sử kỹ thuật `pgmigrations`. [Mô hình dữ liệu](../architecture/data-model.md#target-model), [kết quả bootstrap](../project/status.md#backend-bootstrap-run-2026-11-18).

## Scope and dependencies

Phạm vi là schema chín bảng và kiểm chứng migration trên PostgreSQL 18 thử riêng. API, seed demo, cách lưu lượt giới hạn OTP theo IP và recovery file được quản lý theo DEC-003/009/014/020/022. [Sổ quyết định](../decisions/open-decisions.md#dec-022).

## Progress

- [x] 20/11/2026 Đối chiếu migration hiện có, DDL reset cũ và các quyết định nghiệp vụ.
- [x] 20/11/2026 Chuẩn bị đề xuất schema cho sáu bảng bổ sung.
- [x] 20/11/2026 Người dùng chốt schema và chọn một file cho DB trống.
- [x] 20/11/2026 Viết migration, kiểm thử và cập nhật tài liệu sở hữu.

## Milestones and concrete steps

1. Chốt schema và đích khởi tạo. Phương án được chọn dùng một file trên PostgreSQL 18 trống. Phương án giữ dữ liệu tại chỗ được lưu làm bối cảnh quyết định.
2. Viết DDL theo thứ tự phụ thuộc và cập nhật đường dẫn migration trong tài liệu nếu tên file thay đổi. Dùng runner `node-pg-migrate` hiện có.
3. Áp migration, áp lại và kiểm tra rollback trong DB thử riêng. Ghi kết quả thực tế vào hiện trạng và liên kết TC-19.

## Schema bổ sung được xác nhận

| Bảng | Thiết kế đã xác nhận |
| --- | --- |
| `creator_applications` | `id` integer identity; `user_id` và `reviewed_by` tham chiếu `users`; trạng thái `pending/approved/rejected`; thời điểm nộp/duyệt; lý do từ chối. Lưu riêng tên/bio lúc nộp và tên/bio hiện tại trên hồ sơ đã duyệt để sửa tên kênh mà vẫn giữ lịch sử. Lĩnh vực là một cột text. Unique index có điều kiện bảo đảm tối đa một hồ sơ pending và một hồ sơ approved mỗi user. Suy ra `creatorStatus` từ hồ sơ mới nhất theo ngày nộp rồi ID; dùng `none` khi chưa có hồ sơ. `users.role` tiếp tục là nguồn quyền. |
| `genres` | `id` integer identity; `name` và `slug` bắt buộc, mỗi cột có `UNIQUE`; `description` tùy chọn. |
| `tracks` | `id` integer identity; tên, nghệ sĩ/host, thể loại, chủ upload, `track_type`, `duration`, đường dẫn audio nội bộ và `search_text` bắt buộc. `track_type` thuộc `music/podcast`; duration nguyên dương, `play_count` không âm và mặc định 0. Cover nullable với ảnh mặc định do app cấp. Giữ `created_at`, `deleted_at`, `lyrics` và `description`. Áp giới hạn văn bản đã chốt ở DEC-021. FK tới user và genre dùng `RESTRICT`. Dùng B-tree theo FK và thứ tự mới/trending; cân nhắc `pg_trgm` sau phép đo theo DEC-012. |
| `listen_cooldowns` | `track_id` FK tới track. Mỗi hàng mang đúng một `user_id` FK hoặc `guest_id` UUID. Dùng `UNIQUE NULLS NOT DISTINCT` trên `(track_id, user_id, guest_id)` để bảo đảm một mốc nghe gần nhất cho mỗi cặp. Index thời điểm tính lượt để dọn sau 7 ngày. Giữ tính lượt và cập nhật cooldown cùng transaction khi API được triển khai. |
| `playlists` | `id` integer identity; `user_id` FK tới chủ; tên bắt buộc, mô tả và đường dẫn cover tùy chọn. Giữ `created_at`/`deleted_at`; app cấp ảnh mặc định. Index chủ playlist. |
| `playlist_tracks` | PK `(playlist_id, track_id)`, FK tới playlist và track. `sort_order > 0`, `added_at`, và `UNIQUE (playlist_id, sort_order) DEFERRABLE INITIALLY DEFERRED` để đổi chỗ trong cùng transaction. Unique constraint chỉ kiểm thứ tự lưu. Thứ tự hiển thị track ẩn thuộc luồng reorder của API. |

Đề xuất chung dùng `TIMESTAMPTZ`, FK `ON DELETE RESTRICT` và `text` cho metadata khi giới hạn nghiệp vụ chưa chốt. Giữ nguyên ba bảng tài khoản đã xác nhận. Seed demo chạy riêng. Chi tiết hợp đồng HTTP và thứ tự khóa khi các API cập nhật nhiều bảng thuộc các DEC tương ứng.

PostgreSQL 18 hỗ trợ tính hai giá trị `NULL` là trùng nhau trong unique constraint và kiểm tra unique constraint lúc kết thúc transaction. [Ràng buộc UNIQUE](https://www.postgresql.org/docs/18/ddl-constraints.html#DDL-CONSTRAINTS-UNIQUE-CONSTRAINTS), [CREATE TABLE](https://www.postgresql.org/docs/18/sql-createtable.html).

## Validation and acceptance

Kiểm tra bằng `npm run migrate`, `npm test` và `npm run lint` trong `backend/` khi môi trường thử sẵn sàng. So catalog chín bảng nghiệp vụ. Thử hồ sơ pending trùng, FK sai, CHECK của track, lượt cooldown trùng cho guest/thành viên và đổi thứ tự playlist trong transaction. Chỉ dùng fixture đăng ký thử và DB tạm.

## Recovery and compatibility

File schema chín bảng có tên mới để lịch sử cũ duy trì ý nghĩa. Dùng DB trống riêng nếu đã áp migration ba bảng trên DB khác. SQL reset cũ có thao tác xóa dữ liệu.

## Surprises & Discoveries

Repo chỉ có bằng chứng áp migration ba bảng trong cụm thử đã dọn. Hiện trạng đó chưa xác nhận database do người dùng tự chạy. Phương án giữ tên/bio lúc nộp tách khỏi dữ liệu công khai cần DEC-022 vì API sửa kênh đã duyệt phải giữ lịch sử.

## Decision Log

20/11/2026, người dùng chốt bảng schema trên và chọn gom thành một file cho PostgreSQL 18 trống. [Xác nhận DEC-022](../decisions/open-decisions.md#evidence-single-migration-2026-11-20).

## Outcomes & Retrospective

Đã thay migration bootstrap bằng một file chín bảng. ESLint và 4 kiểm thử qua, áp/retry/down/up thành công trên PostgreSQL 18.4 thử riêng. Đã dọn cụm thử. DB có lịch sử cũ và seed/demo nằm ngoài lần kiểm chứng. [Hiện trạng](../project/status.md#single-database-migration-2026-11-20).
