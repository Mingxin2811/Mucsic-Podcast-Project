# Mô hình dữ liệu hiện có

Phạm vi quan sát: [schema.sql](../../database/schema.sql), chưa thực thi. Bảng này ghi **đúng DDL hiện có**, không phê duyệt schema đích. Hệ quản trị/phiên bản còn [DEC-013](../decisions/open-decisions.md#dec-013); thay đổi ràng buộc ở [DEC-022](../decisions/open-decisions.md#dec-022).

## ERD

```mermaid
erDiagram
    users ||--o{ tracks : creator_id
    users ||--o{ playlists : user_id
    genres ||--o{ tracks : genre_id
    playlists ||--o{ playlist_tracks : playlist_id
    tracks ||--o{ playlist_tracks : track_id
    users {
        int id PK
        varchar email UK
        varchar role
        varchar creator_status
        timestamp deleted_at
    }
    genres {
        int id PK
        varchar name UK
        varchar slug UK
    }
    tracks {
        int id PK
        int creator_id FK
        int genre_id FK
        varchar track_type
        timestamp deleted_at
    }
    playlists {
        int id PK
        int user_id FK
        timestamp deleted_at
    }
    playlist_tracks {
        int playlist_id PK, FK
        int track_id PK, FK
        int sort_order
    }
```

Sơ đồ thể hiện khóa và quan hệ; các bảng bên dưới là từ điển đầy đủ. Một track có đúng một creator và một genre theo FK NOT NULL; bảng liên kết biểu diễn quan hệ nhiều–nhiều playlist/track.

<a id="users"></a>

## USERS

| Cột | Kiểu SQL | NULL | Default/ràng buộc | Ý nghĩa |
| --- | --- | --- | --- | --- |
| id | SERIAL | Không | PK | Định danh tự tăng |
| username | VARCHAR(50) | Không | Không default | Tên hiển thị; không UNIQUE |
| email | VARCHAR(100) | Không | UNIQUE | Email; DDL chưa chuẩn hóa chữ hoa/thường |
| password_hash | VARCHAR(255) | Không | Không default | Chuỗi hash; không có CHECK thuật toán |
| role | VARCHAR(20) | Không | `'listener'`; CHECK listener/creator/admin | Vai trò |
| creator_status | VARCHAR(20) | Không | `'none'`; CHECK none/pending/approved/rejected | Trạng thái hồ sơ |
| channel_name | VARCHAR(100) | Có | NULL | Tên kênh/nghệ danh |
| bio | TEXT | Có | NULL | Giới thiệu kênh |
| avatar_url | VARCHAR(255) | Có | `'/uploads/images/default-avatar.png'` | Tham chiếu ảnh |
| created_at | TIMESTAMP | Không | CURRENT_TIMESTAMP | Thời điểm tạo tài khoản |
| deleted_at | TIMESTAMP | Có | NULL | Thời điểm khóa/xóa mềm |

Không có ngày nộp hồ sơ, lý do từ chối, người review hoặc lịch sử review. Những dữ liệu này thuộc [DEC-007](../decisions/open-decisions.md#dec-007). SQL cũng chưa ràng buộc quan hệ role–creator_status.

<a id="genres"></a>

## GENRES

| Cột | Kiểu SQL | NULL | Default/ràng buộc | Ý nghĩa |
| --- | --- | --- | --- | --- |
| id | SERIAL | Không | PK | Mã thể loại |
| name | VARCHAR(50) | Không | UNIQUE | Tên thể loại |
| slug | VARCHAR(50) | Không | UNIQUE | Khóa đường dẫn thân thiện |
| description | VARCHAR(255) | Có | NULL | Mô tả thể loại |

DDL chưa có CHECK format slug hoặc phân loại genre riêng cho music/podcast.

<a id="tracks"></a>

## TRACKS

| Cột | Kiểu SQL | NULL | Default/ràng buộc | Ý nghĩa |
| --- | --- | --- | --- | --- |
| id | SERIAL | Không | PK | Mã tác phẩm |
| title | VARCHAR(150) | Không | Không default | Tiêu đề |
| artist_name | VARCHAR(100) | Không | Không default | Nghệ sĩ/host, khác người upload |
| audio_file_path | VARCHAR(255) | Không | Không default | Tham chiếu audio |
| cover_image_path | VARCHAR(255) | Có | `'/uploads/images/default-cover.png'` | Tham chiếu cover |
| duration | INT | Không | 0 | Số giây; chưa CHECK không âm |
| track_type | VARCHAR(10) | Không | `'music'`; CHECK music/podcast | Loại tác phẩm |
| play_count | INT | Không | 0 | Lượt nghe; chưa CHECK không âm |
| genre_id | INT | Không | FK genres.id, ON DELETE RESTRICT | Thể loại |
| creator_id | INT | Không | FK users.id, ON DELETE CASCADE | Chủ sở hữu upload |
| created_at | TIMESTAMP | Không | CURRENT_TIMESTAMP | Thời điểm tạo |
| deleted_at | TIMESTAMP | Có | NULL | Thời điểm gỡ |
| lyrics | TEXT | Có | NULL | Lời bài hát |
| description | TEXT | Có | NULL | Mô tả/show notes |

Không có constraint đảm bảo creator đã duyệt, phân biệt lyrics theo type hoặc file tồn tại. Duration, file và format text còn DEC-009/DEC-011/DEC-021. `artist_name` là metadata biểu diễn, không thay thế `creator_id` khi kiểm tra sở hữu.

<a id="playlists"></a>

## PLAYLISTS

| Cột | Kiểu SQL | NULL | Default/ràng buộc | Ý nghĩa |
| --- | --- | --- | --- | --- |
| id | SERIAL | Không | PK | Mã playlist |
| title | VARCHAR(100) | Không | Không default | Tên playlist |
| description | TEXT | Có | NULL | Mô tả |
| cover_image_path | VARCHAR(255) | Có | `'/uploads/images/default-playlist.png'` | Cover |
| user_id | INT | Không | FK users.id, ON DELETE CASCADE | Người sở hữu |
| created_at | TIMESTAMP | Không | CURRENT_TIMESTAMP | Thời điểm tạo |
| deleted_at | TIMESTAMP | Có | NULL | Thời điểm xóa mềm |

Không có cột public/private hoặc unique title theo user. Không thêm các khả năng đó chỉ vì có thể mở rộng schema.

<a id="playlist-tracks"></a>

## PLAYLIST_TRACKS

| Cột | Kiểu SQL | NULL | Default/ràng buộc | Ý nghĩa |
| --- | --- | --- | --- | --- |
| playlist_id | INT | Không | PK ghép; FK playlists.id, ON DELETE CASCADE | Playlist chứa track |
| track_id | INT | Không | PK ghép; FK tracks.id, ON DELETE CASCADE | Track được thêm |
| sort_order | INT | Không | 1 | Vị trí; chưa UNIQUE hoặc CHECK |
| added_at | TIMESTAMP | Không | CURRENT_TIMESTAMP | Thời điểm thêm |

PK `(playlist_id, track_id)` ngăn trùng thành viên, không đảm bảo thứ tự duy nhất. Default 1 là giá trị SQL đã quan sát; phương án 0 vẫn ở DEC-022. Reorder và đồng thời thuộc [DEC-019](../decisions/open-decisions.md#dec-019).

## Index khai báo tường minh

| Tên | Bảng/cột |
| --- | --- |
| idx_users_email | users(email) |
| idx_users_creator_status | users(creator_status) |
| idx_tracks_genre_id | tracks(genre_id) |
| idx_tracks_creator_id | tracks(creator_id) |
| idx_tracks_play_count | tracks(play_count DESC) |
| idx_tracks_type | tracks(track_type) |
| idx_tracks_deleted_at | tracks(deleted_at) |
| idx_playlists_user_id | playlists(user_id) |
| idx_playlist_tracks_track_id | playlist_tracks(track_id) |

PK/UNIQUE còn dẫn tới index do database tạo khi DDL chạy. `users.email` đã UNIQUE và có index tường minh riêng; docs không tự loại index. Chưa có EXPLAIN hay benchmark chứng minh hiệu quả tìm kiếm/filter.

## Giới hạn và tác động thao tác

- Schema bắt đầu bằng DROP TABLE IF EXISTS … CASCADE cho cả năm bảng. Đây là script reset cấu trúc, không phải migration giữ dữ liệu.
- FK RESTRICT ngăn xóa vật lý genre còn track; CASCADE lan khi xóa vật lý user/playlist/track, không lan khi UPDATE deleted_at.
- TIMESTAMP không chỉ định timezone. Quy tắc chuyển sang timestamp API có `Z` còn DEC-017.
- DEFAULT không ngăn NULL trên cột nullable; không suy ra mọi cột ảnh luôn có chuỗi đường dẫn.
- Không có bảng session, OTP, listening history, creator application hoặc audit. Yêu cầu liên quan không được coi đã đáp ứng chỉ bằng năm bảng hiện tại.
- Chuẩn hóa và ràng buộc nghiệp vụ đích chưa được nghiệm thu chỉ từ nhãn “3NF”; không tự tạo migration sửa các khoảng trống.

Hướng dẫn thao tác dữ liệu ở [local setup](../development/local-setup.md); bộ kiểm thử cấu trúc và seed ở [TC-19](../testing/acceptance.md#tc-19).
