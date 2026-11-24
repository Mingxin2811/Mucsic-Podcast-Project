# Quy trình ghi nhận quyết định

[Sổ quyết định và phần còn mở](open-decisions.md) là nơi duy nhất quản lý câu hỏi và các phương án. Những tài liệu khác dẫn tới mã `DEC` tương ứng. Xem [hiện trạng](../project/status.md) cho thiếu hụt bằng chứng, vì sự thật chưa kiểm chứng không phải phương án để bỏ phiếu.

## Vòng đời

1. Ghi vấn đề mới bằng số `DEC` tiếp theo; không đổi số đã được dẫn ở tài liệu khác.
2. Đặt `OPEN`, ghi rõ xung đột hoặc thông tin còn thiếu, các phương án đã biết và phạm vi ảnh hưởng.
3. Không mặc định lựa chọn theo tài liệu mới hơn hoặc theo cấu trúc đang tồn tại. Người chốt chưa được chỉ định thì ghi “chưa xác định”.
4. Khi có xác nhận rõ, lưu kết quả, lý do, người/ngày, bằng chứng và các tài liệu cần cập nhật. Chỉ phạm vi được xác nhận mới chuyển `ACCEPTED` hoặc `REJECTED`.
5. Với quyết định có ý nghĩa kiến trúc, tạo ADR trong thư mục này, liên kết hai chiều với `DEC`. Nếu thay đổi lựa chọn đã chấp nhận, tạo ADR mới thay thế; giữ nguyên nội dung lý do lịch sử, chỉ cập nhật trạng thái/liên kết thay thế.

Không tự gán quyền phê duyệt kỹ thuật cho một thành viên chỉ từ chức danh quản lý. Quyền chốt chưa rõ được ghi tại [DEC-016](open-decisions.md#dec-016).

## Mẫu mục quyết định

```text
DEC-NNN Tên vấn đề
Trạng thái: OPEN
Loại: xung đột / còn thiếu / cả hai
Bối cảnh và các phát biểu hiện có:
Các phương án đã biết hoặc thông tin chưa có:
Ảnh hưởng: UC, BR/NFR, API, bảng dữ liệu, tác vụ kiểm thử
Cần bổ sung để quyết định:
Người chốt: chưa xác định
Kết quả: chưa xác định; không có phương án mặc định
Khi được chốt: lý do, ngày, người xác nhận, bằng chứng, ADR và nơi cần cập nhật
```

## Mẫu ADR

Tên tương lai: `adr-NNNN-ten-quyet-dinh.md`. Chưa tạo ADR mang trạng thái chấp nhận khi chưa có xác nhận.

```text
Tiêu đề
Trạng thái: Proposed / Accepted / Rejected / Superseded
Quyết định liên quan: DEC-NNN
Ngày và người xác nhận:
Bối cảnh và yêu cầu có ý nghĩa kiến trúc:
Các phương án và đánh đổi:
Kết quả và lý do:
Hệ quả, phạm vi, giới hạn:
Bằng chứng xác nhận:
Tài liệu, kế hoạch và kiểm thử bị ảnh hưởng:
Thay thế / được thay thế bởi:
```

## Cập nhật 17/11/2026

Sổ DEC ghi bằng chứng xác nhận từ người dùng trong phiên, phạm vi kết quả và phần thiếu riêng. DEC còn OPEN có thể đã chấp nhận một số lựa chọn; không tạo nhãn PARTIAL hoặc hiểu rằng mọi nội dung đều chưa được chọn. Chỉ chuyển ACCEPTED khi phạm vi quyết định được giải quyết; chi tiết ngoài phạm vi đó tiếp tục được dẫn tới DEC sở hữu. Không tự coi việc “đồng bộ đã chốt” là yêu cầu hoàn tất mọi wire.

ADR đã chấp nhận: [auth/phiên](adr-0001-authentication-and-sessions.md), [media/online](adr-0002-media-and-online-readiness.md), [backend/database](adr-0003-backend-and-database.md). Chúng giải thích lựa chọn kiến trúc, dẫn tới tài liệu sở hữu hợp đồng thay vì tạo schema/response thứ hai. Chưa có lần chạy ứng dụng phát sinh từ các ADR.

Bổ sung cùng ngày: [ADR-0004 audio và vòng đời file](adr-0004-audio-contract-and-file-lifecycle.md) mở rộng ADR-0002 theo xác nhận mới, không thay lựa chọn local. DEC-009/DEC-011 nay ACCEPTED trong phạm vi được ghi; chi tiết runtime/schema ngoài phạm vi còn DEC-014/017/022.

Sau [xác nhận đơn giản](open-decisions.md#evidence-simple-2026-11-17), [ADR-0005](adr-0005-simple-backend-contracts.md) bổ sung auth/nền tảng và ghi thay đổi quy tắc reorder.

Ngày 18/11/2026, [ADR-0006](adr-0006-bootstrap-and-account-schema.md) ghi baseline, lệnh local, schema ba bảng tài khoản và giao dịch auth. [Xác nhận bootstrap](open-decisions.md#evidence-bootstrap-auth-2026-11-18).

Ngày 20/11/2026, [ADR-0007](adr-0007-single-initial-database-migration.md) ghi quyết định dùng một migration khởi tạo chín bảng trên PostgreSQL 18 trống.

Ngày 21/11/2026, [ADR-0008](adr-0008-registration-otp.md) ghi quyết định cho OTP đăng ký, gồm hạn mức IP, xử lý gián đoạn và mật khẩu của lần đăng ký khi xác minh/gửi lại. [Xác nhận](open-decisions.md#evidence-registration-otp-2026-11-21).

Ngày 21/11/2026, [ADR-0009](adr-0009-password-reset-otp.md) ghi quyết định cho OTP reset, hạn mức IP và lịch dọn. DEC-003 chuyển sang `ACCEPTED`. [Xác nhận](open-decisions.md#evidence-password-reset-otp-2026-11-21).

Ngày 22/11/2026, [DEC-005](open-decisions.md#dec-005) chuyển sang `ACCEPTED` với hợp đồng Auth/CSRF, Creator và playlist. [Xác nhận](open-decisions.md#evidence-api-contracts-2026-11-22).

Cùng ngày, [ADR-0010](adr-0010-local-runtime-scope.md) ghi phạm vi local, cấu hình auth/media và hướng mở rộng. DEC-014 chuyển sang `ACCEPTED`; sổ có 17 `ACCEPTED` và 5 `OPEN`. [Xác nhận](open-decisions.md#evidence-local-runtime-2026-11-22).
