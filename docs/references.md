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
