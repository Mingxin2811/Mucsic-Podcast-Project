# API genres

Các endpoint sau là bản mô tả dự kiến. Đọc [quy ước API](README.md) và các quyết định liên quan trước khi giao việc. Các khối ví dụ giữ cấu trúc được mô tả, chưa chuẩn hóa những khác biệt chưa chốt.

<a id="api-13"></a>

## API-13 Danh sách thể loại

`GET /api/genres`

- Đặc tả: `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
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

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. HTTP success status chưa được xác định đầy đủ; xem DEC-017.

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

Error body và những nhánh lỗi chưa mô tả không được suy ra từ bảng mã lỗi này; xem DEC-017.

### Tác động dữ liệu và giới hạn

Đọc id/name/slug/description của danh mục. Không có hợp đồng tạo/sửa/xóa genre trong danh sách 27 endpoint.

Kiểm thử dự kiến: [TC-07](../testing/acceptance.md#tc-07). Chốt các DEC liên quan trước khi dùng ví dụ này làm hợp đồng triển khai.

<a id="api-14"></a>

## API-14 Chi tiết thể loại theo slug

`GET /api/genres/:slug`

- Đặc tả: `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
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

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. HTTP success status chưa được xác định đầy đủ; xem DEC-017.

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
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 2
    }
  }
}
```

### Lỗi đang được mô tả

- 404 Not Found: Thể loại không tồn tại
- 500 Internal Server Error: Lỗi truy vấn

Error body và những nhánh lỗi chưa mô tả không được suy ra từ bảng mã lỗi này; xem DEC-017.

### Tác động dữ liệu và giới hạn

Đọc genre và track thuộc genre. Giữ pagination trong data như mẫu hiện có; chưa tự chuẩn hóa sang envelope khác. Quy tắc ẩn track áp dụng theo BR-004.

Kiểm thử dự kiến: [TC-07](../testing/acceptance.md#tc-07). Chốt các DEC liên quan trước khi dùng ví dụ này làm hợp đồng triển khai.
