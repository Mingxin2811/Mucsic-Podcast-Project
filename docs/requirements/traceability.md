# Ma trận truy xuất yêu cầu

Trạng thái: `DRAFT`. Mỗi dòng nối nghiệp vụ với tài liệu sở hữu hợp đồng, dữ liệu và phép kiểm chứng. Liên kết thiết kế không chứng minh đã triển khai; kết quả thực tế ở [status](../project/status.md).

| UC | Quy tắc | API đang mô tả | Dữ liệu | Kịch bản | Quyết định ảnh hưởng chính |
| --- | --- | --- | --- | --- | --- |
| [UC01](use-cases.md#uc01) | [BR-002](business-rules.md#br-002), [BR-003](business-rules.md#br-003) | [API-01](../api/auth.md#api-01) | [users](../architecture/data-model.md#users) | [TC-01](../testing/acceptance.md#tc-01), [TC-02](../testing/acceptance.md#tc-02) | DEC-002/003/007/017/022 |
| [UC02](use-cases.md#uc02) | [BR-003](business-rules.md#br-003) | [API-02](../api/auth.md#api-02), [API-03](../api/auth.md#api-03), [API-04](../api/auth.md#api-04) | [users](../architecture/data-model.md#users) | [TC-03](../testing/acceptance.md#tc-03), [TC-04](../testing/acceptance.md#tc-04), [TC-05](../testing/acceptance.md#tc-05) | DEC-003/005/006/017/020 |
| [UC03](use-cases.md#uc03) | [BR-004](business-rules.md#br-004), [BR-009](business-rules.md#br-009) | [API-05](../api/tracks.md#api-05), [API-06](../api/tracks.md#api-06) | [tracks](../architecture/data-model.md#tracks) | [TC-06](../testing/acceptance.md#tc-06), [TC-20](../testing/acceptance.md#tc-20) | DEC-004/010/017/018 |
| [UC04](use-cases.md#uc04) | [BR-004](business-rules.md#br-004), [BR-009](business-rules.md#br-009) | [API-05](../api/tracks.md#api-05), [API-13](../api/genres.md#api-13), [API-14](../api/genres.md#api-14) | [tracks](../architecture/data-model.md#tracks), [genres](../architecture/data-model.md#genres), [users](../architecture/data-model.md#users) | [TC-07](../testing/acceptance.md#tc-07), [TC-20](../testing/acceptance.md#tc-20) | DEC-001/012/017/018 |
| [UC05](use-cases.md#uc05) | [BR-004](business-rules.md#br-004), [BR-009](business-rules.md#br-009) | [API-07](../api/tracks.md#api-07), [API-08](../api/tracks.md#api-08); media chưa có hợp đồng | [tracks](../architecture/data-model.md#tracks) | [TC-08](../testing/acceptance.md#tc-08), [TC-10](../testing/acceptance.md#tc-10), [TC-17](../testing/acceptance.md#tc-17) | DEC-004/009/010/015 |
| [UC06](use-cases.md#uc06) | [BR-006](business-rules.md#br-006) | [API-07](../api/tracks.md#api-07); chỉ metadata/media backend | [tracks](../architecture/data-model.md#tracks) | [TC-08](../testing/acceptance.md#tc-08); không bao phủ thao tác ngoài backend | DEC-009/011/017/021 |
| [UC07](use-cases.md#uc07) | [BR-004](business-rules.md#br-004), [BR-007](business-rules.md#br-007), [BR-008](business-rules.md#br-008) | [API-15](../api/playlists.md#api-15), [API-16](../api/playlists.md#api-16), [API-17](../api/playlists.md#api-17), [API-18](../api/playlists.md#api-18), [API-19](../api/playlists.md#api-19), [API-20](../api/playlists.md#api-20), [API-21](../api/playlists.md#api-21) | [playlists](../architecture/data-model.md#playlists), [playlist_tracks](../architecture/data-model.md#playlist-tracks), [tracks](../architecture/data-model.md#tracks) | [TC-12](../testing/acceptance.md#tc-12), [TC-13](../testing/acceptance.md#tc-13), [TC-14](../testing/acceptance.md#tc-14), [TC-16](../testing/acceptance.md#tc-16) | DEC-005/017/018/019/022 |
| [UC08](use-cases.md#uc08) | [BR-001](business-rules.md#br-001), [BR-005](business-rules.md#br-005), [BR-006](business-rules.md#br-006) | [API-09](../api/tracks.md#api-09) | [tracks](../architecture/data-model.md#tracks), [genres](../architecture/data-model.md#genres), [users](../architecture/data-model.md#users) | [TC-09](../testing/acceptance.md#tc-09) | DEC-004/008/009/011/017/018/021/022 |
| [UC09](use-cases.md#uc09) | [BR-004](business-rules.md#br-004), [BR-007](business-rules.md#br-007) | [API-10](../api/tracks.md#api-10), [API-11](../api/tracks.md#api-11), [API-12](../api/tracks.md#api-12) | [tracks](../architecture/data-model.md#tracks), [genres](../architecture/data-model.md#genres) | [TC-11](../testing/acceptance.md#tc-11), [TC-16](../testing/acceptance.md#tc-16), [TC-17](../testing/acceptance.md#tc-17) | DEC-004/009/011/017/018/021 |
| [UC10](use-cases.md#uc10) | [BR-001](business-rules.md#br-001), [BR-003](business-rules.md#br-003), [BR-004](business-rules.md#br-004) | [API-22](../api/admin.md#api-22), [API-23](../api/admin.md#api-23) | [users](../architecture/data-model.md#users) | [TC-05](../testing/acceptance.md#tc-05), [TC-15](../testing/acceptance.md#tc-15) | DEC-006/012/017/018/022 |
| [UC11](use-cases.md#uc11) | [BR-001](business-rules.md#br-001), [BR-004](business-rules.md#br-004) | [API-26](../api/admin.md#api-26), [API-27](../api/admin.md#api-27) | [tracks](../architecture/data-model.md#tracks), [users](../architecture/data-model.md#users) | [TC-16](../testing/acceptance.md#tc-16), [TC-17](../testing/acceptance.md#tc-17) | DEC-005/009/012/017/018/022 |
| [UC12](use-cases.md#uc12) | [BR-001](business-rules.md#br-001), [BR-002](business-rules.md#br-002) | [API-24](../api/admin.md#api-24), [API-25](../api/admin.md#api-25); nộp/gửi lại hồ sơ chưa đủ hợp đồng | [users](../architecture/data-model.md#users); phần dữ liệu thiếu chưa mô hình hóa | [TC-18](../testing/acceptance.md#tc-18) | DEC-002/005/006/007/017/018/022 |

Các mã ở cột cuối tra cứu tại [sổ quyết định](../decisions/open-decisions.md); từng hợp đồng API có liên kết DEC tường minh. DEC-013/DEC-014 ảnh hưởng thiết lập và triển khai chung; DEC-001/DEC-016 ảnh hưởng toàn bộ phạm vi/kế hoạch.

## Chất lượng xuyên suốt

| Yêu cầu | Kịch bản | Phụ thuộc |
| --- | --- | --- |
| [NFR-001](quality.md#nfr-001) Hiệu năng | [TC-20](../testing/acceptance.md#tc-20) | DEC-012/014/015/017 |
| [NFR-002](quality.md#nfr-002) Xác thực và quyền | [TC-01](../testing/acceptance.md#tc-01)–[TC-05](../testing/acceptance.md#tc-05), TC-11/14/15/18 | DEC-003/006/017/018 |
| [NFR-003](quality.md#nfr-003) Toàn vẹn/phục hồi | [TC-09](../testing/acceptance.md#tc-09), TC-13/16/19/21 | DEC-009/013/014/019/022 |
| [NFR-004](quality.md#nfr-004) Media | [TC-08](../testing/acceptance.md#tc-08), TC-09/17/20 | DEC-008/009/011/015/020 |
| [NFR-005](quality.md#nfr-005) Tái hiện môi trường | [TC-19](../testing/acceptance.md#tc-19), [TC-21](../testing/acceptance.md#tc-21) | DEC-008/013/014/020 |

## Khoảng trống bao phủ

Danh mục 27 API không bao gồm đầy đủ OTP/reset, nộp/gửi lại hồ sơ, reorder, restore và giao thức media. Các khoảng trống được giữ ở DEC-003/DEC-005/DEC-009, không lấp bằng route hoặc test giả định. TC-19 kiểm chứng cấu trúc hiện có, không phê duyệt schema đích. Kịch bản backend của UC06 không thay thế nghiệm thu hành vi nằm ngoài phạm vi bộ docs.
