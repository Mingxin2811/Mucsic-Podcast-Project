// mockData.js - Dữ liệu mẫu chuẩn hóa theo PostgreSQL schema & seed_data.sql

export const INITIAL_GENRES = [
  { id: 1, name: 'V-Pop', slug: 'v-pop', description: 'Những giai điệu nhạc Pop Việt Nam thịnh hành và được yêu thích nhất', count: 18, cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80' },
  { id: 2, name: 'Pop Ballad', slug: 'pop-ballad', description: 'Giai điệu nhẹ nhàng, sâu lắng chạm đến từng cung bậc cảm xúc', count: 14, cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80' },
  { id: 3, name: 'Indie / Acoustic', slug: 'indie-acoustic', description: 'Góc mộc mạc, tự do và chân thật từ các nghệ sĩ độc lập', count: 12, cover: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&q=80' },
  { id: 4, name: 'Rap / Hip-Hop', slug: 'rap-hip-hop', description: 'Nhịp điệu sôi động, ca từ sắc bén và năng lượng bùng nổ', count: 15, cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&q=80' },
  { id: 5, name: 'Talkshow Tâm Sự', slug: 'talkshow-tam-su', description: 'Những cuộc trò chuyện sâu sắc về cuộc sống, tình yêu và con người', count: 20, cover: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=500&q=80' },
  { id: 6, name: 'Khởi Nghiệp & Kinh Doanh', slug: 'khoi-nghiep-kinh-doanh', description: 'Kinh nghiệm kinh doanh, tư duy lãnh đạo và câu chuyện thương trường', count: 16, cover: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80' },
  { id: 7, name: 'US-UK Hits', slug: 'us-uk-hits', description: 'Những ca khúc quốc tế đứng đầu bảng xếp hạng toàn cầu', count: 22, cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80' },
];

export const INITIAL_TRACKS = [
  {
    id: 1,
    title: 'Chúng Ta Của Hiện Tại',
    artist_name: 'Sơn Tùng M-TP',
    track_type: 'music',
    genre_id: 2,
    genre_name: 'Pop Ballad',
    genre_slug: 'pop-ballad',
    duration: 301,
    play_count: 142500,
    cover_image_path: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80',
    audio_file_path: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    creator_id: 2,
    creator_name: 'Sơn Tùng M-TP',
    created_at: '2026-10-15T08:30:00Z',
    deleted_at: null,
    lyrics: `Mùa thu mang giấc mơ quay về, vẫn nguyên vẹn như hôm nào
Ánh mắt ấy trao nụ cười, ấm áp cả bầu trời sao
Chúng ta là áng mây bên trời vội vàng bay
Để lại những nỗi nhớ đong đầy nơi đây...

Liệu mai sau này còn có nhau bên đời?
Dù phong ba giông tố xin đừng cách rời
Hẹn nhau nơi góc phố xưa ta từng đi qua
Thời gian xóa nhòa, nhưng tình ta mãi ngân nga.`,
    description: null,
  },
  {
    id: 2,
    title: 'Nơi Này Có Anh',
    artist_name: 'Sơn Tùng M-TP',
    track_type: 'music',
    genre_id: 1,
    genre_name: 'V-Pop',
    genre_slug: 'v-pop',
    duration: 260,
    play_count: 238000,
    cover_image_path: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80',
    audio_file_path: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    creator_id: 2,
    creator_name: 'Sơn Tùng M-TP',
    created_at: '2026-10-18T10:00:00Z',
    deleted_at: null,
    lyrics: `Em là ai từ đâu bước đến nơi đây dịu dàng e ấp
Chút ánh sáng hé mở trong màn đêm tăm tối
Cầm tay anh đi qua ngày giông bão
Nơi đây có anh luôn chờ em...`,
    description: null,
  },
  {
    id: 3,
    title: 'Have A Sip #105 - Tìm lại sự cân bằng trong thế giới ồn ào',
    artist_name: 'Vietcetera Media',
    track_type: 'podcast',
    genre_id: 5,
    genre_name: 'Talkshow Tâm Sự',
    genre_slug: 'talkshow-tam-su',
    duration: 2640,
    play_count: 48900,
    cover_image_path: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=80',
    audio_file_path: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    creator_id: 3,
    creator_name: 'Vietcetera Media',
    created_at: '2026-10-22T14:15:00Z',
    deleted_at: null,
    lyrics: null,
    description: `🎙️ Host: Thùy Minh | Khách mời: TS. Đặng Hoàng Giang
📌 Show notes & Timestamps:
[00:00] Giới thiệu khách mời và đồ uống yêu thích
[05:30] Căn bệnh "luôn phải bận rộn" của người trẻ hiện đại
[18:45] Phân biệt giữa cô đơn và sự tĩnh lặng nội tâm
[32:10] Bài học về ranh giới cá nhân trong công việc và quan hệ tình cảm
[41:20] Lời khuyên cho những ngày tâm trạng chênh vênh`,
  },
  {
    id: 4,
    title: 'Bước Qua Nhau',
    artist_name: 'Vũ.',
    track_type: 'music',
    genre_id: 3,
    genre_name: 'Indie / Acoustic',
    genre_slug: 'indie-acoustic',
    duration: 257,
    play_count: 185400,
    cover_image_path: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80',
    audio_file_path: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    creator_id: 2,
    creator_name: 'Sơn Tùng M-TP',
    created_at: '2026-10-25T09:00:00Z',
    deleted_at: null,
    lyrics: `Cuộc đời này bao lần ta bước qua nhau
Ánh mắt vô tình trôi vào trong đêm thâu
Giọt sương sớm đọng trên cánh hoa úa tàn
Nhắn nhủ chút tình ngày ấy đã vội tan...`,
    description: null,
  },
  {
    id: 5,
    title: 'Lạ Lùng',
    artist_name: 'Vũ.',
    track_type: 'music',
    genre_id: 3,
    genre_name: 'Indie / Acoustic',
    genre_slug: 'indie-acoustic',
    duration: 262,
    play_count: 212000,
    cover_image_path: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&q=80',
    audio_file_path: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    creator_id: 2,
    creator_name: 'Sơn Tùng M-TP',
    created_at: '2026-10-27T11:20:00Z',
    deleted_at: null,
    lyrics: `Kìa màn đêm hiu hắt mang theo giấc mơ về
Lạ lùng em bước ngang đời anh như cơn gió
Đọng lại trong ánh mắt nụ cười xưa
Gửi trọn vào những câu hát chưa từng trao.`,
    description: null,
  },
  {
    id: 6,
    title: 'Tâm Sự Kinh Doanh #88 - Vượt bão suy thoái với vốn 0 đồng',
    artist_name: 'Vietcetera Media',
    track_type: 'podcast',
    genre_id: 6,
    genre_name: 'Khởi Nghiệp & Kinh Doanh',
    genre_slug: 'khoi-nghiep-kinh-doanh',
    duration: 2450,
    play_count: 53200,
    cover_image_path: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
    audio_file_path: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    creator_id: 3,
    creator_name: 'Vietcetera Media',
    created_at: '2026-10-30T16:00:00Z',
    deleted_at: null,
    lyrics: null,
    description: `🎙️ Chủ đề: Khởi nghiệp tinh gọn trong thời đại số
📌 Nội dung chính:
[02:15] Vì sao 90% startup hết tiền trước khi có sản phẩm thực tế?
[12:30] Tư duy Bootstrap: Tận dụng nguồn lực tự thân
[24:00] Nghệ thuật tìm kiếm 100 khách hàng trung thành đầu tiên
[35:40] Case study thực tế từ một nhà sáng tạo nội dung chuyển mình làm kinh doanh`,
  },
  {
    id: 7,
    title: 'Ghé Qua',
    artist_name: 'Dick, PC, Tofu',
    track_type: 'music',
    genre_id: 4,
    genre_name: 'Rap / Hip-Hop',
    genre_slug: 'rap-hip-hop',
    duration: 245,
    play_count: 98400,
    cover_image_path: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&q=80',
    audio_file_path: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    creator_id: 2,
    creator_name: 'Sơn Tùng M-TP',
    created_at: '2026-11-01T15:30:00Z',
    deleted_at: null,
    lyrics: `Ghé qua quán quen bên đường một chiều mưa bay
Ký ức năm nào thoảng qua như mới hôm qua đây
Rót chén trà nghe những hoài niệm thì thầm
Bước chân phiêu bạt qua tháng ngày thăng trầm...`,
    description: null,
  },
  {
    id: 8,
    title: 'Getting Even',
    artist_name: 'White Lies',
    track_type: 'music',
    genre_id: 7,
    genre_name: 'US-UK Hits',
    genre_slug: 'us-uk-hits',
    duration: 182,
    play_count: 342000,
    cover_image_path: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&q=80',
    audio_file_path: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    creator_id: 1,
    creator_name: 'Admin Quản Trị',
    created_at: '2026-11-02T12:00:00Z',
    deleted_at: null,
    lyrics: `In the darkness before the dawn
Every secret softly drawn
Walking in the neon rain
Never feel the same again...`,
    description: null,
  },
  {
    id: 9,
    title: 'Tokyo',
    artist_name: 'White Lies',
    track_type: 'music',
    genre_id: 7,
    genre_name: 'US-UK Hits',
    genre_slug: 'us-uk-hits',
    duration: 292,
    play_count: 420000,
    cover_image_path: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80',
    audio_file_path: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    creator_id: 1,
    creator_name: 'Admin Quản Trị',
    created_at: '2026-11-03T18:00:00Z',
    deleted_at: null,
    lyrics: `Tokyo neon lights in the sky
Watching the high-speed trains roll by
Lost in translation, finding our way
Until the break of day...`,
    description: null,
  },
  {
    id: 10,
    title: 'Lạc Trôi',
    artist_name: 'Sơn Tùng M-TP',
    track_type: 'music',
    genre_id: 1,
    genre_name: 'V-Pop',
    genre_slug: 'v-pop',
    duration: 232,
    play_count: 310000,
    cover_image_path: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80',
    audio_file_path: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    creator_id: 2,
    creator_name: 'Sơn Tùng M-TP',
    created_at: '2026-11-04T07:10:00Z',
    deleted_at: null,
    lyrics: `Người theo hương hoa mây mù giăng lối
Làn sương khói phôi phai đưa bước ai xa rồi
Đơn côi mình ta ôm giấc mộng tàn...`,
    description: null,
  },
];

export const INITIAL_PLAYLISTS = [
  {
    id: 1,
    title: 'Nhạc Chill Học Bài',
    description: 'Tuyển tập giai điệu nhẹ nhàng giúp tăng tập trung tối đa cho những giờ học khuya',
    user_id: 4,
    track_ids: [1, 4, 5, 8],
    cover_image_path: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80',
    created_at: '2026-10-20T10:00:00Z',
  },
  {
    id: 2,
    title: 'Podcast Khởi Nghiệp & Đời Sống',
    description: 'Nạp thêm năng lượng và cảm hứng tư duy mỗi ngày cùng các chuyên gia hàng đầu',
    user_id: 4,
    track_ids: [3, 6],
    cover_image_path: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=500&q=80',
    created_at: '2026-10-22T12:00:00Z',
  },
  {
    id: 3,
    title: 'Top V-Pop Tuyển Chọn',
    description: 'Những bản hit đình đám nhất của làng nhạc Việt Nam',
    user_id: 4,
    track_ids: [1, 2, 7, 10],
    cover_image_path: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80',
    created_at: '2026-10-25T14:00:00Z',
  },
];

export const INITIAL_USERS = [
  {
    id: 1,
    username: 'Admin Quản Trị',
    email: 'admin@musicpodcast.local',
    role: 'admin',
    creator_status: 'approved',
    channel_name: 'Ban Quản Trị Hệ Thống',
    bio: 'Tài khoản điều hành và quản trị kỹ thuật nền tảng SOUNDWAVE.',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
    created_at: '2026-10-01T00:00:00Z',
    deleted_at: null,
  },
  {
    id: 2,
    username: 'Sơn Tùng M-TP',
    email: 'sontung@mtp.vn',
    role: 'creator',
    creator_status: 'approved',
    channel_name: 'M-TP Official',
    bio: 'Kênh phát hành âm nhạc chính thức độc quyền của nghệ sĩ Sơn Tùng M-TP.',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    created_at: '2026-10-10T00:00:00Z',
    deleted_at: null,
  },
  {
    id: 3,
    username: 'Vietcetera Media',
    email: 'contact@vietcetera.vn',
    role: 'creator',
    creator_status: 'approved',
    channel_name: 'Vietcetera Podcast Hub',
    bio: 'Kênh nội dung âm thanh chia sẻ kiến thức công nghệ, sự nghiệp và đời sống.',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    created_at: '2026-10-12T00:00:00Z',
    deleted_at: null,
  },
  {
    id: 4,
    username: 'Minh Tâm (Listener)',
    email: 'listener@soundwave.vn',
    role: 'listener',
    creator_status: 'none',
    channel_name: null,
    bio: 'Yêu thích âm nhạc indie và podcast tâm sự đêm muộn.',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    created_at: '2026-10-18T00:00:00Z',
    deleted_at: null,
  },
  {
    id: 5,
    username: 'Trần Đạt (Pending Creator)',
    email: 'dat.producer@gmail.com',
    role: 'listener',
    creator_status: 'pending',
    channel_name: 'Đạt Beatmaker Studio',
    bio: 'Sản xuất âm nhạc Lo-Fi và Chillhop cho các bạn sinh viên học tập.',
    avatar_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&q=80',
    created_at: '2026-11-01T00:00:00Z',
    deleted_at: null,
  },
];

export const TOUR_ITEMS = [
  { date: '15 THÁNG 11', city: 'Hà Nội', venue: 'Trung tâm Hội nghị Quốc gia', title: 'Live Concert: V-Pop Symphony', time: '20:00' },
  { date: '22 THÁNG 11', city: 'Đà Nẵng', venue: 'Cung Thể thao Tiên Sơn', title: 'Indie & Acoustic Night Out', time: '19:30' },
  { date: '05 THÁNG 12', city: 'TP. Hồ Chí Minh', venue: 'Sân vận động Phú Thọ', title: 'Soundwave Winter Music Fest', time: '18:00' },
];
