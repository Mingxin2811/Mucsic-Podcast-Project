-- =============================================================================
-- DỰ ÁN: XÂY DỰNG WEBSITE NGHE NHẠC VÀ PODCAST TRỰC TUYẾN
-- HỌC PHẦN: QUẢN LÝ DỰ ÁN PHẦN MỀM (QLDAPM) - PTIT
-- TẬP TIN: seed_data.sql (Mã nguồn nạp dữ liệu mẫu - Demo & Testing)
-- GHI CHÚ MẬT KHẨU: Tất cả tài khoản mẫu bên dưới đều có mật khẩu là: 123456
-- (Đã được mã hóa Bcrypt cost factor 10: $2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6x8ekEYvnGulp3.CE/Bm)
-- =============================================================================

-- Làm sạch dữ liệu cũ và reset sequence tự tăng
TRUNCATE TABLE playlist_tracks, playlists, tracks, genres, users RESTART IDENTITY CASCADE;

-- =============================================================================
-- 1. NẠP DỮ LIỆU BẢNG USERS (Người dùng, Creator & Admin)
-- =============================================================================
INSERT INTO users (id, username, email, password_hash, role, creator_status, channel_name, bio, avatar_url, created_at, deleted_at) VALUES
-- Admin hệ thống
(1, 'Admin Quản Trị', 'admin@musicpodcast.local', '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6x8ekEYvnGulp3.CE/Bm', 'admin', 'approved', 'Ban Quản Trị Hệ Thống', 'Tài khoản điều hành và quản trị kỹ thuật nền tảng.', '/uploads/images/admin-avatar.png', CURRENT_TIMESTAMP - INTERVAL '30 days', NULL),

-- Creator 1 (Đã duyệt - Nhạc)
(2, 'Sơn Tùng M-TP', 'sontung@mtp.vn', '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6x8ekEYvnGulp3.CE/Bm', 'creator', 'approved', 'M-TP Official', 'Kênh phát hành âm nhạc chính thức độc quyền của nghệ sĩ Sơn Tùng M-TP.', '/uploads/images/sontung-avatar.png', CURRENT_TIMESTAMP - INTERVAL '25 days', NULL),

-- Creator 2 (Đã duyệt - Podcast Host)
(3, 'Vietcetera Media', 'contact@vietcetera.vn', '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6x8ekEYvnGulp3.CE/Bm', 'creator', 'approved', 'Vietcetera Podcast Hub', 'Kênh nội dung âm thanh chia sẻ kiến thức công nghệ, sự nghiệp và đời sống.', '/uploads/images/vietcetera-avatar.png', CURRENT_TIMESTAMP - INTERVAL '20 days', NULL),

-- Creator 3 (Đang chờ duyệt - Dùng để test chức năng UC12 Phê duyệt Creator)
(4, 'Vũ. (Hoàng Thái Vũ)', 'vu.hoang@indie.vn', '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6x8ekEYvnGulp3.CE/Bm', 'listener', 'pending', 'Hoàng Tử Indie', 'Nghệ sĩ độc lập mang đến những bản tình ca mộc mạc và sâu lắng.', '/uploads/images/vu-avatar.png', CURRENT_TIMESTAMP - INTERVAL '2 days', NULL),

-- Creator 4 (Bị Admin từ chối duyệt - Dùng để test trạng thái rejected)
(5, 'Spam Content Channel', 'spam@junkmail.com', '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6x8ekEYvnGulp3.CE/Bm', 'listener', 'rejected', 'Kênh Nội Dung Xấu', 'Tài khoản đăng ký không hợp lệ, vi phạm chính sách cộng đồng.', '/uploads/images/default-avatar.png', CURRENT_TIMESTAMP - INTERVAL '5 days', NULL),

-- Người nghe thông thường 1 (Thành viên nhóm dự án)
(6, 'Nguyễn Minh Tâm', 'tam.nguyen@ptit.edu.vn', '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6x8ekEYvnGulp3.CE/Bm', 'listener', 'none', NULL, NULL, '/uploads/images/user-tam.png', CURRENT_TIMESTAMP - INTERVAL '15 days', NULL),

-- Người nghe thông thường 2 (Thành viên nhóm dự án)
(7, 'Nguyễn Văn Quyến', 'quyen.nguyen@ptit.edu.vn', '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6x8ekEYvnGulp3.CE/Bm', 'listener', 'none', NULL, NULL, '/uploads/images/default-avatar.png', CURRENT_TIMESTAMP - INTERVAL '10 days', NULL),

-- Tài khoản bị khóa mềm (Dùng để test tính năng khóa tài khoản UC10 của Admin)
(8, 'Tài Khoản Vi Phạm', 'banned@violation.com', '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6x8ekEYvnGulp3.CE/Bm', 'listener', 'none', NULL, NULL, '/uploads/images/default-avatar.png', CURRENT_TIMESTAMP - INTERVAL '12 days', CURRENT_TIMESTAMP - INTERVAL '1 day');

-- Đồng bộ sequence bảng users
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));

-- =============================================================================
-- 2. NẠP DỮ LIỆU BẢNG GENRES (Danh mục Thể loại Nhạc & Podcast)
-- =============================================================================
INSERT INTO genres (id, name, slug, description) VALUES
(1, 'V-Pop', 'v-pop', 'Nhạc Pop thịnh hành Việt Nam với giai điệu trẻ trung, hiện đại và sôi động.'),
(2, 'Pop Ballad', 'pop-ballad', 'Những bản tình ca nhẹ nhàng, da diết và giàu chất tự sự.'),
(3, 'Indie / Acoustic', 'indie-acoustic', 'Âm nhạc mộc mạc, tự do và giàu cảm xúc của các nghệ sĩ độc lập.'),
(4, 'Rap / Hip-Hop', 'rap-hip-hop', 'Tiết tấu nhịp nhàng, ca từ giàu chất thơ và đậm cá tính nghệ thuật.'),
(5, 'Talkshow & Tâm Sự', 'talkshow-tam-su', 'Các cuộc đối thoại chân thành, góc nhìn sâu sắc về cuộc sống và tình cảm.'),
(6, 'Công Nghệ & Khởi Nghiệp', 'cong-nghe-khoi-nghiep', 'Bản tin xu hướng số hóa, tư duy quản trị dự án, AI và kinh nghiệm startup.'),
(7, 'Kể Chuyện Đêm Khuya', 'ke-chuyen-dem-khuya', 'Giọng đọc truyền cảm, âm thanh nhẹ nhàng giúp thư giãn và cải thiện giấc ngủ.');

-- Đồng bộ sequence bảng genres
SELECT setval('genres_id_seq', (SELECT MAX(id) FROM genres));

-- =============================================================================
-- 3. NẠP DỮ LIỆU BẢNG TRACKS (Bài hát & Podcast)
-- =============================================================================
INSERT INTO tracks (id, title, artist_name, audio_file_path, cover_image_path, duration, track_type, play_count, genre_id, creator_id, created_at, deleted_at, lyrics, description) VALUES
-- Bài hát 1 (Top Trending #1)
(1, 'Nơi Này Có Anh', 'Sơn Tùng M-TP', '/uploads/audio/noi-nay-co-anh.mp3', '/uploads/images/noi-nay-co-anh.jpg', 260, 'music', 42100, 2, 2, CURRENT_TIMESTAMP - INTERVAL '20 days', NULL, 
'Em là ai từ đâu bước đến nơi đây dịu dàng e ấp...\nCầm tay anh, tựa vai anh, nguyện mãi bên anh...\nNơi nào có em là nơi ấy bình yên!', 
'Sáng tác và thể hiện bởi Sơn Tùng M-TP. Bản tình ca Pop ngọt ngào dành tặng người hâm mộ.'),

-- Bài hát 2 (Top Trending #2)
(2, 'Lạc Trôi', 'Sơn Tùng M-TP', '/uploads/audio/lac-troi.mp3', '/uploads/images/lac-troi.jpg', 232, 'music', 34500, 1, 2, CURRENT_TIMESTAMP - INTERVAL '18 days', NULL, 
'Người theo hương hoa mây mù giăng lối...\nLàn sương khói phôi pha đưa bước ai xa rồi...\nĐơn côi mình ta đứng nhìn theo bóng nàng!', 
'Ca khúc kết hợp phong cách Future Bass hiện đại và âm hưởng nhạc cụ dân tộc cổ phong.'),

-- Bài hát 3 (Top Trending #3)
(3, 'Cơn Mưa Ngang Qua', 'Sơn Tùng M-TP', '/uploads/audio/con-mua-ngang-qua.mp3', '/uploads/images/con-mua-ngang-qua.jpg', 234, 'music', 28900, 1, 2, CURRENT_TIMESTAMP - INTERVAL '15 days', NULL, 
'Cơn mưa ngang qua mang em đi xa...\nCơn mưa ngang qua khiến con tim anh xót xa...\nNụ cười ngày xưa nay đã phai tàn!', 
'Ca khúc đột phá khẳng định tên tuổi của Sơn Tùng M-TP trên thị trường âm nhạc trực tuyến.'),

-- Bài hát 4
(4, 'Chúng Ta Của Hiện Tại', 'Sơn Tùng M-TP', '/uploads/audio/chung-ta-cua-hien-tai.mp3', '/uploads/images/chung-ta-cua-hien-tai.jpg', 301, 'music', 15420, 2, 2, CURRENT_TIMESTAMP - INTERVAL '10 days', NULL, 
'Chúng ta là áng mây lướt qua bầu trời...\nƯớc nguyện gửi gió mang đến muôn ngàn trùng khơi...\nNắm chặt tay nhau giữa ngàn bão giông!', 
'Giai điệu hoài niệm phong cách thập niên 90 mang đậm tính điện ảnh và trữ tình.'),

-- Bài hát 5 (Indie)
(5, 'Bước Qua Nhau', 'Vũ.', '/uploads/audio/buoc-qua-nhau.mp3', '/uploads/images/buoc-qua-nhau.jpg', 257, 'music', 21300, 3, 2, CURRENT_TIMESTAMP - INTERVAL '8 days', NULL, 
'Cuộc đời cứ trôi theo dòng người vội vã...\nTa vô tình bước qua nhau như chưa từng quen...\nĐể lại phía sau một trời ký ức!', 
'Bản Ballad Acoustic đầy day dứt viết về những cuộc gặp gỡ và chia ly trong tuổi thanh xuân.'),

-- Bài hát 6 (Indie)
(6, 'Lạ Lùng', 'Vũ.', '/uploads/audio/la-lung.mp3', '/uploads/images/la-lung.jpg', 258, 'music', 18700, 3, 2, CURRENT_TIMESTAMP - INTERVAL '6 days', NULL, 
'Kìa màn đêm hiu hắt mang theo bóng em về đâu...\nLời thì thầm ấm áp như làn gió mùa thu...\nLạ lùng thay nỗi nhớ chẳng khi nào nguôi ngoai!', 
'Giai điệu mộc mạc guitar gỗ kết hợp giọng hát trầm ấm đặc trưng của Vũ.'),

-- Bài hát 7 (Rap)
(7, 'Ghé Qua', 'Dick, PC, Tofu', '/uploads/audio/ghe-qua.mp3', '/uploads/images/ghe-qua.jpg', 245, 'music', 12800, 4, 2, CURRENT_TIMESTAMP - INTERVAL '4 days', NULL, 
'Ghé qua quán quen gọi một ly cà phê không đường...\nNhìn dòng người tấp nập ngược xuôi giữa phố xá thị thành...', 
'Bản Rap Lo-fi nhẹ nhàng, bình dị về cuộc sống người trẻ giữa nhịp sống đô thị.'),

-- Bài hát bị Admin xóa mềm (Dùng để test kiểm duyệt nội dung UC11)
(8, 'Bản Thu Vi Phạm Bản Quyền', 'Nghệ Sĩ Nặc Danh', '/uploads/audio/violation-song.mp3', '/uploads/images/default-cover.png', 180, 'music', 300, 1, 2, CURRENT_TIMESTAMP - INTERVAL '12 days', CURRENT_TIMESTAMP - INTERVAL '2 days', 
'Lời bài hát sao chép trái phép...', 
'Nội dung đã bị Quản trị viên xóa mềm do nhận được báo cáo vi phạm bản quyền.'),

-- Tập Podcast 1 (Top Trending Podcast)
(9, 'HAVE A SIP #105: Học cách quản trị dự án phần mềm và cân bằng cuộc sống', 'Vietcetera Host', '/uploads/audio/have-a-sip-105.mp3', '/uploads/images/have-a-sip.jpg', 2850, 'podcast', 9800, 5, 3, CURRENT_TIMESTAMP - INTERVAL '14 days', NULL, 
NULL, 
'Show notes:\n[00:00] Giới thiệu khách mời - Chuyên gia Quản lý dự án\n[05:20] Phương pháp Agile/Scrum ứng dụng trong thực tế\n[15:45] Kiểm soát đường găng (Critical Path) và rủi ro trễ tiến độ\n[32:10] Bài học cân bằng giữa công việc và sức khỏe tinh thần.'),

-- Tập Podcast 2
(10, 'TÂM SỰ KINH DOANH #88: Khởi nghiệp từ con số 0 trong kỷ nguyên số hóa', 'Vietcetera Host', '/uploads/audio/tskd-88.mp3', '/uploads/images/tskd.jpg', 2640, 'podcast', 11200, 6, 3, CURRENT_TIMESTAMP - INTERVAL '11 days', NULL, 
NULL, 
'Show notes:\n[00:00] Mở đầu: Khởi nghiệp thời đại AI có còn là cơ hội?\n[08:15] Cách xây dựng MVP (Minimum Viable Product) tinh gọn với chi phí 0 đồng\n[22:30] Tìm kiếm Product-Market Fit và bài học sinh tồn của các Startup trẻ.'),

-- Tập Podcast 3
(11, 'VIETNAMESE TALENT #42: Tương lai của AI và Kỹ sư phần mềm trẻ', 'Vietcetera Host', '/uploads/audio/viet-talent-42.mp3', '/uploads/images/viet-talent.jpg', 3120, 'podcast', 8400, 6, 3, CURRENT_TIMESTAMP - INTERVAL '7 days', NULL, 
NULL, 
'Show notes:\n[00:00] Chào mừng đến với series Tài năng Việt Nam\n[10:30] Liệu AI có thay thế lập trình viên trong 5 năm tới?\n[25:00] Những kỹ năng mềm và tư duy giải quyết vấn đề kỹ sư trẻ cần trang bị.'),

-- Tập Podcast 4
(12, 'ĐÊM THẢNH THƠI #12: Âm thanh của mưa và những mẩu chuyện bình yên', 'Vietcetera Host', '/uploads/audio/dem-thanh-thoi-12.mp3', '/uploads/images/dem-thanh-thoi.jpg', 1980, 'podcast', 7300, 7, 3, CURRENT_TIMESTAMP - INTERVAL '3 days', NULL, 
NULL, 
'Show notes:\n[00:00] Tiếng mưa rơi trên mái hiên và giai điệu dương cầm nhẹ nhàng\n[10:00] Câu chuyện về lòng biết ơn và sự chậm rãi giữa thế giới hối hả\n[25:00] Chúc bạn một giấc ngủ thật ngon lành.');

-- Đồng bộ sequence bảng tracks
SELECT setval('tracks_id_seq', (SELECT MAX(id) FROM tracks));

-- =============================================================================
-- 4. NẠP DỮ LIỆU BẢNG PLAYLISTS (Danh sách phát cá nhân)
-- =============================================================================
INSERT INTO playlists (id, title, description, cover_image_path, user_id, created_at, deleted_at) VALUES
(1, 'Nhạc Chill Học Bài & Lập Trình', 'Giai điệu nhẹ nhàng giúp tăng cường độ tập trung khi code đồ án.', '/uploads/images/playlist-study.jpg', 6, CURRENT_TIMESTAMP - INTERVAL '14 days', NULL),
(2, 'Podcast Khởi Nghiệp Cần Nghe', 'Tuyển tập các tập podcast hay nhất về công nghệ và khởi nghiệp đổi mới.', '/uploads/images/playlist-startup.jpg', 6, CURRENT_TIMESTAMP - INTERVAL '10 days', NULL),
(3, 'Sơn Tùng M-TP Greatest Hits', 'Tổng hợp những bài hát hay nhất của thần tượng M-TP.', '/uploads/images/playlist-sontung.jpg', 7, CURRENT_TIMESTAMP - INTERVAL '8 days', NULL),
(4, 'Playlist Đã Xóa Mẫu', 'Playlist thử nghiệm tính năng xóa mềm của người dùng.', '/uploads/images/default-playlist.png', 6, CURRENT_TIMESTAMP - INTERVAL '5 days', CURRENT_TIMESTAMP - INTERVAL '1 day');

-- Đồng bộ sequence bảng playlists
SELECT setval('playlists_id_seq', (SELECT MAX(id) FROM playlists));

-- =============================================================================
-- 5. NẠP DỮ LIỆU BẢNG PLAYLIST_TRACKS (Chi tiết bài hát trong danh sách phát)
-- =============================================================================
INSERT INTO playlist_tracks (playlist_id, track_id, sort_order, added_at) VALUES
-- Playlist 1: Nhạc Chill Học Bài (Tracks: 6, 5, 4, 1)
(1, 6, 1, CURRENT_TIMESTAMP - INTERVAL '14 days'),
(1, 5, 2, CURRENT_TIMESTAMP - INTERVAL '13 days'),
(1, 4, 3, CURRENT_TIMESTAMP - INTERVAL '12 days'),
(1, 1, 4, CURRENT_TIMESTAMP - INTERVAL '10 days'),

-- Playlist 2: Podcast Khởi Nghiệp (Tracks: 9, 10, 11)
(2, 9, 1, CURRENT_TIMESTAMP - INTERVAL '10 days'),
(2, 10, 2, CURRENT_TIMESTAMP - INTERVAL '9 days'),
(2, 11, 3, CURRENT_TIMESTAMP - INTERVAL '8 days'),

-- Playlist 3: Sơn Tùng M-TP Greatest Hits (Tracks: 1, 2, 3, 4)
(3, 1, 1, CURRENT_TIMESTAMP - INTERVAL '8 days'),
(3, 2, 2, CURRENT_TIMESTAMP - INTERVAL '7 days'),
(3, 3, 3, CURRENT_TIMESTAMP - INTERVAL '6 days'),
(3, 4, 4, CURRENT_TIMESTAMP - INTERVAL '5 days');

