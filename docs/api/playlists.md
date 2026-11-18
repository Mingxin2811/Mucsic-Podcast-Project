# API playlists

Đồng bộ quyết định ngày 17/11/2026. Quy tắc CONFIRMED theo [sổ DEC](../decisions/open-decisions.md#evidence-simple-2026-11-17); field/validation/wire chưa đủ vẫn DRAFT theo [quy ước API](README.md). Ví dụ không phải kết quả chạy hoặc fixture.

<a id="api-15"></a>

## API-15 Danh sách playlist của tôi

`GET /api/playlists`

- Đặc tả: lựa chọn nghiệp vụ `CONFIRMED`, wire còn thiếu `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC07](../requirements/use-cases.md#uc07).
- Quyền đang được mô tả: `Auth(cookie JWT + phiên DB)`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-004](../requirements/business-rules.md#br-004), [BR-007](../requirements/business-rules.md#br-007). Dữ liệu: [playlists](../architecture/data-model.md#playlists), [playlist_tracks](../architecture/data-model.md#playlist-tracks).
- Quyết định liên quan: [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-018](../decisions/open-decisions.md#dec-018), [DEC-019](../decisions/open-decisions.md#dec-019).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Không có body; dùng cookie phiên. Protected request ghi gửi X-CSRF-Token/kiểm Origin theo quy ước; response/lifecycle còn DEC-017.
```

### Đầu ra minh họa

Mã thành công: 200 OK.

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. Envelope và mã thành công theo quy ước đã chốt; required/null và lỗi chi tiết còn DEC-017.

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

Bảng lỗi là mapping DRAFT từ đặc tả cũ, chưa bao phủ email/CSRF/DB dịch vụ và mọi nhánh mới. Envelope lỗi đã chọn ở README; code/chi tiết từng lỗi còn DEC-017.

### Tác động dữ liệu và giới hạn

CONFIRMED: playlist của user xác thực, chưa xóa; trackCount chỉ đếm track chưa gỡ/chủ không khóa. Admin không được đọc playlist người khác; thứ tự danh sách created_at giảm dần từ mô tả cũ vẫn DRAFT.

Khoảng trống liên quan: [danh mục cần đặc tả](README.md#contract-gaps).

Kiểm thử dự kiến: [TC-12](../testing/acceptance.md#tc-12), [TC-14](../testing/acceptance.md#tc-14). Chỉ phần đã xác nhận là ràng buộc; hoàn tất các ô wire còn thiếu trước triển khai endpoint cuối cùng.

<a id="api-16"></a>

## API-16 Tạo playlist

`POST /api/playlists`

- Đặc tả: lựa chọn nghiệp vụ `CONFIRMED`, wire còn thiếu `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC07](../requirements/use-cases.md#uc07).
- Quyền đang được mô tả: `Auth(cookie JWT + phiên DB)`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
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

Mã thành công: 201 Created.

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. Envelope và mã thành công theo quy ước đã chốt; required/null và lỗi chi tiết còn DEC-017.

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

Bảng lỗi là mapping DRAFT từ đặc tả cũ, chưa bao phủ email/CSRF/DB dịch vụ và mọi nhánh mới. Envelope lỗi đã chọn ở README; code/chi tiết từng lỗi còn DEC-017.

### Tác động dữ liệu và giới hạn

CONFIRMED: tạo playlist gắn user xác thực, thiếu ảnh dùng mặc định; 201. Không public/private; giới hạn tên/field null còn DRAFT theo DEC-017/DEC-022.

Khoảng trống liên quan: [danh mục cần đặc tả](README.md#contract-gaps).

Kiểm thử dự kiến: [TC-12](../testing/acceptance.md#tc-12). Chỉ phần đã xác nhận là ràng buộc; hoàn tất các ô wire còn thiếu trước triển khai endpoint cuối cùng.

<a id="api-17"></a>

## API-17 Chi tiết playlist cá nhân

`GET /api/playlists/:id`

- Đặc tả: lựa chọn nghiệp vụ `CONFIRMED`, wire còn thiếu `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC07](../requirements/use-cases.md#uc07).
- Quyền đang được mô tả: `Auth(cookie JWT + phiên DB)`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-004](../requirements/business-rules.md#br-004), [BR-007](../requirements/business-rules.md#br-007), [BR-008](../requirements/business-rules.md#br-008). Dữ liệu: [playlists](../architecture/data-model.md#playlists), [playlist_tracks](../architecture/data-model.md#playlist-tracks), [tracks](../architecture/data-model.md#tracks).
- Quyết định liên quan: [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-018](../decisions/open-decisions.md#dec-018), [DEC-019](../decisions/open-decisions.md#dec-019).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Path param: id (int)
```

### Đầu ra minh họa

Mã thành công: 200 OK.

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. Envelope và mã thành công theo quy ước đã chốt; required/null và lỗi chi tiết còn DEC-017.

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

Bảng lỗi là mapping DRAFT từ đặc tả cũ, chưa bao phủ email/CSRF/DB dịch vụ và mọi nhánh mới. Envelope lỗi đã chọn ở README; code/chi tiết từng lỗi còn DEC-017.

### Tác động dữ liệu và giới hạn

CONFIRMED: chỉ chủ; không đọc playlist đã xóa. Track gỡ/chủ khóa bị loại, vẫn giữ liên kết; đọc thứ tự liên tục từ 1. Không thay đổi liên kết chỉ vì lọc hiển thị. API-38 reorder ID hiển thị/ẩn cuối-hiện lại cuối đã chốt; response/schema còn DEC-005/017/022.

Khoảng trống liên quan: [danh mục cần đặc tả](README.md#contract-gaps).

Kiểm thử dự kiến: [TC-12](../testing/acceptance.md#tc-12), [TC-14](../testing/acceptance.md#tc-14), [TC-16](../testing/acceptance.md#tc-16). Chỉ phần đã xác nhận là ràng buộc; hoàn tất các ô wire còn thiếu trước triển khai endpoint cuối cùng.

<a id="api-18"></a>

## API-18 Đổi tên và mô tả playlist

`PATCH /api/playlists/:id`

- Đặc tả: lựa chọn nghiệp vụ `CONFIRMED`, wire còn thiếu `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC07](../requirements/use-cases.md#uc07).
- Quyền đang được mô tả: `Auth(cookie JWT + phiên DB)`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-007](../requirements/business-rules.md#br-007). Dữ liệu: [playlists](../architecture/data-model.md#playlists).
- Quyết định liên quan: [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-019](../decisions/open-decisions.md#dec-019).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Path param: id (int)
Body JSON:
{
  "title": "string (tùy chọn; bỏ qua giữ nguyên)",
  "description": "string (tùy chọn)"
}
```

### Đầu ra minh họa

Mã thành công: 200 OK.

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. Envelope và mã thành công theo quy ước đã chốt; required/null và lỗi chi tiết còn DEC-017.

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

Bảng lỗi là mapping DRAFT từ đặc tả cũ, chưa bao phủ email/CSRF/DB dịch vụ và mọi nhánh mới. Envelope lỗi đã chọn ở README; code/chi tiết từng lỗi còn DEC-017.

### Tác động dữ liệu và giới hạn

CONFIRMED: chủ PATCH title/description trên playlist chưa xóa; omitted giữ nguyên, null chỉ xóa field được cho phép. PATCH rỗng 400 đã chốt; nullable field cụ thể/lỗi còn DEC-017; không can thiệp playlist người khác kể cả Admin.

Khoảng trống liên quan: [danh mục cần đặc tả](README.md#contract-gaps).

Kiểm thử dự kiến: [TC-12](../testing/acceptance.md#tc-12), [TC-14](../testing/acceptance.md#tc-14). Chỉ phần đã xác nhận là ràng buộc; hoàn tất các ô wire còn thiếu trước triển khai endpoint cuối cùng.

<a id="api-19"></a>

## API-19 Xóa mềm playlist

`DELETE /api/playlists/:id`

- Đặc tả: lựa chọn nghiệp vụ `CONFIRMED`, wire còn thiếu `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC07](../requirements/use-cases.md#uc07).
- Quyền đang được mô tả: `Auth(cookie JWT + phiên DB)`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-004](../requirements/business-rules.md#br-004), [BR-007](../requirements/business-rules.md#br-007). Dữ liệu: [playlists](../architecture/data-model.md#playlists).
- Quyết định liên quan: [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-019](../decisions/open-decisions.md#dec-019), [DEC-022](../decisions/open-decisions.md#dec-022).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Path param: id (int)
```

### Đầu ra minh họa

**CONFIRMED: HTTP 204 No Content, không body và không JSON envelope.** Chi tiết cookie/headers nếu có theo DEC-017.

### Lỗi đang được mô tả

- 401 Unauthorized: Chưa đăng nhập
- 403 Forbidden: Không có quyền xóa playlist của người khác
- 404 Not Found: Playlist không tồn tại
- 500 Internal Server Error: Lỗi cập nhật

Bảng lỗi là mapping DRAFT từ đặc tả cũ, chưa bao phủ email/CSRF/DB dịch vụ và mọi nhánh mới. Envelope lỗi đã chọn ở README; code/chi tiết từng lỗi còn DEC-017.

### Tác động dữ liệu và giới hạn

CONFIRMED: soft delete playlist đúng chủ, giữ track/liên kết; thành công 204 không body, không sửa playlist đã xóa. Restore ngoài MVP, thao tác lặp còn DEC-017/DEC-019.

Khoảng trống liên quan: [danh mục cần đặc tả](README.md#contract-gaps).

Kiểm thử dự kiến: [TC-12](../testing/acceptance.md#tc-12), [TC-14](../testing/acceptance.md#tc-14), [TC-16](../testing/acceptance.md#tc-16). Chỉ phần đã xác nhận là ràng buộc; hoàn tất các ô wire còn thiếu trước triển khai endpoint cuối cùng.

<a id="api-20"></a>

## API-20 Thêm track vào playlist

`POST /api/playlists/:id/tracks`

- Đặc tả: lựa chọn nghiệp vụ `CONFIRMED`, wire còn thiếu `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC07](../requirements/use-cases.md#uc07).
- Quyền đang được mô tả: `Auth(cookie JWT + phiên DB)`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
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

Mã thành công: 201 Created.

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. Envelope và mã thành công theo quy ước đã chốt; required/null và lỗi chi tiết còn DEC-017.

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

Bảng lỗi là mapping DRAFT từ đặc tả cũ, chưa bao phủ email/CSRF/DB dịch vụ và mọi nhánh mới. Envelope lỗi đã chọn ở README; code/chi tiết từng lỗi còn DEC-017.

### Tác động dữ liệu và giới hạn

CONFIRMED: chỉ chủ playlist chưa xóa; liên kết không trùng; thêm cuối từ 1 và khóa playlist trong transaction. Track gỡ/ẩn không hiện/không tính count. UNIQUE thứ tự kiểm lúc commit đã chọn; thêm track ẩn/lặp và giao dịch chi tiết còn DEC-017/022, MAX+1 đơn lẻ chưa đủ.

Khoảng trống liên quan: [danh mục cần đặc tả](README.md#contract-gaps).

Kiểm thử dự kiến: [TC-13](../testing/acceptance.md#tc-13), [TC-14](../testing/acceptance.md#tc-14). Chỉ phần đã xác nhận là ràng buộc; hoàn tất các ô wire còn thiếu trước triển khai endpoint cuối cùng.

<a id="api-21"></a>

## API-21 Gỡ track khỏi playlist

`DELETE /api/playlists/:id/tracks/:trackId`

- Đặc tả: lựa chọn nghiệp vụ `CONFIRMED`, wire còn thiếu `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC07](../requirements/use-cases.md#uc07).
- Quyền đang được mô tả: `Auth(cookie JWT + phiên DB)`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
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

**CONFIRMED: HTTP 204 No Content, không body và không JSON envelope.** Chi tiết cookie/headers nếu có theo DEC-017.

### Lỗi đang được mô tả

- 401 Unauthorized: Chưa đăng nhập
- 403 Forbidden: Không có quyền can thiệp playlist này
- 404 Not Found: Không tìm thấy bài hát trong playlist
- 500 Internal Server Error: Lỗi xóa dữ liệu

Bảng lỗi là mapping DRAFT từ đặc tả cũ, chưa bao phủ email/CSRF/DB dịch vụ và mọi nhánh mới. Envelope lỗi đã chọn ở README; code/chi tiết từng lỗi còn DEC-017.

### Tác động dữ liệu và giới hạn

CONFIRMED: chỉ chủ playlist chưa xóa; xóa liên kết, không xóa track, đánh lại thứ tự trong transaction khóa playlist. Thành công 204 không body; ẩn cuối/hiện lại cuối theo API-38; lỗi gỡ lặp còn DEC-017, schema/lock order DEC-022.

Khoảng trống liên quan: [danh mục cần đặc tả](README.md#contract-gaps).

Kiểm thử dự kiến: [TC-13](../testing/acceptance.md#tc-13), [TC-14](../testing/acceptance.md#tc-14). Chỉ phần đã xác nhận là ràng buộc; hoàn tất các ô wire còn thiếu trước triển khai endpoint cuối cùng.

<a id="api-38"></a>

## API-38 Sắp thứ tự playlist

`PATCH /api/playlists/:id/order`

CONFIRMED theo [DEC-019](../decisions/open-decisions.md#dec-019)/[xác nhận mới](../decisions/open-decisions.md#evidence-simple-2026-11-17), UC07/BR-007/008; NOT_IMPLEMENTED/NOT_RUN. Chỉ chủ playlist chưa xóa, kể cả Admin chỉ của mình; cookie/CSRF/Origin theo [quy ước](README.md).

Body CONFIRMED `{trackIds:[...]}` là toàn bộ ID **đang hiển thị**, thay mọi liên kết trước đây. Backend khóa playlist/kiểm đúng tập hiển thị; giữ liên kết track ẩn ở cuối/hiện lại cuối, đọc thứ tự liên tục/từ 1, không đếm track ẩn. Tập track thay đổi trả 409 để tải lại. Hai reorder hợp lệ tuần tự, lần hoàn tất sau quyết định cuối; UNIQUE thứ tự kiểm lúc commit.

Success 200 theo PATCH, response đầy đủ/validation array-ID trùng-ID sai/lỗi khác còn DEC-005/017. DDL deferred/lock order với trạng thái track-chủ còn DEC-022; không tự tạo revision/ETag hoặc hứa mọi thay đổi cạnh tranh đều 409. [TC-13](../testing/acceptance.md#tc-13)/[TC-14](../testing/acceptance.md#tc-14).
