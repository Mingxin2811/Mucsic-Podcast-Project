import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home, Search, Music, Disc, TrendingUp,
  Heart, Mic, FolderHeart, Plus, Upload,
  ShieldCheck, LayoutDashboard, UserCheck,
  LogOut, LogIn, ChevronLeft, ChevronRight, Sparkles
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ROUTES } from '../../router/routes';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout, openModal } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path;
  const isMusicNavActive = (item) => {
    const [pathname, query] = item.path.split('?');
    if (location.pathname !== pathname) return false;

    const expectedParams = new URLSearchParams(query || '');
    if (expectedParams.has('tab')) {
      const currentParams = new URLSearchParams(location.search);
      return [...expectedParams].every(([key, value]) => currentParams.get(key) === value);
    }

    // The playlists page also hosts the favorites tab, so keep its nav item distinct.
    return new URLSearchParams(location.search).get('tab') !== 'favorites';
  };

  const mainNav = [
    { path: ROUTES.HOME,         label: 'Trang chủ',            icon: Home },
    { path: ROUTES.SEARCH,       label: 'Tìm kiếm',            icon: Search },
    { path: '/#charts',          label: 'Bảng xếp hạng',       icon: TrendingUp },
    { path: '/genre/v-pop',      label: 'Thể loại',            icon: Disc },
    { path: ROUTES.TRACK_DETAIL, label: 'Đang phát chi tiết',  icon: Music, hidden: true },
  ];

  const myMusicNav = [
    { path: ROUTES.PLAYLISTS, label: 'Playlists của tôi', icon: FolderHeart, requiresAuth: true },
    { path: ROUTES.PLAYLISTS + '?tab=favorites', label: 'Bài hát yêu thích', icon: Heart, requiresAuth: true },
    { path: ROUTES.SEARCH + '?tab=podcasts',     label: 'Khám phá Podcast',    icon: Mic },
  ];

  const handleNav = (path, requiresAuth = false) => {
    if (requiresAuth && !currentUser) {
      openModal('login');
    } else {
      navigate(path);
    }
  };

  return (
    <aside
      className={`relative z-20 flex flex-col bg-[#111318] border-r border-[#1e222d] transition-all duration-300 ease-in-out select-none
        ${collapsed ? 'w-20' : 'w-64'} h-screen flex-shrink-0`}
    >
      {/* Brand Logo Header */}
      <div className="h-20 flex items-center px-6 gap-3 border-b border-[#1b1f2b]/60">
        <div
          onClick={() => navigate(ROUTES.HOME)}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#132c21] to-[#1c4734] border border-[#2fd17b]/40 flex items-center justify-center shadow-brand-glow group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-[#2fd17b]" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5 font-['Space_Grotesk']">
                SOUND<span className="text-[#2fd17b]">WAVE</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-gray-500 font-semibold">Music & Podcast</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
        {/* Main Section */}
        <div>
          {!collapsed && (
            <p className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Khám phá
            </p>
          )}
          <ul className="space-y-1">
            {mainNav.filter(item => !item.hidden).map((item) => {
              const Icon = item.icon;
              const [itemPath, itemHash] = item.path.split('#');
              const active = item.path === ROUTES.SEARCH
                ? location.pathname === ROUTES.SEARCH && new URLSearchParams(location.search).get('tab') !== 'podcasts'
                : (location.pathname === itemPath && (itemHash ? location.hash === `#${itemHash}` : !location.hash))
                  || (item.path === '/genre/v-pop' && location.pathname.startsWith('/genre/'));
              return (
                <li key={item.path}>
                  <button
                    onClick={() => itemHash ? navigate(item.path) : handleNav(item.path)}
                    title={collapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                      ${active
                        ? 'bg-[#525252] text-white font-semibold shadow-sm'
                        : 'text-gray-400 hover:text-white hover:bg-[#1a1e28]'
                      } ${collapsed ? 'justify-center px-0' : ''}`}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 transition-colors ${active ? 'text-[#2fd17b]' : 'text-gray-400 group-hover:text-white'}`} />
                    {!collapsed && <span>{item.label}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* My Music Section */}
        <div>
          {!collapsed && (
            <p className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Thư viện cá nhân
            </p>
          )}
          <ul className="space-y-1">
            {myMusicNav.map((item) => {
              const Icon = item.icon;
              const active = isMusicNavActive(item);
              return (
                <li key={item.path}>
                  <button
                    onClick={() => handleNav(item.path, item.requiresAuth)}
                    title={collapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                      ${active
                        ? 'bg-[#525252] text-white font-semibold'
                        : 'text-gray-400 hover:text-white hover:bg-[#1a1e28]'
                      } ${collapsed ? 'justify-center px-0' : ''}`}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 transition-colors ${active ? 'text-[#2fd17b]' : 'text-gray-400 group-hover:text-white'}`} />
                    {!collapsed && <span>{item.label}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Creator Studio & Admin Portal Section */}
        {currentUser && (
          <div>
            {!collapsed && (
              <p className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center justify-between">
                <span>Không gian sáng tạo</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#242b3b] text-gray-300 capitalize">{currentUser.role}</span>
              </p>
            )}

            <ul className="space-y-1">
              {(currentUser.role === 'creator' || currentUser.role === 'admin') && (
                <>
                  <li>
                    <button
                      onClick={() => navigate(ROUTES.CREATOR_STUDIO)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group
                        ${isActive(ROUTES.CREATOR_STUDIO) ? 'bg-[#525252] text-white' : 'text-gray-400 hover:text-white hover:bg-[#1a1e28]'}
                        ${collapsed ? 'justify-center px-0' : ''}`}
                      title={collapsed ? 'Creator Studio' : undefined}
                    >
                      <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span>Creator Studio</span>}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate(ROUTES.CREATOR_UPLOAD)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group
                        ${isActive(ROUTES.CREATOR_UPLOAD) ? 'bg-[#525252] text-white' : 'text-gray-400 hover:text-white hover:bg-[#1a1e28]'}
                        ${collapsed ? 'justify-center px-0' : ''}`}
                      title={collapsed ? 'Tải lên tác phẩm' : undefined}
                    >
                      <Upload className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span>Tải lên mới</span>}
                    </button>
                  </li>
                </>
              )}

              {currentUser.role === 'admin' && (
                <li>
                  <button
                    onClick={() => navigate(ROUTES.ADMIN)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group
                      ${isActive(ROUTES.ADMIN) ? 'bg-amber-950/40 text-amber-400 border border-amber-500/30' : 'text-amber-300/80 hover:text-amber-200 hover:bg-amber-950/20'}
                      ${collapsed ? 'justify-center px-0' : ''}`}
                    title={collapsed ? 'Admin Control Portal' : undefined}
                  >
                    <ShieldCheck className="w-5 h-5 flex-shrink-0 text-amber-400" />
                    {!collapsed && <span>Admin Portal</span>}
                  </button>
                </li>
              )}

              <li>
                <button
                  onClick={() => navigate(ROUTES.PROFILE)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group
                    ${isActive(ROUTES.PROFILE) ? 'bg-[#525252] text-white' : 'text-gray-400 hover:text-white hover:bg-[#1a1e28]'}
                    ${collapsed ? 'justify-center px-0' : ''}`}
                  title={collapsed ? 'Hồ sơ & Đăng ký Creator' : undefined}
                >
                  <UserCheck className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span>Hồ sơ cá nhân</span>}
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Collapse Button */}
      <div className="absolute bottom-24 inset-x-0 z-50 px-4 py-2 border-t border-[#1b1f2b] bg-[#111318]">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 py-2 text-xs text-gray-400 hover:text-white hover:bg-[#1a1e28] rounded-lg transition-colors"
          title="Thu gọn menu"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Thu gọn (Roll up)</span>
            </>
          )}
        </button>
      </div>

      {/* Footer Profile / Logout */}
      <div className="p-3 bg-[#0d0f14] border-t border-[#1b1f2b]">
        {currentUser ? (
          <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl bg-[#151821]">
            <div
              onClick={() => navigate(ROUTES.PROFILE)}
              className="flex items-center gap-2.5 overflow-hidden cursor-pointer hover:opacity-90 flex-1"
            >
              <img
                src={currentUser.avatar_url}
                alt={currentUser.username}
                className="w-8 h-8 rounded-full object-cover border border-[#2fd17b]/40 flex-shrink-0"
              />
              {!collapsed && (
                <div className="overflow-hidden">
                  <p className="text-xs font-semibold text-white truncate">{currentUser.username}</p>
                  <p className="text-[10px] text-[#2fd17b] capitalize font-medium">{currentUser.role}</p>
                </div>
              )}
            </div>
            {!collapsed && (
              <button
                onClick={logout}
                title="Đăng xuất"
                className="p-1.5 text-gray-400 hover:text-rose-400 hover:bg-[#202534] rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-1.5">
            <button
              onClick={() => openModal('login')}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-xl bg-[#1e2330] hover:bg-[#282e3f] text-white transition-colors"
            >
              <LogIn className="w-4 h-4 text-[#2fd17b]" />
              {!collapsed && <span>Đăng nhập</span>}
            </button>
            <button
              onClick={() => openModal('register')}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-xl bg-[#2fd17b] hover:bg-[#26b86b] text-black transition-colors"
            >
              <Plus className="w-4 h-4" />
              {!collapsed && <span>Đăng ký (+)</span>}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
