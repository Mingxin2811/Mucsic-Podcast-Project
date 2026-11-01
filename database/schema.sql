-- =============================================================================
-- DỰ ÁN: XÂY DỰNG WEBSITE NGHE NHẠC VÀ PODCAST TRỰC TUYẾN
-- HỌC PHẦN: QUẢN LÝ DỰ ÁN PHẦN MỀM (QLDAPM) - PTIT
-- TẬP TIN: schema.sql (Mã nguồn khởi tạo cấu trúc CSDL chuẩn 3NF)
-- HỆ QUẢN TRỊ CSDL: PostgreSQL (Localhost:5432)
-- TÊN CSDL KHUYẾN NGHỊ: music_podcast_db
-- =============================================================================

-- Xóa các bảng cũ theo thứ tự phụ thuộc (nếu có)
DROP TABLE IF EXISTS playlist_tracks CASCADE;
DROP TABLE IF EXISTS playlists CASCADE;
DROP TABLE IF EXISTS tracks CASCADE;
DROP TABLE IF EXISTS genres CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- =============================================================================
-- 1. BẢNG USERS (Quản lý Người dùng, Phân quyền & Phê duyệt Creator)
-- =============================================================================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'listener' CHECK (role IN ('listener', 'creator', 'admin')),
    creator_status VARCHAR(20) NOT NULL DEFAULT 'none' CHECK (creator_status IN ('none', 'pending', 'approved', 'rejected')),
    channel_name VARCHAR(100) DEFAULT NULL,
    bio TEXT DEFAULT NULL,
    avatar_url VARCHAR(255) DEFAULT '/uploads/images/default-avatar.png',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);

COMMENT ON TABLE users IS 'Quản lý thông tin tài khoản, phân quyền và trạng thái kiểm duyệt Creator';
COMMENT ON COLUMN users.role IS 'Phân quyền hệ thống: listener, creator, admin';
COMMENT ON COLUMN users.creator_status IS 'Trạng thái đăng ký Creator: none (người nghe), pending (chờ duyệt), approved (đã duyệt), rejected (từ chối)';
COMMENT ON COLUMN users.channel_name IS 'Nghệ danh hoặc tên kênh sáng tạo của Creator';
COMMENT ON COLUMN users.bio IS 'Mô tả giới thiệu ngắn về kênh/nhà sáng tạo';
COMMENT ON COLUMN users.deleted_at IS 'Thời điểm khóa/xóa mềm tài khoản bởi Admin (NULL = tài khoản đang hoạt động)';

-- =============================================================================
-- 2. BẢNG GENRES (Danh mục Thể loại Nhạc & Podcast)
-- =============================================================================
CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255) DEFAULT NULL
);

COMMENT ON TABLE genres IS 'Danh mục thể loại hỗ trợ điều hướng, lọc và phân loại tác phẩm';
COMMENT ON COLUMN genres.name IS 'Tên thể loại hiển thị trên giao diện (V-Pop, Pop, Talkshow,...)';
COMMENT ON COLUMN genres.slug IS 'Đường dẫn URL thân thiện, không dấu (v-pop, talkshow-tam-su,...)';

-- =============================================================================
-- 3. BẢNG TRACKS (Kho dữ liệu Bài hát & Tập Podcast)
-- =============================================================================
CREATE TABLE tracks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    artist_name VARCHAR(100) NOT NULL,
    audio_file_path VARCHAR(255) NOT NULL,
    cover_image_path VARCHAR(255) DEFAULT '/uploads/images/default-cover.png',
    duration INT NOT NULL DEFAULT 0,
    track_type VARCHAR(10) NOT NULL DEFAULT 'music' CHECK (track_type IN ('music', 'podcast')),
    play_count INT NOT NULL DEFAULT 0,
    genre_id INT NOT NULL REFERENCES genres(id) ON DELETE RESTRICT,
    creator_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    lyrics TEXT DEFAULT NULL,
    description TEXT DEFAULT NULL
);

COMMENT ON TABLE tracks IS 'Bảng trung tâm lưu trữ toàn bộ file âm thanh (Bài hát và Tập Podcast)';
COMMENT ON COLUMN tracks.duration IS 'Thời lượng tác phẩm tính bằng giây (Ví dụ: 215 = 3 phút 35 giây)';
COMMENT ON COLUMN tracks.track_type IS 'Phân loại tác phẩm: music (bật player nhạc) hoặc podcast (bật tua 15s, chỉnh tốc độ)';
COMMENT ON COLUMN tracks.play_count IS 'Tổng số lượt phát, dùng để sắp xếp Bảng xếp hạng Trending';
COMMENT ON COLUMN tracks.lyrics IS 'Lời bài hát dành cho định dạng music';
COMMENT ON COLUMN tracks.description IS 'Tóm tắt show notes / timestamps dành cho định dạng podcast';
COMMENT ON COLUMN tracks.deleted_at IS 'Thời điểm xóa mềm bởi Creator hoặc Admin (NULL = tác phẩm hiển thị)';

-- =============================================================================
-- 4. BẢNG PLAYLISTS (Danh sách phát cá nhân của Người nghe)
-- =============================================================================
CREATE TABLE playlists (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT DEFAULT NULL,
    cover_image_path VARCHAR(255) DEFAULT '/uploads/images/default-playlist.png',
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);

COMMENT ON TABLE playlists IS 'Quản lý các danh sách phát cá nhân do người dùng tự tạo';
COMMENT ON COLUMN playlists.deleted_at IS 'Thời điểm xóa mềm playlist (NULL = playlist đang sử dụng)';

-- =============================================================================
-- 5. BẢNG PLAYLIST_TRACKS (Bảng liên kết Nhiều - Nhiều giữa Playlist và Track)
-- =============================================================================
CREATE TABLE playlist_tracks (
    playlist_id INT NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
    track_id INT NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
    sort_order INT NOT NULL DEFAULT 1,
    added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (playlist_id, track_id)
);

COMMENT ON TABLE playlist_tracks IS 'Bảng trung gian lưu vết bài hát/podcast nằm trong playlist nào kèm thứ tự phát';

-- =============================================================================
-- 6. TẠO INDEXES TỐI ƯU HÓA HIỆU NĂNG TRUY VẤN (INDEXES)
-- =============================================================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_creator_status ON users(creator_status);
CREATE INDEX idx_tracks_genre_id ON tracks(genre_id);
CREATE INDEX idx_tracks_creator_id ON tracks(creator_id);
CREATE INDEX idx_tracks_play_count ON tracks(play_count DESC);
CREATE INDEX idx_tracks_type ON tracks(track_type);
CREATE INDEX idx_tracks_deleted_at ON tracks(deleted_at);
CREATE INDEX idx_playlists_user_id ON playlists(user_id);
CREATE INDEX idx_playlist_tracks_track_id ON playlist_tracks(track_id);

