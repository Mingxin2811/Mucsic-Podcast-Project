# API hồ sơ Creator và kênh

Nguồn [xác nhận DEC-005](../decisions/open-decisions.md#evidence-api-contracts-2026-11-22), [BR-002](../requirements/business-rules.md#br-002), UC12/[TC-18](../testing/acceptance.md#tc-18). Áp dụng [quy ước HTTP](README.md). Cả ba API có trạng thái `NOT_IMPLEMENTED` và `NOT_RUN`.

<a id="creator-application-response"></a>

## Dữ liệu hồ sơ Creator

| Trường | Kiểu và ý nghĩa |
| --- | --- |
| `applicationId` | Số nguyên, ID của hồ sơ |
| `status` | `pending`, `approved` hoặc `rejected` |
| `submittedAt` | Thời điểm gửi hồ sơ, ISO 8601 UTC |
| `submittedChannelName`, `activityField` | Chuỗi tên kênh và lĩnh vực lúc nộp |
| `submittedBio` | Chuỗi hoặc `null`, giới thiệu lúc nộp |
| `reviewedAt`, `reviewedBy` | Thời điểm UTC và ID người review, cả hai là `null` khi đang chờ |
| `rejectionReason` | Chuỗi lý do từ chối hoặc `null` khi đang chờ hay đã duyệt |

Thông tin kênh hiện tại có dạng `{channelName, bio}`, trong đó `bio` có thể là `null`. Dữ liệu lúc nộp và dữ liệu kênh hiện tại ánh xạ vào các cột riêng trong [mô hình dữ liệu](../architecture/data-model.md#target-model).

<a id="api-35"></a>

## API-35 Nộp hồ sơ Creator

`POST /api/creator-applications`

Listener đã xác minh, chưa khóa và đã đăng nhập. Yêu cầu CSRF/Origin. Body gồm `channelName` và `activityField` bắt buộc, mỗi trường là chuỗi 2–100 ký tự sau trim. `bio` tùy chọn, nhận chuỗi tối đa 1.000 ký tự hoặc `null`; bỏ qua thì lưu `null`.

Trả `201` với `data` là [hồ sơ vừa nộp](#creator-application-response), trạng thái `pending`. Nếu đã có hồ sơ đang chờ, trả `409 CONFLICT`. Hồ sơ đang chờ giữ nguyên dữ liệu lúc nộp; người bị từ chối dùng API này nộp hồ sơ mới và giữ lịch sử.

<a id="api-36"></a>

## API-36 Lịch sử hồ sơ của tôi

`GET /api/creator-applications/me`

User đã xác minh, chưa khóa và đã đăng nhập chỉ đọc hồ sơ của mình. Query `page`, `limit` theo quy ước chung. Trả `200` với `data: {creatorStatus, channel, applications}` và `pagination: {page, limit, total}` ở cấp ngoài.

`creatorStatus` suy từ hồ sơ mới nhất; `users.role` vẫn là nguồn phân quyền. `channel` là thông tin kênh hiện tại hoặc `null` nếu chưa được duyệt. `applications` là danh sách [hồ sơ](#creator-application-response) xếp theo `submittedAt DESC, applicationId DESC`. Khi chưa từng nộp, trả `creatorStatus: "none"`, `channel: null`, `applications: []` và `pagination.total: 0`.

<a id="api-37"></a>

## API-37 Sửa kênh đã duyệt

`PATCH /api/creator/channel`

Creator đã được duyệt, chưa khóa và đã đăng nhập. Yêu cầu CSRF/Origin. PATCH nhận `channelName` và `bio` theo giới hạn API-35. Cần ít nhất một trường. Trường bỏ qua giữ nguyên; `bio: null` xóa giới thiệu; `channelName` khi gửi phải là chuỗi hợp lệ.

Trả `200` với `data: {channelName, bio}` của kênh hiện tại. Chỉ cập nhật trường kênh trên hồ sơ được duyệt; quyền, thông tin review và dữ liệu lúc nộp giữ theo hồ sơ. [Mô hình dữ liệu](../architecture/data-model.md#target-model).
