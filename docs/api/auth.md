# API auth

Các endpoint sau là bản mô tả dự kiến. Đọc [quy ước API](README.md) và các quyết định liên quan trước khi giao việc. Các khối ví dụ giữ cấu trúc được mô tả, chưa chuẩn hóa những khác biệt chưa chốt.

<a id="api-01"></a>

## API-01 Đăng ký tài khoản

`POST /api/auth/register`

- Đặc tả: `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC01](../requirements/use-cases.md#uc01).
- Quyền đang được mô tả: `Public`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-002](../requirements/business-rules.md#br-002), [BR-003](../requirements/business-rules.md#br-003). Dữ liệu: [users](../architecture/data-model.md#users).
- Quyết định liên quan: [DEC-002](../decisions/open-decisions.md#dec-002), [DEC-003](../decisions/open-decisions.md#dec-003), [DEC-007](../decisions/open-decisions.md#dec-007), [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-022](../decisions/open-decisions.md#dec-022).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
{
  "username": "string (bắt buộc, 2-50 ký tự)",
  "email": "string (bắt buộc, email hợp lệ)",
  "password": "string (bắt buộc, tối thiểu 6 ký tự)",
  "isCreator": "boolean (tùy chọn, mặc định false)",
  "channelName": "string (tùy chọn, nghệ danh nếu isCreator=true)",
  "bio": "string (tùy chọn, giới thiệu nếu isCreator=true)"
}
```

### Đầu ra minh họa

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. HTTP success status chưa được xác định đầy đủ; xem DEC-017.

```json
{
  "success": true,
  "message": "Đăng ký tài khoản thành công",
  "data": {
    "id": 6,
    "username": "Nguyễn Minh Tâm",
    "email": "tam.nguyen@ptit.edu.vn",
    "role": "listener",
    "creatorStatus": "pending",
    "channelName": "Hoàng Tử Indie",
    "bio": "Nghệ sĩ trẻ độc lập...",
    "avatarUrl": "/uploads/images/default-avatar.png",
    "createdAt": "2026-11-01T08:00:00Z"
  }
}
```

### Lỗi đang được mô tả

- 400 Bad Request: Thiếu thông tin bắt buộc, email sai cú pháp, mật khẩu dưới 6 ký tự
- 409 Conflict: Địa chỉ email đã được đăng ký trên hệ thống
- 500 Internal Server Error: Lỗi kết nối CSDL hoặc băm mật khẩu Bcrypt

Error body và những nhánh lỗi chưa mô tả không được suy ra từ bảng mã lỗi này; xem DEC-017.

### Tác động dữ liệu và giới hạn

Tạo user với password_hash. Phương án nhận isCreator đặt role listener và status pending nếu đăng ký Creator; nếu không thì none. Luồng OTP/hồ sơ riêng vẫn OPEN.

Kiểm thử dự kiến: [TC-01](../testing/acceptance.md#tc-01), [TC-02](../testing/acceptance.md#tc-02). Chốt các DEC liên quan trước khi dùng ví dụ này làm hợp đồng triển khai.

<a id="api-02"></a>

## API-02 Đăng nhập

`POST /api/auth/login`

- Đặc tả: `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC02](../requirements/use-cases.md#uc02).
- Quyền đang được mô tả: `Public`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-003](../requirements/business-rules.md#br-003). Dữ liệu: [users](../architecture/data-model.md#users).
- Quyết định liên quan: [DEC-006](../decisions/open-decisions.md#dec-006), [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-020](../decisions/open-decisions.md#dec-020).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
{
  "email": "string (bắt buộc)",
  "password": "string (bắt buộc)"
}
```

### Đầu ra minh họa

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. HTTP success status chưa được xác định đầy đủ; xem DEC-017.

```json
{
  "success": true,
  "message": "Đăng nhập thành công",
  "token": "TOKEN_MINH_HOA_KHONG_HOP_LE",
  "data": {
    "id": 2,
    "username": "Sơn Tùng M-TP",
    "email": "sontung@mtp.vn",
    "role": "creator",
    "creatorStatus": "approved",
    "channelName": "M-TP Official",
    "avatarUrl": "/uploads/images/sontung-avatar.png"
  }
}
```

### Lỗi đang được mô tả

- 400 Bad Request: Chưa nhập email hoặc mật khẩu
- 401 Unauthorized: Email hoặc mật khẩu không chính xác
- 403 Forbidden: Tài khoản đã bị Admin khóa vi phạm (deleted_at IS NOT NULL)
- 500 Internal Server Error: Lỗi máy chủ hoặc CSDL

Error body và những nhánh lỗi chưa mô tả không được suy ra từ bảng mã lỗi này; xem DEC-017.

### Tác động dữ liệu và giới hạn

Đọc user chưa khóa, so khớp mật khẩu và cấp JWT. Payload và vòng đời token chưa chốt; không tự thêm refresh token.

Kiểm thử dự kiến: [TC-03](../testing/acceptance.md#tc-03), [TC-05](../testing/acceptance.md#tc-05). Chốt các DEC liên quan trước khi dùng ví dụ này làm hợp đồng triển khai.

<a id="api-03"></a>

## API-03 Đăng xuất

`POST /api/auth/logout`

- Đặc tả: `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC02](../requirements/use-cases.md#uc02).
- Quyền đang được mô tả: `Auth(JWT)`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-003](../requirements/business-rules.md#br-003). Dữ liệu: [users](../architecture/data-model.md#users).
- Quyết định liên quan: [DEC-006](../decisions/open-decisions.md#dec-006), [DEC-017](../decisions/open-decisions.md#dec-017).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Không có (Truyền Token trong Header Authorization)
```

### Đầu ra minh họa

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. HTTP success status chưa được xác định đầy đủ; xem DEC-017.

```json
{
  "success": true,
  "message": "Đăng xuất thành công"
}
```

### Lỗi đang được mô tả

- 401 Unauthorized: Token không hợp lệ hoặc đã hết hạn
- 500 Internal Server Error: Lỗi xử lý máy chủ

Error body và những nhánh lỗi chưa mô tả không được suy ra từ bảng mã lỗi này; xem DEC-017.

### Tác động dữ liệu và giới hạn

Ý định kết thúc phiên. Chưa có thao tác DB được chốt; phản hồi thành công không tự chứng minh token đã bị vô hiệu hóa.

Kiểm thử dự kiến: [TC-05](../testing/acceptance.md#tc-05). Chốt các DEC liên quan trước khi dùng ví dụ này làm hợp đồng triển khai.

<a id="api-04"></a>

## API-04 Thông tin tài khoản hiện tại

`GET /api/auth/me`

- Đặc tả: `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC01](../requirements/use-cases.md#uc01), [UC02](../requirements/use-cases.md#uc02).
- Quyền đang được mô tả: `Auth(JWT)`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-001](../requirements/business-rules.md#br-001), [BR-003](../requirements/business-rules.md#br-003). Dữ liệu: [users](../architecture/data-model.md#users).
- Quyết định liên quan: [DEC-005](../decisions/open-decisions.md#dec-005), [DEC-006](../decisions/open-decisions.md#dec-006), [DEC-017](../decisions/open-decisions.md#dec-017).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Không có (Truyền Token trong Header Authorization)
```

### Đầu ra minh họa

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. HTTP success status chưa được xác định đầy đủ; xem DEC-017.

```json
{
  "success": true,
  "data": {
    "id": 2,
    "username": "Sơn Tùng M-TP",
    "email": "sontung@mtp.vn",
    "role": "creator",
    "creatorStatus": "approved",
    "channelName": "M-TP Official",
    "bio": "Kênh phát hành âm nhạc chính thức...",
    "avatarUrl": "/uploads/images/sontung-avatar.png",
    "createdAt": "2026-10-05T08:00:00Z"
  }
}
```

### Lỗi đang được mô tả

- 401 Unauthorized: Token hết hạn hoặc không hợp lệ
- 404 Not Found: Người dùng không tồn tại hoặc đã bị khóa
- 500 Internal Server Error: Lỗi truy vấn CSDL

Error body và những nhánh lỗi chưa mô tả không được suy ra từ bảng mã lỗi này; xem DEC-017.

### Tác động dữ liệu và giới hạn

Đọc thông tin user từ phiên. Phải phân biệt vai trò trong token với vai trò hiện tại theo cơ chế được chọn. Không có thao tác ghi.

Kiểm thử dự kiến: [TC-03](../testing/acceptance.md#tc-03), [TC-05](../testing/acceptance.md#tc-05). Chốt các DEC liên quan trước khi dùng ví dụ này làm hợp đồng triển khai.
