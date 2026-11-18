# Yêu cầu chất lượng

Ngưỡng/lựa chọn đã được xác nhận ngày 17/11/2026 theo [sổ DEC](../decisions/open-decisions.md#evidence-2026-11-17); protocol chưa đủ vẫn DRAFT. Đây không phải kết quả đo; toàn bộ runtime NOT_RUN.

<a id="nfr-001"></a>

## NFR-001 Hiệu năng đọc API

CONFIRMED: p95 < 500 ms cho đọc danh sách/tìm kiếm/playlist; bộ đo 1.000 track, 100 user, 200 playlist, 10 người dùng đồng thời; warm-up rồi đo 60 giây, cold start báo riêng. Cấu hình máy/runtime/DB, công cụ, warm-up bao lâu, request mix và cách lấy mẫu còn [DEC-015](../decisions/open-decisions.md#dec-015); chưa có protocol đủ để ghi PASS. Đo ở môi trường được ghi nhận, không tự áp ngưỡng local sang Internet. [TC-20](../testing/acceptance.md#tc-20).

<a id="nfr-002"></a>

## NFR-002 Xác thực và kiểm soát truy cập

CONFIRMED: OTP email thật trước login; JWT gắn phiên PostgreSQL 24 giờ tuyệt đối, không refresh; cookie HttpOnly/Secure/SameSite=Lax khi online, CSRF. Kiểm tra user/quyền hiện tại, phiên và sở hữu; logout riêng phiên, khóa/đổi/reset mật khẩu thu hồi tất cả. Phiên DB còn hạn qua restart; DB lỗi không bỏ qua kiểm tra. Không trả hash/OTP/JWT trong JSON hoặc log bàn giao. Bổ sung CONFIRMED: Resend/HMAC PostgreSQL/scrypt async N=32768,r=8,p=3,maxmem=64 MiB/password 12–128/HS256 secret >=32 byte/soundwave_session/X-CSRF-Token/Origin theo BR-003. Còn IP limit/timeout email/key lifecycle/CSRF response/Domain/schema ở DEC-003/014/017/022; không dùng seed Bcrypt làm bằng chứng đích. TC-01–TC-05/TC-11/TC-14/TC-15/TC-18.

<a id="nfr-003"></a>

## NFR-003 Toàn vẹn và phục hồi

CONFIRMED: upload kiểm tra → chuyển file → ghi DB/COMMIT; rollback chắc chắn dọn mới, COMMIT không rõ phải đối chiếu; cleanup startup/30 phút, tuổi >24 giờ và kiểm tra active/tham chiếu kể cả soft delete; giao dịch playlist và lượt nghe nguyên tử, UNIQUE thứ tự kiểm commit/reorder ID hiển thị/ẩn cuối, cooldown trượt 30 phút/giữ bảy ngày, giữ hàng/liên kết/file khi soft delete; có một lần thử backup/restore thành công trước nghiệm thu. Chưa có backup hoặc schema đích đã chạy. Backup retention/lịch/nơi lưu/protocol restore và recovery state còn DEC-014/DEC-022. Không nhầm lịch cleanup đã chọn với retention backup chưa chọn. TC-09/TC-13/TC-16/TC-19/TC-21.

<a id="nfr-004"></a>

## NFR-004 Media

CONFIRMED: bắt đầu nghe ≤ 1 giây là phép đo tích hợp riêng, có seek/HTTP Range. Audio/ảnh theo BR-005 (30/5 MiB). Request audio mới phải bị từ chối sau gỡ track/khóa Creator; request đã bắt đầu được hoàn tất. File local máy chủ bền vững; không nhận thay audio trong MVP. GET/HEAD audio, single Range/status/header, no-store và lỗi 404/503 đã chọn; HEAD không body. ffprobe/FFmpeg/Sharp, duration ceiling INT cần được kiểm chứng CBR/VBR; làm tròn không bảo đảm sai số phép probe. Điểm đo/file/network, versions/limits và conditional HTTP/recovery state còn DEC-014/DEC-015/DEC-017/DEC-022. TC-08/TC-09/TC-17/TC-20; thời gian API metadata không chứng minh thời gian nghe.

<a id="nfr-005"></a>

## NFR-005 Tái hiện môi trường và online

CONFIRMED: phát triển local và sẵn sàng triển khai online; OTP email thật, media filesystem máy chủ. Đích Node.js 24 LTS/Express 5/JavaScript ESM/npm/pg/PostgreSQL 18, cùng origin/HTTPS khi online. Không yêu cầu toàn bộ demo offline. Resend HTTPS đã chọn, tài khoản/API key/domain gửi xác minh chưa có; hosting/volume/config/ma trận OS/lệnh còn DEC-003/014/016. Công cụ Zod/Multer/jose/scrypt/node-pg-migrate/node:test/fetch/ESLint đã chọn, chưa cài. Không tuyên bố đã deploy hoặc ngân sách online 0 đồng; chi phí lịch sử không là ngân sách được duyệt. [Thiết lập](../development/local-setup.md), TC-19/TC-21.

## Điều kiện nghiệm thu

Không còn Critical/High trong phạm vi MVP đã xác nhận; phải có bằng chứng từng kịch bản và một lần thử restore. Định nghĩa severity, người nghiệm thu, protocol phần còn thiếu theo DEC-015/DEC-016; chưa chọn bằng cách viết test. Chi tiết thiếu expected được báo BLOCKED khi thực thi; chưa chạy là NOT_RUN.
