# API tracks

Các endpoint sau là bản mô tả dự kiến. Đọc [quy ước API](README.md) và các quyết định liên quan trước khi giao việc. Các khối ví dụ giữ cấu trúc được mô tả, chưa chuẩn hóa những khác biệt chưa chốt.

<a id="api-05"></a>

## API-05 Danh sách, tìm kiếm và lọc

`GET /api/tracks`

- Đặc tả: `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC03](../requirements/use-cases.md#uc03), [UC04](../requirements/use-cases.md#uc04).
- Quyền đang được mô tả: `Public`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-004](../requirements/business-rules.md#br-004), [BR-009](../requirements/business-rules.md#br-009). Dữ liệu: [tracks](../architecture/data-model.md#tracks), [genres](../architecture/data-model.md#genres), [users](../architecture/data-model.md#users).
- Quyết định liên quan: [DEC-004](../decisions/open-decisions.md#dec-004), [DEC-012](../decisions/open-decisions.md#dec-012), [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-018](../decisions/open-decisions.md#dec-018).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Query params:
- keyword: string (tìm theo tên bài hát hoặc ca sĩ/host)
- genreId: int (lọc theo ID thể loại)
- type: "music" | "podcast" (lọc theo loại tác phẩm)
- sort: "trending" | "newest" (mặc định "newest")
- page: int (mặc định 1), limit: int (mặc định 10)
```

### Đầu ra minh họa

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. HTTP success status chưa được xác định đầy đủ; xem DEC-017.

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Nơi Này Có Anh",
      "artistName": "Sơn Tùng M-TP",
      "audioFilePath": "/uploads/audio/noi-nay-co-anh.mp3",
      "coverImagePath": "/uploads/images/noi-nay-co-anh.jpg",
      "duration": 260,
      "trackType": "music",
      "playCount": 42100,
      "genre": {
        "id": 2,
        "name": "Pop Ballad",
        "slug": "pop-ballad"
      },
      "creator": {
        "id": 2,
        "username": "Sơn Tùng M-TP",
        "channelName": "M-TP Official"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 12
  }
}
```

### Lỗi đang được mô tả

- 400 Bad Request: Tham số phân trang page/limit không hợp lệ (phải là số nguyên > 0)
- 500 Internal Server Error: Lỗi kết nối CSDL PostgreSQL

Error body và những nhánh lỗi chưa mô tả không được suy ra từ bảng mã lỗi này; xem DEC-017.

### Tác động dữ liệu và giới hạn

Đọc metadata, loại track có deleted_at khác NULL theo mô tả. Query newest/trending chỉ là phương án đang mô tả; semantics tìm không dấu và tie-break còn mở.

Kiểm thử dự kiến: [TC-06](../testing/acceptance.md#tc-06), [TC-07](../testing/acceptance.md#tc-07). Chốt các DEC liên quan trước khi dùng ví dụ này làm hợp đồng triển khai.

<a id="api-06"></a>

## API-06 Trending theo loại tác phẩm

`GET /api/tracks/trending`

- Đặc tả: `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC03](../requirements/use-cases.md#uc03).
- Quyền đang được mô tả: `Public`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-004](../requirements/business-rules.md#br-004), [BR-009](../requirements/business-rules.md#br-009). Dữ liệu: [tracks](../architecture/data-model.md#tracks).
- Quyết định liên quan: [DEC-010](../decisions/open-decisions.md#dec-010), [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-018](../decisions/open-decisions.md#dec-018).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Query params:
- type: "music" | "podcast" (tùy chọn, mặc định trả về cả hai danh mục)
- limit: int (tùy chọn, mặc định 10)
```

### Đầu ra minh họa

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. HTTP success status chưa được xác định đầy đủ; xem DEC-017.

```json
{
  "success": true,
  "data": {
    "music": [
      {
        "id": 1,
        "title": "Nơi Này Có Anh",
        "artistName": "Sơn Tùng M-TP",
        "playCount": 42100,
        "coverImagePath": "..."
      }
    ],
    "podcasts": [
      {
        "id": 10,
        "title": "TÂM SỰ KINH DOANH #88",
        "artistName": "Vietcetera Host",
        "playCount": 11200,
        "coverImagePath": "..."
      }
    ]
  }
}
```

### Lỗi đang được mô tả

- 500 Internal Server Error: Lỗi truy vấn CSDL

Error body và những nhánh lỗi chưa mô tả không được suy ra từ bảng mã lỗi này; xem DEC-017.

### Tác động dữ liệu và giới hạn

Đọc track chưa gỡ theo play_count giảm dần. Mẫu có data.music và data.podcasts; response khi có type query chưa được xác định đầy đủ.

Kiểm thử dự kiến: [TC-06](../testing/acceptance.md#tc-06). Chốt các DEC liên quan trước khi dùng ví dụ này làm hợp đồng triển khai.

<a id="api-07"></a>

## API-07 Chi tiết tác phẩm

`GET /api/tracks/:id`

- Đặc tả: `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC04](../requirements/use-cases.md#uc04), [UC05](../requirements/use-cases.md#uc05), [UC06](../requirements/use-cases.md#uc06).
- Quyền đang được mô tả: `Public`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-004](../requirements/business-rules.md#br-004), [BR-006](../requirements/business-rules.md#br-006). Dữ liệu: [tracks](../architecture/data-model.md#tracks), [genres](../architecture/data-model.md#genres), [users](../architecture/data-model.md#users).
- Quyết định liên quan: [DEC-009](../decisions/open-decisions.md#dec-009), [DEC-011](../decisions/open-decisions.md#dec-011), [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-018](../decisions/open-decisions.md#dec-018), [DEC-021](../decisions/open-decisions.md#dec-021).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Path param: id (int, ID tác phẩm)
```

### Đầu ra minh họa

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. HTTP success status chưa được xác định đầy đủ; xem DEC-017.

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Nơi Này Có Anh",
    "artistName": "Sơn Tùng M-TP",
    "audioFilePath": "/uploads/audio/noi-nay-co-anh.mp3",
    "coverImagePath": "/uploads/images/noi-nay-co-anh.jpg",
    "duration": 260,
    "trackType": "music",
    "playCount": 42100,
    "lyrics": "Lời bài hát mẫu",
    "description": "Mô tả mẫu",
    "genre": {
      "id": 2,
      "name": "Pop Ballad",
      "slug": "pop-ballad"
    },
    "creator": {
      "id": 2,
      "channelName": "M-TP Official"
    }
  }
}
```

### Lỗi đang được mô tả

- 400 Bad Request: ID tác phẩm không đúng định dạng số nguyên
- 404 Not Found: Tác phẩm không tồn tại hoặc đã bị xóa mềm
- 500 Internal Server Error: Lỗi truy vấn CSDL

Error body và những nhánh lỗi chưa mô tả không được suy ra từ bảng mã lỗi này; xem DEC-017.

### Tác động dữ liệu và giới hạn

Đọc metadata, lyrics và show notes. Từ chối track không tồn tại/đã gỡ theo mô tả. Đường dẫn trả về không chứng minh server đã áp dụng chính sách media.

Kiểm thử dự kiến: [TC-08](../testing/acceptance.md#tc-08), [TC-17](../testing/acceptance.md#tc-17). Chốt các DEC liên quan trước khi dùng ví dụ này làm hợp đồng triển khai.

<a id="api-08"></a>

## API-08 Ghi nhận lượt nghe

`POST /api/tracks/:id/play`

- Đặc tả: `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC05](../requirements/use-cases.md#uc05).
- Quyền đang được mô tả: `Public`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-004](../requirements/business-rules.md#br-004), [BR-009](../requirements/business-rules.md#br-009). Dữ liệu: [tracks](../architecture/data-model.md#tracks).
- Quyết định liên quan: [DEC-004](../decisions/open-decisions.md#dec-004), [DEC-009](../decisions/open-decisions.md#dec-009), [DEC-010](../decisions/open-decisions.md#dec-010), [DEC-017](../decisions/open-decisions.md#dec-017).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Path param: id (int, ID tác phẩm)
```

### Đầu ra minh họa

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. HTTP success status chưa được xác định đầy đủ; xem DEC-017.

```json
{
  "success": true,
  "message": "Ghi nhận lượt nghe thành công",
  "playCount": 42101
}
```

### Lỗi đang được mô tả

- 404 Not Found: Tác phẩm không tồn tại
- 500 Internal Server Error: Lỗi cập nhật lượt nghe

Error body và những nhánh lỗi chưa mô tả không được suy ra từ bảng mã lỗi này; xem DEC-017.

### Tác động dữ liệu và giới hạn

Tăng play_count của lượt hợp lệ. Thời điểm tăng ngay hoặc sau 10 giây, chống lặp và điều kiện track bị gỡ chưa được chốt.

Kiểm thử dự kiến: [TC-10](../testing/acceptance.md#tc-10). Chốt các DEC liên quan trước khi dùng ví dụ này làm hợp đồng triển khai.

<a id="api-09"></a>

## API-09 Upload tác phẩm

`POST /api/tracks`

- Đặc tả: `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC08](../requirements/use-cases.md#uc08).
- Quyền đang được mô tả: `Auth(JWT), RequireRole("creator", "admin"), Upload(Multer)`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-001](../requirements/business-rules.md#br-001), [BR-005](../requirements/business-rules.md#br-005), [BR-006](../requirements/business-rules.md#br-006). Dữ liệu: [tracks](../architecture/data-model.md#tracks), [genres](../architecture/data-model.md#genres), [users](../architecture/data-model.md#users).
- Quyết định liên quan: [DEC-004](../decisions/open-decisions.md#dec-004), [DEC-008](../decisions/open-decisions.md#dec-008), [DEC-009](../decisions/open-decisions.md#dec-009), [DEC-011](../decisions/open-decisions.md#dec-011), [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-018](../decisions/open-decisions.md#dec-018), [DEC-021](../decisions/open-decisions.md#dec-021), [DEC-022](../decisions/open-decisions.md#dec-022).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
multipart/form-data:
- audioFile: file .mp3 (bắt buộc, tối đa 30MB)
- coverImage: file ảnh (tùy chọn, .jpg/.png tối đa 5MB)
- title: string (bắt buộc, 1-150 ký tự)
- artistName: string (bắt buộc, tên ca sĩ/người dẫn)
- genreId: int (bắt buộc, ID thể loại)
- trackType: "music" | "podcast" (bắt buộc)
- duration: int (bắt buộc, thời lượng tính bằng giây)
- lyrics: string (tùy chọn, lời bài hát cho music)
- description: string (tùy chọn, show notes/timestamps cho podcast)
```

### Đầu ra minh họa

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. HTTP success status chưa được xác định đầy đủ; xem DEC-017.

```json
{
  "success": true,
  "message": "Tải lên tác phẩm thành công",
  "data": {
    "id": 13,
    "title": "Chúng Ta Của Tương Lai",
    "artistName": "Sơn Tùng M-TP",
    "audioFilePath": "/uploads/audio/track-13.mp3",
    "coverImagePath": "/uploads/images/cover-13.jpg",
    "duration": 245,
    "trackType": "music",
    "genreId": 1,
    "creatorId": 2,
    "createdAt": "2026-11-01T08:30:00Z"
  }
}
```

### Lỗi đang được mô tả

- 400 Bad Request: Thiếu file audio hoặc thiếu metadata bắt buộc (tiêu đề, ca sĩ, thể loại)
- 401 Unauthorized: Chưa đăng nhập
- 403 Forbidden: Tài khoản chưa được duyệt quyền Creator (creator_status != approved)
- 413 Payload Too Large: Dung lượng file vượt quá giới hạn 30MB
- 500 Internal Server Error: Lỗi lưu file local hoặc ghi CSDL

Error body và những nhánh lỗi chưa mô tả không được suy ra từ bảng mã lỗi này; xem DEC-017.

### Tác động dữ liệu và giới hạn

Lưu audio/ảnh và tạo track, creator_id lấy từ người xác thực. Nơi lưu, nguồn duration, kiểm tra file và khôi phục khi DB/file lỗi còn mở. Không lấy quyền sở hữu từ body.

Kiểm thử dự kiến: [TC-09](../testing/acceptance.md#tc-09). Chốt các DEC liên quan trước khi dùng ví dụ này làm hợp đồng triển khai.

<a id="api-10"></a>

## API-10 Cập nhật tác phẩm

`PUT /api/tracks/:id`

- Đặc tả: `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC09](../requirements/use-cases.md#uc09).
- Quyền đang được mô tả: `Auth(JWT), RequireRole("creator", "admin")`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-005](../requirements/business-rules.md#br-005), [BR-006](../requirements/business-rules.md#br-006), [BR-007](../requirements/business-rules.md#br-007). Dữ liệu: [tracks](../architecture/data-model.md#tracks), [genres](../architecture/data-model.md#genres).
- Quyết định liên quan: [DEC-009](../decisions/open-decisions.md#dec-009), [DEC-011](../decisions/open-decisions.md#dec-011), [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-018](../decisions/open-decisions.md#dec-018), [DEC-021](../decisions/open-decisions.md#dec-021).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Path param: id (int)
Body JSON (hoặc multipart nếu cập nhật ảnh bìa mới):
{
  "title": "string (bắt buộc)",
  "artistName": "string (bắt buộc)",
  "genreId": "int (bắt buộc)",
  "lyrics": "string (tùy chọn)",
  "description": "string (tùy chọn)"
}
```

### Đầu ra minh họa

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. HTTP success status chưa được xác định đầy đủ; xem DEC-017.

```json
{
  "success": true,
  "message": "Cập nhật thông tin tác phẩm thành công",
  "data": {
    "id": 1,
    "title": "Nơi Này Có Anh (Remastered)"
  }
}
```

### Lỗi đang được mô tả

- 400 Bad Request: Dữ liệu cập nhật không hợp lệ
- 401 Unauthorized: Chưa xác thực
- 403 Forbidden: Không có quyền sửa tác phẩm của Creator khác
- 404 Not Found: Tác phẩm không tồn tại
- 500 Internal Server Error: Lỗi cập nhật CSDL

Error body và những nhánh lỗi chưa mô tả không được suy ra từ bảng mã lỗi này; xem DEC-017.

### Tác động dữ liệu và giới hạn

Creator sửa metadata tác phẩm của mình; Admin có ngoại lệ theo mô tả. JSON hoặc multipart khi thay ảnh chưa có hợp đồng đầy đủ; không tự hỗ trợ đổi audio.

Kiểm thử dự kiến: [TC-11](../testing/acceptance.md#tc-11). Chốt các DEC liên quan trước khi dùng ví dụ này làm hợp đồng triển khai.

<a id="api-11"></a>

## API-11 Gỡ tác phẩm của Creator

`DELETE /api/tracks/:id`

- Đặc tả: `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC09](../requirements/use-cases.md#uc09).
- Quyền đang được mô tả: `Auth(JWT), RequireRole("creator", "admin")`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-004](../requirements/business-rules.md#br-004), [BR-007](../requirements/business-rules.md#br-007). Dữ liệu: [tracks](../architecture/data-model.md#tracks).
- Quyết định liên quan: [DEC-009](../decisions/open-decisions.md#dec-009), [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-018](../decisions/open-decisions.md#dec-018), [DEC-022](../decisions/open-decisions.md#dec-022).

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
  "message": "Gỡ bỏ tác phẩm thành công"
}
```

### Lỗi đang được mô tả

- 401 Unauthorized: Chưa đăng nhập
- 403 Forbidden: Không có quyền xóa tác phẩm của người khác
- 404 Not Found: Tác phẩm không tồn tại
- 500 Internal Server Error: Lỗi cập nhật

Error body và những nhánh lỗi chưa mô tả không được suy ra từ bảng mã lỗi này; xem DEC-017.

### Tác động dữ liệu và giới hạn

Đặt tracks.deleted_at; không DELETE vật lý theo mô tả. Kiểm tra sở hữu hoặc quyền Admin. Xóa file/thu hồi URL chưa được chốt.

Kiểm thử dự kiến: [TC-11](../testing/acceptance.md#tc-11), [TC-16](../testing/acceptance.md#tc-16), [TC-17](../testing/acceptance.md#tc-17). Chốt các DEC liên quan trước khi dùng ví dụ này làm hợp đồng triển khai.

<a id="api-12"></a>

## API-12 Danh sách tác phẩm của tôi

`GET /api/tracks/creator/my-tracks`

- Đặc tả: `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC09](../requirements/use-cases.md#uc09).
- Quyền đang được mô tả: `Auth(JWT), RequireRole("creator", "admin")`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-004](../requirements/business-rules.md#br-004), [BR-007](../requirements/business-rules.md#br-007). Dữ liệu: [tracks](../architecture/data-model.md#tracks).
- Quyết định liên quan: [DEC-004](../decisions/open-decisions.md#dec-004), [DEC-006](../decisions/open-decisions.md#dec-006), [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-018](../decisions/open-decisions.md#dec-018).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Query params:
- type: "music" | "podcast" (tùy chọn)
- page: int, limit: int
```

### Đầu ra minh họa

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. HTTP success status chưa được xác định đầy đủ; xem DEC-017.

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Nơi Này Có Anh",
      "playCount": 42100,
      "duration": 260,
      "trackType": "music",
      "createdAt": "2026-10-12T08:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 4
  }
}
```

### Lỗi đang được mô tả

- 401 Unauthorized: Chưa đăng nhập
- 403 Forbidden: Tài khoản chưa phải là Creator
- 500 Internal Server Error: Lỗi truy vấn

Error body và những nhánh lỗi chưa mô tả không được suy ra từ bảng mã lỗi này; xem DEC-017.

### Tác động dữ liệu và giới hạn

Đọc theo creator_id của người xác thực và deleted_at IS NULL. Mẫu không quyết định quyền Admin xem tác phẩm người khác qua route cá nhân.

Kiểm thử dự kiến: [TC-11](../testing/acceptance.md#tc-11). Chốt các DEC liên quan trước khi dùng ví dụ này làm hợp đồng triển khai.
