# API playlists

Các endpoint sau là bản mô tả dự kiến. Đọc [quy ước API](README.md) và các quyết định liên quan trước khi giao việc. Các khối ví dụ giữ cấu trúc được mô tả, chưa chuẩn hóa những khác biệt chưa chốt.

<a id="api-15"></a>

## API-15 Danh sách playlist của tôi

`GET /api/playlists`

- Đặc tả: `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC07](../requirements/use-cases.md#uc07).
- Quyền đang được mô tả: `Auth(JWT)`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-004](../requirements/business-rules.md#br-004), [BR-007](../requirements/business-rules.md#br-007). Dữ liệu: [playlists](../architecture/data-model.md#playlists), [playlist_tracks](../architecture/data-model.md#playlist-tracks).
- Quyết định liên quan: [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-018](../decisions/open-decisions.md#dec-018), [DEC-019](../decisions/open-decisions.md#dec-019).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Không có (Truyền Token trong Header)
```

### Đầu ra minh họa

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. HTTP success status chưa được xác định đầy đủ; xem DEC-017.

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Nhạc Chill Học Bài & Lập Trình",
      "description": "Giai điệu nhẹ nhàng tăng tập trung...",
      "coverImagePath": "/uploads/images/playlist-study.jpg",
      "trackCount": 4,
      "createdAt": "2026-10-18T09:00:00Z"
    }
  ]
}
```

### Lỗi đang được mô tả

- 401 Unauthorized: Chưa đăng nhập
- 500 Internal Server Error: Lỗi truy vấn CSDL

Error body và những nhánh lỗi chưa mô tả không được suy ra từ bảng mã lỗi này; xem DEC-017.

### Tác động dữ liệu và giới hạn

Đọc playlist theo user_id và deleted_at IS NULL, mô tả thứ tự created_at giảm dần. Cách tính trackCount khi track đã bị gỡ chưa chốt.

Kiểm thử dự kiến: [TC-12](../testing/acceptance.md#tc-12), [TC-14](../testing/acceptance.md#tc-14). Chốt các DEC liên quan trước khi dùng ví dụ này làm hợp đồng triển khai.

<a id="api-16"></a>

## API-16 Tạo playlist

`POST /api/playlists`

- Đặc tả: `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC07](../requirements/use-cases.md#uc07).
- Quyền đang được mô tả: `Auth(JWT)`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-007](../requirements/business-rules.md#br-007). Dữ liệu: [playlists](../architecture/data-model.md#playlists).
- Quyết định liên quan: [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-022](../decisions/open-decisions.md#dec-022).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
{
  "title": "string (bắt buộc, 1-100 ký tự)",
  "description": "string (tùy chọn)"
}
```

### Đầu ra minh họa

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. HTTP success status chưa được xác định đầy đủ; xem DEC-017.

```json
{
  "success": true,
  "message": "Tạo playlist thành công",
  "data": {
    "id": 5,
    "title": "Podcast Buổi Sáng",
    "description": "Những bài học ngắn đầu ngày",
    "coverImagePath": "/uploads/images/default-playlist.png",
    "userId": 6,
    "createdAt": "2026-11-01T08:00:00Z"
  }
}
```

### Lỗi đang được mô tả

- 400 Bad Request: Tiêu đề playlist để trống hoặc quá 100 ký tự
- 401 Unauthorized: Chưa đăng nhập
- 500 Internal Server Error: Lỗi lưu CSDL

Error body và những nhánh lỗi chưa mô tả không được suy ra từ bảng mã lỗi này; xem DEC-017.

### Tác động dữ liệu và giới hạn

Tạo playlist, user_id lấy từ người xác thực; cover mặc định theo DDL hiện có. Không hỗ trợ public/private trong hợp đồng này.

Kiểm thử dự kiến: [TC-12](../testing/acceptance.md#tc-12). Chốt các DEC liên quan trước khi dùng ví dụ này làm hợp đồng triển khai.

<a id="api-17"></a>

## API-17 Chi tiết playlist cá nhân

`GET /api/playlists/:id`

- Đặc tả: `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC07](../requirements/use-cases.md#uc07).
- Quyền đang được mô tả: `Auth(JWT)`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-004](../requirements/business-rules.md#br-004), [BR-007](../requirements/business-rules.md#br-007), [BR-008](../requirements/business-rules.md#br-008). Dữ liệu: [playlists](../architecture/data-model.md#playlists), [playlist_tracks](../architecture/data-model.md#playlist-tracks), [tracks](../architecture/data-model.md#tracks).
- Quyết định liên quan: [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-018](../decisions/open-decisions.md#dec-018), [DEC-019](../decisions/open-decisions.md#dec-019).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Path param: id (int)
```

### Đầu ra minh họa

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. HTTP success status chưa được xác định đầy đủ; xem DEC-017.

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Nhạc Chill Học Bài & Lập Trình",
    "description": "Giai điệu nhẹ nhàng...",
    "userId": 6,
    "tracks": [
      {
        "id": 6,
        "title": "Lạ Lùng",
        "artistName": "Vũ.",
        "duration": 258,
        "sortOrder": 1,
        "addedAt": "2026-10-18T09:10:00Z"
      },
      {
        "id": 5,
        "title": "Bước Qua Nhau",
        "artistName": "Vũ.",
        "duration": 257,
        "sortOrder": 2,
        "addedAt": "2026-10-19T10:00:00Z"
      }
    ]
  }
}
```

### Lỗi đang được mô tả

- 401 Unauthorized: Chưa đăng nhập
- 403 Forbidden: Không có quyền xem playlist của tài khoản khác
- 404 Not Found: Playlist không tồn tại hoặc đã bị xóa
- 500 Internal Server Error: Lỗi truy vấn

Error body và những nhánh lỗi chưa mô tả không được suy ra từ bảng mã lỗi này; xem DEC-017.

### Tác động dữ liệu và giới hạn

Kiểm tra chủ sở hữu, đọc thành viên theo sort_order. Track bị gỡ, playlist bị xóa và thứ tự trùng cần chốt semantics.

Kiểm thử dự kiến: [TC-12](../testing/acceptance.md#tc-12), [TC-14](../testing/acceptance.md#tc-14), [TC-16](../testing/acceptance.md#tc-16). Chốt các DEC liên quan trước khi dùng ví dụ này làm hợp đồng triển khai.

<a id="api-18"></a>

## API-18 Đổi tên và mô tả playlist

`PUT /api/playlists/:id`

- Đặc tả: `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC07](../requirements/use-cases.md#uc07).
- Quyền đang được mô tả: `Auth(JWT)`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-007](../requirements/business-rules.md#br-007). Dữ liệu: [playlists](../architecture/data-model.md#playlists).
- Quyết định liên quan: [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-019](../decisions/open-decisions.md#dec-019).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Path param: id (int)
Body JSON:
{
  "title": "string (bắt buộc)",
  "description": "string (tùy chọn)"
}
```

### Đầu ra minh họa

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. HTTP success status chưa được xác định đầy đủ; xem DEC-017.

```json
{
  "success": true,
  "message": "Cập nhật playlist thành công",
  "data": {
    "id": 1,
    "title": "Nhạc Chill Học Bài & Code Đồ Án"
  }
}
```

### Lỗi đang được mô tả

- 400 Bad Request: Tiêu đề playlist để trống
- 401 Unauthorized: Chưa đăng nhập
- 403 Forbidden: Không phải playlist của tài khoản này
- 404 Not Found: Playlist không tồn tại
- 500 Internal Server Error: Lỗi cập nhật

Error body và những nhánh lỗi chưa mô tả không được suy ra từ bảng mã lỗi này; xem DEC-017.

### Tác động dữ liệu và giới hạn

Chỉ chủ sở hữu cập nhật title/description. Mẫu dùng PUT nhưng chưa xác định omitted/null và cập nhật trên playlist đã xóa.

Kiểm thử dự kiến: [TC-12](../testing/acceptance.md#tc-12), [TC-14](../testing/acceptance.md#tc-14). Chốt các DEC liên quan trước khi dùng ví dụ này làm hợp đồng triển khai.

<a id="api-19"></a>

## API-19 Xóa mềm playlist

`DELETE /api/playlists/:id`

- Đặc tả: `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC07](../requirements/use-cases.md#uc07).
- Quyền đang được mô tả: `Auth(JWT)`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-004](../requirements/business-rules.md#br-004), [BR-007](../requirements/business-rules.md#br-007). Dữ liệu: [playlists](../architecture/data-model.md#playlists).
- Quyết định liên quan: [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-019](../decisions/open-decisions.md#dec-019), [DEC-022](../decisions/open-decisions.md#dec-022).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Path param: id (int)
```

### Đầu ra minh họa

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. HTTP success status chưa được xác định đầy đủ; xem DEC-017.

```json
{
  "success": true,
  "message": "Xóa playlist thành công"
}
```

### Lỗi đang được mô tả

- 401 Unauthorized: Chưa đăng nhập
- 403 Forbidden: Không có quyền xóa playlist của người khác
- 404 Not Found: Playlist không tồn tại
- 500 Internal Server Error: Lỗi cập nhật

Error body và những nhánh lỗi chưa mô tả không được suy ra từ bảng mã lỗi này; xem DEC-017.

### Tác động dữ liệu và giới hạn

Đặt deleted_at, giữ track và liên kết theo mô tả. Hành vi lặp lại thao tác và khả năng khôi phục chưa xác định.

Kiểm thử dự kiến: [TC-12](../testing/acceptance.md#tc-12), [TC-14](../testing/acceptance.md#tc-14), [TC-16](../testing/acceptance.md#tc-16). Chốt các DEC liên quan trước khi dùng ví dụ này làm hợp đồng triển khai.

<a id="api-20"></a>

## API-20 Thêm track vào playlist

`POST /api/playlists/:id/tracks`

- Đặc tả: `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC07](../requirements/use-cases.md#uc07).
- Quyền đang được mô tả: `Auth(JWT)`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-007](../requirements/business-rules.md#br-007), [BR-008](../requirements/business-rules.md#br-008). Dữ liệu: [playlists](../architecture/data-model.md#playlists), [playlist_tracks](../architecture/data-model.md#playlist-tracks), [tracks](../architecture/data-model.md#tracks).
- Quyết định liên quan: [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-019](../decisions/open-decisions.md#dec-019), [DEC-022](../decisions/open-decisions.md#dec-022).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Path param: id (int, playlist_id)
Body JSON:
{
  "trackId": "int (bắt buộc)"
}
```

### Đầu ra minh họa

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. HTTP success status chưa được xác định đầy đủ; xem DEC-017.

```json
{
  "success": true,
  "message": "Đã thêm bài hát vào playlist",
  "data": {
    "playlistId": 1,
    "trackId": 3,
    "sortOrder": 5
  }
}
```

### Lỗi đang được mô tả

- 400 Bad Request: Bài hát này đã có sẵn trong playlist (Trùng khóa chính phức hợp)
- 401 Unauthorized: Chưa đăng nhập
- 403 Forbidden: Không có quyền sửa playlist của người khác
- 404 Not Found: Bài hát hoặc Playlist không tồn tại
- 500 Internal Server Error: Lỗi ghi CSDL

Error body và những nhánh lỗi chưa mô tả không được suy ra từ bảng mã lỗi này; xem DEC-017.

### Tác động dữ liệu và giới hạn

Kiểm tra sở hữu và sự tồn tại; tạo liên kết. Có ý định sort_order = MAX + 1, nhưng đồng thời/tài nguyên đã gỡ còn mở; PK ngăn trùng thành viên.

Kiểm thử dự kiến: [TC-13](../testing/acceptance.md#tc-13), [TC-14](../testing/acceptance.md#tc-14). Chốt các DEC liên quan trước khi dùng ví dụ này làm hợp đồng triển khai.

<a id="api-21"></a>

## API-21 Gỡ track khỏi playlist

`DELETE /api/playlists/:id/tracks/:trackId`

- Đặc tả: `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC07](../requirements/use-cases.md#uc07).
- Quyền đang được mô tả: `Auth(JWT)`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-007](../requirements/business-rules.md#br-007), [BR-008](../requirements/business-rules.md#br-008). Dữ liệu: [playlists](../architecture/data-model.md#playlists), [playlist_tracks](../architecture/data-model.md#playlist-tracks).
- Quyết định liên quan: [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-019](../decisions/open-decisions.md#dec-019).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Path params:
- id: int (playlist_id)
- trackId: int (track_id)
```

### Đầu ra minh họa

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. HTTP success status chưa được xác định đầy đủ; xem DEC-017.

```json
{
  "success": true,
  "message": "Đã gỡ bài hát khỏi playlist thành công"
}
```

### Lỗi đang được mô tả

- 401 Unauthorized: Chưa đăng nhập
- 403 Forbidden: Không có quyền can thiệp playlist này
- 404 Not Found: Không tìm thấy bài hát trong playlist
- 500 Internal Server Error: Lỗi xóa dữ liệu

Error body và những nhánh lỗi chưa mô tả không được suy ra từ bảng mã lỗi này; xem DEC-017.

### Tác động dữ liệu và giới hạn

Xóa liên kết playlist_id/track_id; không xóa track. Có dồn lại sort_order hay không chưa được chốt.

Kiểm thử dự kiến: [TC-13](../testing/acceptance.md#tc-13), [TC-14](../testing/acceptance.md#tc-14). Chốt các DEC liên quan trước khi dùng ví dụ này làm hợp đồng triển khai.
