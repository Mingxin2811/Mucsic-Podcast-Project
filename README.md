# Soundwave

Soundwave là dự án website nghe nhạc và podcast trong học phần Quản lý dự án phần mềm tại PTIT. [Docs](docs/README.md) quản lý yêu cầu, backend, database, kiểm thử và quản lý dự án; chưa đặc tả frontend.

Checkout có SQL cấu trúc/seed và khung backend/frontend, chưa có manifest/API server/test suite hoặc kết quả chạy ứng dụng. Đọc [hiện trạng](docs/project/status.md#simple-sync-2026-11-17) trước khi thiết lập; SQL reset không phải migration.

- Thành viên mới: [tổng quan](docs/project/overview.md) → [mục lục](docs/README.md).
- Coding agent: [AGENTS](AGENTS.md) → [workflow](docs/development/workflow.md) → [sổ DEC](docs/decisions/open-decisions.md).
- Giao việc: [API](docs/api/README.md), [truy xuất](docs/requirements/traceability.md), [nghiệm thu](docs/testing/acceptance.md).

Ngày 17/11/2026, người dùng chấp nhận [phương án backend đơn giản](docs/decisions/open-decisions.md#evidence-simple-2026-11-17): bộ công cụ/Resend/scrypt/HS256/cookie-CSRF, schema logic, lượt nghe/search/reorder/text. Hiện 39 API-ID/14 DEC ACCEPTED/8 OPEN/5 ADR, mọi TC NOT_RUN. [API gaps](docs/api/README.md#contract-gaps) ghi chi tiết chưa chốt; xác nhận thiết kế không là bằng chứng triển khai.
