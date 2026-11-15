# Chiến lược kiểm thử backend và database

Trạng thái: `DRAFT`. Chưa có test runner hoặc ứng dụng để thực thi; mọi kịch bản trong [acceptance](acceptance.md) hiện `NOT_RUN`. Đây là thiết kế kiểm chứng, không phải báo cáo kết quả.

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

Chuẩn bị fixture riêng: Listener A/B; Creator A/B đã duyệt; user pending/rejected/locked; Admin; track music/podcast/đã gỡ; playlist của hai user; genre đang được tham chiếu; file hợp lệ, quá giới hạn, sai nội dung và file không tồn tại. Đây là nhu cầu test, chưa phải tài khoản/file được tạo.

Không mặc định seed hiện tại là fixture hợp lệ. Hash, đường dẫn, quyền sử dụng và quan hệ metadata cần [DEC-020](../decisions/open-decisions.md#dec-020), [TC-19](acceptance.md#tc-19). Không chạy reset SQL trên dữ liệu cần giữ. Công cụ và cách cô lập database thuộc DEC-013/DEC-014.

## Phụ thuộc quyết định

Expected đã có mô tả vẫn là DRAFT. Trước khi thực thi một hợp đồng mới, xác nhận các DEC ảnh hưởng. Với nhánh thiếu expected, ghi `BLOCKED` cùng mã DEC cụ thể; tiếp tục phần có hợp đồng đã xác nhận và không phụ thuộc. Không chọn phương án thông qua việc viết test.

Ưu tiên ranh giới có hậu quả: token cũ sau khóa/duyệt, tài nguyên khác chủ, URL trực tiếp sau gỡ, file còn dư khi DB lỗi, thêm/reorder playlist đồng thời. Khi có yêu cầu đồng thời được chốt, điều khiển thứ tự thực thi để kiểm tra trạng thái cuối; chạy happy path tuần tự không chứng minh điều đó.

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
