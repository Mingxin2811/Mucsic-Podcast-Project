# Chiến lược kiểm thử backend và database

Đồng bộ 17/11/2026: lựa chọn nghiệp vụ CONFIRMED theo [sổ DEC](../decisions/open-decisions.md#evidence-2026-11-17), protocol/wire chưa đủ vẫn DRAFT. Chưa có test runner hoặc ứng dụng để thực thi; mọi kịch bản trong [acceptance](acceptance.md) hiện `NOT_RUN`. Đây là thiết kế kiểm chứng, không phải báo cáo kết quả.

## Phạm vi

Kiểm thử tài khoản, API, phân quyền và sở hữu, lifecycle dữ liệu/media, truy vấn, upload, playlist, quản trị, ràng buộc SQL, seed và phép đo backend được xác nhận. Không viết kịch bản giao diện hoặc triển khai frontend. UC06 chỉ kiểm chứng dữ liệu và khả năng media thuộc backend; không coi đó là nghiệm thu toàn bộ điều khiển nghe nâng cao.

## Các lớp kiểm chứng

| Lớp | Mục đích | Điều kiện |
| --- | --- | --- |
| Kiểm tra tĩnh | So sánh đặc tả, route và DDL, tìm khoảng trống | Thực hiện được trên file, không chứng minh runtime |
| Unit có ý nghĩa | Quy tắc nghiệp vụ độc lập và nhánh lỗi cần bảo vệ | Khi có mã; expected từ yêu cầu đã chốt, không sao chép thuật toán vào test |
| API tích hợp | Request/response, quyền, thay đổi DB quan sát được | Runtime, database thử nghiệm, hợp đồng được chốt |
| Database | FK, UNIQUE, CHECK, default, seed/sequence và rollback | Đúng engine/version, dữ liệu dùng riêng |
| Media | File upload, thất bại từng phần, truy cập trực tiếp và Range | Nơi lưu, chính sách truy cập và file demo được xác nhận |
| Nghiệm thu nghiệp vụ | Luồng Creator → tác phẩm → tìm kiếm → playlist → kiểm duyệt | Các hợp đồng liên quan ổn định và bằng chứng từng bước |
| Hiệu năng/phục hồi | Đạt ngưỡng và tái hiện được dữ liệu | Protocol đo/backup đã chốt, không tự đặt tải hoặc SLA |

## Dữ liệu và môi trường

Chuẩn bị fixture riêng: user chưa/đã xác minh email, email provider thử và cookie/CSRF; Listener A/B; Creator A/B đã duyệt; user pending/rejected/locked; Admin; track music/podcast/đã gỡ; playlist của hai user; genre đang được tham chiếu; MP3 CBR/VBR, giả đuôi/sai codec/lỗi giải mã, cover default/shared, file hợp lệ/quá giới hạn/sai nội dung và file không tồn tại. Đây là nhu cầu test, chưa phải tài khoản/file được tạo.

Không mặc định seed hiện tại là fixture hợp lệ. Hash, đường dẫn, quyền sử dụng và quan hệ metadata cần [DEC-020](../decisions/open-decisions.md#dec-020), [TC-19](acceptance.md#tc-19). Không chạy reset SQL trên dữ liệu cần giữ. PostgreSQL 18 và test runner tích hợp Node đã chọn; fetch HTTP/DB thử riêng đã chọn, cách cô lập/lệnh còn DEC-014. Resend đã chọn nhưng tài khoản/API key/domain xác minh và hosting chưa có, không gọi mock mail là nghiệm thu email thật.

## Phụ thuộc quyết định

Expected nghiệp vụ đã được chấp nhận không cần xin lại quyết định. Trước khi thực thi, đọc riêng chi tiết wire/protocol còn OPEN và xác nhận phần thực sự phụ thuộc vào chúng. Với nhánh thiếu expected, ghi `BLOCKED` cùng mã DEC cụ thể; tiếp tục phần có hợp đồng đã xác nhận và không phụ thuộc. Không chọn phương án thông qua việc viết test.

Ưu tiên ranh giới có hậu quả: cookie/CSRF, phiên từng thiết bị sau logout, toàn bộ phiên sau khóa/đổi-reset mật khẩu, mở khóa không hồi sinh phiên, quyền sau duyệt, backend restart/DB lỗi, tài nguyên khác chủ, URL trực tiếp sau gỡ, file còn dư khi DB lỗi, COMMIT không rõ/response mất, hai cập nhật cover cạnh tranh, job dọn khi active/tham chiếu/soft delete hoặc DB lỗi, thêm/reorder playlist đồng thời. Khi có yêu cầu đồng thời được chốt, điều khiển thứ tự thực thi để kiểm tra trạng thái cuối; chạy happy path tuần tự không chứng minh điều đó.

## Ghi bằng chứng

Mỗi lần chạy dùng mẫu:

```text
Run ID:
Ngày giờ và múi giờ:
Revision ứng dụng / SQL / đặc tả:
Người thực hiện:
Engine/runtime/storage và cấu hình liên quan:
Fixture và điều kiện đầu:
TC / UC / API / quyết định đã xác nhận:
Lệnh hoặc request đã chạy:
Expected theo hợp đồng:
Actual và thay đổi dữ liệu/file:
Kết quả: PASS / FAIL / BLOCKED
Đường dẫn log hoặc trích bằng chứng đã loại bí mật:
Giới hạn kiểm chứng và cách dọn dữ liệu thử:
```

Chưa chạy thì `NOT_RUN`, không ghi `PASS` từ mock, ví dụ JSON hay số lượng file. Báo riêng vấn đề tài liệu, lỗi ứng dụng và môi trường không khả dụng.

## Điều kiện kết thúc

Nghiệm thu theo phạm vi UC và ngưỡng chất lượng được chốt ở DEC-001/DEC-015/DEC-016. Mọi TC thuộc phạm vi cần bằng chứng hoặc lý do blocked rõ ràng; blocked không được tính là pass. Test command và bộ kiểm tra cuối chỉ bổ sung khi toolchain tồn tại. Với thay đổi docs, dùng kiểm tra liên kết/coverage/whitespace và đọc thử luồng tra cứu; không chạy application test chưa có.

## Kiểm chứng tài liệu trong đợt đồng bộ

Kiểm tra link/anchor và mã UC/BR/NFR/API/TC/DEC/ADR; JSON parse được, envelope/pagination thống nhất; route/method danh mục khớp trang nhóm; 204 không body, login không token JSON, đăng ký không Creator payload. Đối chiếu từ điển DDL hiện có với schema.sql bằng đọc tĩnh, không chạy SQL; schema đích không bị kiểm như đã triển khai. Kiểm tra diff/whitespace cả file mới và phạm vi chỉ docs/điểm vào. Bằng chứng đợt mới ghi riêng tại status, không sửa kết quả lịch sử 11/11/2026.

## Bổ sung kiểm chứng media

GET/HEAD API-28/29 có thể kiểm thử bằng HTTP sau bootstrap; GET success là binary, HEAD không body cả lỗi và bỏ Range. Kiểm tra byte chính xác với fixture xác định kích thước, 200/206/400/416/404/503, no-store và audioUrl không lộ storage path. Không suy ra seek hoạt động chỉ từ JSON metadata.

Các failpoint upload phải phân biệt rollback đã biết với COMMIT không rõ; chỉ fault injection trên môi trường dùng riêng. Job cleanup kiểm soát clock/trạng thái tham chiếu và không xóa file đang chạy; full decode/Sharp/ffprobe cần giới hạn tài nguyên đã được chốt tại DEC-014 trước thực thi. TC-08/09/11/17/21 được cập nhật, vẫn NOT_RUN. Phương pháp nhận biết active/recovery state cần DEC-022, không được tự chọn trong test.

## Kiểm chứng lựa chọn đơn giản đã chấp nhận

Nguồn [xác nhận](../decisions/open-decisions.md#evidence-simple-2026-11-17), không có runtime mới. node:test/fetch/PostgreSQL thử riêng/ESLint là công cụ đích. Cần fixture password biên 12–128/có khoảng trắng và scrypt salt khác nhau; Resend thật, user email_verified_at NULL, HMAC OTP/lượt gửi/cooldown; cookie soundwave_session/HS256/CSRF header-Origin; keyword 100 ký tự-10 từ/đ-Đ/Unicode/literal wildcard/search_text cập nhật cùng metadata; text theo type/HTML/rỗng-null; Guest UUID ký/login chuyển ID/cooldown trượt-bảy ngày; reorder hiển thị/ẩn cuối-hiện lại cuối/tập đổi 409/hai reorder hợp lệ tuần tự/UNIQUE lúc commit.

Điều khiển clock và interleaving transaction để kiểm cooldown/thứ tự/quyền, không chỉ HTTP happy path. listenedSeconds client không chứng minh nghe thật, Guest→user có thể thêm lượt là đánh đổi đã chấp nhận. Các nhánh IP limit/timeout email/CSRF response/Origin policy/schema-lock order chưa đủ expected báo BLOCKED theo DEC-003/005/014/017/022 khi thực thi. Không phát minh giá trị để chạy test.
