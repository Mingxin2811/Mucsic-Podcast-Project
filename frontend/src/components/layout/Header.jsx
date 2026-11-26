import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Search, Bell, ChevronRight,
  User, Shield, Sparkles, LogIn, ChevronDown
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ROUTES, ROUTE_META } from '../../router/routes';

// Map pathname → tên breadcrumb
const getBreadcrumb = (pathname) => {
  if (pathname === ROUTES.HOME)           return ROUTE_META[ROUTES.HOME].label;
  if (pathname.startsWith('/search'))     return ROUTE_META[ROUTES.SEARCH].label;
  if (pathname.startsWith('/genre/'))     return ROUTE_META[ROUTES.GENRE_DETAIL].label;
  if (pathname.startsWith('/track/'))     return ROUTE_META[ROUTES.TRACK_DETAIL].label;
  if (pathname === ROUTES.PLAYLISTS)      return ROUTE_META[ROUTES.PLAYLISTS].label;
  if (pathname === ROUTES.CREATOR_UPLOAD) return ROUTE_META[ROUTES.CREATOR_UPLOAD].label;
  if (pathname === ROUTES.CREATOR_STUDIO) return ROUTE_META[ROUTES.CREATOR_STUDIO].label;
  if (pathname === ROUTES.ADMIN)          return ROUTE_META[ROUTES.ADMIN].label;
  if (pathname === ROUTES.PROFILE)        return ROUTE_META[ROUTES.PROFILE].label;
  return 'SoundWave';
};

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, loginAsRole, logout, openModal } = useAuth();
  const [searchValue, setSearchValue] = useState('');
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const breadcrumb = getBreadcrumb(location.pathname);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <header className="h-20 bg-[#0e1015]/90 backdrop-blur-md border-b border-[#1c202a] px-8 flex items-center justify-between gap-6 sticky top-0 z-10 select-none">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <button
          onClick={() => navigate(ROUTES.HOME)}
          className="hover:text-white transition-colors"
        >
          Trang chủ
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
        <span className="text-white font-medium bg-[#1a1e27] px-3 py-1 rounded-full text-xs border border-[#272d3b]">
          {breadcrumb}
        </span>
      </div>

      {/* Center: Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl relative">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Bạn muốn nghe bài hát, nghệ sĩ hay podcast nào?..."
            className="w-full bg-[#161922] hover:bg-[#1a1e2a] focus:bg-[#1b202e] text-sm text-white placeholder-gray-500 pl-11 pr-12 py-2.5 rounded-full border border-[#242938] focus:border-[#2fd17b]/60 focus:ring-1 focus:ring-[#2fd17b]/40 outline-none transition-all duration-200"
          />
          <button
            type="submit"
            className="absolute right-3 text-xs bg-[#242938] hover:bg-[#2fd17b] hover:text-black text-gray-300 px-2.5 py-1 rounded-full transition-colors"
          >
            Enter
          </button>
        </div>
      </form>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative">
          <button
            title="Thông báo hệ thống"
            className="w-10 h-10 rounded-full bg-[#161922] hover:bg-[#202534] border border-[#242938] flex items-center justify-center text-gray-300 hover:text-white transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#2fd17b] ring-2 ring-[#0e1015]" />
          </button>
        </div>

        {/* Quick Role Switcher Dropdown (Demo Helper) */}
        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full bg-[#161922] hover:bg-[#1d2230] border border-[#242938] transition-colors"
          >
            {currentUser ? (
              <>
                <img
                  src={currentUser.avatar_url}
                  alt={currentUser.username}
                  className="w-7 h-7 rounded-full object-cover border border-[#2fd17b]/50"
                />
                <div className="text-left leading-tight hidden sm:block">
                  <p className="text-xs font-semibold text-white max-w-[100px] truncate">{currentUser.username}</p>
                  <p className="text-[10px] text-[#2fd17b] font-medium capitalize">{currentUser.role}</p>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-1.5 px-2 py-0.5">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-300">Khách vãng lai</span>
              </div>
            )}
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {/* Dropdown Menu */}
          {showRoleDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-[#181b24] rounded-2xl shadow-card-glow border border-[#292f40] py-2 z-50 text-xs">
              <div className="px-4 py-2 border-b border-[#242938]">
                <p className="font-semibold text-gray-300">Chuyển đổi vai trò Demo</p>
                <p className="text-[10px] text-gray-500">Giúp kiểm thử nhanh phân quyền các màn hình</p>
              </div>

              <div className="p-1 space-y-0.5">
                <button
                  onClick={() => { loginAsRole('listener'); setShowRoleDropdown(false); }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#202534] flex items-center justify-between text-gray-200"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-400" />
                    <span>Người nghe (Listener)</span>
                  </span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded">Tâm</span>
                </button>

                <button
                  onClick={() => { loginAsRole('creator'); setShowRoleDropdown(false); }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#202534] flex items-center justify-between text-gray-200"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#2fd17b]" />
                    <span>Creator (Sơn Tùng M-TP)</span>
                  </span>
                  <span className="text-[10px] bg-[#132c21] text-[#2fd17b] px-1.5 py-0.5 rounded">Approved</span>
                </button>

                <button
                  onClick={() => { loginAsRole('admin'); setShowRoleDropdown(false); }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#202534] flex items-center justify-between text-gray-200"
                >
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-amber-400" />
                    <span>Quản trị viên (Admin)</span>
                  </span>
                  <span className="text-[10px] bg-amber-950 text-amber-400 px-1.5 py-0.5 rounded">Root</span>
                </button>
              </div>

              <div className="border-t border-[#242938] mt-1 pt-1 px-1">
                {currentUser ? (
                  <button
                    onClick={() => { logout(); setShowRoleDropdown(false); }}
                    className="w-full text-left px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-950/20"
                  >
                    Đăng xuất (Chế độ Khách)
                  </button>
                ) : (
                  <button
                    onClick={() => { openModal('login'); setShowRoleDropdown(false); }}
                    className="w-full text-left px-3 py-2 rounded-xl text-[#2fd17b] hover:bg-[#132c21]"
                  >
                    Mở form Đăng nhập
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
