# API hồ sơ Creator và kênh

Nguồn [xác nhận](../decisions/open-decisions.md#evidence-simple-2026-11-17), [BR-002](../requirements/business-rules.md#br-002), UC12/[TC-18](../testing/acceptance.md#tc-18). [Quy ước HTTP](README.md) áp dụng; cả ba NOT_IMPLEMENTED/NOT_RUN, field/response chưa chọn là DRAFT. Dữ liệu [creator_applications đích](../architecture/data-model.md#target-model); không lấy users.created_at làm ngày nộp.

<a id="api-35"></a>

## API-35 Nộp hồ sơ Creator

`POST /api/creator-applications`

Listener verified/đăng nhập/chưa khóa, CSRF/Origin; nộp hồ sơ mới có tên kênh/bio/lĩnh vực. Một pending/user, pending bất biến, rejected dùng route này tạo lần mới/giữ lịch sử. 201 theo quy ước tạo; tên field lĩnh vực/required/độ dài/body-response/lỗi còn DEC-005/017/022. Không tự cho Creator approved nộp lại hồ sơ hoặc thêm route riêng.

<a id="api-36"></a>

## API-36 Lịch sử hồ sơ của tôi

`GET /api/creator-applications/me`

User verified/đăng nhập/chưa khóa xem lịch sử hồ sơ của mình, 200; không lịch sử người khác. Ngày nộp/reviewer/ngày review/lý do lấy hồ sơ, creatorStatus suy ra hồ sơ/users.role nguồn quyền. Response/pagination/thứ tự/field khi chưa có hồ sơ còn DEC-005/017/022; không tự thêm query ngoài hợp đồng.

<a id="api-37"></a>

## API-37 Sửa kênh đã duyệt

`PATCH /api/creator/channel`

Creator đã được duyệt/đăng nhập/chưa khóa sửa tên kênh/bio, CSRF/Origin, 200. Sửa dữ liệu kênh hiện tại trên hồ sơ đã duyệt, giữ quyền, người review và dữ liệu lúc nộp. Omitted giữ nguyên. Body/required-null/giới hạn/response còn DEC-005/017. [Schema](../architecture/data-model.md#target-model).
