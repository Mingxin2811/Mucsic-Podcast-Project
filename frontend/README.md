# SOUNDWAVE - Frontend Web Application
Nền tảng Nghe nhạc và Podcast Trực tuyến (Music & Podcast Streaming Platform)

Học phần: **Quản lý dự án phần mềm (QLDAPM) - PTIT**  
Công nghệ: **Vite + React.js + Tailwind CSS + Lucide Icons**  
Phong cách thiết kế: **Dark Theme hiện đại với điểm nhấn Neon Green (#2fd17b) theo template chuẩn**

---

## 🎧 Các tính năng và 12 Màn hình Chức năng (SCR01 - SCR12)

| Mã MH | Tên màn hình | Mô tả & Nghiệp vụ |
|-------|--------------|-------------------|
| **SCR01** | **Trang Chủ & Khám Phá (Home & Explore)** | Hero Spotlight nổi bật trong tuần, Tour diễn & sự kiện, Bảng xếp hạng thịnh hành (Trending Top 10) phân tách [Nhạc Hot] & [Podcast Hot], Khám phá thể loại. |
| **SCR02** | **Tìm Kiếm & Lọc Thể Loại (Search & Filter)** | Tìm kiếm tức thì theo bài hát/nghệ sĩ, thanh Pills lọc theo thể loại, bộ lọc định dạng (Bài hát / Podcast), sắp xếp theo lượt nghe hoặc ngày phát hành. |
| **SCR03** | **Chi Tiết Thể Loại (Genre Detail View)** | Clean URL slug (`/genre/:slug`), banner thông tin, phát tất cả, xáo trộn, danh sách tác phẩm thuộc thể loại và chuyển đổi nhanh sang các thể loại khác. |
| **SCR04** | **Chi Tiết Tác Phẩm & Lời Bài Hát (Track Detail)** | Ảnh bìa 1:1, thông tin phát hành, lời bài hát (Lyrics) đồng bộ cho ca khúc hoặc Show Notes & mốc thời gian (Timestamps) bấm nhảy đoạn cho podcast, nút thêm Playlist `[+]`. |
| **SCR05** | **Thư Viện Playlist Cá Nhân (My Playlists)** | Quản lý danh sách phát cá nhân, tạo playlist mới, gỡ bài hát `[x]`, phát tất cả, xóa playlist. |
| **SCR06** | **Đăng Ký Tài Khoản & OTP Console (Register Modal)** | Tiếp nhận thông tin tài khoản, xác thực mã OTP 6 số in ra Terminal Server Console (0 VNĐ & 100% Localhost), tự động điều hướng về SCR07 kèm thông báo Toast. |
| **SCR07** | **Đăng Nhập Hệ Thống (Login Modal)** | Đăng nhập email/mật khẩu, cấp phiên làm việc, hỗ trợ 3 nút 1-Click Demo (Listener, Creator Sơn Tùng, Admin) giúp kiểm thử nhanh phân quyền. |
| **SCR08** | **Tải Lên Tác Phẩm (Creator Upload)** | Dành cho Creator đã duyệt và Admin. Kéo thả file Audio .mp3, ảnh bìa 1:1, chọn thể loại, nhập Lyrics hoặc Podcast Show Notes kèm thanh tiến trình upload. |
| **SCR09** | **Quản Lý Tác Phẩm Của Tôi (Creator Studio)** | Thống kê tổng lượt nghe, quản lý kho bài đã tải, lọc theo trạng thái hiển thị / đã bị gỡ, chỉnh sửa metadata (modal) và xóa mềm (soft delete). |
| **SCR10** | **Bảng Điều Khiển Quản Trị (Admin Portal)** | Tab 1: Phê duyệt đơn đăng ký Creator [UC12]; Tab 2: Quản lý người dùng và khóa/mở khóa tài khoản [UC10]; Tab 3: Kiểm duyệt nội dung vi phạm bản quyền [UC11]. |
| **SCR11** | **Khôi Phục Mật Khẩu Qua OTP Console (Forgot Password)** | Quy trình 3 bước: Nhập email -> Nhận mã OTP in tại Terminal Console -> Đặt mật khẩu mới. |
| **SCR12** | **Hồ Sơ Cá Nhân & Kênh Creator (User Profile)** | Thông tin cá nhân người nghe bên trái, Không gian Creator bên phải: Nộp đơn đăng ký (Listener), theo dõi trạng thái Chờ duyệt (Pending), hoặc chuyển nhanh vào Studio khi đã được duyệt (Approved). |

---

## 🎨 Điểm nhấn thiết kế theo Template (Layout & UI/UX)

1. **Left Sidebar Navigation**:
   - Logo thương hiệu sóng âm SOUNDWAVE với font chữ phong cách Space Grotesk.
   - Nhóm điều hướng Khám phá, Thư viện cá nhân, Không gian Creator và Admin Portal (tự động hiển thị theo phân quyền).
   - Nút thu gọn / mở rộng menu (`Roll up`).
2. **Top Header Bar**:
   - Breadcrumbs theo dõi vị trí màn hình.
   - Thanh tìm kiếm dạng viên thuốc (Pill search) với icon kính lúp.
   - Bộ chọn nhanh vai trò (Role Switcher: Listener / Creator / Admin / Khách) giúp chạy thử nghiệm mọi luồng tương tác ngay lập tức.
3. **Right Curated Showcase Panel**:
   - Album nổi bật ("Big TV - Soundwave Spotlight") kèm mô tả, lượt thích.
   - Danh sách bài hát tuyển chọn tích hợp **hiệu ứng sóng âm động (Soundwave animation)** trực tiếp trên bài hát đang phát.
4. **Persistent Bottom Audio Player**:
   - Luôn cố định chân trang, phát nhạc liên tục không ngắt quãng khi chuyển trang.
   - Thanh trượt tiến trình (Scrubber) phát nhạc màu xanh Neon `#2fd17b`.
   - Nút phát/tạm dừng dạng tròn nổi bật.
   - Tính năng đặc thù cho Podcast: Tua nhanh/lùi 15 giây (`-15s` / `+15s`) và điều chỉnh tốc độ phát (`1.0x`, `1.25x`, `1.5x`).
   - Mở cửa sổ xem lời bài hát (Lyrics modal) và nút thêm nhanh vào playlist `[+]`.

---

## 🚀 Hướng dẫn khởi chạy ứng dụng

```bash
# 1. Di chuyển vào thư mục frontend
cd frontend

# 2. Khởi chạy máy chủ phát triển
npm run dev

# 3. Mở trình duyệt và truy cập
http://localhost:5173
```

Để biên dịch bản sản xuất (Production Build):
```bash
npm run build
```
