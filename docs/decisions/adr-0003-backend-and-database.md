# ADR-0003 Nền tảng backend và database đích

Trạng thái: **Accepted**, phạm vi lựa chọn kiến trúc ghi dưới đây. Ngày: **17/11/2026**, Asia/Saigon. Người xác nhận: người dùng trong phiên làm việc; [bằng chứng](open-decisions.md#evidence-2026-11-17).

Quyết định liên quan: [DEC-013](open-decisions.md#dec-013), [DEC-014](open-decisions.md#dec-014), [DEC-022](open-decisions.md#dec-022).

## Bối cảnh

Checkout có SQL PostgreSQL và khung thư mục; trước đây runtime, ngôn ngữ và phiên bản database chưa thống nhất. Cần môi trường đích rõ để bootstrap sau này.

## Quyết định

Chọn Node.js 24 LTS, Express 5, JavaScript ESM, npm/lockfile, pg với SQL tham số hóa, PostgreSQL 18 với minor được hỗ trợ lúc thiết lập. Migration có phiên bản; test runner tích hợp Node và kiểm thử HTTP/DB.

## Phương án và đánh đổi

Giữ PostgreSQL phù hợp artifact SQL, thay vì chuyển MySQL. JavaScript là lựa chọn hiện tại; chưa chọn nhánh TypeScript có điều kiện. Dùng nền tảng chung giúp giảm khác biệt giữa các máy.

## Hệ quả và giới hạn

Dependency cụ thể, công cụ migration/lint/HTTP test, script và config còn DEC-014; kiểu/FK/index/default của schema đích còn DEC-022. [Data model](../architecture/data-model.md) giữ DDL hiện có và mô hình đích tách biệt. Không tạo manifest/migration hoặc chứng nhận tương thích runtime trong đợt docs.

Bằng chứng kiểm thử tương lai tại [acceptance](../testing/acceptance.md); triển khai/kiểm chứng tại [status](../project/status.md). Chưa có ADR bị thay thế; không thay lịch sử xác nhận của đợt docs 11/11/2026.

## Bổ sung phương án đơn giản cùng ngày 17/11/2026

[ADR-0005](adr-0005-simple-backend-contracts.md) và [xác nhận mới](open-decisions.md#evidence-simple-2026-11-17) bổ sung Resend/HMAC/scrypt/HS256/cookie-CSRF/bộ công cụ. Các câu chưa chốt ở phần hệ quả phía trên là bối cảnh thời điểm ban đầu; phần hiện hành đọc DEC-003/014/017/022. Không thay lựa chọn kiến trúc cốt lõi hoặc tự đóng schema/wire chưa đủ.
