# Soundwave

Soundwave là dự án website nghe nhạc và podcast trong học phần Quản lý dự án phần mềm tại PTIT. [Docs](docs/README.md) quản lý yêu cầu, backend, database, kiểm thử và quản lý dự án; chưa đặc tả frontend.

Backend có cấu hình local, entrypoint HTTP, một migration khởi tạo chín bảng nghiệp vụ và kiểm thử tích hợp. Frontend vẫn là khung thư mục. [Thiết lập local](docs/development/local-setup.md), [kết quả kiểm chứng](docs/project/status.md#single-database-migration-2026-11-20).

- Thành viên mới: [tổng quan](docs/project/overview.md) → [mục lục](docs/README.md).
- Coding agent: [AGENTS](AGENTS.md) → [workflow](docs/development/workflow.md) → [sổ DEC](docs/decisions/open-decisions.md).
- Giao việc: [API](docs/api/README.md), [truy xuất](docs/requirements/traceability.md), [nghiệm thu](docs/testing/acceptance.md).

Bootstrap theo ADR-0006. Schema chín bảng khởi tạo trên PostgreSQL 18 trống theo ADR-0007. [ADR-0006](docs/decisions/adr-0006-bootstrap-and-account-schema.md), [ADR-0007](docs/decisions/adr-0007-single-initial-database-migration.md), [hợp đồng API còn thiếu](docs/api/README.md#contract-gaps).
