# ADR-0005 Backend đơn giản, auth và hợp đồng nghiệp vụ

Trạng thái: **Accepted**, ngày **17/11/2026**, Asia/Saigon. Người xác nhận: người dùng trong phiên; [bằng chứng](open-decisions.md#evidence-simple-2026-11-17). Liên quan DEC-003/005/010/012/014/017/019/021/022.

## Bối cảnh và lựa chọn

Ưu tiên triển khai gọn, nhanh và ổn định: một Express backend/PostgreSQL, pg.Pool/SQL tham số hóa, Zod/Multer/jose/scrypt Node, node-pg-migrate/node:test/fetch/ESLint. Resend HTTPS gửi OTP, HMAC/phiên/cooldown/hồ sơ trong PostgreSQL. [Local setup](../development/local-setup.md) sở hữu bộ công cụ, [security](../architecture/security-and-media.md) sở hữu auth/cookie.

## Quan hệ với quyết định trước

Bổ sung [ADR-0001](adr-0001-authentication-and-sessions.md) và [ADR-0003](adr-0003-backend-and-database.md), giữ JWT/phiên 24 giờ/PostgreSQL/media local. Password/scrypt thay Bcrypt DRAFT cũ. **Thay thế lựa chọn reorder toàn bộ liên kết** trước đây ở [DEC-019](open-decisions.md#dec-019): nay toàn bộ ID hiển thị, liên kết ẩn ở cuối/hiện lại cuối. Lý do cũ giữ tại DEC-019, không xóa lịch sử.

## Đánh đổi

Lượt nghe dựa trên client/cooldown, chưa chống gian lận; Guest chuyển user có thể thêm một lượt. Search_text đo 1.000 track trước thêm pg_trgm. Reorder giảm dữ liệu client cần biết nhưng đổi vị trí khi track hiện lại; hai reorder hợp lệ có thứ tự lần sau.

## Hệ quả và giới hạn

[API](../api/README.md) thêm API-30–39/application ID API-25; [BR](../requirements/business-rules.md) sở hữu semantics, [data model](../architecture/data-model.md#target-model) sở hữu đích, [acceptance](../testing/acceptance.md) sở hữu expected, mọi TC NOT_RUN. Bốn bảng bổ sung chưa có SQL.

DEC-003/005/014/017/022 còn chi tiết; DEC-015/016/020 không đóng. Chưa tạo tài khoản email/mua domain/cài công cụ/migration/ứng dụng. [Kế hoạch](../plans/2026-11-17-simple-backend-decisions.md), [hiện trạng](../project/status.md#simple-sync-2026-11-17).
