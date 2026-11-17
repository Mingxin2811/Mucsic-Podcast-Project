# Tài liệu dự án Soundwave

Bộ docs này đủ nội dung để phân tích và giao việc backend, database, kiểm thử và quản lý dự án. Các đặc tả là mô tả dự kiến được tổng hợp để rà soát; chưa có bằng chứng phê duyệt toàn bộ thiết kế hoặc chạy ứng dụng.

## Bắt đầu đọc

- Thành viên mới: [tổng quan](project/overview.md) → [hiện trạng](project/status.md) → [kiến trúc](architecture/overview.md) → [use case](requirements/use-cases.md).
- Coding agent: [hướng dẫn repo](../AGENTS.md) → [quy trình](development/workflow.md) → [quyết định mở](decisions/open-decisions.md) → tài liệu của tác vụ.
- Giao việc: [truy xuất](requirements/traceability.md) → [API](api/README.md) → [nghiệm thu](testing/acceptance.md) → [mẫu kế hoạch](plans/template.md).

## Bản đồ nội dung và nơi quản lý

| Nội dung chính | Tài liệu sở hữu |
| --- | --- |
| Mục tiêu, phạm vi, tác nhân, thuật ngữ | [Tổng quan](project/overview.md) |
| Vai trò, WBS, sprint, nguồn lực, rủi ro | [Quản lý](project/management.md) |
| Checkout hiện tại và bằng chứng kiểm chứng | [Hiện trạng](project/status.md) |
| Nghiệp vụ UC01–UC12 | [Use case](requirements/use-cases.md) |
| Quy tắc phân quyền và dữ liệu nghiệp vụ | [Business rules](requirements/business-rules.md) |
| Chất lượng và điều kiện đo | [Quality](requirements/quality.md) |
| Liên kết yêu cầu với thiết kế và kiểm thử | [Traceability](requirements/traceability.md) |
| Ranh giới và luồng dữ liệu | [Kiến trúc](architecture/overview.md) |
| Từ điển bảng, ERD và ràng buộc SQL | [Dữ liệu](architecture/data-model.md) |
| Xác thực, upload và phục vụ media | [Security and media](architecture/security-and-media.md) |
| Request, response và lỗi từng endpoint | [API](api/README.md) |
| Nhận việc, review và môi trường local | [Workflow](development/workflow.md), [local setup](development/local-setup.md) |
| Cách kiểm thử và kịch bản nghiệm thu | [Strategy](testing/strategy.md), [acceptance](testing/acceptance.md) |
| Quy trình và nội dung quyết định | [Quy ước](decisions/README.md), [sổ quyết định](decisions/open-decisions.md) |
| Kế hoạch công việc cụ thể | [Plans](plans/README.md), [template](plans/template.md) |
| Nguồn hướng dẫn tổ chức tài liệu | [References](references.md) |

## Quy ước trạng thái

Ba chiều trạng thái độc lập:

| Chiều | Nhãn | Ý nghĩa |
| --- | --- | --- |
| Đặc tả | `DRAFT` | Nội dung dự kiến, chưa có bằng chứng xác nhận thành hợp đồng cuối cùng |
| Đặc tả | `CONFIRMED` | Có quyết định hoặc xác nhận rõ, ghi người/ngày và phạm vi |
| Quyết định | `OPEN`, `ACCEPTED`, `REJECTED`, `SUPERSEDED` | Vòng đời lựa chọn, xem quy ước quyết định |
| Triển khai | `NOT_IMPLEMENTED`, `PRESENT`, `UNKNOWN` | Chưa có mã, đã thấy mã/artifact, hoặc chưa kiểm tra đủ |
| Kiểm chứng | `NOT_RUN`, `PASS`, `FAIL`, `BLOCKED` | Kết quả một lần kiểm tra có môi trường và bằng chứng |

Hiện trạng tài liệu được xác nhận trong [status](project/status.md). Mô tả một API không nâng trạng thái triển khai; có file SQL không nâng trạng thái chạy database. Quyết định của người dùng về cách tổ chức docs không tự phê duyệt lựa chọn sản phẩm.

## Cách duy trì

Viết tiếng Việt, dùng tên file tiếng Anh dạng kebab-case, mã `UC`, `BR`, `NFR`, `API`, `TC`, `DEC` ổn định. Dùng liên kết tương đối và anchor tường minh cho mã. Mỗi chủ đề có một tài liệu sở hữu; bảng truy xuất dẫn tới nội dung thay vì sao chép toàn bộ.

Trích đoạn mã và response mẫu là minh họa thiết kế, không phải kết quả chạy. Phần thiếu phải nêu cụ thể câu hỏi và mã quyết định; không để một chữ TODO thay cho vấn đề. Nguồn lực và lịch dự kiến không được trình bày thành tiến độ thực tế.
