/**
 * routes.jsx — Khai báo tập trung tất cả đường dẫn của ứng dụng
 *
 * Cấu trúc URL:
 *   /                    → Trang chủ
 *   /search              → Tìm kiếm
 *   /genre/:slug         → Chi tiết thể loại
 *   /track/:id           → Chi tiết bài hát / podcast
 *   /playlists           → Playlists cá nhân
 *   /creator/upload      → Creator Upload — yêu cầu role creator/admin
 *   /creator/studio      → Creator Studio — yêu cầu role creator/admin
 *   /admin               → Admin Portal — yêu cầu role admin
 *   /profile             → Hồ sơ người dùng — yêu cầu đăng nhập
 *
 * Modal (SCR06, SCR07, SCR11) không có route riêng vì chúng là overlay toàn cục.
 */

export const ROUTES = {
  HOME:           '/',
  SEARCH:         '/search',
  GENRE_DETAIL:   '/genre/:slug',
  TRACK_DETAIL:   '/track/:id',
  PLAYLISTS:      '/playlists',
  CREATOR_UPLOAD: '/creator/upload',
  CREATOR_STUDIO: '/creator/studio',
  ADMIN:          '/admin',
  PROFILE:        '/profile',
};

/**
 * Helper để tạo URL cụ thể (thay thế params bằng giá trị thực)
 * Ví dụ: buildPath(ROUTES.TRACK_DETAIL, { id: 42 }) → "/track/42"
 */
export const buildPath = (route, params = {}) => {
  return Object.entries(params).reduce(
    (path, [key, value]) => path.replace(`:${key}`, value),
    route
  );
};

/**
 * Meta-data của từng route — dùng cho breadcrumb, bảo vệ route, v.v.
 */
export const ROUTE_META = {
  [ROUTES.HOME]: {
    label: 'Khám phá Top 2026',
    requiresAuth: false,
    allowedRoles: null, // null = mọi người đều truy cập được
  },
  [ROUTES.SEARCH]: {
    label: 'Tìm kiếm & Thể loại',
    requiresAuth: false,
    allowedRoles: null,
  },
  [ROUTES.GENRE_DETAIL]: {
    label: 'Chi tiết Thể loại',
    requiresAuth: false,
    allowedRoles: null,
  },
  [ROUTES.TRACK_DETAIL]: {
    label: 'Chi tiết tác phẩm & Lyrics',
    requiresAuth: false,
    allowedRoles: null,
  },
  [ROUTES.PLAYLISTS]: {
    label: 'Playlists cá nhân',
    requiresAuth: true,
    allowedRoles: null, // mọi user đã đăng nhập
  },
  [ROUTES.CREATOR_UPLOAD]: {
    label: 'Creator Studio - Upload',
    requiresAuth: true,
    allowedRoles: ['creator', 'admin'],
  },
  [ROUTES.CREATOR_STUDIO]: {
    label: 'Creator Studio - Tác phẩm của tôi',
    requiresAuth: true,
    allowedRoles: ['creator', 'admin'],
  },
  [ROUTES.ADMIN]: {
    label: 'Admin Control Portal',
    requiresAuth: true,
    allowedRoles: ['admin'],
  },
  [ROUTES.PROFILE]: {
    label: 'Hồ sơ người dùng',
    requiresAuth: true,
    allowedRoles: null,
  },
};
