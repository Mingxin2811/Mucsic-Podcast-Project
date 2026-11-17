# Hiện trạng và bằng chứng

Mốc kiểm kê: **11/11/2026**, múi giờ Asia/Saigon. Phạm vi quan sát: checkout cục bộ hiện tại; không suy ra trạng thái nhánh khác, máy khác hoặc hệ thống bên ngoài.

## Artifact đã quan sát

| Hạng mục | Triển khai | Kiểm chứng | Bằng chứng và giới hạn |
| --- | --- | --- | --- |
| DDL database | `PRESENT` | `NOT_RUN` | [schema.sql](../../database/schema.sql) khai báo năm bảng, FK, CHECK enum và chín index tường minh; chưa chạy SQL |
| Seed database | `PRESENT` | `NOT_RUN` | [seed_data.sql](../../database/seed_data.sql) chứa dữ liệu và reset sequence; chưa nạp hoặc kiểm tra hash |
| Backend | `NOT_IMPLEMENTED` | `NOT_RUN` | Các thư mục `src/config`, `controllers`, `middlewares`, `routes` chỉ có `.gitkeep`; không có entrypoint hoặc `package.json` |
| Media | `NOT_IMPLEMENTED` | `NOT_RUN` | Thư mục uploads và seed_media có `.gitkeep`; chưa có file audio/ảnh được seed tham chiếu |
| Runtime/config ứng dụng | `NOT_IMPLEMENTED` | `NOT_RUN` | Chưa thấy manifest, lockfile, `.env.example`, script khởi động hoặc cấu hình kết nối DB |
| Kiểm thử ứng dụng | `NOT_IMPLEMENTED` | `NOT_RUN` | Chưa có test suite, runner hoặc log kiểm thử tái hiện được |
| Docs | `PRESENT` | Xem mục kiểm tra docs bên dưới | Nội dung và cấu trúc phục vụ giao việc; chưa phê duyệt các quyết định sản phẩm |

## Khoảng trống kiểm chứng

| Mã | Tuyên bố cần bằng chứng | Bằng chứng còn thiếu |
| --- | --- | --- |
| EVID-001 | Hoàn thành/nghiệm thu 12/12 use case | Revision ứng dụng, môi trường, kịch bản và kết quả chạy; checkout hiện tại chưa có ứng dụng |
| EVID-002 | Test case đã Pass | Lần chạy, dữ liệu, expected/actual, log và người kiểm tra |
| EVID-003 | API dưới 500 ms, phát audio trong một giây | Thiết kế phép đo, bản chạy, dữ liệu và kết quả; điều kiện đo còn mở ở DEC-015 |
| EVID-004 | Tài khoản seed đăng nhập được bằng mật khẩu chú thích | Bcrypt verification và kiểm thử auth sau khi có runtime |
| EVID-005 | Database tạo/seed thành công, phát được media | Log trên DB thử nghiệm đúng phiên bản và file demo tương ứng |

Không chuyển các tuyên bố này thành `PASS` bằng quyết định chủ quan. Giữ thiếu hụt bằng chứng ở đây; lựa chọn cần thiết để kiểm chứng nằm trong [sổ quyết định](../decisions/open-decisions.md).

## Kiểm tra docs

Mốc kiểm tra: 11/11/2026. Kết quả chỉ áp dụng cho bộ Markdown trong đợt biên soạn này, không suy ra kiểm thử API, database hoặc media.

| Kiểm tra | Kết quả | Cách kiểm tra và giới hạn |
| --- | --- | --- |
| Liên kết nội bộ và anchor | `PASS` | Duyệt toàn bộ Markdown của docs và hai điểm vào; kiểm tra đích file và anchor; không kiểm tra khả dụng mạng của URL ngoài |
| Bao phủ nội dung | `PASS` | Đối chiếu 12 mục UC, 27 API-ID, 21 TC, 22 DEC OPEN; mọi API có liên kết trong traceability |
| API và JSON mẫu | `PASS` | Đối chiếu method/path với danh mục đã kiểm kê; parse 27 response mẫu và rà soát tên trường; không gửi HTTP request |
| Từ điển dữ liệu | `PASS` | Đối chiếu tên/thứ tự 40 cột thuộc năm bảng và chín index khai báo; đọc lại kiểu, nullable, default, FK; không thực thi DDL |
| Giữ quyết định mở | `PASS` | Rà soát đủ trạng thái OPEN, người chốt/kết quả chưa xác định, không chọn phương án mặc định; kiểm thử nghiệp vụ vẫn NOT_RUN |
| Tra cứu giao việc auth | `PASS` | Từ workflow tới UC01/UC02, BR-003, auth API, DEC-002/003/006 và TC-01–TC-05; nhận diện được phụ thuộc trước khi viết mã |
| Tra cứu thay đổi database | `PASS` | Từ data-model tới SQL, DEC-007/013/014/019/022 và TC-19; nhận diện script reset không phải migration |
| Tra cứu endpoint xung đột | `PASS` | Từ API-08/API-09/API-12 tới DEC-004; tìm được hai phương án và kịch bản phụ thuộc, không áp đặt alias |
| Định dạng và phạm vi thay đổi | `PASS` | Kiểm tra whitespace cả file mới bằng git diff --no-index --check; git diff --check cho tracked; kiểm kê thay đổi chỉ có Markdown thuộc docs và hai điểm vào |

Các phép kiểm tra link, mã, route, JSON và cột dùng công cụ kiểm tra tạm trong phiên biên soạn; công cụ không phải dependency hoặc test suite được cài vào repo. Kết quả kiểm tra tĩnh không chứng minh docs đã được render bởi mọi trình xem Markdown. Các nguồn bên ngoài đã được kiểm tra khi lập kế hoạch; không truy cập lại toàn bộ URL trong đợt kiểm tra này.

## Cập nhật về sau

Mỗi cập nhật hiện trạng cần ngày, revision/phạm vi, artifact được quan sát, lệnh hoặc cách kiểm tra, kết quả và giới hạn. Giữ riêng tiến độ dự kiến trong [management](management.md). Không ghi phần trăm hoàn thành từ số file hoặc số endpoint đã được mô tả.
