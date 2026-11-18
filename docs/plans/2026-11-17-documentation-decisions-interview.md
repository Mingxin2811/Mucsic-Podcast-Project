# Phỏng vấn và đề xuất chốt docs trước triển khai

## Purpose and context

Ngày 17/11/2026 (Asia/Saigon), người dùng yêu cầu phỏng vấn các vấn đề cần chốt, sau đó yêu cầu đề xuất hướng xử lý. Đầu vào là [docs](../README.md), [hiện trạng](../project/status.md) và [sổ 22 mục quyết định và phần còn mở](../decisions/open-decisions.md). Đầu ra hiện tại là đồng bộ docs theo các xác nhận trong cuộc trò chuyện; người dùng đã yêu cầu thực hiện kế hoạch. Chi tiết chưa được chọn giữ OPEN.

## Scope and dependencies

Phạm vi được giao: đồng bộ các quyết định đã chấp nhận vào docs, ADR, API, schema đích, kiểm thử và truy xuất. Không tự đặc tả hết phần còn thiếu; không tạo OpenAPI hoàn chỉnh, sửa SQL/seed, ứng dụng, dependency hoặc cấu hình. Chỉ nâng trạng thái đặc tả đúng phạm vi; không nâng trạng thái runtime.

## Progress

- [x] 17/11/2026: đọc toàn bộ docs, hai điểm vào và hai file SQL bằng thao tác chỉ đọc.
- [x] 17/11/2026: gửi ba câu hỏi ban đầu về cách xác nhận quyết định, phạm vi và môi trường; người dùng sau đó yêu cầu đề xuất và xác nhận trong các lượt tiếp theo.
- [x] 17/11/2026: theo yêu cầu mới, đối chiếu nguồn chính thức về Node.js, Express, PostgreSQL, JWT/session, reset mật khẩu và tìm kiếm bỏ dấu để chuẩn bị đề xuất.
- [x] 17/11/2026: trình bày 22 phương án; người dùng chấp nhận, sửa yêu cầu OTP email/online và lưu audio local máy chủ.
- [x] 17/11/2026: DEC-006 được chấp nhận sau lượt riêng; chọn đồng bộ đã chốt và duyệt kế hoạch thực hiện.
- [x] 17/11/2026: cập nhật 22 DEC (8 ACCEPTED, 14 OPEN còn chi tiết), ba ADR và các tài liệu yêu cầu/kiến trúc/API/môi trường/quản lý/kiểm thử/truy xuất.
- [x] 17/11/2026: kiểm tra tĩnh Markdown/JSON/route/mã/truy xuất và đối chiếu DDL; ghi bằng chứng DOCSYNC-20261117-01 tại status, liệt kê phần còn thiếu.

## Milestones and concrete steps

M1 đã hoàn tất: đề xuất và thu nhận xác nhận; giả định demo độc lập Internet đã được thay bằng sẵn sàng online và email thật. M2: cập nhật DEC/ADR và nhóm yêu cầu → kiến trúc/dữ liệu → API/môi trường → kiểm thử/truy xuất. M3: kiểm tra tĩnh, giữ lịch sử bằng chứng và báo phần còn thiếu. Thực hiện theo [workflow](../development/workflow.md) và [quy ước quyết định](../decisions/README.md), giữ các phần chưa chốt OPEN.

## Validation and acceptance

Bản đồng bộ cần bao phủ đủ DEC-001–DEC-022 và tách lựa chọn thiết kế khỏi kết quả kiểm chứng. Nguồn chính thức được dùng để kiểm tra khả năng công nghệ, không thay quyền chốt của người dùng. Chưa chạy build/test, ứng dụng hoặc database. Khi cập nhật hợp đồng, kiểm tra liên kết, mã truy xuất, ví dụ và whitespace; không ghi PASS runtime.

## Recovery and compatibility

Đợt này chỉ thay Markdown docs và README gốc; có thể sửa bằng diff tập trung, không thao tác Git để xóa thay đổi khác. Giữ nguyên SQL và các mã DEC/UC/API/TC. Schema đích được xác nhận sau này phải được phân biệt với DDL hiện quan sát.

## Surprises & Discoveries

JWT hết hạn theo thời gian không tự đáp ứng logout hoặc khóa tức thì; phương án phải có trạng thái thu hồi phía server. Lọc track trong metadata không tự chặn URL audio. Đã chọn mô hình hồ sơ Creator/phiên và dữ liệu OTP/chống ghi trùng ngoài năm bảng hiện tại; tên/kiểu/constraint cụ thể còn thiếu, chưa có migration. Track ẩn vẫn giữ liên kết làm reorder toàn bộ ID cần thêm wire, không tự chọn cách xử lý trong test.

## Decision Log

Nguồn quyết định duy nhất là [sổ DEC](../decisions/open-decisions.md#evidence-2026-11-17). Người dùng xác nhận các phương án cùng điều chỉnh OTP email, online, media local máy chủ và DEC-006. Chưa chốt chi tiết ngoài nội dung đã trả lời; lịch/RACI, cấu hình nhà cung cấp và wire bổ sung vẫn cần đặc tả.

## Outcomes & Retrospective

Đã hoàn thành phạm vi **đồng bộ đã chốt**: 26 file tracked được sửa và bốn file chưa tracked (ba ADR cùng kế hoạch này), tổng 30 Markdown trong phạm vi. AGENTS, template và kế hoạch lịch sử 11/11 giữ nguyên. Có 12 UC, chín BR, năm NFR, 27 API-ID, 21 TC NOT_RUN, 22 DEC và ba ADR; schema hiện có vẫn năm bảng/40 cột/chín index.

Bằng chứng kiểm tra DOCSYNC-20261117-01 tại [status](../project/status.md#sync-2026-11-17): link/anchor, JSON/envelope, method/path, coverage/truy xuất, dữ liệu quan sát và whitespace. Chưa chạy ứng dụng/SQL, gửi mail hoặc triển khai. Các câu hỏi wire/schema/provider/lịch/protocol còn OPEN được liên kết tại API gaps và sổ DEC; không tuyên bố toàn bộ docs đủ để giao code ngay.

Bài học: không chuyển hàng loạt DEC sang ACCEPTED khi một lựa chọn cấp cao đã chốt nhưng wire còn thiếu; cần giữ bối cảnh cũ có nhãn lịch sử và tách DDL quan sát khỏi mô hình đích.
