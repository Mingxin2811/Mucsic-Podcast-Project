# Đồng bộ hợp đồng API theo DEC-005

## Purpose and context

Ghi các quyết định người dùng đã xác nhận cho API Auth/CSRF, hồ sơ Creator và thành viên/thứ tự playlist. DEC-003 đã chốt vòng đời OTP; DEC-019 đã chốt semantics reorder. [Sổ quyết định](../decisions/open-decisions.md).

## Scope and dependencies

Phạm vi là hợp đồng API và các tài liệu yêu cầu, truy xuất, kiểm thử, hiện trạng trong `docs/`. Các quy tắc HTTP ngoài phạm vi xác nhận thuộc DEC-017; nguồn IP và định dạng hash thuộc DEC-014; thứ tự khóa ngoài phần đã chốt và DDL hạn mức reset thuộc DEC-022.

## Progress

- [x] 22/11/2026: Đối chiếu phạm vi xác nhận với API hiện hành và các phụ thuộc.
- [x] 22/11/2026: Đồng bộ sổ DEC, tài liệu API và các kịch bản liên quan.
- [x] 22/11/2026: Kiểm tra liên kết, truy xuất, trạng thái và phạm vi thay đổi.

## Milestones and concrete steps

1. Ghi bằng chứng và cập nhật trạng thái DEC-005.
2. Cập nhật hợp đồng và ví dụ JSON, thay các ví dụ cũ xung đột với quyết định.
3. Đối chiếu truy xuất và expected của TC-01–05, TC-13/14 và TC-18; kiểm tra liên kết, JSON và diff.

## Validation and acceptance

Kiểm tra tĩnh Markdown, JSON, API-ID, trạng thái DEC và TC. Chỉ ghi kết quả những phép kiểm đã chạy.

## Recovery and compatibility

Giữ mã API, method/path, lựa chọn OTP và dữ liệu lịch sử. Đối chiếu các ví dụ cũ khi sửa phần response hoặc lỗi đã được xác nhận.

## Surprises & Discoveries

Ví dụ API-24 cũ dùng ngày tạo tài khoản. Hợp đồng mới dùng `submittedAt` của hồ sơ và `applicationId` xuyên suốt. Khi hai hồ sơ chờ có cùng `submittedAt`, dùng `applicationId ASC` để danh sách phân trang có thứ tự ổn định.

## Decision Log

Ngày 22/11/2026, người dùng trong phiên chấp nhận phương án DEC-005. [Bằng chứng](../decisions/open-decisions.md#evidence-api-contracts-2026-11-22).

## Outcomes & Retrospective

Kiểm tra tĩnh ngày 22/11/2026, Asia/Saigon, bằng Python 3.14.0 trên Windows/PowerShell và `git -c core.safecrlf=false diff --check`. Đã kiểm 49 file Markdown, 1.226 liên kết nội bộ, 20 khối JSON trong docs API, method/path và truy xuất của cả 39 API-ID, các response đã chốt, 16 DEC `ACCEPTED`/6 `OPEN` và 9 ADR. Các phép kiểm tra đều qua. Cả 21 kịch bản nghiệm thu đầy đủ vẫn `NOT_RUN`. Thay đổi của đợt này chỉ thuộc Markdown.
