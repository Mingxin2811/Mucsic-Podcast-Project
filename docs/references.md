# Nguồn tham khảo tổ chức tài liệu

Các nguồn dưới đây đã được đọc khi lập kế hoạch ngày 11/11/2026. Chúng hướng dẫn cách tổ chức/ngữ cảnh làm việc; không quyết định sản phẩm, công nghệ hoặc quyền thao tác trong repo Soundwave. Nội dung của repo nguồn có thể thay đổi về sau.

| Nguồn trực tiếp | Nội dung được tham khảo | Áp dụng tại Soundwave |
| --- | --- | --- |
| [OpenAI Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) | Hướng dẫn repo được đọc theo phạm vi; tổ chức chỉ dẫn cho agent | AGENTS ở gốc, bản đồ tới docs, không đặt đặc tả toàn bộ dự án vào file hướng dẫn |
| [OpenAI Agents Python SDK AGENTS.md](https://github.com/openai/openai-agents-python/blob/main/AGENTS.md) | Repo thực tế có quy tắc workflow, scope, kiểm chứng và liên kết tài liệu | Phân biệt hướng dẫn agent với tài liệu chuyên đề; không sao chép các skill/gate riêng của SDK |
| [OpenAI dùng skills trong OSS maintenance](https://developers.openai.com/blog/skills-agents-sdk) | Bối cảnh sử dụng Codex/AGENTS trong việc duy trì repo Agents SDK | Chỉ tải ngữ cảnh liên quan tác vụ; dự án chưa cần tự tạo một bộ skills |
| [Repo OpenAI Codex README](https://github.com/openai/codex/blob/main/README.md) | Điểm vào ngắn dẫn tới tài liệu cài đặt và đóng góp | README dự án dẫn tới docs và hiện trạng |
| [OpenAI Using PLANS.md for multi-hour problem solving](https://developers.openai.com/cookbook/articles/codex_exec_plans) | Kế hoạch sống, bối cảnh, tiến độ, phát hiện, quyết định và kết quả kiểm chứng | Mẫu plans giữ các phần này và tôn trọng quyết định OPEN theo yêu cầu dự án |
| [Diátaxis Start here](https://diataxis.fr/start-here/) | Phân biệt tutorial, how-to, reference, explanation | Setup/workflow là hướng dẫn; API/data model là tra cứu; kiến trúc là giải thích. Chưa tạo tutorial chạy app khi chưa có runtime |
| [Microsoft Maintain an architecture decision record](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record) | ADR ghi bối cảnh, lựa chọn, hệ quả và trạng thái, lưu lịch sử thay thế | Sổ DEC cho câu hỏi mở; tạo ADR khi có quyết định kiến trúc được xác nhận |

Cấu trúc của bộ docs là lựa chọn tổ chức đã được người dùng giao triển khai, không phải chuẩn bắt buộc của OpenAI hay một bản sao repo tham khảo. Mọi chỉ dẫn trong ví dụ của nguồn chỉ được áp dụng nếu phù hợp phạm vi được giao.

## Nguồn đã đối chiếu khi tư vấn ngày 17/11/2026

Các nguồn chính thức hỗ trợ việc giải thích, không thay nguồn xác nhận của người dùng trong [sổ DEC](decisions/open-decisions.md#evidence-2026-11-17). Không dùng trang phiên bản động làm bằng chứng dependency đã cài; bản patch thực chạy cần ghi lúc bootstrap.

| Nguồn | Nội dung dùng trong tư vấn |
| --- | --- |
| [Node.js releases](https://nodejs.org/en/about/previous-releases) | Dòng LTS; lựa chọn dự án là Node.js 24 |
| [Express support](https://expressjs.com/en/support/) | Dòng Express 5 được hỗ trợ |
| [PostgreSQL versioning](https://www.postgresql.org/support/versioning/) | PostgreSQL 18, chính sách minor và vòng đời |
| [PostgreSQL 18 unaccent](https://www.postgresql.org/docs/18/unaccent.html) | Khả năng loại dấu; chưa chọn index hoặc chứng minh tiếng Việt đúng mọi trường hợp |
| [OWASP JWT](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_Cheat_Sheet.html) | JWT cần cơ chế bổ sung cho thu hồi trước hạn |
| [OWASP session management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) | Cookie, thời hạn server và kết thúc phiên; CSRF cần đặc tả riêng |
| [OWASP forgot password](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html) | Reset dùng một lần/hết hạn/giới hạn thử và thu hồi phiên |

## Nguồn đối chiếu cho đề xuất media đã được chấp nhận

Đã đọc khi tư vấn trước yêu cầu cập nhật docs này; nguồn là giải thích kỹ thuật, xác nhận sản phẩm vẫn từ [người dùng](decisions/open-decisions.md#evidence-media-2026-11-17).

| Nguồn chính thức | Nội dung dùng |
| --- | --- |
| [RFC 9110 Range](https://www.rfc-editor.org/rfc/rfc9110.html#section-14.2) | Range, 200/206/416 và khả năng bỏ qua Range; chính sách single/multi của dự án ghi tại API-28 |
| [RFC 9111 no-store](https://www.rfc-editor.org/rfc/rfc9111.html#section-5.2.2.5) | Không lưu response để phục vụ request sau; không hứa thu hồi dữ liệu đã tải |
| [FFprobe](https://ffmpeg.org/ffprobe.html) | Phân tích format/codec/duration; chưa kiểm chứng độ chính xác trên fixture dự án |
| [FFmpeg](https://ffmpeg.org/ffmpeg.html) | Giải mã file và phát hiện lỗi; versions/limits/command chưa có runtime |
| [Sharp output](https://sharp.pixelplumbing.com/api-output/) | Mã hóa lại ảnh hợp lệ |
| [OWASP file upload](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html) | Kiểm tra nhiều lớp, không tin chỉ extension/Content-Type client, tên file do server quản lý |

## Nguồn cho phương án đơn giản đã chấp nhận

Đã đối chiếu trong lượt tư vấn trước yêu cầu cập nhật này; nguồn kỹ thuật không thay [xác nhận người dùng](decisions/open-decisions.md#evidence-simple-2026-11-17). Không truy cập lại URL để coi là kiểm chứng dependency/runtime.

| Nguồn chính thức | Nội dung |
| --- | --- |
| [Node.js 24 crypto](https://nodejs.org/docs/latest-v24.x/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback) | scrypt bất đồng bộ, salt/options/maxmem |
| [OWASP password storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) | Cấu hình scrypt N=2^15/r=8/p=3 |
| [Resend SDK chính thức](https://github.com/resend/resend-node) | API key/domain gửi cần xác minh; dự án dùng fetch HTTPS |
| [OWASP forgot password](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html) | OTP một lần/hết hạn/reset và phản hồi không tiết lộ email |
| [OWASP CSRF](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) | Token gắn phiên/header và Origin |
| [jose](https://github.com/panva/jose), [Zod](https://zod.dev/), [Multer](https://github.com/expressjs/multer) | Công cụ JWT/validation/multipart; versions chưa khóa |
| [node-pg-migrate](https://salsita.github.io/node-pg-migrate/) | Migration PostgreSQL có phiên bản |
| [PostgreSQL CREATE TABLE](https://www.postgresql.org/docs/18/sql-createtable.html) | UNIQUE có thể hoãn kiểm tra đến commit |
| [PostgreSQL pg_trgm](https://www.postgresql.org/docs/18/pgtrgm.html) | Index LIKE/ILIKE chỉ xem xét nếu lần đo cần |
