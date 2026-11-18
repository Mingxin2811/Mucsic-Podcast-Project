# API auth

Đồng bộ quyết định ngày 17/11/2026. Quy tắc CONFIRMED theo [sổ DEC](../decisions/open-decisions.md#evidence-simple-2026-11-17); field/validation/wire chưa đủ vẫn DRAFT theo [quy ước API](README.md). Ví dụ không phải kết quả chạy hoặc fixture.

<a id="api-01"></a>

## API-01 Đăng ký tài khoản

`POST /api/auth/register`

- Đặc tả: lựa chọn nghiệp vụ `CONFIRMED`, wire còn thiếu `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC01](../requirements/use-cases.md#uc01).
- Quyền đang được mô tả: `Public`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-002](../requirements/business-rules.md#br-002), [BR-003](../requirements/business-rules.md#br-003). Dữ liệu: [users](../architecture/data-model.md#users).
- Quyết định liên quan: [DEC-002](../decisions/open-decisions.md#dec-002), [DEC-003](../decisions/open-decisions.md#dec-003), [DEC-007](../decisions/open-decisions.md#dec-007), [DEC-017](../decisions/open-decisions.md#dec-017), [DEC-022](../decisions/open-decisions.md#dec-022).

### Đầu vào đang được mô tả

CONFIRMED: username, email và password để tạo Listener; email trim/lowercase. Password 12–128 ký tự/cho khoảng trắng/không trim đã CONFIRMED; giới hạn username 2–50 ký tự cũ còn DRAFT. Không có isCreator/channelName/bio trong nghiệp vụ đăng ký. Verify body {email,otp} tại API-30; resend/status/response còn chi tiết DEC-003/005.

### Đầu ra minh họa

Chưa cung cấp JSON thành công cuối cùng: đăng ký phải qua OTP email thật trước khi tài khoản hoạt động; response tiếp nhận, gửi OTP và xác minh chưa có wire được xác nhận (DEC-003/DEC-005). Không dùng mẫu user pending Creator cũ hoặc cấp JWT để lấp khoảng trống. Quy tắc 201 chỉ áp dụng khi hợp đồng xác định tài nguyên được tạo thành công.

### Lỗi đang được mô tả

- 400 Bad Request: Thiếu thông tin bắt buộc, email sai cú pháp, mật khẩu ngoài 12–128 ký tự
- 409 Conflict: Địa chỉ email đã được đăng ký trên hệ thống
- 500 Internal Server Error: Lỗi kết nối CSDL hoặc hash scrypt

Bảng lỗi là mapping DRAFT từ đặc tả cũ, chưa bao phủ email/CSRF/DB dịch vụ và mọi nhánh mới. Envelope lỗi đã chọn ở README; code/chi tiết từng lỗi còn DEC-017.

### Tác động dữ liệu và giới hạn

CONFIRMED: đăng ký Listener, xác minh OTP email thật rồi login riêng. Không nhận thông tin Creator trong API-01. User tạo với email_verified_at NULL; Resend HTTPS/HMAC PostgreSQL/5 lần gửi-email-giờ đã chốt. Route verify/resend API-30/31, status/response/schema còn DEC-003/005/022; không coi response tiếp nhận là tài khoản đã hoạt động.

Khoảng trống liên quan: [danh mục cần đặc tả](README.md#contract-gaps).

Kiểm thử dự kiến: [TC-01](../testing/acceptance.md#tc-01), [TC-02](../testing/acceptance.md#tc-02). Chỉ phần đã xác nhận là ràng buộc; hoàn tất các ô wire còn thiếu trước triển khai endpoint cuối cùng.

<a id="api-02"></a>

## API-02 Đăng nhập

`POST /api/auth/login`

- Đặc tả: lựa chọn nghiệp vụ `CONFIRMED`, wire còn thiếu `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
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

Mã thành công: 200 OK.

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. Envelope và mã thành công theo quy ước đã chốt; required/null và lỗi chi tiết còn DEC-017.

```json
{
  "success": true,
  "message": "Đăng nhập thành công",
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
- Chưa xác minh email: bị từ chối; status/error code chi tiết còn DEC-003/DEC-017
- 500 Internal Server Error: Lỗi máy chủ hoặc CSDL

Bảng lỗi là mapping DRAFT từ đặc tả cũ, chưa bao phủ email/CSRF/DB dịch vụ và mọi nhánh mới. Envelope lỗi đã chọn ở README; code/chi tiết từng lỗi còn DEC-017.

### Tác động dữ liệu và giới hạn

CONFIRMED: email đã xác minh, user hoạt động, mật khẩu đúng → JWT + auth_sessions 24 giờ tuyệt đối; cookie bảo vệ, không JWT trong JSON, chưa refresh token. Mỗi login tạo phiên độc lập. Cookie soundwave_session/X-CSRF-Token/jose HS256 đã chọn; response/lifecycle/Domain/Origin và lỗi chưa verified còn DEC-003/014/017.

Khoảng trống liên quan: [danh mục cần đặc tả](README.md#contract-gaps).

Kiểm thử dự kiến: [TC-03](../testing/acceptance.md#tc-03), [TC-05](../testing/acceptance.md#tc-05). Chỉ phần đã xác nhận là ràng buộc; hoàn tất các ô wire còn thiếu trước triển khai endpoint cuối cùng.

<a id="api-03"></a>

## API-03 Đăng xuất

`POST /api/auth/logout`

- Đặc tả: lựa chọn nghiệp vụ `CONFIRMED`, wire còn thiếu `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC02](../requirements/use-cases.md#uc02).
- Quyền đang được mô tả: `Auth(cookie JWT + phiên DB)`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-003](../requirements/business-rules.md#br-003). Dữ liệu: [users](../architecture/data-model.md#users).
- Quyết định liên quan: [DEC-006](../decisions/open-decisions.md#dec-006), [DEC-017](../decisions/open-decisions.md#dec-017).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Không có body; dùng cookie phiên. Protected request ghi gửi X-CSRF-Token/kiểm Origin theo quy ước; chi tiết còn DEC-017.
```

### Đầu ra minh họa

**CONFIRMED: HTTP 204 No Content, không body và không JSON envelope.** Cookie/header theo [quy ước API](README.md); phần wire/lifecycle còn DEC-017.

### Lỗi đang được mô tả

- 401 Unauthorized: Token không hợp lệ hoặc đã hết hạn
- 500 Internal Server Error: Lỗi xử lý máy chủ

Bảng lỗi là mapping DRAFT từ đặc tả cũ, chưa bao phủ email/CSRF/DB dịch vụ và mọi nhánh mới. Envelope lỗi đã chọn ở README; code/chi tiết từng lỗi còn DEC-017.

### Tác động dữ liệu và giới hạn

CONFIRMED: thu hồi auth_sessions hiện tại và xóa cookie; phiên thiết bị khác tiếp tục. Thành công 204 không body. Tính lặp khi phiên đã mất và chi tiết xóa cookie/CSRF còn DEC-017; không coi xóa cookie đơn thuần đủ thu hồi.

Khoảng trống liên quan: [danh mục cần đặc tả](README.md#contract-gaps).

Kiểm thử dự kiến: [TC-05](../testing/acceptance.md#tc-05). Chỉ phần đã xác nhận là ràng buộc; hoàn tất các ô wire còn thiếu trước triển khai endpoint cuối cùng.

<a id="api-04"></a>

## API-04 Thông tin tài khoản hiện tại

`GET /api/auth/me`

- Đặc tả: lựa chọn nghiệp vụ `CONFIRMED`, wire còn thiếu `DRAFT`; triển khai: `NOT_IMPLEMENTED`; kiểm chứng: `NOT_RUN` tại mốc kiểm kê.
- Mục tiêu và UC: [UC01](../requirements/use-cases.md#uc01), [UC02](../requirements/use-cases.md#uc02).
- Quyền đang được mô tả: `Auth(cookie JWT + phiên DB)`. Quy tắc sở hữu/ngoại lệ vẫn phải áp dụng.
- Quy tắc: [BR-001](../requirements/business-rules.md#br-001), [BR-003](../requirements/business-rules.md#br-003). Dữ liệu: [users](../architecture/data-model.md#users).
- Quyết định liên quan: [DEC-005](../decisions/open-decisions.md#dec-005), [DEC-006](../decisions/open-decisions.md#dec-006), [DEC-017](../decisions/open-decisions.md#dec-017).

### Đầu vào đang được mô tả

Khối sau ghi kiểu, điều kiện hoặc trường của request; phần chú thích kiểu không phải payload có thể gửi nguyên văn.

```text
Không có body; dùng cookie phiên. Protected request ghi gửi X-CSRF-Token/kiểm Origin theo quy ước; chi tiết còn DEC-017.
```

### Đầu ra minh họa

Mã thành công: 200 OK.

Đây là cấu trúc ví dụ thành công, không phải kết quả chạy hoặc schema đã chốt. Giá trị mẫu không phải fixture nghiệm thu. Envelope và mã thành công theo quy ước đã chốt; required/null và lỗi chi tiết còn DEC-017.

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
- User không còn hợp lệ: từ chối xác thực; phiên thu hồi/hết hạn trả 401, mapping còn lại cần DEC-017
- 500 Internal Server Error: Lỗi truy vấn CSDL

Bảng lỗi là mapping DRAFT từ đặc tả cũ, chưa bao phủ email/CSRF/DB dịch vụ và mọi nhánh mới. Envelope lỗi đã chọn ở README; code/chi tiết từng lỗi còn DEC-017.

### Tác động dữ liệu và giới hạn

CONFIRMED: đọc user/quyền hiện tại từ DB qua phiên, không dùng role trong JWT. Phiên/user không còn hợp lệ không được qua xác thực; phiên thu hồi/hết hạn trả 401. Không tạo route users/profile trùng nghiệp vụ. Field nullable/lỗi chi tiết còn DEC-017.

Khoảng trống liên quan: [danh mục cần đặc tả](README.md#contract-gaps).

Kiểm thử dự kiến: [TC-03](../testing/acceptance.md#tc-03), [TC-05](../testing/acceptance.md#tc-05). Chỉ phần đã xác nhận là ràng buộc; hoàn tất các ô wire còn thiếu trước triển khai endpoint cuối cùng.

<a id="api-30"></a>

## API-30 Xác minh email

`POST /api/auth/verify-email`

Đặc tả CONFIRMED trong phạm vi ghi dưới; wire còn DRAFT, triển khai NOT_IMPLEMENTED/kiểm chứng NOT_RUN. [Xác nhận](../decisions/open-decisions.md#evidence-simple-2026-11-17), [quy ước](README.md), [BR-003](../requirements/business-rules.md#br-003).

Public, JSON/kiểm Origin. Body CONFIRMED: {email,otp}. OTP đăng ký đúng/hợp lệ/một lần kích hoạt email_verified_at; không tự login. Mã sáu số/năm phút/ba sai theo BR-003. Success status/response/field chi tiết/transaction còn DEC-003/005/017/022. TC-01/02.

<a id="api-31"></a>

## API-31 Gửi lại OTP đăng ký

`POST /api/auth/resend-verification`

Đặc tả CONFIRMED trong phạm vi ghi dưới; wire còn DRAFT, triển khai NOT_IMPLEMENTED/kiểm chứng NOT_RUN. [Xác nhận](../decisions/open-decisions.md#evidence-simple-2026-11-17), [quy ước](README.md), [BR-003](../requirements/business-rules.md#br-003).

Public, JSON/kiểm Origin. Gửi lại OTP đăng ký sau 60 giây/hủy cũ, <=5 lần gửi/email/giờ/IP limit. User vẫn chưa verified; mail lỗi không tạo user trùng. Body/response/status/counters/IP threshold/timeout còn DEC-003/005/017/022, không tự coi {email} là schema cuối. TC-02.

<a id="api-32"></a>

## API-32 Yêu cầu OTP reset

`POST /api/auth/forgot-password`

Đặc tả CONFIRMED trong phạm vi ghi dưới; wire còn DRAFT, triển khai NOT_IMPLEMENTED/kiểm chứng NOT_RUN. [Xác nhận](../decisions/open-decisions.md#evidence-simple-2026-11-17), [quy ước](README.md), [BR-003](../requirements/business-rules.md#br-003).

Public, JSON/kiểm Origin. Yêu cầu OTP reset qua Resend cho user verified/chưa khóa; phản hồi chung không tiết lộ email tồn tại. Body/status/response/cạnh tranh/gửi timeout và cách phản hồi provider lỗi còn DEC-003/005/017/022. TC-04.

<a id="api-33"></a>

## API-33 Reset bằng OTP

`POST /api/auth/reset-password`

Đặc tả CONFIRMED trong phạm vi ghi dưới; wire còn DRAFT, triển khai NOT_IMPLEMENTED/kiểm chứng NOT_RUN. [Xác nhận](../decisions/open-decisions.md#evidence-simple-2026-11-17), [quy ước](README.md), [BR-003](../requirements/business-rules.md#br-003).

Public, JSON/kiểm Origin. Body CONFIRMED {email,otp,newPassword}; password 12–128 ký tự/không trim. User verified/chưa khóa/OTP hợp lệ → hash scrypt và thu hồi mọi phiên nguyên tử, không tự login. Success status/response/lỗi/OTP purpose/schema còn DEC-003/005/017/022. TC-04/05.

<a id="api-34"></a>

## API-34 Đổi mật khẩu

`POST /api/auth/change-password`

Đặc tả CONFIRMED trong phạm vi ghi dưới; wire còn DRAFT, triển khai NOT_IMPLEMENTED/kiểm chứng NOT_RUN. [Xác nhận](../decisions/open-decisions.md#evidence-simple-2026-11-17), [quy ước](README.md), [BR-003](../requirements/business-rules.md#br-003).

Auth cookie/phiên hiện tại, X-CSRF-Token/Origin. Body CONFIRMED {currentPassword,newPassword}; kiểm mật khẩu hiện tại, scrypt mật khẩu mới và thu hồi mọi phiên kể cả hiện tại, phải login lại. Success status/response/lỗi chi tiết và race còn DEC-005/017/022. TC-04/05.

<a id="api-39"></a>

## API-39 Lấy CSRF token

`GET /api/auth/csrf`

Đặc tả CONFIRMED trong phạm vi ghi dưới; wire còn DRAFT, triển khai NOT_IMPLEMENTED/kiểm chứng NOT_RUN. [Xác nhận](../decisions/open-decisions.md#evidence-simple-2026-11-17), [quy ước](README.md), [BR-003](../requirements/business-rules.md#br-003).

Protected API đọc phiên hiện tại, 200 theo quy ước đọc. Cấp/trả token CSRF ngẫu nhiên lưu cùng phiên; client dùng X-CSRF-Token cho protected request ghi. Không trả JWT hoặc OTP. Response field/headers/cấp lại-thu hồi/Origin policy còn DEC-005/017; không tự coi token đổi mỗi GET hoặc thiết lập phiên anonymous. TC-03/05.
