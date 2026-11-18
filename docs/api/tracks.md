# API tracks

Đồng bộ quyết định ngày 17/11/2026. Quy tắc CONFIRMED theo [sổ DEC](../decisions/open-decisions.md#evidence-simple-2026-11-17); field/validation/wire chưa đủ vẫn DRAFT theo [quy ước API](README.md). Ví dụ không phải kết quả chạy hoặc fixture.

<a id="api-05"></a>

## API-05 Danh sách, tìm kiếm và lọc

`GET /api/tracks`

- Đặc tả: lựa chọn nghiệp vụ `CONFIRMED`, wire còn thiếu `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
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

Mã thành công: 200 OK.

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. Envelope và mã thành công theo quy ước đã chốt; required/null và lỗi chi tiết còn DEC-017.

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Nơi Này Có Anh",
      "artistName": "Sơn Tùng M-TP",
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
      },
      "audioUrl": "/api/tracks/1/audio"
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

Bảng lỗi là mapping DRAFT từ đặc tả cũ, chưa bao phủ email/CSRF/DB dịch vụ và mọi nhánh mới. Envelope lỗi đã chọn ở README; code/chi tiết từng lỗi còn DEC-017.

### Tác động dữ liệu và giới hạn

CONFIRMED: chỉ track chưa gỡ và chủ không khóa; newest created_at DESC,id DESC; trending play_count DESC,id DESC. Tìm title/artist/host không phân biệt hoa thường/dấu. search_text/keyword tối đa 100 ký tự-10 từ/mọi từ không cần thứ tự/escape literal theo BR-009; validation field/error còn DEC-017, schema/index DEC-022. audioUrl trỏ API-28; không trả storage path.

Khoảng trống liên quan: [danh mục cần đặc tả](README.md#contract-gaps).

Kiểm thử dự kiến: [TC-06](../testing/acceptance.md#tc-06), [TC-07](../testing/acceptance.md#tc-07). Chỉ phần đã xác nhận là ràng buộc; hoàn tất các ô wire còn thiếu trước triển khai endpoint cuối cùng.

<a id="api-06"></a>

## API-06 Trending theo loại tác phẩm

`GET /api/tracks/trending`

- Đặc tả: lựa chọn nghiệp vụ `CONFIRMED`, wire còn thiếu `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
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

Mã thành công: 200 OK.

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. Envelope và mã thành công theo quy ước đã chốt; required/null và lỗi chi tiết còn DEC-017.

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

Bảng lỗi là mapping DRAFT từ đặc tả cũ, chưa bao phủ email/CSRF/DB dịch vụ và mọi nhánh mới. Envelope lỗi đã chọn ở README; code/chi tiết từng lỗi còn DEC-017.

### Tác động dữ liệu và giới hạn

CONFIRMED: sort play_count DESC,id DESC, loại track gỡ/chủ khóa. Mẫu data.music/data.podcasts là DRAFT cho trường hợp không có type; shape khi lọc một type còn DEC-017.

Khoảng trống liên quan: [danh mục cần đặc tả](README.md#contract-gaps).

Kiểm thử dự kiến: [TC-06](../testing/acceptance.md#tc-06). Chỉ phần đã xác nhận là ràng buộc; hoàn tất các ô wire còn thiếu trước triển khai endpoint cuối cùng.

<a id="api-07"></a>

## API-07 Chi tiết tác phẩm

`GET /api/tracks/:id`

- Đặc tả: lựa chọn nghiệp vụ `CONFIRMED`, wire còn thiếu `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
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

Mã thành công: 200 OK.

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. Envelope và mã thành công theo quy ước đã chốt; required/null và lỗi chi tiết còn DEC-017.

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Nơi Này Có Anh",
    "artistName": "Sơn Tùng M-TP",
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
    },
    "audioUrl": "/api/tracks/1/audio"
  }
}
```

### Lỗi đang được mô tả

- 400 Bad Request: ID tác phẩm không đúng định dạng số nguyên
- 404 Not Found: Tác phẩm không tồn tại hoặc đã bị xóa mềm
- 500 Internal Server Error: Lỗi truy vấn CSDL

Bảng lỗi là mapping DRAFT từ đặc tả cũ, chưa bao phủ email/CSRF/DB dịch vụ và mọi nhánh mới. Envelope lỗi đã chọn ở README; code/chi tiết từng lỗi còn DEC-017.

### Tác động dữ liệu và giới hạn

CONFIRMED: trả metadata plain text và duration server; public không trả track gỡ/chủ khóa. audioUrl trỏ API-28 GET và API-29 HEAD đã chọn; JSON metadata không lộ storage path. Không đồng bộ lyrics. Text music/podcast/HTML/null theo BR-006 đã chốt; nhận diện HTML/đếm ký tự/field khác còn DEC-017.

Khoảng trống liên quan: [danh mục cần đặc tả](README.md#contract-gaps).

Kiểm thử dự kiến: [TC-08](../testing/acceptance.md#tc-08), [TC-17](../testing/acceptance.md#tc-17). Chỉ phần đã xác nhận là ràng buộc; hoàn tất các ô wire còn thiếu trước triển khai endpoint cuối cùng.

<a id="api-08"></a>

## API-08 Ghi nhận lượt nghe

`POST /api/tracks/:id/play`

- Đặc tả: lựa chọn nghiệp vụ `CONFIRMED`, wire còn thiếu `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC05](../requirements/use-cases.md#uc05).
- Quyền đang được mô tả: `Public`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-004](../requirements/business-rules.md#br-004), [BR-009](../requirements/business-rules.md#br-009). Dữ liệu: [tracks](../architecture/data-model.md#tracks).
- Quyết định liên quan: [DEC-004](../decisions/open-decisions.md#dec-004), [DEC-009](../decisions/open-decisions.md#dec-009), [DEC-010](../decisions/open-decisions.md#dec-010), [DEC-017](../decisions/open-decisions.md#dec-017).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Path param: id (int, ID tác phẩm)
Body: {listenedSeconds: giá trị >=10}; numeric validation chi tiết còn DEC-017
```

### Đầu ra minh họa

Mã thành công: 200 OK.

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. Envelope và mã thành công theo quy ước đã chốt; required/null và lỗi chi tiết còn DEC-017.

```json
{
  "success": true,
  "message": "Ghi nhận lượt nghe thành công",
  "data": {
    "counted": true,
    "playCount": 42101
  }
}
```

### Lỗi đang được mô tả

- 404 Not Found: Tác phẩm không tồn tại
- 500 Internal Server Error: Lỗi cập nhật lượt nghe

Bảng lỗi là mapping DRAFT từ đặc tả cũ, chưa bao phủ email/CSRF/DB dịch vụ và mọi nhánh mới. Envelope lỗi đã chọn ở README; code/chi tiết từng lỗi còn DEC-017.

### Tác động dữ liệu và giới hạn

CONFIRMED: client listenedSeconds >=10, server kiểm input/cooldown; trượt 30 phút từ lượt gần nhất. Thành viên user ID, Guest UUID cookie ký; login chuyển user ID chấp nhận có thể thêm lượt. Cooldown/tăng đếm cùng transaction; lặp 200 với data.counted:false, giữ cooldown bảy ngày rồi dọn. Tín hiệu client không chứng minh nghe thật. Cookie/numeric/response đầy đủ (kể cả playCount khi lặp) DEC-014/017, schema/cạnh tranh DEC-022.

Khoảng trống liên quan: [danh mục cần đặc tả](README.md#contract-gaps).

Kiểm thử dự kiến: [TC-10](../testing/acceptance.md#tc-10). Chỉ phần đã xác nhận là ràng buộc; hoàn tất các ô wire còn thiếu trước triển khai endpoint cuối cùng.

<a id="api-09"></a>

## API-09 Upload tác phẩm

`POST /api/tracks`

- Đặc tả: lựa chọn nghiệp vụ `CONFIRMED`, wire còn thiếu `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC08](../requirements/use-cases.md#uc08).
- Quyền đang được mô tả: `Auth(cookie JWT + phiên DB), RequireRole("creator", "admin"), Upload(Multer)`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-001](../requirements/business-rules.md#br-001), [BR-005](../requirements/business-rules.md#br-005), [BR-006](../requirements/business-rules.md#br-006). Dữ liệu: [tracks](../architecture/data-model.md#tracks), [genres](../architecture/data-model.md#genres), [users](../architecture/data-model.md#users).
- Quyết định liên quan: [DEC-004](../decisions/open-decisions.md#dec-004), [DEC-008](../decisions/open-decisions.md#dec-008), [DEC-009](../decisions/open-decisions.md#dec-009), [DEC-011](../decisions/open-decisions.md#dec-011), [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-018](../decisions/open-decisions.md#dec-018), [DEC-021](../decisions/open-decisions.md#dec-021), [DEC-022](../decisions/open-decisions.md#dec-022).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
multipart/form-data:
- audioFile: file .mp3 (bắt buộc, tối đa 30 MiB)
- coverImage: file ảnh (tùy chọn, .jpg/.png tối đa 5 MiB)
- title: string (bắt buộc, 1-150 ký tự)
- artistName: string (bắt buộc, tên ca sĩ/người dẫn)
- genreId: int (bắt buộc, ID thể loại)
- trackType: "music" | "podcast" (bắt buộc)
- lyrics: string (tùy chọn, lời bài hát cho music)
- description: string (tùy chọn, show notes/timestamps cho podcast)
```

### Đầu ra minh họa

Mã thành công: 201 Created.

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. Envelope và mã thành công theo quy ước đã chốt; required/null và lỗi chi tiết còn DEC-017.

```json
{
  "success": true,
  "message": "Tải lên tác phẩm thành công",
  "data": {
    "id": 13,
    "title": "Chúng Ta Của Tương Lai",
    "artistName": "Sơn Tùng M-TP",
    "coverImagePath": "/uploads/images/cover-13.jpg",
    "duration": 245,
    "trackType": "music",
    "genreId": 1,
    "creatorId": 2,
    "createdAt": "2026-11-01T08:30:00Z",
    "audioUrl": "/api/tracks/13/audio"
  }
}
```

### Lỗi đang được mô tả

- 400 Bad Request: Thiếu file audio/metadata bắt buộc hoặc nội dung file không hợp lệ (mã validation chi tiết còn DEC-017)
- 401 Unauthorized: Chưa đăng nhập
- 403 Forbidden: Không phải Admin hoặc Creator approved theo quyền hiện tại
- 413 Payload Too Large: Dung lượng file vượt quá giới hạn 30 MiB
- 500 Internal Server Error: Lỗi lưu file local hoặc ghi CSDL

Bảng lỗi là mapping DRAFT từ đặc tả cũ, chưa bao phủ email/CSRF/DB dịch vụ và mọi nhánh mới. Envelope lỗi đã chọn ở README; code/chi tiết từng lỗi còn DEC-017.

### Tác động dữ liệu và giới hạn

CONFIRMED: MP3 ≤30 MiB, cover JPG/PNG ≤5 MiB; duration đọc server, creator_id từ phiên; Admin không cần approved, Creator cần approved. File local máy chủ: ffprobe/FFmpeg kiểm tra MP3, Sharp kiểm tra/mã hóa lại cover, tên UUID; duration hữu hạn >0 và ceiling INT giây. Vùng tạm/chính cùng filesystem; publish file rồi ghi track/COMMIT mới trả 201. Rollback chắc chắn dọn mới; commit không rõ phải đối chiếu DB. audioUrl trỏ API-28. Xem [vòng đời file](../architecture/security-and-media.md#file-lifecycle); package versions/timeouts/concurrency và lỗi phụ còn DEC-014/DEC-017/DEC-022.

Khoảng trống liên quan: [danh mục cần đặc tả](README.md#contract-gaps).

Kiểm thử dự kiến: [TC-09](../testing/acceptance.md#tc-09). Chỉ phần đã xác nhận là ràng buộc; hoàn tất các ô wire còn thiếu trước triển khai endpoint cuối cùng.

<a id="api-10"></a>

## API-10 Cập nhật tác phẩm

`PATCH /api/tracks/:id`

- Đặc tả: lựa chọn nghiệp vụ `CONFIRMED`, wire còn thiếu `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC09](../requirements/use-cases.md#uc09).
- Quyền đang được mô tả: `Auth(cookie JWT + phiên DB), RequireRole("creator", "admin")`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-005](../requirements/business-rules.md#br-005), [BR-006](../requirements/business-rules.md#br-006), [BR-007](../requirements/business-rules.md#br-007). Dữ liệu: [tracks](../architecture/data-model.md#tracks), [genres](../architecture/data-model.md#genres).
- Quyết định liên quan: [DEC-009](../decisions/open-decisions.md#dec-009), [DEC-011](../decisions/open-decisions.md#dec-011), [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-018](../decisions/open-decisions.md#dec-018), [DEC-021](../decisions/open-decisions.md#dec-021).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Path param: id (int)
Body JSON (hoặc multipart nếu cập nhật ảnh bìa mới):
{
  "title": "string (tùy chọn; bỏ qua giữ nguyên)",
  "artistName": "string (tùy chọn; bỏ qua giữ nguyên)",
  "genreId": "int (tùy chọn; bỏ qua giữ nguyên)",
  "lyrics": "string (tùy chọn)",
  "description": "string (tùy chọn)"
}
```

### Đầu ra minh họa

Mã thành công: 200 OK.

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. Envelope và mã thành công theo quy ước đã chốt; required/null và lỗi chi tiết còn DEC-017.

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

Bảng lỗi là mapping DRAFT từ đặc tả cũ, chưa bao phủ email/CSRF/DB dịch vụ và mọi nhánh mới. Envelope lỗi đã chọn ở README; code/chi tiết từng lỗi còn DEC-017.

### Tác động dữ liệu và giới hạn

CONFIRMED: PATCH metadata/thay cover; omitted giữ nguyên, null chỉ xóa trường cho phép. Creator sửa của mình, Admin mọi track; không đổi chủ/thay audio. Cover mới được kiểm tra/lưu bằng UUID trước; transaction khóa hàng track, cập nhật/commit rồi mới đưa cover cũ vào danh sách dọn. Rollback giữ cover cũ. Không xóa ảnh mặc định/còn tham chiếu; chi tiết tại [vòng đời file](../architecture/security-and-media.md#file-lifecycle). Nullable/remove cover, wire multipart chi tiết và lỗi phụ còn DEC-017; recovery state còn DEC-022.

Khoảng trống liên quan: [danh mục cần đặc tả](README.md#contract-gaps).

Kiểm thử dự kiến: [TC-11](../testing/acceptance.md#tc-11). Chỉ phần đã xác nhận là ràng buộc; hoàn tất các ô wire còn thiếu trước triển khai endpoint cuối cùng.

<a id="api-11"></a>

## API-11 Gỡ tác phẩm của Creator

`DELETE /api/tracks/:id`

- Đặc tả: lựa chọn nghiệp vụ `CONFIRMED`, wire còn thiếu `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC09](../requirements/use-cases.md#uc09).
- Quyền đang được mô tả: `Auth(cookie JWT + phiên DB), RequireRole("creator", "admin")`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-004](../requirements/business-rules.md#br-004), [BR-007](../requirements/business-rules.md#br-007). Dữ liệu: [tracks](../architecture/data-model.md#tracks).
- Quyết định liên quan: [DEC-009](../decisions/open-decisions.md#dec-009), [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-018](../decisions/open-decisions.md#dec-018), [DEC-022](../decisions/open-decisions.md#dec-022).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Path param: id (int)
```

### Đầu ra minh họa

**CONFIRMED: HTTP 204 No Content, không body và không JSON envelope.** Chi tiết cookie/headers nếu có theo DEC-017.

### Lỗi đang được mô tả

- 401 Unauthorized: Chưa đăng nhập
- 403 Forbidden: Không có quyền xóa tác phẩm của người khác
- 404 Not Found: Tác phẩm không tồn tại
- 500 Internal Server Error: Lỗi cập nhật

Bảng lỗi là mapping DRAFT từ đặc tả cũ, chưa bao phủ email/CSRF/DB dịch vụ và mọi nhánh mới. Envelope lỗi đã chọn ở README; code/chi tiết từng lỗi còn DEC-017.

### Tác động dữ liệu và giới hạn

CONFIRMED: soft delete theo sở hữu hoặc quyền Admin, giữ file/hàng/liên kết. Chặn audio mới, request đã bắt đầu được hoàn tất. Thành công 204 không body. Restore và hard delete ngoài MVP; audio đã có API-28/29, thao tác gỡ lặp còn DEC-017.

Khoảng trống liên quan: [danh mục cần đặc tả](README.md#contract-gaps).

Kiểm thử dự kiến: [TC-11](../testing/acceptance.md#tc-11), [TC-16](../testing/acceptance.md#tc-16), [TC-17](../testing/acceptance.md#tc-17). Chỉ phần đã xác nhận là ràng buộc; hoàn tất các ô wire còn thiếu trước triển khai endpoint cuối cùng.

<a id="api-12"></a>

## API-12 Danh sách tác phẩm của tôi

`GET /api/tracks/my-uploads`

- Đặc tả: lựa chọn nghiệp vụ `CONFIRMED`, wire còn thiếu `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC09](../requirements/use-cases.md#uc09).
- Quyền đang được mô tả: `Auth(cookie JWT + phiên DB), RequireRole("creator", "admin")`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
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

Mã thành công: 200 OK.

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. Envelope và mã thành công theo quy ước đã chốt; required/null và lỗi chi tiết còn DEC-017.

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

Bảng lỗi là mapping DRAFT từ đặc tả cũ, chưa bao phủ email/CSRF/DB dịch vụ và mọi nhánh mới. Envelope lỗi đã chọn ở README; code/chi tiết từng lỗi còn DEC-017.

### Tác động dữ liệu và giới hạn

CONFIRMED: /api/tracks/my-uploads đọc creator_id của người xác thực, track chưa gỡ. Admin qua route cá nhân chỉ đọc của mình; quản lý kho qua API-26. Shape/validation còn DEC-017; quyền hiện tại từ DB.

Khoảng trống liên quan: [danh mục cần đặc tả](README.md#contract-gaps).

Kiểm thử dự kiến: [TC-11](../testing/acceptance.md#tc-11). Chỉ phần đã xác nhận là ràng buộc; hoàn tất các ô wire còn thiếu trước triển khai endpoint cuối cùng.


<a id="api-28"></a>

## API-28 Phát audio và single Range

`GET /api/tracks/:id/audio`

- Đặc tả: contract bên dưới `CONFIRMED` ngày 17/11/2026; triển khai `NOT_IMPLEMENTED`, kiểm chứng `NOT_RUN`.
- UC05, [BR-004](../requirements/business-rules.md#br-004)/[BR-005](../requirements/business-rules.md#br-005), [NFR-004](../requirements/quality.md#nfr-004); dữ liệu tracks/users và file máy chủ.
- Quyền: public kể cả Guest khi track chưa gỡ và chủ không khóa. Không dùng cookie hợp lệ để bỏ qua trạng thái public. Request mới kiểm tra DB trước khi mở file; storage path không nhận từ client hoặc trả ra metadata.
- Quyết định: [DEC-009](../decisions/open-decisions.md#dec-009), [DEC-011](../decisions/open-decisions.md#dec-011), [DEC-017](../decisions/open-decisions.md#dec-017); [ADR-0004](../decisions/adr-0004-audio-contract-and-file-lifecycle.md).

### Đầu vào

Path id là định danh track; validation id chi tiết thuộc DEC-017. Range tùy chọn theo byte: một đoạn đóng `bytes=0-1023`, đoạn mở `bytes=1024-`, hoặc suffix `bytes=-1024`. Nhiều khoảng hợp lệ: bỏ qua Range và gửi toàn bộ bằng 200; không triển khai multipart/byteranges trong MVP. Range unit khác bytes, conditional If-Range/validator và giới hạn chi tiết header chưa chốt tại DEC-017.

### Response thành công và header

Audio thành công là **binary**, không JSON success/data envelope.

| Tình huống | Status/body | Header liên quan |
| --- | --- | --- |
| Không Range | 200, toàn bộ file | Content-Type audio/mpeg; Accept-Ranges bytes; Content-Length kích thước file |
| Single Range hợp lệ, có dữ liệu | 206, đúng đoạn byte | Content-Type audio/mpeg; Accept-Ranges bytes; Content-Length độ dài đoạn; Content-Range bytes start-end/size |
| Multi-range hợp lệ | 200, toàn bộ file | Như full 200; bỏ qua Range |

Tất cả response của endpoint dùng `Cache-Control: no-store`. Không dùng redirect sang static file hoặc URL lưu trữ. `audioUrl` trong API-05/07/09 trỏ endpoint này.

### Lỗi và lỗi trong stream

| Tình huống | Status | Error code/body |
| --- | --- | --- |
| Track không có/đã gỡ hoặc chủ khóa | 404 | TRACK_NOT_AVAILABLE trong envelope JSON chung |
| DB còn track hợp lệ nhưng file mất/không đọc được | 503 | MEDIA_UNAVAILABLE, ghi log nội bộ |
| DB không khả dụng | 503 | SERVICE_UNAVAILABLE |
| Range sai cú pháp | 400 | Envelope JSON; mã validation còn DEC-017 |
| Single Range hợp lệ nhưng nằm ngoài file | 416 | Content-Range bytes */size; JSON error envelope, error code còn DEC-017 |

Lỗi trước khi gửi audio dùng JSON error envelope; mã cụ thể của 400/416 còn DEC-017; không lộ path nội bộ. Nếu lỗi sau khi đã gửi header/audio: đóng stream và ghi log, không đổi status hoặc chèn JSON vào audio. Chính sách status/header trên chỉ được chốt cho audio, không tự áp vào toàn bộ API.

### Gỡ/khóa và kiểm chứng

Sau commit gỡ/khóa, từ chối request mới; request đã bắt đầu được hoàn tất. no-store không thu hồi byte hoặc buffer đã tải. Không tăng play_count chỉ vì GET audio; sự kiện lượt nghe vẫn API-08/DEC-010.

[TC-08](../testing/acceptance.md#tc-08)/[TC-17](../testing/acceptance.md#tc-17)/[TC-21](../testing/acceptance.md#tc-21). Header/error wire ngoài phần đã chọn, conditional HTTP và chính sách ảnh còn DEC-017; không hứa đã kiểm chứng seek thực tế.

<a id="api-29"></a>

## API-29 Kiểm tra header audio

`HEAD /api/tracks/:id/audio`

- Đặc tả: `CONFIRMED` trong phạm vi dưới đây; triển khai `NOT_IMPLEMENTED`, kiểm chứng `NOT_RUN`.
- UC05, [BR-004](../requirements/business-rules.md#br-004), [NFR-004](../requirements/quality.md#nfr-004); [DEC-009](../decisions/open-decisions.md#dec-009), [DEC-017](../decisions/open-decisions.md#dec-017).
- Public theo cùng điều kiện track/chủ như API-28. Kiểm tra DB và khả năng mở file trước header; không tăng lượt nghe.

### Request/response

Path id theo API-28. **Bỏ qua Range**, trả header tương ứng GET toàn bộ file nhưng **không body**, kể cả lỗi. Khi file hợp lệ: 200, Content-Type audio/mpeg, Accept-Ranges bytes, Content-Length kích thước toàn file và Cache-Control no-store.

Track không có/gỡ/chủ khóa: 404; file mất/không đọc được: 503; DB lỗi: 503, đều không JSON body. Error code của GET không được đưa thành body HEAD; header lỗi bổ sung chưa được chọn ở DEC-017. Không có response 206/416 chỉ do HEAD có Range.

Kiểm chứng [TC-08](../testing/acceptance.md#tc-08)/[TC-17](../testing/acceptance.md#tc-17); mọi HEAD phải không body. Không tự tạo API metadata mới hoặc route cover.

Chính sách text của API-07/09/10: [BR-006](../requirements/business-rules.md#br-006); scrypt/HS256/CSRF/search/lượt nghe mới tại [xác nhận](../decisions/open-decisions.md#evidence-simple-2026-11-17). Multer là lựa chọn upload đã chốt, chưa có package hoặc middleware thực thi.
