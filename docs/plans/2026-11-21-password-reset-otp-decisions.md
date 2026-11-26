# Đồng bộ quyết định OTP khôi phục mật khẩu

## Purpose and context

Ghi nhận phương án người dùng xác nhận cho DEC-003, API-30–33, BR-003, NFR-002 và TC-02/04. Backend hiện có bootstrap và migration chín bảng, bao gồm `otp_challenges`. [Hiện trạng](../project/status.md#single-database-migration-2026-11-20).

## Scope and dependencies

Cập nhật sổ quyết định, ADR, hợp đồng, kiến trúc, yêu cầu, truy xuất và kiểm thử trong `docs/`. DEC-014 còn nguồn IP tin cậy sau proxy; DEC-022 còn DDL bảng hạn mức reset. DEC-005/017 tiếp tục quản lý chi tiết wire ngoài các nhánh được xác nhận.

## Progress

- [x] 21/11/2026: Đối chiếu quyết định, API, schema và kịch bản nghiệm thu hiện hành.
- [x] 21/11/2026: Đồng bộ quyết định, ADR-0009 và các tài liệu sở hữu.
- [x] 21/11/2026: Kiểm tra tham chiếu, trạng thái và nội dung diff.

## Milestones and concrete steps

1. Ghi xác nhận, trạng thái DEC-003 và lý do kiến trúc.
2. Đồng bộ hành vi API-30–33, dữ liệu IP, kỳ dọn, yêu cầu và expected của TC-02/04.
3. Kiểm tra link, số quyết định, ma trận truy xuất và phạm vi thay đổi; ghi kết quả tại đây.

## Validation and acceptance

Đối chiếu quy tắc ở sổ DEC với API, kiến trúc và TC; kiểm tra liên kết Markdown và whitespace. Các kịch bản OTP giữ `NOT_RUN`.

## Recovery and compatibility

Rà soát diff Markdown so với working tree đầu lượt; bảo toàn các cập nhật đã có của OTP đăng ký và bằng chứng chạy bootstrap/migration.

## Surprises & Discoveries

`otp_challenges.user_id` bắt buộc. Đếm tất cả yêu cầu reset theo IP cần nơi lưu riêng, vì một yêu cầu hợp lệ có thể chưa gắn với tài khoản.

## Decision Log

Ngày 21/11/2026, người dùng trong phiên xác nhận phương án cho DEC-003; xem [bằng chứng](../decisions/open-decisions.md#evidence-password-reset-otp-2026-11-21).

## Outcomes & Retrospective

Kiểm tra tĩnh ngày 21/11/2026, Asia/Saigon, trên checkout Windows/PowerShell bằng Python 3.14 và `git -c core.safecrlf=false diff --check`. Đối chiếu 48 file Markdown và 1.221 liên kết nội bộ, 39 API-ID có truy xuất, 15 DEC `ACCEPTED`/7 `OPEN`, 9 ADR, trạng thái `NOT_RUN` và các status/mã lỗi OTP. Các phép kiểm tra đều qua. Cập nhật thuộc phạm vi Markdown; API OTP, migration bổ sung, gửi email thật và kịch bản nghiệm thu vẫn chờ triển khai hoặc chạy kiểm chứng. Nguồn IP, schema và wire ngoài phần xác nhận theo [sổ quyết định](../decisions/open-decisions.md).
