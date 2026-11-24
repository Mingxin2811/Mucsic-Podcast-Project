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

CONFIRMED: `{username,email,password}` để tạo Listener. Username 2–50 ký tự sau trim, cho phép trùng. Email trim/lowercase và duy nhất. Password 12–128 ký tự, cho khoảng trắng và giữ nguyên khi xác minh. Hồ sơ Creator có luồng riêng. [Schema khởi tạo](../architecture/data-model.md#initial-auth-schema).

### Đầu ra đã xác nhận

Trả `201` khi tạo tài khoản chờ xác minh, `202` khi bắt đầu lại đủ điều kiện. Cả hai trả `{"success":true,"data":{"emailVerified":false}}`, kể cả khi kết quả gửi chưa rõ. Người dùng xác minh qua API-30 rồi đăng nhập riêng. [Xác nhận DEC-005](../decisions/open-decisions.md#evidence-api-contracts-2026-11-22).

### Lỗi đang được mô tả

- `409 CONFLICT` khi email đã xác minh hoặc khi email chưa xác minh và chưa đủ 24 giờ để bắt đầu lại. Chỉ nhánh chưa xác minh này thêm `error.details.nextAction: "resendVerification"` để client chuyển sang API-31.
- `429 RATE_LIMITED` kèm `Retry-After` khi vượt hạn mức năm lượt cấp mã/email/giờ hoặc chưa đủ khoảng cách 60 giây giữa hai lượt.
- `503 SERVICE_UNAVAILABLE` khi xác định gửi lỗi. Tài khoản vẫn chờ xác minh.
- `400` khi đầu vào sai, theo quy ước validation. Mapping cụ thể cho lỗi database hoặc scrypt và các field lỗi còn DRAFT tại DEC-017.

### Tác động dữ liệu và giới hạn

CONFIRMED: đăng ký Listener với `email_verified_at` là `NULL`. Sau 24 giờ kể từ lượt cấp mã gần nhất, tài khoản chưa xác minh có thể bắt đầu lại trên cùng bản ghi, cập nhật tên và mật khẩu, vô hiệu hóa mã cũ còn hiệu lực và cấp mã mới trong cùng transaction. Áp hạn mức chung với API-31. [Vòng đời OTP](../architecture/security-and-media.md#otp-delivery).

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
- Chưa xác minh email: bị từ chối. Status/error code chi tiết còn DEC-017.
- 500 Internal Server Error: Lỗi máy chủ hoặc CSDL

Bảng lỗi là mapping DRAFT từ đặc tả cũ, chưa bao phủ email/CSRF/DB dịch vụ và mọi nhánh mới. Envelope lỗi đã chọn ở README; code/chi tiết từng lỗi còn DEC-017.

### Tác động dữ liệu và giới hạn

CONFIRMED: email đã xác minh, user hoạt động và mật khẩu đúng thì tạo phiên độc lập và JWT HS256 24 giờ tuyệt đối. Cookie `soundwave_session` mang JWT. Login kiểm tra lại hash và trạng thái dưới khóa hàng user trước khi tạo phiên. Response login, Domain, Origin và lỗi chưa xác minh còn DEC-017. [Giao dịch auth](../architecture/security-and-media.md#auth-transaction-order).

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

Đặc tả CONFIRMED trong phạm vi ghi dưới, triển khai `NOT_IMPLEMENTED`, kiểm chứng `NOT_RUN`. [Xác nhận](../decisions/open-decisions.md#evidence-api-contracts-2026-11-22), [quy ước](README.md), [BR-003](../requirements/business-rules.md#br-003).

Public, JSON và kiểm Origin. Body `{email,otp,password}`. `password` phải khớp mật khẩu của lần đăng ký hiện tại. Khi mã sáu số còn hạn, đúng và chưa dùng, xác minh ghi `email_verified_at` và đánh dấu mã đã dùng trong cùng transaction rồi trả `200` với `{"success":true,"data":{"emailVerified":true}}`. User đăng nhập riêng. Mã hạn năm phút và bị vô hiệu hóa ở lần nhập sai thứ ba theo BR-003.

Mật khẩu không khớp hoặc OTP sai, hết hạn, đã dùng hoặc bị thay trả `400 VALIDATION_ERROR`. Chỉ tăng bộ đếm sai OTP khi mật khẩu đúng và OTP được đối chiếu cho kết quả sai. Với mã còn hiệu lực ở trạng thái `reserved`, trong 15 giây đầu trả `409 CONFLICT` kèm `error.details.retryAfterSeconds` và giữ nguyên số lần sai. Từ mốc 15 giây, lần xác minh có thể chuyển mã còn hiệu lực sang `unknown` rồi kiểm mã. Lỗi ngoài phần đã chốt thuộc DEC-017. [Giao dịch auth](../architecture/security-and-media.md#auth-transaction-order), [TC-02](../testing/acceptance.md#tc-02).

<a id="api-31"></a>

## API-31 Gửi lại OTP đăng ký

`POST /api/auth/resend-verification`

Đặc tả CONFIRMED trong phạm vi ghi dưới, triển khai `NOT_IMPLEMENTED`, kiểm chứng `NOT_RUN`. [Xác nhận](../decisions/open-decisions.md#evidence-api-contracts-2026-11-22), [quy ước](README.md), [BR-003](../requirements/business-rules.md#br-003).

Public, JSON và kiểm Origin. Body `{email,password}`. User phải chưa xác minh và mật khẩu phải khớp lần đăng ký hiện tại. Sai mật khẩu trả `400 VALIDATION_ERROR`. Khi cấp mã mới, vô hiệu hóa mã cũ. Trả `202` với `{"success":true,"data":{"emailVerified":false}}` khi tiếp nhận, kể cả khi kết quả gửi chưa rõ. API-31 dùng chung hạn mức với API-01. Vượt năm lượt cấp mã/email/giờ hoặc chưa đủ 60 giây trả `429 RATE_LIMITED` kèm `Retry-After`. Lỗi gửi xác định trả `503 SERVICE_UNAVAILABLE` và user tiếp tục chờ xác minh. [Vòng đời OTP](../architecture/security-and-media.md#otp-delivery), [TC-02](../testing/acceptance.md#tc-02).

<a id="api-32"></a>

## API-32 Yêu cầu OTP reset

`POST /api/auth/forgot-password`

Đặc tả CONFIRMED trong phạm vi ghi dưới. Triển khai `NOT_IMPLEMENTED`, kiểm chứng `NOT_RUN`. [Xác nhận](../decisions/open-decisions.md#evidence-password-reset-otp-2026-11-21).

Public, JSON và kiểm Origin. Body `{email}`. Kiểm tra cú pháp email theo quy ước validation. Hạn mức cấp mã theo email của API-32 tách riêng khỏi đăng ký.

Với email hợp lệ về cú pháp, trả cùng `202`, cùng body và thời gian phản hồi tương đương dù email có tồn tại hay không, tài khoản đã xác minh hoặc bị khóa, hạn mức cấp mã theo email đã hết hay Resend báo lỗi hoặc timeout. Body dùng `data: null` và một `message` chung cho mọi nhánh. Chỉ cấp mã cho tài khoản đã xác minh, chưa khóa và còn hạn mức năm lượt/email/giờ, với ít nhất 60 giây giữa hai lượt. Hạn mức theo IP thuộc hướng mở rộng tương lai. [Xác nhận local](../decisions/open-decisions.md#evidence-local-runtime-2026-11-22), [vòng đời OTP](../architecture/security-and-media.md#otp-delivery), [TC-04](../testing/acceptance.md#tc-04).

```json
{
  "success": true,
  "data": null,
  "message": "Nếu tài khoản đủ điều kiện, bạn sẽ nhận được mã khôi phục."
}
```

<a id="api-33"></a>

## API-33 Reset bằng OTP

`POST /api/auth/reset-password`

Đặc tả CONFIRMED trong phạm vi ghi dưới. Triển khai `NOT_IMPLEMENTED`, kiểm chứng `NOT_RUN`. [Xác nhận](../decisions/open-decisions.md#evidence-password-reset-otp-2026-11-21).

Public, JSON và kiểm Origin. Body `{email,otp,newPassword}`. Giữ nguyên password 12–128 ký tự. User đã xác minh, chưa khóa và có OTP reset hợp lệ được đổi hash scrypt, đánh dấu mã đã dùng và thu hồi mọi phiên trong một transaction. Trả `204` không body. User đăng nhập riêng sau reset.

Dùng chung `400 VALIDATION_ERROR` cho tài khoản không đủ điều kiện, mã sai, hết hạn, đã dùng, bị thay hoặc mã còn `reserved` trong 15 giây đầu. Nhánh đang chờ yêu cầu thử lại và giữ nguyên số lần sai. Từ mốc 15 giây, có thể chuyển mã còn hiệu lực sang `unknown` rồi kiểm mã với hạn ban đầu. Các lỗi ngoài phần đã chốt còn DEC-017. [Giao dịch auth](../architecture/security-and-media.md#auth-transaction-order), [TC-04](../testing/acceptance.md#tc-04).

<a id="api-34"></a>

## API-34 Đổi mật khẩu

`POST /api/auth/change-password`

Đặc tả CONFIRMED trong phạm vi ghi dưới, triển khai `NOT_IMPLEMENTED`, kiểm chứng `NOT_RUN`. [Xác nhận](../decisions/open-decisions.md#evidence-api-contracts-2026-11-22), [quy ước](README.md), [BR-003](../requirements/business-rules.md#br-003).

Auth qua cookie/phiên hiện tại, `X-CSRF-Token` và Origin. Body `{currentPassword,newPassword}`. Sai mật khẩu hiện tại trả `400 VALIDATION_ERROR`. Khi đổi mật khẩu và thu hồi mọi phiên thành công, trả `204` không body và xóa cookie phiên hiện tại. User đăng nhập lại. [Giao dịch auth](../architecture/security-and-media.md#auth-transaction-order), [TC-04](../testing/acceptance.md#tc-04)/[TC-05](../testing/acceptance.md#tc-05).

<a id="api-39"></a>

## API-39 Lấy CSRF token

`GET /api/auth/csrf`

Đặc tả CONFIRMED trong phạm vi ghi dưới, triển khai `NOT_IMPLEMENTED`, kiểm chứng `NOT_RUN`. [Xác nhận](../decisions/open-decisions.md#evidence-api-contracts-2026-11-22), [quy ước](README.md), [BR-003](../requirements/business-rules.md#br-003).

Protected API đọc phiên hiện tại. Trả `200` với `data: {csrfToken}` và header `Cache-Control: no-store`. Giá trị `csrfToken` là 32 byte lưu cùng phiên, mã hóa base64url, ổn định trong phiên. Client gửi giá trị này qua `X-CSRF-Token` cho request ghi cần xác thực. Thiếu phiên, phiên hết hạn hoặc đã thu hồi trả `401 UNAUTHENTICATED`. Quy tắc Origin dùng chung thuộc DEC-017. [TC-03](../testing/acceptance.md#tc-03)/[TC-05](../testing/acceptance.md#tc-05).
