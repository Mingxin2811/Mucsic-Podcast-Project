# Đồng bộ quyết định OTP đăng ký ngày 21/11/2026

## Purpose and context

Ghi nhận phương án người dùng chọn cho đăng ký, xác minh email và gửi lại mã. Bootstrap và schema đã có. Ba endpoint thuộc UC01 chưa triển khai. [Hiện trạng](../project/status.md#single-database-migration-2026-11-20).

## Scope and dependencies

Đồng bộ Markdown cho DEC-003/005/017/022, API-01/30/31, UC01, BR-003 và TC-01/02. Phạm vi xác nhận lấy từ phương án được trích dẫn trong yêu cầu. Các nhánh OTP reset, chi tiết JSON chưa chọn và nguồn địa chỉ IP khi chạy sau proxy tiếp tục theo sổ DEC.

## Progress

- [x] 21/11/2026 — Đọc sổ DEC, schema, đặc tả auth và kịch bản nghiệm thu.
- [x] 21/11/2026 — Đồng bộ quyết định, hợp đồng HTTP, vòng đời OTP, truy xuất và TC-01/02.
- [x] 21/11/2026 — Kiểm tra liên kết, nội dung và phạm vi diff.

## Milestones and concrete steps

1. Lưu bằng chứng xác nhận và ADR liên kết với DEC. Định rõ phần `OPEN` còn lại.
2. Cập nhật các tài liệu sở hữu quy tắc, hợp đồng HTTP và kịch bản kiểm chứng.
3. Đối chiếu ba request body, các mốc thời gian và mã HTTP. Rà liên kết nội bộ và chạy `git diff --check`.

## Validation and acceptance

Các tài liệu hiện hành cần nhất quán về mật khẩu đăng ký, ngưỡng IP, trạng thái gửi, đăng ký lại và retention. TC-01/02 mô tả kết quả mong đợi. Bằng chứng của đợt này là kiểm tra tĩnh trên Markdown.

## Recovery and compatibility

Giữ nội dung quyết định lịch sử và dẫn tới xác nhận mới ở phần hiện hành. Rà diff trước khi bàn giao.

## Surprises & Discoveries

API-30 trước đây đã xác nhận `{email,otp}`. Xác nhận mới bổ sung mật khẩu của lần đăng ký hiện tại để xác minh, trong khi API reset có hợp đồng riêng.

## Decision Log

- 21/11/2026 — Người dùng xác nhận phương án chi tiết trong đoạn trích. [Bằng chứng](../decisions/open-decisions.md#evidence-registration-otp-2026-11-21).

## Outcomes & Retrospective

Ngày 21/11/2026, Windows/PowerShell chạy kiểm tra tĩnh qua Python: đọc UTF-8, kiểm tra code fence, whitespace và 732 liên kết nội bộ của 21 file Markdown thay đổi. Đối chiếu request body, các mốc OTP, truy xuất API-01/30/31 và trạng thái TC-01/02. Danh mục vẫn có 39 API-ID, 21 TC, 14 DEC `ACCEPTED` và 8 DEC `OPEN`. ADR tăng lên tám. `git diff --check` không báo lỗi. Diff chỉ gồm Markdown trong `docs/`. Các kịch bản OTP vẫn `NOT_RUN`.
