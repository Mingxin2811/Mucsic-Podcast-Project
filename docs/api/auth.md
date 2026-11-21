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

CONFIRMED: username, email và password để tạo Listener. Username 2–50 ký tự sau trim, cho phép trùng. Email trim/lowercase và duy nhất. Password 12–128 ký tự, cho khoảng trắng và giữ nguyên khi xác minh. Hồ sơ Creator có luồng riêng. Verify body `{email,otp}` tại API-30. Resend/status/response còn DEC-003/005/017. [Schema khởi tạo](../architecture/data-model.md#initial-auth-schema).

### Đầu ra minh họa

Chưa cung cấp JSON thành công cuối cùng: đăng ký phải qua OTP email thật trước khi tài khoản hoạt động; response tiếp nhận, gửi OTP và xác minh chưa có wire được xác nhận (DEC-003/DEC-005). Không dùng mẫu user pending Creator cũ hoặc cấp JWT để lấp khoảng trống. Quy tắc 201 chỉ áp dụng khi hợp đồng xác định tài nguyên được tạo thành công.

### Lỗi đang được mô tả

- 400 Bad Request: Thiếu thông tin bắt buộc, email sai cú pháp, mật khẩu ngoài 12–128 ký tự
- 409 Conflict: Địa chỉ email đã được đăng ký trên hệ thống
- 500 Internal Server Error: Lỗi kết nối CSDL hoặc hash scrypt

Bảng lỗi là mapping DRAFT từ đặc tả cũ, chưa bao phủ email/CSRF/DB dịch vụ và mọi nhánh mới. Envelope lỗi đã chọn ở README; code/chi tiết từng lỗi còn DEC-017.

### Tác động dữ liệu và giới hạn

CONFIRMED: đăng ký Listener với `email_verified_at` là `NULL`, xác minh OTP email thật rồi login riêng. Giới hạn 5 lượt gửi đã ghi/email/giờ. Verify/resend qua API-30/31. Chi tiết status/response và đăng ký lại còn DEC-003/005/017. [Vòng đời OTP](../architecture/security-and-media.md#otp-delivery).

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

CONFIRMED: email đã xác minh, user hoạt động và mật khẩu đúng thì tạo phiên độc lập và JWT HS256 24 giờ tuyệt đối. Cookie `soundwave_session` mang JWT. Login kiểm tra lại hash và trạng thái dưới khóa hàng user trước khi tạo phiên. Response, Domain, Origin và lỗi chưa xác minh còn DEC-003/017. [Giao dịch auth](../architecture/security-and-media.md#auth-transaction-order).

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

Public, JSON và kiểm Origin. Body CONFIRMED `{email,otp}`. OTP đăng ký đúng/hợp lệ/một lần kích hoạt `email_verified_at`. User đăng nhập riêng sau khi xác minh. Mã sáu số, hạn năm phút, lần sai thứ ba vô hiệu hóa theo BR-003. Success status/response/field chi tiết còn DEC-003/005/017. [Giao dịch auth](../architecture/security-and-media.md#auth-transaction-order), TC-01/02.

<a id="api-31"></a>

## API-31 Gửi lại OTP đăng ký

`POST /api/auth/resend-verification`

Đặc tả CONFIRMED trong phạm vi ghi dưới; wire còn DRAFT, triển khai NOT_IMPLEMENTED/kiểm chứng NOT_RUN. [Xác nhận](../decisions/open-decisions.md#evidence-simple-2026-11-17), [quy ước](README.md), [BR-003](../requirements/business-rules.md#br-003).

Public, JSON và kiểm Origin. Gửi lại OTP đăng ký sau 60 giây, vô hiệu hóa mã cũ và áp giới hạn 5 lượt đã ghi/email/giờ. User tiếp tục ở trạng thái chưa xác minh nếu mail lỗi. Body/response/status, IP limit, timeout cụ thể và xử lý `reserved` còn DEC-003/005/017/022. [Vòng đời OTP](../architecture/security-and-media.md#otp-delivery), TC-02.

<a id="api-32"></a>

## API-32 Yêu cầu OTP reset

`POST /api/auth/forgot-password`

Đặc tả CONFIRMED trong phạm vi ghi dưới; wire còn DRAFT, triển khai NOT_IMPLEMENTED/kiểm chứng NOT_RUN. [Xác nhận](../decisions/open-decisions.md#evidence-simple-2026-11-17), [quy ước](README.md), [BR-003](../requirements/business-rules.md#br-003).

Public, JSON và kiểm Origin. Yêu cầu OTP reset qua Resend cho user đã xác minh và chưa khóa. Phản hồi chung bảo vệ thông tin tài khoản. Body/status/response, timeout cụ thể, phản hồi khi provider lỗi và phạm vi đếm IP còn DEC-003/005/017/022. [Vòng đời OTP](../architecture/security-and-media.md#otp-delivery), TC-04.

<a id="api-33"></a>

## API-33 Reset bằng OTP

`POST /api/auth/reset-password`

Đặc tả CONFIRMED trong phạm vi ghi dưới; wire còn DRAFT, triển khai NOT_IMPLEMENTED/kiểm chứng NOT_RUN. [Xác nhận](../decisions/open-decisions.md#evidence-simple-2026-11-17), [quy ước](README.md), [BR-003](../requirements/business-rules.md#br-003).

Public, JSON và kiểm Origin. Body CONFIRMED `{email,otp,newPassword}`. Giữ nguyên password 12–128 ký tự. User đã xác minh, chưa khóa và có OTP reset hợp lệ được đổi hash scrypt, đánh dấu mã đã dùng và thu hồi mọi phiên trong một transaction. User đăng nhập riêng sau reset. Success status/response/lỗi còn DEC-003/005/017. [Giao dịch auth](../architecture/security-and-media.md#auth-transaction-order), TC-04/05.

<a id="api-34"></a>

## API-34 Đổi mật khẩu

`POST /api/auth/change-password`

Đặc tả CONFIRMED trong phạm vi ghi dưới; wire còn DRAFT, triển khai NOT_IMPLEMENTED/kiểm chứng NOT_RUN. [Xác nhận](../decisions/open-decisions.md#evidence-simple-2026-11-17), [quy ước](README.md), [BR-003](../requirements/business-rules.md#br-003).

Auth qua cookie/phiên hiện tại, `X-CSRF-Token` và Origin. Body CONFIRMED `{currentPassword,newPassword}`. Kiểm mật khẩu hiện tại, dùng scrypt cho mật khẩu mới và thu hồi mọi phiên. User đăng nhập lại. Success status/response/lỗi chi tiết còn DEC-005/017. [Giao dịch auth](../architecture/security-and-media.md#auth-transaction-order), TC-04/05.

<a id="api-39"></a>

## API-39 Lấy CSRF token

`GET /api/auth/csrf`

Đặc tả CONFIRMED trong phạm vi ghi dưới; wire còn DRAFT, triển khai NOT_IMPLEMENTED/kiểm chứng NOT_RUN. [Xác nhận](../decisions/open-decisions.md#evidence-simple-2026-11-17), [quy ước](README.md), [BR-003](../requirements/business-rules.md#br-003).

Protected API đọc phiên hiện tại, 200 theo quy ước đọc. Trả token CSRF ổn định được lưu cùng phiên. Client dùng `X-CSRF-Token` cho protected request ghi. Response field/headers, xử lý phiên đã thu hồi và Origin còn DEC-005/017. TC-03/05.
