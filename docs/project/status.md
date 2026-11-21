# Hiện trạng và bằng chứng

Các kết quả dưới mục lịch sử áp dụng cho revision và ngày ghi nhận, không phải kết quả của bản docs mới. Xem [phương án đơn giản mới nhất](#simple-sync-2026-11-17), [bổ sung media](#media-sync-2026-11-17), [đồng bộ đầu 17/11](#sync-2026-11-17) và [sổ DEC](../decisions/open-decisions.md#evidence-2026-11-17) cho xác nhận hiện hành.

## Kiểm kê và kiểm tra lịch sử 11/11/2026

Mốc kiểm kê: **11/11/2026**, múi giờ Asia/Saigon. Phạm vi quan sát: checkout cục bộ hiện tại; không suy ra trạng thái nhánh khác, máy khác hoặc hệ thống bên ngoài.

### Artifact đã quan sát

| Hạng mục | Triển khai | Kiểm chứng | Bằng chứng và giới hạn |
| --- | --- | --- | --- |
| DDL database | `PRESENT` | `NOT_RUN` | [schema.sql](../../database/schema.sql) khai báo năm bảng, FK, CHECK enum và chín index tường minh; chưa chạy SQL |
| Seed database | `PRESENT` | `NOT_RUN` | [seed_data.sql](../../database/seed_data.sql) chứa dữ liệu và reset sequence; chưa nạp hoặc kiểm tra hash |
| Backend | `NOT_IMPLEMENTED` | `NOT_RUN` | Các thư mục `src/config`, `controllers`, `middlewares`, `routes` chỉ có `.gitkeep`; không có entrypoint hoặc `package.json` |
| Media | `NOT_IMPLEMENTED` | `NOT_RUN` | Thư mục uploads và seed_media có `.gitkeep`; chưa có file audio/ảnh được seed tham chiếu |
| Runtime/config ứng dụng | `NOT_IMPLEMENTED` | `NOT_RUN` | Chưa thấy manifest, lockfile, `.env.example`, script khởi động hoặc cấu hình kết nối DB |
| Kiểm thử ứng dụng | `NOT_IMPLEMENTED` | `NOT_RUN` | Chưa có test suite, runner hoặc log kiểm thử tái hiện được |
| Docs | `PRESENT` | Xem mục kiểm tra docs bên dưới | Nội dung và cấu trúc phục vụ giao việc; chưa phê duyệt các quyết định sản phẩm |

### Khoảng trống kiểm chứng lịch sử

| Mã | Tuyên bố cần bằng chứng | Bằng chứng còn thiếu |
| --- | --- | --- |
| EVID-001 | Hoàn thành/nghiệm thu 12/12 use case | Revision ứng dụng, môi trường, kịch bản và kết quả chạy; checkout hiện tại chưa có ứng dụng |
| EVID-002 | Test case đã Pass | Lần chạy, dữ liệu, expected/actual, log và người kiểm tra |
| EVID-003 | API dưới 500 ms, phát audio trong một giây | Thiết kế phép đo, bản chạy, dữ liệu và kết quả; điều kiện đo còn mở ở DEC-015 |
| EVID-004 | Tài khoản seed đăng nhập được bằng mật khẩu chú thích | Bcrypt verification và kiểm thử auth sau khi có runtime |
| EVID-005 | Database tạo/seed thành công, phát được media | Log trên DB thử nghiệm đúng phiên bản và file demo tương ứng |

Không chuyển các tuyên bố này thành `PASS` bằng quyết định chủ quan. Giữ thiếu hụt bằng chứng ở đây; lựa chọn cần thiết để kiểm chứng nằm trong [sổ quyết định](../decisions/open-decisions.md).

### Kiểm tra docs lịch sử

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

<a id="sync-2026-11-17"></a>

## Đồng bộ quyết định 17/11/2026 — snapshot DOCSYNC-20261117-01

Phạm vi: checkout cục bộ và các xác nhận trong cuộc trò chuyện; không commit/push/deploy, không sửa/chạy SQL. Nguồn thiết kế được xác nhận tại sổ DEC; phiên bản nền tảng được chọn không có nghĩa đã cài hoặc test. Kết quả kiểm tra docs của 11/11 giữ nguyên lịch sử.

| Hạng mục hiện tại | Triển khai / kiểm chứng | Giới hạn |
| --- | --- | --- |
| Lựa chọn nghiệp vụ/kiến trúc | CONFIRMED theo phạm vi từng DEC | Chi tiết OPEN không được đóng hàng loạt |
| Schema/seed hiện có | PRESENT / NOT_RUN | Năm bảng/40 cột/chín index là DDL cũ, không có schema đích mới |
| Backend/runtime/media/test suite | NOT_IMPLEMENTED / NOT_RUN | Không có manifest/entrypoint/test runner hoặc media demo thực tế |
| Schema đích/API bổ sung | Thiết kế có phần CONFIRMED, chi tiết DRAFT | Chưa có migration, OpenAPI hoàn chỉnh hoặc endpoint bổ sung |
| Online/email thật | Yêu cầu đã xác nhận, chưa triển khai / NOT_RUN | Chưa có provider/hosting/config hoặc lần gửi mail/triển khai |

EVID-001–005 vẫn thiếu bằng chứng runtime. Cập nhật cách đọc EVID-003: ngưỡng/bộ dữ liệu đã chọn ở DEC-015 nhưng protocol chưa đủ; EVID-004/005 không được coi seed hợp lệ khi thiếu hash verification/media. Không nâng PASS cho ứng dụng từ cập nhật Markdown.

### Phần chưa đủ để giao code hoàn chỉnh

Xem từng DEC OPEN và [API gaps](../api/README.md#contract-gaps): provider/lưu/wire OTP; CSRF/cookie/ký/khóa; Range/cache/cleanup; duration; Guest ID/cửa sổ lượt nghe; reorder có track ẩn; field/null/error/keyword; schema/migration; bộ demo; máy/công cụ/protocol đo và restore; hosting/backup; lịch/RACI/chi phí. Phần độc lập theo quyết định đã chọn có thể tiếp tục trong tác vụ được giao riêng.

### Kiểm tra docs đợt 17/11

Run ID: **DOCSYNC-20261117-01**. Ngày: **17/11/2026**, Asia/Saigon. Người thực hiện: Codex trong phiên làm việc theo yêu cầu người dùng. Môi trường: Windows/PowerShell, Python **3.14.0**; nền checkout **241d0d0** cùng working tree docs chưa commit. Phạm vi chỉ kiểm tra file; không chứng nhận runtime nền tảng đích.

Cách chạy: script Python tạm `soundwave-validate-docs.py` dưới thư mục TEMP của phiên, đọc toàn bộ Markdown và SQL; `git -c core.safecrlf=false diff --check`; `git diff --no-index --check -- NUL <file-moi>` cho từng file mới. Script tạm không được cài như dependency/test suite repo. SHA-256 script: `aa89eed30c8eb1605f6e1c577c2ce9d12c25b631bcd0f8aca3b2fc6279425140`. Các phương pháp/actual bên dưới ghi đủ phạm vi để tái lập phép kiểm tra tương đương khi script tạm không còn.

| Kiểm tra | Kết quả | Expected và actual quan sát |
| --- | --- | --- |
| Markdown/link/anchor | PASS | 33 file Markdown (docs và hai điểm vào); duyệt link tương đối, kiểm tra file đích và anchor tường minh/heading, không có link gãy; code fence cân bằng; không ký tự thay thế Unicode hoặc trailing whitespace |
| Mã và truy xuất | PASS | Đúng 12 UC, 9 BR, 5 NFR, 27 API-ID, 21 TC, 22 DEC, 3 ADR, không trùng mã định nghĩa; cả 27 API có link trong ma trận; 21 TC đều NOT_RUN |
| Method/path và JSON | PASS | 27 dòng danh mục khớp trang nhóm; 21 JSON success parse được và có success/data, không token JSON hoặc pagination trong data; API-03/11/19/21/27 không JSON body và ghi 204; đăng ký không dùng mẫu kích hoạt thành công giả; upload không còn duration client bắt buộc |
| DDL quan sát | PASS | Đọc CREATE TABLE đối chiếu thứ tự 40 cột/năm bảng với từ điển và 9 index tường minh; schema đích được tách riêng, chưa thực thi DDL |
| Quyết định/lịch sử | PASS | 8 ACCEPTED, 14 OPEN có phần đã xác nhận/còn thiếu; DEC-006 ACCEPTED; bối cảnh cũ của đủ 22 DEC được giữ; kế hoạch 11/11 không đổi |
| Diff và whitespace | PASS | git diff --check không lỗi; kiểm tra cả 4 file chưa tracked và newline/whitespace của toàn bộ Markdown; chỉ 26 file tracked Markdown cùng 4 file mới trong phạm vi docs/README |
| SQL/ứng dụng và bằng chứng | PASS trong phạm vi tĩnh | schema.sql/seed_data.sql không khác HEAD theo nội dung chuẩn hóa CRLF/LF; backend/frontend/document không có diff. Không chạy SQL/API/media/mail; PASS này không chứng minh runtime |

Đã đọc thử ba luồng tra cứu: auth từ UC/BR tới cookie/OTP/phiên và phần wire thiếu; database từ DDL tới mô hình đích; route từ API-ID tới method/path được chọn và gaps. Giới hạn: không kiểm tra URL ngoài, render mọi trình Markdown/Mermaid, OpenAPI, dependency hoặc ứng dụng; chưa có môi trường để ghi PASS nghiệp vụ.

<a id="media-sync-2026-11-17"></a>

## Bổ sung media 17/11/2026 — sau DOCSYNC-20261117-01

Nguồn: [xác nhận media](../decisions/open-decisions.md#evidence-media-2026-11-17), [ADR-0004](../decisions/adr-0004-audio-contract-and-file-lifecycle.md), [kế hoạch](../plans/2026-11-17-media-contracts.md). DEC-009/DEC-011 ACCEPTED, tổng 10 ACCEPTED/12 OPEN. Danh mục 29 API-ID với API-28 GET và API-29 HEAD /api/tracks/:id/audio, audioUrl thay storage path. FFprobe/FFmpeg/Sharp, UUID, ceiling duration, publish/commit/đối chiếu/dọn/cover đã được ghi theo phương án chấp nhận.

Backend, SQL/seed và media runtime không thay đổi; triển khai NOT_IMPLEMENTED/NOT_RUN như kiểm kê, DDL cũ PRESENT/NOT_RUN. Chưa cài FFmpeg/Sharp, stream, cleanup, gửi mail hoặc deploy; chưa tạo OpenAPI hay migration. Các con số và PASS của DOCSYNC-20261117-01 là bằng chứng cho snapshot trước, không được tái dùng làm kết quả đợt media.

Còn DEC-014/017/022 về versions, timeout/concurrency/config ảnh, conditional HTTP/chính sách ảnh/error phụ/multipart/null, nhận biết active/commit và danh sách dọn chống race; các phần OTP/JWT/reorder/search/demo/quản lý/protocol đo khác vẫn OPEN như sổ DEC. Không coi ngưỡng 24 giờ là cơ chế chống xóa thao tác đang chạy.

### Kiểm tra tĩnh đợt media

Run ID: **DOCSYNC-20261117-02**. Ngày **17/11/2026**, Asia/Saigon. Người thực hiện: Codex trong phiên theo yêu cầu người dùng. Môi trường Windows/PowerShell, Python **3.14.0**, nền checkout **241d0d0** và working tree chưa commit đã có DOCSYNC-20261117-01. Phạm vi chỉ kiểm tra tài liệu hiện tại; không chạy ứng dụng, SQL hoặc công cụ media.

Lệnh thực chạy: Python với script tạm `soundwave-validate-media-docs.py` dưới TEMP; SHA-256 `0d2b16c1b87e08d570602ec3efd2a682217ba5d52a27cc9530eb062837895f5b`. Script đọc Markdown/JSON/SQL, đối chiếu working-tree snapshot trước đợt media, chạy `git -c core.safecrlf=false diff --check` và no-index --check cho mọi file chưa tracked. Công cụ tạm không được cài vào repo; bảng ghi phương pháp và kết quả để có thể lập lại phép kiểm tra tương đương.

| Kiểm tra | Kết quả | Actual và giới hạn |
| --- | --- | --- |
| Markdown/link/anchor/whitespace | PASS | 35 Markdown gồm docs và hai điểm vào, mọi liên kết nội bộ có file/anchor đích, fence cân bằng, không ký tự thay thế/trailing whitespace; chưa render mọi trình Markdown/Mermaid hoặc kiểm URL ngoài |
| Mã và truy xuất | PASS | 12 UC, 9 BR, 5 NFR, 21 TC, 22 DEC, 29 API-ID, 4 ADR không trùng định nghĩa; cả 29 API có link ma trận, 21 TC đều NOT_RUN |
| Route và JSON | PASS | 29 dòng danh mục khớp method/path, bao gồm GET/HEAD cùng audio path; 21 JSON success parse được, envelope/pagination phù hợp; ba mẫu audioUrl đúng track ID, không audioFilePath/storage path trong JSON |
| Contract media | PASS trong phạm vi tĩnh | API-28 có binary/full/single Range/multi fallback, 200/206/400/416/404/503 và header/no-store/error code đã chọn; API-29 ghi bỏ Range/không body cả lỗi; hai endpoint không tăng lượt nghe; không phát byte thực tế |
| Vòng đời và expected | PASS trong phạm vi tĩnh | ffprobe/FFmpeg/Sharp/UUID, ceiling duration, publish/COMMIT/đối chiếu, startup/30 phút/>24 giờ, active/soft-delete/default/shared cover và khóa hàng được liên kết TC-08/09/11/17/21; không chạy cleanup hoặc fault injection |
| Quyết định/lịch sử | PASS | DEC-009/011 ACCEPTED, 10 ACCEPTED/12 OPEN; bằng chứng người dùng và ADR-0004 có liên kết, kế hoạch đợt trước/11-11 và bảng kết quả DOCSYNC-20261117-01 được giữ |
| SQL và phạm vi diff | PASS trong phạm vi tĩnh | Từ điển quan sát vẫn 40 cột/năm bảng/9 index; schema.sql/seed_data.sql trùng checksum snapshot đầu đợt. Chỉ 20 Markdown đã có cùng hai file mới thay đổi ở đợt này; toàn bộ thay đổi ngoài docs so với snapshot không có |
| Git whitespace cả file mới | PASS | Tracked diff --check không lỗi, kiểm cả 6 file chưa tracked của hai đợt; no-index --check mã 1 do khác NUL được chấp nhận khi không có thông báo whitespace/error |

Các con số kiểm tra trên không phải kết quả API/SQL/seek/duration/cleanup thực. Công cụ media/deployment chưa cài/chạy; phiên bản, giới hạn tiến trình, recovery state, conditional HTTP/ảnh và wire ngoài phạm vi vẫn cần DEC tương ứng.

<a id="simple-sync-2026-11-17"></a>

## Phương án đơn giản 17/11/2026 — sau DOCSYNC-20261117-02

Nguồn [xác nhận mới](../decisions/open-decisions.md#evidence-simple-2026-11-17), [ADR-0005](../decisions/adr-0005-simple-backend-contracts.md), [kế hoạch](../plans/2026-11-17-simple-backend-decisions.md). Hiện 39 API-ID/14 DEC ACCEPTED/8 OPEN/5 ADR. DEC-010/012/019/021 ACCEPTED; DEC-003/005/014/017/022 còn chi tiết, DEC-015/016/020 giữ OPEN. 12 UC/9 BR/5 NFR/21 TC giữ mã, mọi TC NOT_RUN.

Công cụ Zod/Multer/jose-HS256/scrypt/pg.Pool/node-pg-migrate/node:test-fetch/ESLint, Resend HTTPS/HMAC OTP/user chưa verified, cookie soundwave_session/CSRF-Origin/password 12–128, bốn bảng đích/search_text/cooldown/text limits được ghi CONFIRMED. Reorder thay mọi ID liên kết bằng ID hiển thị, ẩn cuối/hiện lại cuối/tập đổi 409/UNIQUE kiểm commit. Các response chưa được chọn không được tự hoàn thiện.

Backend/frontend/runtime/config/test suite/media vẫn NOT_IMPLEMENTED/NOT_RUN; schema/seed cũ PRESENT/NOT_RUN và không đổi trong đợt này. Không cài package, tạo migration/Resend account/key/domain, gửi email, chạy SQL/API/media, commit/push hoặc deploy. Hash Bcrypt seed vẫn chưa được kiểm chứng, không tự tương thích scrypt; user cũ chưa có bằng chứng cần verify. Bằng chứng hai snapshot trước giữ nguyên.

### Phần còn thiếu

[API gaps](../api/README.md#contract-gaps): IP limit/counters/timeout email/đăng ký lại, field-status-response các bước OTP và Creator/CSRF/reorder; hash/key lifecycle/cookie Domain-Guest/Origin policy; DDL-FK-index-null/mapping trạng thái/lock order/chuyển dữ liệu cũ. Media vẫn versions/timeout/concurrency/ảnh/conditional HTTP/multipart/recovery-dọn chống race. Hosting/backup/demo/nghiệm thu/lịch-RACI chưa chọn đầy đủ; không ngăn các tác vụ độc lập đủ đầu vào.

### Kiểm tra tĩnh đợt phương án đơn giản

Run ID **DOCSYNC-20261117-03**, ngày **17/11/2026**, Asia/Saigon. Người thực hiện: Codex trong phiên người dùng yêu cầu. Môi trường Windows/PowerShell, Python **3.14.0**, nền checkout **241d0d0** cùng working tree đã có hai đợt docs trước; phạm vi kiểm tra file, không runtime.

Lệnh thực chạy: `python "$env:TEMP\soundwave-validate-simple-docs.py"`. Script tạm SHA-256 `128e4c987010390770d5edb1496cea8113ffd7d87c60e1d17c41310ed437f9e1`, báo cáo JSON tạm `soundwave-simple-validation-report.json`; không cài vào repo/test suite. Script đọc toàn bộ Markdown/DDL, so snapshot đầu lượt `soundwave-simple-sync-before.json`, chạy `git -c core.safecrlf=false diff --check` và `git -c core.safecrlf=false diff --no-index --check -- NUL <file-moi.md>` cho mọi file Markdown chưa tracked. Kiểm tra no-index mã 1 chỉ chấp nhận khi không có stdout/stderr lỗi whitespace. Những phương pháp/actual dưới đây đủ để lập phép kiểm tra tương đương khi file tạm không còn.

| Kiểm tra | Kết quả | Actual và giới hạn |
| --- | --- | --- |
| Markdown/link/anchor/mã hóa | PASS | 38 Markdown gồm docs và hai điểm vào; mọi link nội bộ có đích/anchor, fence cân bằng, UTF-8 không ký tự thay thế/hỏng dấu hoặc trailing whitespace; không render mọi Markdown/Mermaid/URL ngoài |
| Mã/trạng thái/truy xuất | PASS | 12 UC/9 BR/5 NFR/21 TC/22 DEC/39 API-ID/5 ADR, không trùng định nghĩa; DEC 14 ACCEPTED/8 OPEN, mọi API có link trong ma trận, 21 TC vẫn NOT_RUN |
| Route/JSON | PASS | 39 dòng danh mục khớp method/path tại trang nhóm; 21 JSON success parse được/envelope-pagination phù hợp; ba audioUrl đúng dạng/không audioFilePath hoặc storage path, không JWT JSON |
| Lựa chọn đã xác nhận | PASS trong phạm vi tĩnh | Công cụ/scrypt/HS256/Resend-HMAC/cookie-CSRF/password/text/search/cooldown/reorder được ghi ở tài liệu sở hữu và expected; không coi listenedSeconds là chứng minh nghe thật hoặc mọi cạnh tranh reorder đều 409 |
| Lịch sử | PASS | Nội dung kết quả trước của chín DEC còn nguyên dưới nhãn lịch sử; ba kế hoạch cũ/template/AGENTS và bằng chứng status trước giữ nguyên; ADR-0005 ghi reorder thay lựa chọn cũ |
| DDL và phạm vi | PASS trong phạm vi tĩnh | Từ điển DDL giữ nguyên hàng/40 cột/năm bảng/chín index; 25 file backend/frontend/database/document trùng checksum đầu lượt; chỉ 31 Markdown thay đổi ở đợt này, gồm ba file mới: ADR-0005, Creator API và kế hoạch |
| Git whitespace | PASS | Tracked diff --check mã 0, kiểm cả 9 Markdown chưa tracked của ba đợt; không ghi nhận lỗi whitespace |

Đã đọc thử luồng auth từ BR tới Resend/scrypt/cookie/CSRF và phần wire còn thiếu; schema logic so DDL quan sát; API-25 application ID; API-38 reorder hiển thị tới TC-13. Chưa có npm/application/SQL/OTP/media/performance test; EVID-001–005 vẫn thiếu bằng chứng runtime. Chọn Resend không chứng minh đã có tài khoản/domain/email gửi thành công.

## Phạm vi migration đầu tiên xác nhận ngày 18/11/2026

Chuỗi migration bắt đầu trên PostgreSQL 18 trống để dựng schema đích. Chuyển dữ liệu cũ nằm ngoài phạm vi khởi tạo và seed demo chạy riêng. DEC-022 vẫn `OPEN` cho chi tiết schema vật lý và giao dịch. Migration vẫn `NOT_IMPLEMENTED` và TC-19 vẫn `NOT_RUN`. [Xác nhận DEC-022](../decisions/open-decisions.md#evidence-initial-migration-2026-11-18).

<a id="bootstrap-auth-2026-11-18"></a>

## Xác nhận bootstrap và schema tài khoản ngày 18/11/2026

Người dùng đã chốt baseline Node.js 24.22.3 LTS/PostgreSQL 18.7, cấu hình và lệnh dev/start/migrate/test/lint, schema ba bảng trong migration đầu tiên, thứ tự khóa auth và trạng thái gửi OTP. Có 39 API-ID, 14 DEC `ACCEPTED`, 8 DEC `OPEN` và 6 ADR. [Xác nhận](../decisions/open-decisions.md#evidence-bootstrap-auth-2026-11-18), [kế hoạch](../plans/2026-11-18-backend-bootstrap-decisions.md).

Phần còn mở gồm IP limit, xử lý `reserved` bị gián đoạn, đăng ký lại, wire HTTP, phiên bản dependency thực tế, schema các luồng sau và vận hành media/online. Backend và migration vẫn `NOT_IMPLEMENTED`. 21 TC vẫn `NOT_RUN`.

Kiểm tra tĩnh ngày 18/11/2026 trên Windows/PowerShell, Python 3.14.0, nền `ed7a22c` và working tree của đợt này. Script qua stdin kiểm tra đọc UTF-8, code fence và liên kết/anchor nội bộ của 40 file Markdown. Đối chiếu 39 API-ID, 22 DEC, 6 ADR, 21 TC, biến môi trường và lệnh đích, cột/index của ba bảng, các trạng thái OTP và liên kết giao dịch auth. `git diff --check` và kiểm tra whitespace từng file mới đều không báo lỗi. Diff trong `backend/`, `frontend/`, `database/`, `document/` rỗng. Không có lần chạy ứng dụng, email hoặc SQL.

<a id="backend-bootstrap-run-2026-11-18"></a>

## Triển khai bootstrap backend và migration đầu tiên ngày 18/11/2026

Run ID **BOOTSTRAP-20261118-01**, ngày 18/11/2026, Asia/Saigon. Phạm vi checkout là `ed7a22c` cùng working tree. Môi trường Windows/PowerShell, Node.js **24.14.1**, npm **11.11.0**, PostgreSQL **18.4**. `initdb` và `pg_ctl` chạy cụm thử biệt lập trên loopback cổng 55432. Hai DB trống cuối cùng dùng riêng để kiểm lệnh migrate/rollback và `npm test`. Tiến trình HTTP kiểm tra ở loopback, cổng 55431 hoặc cổng tạm trong test. Đã dừng và dọn cụm thử sau khi chạy.

Tại snapshot này, bootstrap, test tích hợp và migration `20261118000000000_create-account-schema` là `PRESENT`. Các bản khóa trực tiếp gồm Express 5.3.0, pg 8.23.1, Zod 4.6.7, jose 6.2.17, node-pg-migrate 9.0.0, ESLint 10.15.0, @eslint/js 10.0.1 và globals 17.14.0. [Lockfile](../../backend/package-lock.json), [kế hoạch](../plans/2026-11-18-implement-backend-bootstrap.md). Migration tại snapshot này được thay ở mốc 20/11.

| Kiểm tra | Kết quả | Bằng chứng quan sát |
| --- | --- | --- |
| `npm ci --offline --ignore-scripts --no-fund --no-audit` và `npm run lint` | `PASS` | Cài từ lockfile trên bản sao tạm với npm cache, 180 package. ESLint thoát 0 ở repo và bản sao. |
| `npm start`, `npm run dev` | `PASS` | Start nhận biến môi trường, dev đọc `.env` và khởi động ở Node watch. Backend kết nối DB, lắng nghe HTTP và `GET /` trả 404 mặc định. |
| `npm run migrate` hai lần trên DB trống | `PASS` | Lần đầu áp `20261118000000000_create-account-schema`. Lần hai báo không có migration. |
| `node ./node_modules/node-pg-migrate/bin/node-pg-migrate.js down`, rồi `npm run migrate` | `PASS` | Trên DB thử do lượt này tạo, rollback để lại 0 bảng tài khoản và 0 mục lịch sử. Lần `up` sau tạo lại thành công. |
| `npm test` và `psql` đọc catalog/count | `PASS` | Lượt xác nhận trên DB trống khác có 3 test qua, 0 fail. Đối chiếu bảng, cột, null/default, identity, index và ràng buộc chính. Sau rollback fixture, số hàng `pgmigrations/users/otp_challenges/auth_sessions` là `1/0/0/0`. |
| `npm test` với URL thử thiếu hoặc cùng đích dev | `PASS` | Mỗi trường hợp bị từ chối với mã thoát 1 trước khi chạy migration. |
| Liên kết docs, lockfile, mẫu env và `git diff --check` | `PASS` | Kiểm tra 41 file Markdown và 1109 liên kết nội bộ, khớp manifest/lockfile, các giá trị bí mật mẫu để trống, `.env`/`.env.test`/`node_modules` được ignore. Diff SQL cũ, frontend và `document/` rỗng. |

Lần chạy đầu của test tích hợp có 2 qua, 1 lỗi kỳ vọng vì PostgreSQL trả `23001` cho `ON DELETE RESTRICT`. Đã sửa expected và kiểm chứng lại trên DB trống mới. Phần migration đầu tiên của TC-19 đã `PASS`. Toàn bộ TC-19 và các TC nghiệp vụ vẫn `NOT_RUN`. Baseline chính xác Node.js 24.22.3/PostgreSQL 18.7, tự động reload khi sửa file, auth/OTP, DDL/seed reset cũ, seed demo, các bảng sau và deploy chưa được kiểm chứng.

<a id="single-database-migration-2026-11-20"></a>

## Một migration khởi tạo chín bảng ngày 20/11/2026

Run ID **SCHEMA-20261120-01**, Asia/Saigon. Windows/PowerShell, Node.js 24.14.1, npm 11.11.0 và PostgreSQL 18.4. Hai DB trống thuộc cùng cụm PostgreSQL tạm trên loopback, một DB cho CLI và một DB cho test. Cụm đã dừng và được dọn. [Migration duy nhất](../../backend/migrations/20261120000000000_create-initial-schema.js), [test](../../backend/test/bootstrap.test.js), [ADR-0007](../decisions/adr-0007-single-initial-database-migration.md).

| Kiểm tra | Kết quả | Quan sát |
| --- | --- | --- |
| `npm run lint` | `PASS` | ESLint thoát 0. |
| `npm run migrate` hai lần | `PASS` | Lần đầu áp một migration. Lần hai báo không có migration. |
| `npm test` | `PASS` | 4 qua, 0 lỗi. HTTP bootstrap trả 404 mặc định. Catalog có chín bảng nghiệp vụ, một dòng lịch sử. Kiểm ràng buộc tài khoản/OTP, Creator pending và snapshot, genre FK, duration, văn bản, định danh cooldown và vị trí playlist deferred. |
| `node ./node_modules/node-pg-migrate/bin/node-pg-migrate.js down --quiet` và `npm run migrate` | `PASS` | Sau `down`, `psql` đếm 0 bảng nghiệp vụ và 0 dòng lịch sử. Áp lại thành công. |

Phần DDL khởi tạo của TC-19 đã chạy. Toàn bộ TC-19 còn seed/demo. Chưa kiểm chứng seed cũ, migration giữ dữ liệu cho DB đã áp schema ba bảng, baseline chính xác 18.7, API nghiệp vụ hoặc recovery media. [Kế hoạch](../plans/2026-11-20-consolidate-database-migration.md).
