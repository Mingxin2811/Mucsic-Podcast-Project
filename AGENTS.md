# Hướng dẫn làm việc trong repo Soundwave

## Đọc trước khi làm

1. Đọc [mục lục và quy ước](docs/README.md), [hiện trạng](docs/project/status.md).
2. Đọc [quy trình nhận việc](docs/development/workflow.md) và những quyết định liên quan trong [sổ quyết định](docs/decisions/open-decisions.md).
3. Chọn tài liệu theo tác vụ bên dưới; không cần tải toàn bộ docs cho mọi thay đổi.

| Tác vụ | Đọc tiếp |
| --- | --- |
| Yêu cầu và phạm vi | [Use case](docs/requirements/use-cases.md), [quy tắc](docs/requirements/business-rules.md), [truy xuất](docs/requirements/traceability.md) |
| API và xác thực | [Danh mục API](docs/api/README.md), nhóm API liên quan, [xác thực và media](docs/architecture/security-and-media.md) |
| Database | [Mô hình dữ liệu](docs/architecture/data-model.md), SQL hiện có, các quyết định schema |
| Upload và phát media | [Kiến trúc](docs/architecture/overview.md), [xác thực và media](docs/architecture/security-and-media.md), [tracks API](docs/api/tracks.md) |
| Kiểm thử | [Chiến lược](docs/testing/strategy.md), [nghiệm thu](docs/testing/acceptance.md), [chất lượng](docs/requirements/quality.md) |
| Kế hoạch và tiến độ | [Quản lý](docs/project/management.md), [mẫu giao việc](docs/plans/README.md) |

## Quy tắc thực hiện

- Nội dung dự án được quản lý trong `docs/`; README và file này chỉ là điểm vào và hướng dẫn làm việc.
- Tuân thủ phạm vi người dùng giao. Bộ docs hiện không đặc tả màn hình hoặc cách triển khai frontend.
- `DRAFT` là mô tả dự kiến; `OPEN` là quyết định chưa chốt. Không lấy thứ tự thời gian, ví dụ JSON, SQL có sẵn hoặc sự im lặng làm bằng chứng phê duyệt.
- Không tự chọn phương án cho quyết định mở. Nêu mã `DEC`, phần việc bị chặn và tiếp tục phần độc lập đã được giao. Chỉ hỏi quyết định khi công việc thực sự phụ thuộc vào nó.
- Phát hiện xung đột hoặc thiếu quyết định: bổ sung sổ quyết định, dẫn liên kết tại tài liệu bị ảnh hưởng; không âm thầm đổi hợp đồng.
- Phân biệt nội dung đã viết, chức năng đã triển khai và hành vi đã kiểm chứng. Chỉ ghi `PASS` khi có lần chạy, môi trường và bằng chứng.
- Khi thay đổi hành vi hoặc schema đã được xác nhận, cập nhật tài liệu sở hữu nội dung và ma trận truy xuất trong cùng công việc.
- Với công việc nhiều bước, dùng [quy ước kế hoạch](docs/plans/README.md); ghi lại phát hiện, tiến độ và kết quả thực tế.
- Kiểm tra các lệnh tồn tại trước khi chạy. Repo chưa có lệnh test/build ứng dụng được xác nhận; xem [thiết lập local](docs/development/local-setup.md).
- SQL khởi tạo và seed có thao tác xóa dữ liệu. Không chạy chúng chỉ để đọc tài liệu hoặc kiểm tra cấu trúc.
- Không ghi bí mật thật vào tài liệu hoặc bằng chứng; dùng dữ liệu thử phù hợp khi cần kiểm chứng.
