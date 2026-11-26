# ADR-0007 Một migration khởi tạo chín bảng nghiệp vụ

Trạng thái `Accepted` ngày 20/11/2026, Asia/Saigon. [Xác nhận DEC-022](open-decisions.md#evidence-single-migration-2026-11-20).

## Quyết định

Gom chín bảng nghiệp vụ vào một migration trên PostgreSQL 18 trống. Giữ DDL ba bảng tài khoản đã chốt. Bổ sung hồ sơ Creator, thể loại, track, cooldown lượt nghe, playlist và liên kết playlist–track. Runner hiện có áp dụng một transaction và ghi một dòng lịch sử trong `public.pgmigrations`. [Migration](../../backend/migrations/20261120000000000_create-initial-schema.js), [mô hình dữ liệu](../architecture/data-model.md#target-model).

Quyết định này thay phạm vi migration ba bảng và kế hoạch bổ sung theo từng luồng trong [ADR-0006](adr-0006-bootstrap-and-account-schema.md). Nó giữ nền tảng và giao dịch auth của ADR-0006. Database đã áp migration ba bảng cần tiếp tục dùng lịch sử hiện có hoặc dùng DB trống riêng cho baseline mới. Seed demo và phần lưu dữ liệu kỹ thuật chưa chốt thuộc các tác vụ riêng.
