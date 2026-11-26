# API admin

Đồng bộ quyết định ngày 17/11/2026. Quy tắc CONFIRMED theo [sổ DEC](../decisions/open-decisions.md#evidence-simple-2026-11-17); field/validation/wire chưa đủ vẫn DRAFT theo [quy ước API](README.md). Ví dụ không phải kết quả chạy hoặc fixture.

<a id="api-22"></a>

## API-22 Danh sách tài khoản

`GET /api/admin/users`

- Đặc tả: lựa chọn nghiệp vụ `CONFIRMED`, wire còn thiếu `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC10](../requirements/use-cases.md#uc10).
- Quyền đang được mô tả: `Auth(cookie JWT + phiên DB), RequireRole("admin")`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
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

Mã thành công: 200 OK.

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. Envelope và mã thành công theo quy ước đã chốt; required/null và lỗi chi tiết còn DEC-017.

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

Bảng lỗi là mapping DRAFT từ đặc tả cũ, chưa bao phủ email/CSRF/DB dịch vụ và mọi nhánh mới. Envelope lỗi đã chọn ở README; code/chi tiết từng lỗi còn DEC-017.

### Tác động dữ liệu và giới hạn

CONFIRMED: chỉ Admin, không password_hash; email chuẩn hóa, query/pagination theo quy ước. Keyword email/username dùng chuẩn hóa/mọi từ/giới hạn BR-009 đã chốt; nullable/errors còn DEC-017.

Khoảng trống liên quan: [danh mục cần đặc tả](README.md#contract-gaps).

Kiểm thử dự kiến: [TC-15](../testing/acceptance.md#tc-15). Chỉ phần đã xác nhận là ràng buộc; hoàn tất các ô wire còn thiếu trước triển khai endpoint cuối cùng.

<a id="api-23"></a>

## API-23 Khóa và mở khóa tài khoản

`PATCH /api/admin/users/:id/status`

- Đặc tả: lựa chọn nghiệp vụ `CONFIRMED`, wire còn thiếu `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC10](../requirements/use-cases.md#uc10).
- Quyền đang được mô tả: `Auth(cookie JWT + phiên DB), RequireRole("admin")`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
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

Mã thành công: 200 OK.

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. Envelope và mã thành công theo quy ước đã chốt; required/null và lỗi chi tiết còn DEC-017.

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

Bảng lỗi là mapping DRAFT từ đặc tả cũ, chưa bao phủ email/CSRF/DB dịch vụ và mọi nhánh mới. Envelope lỗi đã chọn ở README; code/chi tiết từng lỗi còn DEC-017.

### Tác động dữ liệu và giới hạn

CONFIRMED: ban user không phải Admin đặt deleted_at và thu hồi tất cả phiên; unban đặt NULL nhưng phải login lại. Cấm tự khóa/khóa Admin khác. Khóa Creator tạm ẩn nội dung, mở khóa không phục hồi track gỡ riêng. Lỗi và giao dịch cạnh tranh còn DEC-017/DEC-022.

Khoảng trống liên quan: [danh mục cần đặc tả](README.md#contract-gaps).

Kiểm thử dự kiến: [TC-05](../testing/acceptance.md#tc-05), [TC-15](../testing/acceptance.md#tc-15). Chỉ phần đã xác nhận là ràng buộc; hoàn tất các ô wire còn thiếu trước triển khai endpoint cuối cùng.

<a id="api-24"></a>

## API-24 Hồ sơ Creator chờ duyệt

`GET /api/admin/creators/pending`

Đặc tả `CONFIRMED` trong phạm vi ghi dưới. Triển khai `NOT_IMPLEMENTED`, kiểm chứng `NOT_RUN`. Yêu cầu phiên hợp lệ và quyền Admin. Query `page`, `limit` theo [quy ước API](README.md).

Trả `200` với `data` là mảng hồ sơ `pending` của user hoạt động và `pagination: {page, limit, total}` ở cấp ngoài. Mỗi phần tử có các trường của [hồ sơ Creator](creator-applications.md#creator-application-response) cùng `username` và `email` của người nộp. Xếp hồ sơ cũ nhất trước theo `submittedAt ASC, applicationId ASC`. `submittedAt` là ngày gửi hồ sơ.

```json
{
  "success": true,
  "data": [
    {
      "applicationId": 14,
      "username": "minhnguyen",
      "email": "minh@example.test",
      "status": "pending",
      "submittedAt": "2026-11-22T03:00:00Z",
      "submittedChannelName": "Nhạc buổi sáng",
      "submittedBio": null,
      "activityField": "Nhạc acoustic",
      "reviewedAt": null,
      "reviewedBy": null,
      "rejectionReason": null
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1
  }
}
```

Mã lỗi xác thực, phân quyền và dịch vụ ngoài phần đã chốt theo DEC-017. [DEC-005](../decisions/open-decisions.md#dec-005), [TC-18](../testing/acceptance.md#tc-18).

<a id="api-25"></a>

## API-25 Duyệt hoặc từ chối Creator

`PATCH /api/admin/creators/:id/review`

Đặc tả `CONFIRMED` trong phạm vi ghi dưới. Triển khai `NOT_IMPLEMENTED`, kiểm chứng `NOT_RUN`. Yêu cầu phiên hợp lệ, quyền Admin, CSRF và Origin.

Path `:id` là `applicationId`. Body có `decision` là `approve` hoặc `reject`. Với `reject`, `rejectionReason` bắt buộc, là chuỗi 1–500 ký tự sau trim. Với `approve`, request phải bỏ trường `rejectionReason`.

Trả `200` với `data: {application, role}`. `application` là [hồ sơ đã cập nhật](creator-applications.md#creator-application-response) và `role` là role hiện tại của người nộp. Input sai trả `400 VALIDATION_ERROR`; hồ sơ không tồn tại trả `404 NOT_FOUND`; hồ sơ đã được xử lý trả `409 CONFLICT`.

Chỉ review hồ sơ `pending`. Duyệt cấp quyền Creator, từ chối giữ quyền hiện tại. Quyền DB có hiệu lực ở request tiếp theo. Review khóa hàng hồ sơ; thứ tự khóa với user và các nhánh giao dịch khác còn DEC-022. [BR-002](../requirements/business-rules.md#br-002), [DEC-005](../decisions/open-decisions.md#dec-005), [TC-18](../testing/acceptance.md#tc-18).

<a id="api-26"></a>

## API-26 Danh sách nội dung kiểm duyệt

`GET /api/admin/tracks`

- Đặc tả: lựa chọn nghiệp vụ `CONFIRMED`, wire còn thiếu `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC11](../requirements/use-cases.md#uc11).
- Quyền đang được mô tả: `Auth(cookie JWT + phiên DB), RequireRole("admin")`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
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

Mã thành công: 200 OK.

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. Envelope và mã thành công theo quy ước đã chốt; required/null và lỗi chi tiết còn DEC-017.

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

Bảng lỗi là mapping DRAFT từ đặc tả cũ, chưa bao phủ email/CSRF/DB dịch vụ và mọi nhánh mới. Envelope lỗi đã chọn ở README; code/chi tiết từng lỗi còn DEC-017.

### Tác động dữ liệu và giới hạn

CONFIRMED: Admin đọc track active/deleted theo query, không áp bộ lọc public cho kho kiểm duyệt. Trạng thái chủ khóa khác deleted_at của track; shape/filter cho tình huống này còn DRAFT, DEC-012/DEC-017.

Khoảng trống liên quan: [danh mục cần đặc tả](README.md#contract-gaps).

Kiểm thử dự kiến: [TC-16](../testing/acceptance.md#tc-16). Chỉ phần đã xác nhận là ràng buộc; hoàn tất các ô wire còn thiếu trước triển khai endpoint cuối cùng.

<a id="api-27"></a>

## API-27 Gỡ nội dung vi phạm

`DELETE /api/admin/tracks/:id`

- Đặc tả: lựa chọn nghiệp vụ `CONFIRMED`, wire còn thiếu `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC11](../requirements/use-cases.md#uc11).
- Quyền đang được mô tả: `Auth(cookie JWT + phiên DB), RequireRole("admin")`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-001](../requirements/business-rules.md#br-001), [BR-004](../requirements/business-rules.md#br-004). Dữ liệu: [tracks](../architecture/data-model.md#tracks).
- Quyết định liên quan: [DEC-005](../decisions/open-decisions.md#dec-005), [DEC-009](../decisions/open-decisions.md#dec-009), [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-018](../decisions/open-decisions.md#dec-018), [DEC-022](../decisions/open-decisions.md#dec-022).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Path param: id (int)
```

### Đầu ra minh họa

**CONFIRMED: HTTP 204 No Content, không body và không JSON envelope.** Chi tiết cookie/headers nếu có theo DEC-017.

### Lỗi đang được mô tả

- 401 Unauthorized: Chưa đăng nhập
- 403 Forbidden: Chỉ Admin mới có quyền kiểm duyệt gỡ bài vi phạm
- 404 Not Found: Tác phẩm không tồn tại
- 500 Internal Server Error: Lỗi cập nhật CSDL

Bảng lỗi là mapping DRAFT từ đặc tả cũ, chưa bao phủ email/CSRF/DB dịch vụ và mọi nhánh mới. Envelope lỗi đã chọn ở README; code/chi tiết từng lỗi còn DEC-017.

### Tác động dữ liệu và giới hạn

CONFIRMED: Admin soft delete track, giữ file/hàng/liên kết, chặn audio mới; request đã bắt đầu được hoàn tất. Thành công 204 không body; restore/hard delete ngoài MVP. Audit/lý do kiểm duyệt và thao tác lặp còn DEC-017/DEC-022; audio đã có [API-28/29](tracks.md#api-28).

Khoảng trống liên quan: [danh mục cần đặc tả](README.md#contract-gaps).

Kiểm thử dự kiến: [TC-16](../testing/acceptance.md#tc-16), [TC-17](../testing/acceptance.md#tc-17). Chỉ phần đã xác nhận là ràng buộc; hoàn tất các ô wire còn thiếu trước triển khai endpoint cuối cùng.

API-22 tìm email/username, API-26 tìm title/artist bằng quy tắc [BR-009](../requirements/business-rules.md#br-009). API-24 trả creator_applications đích; creatorStatus suy ra hồ sơ/users.role nguồn quyền, response cũ vẫn minh họa DRAFT.
