# Yêu cầu chất lượng

Trạng thái: `DRAFT`; các mục dưới đây là mục tiêu thiết kế, chưa phải kết quả đo. [DEC-015](../decisions/open-decisions.md#dec-015) quản lý điều kiện đo và ngưỡng nghiệm thu còn thiếu.

<a id="nfr-001"></a>

## NFR-001 Hiệu năng đọc API

Mục tiêu được nêu: đọc danh sách track, tìm kiếm và chi tiết playlist dưới 500 ms trên local. Chưa xác nhận percentile, tải đồng thời, kích thước dữ liệu, cấu hình máy/DB, trạng thái cache hoặc phần thời gian được tính. Chỉ ghi kết quả sau khi có protocol ở [TC-20](../testing/acceptance.md#tc-20). Index hiện có không chứng minh đạt mục tiêu, đặc biệt truy vấn tìm kiếm substring (DEC-012).

<a id="nfr-002"></a>

## NFR-002 Xác thực và kiểm soát truy cập

Ý định: Bcrypt rounds 10, JWT ký có TTL 24 giờ, protected API yêu cầu Bearer token; kiểm tra role và quyền sở hữu, ngăn Listener upload hoặc truy cập quản trị. Không trả hash/mật khẩu hoặc token thật trong log/bằng chứng. Tính hiệu lực token sau thay đổi tài khoản/quyền theo [DEC-006](../decisions/open-decisions.md#dec-006); OTP theo DEC-003. Kiểm thử TC-01–TC-05/TC-11/TC-14/TC-15/TC-18.

<a id="nfr-003"></a>

## NFR-003 Toàn vẹn và khả năng phục hồi

Ý định: dùng ràng buộc quan hệ, giữ liên kết khi soft delete, xử lý lỗi file–DB nhất quán. Schema và seed chưa chạy; không có backup được xác nhận. Có định hướng backup/restore bằng công cụ database nhưng retention, lịch, nơi lưu và bài thử restore còn thiếu ở [DEC-014](../decisions/open-decisions.md#dec-014), DEC-022. Kiểm thử TC-09/TC-13/TC-16/TC-19/TC-21.

<a id="nfr-004"></a>

## NFR-004 Khả năng truy cập media

Có mục tiêu bắt đầu nghe trong không quá một giây và có thể seek; đây là mục tiêu tích hợp sản phẩm, chưa có SLA backend hoặc quy trình đo. Hợp đồng Range, truy cập file đã gỡ, cache, lỗi thiếu file, upload thất bại cần [DEC-009](../decisions/open-decisions.md#dec-009). Kích thước audio/ảnh dự kiến xem BR-005. Kiểm thử TC-08/TC-09/TC-17/TC-20; không kiểm tra giao diện trong bộ docs này.

<a id="nfr-005"></a>

## NFR-005 Khả năng tái hiện môi trường

Định hướng: demo được trên môi trường local thống nhất, ngân sách tiền mặt dự kiến 0 đồng. Từng được nêu Windows/macOS/Linux, Node 18+, npm 9+, PostgreSQL và các phiên bản khác nhau. Ma trận thực sự hỗ trợ chưa chốt (DEC-008/DEC-013/DEC-014). Hướng dẫn không được tuyên bố hỗ trợ môi trường chưa chạy thử. Xem [local setup](../development/local-setup.md) và TC-19/TC-21.

## Nghiệm thu chất lượng

Đích dự kiến không còn lỗi Critical trong luồng chính; có mô tả DoD yêu cầu không còn Critical/High. Phân loại lỗi, người nghiệm thu và phạm vi Must/Should còn DEC-001/DEC-015/DEC-016. Không gắn nhãn sẵn Pass cho kịch bản; ghi cả failure và phần bị chặn theo [chiến lược](../testing/strategy.md).
