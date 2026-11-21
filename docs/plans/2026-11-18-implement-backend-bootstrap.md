# Triển khai bootstrap backend và migration tài khoản

## Purpose and context

Dựng backend Soundwave theo [ADR-0006](../decisions/adr-0006-bootstrap-and-account-schema.md). Bàn giao cấu hình local, manifest/lockfile, lệnh chạy và migration đầu tiên cho TC-19.

## Scope and dependencies

Phạm vi gồm khởi động HTTP, kết nối PostgreSQL, migration và kiểm thử bootstrap. Wire auth, IP limit, Resend, Creator, media và seed thuộc các luồng sau. Dùng PostgreSQL 18 dành riêng cho test nếu môi trường cho phép. Các phần còn mở của DEC-003/005/014/017/022 tiếp tục theo sổ quyết định.

## Progress

- [x] 18/11/2026 Đối chiếu ADR, schema đích, hiện trạng checkout và công cụ local.
- [x] 18/11/2026 Dựng backend, lockfile, migration và lệnh test/lint.
- [x] 18/11/2026 Chạy kiểm chứng trên PostgreSQL 18.4 thử riêng và cập nhật hiện trạng, mô hình dữ liệu, TC-19 và ma trận truy xuất.

## Milestones and concrete steps

1. Dựng manifest, cấu hình và entrypoint tại `backend/`. Khóa dependency thực tế.
2. Tạo migration cho `users`, `otp_challenges`, `auth_sessions`. Thêm kiểm tra tích hợp với DB thử và HTTP.
3. Chạy lệnh có sẵn, ghi runtime/cơ sở dữ liệu, kết quả và giới hạn tại [hiện trạng](../project/status.md).

## Validation and acceptance

Kiểm tra lint, khởi động, migrate trên DB trống, migrate lại và các ràng buộc quan trọng. Dùng fixture thử hoặc transaction rollback. Ghi riêng bằng chứng từng hạng mục của TC-19 và phần chưa chạy.

## Recovery and compatibility

Migration có phiên bản, dùng transaction của runner. Môi trường test độc lập với database hiện có. SQL reset và seed cũ là tài liệu đối chiếu.

## Surprises & Discoveries

Máy có Node.js 24.14.1, npm 11.11.0 và PostgreSQL 18.4. Đây là các bản quan sát tại đầu lượt. Baseline đích theo ADR-0006 là Node.js 24.22.3 và PostgreSQL 18.7.

Sandbox mặc định chặn tải package và `initdb` không khởi tạo được với token giới hạn. Sau khi được duyệt, đã tải npm dependency và chạy `initdb`/`pg_ctl` trong thư mục tạm riêng. Fixture kiểm tra `ON DELETE RESTRICT` cần expected SQLSTATE `23001`, ghi nhận từ lượt chạy PostgreSQL 18.4.

## Decision Log

Áp dụng các quyết định [DEC-014](../decisions/open-decisions.md#dec-014) và [DEC-022](../decisions/open-decisions.md#dec-022) đã xác nhận về bootstrap và schema ba bảng.

## Outcomes & Retrospective

Cài lại từ lockfile, lint, `npm start`, `npm run dev`, migration up/retry/down/up và 3 kiểm thử tích hợp đều qua trong môi trường ghi nhận. Đã dừng và dọn cụm DB thử. Các patch đúng baseline, dev reload, seed và chức năng nghiệp vụ vẫn chưa kiểm chứng. [Lệnh đã chạy và kết quả](../project/status.md#backend-bootstrap-run-2026-11-18).
