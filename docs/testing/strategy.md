# Chiến lược kiểm thử backend và database

Lựa chọn nghiệp vụ `CONFIRMED` theo [sổ DEC](../decisions/open-decisions.md). Protocol và wire chưa đủ giữ `DRAFT`. `npm test` dùng `node:test` để kiểm bootstrap HTTP và migration khởi tạo chín bảng. Phần DDL khởi tạo của TC-19 đã `PASS`. Các TC đầy đủ vẫn `NOT_RUN`. [Nghiệm thu](acceptance.md), [bằng chứng chạy](../project/status.md#single-database-migration-2026-11-20).

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
| Hiệu năng/phục hồi file | Đạt ngưỡng local và giữ nhất quán DB/file khi lỗi | Protocol đo thuộc DEC-015; recovery file thuộc DEC-022. |

## Dữ liệu và môi trường

Chuẩn bị fixture riêng: user chưa/đã xác minh email, email provider thử và cookie/CSRF; Listener A/B; Creator A/B đã duyệt; user pending/rejected/locked; Admin; track music/podcast/đã gỡ; playlist của hai user; genre đang được tham chiếu; MP3 CBR/VBR, giả đuôi/sai codec/lỗi giải mã, cover default/shared, file hợp lệ/quá giới hạn/sai nội dung và file không tồn tại. Đây là nhu cầu test, chưa phải tài khoản/file được tạo.

Seed demo, hash, quyền sử dụng file và quan hệ metadata cần DEC-020. Lệnh `npm test` ở `backend/` đọc `.env.test` nếu có, yêu cầu `TEST_DATABASE_URL`, áp migration và chạy `node:test` với HTTP `fetch`. Chạy tuần tự khi dùng chung DB thử. Tách fixture test khỏi seed demo, dùng Resend giả lập trong test tích hợp và Resend thật khi nghiệm thu email. [Thiết lập local](../development/local-setup.md), [DEC-020](../decisions/open-decisions.md#dec-020), [TC-19](acceptance.md#tc-19).

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

Nghiệm thu theo phạm vi UC và ngưỡng chất lượng được chốt ở DEC-001/DEC-015/DEC-016. Mọi TC thuộc phạm vi cần bằng chứng hoặc lý do blocked rõ ràng; blocked không được tính là pass. Với thay đổi docs, kiểm tra liên kết, độ bao phủ, whitespace và đọc thử luồng tra cứu.

## Kiểm chứng tài liệu trong đợt đồng bộ

Kiểm tra link/anchor và mã UC/BR/NFR/API/TC/DEC/ADR; JSON parse được, envelope/pagination thống nhất; route/method danh mục khớp trang nhóm; 204 không body, login không token JSON, đăng ký không Creator payload. Khi kiểm tra docs, đối chiếu mô hình chín bảng với migration hiện hành và phần DDL cũ với `database/schema.sql` bằng đọc tĩnh. Kiểm tra diff/whitespace cả file mới và phạm vi chỉ docs/điểm vào. Bằng chứng đợt mới ghi riêng tại status, không sửa kết quả lịch sử 11/11/2026.

## Bổ sung kiểm chứng media

GET/HEAD API-28/29 có thể kiểm thử bằng HTTP sau bootstrap; GET success là binary, HEAD không body cả lỗi và bỏ Range. Kiểm tra byte chính xác với fixture xác định kích thước, 200/206/400/416/404/503, no-store và audioUrl không lộ storage path. Không suy ra seek hoạt động chỉ từ JSON metadata.

Các failpoint upload phải phân biệt rollback đã biết với COMMIT không rõ; chỉ fault injection trên môi trường dùng riêng. Job cleanup kiểm soát clock/trạng thái tham chiếu và không xóa file đang chạy; full decode/Sharp/ffprobe cần giới hạn tài nguyên đã được chốt tại DEC-014 trước thực thi. TC-08/09/11/17/21 được cập nhật, vẫn NOT_RUN. Phương pháp nhận biết active/recovery state cần DEC-022, không được tự chọn trong test.

## Kiểm chứng lựa chọn đơn giản đã chấp nhận

Nguồn [xác nhận](../decisions/open-decisions.md#evidence-simple-2026-11-17), không có runtime mới. node:test/fetch/PostgreSQL thử riêng/ESLint là công cụ đích. Cần fixture password biên 12–128/có khoảng trắng và scrypt salt khác nhau; Resend thật, user email_verified_at NULL, HMAC OTP/lượt gửi/cooldown; cookie soundwave_session/HS256/CSRF header-Origin; keyword 100 ký tự-10 từ/đ-Đ/Unicode/literal wildcard/search_text cập nhật cùng metadata; text theo type/HTML/rỗng-null; Guest UUID ký/login chuyển ID/cooldown trượt-bảy ngày; reorder hiển thị/ẩn cuối-hiện lại cuối/tập đổi 409/hai reorder hợp lệ tuần tự/UNIQUE lúc commit.

Điều khiển clock và thứ tự transaction khi kiểm cooldown, hạn mức theo email, reset/thu hồi phiên, OTP gửi đồng thời và `failed`/`unknown`. Với TC-04 so sánh status, body và thời gian phản hồi. TC-21 kiểm dữ liệu qua restart, phát media local và lỗi DB/file. Nhánh thiếu expected về HTTP hoặc giao dịch ghi `BLOCKED` cùng DEC-017/022 tương ứng. [Vòng đời OTP](../architecture/security-and-media.md#otp-delivery), [phạm vi local](../decisions/open-decisions.md#evidence-local-runtime-2026-11-22).
