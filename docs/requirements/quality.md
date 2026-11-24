# Yêu cầu chất lượng

Ngưỡng và lựa chọn đã được xác nhận theo [sổ DEC](../decisions/open-decisions.md#evidence-2026-11-17). Quy trình đo còn thiếu giữ `DRAFT`. Các phép đo nghiệm thu hiệu năng và media vẫn `NOT_RUN`. Bằng chứng hiện có bao gồm bootstrap HTTP và migration chín bảng. [Hiện trạng](../project/status.md#single-database-migration-2026-11-20).

<a id="nfr-001"></a>

## NFR-001 Hiệu năng đọc API

CONFIRMED: p95 < 500 ms cho đọc danh sách/tìm kiếm/playlist; bộ đo 1.000 track, 100 user, 200 playlist, 10 người dùng đồng thời; warm-up rồi đo 60 giây, cold start báo riêng. Cấu hình máy/runtime/DB, công cụ, warm-up bao lâu, request mix và cách lấy mẫu còn [DEC-015](../decisions/open-decisions.md#dec-015); chưa có protocol đủ để ghi PASS. Đo ở môi trường được ghi nhận, không tự áp ngưỡng local sang Internet. [TC-20](../testing/acceptance.md#tc-20).

<a id="nfr-002"></a>

## NFR-002 Xác thực và kiểm soát truy cập

CONFIRMED: OTP email thật trước login, JWT gắn phiên PostgreSQL 24 giờ, cookie HttpOnly/SameSite=Lax và bảo vệ CSRF. HTTP local tắt Secure. Kiểm phiên, quyền DB và sở hữu. Logout thu hồi phiên hiện tại; khóa, đổi/reset mật khẩu và đổi khóa JWT thu hồi các phiên tương ứng. Phiên hợp lệ còn sau restart. OTP dùng hạn mức theo email, timeout và lịch dọn. Với email hợp lệ về cú pháp, API-32 trả cùng `202` với nội dung và thời gian phản hồi tương đương giữa các nhánh. Chi tiết HTTP thuộc DEC-017, migration để lưu IP `NULL` thuộc DEC-022. TC-01–TC-05/TC-11/TC-14/TC-15/TC-18. [Xác thực](../architecture/security-and-media.md), [BR-003](business-rules.md#br-003).

<a id="nfr-003"></a>

## NFR-003 Toàn vẹn và phục hồi

CONFIRMED: local giữ nhất quán DB/file khi upload, rollback và commit không rõ kết quả. Cleanup lúc khởi động và mỗi 30 phút kiểm tuổi trên 24 giờ, thao tác active và tham chiếu kể cả soft delete. Giao dịch playlist và lượt nghe nguyên tử; UNIQUE thứ tự kiểm tại commit. DB và media giữ qua restart. Recovery file thuộc DEC-022. Backup/restore vận hành thuộc hướng mở rộng. TC-09/13/16/19/21. [Bằng chứng migration](../project/status.md#single-database-migration-2026-11-20).

<a id="nfr-004"></a>

## NFR-004 Media

CONFIRMED: bắt đầu nghe ≤ 1 giây là phép đo tích hợp riêng, có seek/HTTP Range. Audio/ảnh theo BR-005 và [giới hạn xử lý local](../architecture/security-and-media.md#upload-kiem-tra-file-va-duration). Request audio mới bị từ chối sau gỡ/khóa; request đã bắt đầu được hoàn tất. GET/HEAD audio, single Range/no-store và lỗi 404/503 đã chọn. Duration ceiling cần kiểm với MP3 CBR/VBR. Điểm đo, file mẫu, điều kiện mạng, HTTP ngoài phần đã chốt và recovery state còn DEC-015/017/022. TC-08/09/17/20.

<a id="nfr-005"></a>

## NFR-005 Tái hiện môi trường local

CONFIRMED: chạy local trên Windows/PowerShell. Baseline Node.js 24.22.3 LTS, PostgreSQL 18.7, Express 5, JavaScript ESM/npm và `pg`. Bootstrap/migrate/test đã kiểm chứng trong môi trường và DB thử ghi ở status. Media lưu trên máy chạy backend. Demo OTP thật cần Internet và Resend; test tích hợp dùng Resend giả lập. [Thiết lập local](../development/local-setup.md), [kết quả bootstrap](../project/status.md#backend-bootstrap-run-2026-11-18), TC-19/21.

## Điều kiện nghiệm thu

Không còn Critical/High trong phạm vi local đã xác nhận và cần bằng chứng cho từng kịch bản. Định nghĩa severity, người nghiệm thu và protocol đo còn DEC-015/016; chưa chạy ghi `NOT_RUN`. [Xác nhận local](../decisions/open-decisions.md#evidence-local-runtime-2026-11-22).
