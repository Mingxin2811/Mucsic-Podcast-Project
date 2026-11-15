# Xác thực và vòng đời media

Trạng thái: `DRAFT`. Tài liệu giải thích ranh giới; request/response thuộc [API](../api/README.md), quyền nghiệp vụ thuộc [business rules](../requirements/business-rules.md).

## Xác thực và quyền hiện tại

Luồng được mô tả dùng Bcrypt để kiểm tra mật khẩu và JWT ký cho API có xác thực. Token dự kiến TTL 24 giờ; protected request có `Authorization: Bearer <token>`. Cách xác minh chữ ký, cấu hình secret/thuật toán và lỗi chi tiết phải được chốt trong công việc triển khai, không suy ra đã có cấu hình bảo mật.

`role` quyết định lớp quyền; `user_id`/`creator_id` quyết định quyền sở hữu. Không lấy role hoặc creatorId từ body để cấp quyền. Các API public vẫn cần quy tắc hiển thị track đã gỡ hoặc tác phẩm thuộc tài khoản khóa.

| Sự kiện | Ý định được ghi nhận | Phần chưa chốt |
| --- | --- | --- |
| Login | User hoạt động, mật khẩu đúng → JWT | Payload và quy tắc phiên |
| Logout | Kết thúc sử dụng phiên | Chỉ xóa token hay server vô hiệu hóa |
| Admin khóa user | Ngăn đăng nhập; có yêu cầu thu hồi phiên | Token đang tồn tại và media đang truy cập |
| Reset/đổi mật khẩu | Cập nhật password_hash | OTP, token cũ, tài khoản khóa |
| Duyệt Creator | Cập nhật role/status | Khi nào quyền mới có hiệu lực với token cũ |
| Mở khóa user | deleted_at trở lại NULL | Phiên cũ có hợp lệ trở lại hay không |

Tất cả phần phiên ở [DEC-006](../decisions/open-decisions.md#dec-006). Không tự triển khai refresh token, denylist hoặc session table. Phương án OTP console sáu số/năm phút còn [DEC-003](../decisions/open-decisions.md#dec-003); console OTP chỉ phục vụ ngữ cảnh local được mô tả, không chứng minh xác minh email thật.

## Upload và dữ liệu bền vững

Giới hạn dự kiến: MP3 30 MB, JPG/PNG 5 MB; metadata theo [BR-005](../requirements/business-rules.md#br-005). Kiểm tra đuôi tên không chứng minh nội dung file. Đơn vị giới hạn, MIME/content validation, tên file, đường dẫn, tải trùng và ảnh tùy chọn chưa có hợp đồng đủ ở DEC-009/DEC-017.

Luồng upload có hai loại tài nguyên: file và hàng `tracks`. Cần phân tích các điểm thất bại: chưa ghi file, ghi một phần, file xong/DB lỗi, DB xong/response lỗi, thay file cũ thất bại. Các tình huống là đầu vào thiết kế/kiểm thử, không tự chốt cách rollback, dọn rác hay transaction. Cơ chế cụ thể còn DEC-008/DEC-009/DEC-011.

## Truy cập media

Đường dẫn trong metadata là tham chiếu. Có phương án Express static trên uploads, nhưng route phục vụ media, kiểm tra quyền/trạng thái, nội dung response và HTTP Range chưa được xác nhận.

| Tình huống | Câu hỏi cần giải quyết |
| --- | --- |
| URL của track vừa bị gỡ vẫn được biết | Có cho tải mới hoặc tiếp tục request đang chạy? Kiểm tra trạng thái ở đâu? |
| Creator bị khóa | Các track của họ còn public không? |
| File mất nhưng metadata còn | Lỗi HTTP và hành vi ghi log là gì? |
| Request có Range | Hỗ trợ byte range, trả partial content và xử lý range sai thế nào? |
| Có cache hoặc bản sao | Thời điểm chính sách gỡ có hiệu lực và giới hạn thu hồi là gì? |
| Khôi phục track | File còn tồn tại không, có được phép khôi phục không? |

Những câu hỏi này ở [DEC-009](../decisions/open-decisions.md#dec-009), DEC-005/DEC-018. `tracks.deleted_at` không tự làm file trên filesystem biến mất. Docs không hứa có thể thu hồi dữ liệu đã được tải xuống.

## Bằng chứng cần có trước nghiệm thu

Kiểm tra qua HTTP và thay đổi dữ liệu quan sát được: token sai/hết hạn, truy cập chéo sở hữu, token trước/sau khóa, quyền trước/sau review, lỗi upload và URL trực tiếp sau gỡ. Expected còn thiếu phải đánh dấu blocked, không chọn đáp án trong test. Xem [TC-05](../testing/acceptance.md#tc-05), [TC-09](../testing/acceptance.md#tc-09), [TC-17](../testing/acceptance.md#tc-17), [TC-18](../testing/acceptance.md#tc-18).
