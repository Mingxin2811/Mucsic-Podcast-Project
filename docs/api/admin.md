# API admin

Các endpoint sau là bản mô tả dự kiến. Đọc [quy ước API](README.md) và các quyết định liên quan trước khi giao việc. Các khối ví dụ giữ cấu trúc được mô tả, chưa chuẩn hóa những khác biệt chưa chốt.

<a id="api-22"></a>

## API-22 Danh sách tài khoản

`GET /api/admin/users`

- Đặc tả: `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC10](../requirements/use-cases.md#uc10).
- Quyền đang được mô tả: `Auth(JWT), RequireRole("admin")`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-001](../requirements/business-rules.md#br-001), [BR-003](../requirements/business-rules.md#br-003). Dữ liệu: [users](../architecture/data-model.md#users).
- Quyết định liên quan: [DEC-012](../decisions/open-decisions.md#dec-012), [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-018](../decisions/open-decisions.md#dec-018).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Query params:
- role: "listener" | "creator" | "admin" (tùy chọn)
- status: "active" | "banned" (tùy chọn)
- keyword: string (tìm theo email, username)
- page: int, limit: int
```

### Đầu ra minh họa

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. HTTP success status chưa được xác định đầy đủ; xem DEC-017.

```json
{
  "success": true,
  "data": [
    {
      "id": 2,
      "username": "Sơn Tùng M-TP",
      "email": "sontung@mtp.vn",
      "role": "creator",
      "creatorStatus": "approved",
      "channelName": "M-TP Official",
      "createdAt": "2026-10-07T08:00:00Z",
      "deletedAt": null
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 8
  }
}
```

### Lỗi đang được mô tả

- 401 Unauthorized: Chưa đăng nhập
- 403 Forbidden: Chỉ Quản trị viên mới có quyền truy cập
- 500 Internal Server Error: Lỗi truy vấn CSDL

Error body và những nhánh lỗi chưa mô tả không được suy ra từ bảng mã lỗi này; xem DEC-017.

### Tác động dữ liệu và giới hạn

Admin đọc tài khoản, lọc role/trạng thái/từ khóa và phân trang. Không trả password_hash. Quy tắc keyword/giới hạn phân trang còn mở.

Kiểm thử dự kiến: [TC-15](../testing/acceptance.md#tc-15). Chốt các DEC liên quan trước khi dùng ví dụ này làm hợp đồng triển khai.

<a id="api-23"></a>

## API-23 Khóa và mở khóa tài khoản

`PATCH /api/admin/users/:id/status`

- Đặc tả: `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC10](../requirements/use-cases.md#uc10).
- Quyền đang được mô tả: `Auth(JWT), RequireRole("admin")`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-001](../requirements/business-rules.md#br-001), [BR-003](../requirements/business-rules.md#br-003), [BR-004](../requirements/business-rules.md#br-004). Dữ liệu: [users](../architecture/data-model.md#users).
- Quyết định liên quan: [DEC-006](../decisions/open-decisions.md#dec-006), [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-018](../decisions/open-decisions.md#dec-018), [DEC-022](../decisions/open-decisions.md#dec-022).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Path param: id (int, user_id)
Body JSON:
{
  "action": "ban" | "unban"
}
```

### Đầu ra minh họa

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. HTTP success status chưa được xác định đầy đủ; xem DEC-017.

```json
{
  "success": true,
  "message": "Khóa tài khoản người dùng thành công",
  "data": {
    "id": 8,
    "deletedAt": "2026-11-01T08:00:00Z"
  }
}
```

### Lỗi đang được mô tả

- 400 Bad Request: Hành động không hợp lệ hoặc Admin tự khóa chính mình
- 401 Unauthorized: Chưa đăng nhập
- 403 Forbidden: Không đủ quyền hạn Admin
- 404 Not Found: Người dùng không tồn tại
- 500 Internal Server Error: Lỗi cập nhật CSDL

Error body và những nhánh lỗi chưa mô tả không được suy ra từ bảng mã lỗi này; xem DEC-017.

### Tác động dữ liệu và giới hạn

action ban đặt deleted_at, unban đặt NULL. Không cho Admin tự khóa mình theo mô tả. Phiên đang tồn tại và ảnh hưởng tới nội dung cần chốt.

Kiểm thử dự kiến: [TC-05](../testing/acceptance.md#tc-05), [TC-15](../testing/acceptance.md#tc-15). Chốt các DEC liên quan trước khi dùng ví dụ này làm hợp đồng triển khai.

<a id="api-24"></a>

## API-24 Hồ sơ Creator chờ duyệt

`GET /api/admin/creators/pending`

- Đặc tả: `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC12](../requirements/use-cases.md#uc12).
- Quyền đang được mô tả: `Auth(JWT), RequireRole("admin")`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-001](../requirements/business-rules.md#br-001), [BR-002](../requirements/business-rules.md#br-002). Dữ liệu: [users](../architecture/data-model.md#users).
- Quyết định liên quan: [DEC-002](../decisions/open-decisions.md#dec-002), [DEC-007](../decisions/open-decisions.md#dec-007), [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-018](../decisions/open-decisions.md#dec-018).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Query params: page: int, limit: int
```

### Đầu ra minh họa

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. HTTP success status chưa được xác định đầy đủ; xem DEC-017.

```json
{
  "success": true,
  "data": [
    {
      "id": 4,
      "username": "Vũ. (Hoàng Thái Vũ)",
      "email": "vu.hoang@indie.vn",
      "channelName": "Hoàng Tử Indie",
      "bio": "Nghệ sĩ độc lập mang đến những bản tình ca mộc mạc...",
      "createdAt": "2026-10-30T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1
  }
}
```

### Lỗi đang được mô tả

- 401 Unauthorized: Chưa đăng nhập
- 403 Forbidden: Yêu cầu quyền Quản trị viên
- 500 Internal Server Error: Lỗi truy vấn

Error body và những nhánh lỗi chưa mô tả không được suy ra từ bảng mã lỗi này; xem DEC-017.

### Tác động dữ liệu và giới hạn

Đọc creator_status pending và user chưa khóa; ý định sắp created_at tăng dần. createdAt là ngày tạo user, chưa thay thế ngày nộp hồ sơ.

Kiểm thử dự kiến: [TC-18](../testing/acceptance.md#tc-18). Chốt các DEC liên quan trước khi dùng ví dụ này làm hợp đồng triển khai.

<a id="api-25"></a>

## API-25 Duyệt hoặc từ chối Creator

`PATCH /api/admin/creators/:id/review`

- Đặc tả: `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC12](../requirements/use-cases.md#uc12).
- Quyền đang được mô tả: `Auth(JWT), RequireRole("admin")`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-001](../requirements/business-rules.md#br-001), [BR-002](../requirements/business-rules.md#br-002). Dữ liệu: [users](../architecture/data-model.md#users).
- Quyết định liên quan: [DEC-002](../decisions/open-decisions.md#dec-002), [DEC-005](../decisions/open-decisions.md#dec-005), [DEC-006](../decisions/open-decisions.md#dec-006), [DEC-007](../decisions/open-decisions.md#dec-007), [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-018](../decisions/open-decisions.md#dec-018), [DEC-022](../decisions/open-decisions.md#dec-022).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Path param: id (int, user_id)
Body JSON:
{
  "decision": "approve" | "reject"
}
```

### Đầu ra minh họa

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. HTTP success status chưa được xác định đầy đủ; xem DEC-017.

```json
{
  "success": true,
  "message": "Phê duyệt hồ sơ Creator thành công",
  "data": {
    "id": 4,
    "role": "creator",
    "creatorStatus": "approved"
  }
}
```

### Lỗi đang được mô tả

- 400 Bad Request: Quyết định review không hợp lệ (phải là "approve" hoặc "reject")
- 401 Unauthorized: Chưa đăng nhập
- 403 Forbidden: Yêu cầu quyền Admin
- 404 Not Found: Yêu cầu không tồn tại hoặc đã được xử lý trước đó
- 500 Internal Server Error: Lỗi cập nhật CSDL

Error body và những nhánh lỗi chưa mô tả không được suy ra từ bảng mã lỗi này; xem DEC-017.

### Tác động dữ liệu và giới hạn

Approve đặt role creator/status approved; reject đặt rejected. Lý do từ chối, gửi lại, review đồng thời và hiệu lực role mới chưa có hợp đồng đầy đủ.

Kiểm thử dự kiến: [TC-18](../testing/acceptance.md#tc-18). Chốt các DEC liên quan trước khi dùng ví dụ này làm hợp đồng triển khai.

<a id="api-26"></a>

## API-26 Danh sách nội dung kiểm duyệt

`GET /api/admin/tracks`

- Đặc tả: `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC11](../requirements/use-cases.md#uc11).
- Quyền đang được mô tả: `Auth(JWT), RequireRole("admin")`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-001](../requirements/business-rules.md#br-001), [BR-004](../requirements/business-rules.md#br-004). Dữ liệu: [tracks](../architecture/data-model.md#tracks), [users](../architecture/data-model.md#users).
- Quyết định liên quan: [DEC-012](../decisions/open-decisions.md#dec-012), [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-018](../decisions/open-decisions.md#dec-018).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Query params:
- status: "all" | "active" | "deleted" (tùy chọn, mặc định "all")
- type: "music" | "podcast" (tùy chọn)
- keyword: string
- page: int, limit: int
```

### Đầu ra minh họa

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. HTTP success status chưa được xác định đầy đủ; xem DEC-017.

```json
{
  "success": true,
  "data": [
    {
      "id": 8,
      "title": "Bản Thu Vi Phạm Bản Quyền",
      "artistName": "Nghệ Sĩ Nặc Danh",
      "trackType": "music",
      "playCount": 300,
      "creator": {
        "id": 2,
        "username": "Sơn Tùng M-TP"
      },
      "createdAt": "2026-10-20T08:00:00Z",
      "deletedAt": "2026-10-30T15:00:00Z"
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

- 401 Unauthorized: Chưa đăng nhập
- 403 Forbidden: Chỉ Admin có quyền kiểm duyệt kho nội dung
- 500 Internal Server Error: Lỗi truy vấn

Error body và những nhánh lỗi chưa mô tả không được suy ra từ bảng mã lỗi này; xem DEC-017.

### Tác động dữ liệu và giới hạn

Admin đọc cả active/deleted theo query, không áp dụng bộ lọc public như thể chỉ có track active. Search và response còn DRAFT.

Kiểm thử dự kiến: [TC-16](../testing/acceptance.md#tc-16). Chốt các DEC liên quan trước khi dùng ví dụ này làm hợp đồng triển khai.

<a id="api-27"></a>

## API-27 Gỡ nội dung vi phạm

`DELETE /api/admin/tracks/:id`

- Đặc tả: `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC11](../requirements/use-cases.md#uc11).
- Quyền đang được mô tả: `Auth(JWT), RequireRole("admin")`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-001](../requirements/business-rules.md#br-001), [BR-004](../requirements/business-rules.md#br-004). Dữ liệu: [tracks](../architecture/data-model.md#tracks).
- Quyết định liên quan: [DEC-005](../decisions/open-decisions.md#dec-005), [DEC-009](../decisions/open-decisions.md#dec-009), [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-018](../decisions/open-decisions.md#dec-018), [DEC-022](../decisions/open-decisions.md#dec-022).

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
  "message": "Đã kiểm duyệt và gỡ bỏ tác phẩm vi phạm thành công"
}
```

### Lỗi đang được mô tả

- 401 Unauthorized: Chưa đăng nhập
- 403 Forbidden: Chỉ Admin mới có quyền kiểm duyệt gỡ bài vi phạm
- 404 Not Found: Tác phẩm không tồn tại
- 500 Internal Server Error: Lỗi cập nhật CSDL

Error body và những nhánh lỗi chưa mô tả không được suy ra từ bảng mã lỗi này; xem DEC-017.

### Tác động dữ liệu và giới hạn

Đặt tracks.deleted_at; không có hợp đồng khôi phục hoặc lưu lý do/audit đầy đủ. Ngăn URL trực tiếp sau khi gỡ cần thiết kế media riêng.

Kiểm thử dự kiến: [TC-16](../testing/acceptance.md#tc-16), [TC-17](../testing/acceptance.md#tc-17). Chốt các DEC liên quan trước khi dùng ví dụ này làm hợp đồng triển khai.
