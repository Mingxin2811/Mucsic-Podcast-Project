# Đồng bộ phương án backend đơn giản đã chấp nhận

## Purpose and context

Ngày 17/11/2026, Asia/Saigon, người dùng chấp nhận chín nhóm đề xuất DEC-003/005/010/012/014/017/019/021/022 và yêu cầu cập nhật docs. Mục tiêu: ghi đúng lựa chọn để triển khai nhanh, ổn định; không tự hoàn thiện chi tiết ngoài đề xuất. Đọc [sổ DEC](../decisions/open-decisions.md), [hiện trạng](../project/status.md) và [API](../api/README.md).

## Scope and dependencies

Chỉ Markdown trong docs và README gốc. Giữ nguyên code, SQL/seed, dependency/config và các thay đổi sẵn có; không cài package, chạy SQL, gửi email, commit/push hoặc deploy. Phần schema vật lý, wire/validation chưa được chọn và vận hành/nghiệm thu còn OPEN ở DEC sở hữu. Ghi thay đổi reorder từ toàn bộ liên kết sang toàn bộ track hiển thị; giữ lý do lịch sử.

## Progress

- [x] 17/11/2026: đọc hướng dẫn và kiểm kê working tree đang có thay đổi từ hai đợt docs trước.
- [x] 17/11/2026: ghi bằng chứng xác nhận, kết quả DEC và ADR bổ sung/thay thế.
- [x] 17/11/2026: đồng bộ yêu cầu, API, kiến trúc/schema đích, môi trường, kiểm thử và truy xuất.
- [x] 17/11/2026: kiểm tra tĩnh toàn bộ docs, phạm vi thay đổi và ghi DOCSYNC-20261117-03; mọi TC vẫn NOT_RUN.

## Milestones and concrete steps

M1 cập nhật nguồn quyết định và phần còn thiếu; M2 cập nhật các tài liệu sở hữu, cấp API-ID sau 29 cho method/path mới đã chốt; M3 kiểm tra links/anchors, mã, route, JSON, expected, DDL quan sát và whitespace. Giữ nguyên kết quả DOCSYNC-20261117-01/02 và kế hoạch lịch sử.

## Validation and acceptance

Dùng Python đọc file và kiểm tra liên kết/mã/JSON/route; git diff --check cùng kiểm tra file mới. So sánh checksum snapshot đầu đợt để chứng minh SQL/code không đổi. Mọi TC vẫn NOT_RUN; PASS chỉ ghi cho phép kiểm tra tài liệu thực chạy. Không kiểm chứng dependency/runtime, mail hay hiệu năng từ thay đổi Markdown.

## Recovery and compatibility

Sửa bằng diff tập trung, không reset working tree. SQL năm bảng là DDL quan sát, các bảng mới là mô hình đích. API-ID cũ giữ nguyên; application ID của API-25 và payload reorder là thay đổi được chấp nhận rõ, chưa có ứng dụng cần chuyển đổi.

## Surprises & Discoveries

Chưa có manifest/runtime. Hash Bcrypt trong seed cũ không tự tương thích lựa chọn scrypt; tài khoản cũ chưa có bằng chứng xác minh phải verify. Reorder hiển thị là thay đổi nghiệp vụ, cần lịch sử thay thế thay vì viết đè lý do cũ. Danh mục error code chung chưa đủ thay mọi lỗi cụ thể đã chốt cho audio.

## Decision Log

Nguồn xác nhận: người dùng trong phiên làm việc, câu “tôi chập nhận những đề xuất này. hãy cập nhật docs”, sau đề xuất chín mục. [Sổ DEC](../decisions/open-decisions.md) sở hữu kết quả; không coi yêu cầu đơn giản hóa là phê duyệt phần chưa được đề xuất.

## Outcomes & Retrospective

Hoàn thành cập nhật docs theo xác nhận: 39 API-ID/14 DEC ACCEPTED/8 OPEN/5 ADR, giữ 12 UC/9 BR/5 NFR/21 TC NOT_RUN. Đồng bộ 31 Markdown, gồm ba file mới (kế hoạch này, ADR-0005, API Creator). Không sửa/chạy code/SQL/config hoặc cài package/Resend/deploy.

DOCSYNC-20261117-03 tại status ghi lần kiểm tra thực: 38 Markdown/link-anchor/UTF-8/route/JSON/mã-truy xuất/whitespace; checksum 25 file code-SQL-media không đổi, từ điển DDL và bằng chứng/kế hoạch cũ giữ nguyên. Script/checksum/phương pháp và giới hạn được ghi để tái lập; đây chỉ là PASS tài liệu.

PowerShell mặc định pipe ASCII làm mất dấu trong lần ghi đầu đã được khắc phục: khôi phục ba file từ snapshot đầu lượt rồi ghi UTF-8, kiểm tra nội dung tiếng Việt. Bộ phát hiện dấu hỏi được sửa để không báo nhầm query URL như tracks?sort=newest; không bỏ kiểm tra nội dung hỏng. Bài học: đặt encoding rõ và tách quyết định hiện hành khỏi kết quả/lý do lịch sử; không đóng mọi DEC khi wire/schema vẫn thiếu.
