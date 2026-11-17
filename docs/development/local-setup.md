# Thiết lập local theo hiện trạng

Checkout hiện chưa có backend chạy được. Trang này phân biệt cách kiểm kê hiện tại với các bước thiết lập tương lai cần quyết định, không cung cấp lệnh khởi động giả định.

## Kiểm kê an toàn

Trong PowerShell tại gốc repo, các lệnh sau chỉ đọc dữ liệu:

```powershell
git status --short
Get-ChildItem backend -Recurse -Force
Get-Content -Encoding UTF8 database/schema.sql
Get-Content -Encoding UTF8 database/seed_data.sql
```

Kết quả dự kiến ở checkout được kiểm kê: thư mục backend có `.gitkeep`, chưa có manifest/entrypoint; hai SQL chứa định nghĩa bảng và dữ liệu mẫu. Không dùng kết quả khác ở máy mới như lỗi mặc định; cập nhật [status](../project/status.md) nếu mã đã thay đổi.

## Môi trường cần xác nhận

| Thành phần | Mô tả hiện có | Phần phải chốt |
| --- | --- | --- |
| Runtime | Định hướng Node.js/Express; có mô tả Node 18+, npm 9+ | Phiên bản hỗ trợ, ngôn ngữ, package manager, dependency và script: DEC-014 |
| Database | SQL PostgreSQL, tên gợi ý `music_podcast_db`, port mặc định được nêu 5432 | Engine/version thực tế: DEC-013; credentials/migration: DEC-014 |
| Server HTTP | Có mô tả port dự kiến 5000 | Bind address/port/config và lệnh chạy chưa được xác nhận |
| Media | Khung uploads audio/images, đường dẫn seed | Local/cloud, file mẫu, quyền sử dụng: DEC-008/DEC-020 |
| Kiểm thử | Chưa có runner | Công cụ và lệnh chạy: DEC-014 |

Không có `package.json`, lockfile, `.env.example` hoặc script dev/test được xác nhận. Vì vậy không có hướng dẫn `npm install`/`npm run dev` có thể áp dụng ngay. Chỉ bổ sung lệnh sau khi công việc bootstrap được thực hiện và kiểm tra.

## Tác động của SQL hiện có

**Schema:** bắt đầu bằng DROP TABLE cho `playlist_tracks`, `playlists`, `tracks`, `genres`, `users` với CASCADE. Chạy trên database có dữ liệu có thể xóa các bảng và phụ thuộc. Đây là script tạo lại, không phải migration giữ dữ liệu.

**Seed:** bắt đầu bằng TRUNCATE năm bảng với RESTART IDENTITY CASCADE, sau đó INSERT và setval cho sequence. Chạy lại thay thế dữ liệu hiện tại; không phải thao tác bổ sung an toàn vào database đang sử dụng.

Đợt biên soạn docs không chạy hai script. Khi có nhiệm vụ kiểm chứng database được giao, xác nhận engine/version, đúng database thử nghiệm dùng riêng, tác động xóa và kế hoạch khôi phục trước khi chạy. Ghi revision SQL, môi trường, log và kết quả; không kiểm chứng bằng cách chạy trên dữ liệu cần giữ.

## Thứ tự thiết lập tương lai

1. Chốt DEC-013/DEC-014, tạo runtime/config và công cụ được chọn trong tác vụ riêng.
2. Thiết lập database thử nghiệm; kiểm chứng DDL, seed và sequence bằng TC-19.
3. Chốt nơi lưu và hợp đồng media; chuẩn bị file đã xác nhận quyền sử dụng. Seed tham chiếu đường dẫn không tự tạo ra file.
4. Kiểm chứng kết nối và endpoint thật; chỉ sau đó ghi các lệnh chạy cụ thể, biến cấu hình bắt buộc và expected output.
5. Ghi các kiểm tra thất bại hoặc còn thiếu tại status. Backup/restore và khả năng demo độc lập mạng cần kiểm chứng riêng.
