# Quy trình nhận việc và cập nhật tài liệu

Quy trình này áp dụng cho công việc được giao trong repo; không tự mở rộng quyền commit, push, tạo PR, thay cấu hình hoặc triển khai ra ngoài phạm vi người dùng yêu cầu.

## Nhận việc

1. Đọc [hiện trạng](../project/status.md) để biết mã/lệnh nào thực sự có.
2. Xác định UC, quy tắc, API/bảng liên quan qua [traceability](../requirements/traceability.md).
3. Đọc các `DEC` liên quan. Phân biệt phần có thể làm độc lập và phần phụ thuộc kết quả chưa chốt.
4. Với công việc nhiều bước, ghi [kế hoạch](../plans/README.md) có đầu vào, giới hạn, đầu ra và phép kiểm chứng. Không tạo kế hoạch triển khai một phương án OPEN như thể đã được chọn.

Khi tác vụ phụ thuộc quyết định mở, nêu mã, lựa chọn cần chốt và ảnh hưởng cụ thể. Tiếp tục phần độc lập đã được giao; không yêu cầu xác nhận chung chỉ để tiếp tục công việc đã rõ. Nếu phát hiện thông tin mới, bổ sung đúng mục quyết định hoặc tạo mã mới theo [quy trình](../decisions/README.md).

## Trong quá trình làm

Giữ thay đổi tập trung theo đầu ra đã giao. Khi phát hiện mã và đặc tả khác nhau, ghi cả hành vi quan sát và ý định; không tự coi mã có trước hoặc tài liệu mới hơn là đáp án đúng. Xác nhận hợp đồng trước khi đổi public API/schema có ảnh hưởng.

Duy trì phần tiến độ, phát hiện và bằng chứng của kế hoạch. Chỉ nâng trạng thái triển khai khi đã thấy artifact; chỉ ghi PASS khi có kiểm tra tái hiện được. Lệnh không tồn tại không được đổi thành một lệnh tưởng tượng để ghi hoàn thành.

## Review và bàn giao

- Đối chiếu kết quả với phạm vi và các quyết định được xác nhận, không chỉ với số file đã thay đổi.
- Kiểm tra nội dung nhạy cảm trong cấu hình, mẫu và log. Dùng ví dụ thử thay vì bí mật thật.
- Cập nhật tài liệu sở hữu hành vi, ma trận truy xuất và hiện trạng khi có thay đổi liên quan. Không sao chép nguyên hợp đồng API sang nhiều nơi.
- Chạy kiểm tra phù hợp với thay đổi. Với docs: đường dẫn/anchor, coverage UC/API/bảng, mâu thuẫn và whitespace. Với ứng dụng tương lai: dùng toolchain được xác nhận tại DEC-014.
- Báo những gì đã thay đổi, bằng chứng, giới hạn và việc bị chặn bởi mã DEC cụ thể.

Nhóm từng mô tả feature branch, review chéo và không push trực tiếp main trong quy trình quản lý. Chính sách nhánh, reviewer và công cụ thực tế còn [DEC-016](../decisions/open-decisions.md#dec-016); docs này không tự cấu hình hoặc chứng nhận branch protection. Thực hiện thao tác Git theo phạm vi được giao.

## Ba tình huống tra cứu

**Giao việc auth:** UC01/UC02 → BR-003 → API-01–API-04 → DEC-002/DEC-003/DEC-006/DEC-014/DEC-017 → TC-01–TC-05. Có thể phân tích hợp đồng; chưa thể tự quyết JWT revocation hoặc thêm route OTP.

**Thay đổi database:** data-model → SQL hiện có → DEC-007/DEC-013/DEC-014/DEC-019/DEC-022 → TC-19 và UC bị ảnh hưởng. Đọc DDL được phép; script reset không phải migration nâng cấp.

**Endpoint xung đột:** tìm API-ID → DEC-004 → trình bày cả hai method/path và tác vụ bị chặn. Không thêm alias hoặc route đôi để né việc chốt. Cập nhật hợp đồng/test sau khi có kết quả xác nhận.
