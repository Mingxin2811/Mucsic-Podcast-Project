# Ma trận truy xuất yêu cầu

Đồng bộ 17/11/2026: các lựa chọn nghiệp vụ CONFIRMED theo [sổ DEC](../decisions/open-decisions.md#evidence-simple-2026-11-17); hợp đồng/dữ liệu chi tiết còn thiếu giữ DRAFT. Mỗi dòng nối nghiệp vụ với tài liệu sở hữu hợp đồng, dữ liệu và phép kiểm chứng. Liên kết thiết kế không chứng minh đã triển khai; kết quả thực tế ở [status](../project/status.md).

| UC | Quy tắc | API đang mô tả | Dữ liệu | Kịch bản | Quyết định ảnh hưởng chính |
| --- | --- | --- | --- | --- | --- |
| [UC01](use-cases.md#uc01) | [BR-002](business-rules.md#br-002), [BR-003](business-rules.md#br-003) | [API-01](../api/auth.md#api-01), [API-30](../api/auth.md#api-30), [API-31](../api/auth.md#api-31) | [users](../architecture/data-model.md#users) | [TC-01](../testing/acceptance.md#tc-01), [TC-02](../testing/acceptance.md#tc-02) | DEC-002/003/007/017/022 |
| [UC02](use-cases.md#uc02) | [BR-003](business-rules.md#br-003) | [API-02](../api/auth.md#api-02), [API-03](../api/auth.md#api-03), [API-04](../api/auth.md#api-04), [API-32](../api/auth.md#api-32), [API-33](../api/auth.md#api-33), [API-34](../api/auth.md#api-34), [API-39](../api/auth.md#api-39) | [users](../architecture/data-model.md#users) | [TC-03](../testing/acceptance.md#tc-03), [TC-04](../testing/acceptance.md#tc-04), [TC-05](../testing/acceptance.md#tc-05) | DEC-003/005/006/017/020 |
| [UC03](use-cases.md#uc03) | [BR-004](business-rules.md#br-004), [BR-009](business-rules.md#br-009) | [API-05](../api/tracks.md#api-05), [API-06](../api/tracks.md#api-06) | [tracks](../architecture/data-model.md#tracks) | [TC-06](../testing/acceptance.md#tc-06), [TC-20](../testing/acceptance.md#tc-20) | DEC-004/010/017/018 |
| [UC04](use-cases.md#uc04) | [BR-004](business-rules.md#br-004), [BR-009](business-rules.md#br-009) | [API-05](../api/tracks.md#api-05), [API-13](../api/genres.md#api-13), [API-14](../api/genres.md#api-14) | [tracks](../architecture/data-model.md#tracks), [genres](../architecture/data-model.md#genres), [users](../architecture/data-model.md#users) | [TC-07](../testing/acceptance.md#tc-07), [TC-20](../testing/acceptance.md#tc-20) | DEC-001/012/017/018 |
| [UC05](use-cases.md#uc05) | [BR-004](business-rules.md#br-004), [BR-009](business-rules.md#br-009) | [API-07](../api/tracks.md#api-07), [API-08](../api/tracks.md#api-08), [API-28](../api/tracks.md#api-28), [API-29](../api/tracks.md#api-29); audio contract đã chọn | [tracks](../architecture/data-model.md#tracks) | [TC-08](../testing/acceptance.md#tc-08), [TC-10](../testing/acceptance.md#tc-10), [TC-17](../testing/acceptance.md#tc-17) | DEC-004/009/010/015 |
| [UC06](use-cases.md#uc06) | [BR-006](business-rules.md#br-006) | [API-07](../api/tracks.md#api-07); chỉ metadata/media backend | [tracks](../architecture/data-model.md#tracks) | [TC-08](../testing/acceptance.md#tc-08); không bao phủ thao tác ngoài backend | DEC-009/011/017/021 |
| [UC07](use-cases.md#uc07) | [BR-004](business-rules.md#br-004), [BR-007](business-rules.md#br-007), [BR-008](business-rules.md#br-008) | [API-15](../api/playlists.md#api-15), [API-16](../api/playlists.md#api-16), [API-17](../api/playlists.md#api-17), [API-18](../api/playlists.md#api-18), [API-19](../api/playlists.md#api-19), [API-20](../api/playlists.md#api-20), [API-21](../api/playlists.md#api-21), [API-38](../api/playlists.md#api-38) | [playlists](../architecture/data-model.md#playlists), [playlist_tracks](../architecture/data-model.md#playlist-tracks), [tracks](../architecture/data-model.md#tracks) | [TC-12](../testing/acceptance.md#tc-12), [TC-13](../testing/acceptance.md#tc-13), [TC-14](../testing/acceptance.md#tc-14), [TC-16](../testing/acceptance.md#tc-16) | DEC-005/017/018/019/022 |
| [UC08](use-cases.md#uc08) | [BR-001](business-rules.md#br-001), [BR-005](business-rules.md#br-005), [BR-006](business-rules.md#br-006) | [API-09](../api/tracks.md#api-09) | [tracks](../architecture/data-model.md#tracks), [genres](../architecture/data-model.md#genres), [users](../architecture/data-model.md#users) | [TC-09](../testing/acceptance.md#tc-09) | DEC-004/008/009/011/017/018/021/022 |
| [UC09](use-cases.md#uc09) | [BR-004](business-rules.md#br-004), [BR-007](business-rules.md#br-007) | [API-10](../api/tracks.md#api-10), [API-11](../api/tracks.md#api-11), [API-12](../api/tracks.md#api-12) | [tracks](../architecture/data-model.md#tracks), [genres](../architecture/data-model.md#genres) | [TC-11](../testing/acceptance.md#tc-11), [TC-16](../testing/acceptance.md#tc-16), [TC-17](../testing/acceptance.md#tc-17) | DEC-004/009/011/017/018/021 |
| [UC10](use-cases.md#uc10) | [BR-001](business-rules.md#br-001), [BR-003](business-rules.md#br-003), [BR-004](business-rules.md#br-004) | [API-22](../api/admin.md#api-22), [API-23](../api/admin.md#api-23) | [users](../architecture/data-model.md#users) | [TC-05](../testing/acceptance.md#tc-05), [TC-15](../testing/acceptance.md#tc-15) | DEC-006/012/017/018/022 |
| [UC11](use-cases.md#uc11) | [BR-001](business-rules.md#br-001), [BR-004](business-rules.md#br-004) | [API-26](../api/admin.md#api-26), [API-27](../api/admin.md#api-27) | [tracks](../architecture/data-model.md#tracks), [users](../architecture/data-model.md#users) | [TC-16](../testing/acceptance.md#tc-16), [TC-17](../testing/acceptance.md#tc-17) | DEC-005/009/012/017/018/022 |
| [UC12](use-cases.md#uc12) | [BR-001](business-rules.md#br-001), [BR-002](business-rules.md#br-002) | [API-24](../api/admin.md#api-24), [API-25](../api/admin.md#api-25), [API-35](../api/creator-applications.md#api-35), [API-36](../api/creator-applications.md#api-36), [API-37](../api/creator-applications.md#api-37) | [users](../architecture/data-model.md#users); [creator_applications đích](../architecture/data-model.md#target-model), chưa có DDL | [TC-18](../testing/acceptance.md#tc-18) | DEC-002/005/006/007/017/018/022 |

Các mã ở cột cuối tra cứu tại [sổ quyết định](../decisions/open-decisions.md); từng hợp đồng API có liên kết DEC tường minh. DEC-013/DEC-014 ảnh hưởng thiết lập và triển khai chung; DEC-001/DEC-016 ảnh hưởng toàn bộ phạm vi/kế hoạch.

## Chất lượng xuyên suốt

| Yêu cầu | Kịch bản | Phụ thuộc |
| --- | --- | --- |
| [NFR-001](quality.md#nfr-001) Hiệu năng | [TC-20](../testing/acceptance.md#tc-20) | DEC-012/014/015/017 |
| [NFR-002](quality.md#nfr-002) Xác thực và quyền | [TC-01](../testing/acceptance.md#tc-01)–[TC-05](../testing/acceptance.md#tc-05), TC-11/14/15/18 | DEC-003/006/017/018 |
| [NFR-003](quality.md#nfr-003) Toàn vẹn/phục hồi | [TC-09](../testing/acceptance.md#tc-09), TC-13/16/19/21 | DEC-009/013/014/019/022 |
| [NFR-004](quality.md#nfr-004) Media | [TC-08](../testing/acceptance.md#tc-08), TC-09/17/20 | DEC-008/009/011/015/020 |
| [NFR-005](quality.md#nfr-005) Tái hiện môi trường | [TC-19](../testing/acceptance.md#tc-19), [TC-21](../testing/acceptance.md#tc-21) | DEC-008/013/014/020 |

## Bao phủ lựa chọn mới và phần còn thiếu

Hiện có 39 API-ID, mọi API có liên kết ở ma trận trên. Các route mới đã chốt method/path, wire chi tiết còn [API gaps](../api/README.md#contract-gaps). Không coi số endpoint là chứng minh đủ hợp đồng hoặc đã triển khai. [Schema đích](../architecture/data-model.md#target-model) khác DDL cũ năm bảng/40 cột/chín index.

| Lựa chọn | UC / BR / NFR | API | Dữ liệu đích chưa triển khai | TC | DEC |
| --- | --- | --- | --- | --- | --- |
| Resend/OTP-HMAC/user chưa xác minh | UC01/02, BR-003, NFR-002/005 | API-01/02/30/31/32/33 | email_verified_at/otp_challenges | TC-01/02/03/04/21 | DEC-003/005/014/017/022 |
| Scrypt/HS256/cookie/CSRF/thu hồi | UC02/10/12, BR-003/007, NFR-002 | API-02/03/04/34/39/23/25 và protected API | users/auth_sessions | TC-03/04/05/14/15/18/19 | DEC-006/014/017/022 |
| Hồ sơ/kênh/role nguồn quyền | UC12, BR-002 | API-24/25/35/36/37 | creator_applications/users, creatorStatus suy ra | TC-18/19 | DEC-002/005/007/017/022 |
| Search_text/100 ký tự-10 từ/AND-literal | UC04, BR-009, NFR-001 | API-05/13/14/22/26 | search_text/index sau đo | TC-07/20 | DEC-012/015/017/022 |
| Lượt nghe tín hiệu client/trượt/login đổi ID | UC03/05, BR-009 | API-08; GET/HEAD không đếm | listen_cooldowns/bộ đếm, bảy ngày | TC-06/10/19 | DEC-010/014/017/022 |
| Reorder hiển thị/ẩn cuối/409/deferred UNIQUE | UC07, BR-004/007/008, NFR-003 | API-15/17/20/21/38 | playlist_tracks/track-user/transaction | TC-12/13/14/16/19 | DEC-019/005/017/022 |
| Plain text theo type/rỗng-null/HTML 400 | UC06/08/09, BR-006 | API-07/09/10 | lyrics/description | TC-08/09/11 | DEC-021/017 |
| Media/Range/no-store/publish-commit/cover-dọn | UC05/08/09/10/11, BR-004/005, NFR-003/004/005 | API-07/09/10/11/23/27/28/29 | tracks/users/file/recovery state còn mở | TC-08/09/11/15/16/17/21 | DEC-008/009/011/014/017/018/022 |
| Công cụ/migration/version/validation | Mọi UC, NFR-002/005 | API-01–39 | pg.Pool/node-pg-migrate/schema đích | TC-01–21 | DEC-014/017/022 |

[ADR-0005](../decisions/adr-0005-simple-backend-contracts.md) bổ sung ADR-0001/0003 và thay reorder toàn bộ liên kết trước đây; [ADR-0004](../decisions/adr-0004-audio-contract-and-file-lifecycle.md) giữ media. DEC-010/012/019/021 ACCEPTED; còn 8 DEC OPEN ở phạm vi được ghi trong sổ. 12 UC/9 BR/5 NFR/21 TC giữ mã, mọi TC NOT_RUN.

Restore/thay audio/lyrics đồng bộ ngoài MVP. [TC-19](../testing/acceptance.md#tc-19) truy xuất [schema chín bảng](../architecture/data-model.md#target-model), [migration khởi tạo](../../backend/migrations/20261120000000000_create-initial-schema.js) và [bằng chứng chạy](../project/status.md#single-database-migration-2026-11-20). Các ràng buộc trong DDL hỗ trợ UC04/05/07/08/12. Seed demo thuộc mốc riêng. [TC-01](../testing/acceptance.md#tc-01)–[TC-05](../testing/acceptance.md#tc-05) truy xuất [vòng đời OTP](../architecture/security-and-media.md#otp-delivery), [giao dịch auth](../architecture/security-and-media.md#auth-transaction-order) và xác nhận [DEC-003/014/022](../decisions/open-decisions.md#evidence-bootstrap-auth-2026-11-18). TC-20/21 còn protocol nghiệm thu.
