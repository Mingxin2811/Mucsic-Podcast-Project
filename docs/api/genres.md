# API genres

Đồng bộ quyết định ngày 17/11/2026. Quy tắc CONFIRMED theo [sổ DEC](../decisions/open-decisions.md#evidence-simple-2026-11-17); field/validation/wire chưa đủ vẫn DRAFT theo [quy ước API](README.md). Ví dụ không phải kết quả chạy hoặc fixture.

<a id="api-13"></a>

## API-13 Danh sách thể loại

`GET /api/genres`

- Đặc tả: lựa chọn nghiệp vụ `CONFIRMED`, wire còn thiếu `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC04](../requirements/use-cases.md#uc04).
- Quyền đang được mô tả: `Public`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-009](../requirements/business-rules.md#br-009). Dữ liệu: [genres](../architecture/data-model.md#genres).
- Quyết định liên quan: [DEC-017](../decisions/open-decisions.md#dec-017).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Không có
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
      "name": "V-Pop",
      "slug": "v-pop",
      "description": "Nhạc Pop thịnh hành..."
    },
    {
      "id": 5,
      "name": "Talkshow & Tâm Sự",
      "slug": "talkshow-tam-su",
      "description": "Đối thoại chân thành..."
    }
  ]
}
```

### Lỗi đang được mô tả

- 500 Internal Server Error: Lỗi truy vấn CSDL

Bảng lỗi là mapping DRAFT từ đặc tả cũ, chưa bao phủ email/CSRF/DB dịch vụ và mọi nhánh mới. Envelope lỗi đã chọn ở README; code/chi tiết từng lỗi còn DEC-017.

### Tác động dữ liệu và giới hạn

Đọc danh mục thể loại; không có API tạo/sửa/xóa genre trong danh sách này. Field validation còn DRAFT; phân trang toàn cục không tự tạo query cho endpoint vốn không có pagination.

Khoảng trống liên quan: [danh mục cần đặc tả](README.md#contract-gaps).

Kiểm thử dự kiến: [TC-07](../testing/acceptance.md#tc-07). Chỉ phần đã xác nhận là ràng buộc; hoàn tất các ô wire còn thiếu trước triển khai endpoint cuối cùng.

<a id="api-14"></a>

## API-14 Chi tiết thể loại theo slug

`GET /api/genres/:slug`

- Đặc tả: lựa chọn nghiệp vụ `CONFIRMED`, wire còn thiếu `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC04](../requirements/use-cases.md#uc04).
- Quyền đang được mô tả: `Public`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-004](../requirements/business-rules.md#br-004), [BR-009](../requirements/business-rules.md#br-009). Dữ liệu: [genres](../architecture/data-model.md#genres), [tracks](../architecture/data-model.md#tracks).
- Quyết định liên quan: [DEC-012](../decisions/open-decisions.md#dec-012), [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-018](../decisions/open-decisions.md#dec-018).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Path param: slug (string, URL thân thiện ví dụ: "v-pop")
Query params: page, limit, sort ("trending"|"newest")
```

### Đầu ra minh họa

Mã thành công: 200 OK.

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. Envelope và mã thành công theo quy ước đã chốt; required/null và lỗi chi tiết còn DEC-017.

```json
{
  "success": true,
  "data": {
    "genre": {
      "id": 1,
      "name": "V-Pop",
      "slug": "v-pop",
      "description": "..."
    },
    "tracks": [
      {
        "id": 2,
        "title": "Lạc Trôi",
        "artistName": "Sơn Tùng M-TP",
        "playCount": 34500
      }
    ]
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 2
  }
}
```

### Lỗi đang được mô tả

- 404 Not Found: Thể loại không tồn tại
- 500 Internal Server Error: Lỗi truy vấn

Bảng lỗi là mapping DRAFT từ đặc tả cũ, chưa bao phủ email/CSRF/DB dịch vụ và mọi nhánh mới. Envelope lỗi đã chọn ở README; code/chi tiết từng lỗi còn DEC-017.

### Tác động dữ liệu và giới hạn

CONFIRMED: pagination ở cấp ngoài theo quy ước chung, đọc genre và track được phép hiển thị. Sort ổn định và loại chủ khóa; keyword BR-009 đã chốt; nullable/query khác còn DEC-017.

Khoảng trống liên quan: [danh mục cần đặc tả](README.md#contract-gaps).

Kiểm thử dự kiến: [TC-07](../testing/acceptance.md#tc-07). Chỉ phần đã xác nhận là ràng buộc; hoàn tất các ô wire còn thiếu trước triển khai endpoint cuối cùng.
