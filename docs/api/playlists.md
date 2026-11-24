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

CONFIRMED: chỉ chủ; không đọc playlist đã xóa. Track gỡ/chủ khóa bị loại, vẫn giữ liên kết; đọc thứ tự liên tục từ 1. Không thay đổi liên kết chỉ vì lọc hiển thị. [API-38](#api-38) nhận và trả thứ tự ID hiển thị; wire của API-17 còn DEC-017 và thứ tự khóa còn DEC-022.

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

Đặc tả `CONFIRMED` trong phạm vi ghi dưới. Triển khai `NOT_IMPLEMENTED`, kiểm chứng `NOT_RUN`. Chỉ chủ playlist chưa xóa, kể cả Admin chỉ sửa playlist của mình. Cookie, CSRF và Origin theo [quy ước API](README.md).

Path `:id` là ID playlist. Body nhận `{trackId}` với `trackId` là số nguyên bắt buộc. Thêm lần đầu trả `201` và đưa track vào cuối danh sách. Thêm lại track đang hiển thị trả `200` với vị trí hiện tại và giữ nguyên liên kết. Cả hai trả `data: {playlistId, trackId, sortOrder}`. Track không khả dụng, gồm track bị ẩn hoặc đã gỡ, trả `404 NOT_FOUND`.

Thao tác khóa playlist trong transaction. Thứ tự hiển thị bắt đầu từ 1; track ẩn không xuất hiện và không tính vào số track. Thứ tự khóa giữa playlist và trạng thái track/chủ thuộc DEC-022; lỗi HTTP ngoài phần đã chốt thuộc DEC-017. [DEC-005](../decisions/open-decisions.md#dec-005), [TC-13](../testing/acceptance.md#tc-13)/[TC-14](../testing/acceptance.md#tc-14).

<a id="api-21"></a>

## API-21 Gỡ track khỏi playlist

`DELETE /api/playlists/:id/tracks/:trackId`

Đặc tả `CONFIRMED` trong phạm vi ghi dưới. Triển khai `NOT_IMPLEMENTED`, kiểm chứng `NOT_RUN`. Chỉ chủ playlist chưa xóa, kể cả Admin chỉ sửa playlist của mình. Cookie, CSRF và Origin theo [quy ước API](README.md).

Path `:id` và `:trackId` lần lượt là ID playlist và ID track. Sau khi kiểm tra playlist tồn tại, chưa xóa và thuộc người gọi, trả `204` không body khi gỡ thành công hoặc khi liên kết đã vắng. Khi liên kết tồn tại, xóa liên kết và đánh lại thứ tự trong transaction khóa playlist. Track được giữ lại trong kho.

Lỗi quyền và tài nguyên ngoài phần đã chốt thuộc DEC-017; thứ tự khóa thuộc DEC-022. [DEC-005](../decisions/open-decisions.md#dec-005), [TC-13](../testing/acceptance.md#tc-13)/[TC-14](../testing/acceptance.md#tc-14).

<a id="api-38"></a>

## API-38 Sắp thứ tự playlist

`PATCH /api/playlists/:id/order`

Đặc tả `CONFIRMED` theo [DEC-019](../decisions/open-decisions.md#dec-019) và [DEC-005](../decisions/open-decisions.md#dec-005). Triển khai `NOT_IMPLEMENTED`, kiểm chứng `NOT_RUN`. Chỉ chủ playlist chưa xóa, kể cả Admin chỉ sửa playlist của mình. Cookie, CSRF và Origin theo [quy ước API](README.md).

Body nhận `{trackIds}`, là mảng số nguyên dương không trùng, chứa toàn bộ ID đang hiển thị. Mảng sai kiểu, phần tử sai kiểu hoặc trùng ID trả `400 VALIDATION_ERROR`. Backend khóa playlist và so tập ID với tập đang hiển thị. Tập khác trả `409 CONFLICT` để client tải lại. Mảng rỗng thành công khi playlist không có track hiển thị.

Trả `200` với `data: {playlistId, trackIds}`, trong đó `trackIds` theo thứ tự hiển thị đã lưu. Liên kết ẩn giữ ở cuối và hiện lại ở cuối; các track hiển thị được đọc theo thứ tự liên tục từ 1. Hai lượt reorder hợp lệ chạy tuần tự, lần hoàn tất sau quyết định thứ tự cuối. DDL đã có UNIQUE kiểm tại commit. Thứ tự khóa với trạng thái track/chủ còn DEC-022. [Schema](../architecture/data-model.md#target-model), [TC-13](../testing/acceptance.md#tc-13)/[TC-14](../testing/acceptance.md#tc-14).
