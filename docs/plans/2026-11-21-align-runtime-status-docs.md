# Đồng bộ hiện trạng schema và kiểm thử trong tài liệu

## Purpose and context

Một số trang hiện hành mô tả thời điểm trước bootstrap. Đối chiếu mô tả với migration, manifest, test hiện có và bằng chứng [SCHEMA-20261120-01](../project/status.md#single-database-migration-2026-11-20).

## Scope and dependencies

Cập nhật các mô tả hiện trạng về schema, bootstrap và runner. Dùng phạm vi bằng chứng đã ghi cho TC-19. Giữ các snapshot lịch sử làm nguồn tra cứu.

## Progress

- [x] 21/11/2026 — Xác định mô tả cũ và đọc migration, manifest, test, bằng chứng.
- [x] 21/11/2026 — Đồng bộ các trang hiện hành và hướng dẫn tra lệnh.
- [x] 21/11/2026 — Kiểm tra tĩnh và ghi bằng chứng.

## Milestones and concrete steps

1. Sửa ma trận truy xuất UC12 và các trang hiện hành về schema.
2. Sửa mô tả bootstrap/runner, dẫn đến lệnh thử riêng và kết quả TC-19.
3. Kiểm liên kết, trạng thái kịch bản và whitespace.

## Validation and acceptance

Đối chiếu `creator_applications` với migration và `npm test` với manifest. Phần DDL TC-19 dẫn tới lần chạy đã ghi. Trạng thái toàn bộ TC vẫn theo bằng chứng hiện hành.

## Recovery and compatibility

Rà diff tại các đoạn mô tả hiện trạng và giữ nội dung đang chỉnh sửa của đợt OTP.

## Surprises & Discoveries

NFR-003 và hướng dẫn lệnh ở điểm vào cũng dùng mô tả trước bootstrap.

## Decision Log

Thay đổi là cập nhật dữ kiện. [Hiện trạng](../project/status.md#single-database-migration-2026-11-20) và [ADR-0007](../decisions/adr-0007-single-initial-database-migration.md) là nguồn đối chiếu.

## Outcomes & Retrospective

Windows/PowerShell, ngày 21/11/2026. Kiểm tĩnh qua Python đối chiếu `npm test` trong manifest, bốn test trong mã, chín bảng trong migration và phạm vi TC-19. Đã kiểm 301 liên kết nội bộ và whitespace của chín file Markdown trong đợt này. `git diff --check` không báo lỗi. Đây là kiểm tra tài liệu. Trạng thái TC-19 dẫn lại lần chạy SCHEMA-20261120-01.
