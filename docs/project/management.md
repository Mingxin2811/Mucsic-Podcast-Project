# Quản lý dự án

Cập nhật 17/11/2026: cách giao việc/phạm vi bên dưới có phần CONFIRMED; các số liệu lịch, giờ và chi phí cũ là ước lượng lịch sử, chưa là baseline đã được nghiệm thu. Xung đột quản trị được quản lý tại [DEC-016](../decisions/open-decisions.md#dec-016).

## Cách quản lý đã xác nhận ngày 17/11/2026

Theo [DEC-016](../decisions/open-decisions.md#dec-016), chọn Trello; việc có người phụ trách, đầu ra và tiêu chí hoàn thành. Phạm vi local trên Windows/PowerShell, OTP email thật và media trên filesystem của máy chạy backend. [ADR-0010](../decisions/adr-0010-local-runtime-scope.md) ghi các hướng mở rộng.

Cần lập lại lịch theo deadline/nguồn lực thực; xác nhận riêng người chốt nghiệp vụ, kỹ thuật và nghiệm thu. Chưa có tên/ngày mới, giờ cam kết hoặc baseline chi phí/rủi ro; không tự gán từ vai trò dưới đây. Các quyết định docs ngày 17/11 do người dùng trong phiên xác nhận, không chứng minh tổ chức đã bổ nhiệm vai trò lâu dài. Chưa thao tác Trello hoặc cấu hình bảo vệ nhánh.

## Điều lệ và nhân sự dự kiến

Tên sản phẩm: Soundwave, Music & Podcast Platform. Đơn vị đào tạo: Khoa CNTT2, PTIT TP.HCM. Giảng viên hướng dẫn: ThS. Lý Tuấn Anh. Định hướng làm việc: Agile/Scrum, ba sprint, demo end-to-end trên môi trường thống nhất.

| Người/nhóm | Vai trò đang được mô tả | Giới hạn xác nhận |
| --- | --- | --- |
| Nguyễn Minh Tâm | PM/Team Lead, PO/Scrum Master; kiến trúc, phối hợp backend, báo cáo | Chưa xác nhận phân bổ thời gian và quyền chốt mọi quyết định kỹ thuật |
| Nguyễn Văn Quyến | Backend và database, upload, soft delete | Có mô tả database kiêm nhiệm theo sprint; cần thống nhất RACI |
| Nguyễn Nhựt Quỳnh | Thành viên nhóm phụ trách phần ngoài phạm vi kỹ thuật của bộ docs này | Docs không đặc tả công việc giao diện |
| Cả nhóm | Kiểm thử chéo và tích hợp | Chưa chốt người chịu trách nhiệm từng lần nghiệm thu |
| GVHD/người dùng thử | Phản hồi, đánh giá | Chưa có lịch hoặc biên bản xác nhận |

RACI đang được mô tả: PM A/R cho khảo sát và kế hoạch, A cho kiểm thử; Quyến A/R cho database, R cho backend; PM A/R và Quyến R cho backend; cả nhóm tham gia tích hợp và báo cáo. Đây là thông tin để xác nhận phân công, không tự gán người phê duyệt quyết định mở.

## WBS và bàn giao

| WBS | Gói công việc | Kết quả dự kiến |
| --- | --- | --- |
| 1.1–1.2 | Thu thập yêu cầu, phạm vi, điều lệ, RACI, rủi ro | Yêu cầu và cơ sở quản lý có xác nhận |
| 2.1 | Phần thiết kế ngoài phạm vi bộ docs | Chỉ ghi nhận phụ thuộc kế hoạch, không đặc tả giao diện |
| 2.2 | Database và kiến trúc | ERD, từ điển, DDL và quyết định thiết kế |
| 3.1 | Tài khoản, auth và phân quyền | Đăng ký/đăng nhập, kiểm soát role và sở hữu |
| 3.2 | Upload và lưu media | Tác phẩm và file được quản lý nhất quán |
| 3.3 | Hỗ trợ phát audio và metadata | Dữ liệu/khả năng truy cập media phục vụ luồng nghe |
| 3.4 | Khám phá và tìm kiếm | Truy vấn, lọc thể loại, Trending |
| 3.5 | Playlist và quản trị | Thư viện cá nhân, duyệt Creator, quản lý tài khoản/nội dung |
| 4.1–4.2 | Thiết kế kiểm thử, thực thi và sửa lỗi | Kịch bản cùng bằng chứng nghiệm thu |
| 5.1–5.2 | Dữ liệu demo, đóng gói và báo cáo | Bộ bàn giao có thể tái hiện |

Bộ bàn giao dự kiến: mã nguồn, database và demo media hợp lệ, tài liệu yêu cầu/thiết kế/quản lý, kết quả kiểm thử, báo cáo và slide. Không có bằng chứng các hạng mục này đã hoàn tất; xem [status](status.md).

## Lịch cũ — ước lượng lịch sử, chưa là baseline mới

Mốc ngày được nêu: 17/09/2026 bắt đầu, 26/11/2026 hoàn thành tạm tính. Chưa dùng ngày hiện tại để tự chuyển sprint hoặc kết luận trễ hạn.

| Giai đoạn | Tuần dự kiến | Milestone và tiêu chí dự kiến |
| --- | --- | --- |
| Khởi tạo/thiết kế | 1–2 | M1: phạm vi, yêu cầu, kế hoạch và thiết kế dữ liệu |
| Sprint 1 | 3–5 | M2: auth, upload, luồng phát cơ bản có thể kiểm chứng |
| Sprint 2 | 6–8 | M3: tìm kiếm, playlist, metadata podcast, quản trị |
| Sprint 3 | 9–10 | M4: tích hợp, sửa lỗi, dữ liệu mẫu và nghiệm thu |

Chuỗi phụ thuộc từng được nêu: SRS → DB → Auth → Upload → Audio → Search → Playlist/Admin → Test cases → Testing → bàn giao. Lịch các tác vụ có gối đầu; duration, quan hệ FS/SS và float chưa đủ để chứng minh đường găng 10 tuần. Không dùng con số float 0 hoặc “70 ngày làm việc” làm ràng buộc đã được xác nhận.

## Nguồn lực và chi phí cũ — ước lượng lịch sử

Có giả định 8–10 giờ/người/tuần và phép tính minh họa ba người × 10 tuần × 10 giờ = 300 giờ. Mô tả chi phí gồm tiền mặt dự kiến 0 đồng và nhân công chưa định giá; một ước lượng khác quy đổi 50.000 đồng/giờ thành 15.000.000 đồng học thuật.

| Giai đoạn theo ước lượng 300 giờ | Tỷ lệ | Giờ dự kiến | Chi phí quy đổi minh họa |
| --- | --- | --- | --- |
| Khởi tạo/thiết kế | 15% | 45 | 2.250.000 đồng |
| Phát triển | 55% | 165 | 8.250.000 đồng |
| Kiểm thử | 20% | 60 | 3.000.000 đồng |
| Đóng gói | 10% | 30 | 1.500.000 đồng |

Không xem số quy đổi là tiền đã chi hoặc ngân sách được duyệt. Cơ sở chi phí, mức cam kết giờ và baseline cần xác nhận ở DEC-016.

## Rủi ro được nhận diện

| Mã | Rủi ro | P × I được đề xuất | Ứng phó dự kiến |
| --- | --- | --- | --- |
| R01 | Trùng lịch học/thi, chậm tiến độ | 3 × 3 = 9 | Ưu tiên phần cam kết; việc giảm phạm vi phải có quyết định |
| R02 | File audio lớn ảnh hưởng hiệu năng | 2 × 3 = 6 | Kiểm tra dung lượng, dùng bộ demo phù hợp, kiểm chứng phục vụ media |
| R03 | Xung đột mã nguồn khi tích hợp | 2 × 2 = 4 | Thay đổi tập trung, review trước tích hợp |
| R04 | Quyền sử dụng nội dung demo không rõ | 1 × 2 = 2 | Xác nhận giấy phép và bộ media ở DEC-020 |
| R05 | Mất dữ liệu hoặc hết dung lượng ổ đĩa trên máy chạy local | Chưa chấm điểm | Kiểm tra dữ liệu sau restart và xử lý DB/file khi lỗi, DEC-009/022. |
| R06 | Email OTP không tới người dùng/provider gián đoạn | Chưa chấm điểm | Resend HTTPS đã chọn; thiết lập domain/key, lỗi/resend và kiểm chứng email thật DEC-003/014 |

Thang P/I 1–3 và phân loại điểm 6 chưa nhất quán; giữ điểm đề xuất, chưa chốt mức ưu tiên rủi ro. Khả năng phát sinh, chủ sở hữu và ngày rà soát cần cập nhật bằng bằng chứng thực tế.

## Truyền thông và hoàn thành công việc

Có kế hoạch trao đổi hàng tuần qua Zalo, sprint planning/review và kiểm thử chéo. Công cụ đã chọn là Trello theo DEC-016; GitHub Projects không là công cụ tiến độ song song được chọn. Repo này không chứng minh bảng công việc hay quy tắc bảo vệ nhánh đã được thiết lập.

Tiêu chí nghiệm thu local gồm đúng phạm vi cam kết, kiểm thử phù hợp, không còn Critical/High, có review và bằng chứng. Diễn tập backup/restore thuộc hướng mở rộng. Định nghĩa severity, protocol đo và người nghiệm thu thuộc DEC-015/016. [Workflow](../development/workflow.md), [nghiệm thu](../testing/acceptance.md).

Đợt [đơn giản hóa 17/11](../decisions/open-decisions.md#evidence-simple-2026-11-17) chọn công cụ và thứ tự triển khai, không bổ nhiệm RACI/đổi deadline/duyệt chi phí. Resend cần tài khoản/key/domain gửi xác minh chưa có; không coi chọn provider là đã có ngân sách/online hoặc nghiệm thu.
