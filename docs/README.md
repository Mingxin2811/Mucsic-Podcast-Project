# Tài liệu dự án Soundwave

Bộ docs phục vụ giao việc backend, database, kiểm thử và quản lý dự án. Phần `CONFIRMED` có nguồn tại sổ DEC. Chi tiết chưa chốt giữ `DRAFT`. Bootstrap backend và một migration khởi tạo chín bảng đã chạy trên PostgreSQL 18 thử nghiệm. [Hiện trạng](project/status.md#single-database-migration-2026-11-20).

## Hiện hành sau xác nhận bootstrap và schema tài khoản

Ngày 18/11/2026 đã chốt bootstrap và auth. Ngày 20/11/2026 đã chốt một migration cho chín bảng nghiệp vụ trên PostgreSQL 18 trống. Hiện **39 API-ID, 14 DEC ACCEPTED/8 OPEN, 7 ADR**, với 12 UC/9 BR/5 NFR/21 TC. [ADR-0006](decisions/adr-0006-bootstrap-and-account-schema.md), [ADR-0007](decisions/adr-0007-single-initial-database-migration.md).

Phần còn mở gồm IP limit, wire auth, thứ tự khóa khi API cập nhật nhiều bảng, phiên bản và giới hạn media, recovery, hosting, demo và nghiệm thu. [ADR-0005](decisions/adr-0005-simple-backend-contracts.md), [hợp đồng còn thiếu](api/README.md#contract-gaps).

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
| Quy trình và nội dung quyết định | [Quy ước](decisions/README.md), [sổ quyết định và phần còn mở](decisions/open-decisions.md) |
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

Hiện trạng tài liệu được xác nhận trong [status](project/status.md). Mục OPEN có thể chứa phần đã xác nhận và câu hỏi còn thiếu; đọc từng kết quả, không tự chọn lại hoặc tự chốt chi tiết. Mô tả một API không nâng trạng thái triển khai; có file SQL không nâng trạng thái chạy database. Quyết định của người dùng về cách tổ chức docs không tự phê duyệt lựa chọn sản phẩm.

## Cách duy trì

Viết tiếng Việt, dùng tên file tiếng Anh dạng kebab-case, mã `UC`, `BR`, `NFR`, `API`, `TC`, `DEC` ổn định. Dùng liên kết tương đối và anchor tường minh cho mã. Mỗi chủ đề có một tài liệu sở hữu; bảng truy xuất dẫn tới nội dung thay vì sao chép toàn bộ.

Trích đoạn mã và response mẫu là minh họa thiết kế, không phải kết quả chạy. Phần thiếu phải nêu cụ thể câu hỏi và mã quyết định; không để một chữ TODO thay cho vấn đề. Nguồn lực và lịch dự kiến không được trình bày thành tiến độ thực tế.

## Bản đồng bộ quyết định 17/11/2026 — snapshot DOCSYNC-20261117-01

Đã chọn OTP email thật, sẵn sàng online, nhạc/podcast lưu filesystem bền vững máy chủ; JWT + phiên PostgreSQL/cookie bảo vệ 24 giờ, không refresh. Node.js 24/Express 5/JavaScript ESM/npm/pg/PostgreSQL 18 là nền tảng đích. Nghiệp vụ và API được đồng bộ phần đã chốt; SQL hiện có chưa được sửa hoặc chạy.

Đọc [kết quả DEC và giới hạn](decisions/open-decisions.md), [hợp đồng còn thiếu](api/README.md#contract-gaps), [schema đích](architecture/data-model.md#target-model), [kế hoạch đang thực hiện](plans/2026-11-17-documentation-decisions-interview.md). Số endpoint/bảng trong kiểm kê lịch sử không tự bằng số hợp đồng/schema đích. Tại snapshot này chưa chọn provider email/hosting hoặc đủ wire/migration/lịch/protocol; Resend và route bổ sung được chọn ở đợt đơn giản hóa phía trên.

## Bổ sung hợp đồng media 17/11/2026 — snapshot DOCSYNC-20261117-02

Người dùng đã chấp nhận [DEC-009/DEC-011](decisions/open-decisions.md#evidence-media-2026-11-17). Có [API-28 GET/API-29 HEAD audio](api/tracks.md#api-28), metadata audioUrl, Range/no-store/error, ffprobe/FFmpeg/Sharp, duration ceiling và vòng đời file–DB/cover. [ADR-0004](decisions/adr-0004-audio-contract-and-file-lifecycle.md) bổ sung ADR-0002; [kế hoạch media](plans/2026-11-17-media-contracts.md) và [bằng chứng đợt media](project/status.md#media-sync-2026-11-17) tách khỏi DOCSYNC-20261117-01. Tại snapshot media có 29 API-ID, 10 DEC ACCEPTED/12 OPEN; hiện hành đọc mục phương án đơn giản phía trên. Không có code/SQL hoặc runtime test phát sinh.
