# Chốt hợp đồng upload và phát audio

## Purpose and context

Ngày 17/11/2026, người dùng xác nhận “tôi chấp nhận đề xuất, hãy cập nhật docs” sau phương án GET/HEAD audio, Range, no-store, kiểm tra file, duration và vòng đời file–DB/cover. Đầu vào: [sổ DEC](../decisions/open-decisions.md), [API](../api/README.md), [media](../architecture/security-and-media.md), [hiện trạng](../project/status.md). Đầu ra: đồng bộ lựa chọn mới, giữ phần ngoài phạm vi OPEN và lịch sử đợt DOCSYNC-20261117-01.

## Scope and dependencies

Chỉ Markdown docs, không sửa/chạy SQL, seed, code, dependency hoặc config; không cài FFmpeg/Sharp, gửi mail, phát file thật hay deploy. DEC-009/DEC-011 được chấp nhận trong phạm vi phương án; chi tiết dependency/config/process/recovery state ở DEC-014/DEC-022 còn thiếu. Không tự chọn timeout/concurrency, bảng hàng đợi hoặc giao thức retry upload.

## Progress

- [x] 17/11/2026: đọc hướng dẫn, docs liên quan và kiểm kê working tree đã có thay đổi từ đợt trước; lưu snapshot tạm để phân biệt phạm vi đợt này.
- [x] 17/11/2026: ghi bằng chứng, DEC-009/011 ACCEPTED, ADR-0004 và API-28/29; giữ lịch sử ADR-0002.
- [x] 17/11/2026: đồng bộ audioUrl, lifecycle, công cụ/duration/cover, yêu cầu/schema đích/môi trường và TC/truy xuất.
- [x] 17/11/2026: kiểm tra 35 Markdown/link/anchor, 29 API-ID, JSON/audioUrl, traceability, phạm vi và whitespace cả file mới; ghi DOCSYNC-20261117-02 tại status.

## Milestones and concrete steps

M1: bổ sung kết quả DEC-009/011, ảnh hưởng DEC-014/017/022, ADR-0004 bổ sung ADR-0002 mà không đổi lịch sử lựa chọn lưu local. Giữ API-01–27; cấp API-28 GET và API-29 HEAD /api/tracks/:id/audio. M2: thay tham chiếu audioFilePath DRAFT trong JSON hiện hành bằng audioUrl; ghi contract binary/status/header/cache và quy trình upload/cleanup/cover được chọn. M3: cập nhật expected TC-08/09/11/17/21, ma trận và kiểm tra links/anchors/JSON/mã/method/path/whitespace, đối chiếu từ điển SQL cũ, không chạy runtime.

## Validation and acceptance

Mã cũ không đổi; 29 API-ID có liên kết truy xuất, GET audio có binary success, HEAD không body cả lỗi; JSON metadata dùng audioUrl và không lộ storage path. Kiểm tra Range, 404/503, ceiling duration, ffprobe/FFmpeg/Sharp, commit không rõ kết quả và chống xóa nhầm file active/được tham chiếu trong docs. SQL/seed và kế hoạch/bằng chứng cũ giữ nguyên. Các TC đều NOT_RUN; chỉ ghi PASS kiểm tra tài liệu sau khi chạy thực tế.

## Recovery and compatibility

Sửa bằng diff tập trung trên working tree, không reset các thay đổi sẵn có. Thêm API-ID sau 27, không tái sử dụng ID. Storage audio_file_path của DDL cũ vẫn nguyên; audioUrl là giao diện HTTP đích, không migration đổi cột SQL. ADR-0004 bổ sung độ chi tiết, không thay lựa chọn ADR-0002.

## Surprises & Discoveries

HEAD không có body cả khi lỗi; binary success không dùng JSON envelope. Mất kết nối lúc COMMIT chưa chứng minh rollback; phải đối chiếu DB trước xóa file. Dọn rác phải đọc cả tham chiếu soft delete và bỏ qua thao tác đang chạy; cơ chế nhận biết thao tác chưa được chọn.

## Decision Log

Nguồn quyết định cập nhật tại [DEC media](../decisions/open-decisions.md#evidence-media-2026-11-17). Không ghi nhận thêm lựa chọn về OTP/JWT/provider hoặc các DEC ngoài phạm vi media.

## Outcomes & Retrospective

Hoàn thành phạm vi docs được giao: 20 file Markdown đã có thay đổi thêm trong đợt này và hai file mới (ADR-0004/kế hoạch media); các thay đổi của đợt trước được giữ. Có 29 API-ID, 4 ADR, 10 DEC ACCEPTED/12 OPEN; 12 UC/9 BR/5 NFR/21 TC giữ mã, tất cả TC NOT_RUN.

Kiểm tra thực tế DOCSYNC-20261117-02 tại [status](../project/status.md#media-sync-2026-11-17) đã qua; 21 JSON success mẫu hợp lệ, ba mẫu audioUrl, GET binary/HEAD không body, đầy đủ liên kết API-28/29. SQL cũ và kế hoạch trước giữ nguyên, không chạy runtime. Chi tiết versions/limits/recovery state/conditional HTTP/ảnh chưa chọn được dẫn tới DEC-014/017/022, không mở rộng hợp đồng ngầm.

Bài học: dữ liệu file và DB không commit chung; cần ghi riêng trường hợp COMMIT không rõ và việc dọn chỉ dựa trên tuổi là chưa đủ. HEAD cũng không được trả JSON lỗi; thêm API binary phải kiểm ngoại lệ envelope thay vì yêu cầu mọi response có success/data.
