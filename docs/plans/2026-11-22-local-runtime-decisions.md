# Đồng bộ phạm vi local và DEC-014

## Purpose and context

Ghi nhận phạm vi local-only và nền tảng auth/media đã được xác nhận. [DEC-014](../decisions/open-decisions.md#dec-014).

## Scope and dependencies

Đợt này cập nhật Markdown. DEC-003/008/015/017/022 và kịch bản nghiệm thu cần phản ánh phạm vi local. Migration cho cột `request_ip` thuộc đợt triển khai.

## Progress

- [x] 22/11/2026: Đối chiếu quyết định, API, DDL và các tiêu chí nghiệm thu.
- [x] 22/11/2026: Đồng bộ sổ DEC, ADR-0010 và các tài liệu sở hữu.
- [x] 22/11/2026: Kiểm tra liên kết, sự nhất quán và phạm vi diff.

## Milestones and concrete steps

1. Ghi xác nhận, ADR và phạm vi nào được thay thế.
2. Cập nhật hợp đồng OTP, mô hình dữ liệu, toolchain và nghiệm thu local.
3. Đối chiếu TC, ma trận truy xuất, liên kết, trạng thái DEC và whitespace.

## Validation and acceptance

Kiểm tra tĩnh nội dung đã chốt. Trạng thái triển khai và kiểm chứng runtime theo status.

## Recovery and compatibility

Giữ lịch sử quyết định và migration chín bảng đã kiểm chứng. Phương án migration tiếp theo cho phép `NULL` mà không xóa dữ liệu IP cũ.

## Surprises & Discoveries

Migration đang có khai báo `otp_challenges.request_ip inet NOT NULL`. Luồng OTP local cần thay ràng buộc này trước khi có thể cấp mã mà không ghi IP.

## Decision Log

Ngày 22/11/2026, người dùng xác nhận đề xuất DEC-014 theo phạm vi local. [Bằng chứng](../decisions/open-decisions.md#evidence-local-runtime-2026-11-22).

## Outcomes & Retrospective

Kiểm tra tĩnh ngày 22/11/2026, Asia/Saigon, trên Windows/PowerShell bằng Python 3.14.0 và `git -c core.safecrlf=false diff --check`. Đã đối chiếu 51 Markdown, 1.261 liên kết nội bộ, 20 khối JSON, 39 API-ID, 17 DEC `ACCEPTED`/5 `OPEN` và 10 ADR. Đã đối chiếu riêng nhánh `429` theo email ở API-01/31, phản hồi chung `202` của API-32 và `request_ip NOT NULL` trong migration hiện hành. Các phép kiểm tra tĩnh đều qua. Cả 21 TC đầy đủ vẫn `NOT_RUN`; migration cho phép `NULL`, auth và media còn chờ triển khai.
