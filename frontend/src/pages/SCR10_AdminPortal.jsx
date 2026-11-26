import React, { useState } from 'react';
import { 
  ShieldCheck, UserCheck, Users, FileX, Check, 
  X, Lock, Unlock, AlertTriangle, Eye, ShieldAlert 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useMusic } from '../contexts/MusicContext';

export const SCR10_AdminPortal = () => {
  const { currentUser, users, adminReviewCreator, adminToggleUserStatus, showToast } = useAuth();
  const { tracks, adminToggleTrackViolation } = useMusic();

  const [activeTab, setActiveTab] = useState('tab1'); // 'tab1' | 'tab2' | 'tab3'
  const [userRoleFilter, setUserRoleFilter] = useState('all');

  // Guard: Only admin
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <ShieldAlert className="w-16 h-16 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-white">Yêu Cầu Quyền Quản Trị Tối Cao</h2>
        <p className="text-xs text-gray-400">
          Chỉ có tài khoản có vai trò Quản trị viên (Admin) mới có quyền truy cập bảng điều khiển này.
        </p>
      </div>
    );
  }

  // Tab 1: Pending creator applications
  const pendingCreators = users.filter(u => u.creator_status === 'pending');

  // Tab 2: Filtered users list
  const filteredUsers = users.filter(u => {
    if (userRoleFilter === 'all') return true;
    return u.role === userRoleFilter;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#212635]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
              HỆ THỐNG QUẢN TRỊ TỐI CAO
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5 mt-1.5">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <span>Bảng Điều Khiển Quản Trị Hệ Thống (SCR10 - Admin Portal)</span>
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Quản trị viên: <strong className="text-white">{currentUser.username}</strong> ({currentUser.email})
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-3 border-b border-[#212635] pb-3 text-xs">
        <button
          onClick={() => setActiveTab('tab1')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all
            ${activeTab === 'tab1' 
              ? 'bg-[#525252] text-white shadow-md border border-[#686868]' 
              : 'bg-[#181c26] text-gray-400 hover:text-white border border-[#262c3b]'}`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Tab 1: Phê Duyệt Creator [UC12]</span>
          {pendingCreators.length > 0 && (
            <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
              {pendingCreators.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('tab2')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all
            ${activeTab === 'tab2' 
              ? 'bg-[#525252] text-white shadow-md border border-[#686868]' 
              : 'bg-[#181c26] text-gray-400 hover:text-white border border-[#262c3b]'}`}
        >
          <Users className="w-4 h-4" />
          <span>Tab 2: Quản Lý Người Dùng [UC10]</span>
        </button>

        <button
          onClick={() => setActiveTab('tab3')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all
            ${activeTab === 'tab3' 
              ? 'bg-[#525252] text-white shadow-md border border-[#686868]' 
              : 'bg-[#181c26] text-gray-400 hover:text-white border border-[#262c3b]'}`}
        >
          <FileX className="w-4 h-4" />
          <span>Tab 3: Kiểm Duyệt Nội Dung [UC11]</span>
        </button>
      </div>

      {/* TAB 1: PHÊ DUYỆT CREATOR [UC12] */}
      {activeTab === 'tab1' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Danh sách đơn đăng ký chờ phê duyệt ({pendingCreators.length})
            </h3>
            <span className="text-xs text-gray-400">Nguồn: Đơn nộp từ SCR12</span>
          </div>

          <div className="bg-[#141720] border border-[#212634] rounded-2xl overflow-hidden shadow-md">
            <div className="grid grid-cols-12 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-500 border-b border-[#1f2433]">
              <span className="col-span-4">Người dùng & Email</span>
              <span className="col-span-3">Nghệ danh / Kênh</span>
              <span className="col-span-3">Mô tả / Lĩnh vực</span>
              <span className="col-span-2 text-right">Phê duyệt</span>
            </div>

            {pendingCreators.length === 0 ? (
              <div className="py-16 text-center text-gray-500 text-xs">
                Không có đơn đăng ký Creator nào đang chờ duyệt.
              </div>
            ) : (
              <div className="divide-y divide-[#1b202c]">
                {pendingCreators.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 items-center px-5 py-4 hover:bg-[#181c26] transition-colors">
                    <div className="col-span-4 flex items-center gap-3 overflow-hidden">
                      <img src={item.avatar_url} alt={item.username} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-white truncate">{item.username}</p>
                        <p className="text-[11px] text-gray-400 truncate">{item.email}</p>
                      </div>
                    </div>

                    <div className="col-span-3 text-xs font-semibold text-[#2fd17b]">
                      {item.channel_name || 'Chưa đặt tên'}
                    </div>

                    <div className="col-span-3 text-xs text-gray-400 truncate pr-2">
                      {item.bio || 'Không có mô tả'}
                    </div>

                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <button
                        onClick={() => adminReviewCreator(item.id, 'approved')}
                        className="px-2.5 py-1.5 rounded-lg bg-[#142e22] hover:bg-[#1e4734] border border-[#2fd17b]/40 text-[#2fd17b] text-xs font-bold flex items-center gap-1 transition-colors"
                        title="Duyệt đơn"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Duyệt</span>
                      </button>

                      <button
                        onClick={() => adminReviewCreator(item.id, 'rejected')}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-1 transition-colors"
                        title="Từ chối"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Từ chối</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: QUẢN LÝ NGƯỜI DÙNG [UC10] */}
      {activeTab === 'tab2' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Lọc theo vai trò:</span>
              <div className="flex gap-1 bg-[#161922] p-1 rounded-xl border border-[#242938]">
                {['all', 'listener', 'creator', 'admin'].map((role) => (
                  <button
                    key={role}
                    onClick={() => setUserRoleFilter(role)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors
                      ${userRoleFilter === role ? 'bg-[#242b3b] text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    {role === 'all' ? 'Tất cả' : role}
                  </button>
                ))}
              </div>
            </div>
            <span className="text-xs text-gray-400">Tổng cộng {filteredUsers.length} tài khoản</span>
          </div>

          <div className="bg-[#141720] border border-[#212634] rounded-2xl overflow-hidden shadow-md">
            <div className="grid grid-cols-12 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-500 border-b border-[#1f2433]">
              <span className="col-span-4">Tài khoản</span>
              <span className="col-span-3">Vai trò & Quyền</span>
              <span className="col-span-3">Trạng thái</span>
              <span className="col-span-2 text-right">Khóa / Mở</span>
            </div>

            <div className="divide-y divide-[#1b202c]">
              {filteredUsers.map((u) => {
                const isLocked = !!u.deleted_at;
                const isSelf = u.id === currentUser.id;

                return (
                  <div key={u.id} className="grid grid-cols-12 items-center px-5 py-3.5 hover:bg-[#181c26] transition-colors">
                    <div className="col-span-4 flex items-center gap-3 overflow-hidden">
                      <img src={u.avatar_url} alt={u.username} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-white truncate">{u.username}</p>
                        <p className="text-[11px] text-gray-400 truncate">{u.email}</p>
                      </div>
                    </div>

                    <div className="col-span-3">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border
                        ${u.role === 'admin' ? 'bg-amber-950/60 text-amber-300 border-amber-500/30' : ''}
                        ${u.role === 'creator' ? 'bg-[#142e22] text-[#2fd17b] border-[#2fd17b]/30' : ''}
                        ${u.role === 'listener' ? 'bg-[#1f2433] text-gray-300 border-gray-700' : ''}
                      `}>
                        {u.role}
                      </span>
                    </div>

                    <div className="col-span-3 text-xs">
                      {isLocked ? (
                        <span className="text-[10px] font-bold text-rose-400 bg-rose-950/60 border border-rose-500/30 px-2 py-0.5 rounded">
                          Đã bị khóa
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                          Bình thường
                        </span>
                      )}
                    </div>

                    <div className="col-span-2 flex items-center justify-end">
                      {!isSelf ? (
                        <button
                          onClick={() => adminToggleUserStatus(u.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors
                            ${isLocked 
                              ? 'bg-emerald-950/60 text-emerald-400 hover:bg-emerald-900 border border-emerald-500/30' 
                              : 'bg-rose-950/60 text-rose-300 hover:bg-rose-900 border border-rose-500/30'}`}
                        >
                          {isLocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                          <span>{isLocked ? 'Mở khóa' : 'Khóa'}</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-gray-500 italic">Hiện tại</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: KIỂM DUYỆT NỘI DUNG [UC11] */}
      {activeTab === 'tab3' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Kho tác phẩm toàn hệ thống ({tracks.length})
            </h3>
            <span className="text-xs text-gray-400">Kiểm tra và xử lý vi phạm bản quyền / nội dung xấu</span>
          </div>

          <div className="bg-[#141720] border border-[#212634] rounded-2xl overflow-hidden shadow-md">
            <div className="grid grid-cols-12 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-500 border-b border-[#1f2433]">
              <span className="col-span-5">Tác phẩm & Nghệ sĩ</span>
              <span className="col-span-3">Thể loại & Loại</span>
              <span className="col-span-2">Trạng thái</span>
              <span className="col-span-2 text-right">Kiểm duyệt</span>
            </div>

            <div className="divide-y divide-[#1b202c]">
              {tracks.map((t) => {
                const isViolation = !!t.deleted_at;

                return (
                  <div key={t.id} className="grid grid-cols-12 items-center px-5 py-3.5 hover:bg-[#181c26] transition-colors">
                    <div className="col-span-5 flex items-center gap-3 overflow-hidden">
                      <img src={t.cover_image_path} alt={t.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-white truncate">{t.title}</p>
                        <p className="text-[11px] text-gray-400 truncate">{t.artist_name}</p>
                      </div>
                    </div>

                    <div className="col-span-3 text-xs text-gray-300">
                      {t.genre_name} <span className="text-[10px] text-gray-500">({t.track_type})</span>
                    </div>

                    <div className="col-span-2 text-xs">
                      {isViolation ? (
                        <span className="text-[10px] font-bold text-rose-400 bg-rose-950/60 border border-rose-500/30 px-2 py-0.5 rounded">
                          Đã ẩn / Vi phạm
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                          Hợp lệ
                        </span>
                      )}
                    </div>

                    <div className="col-span-2 flex items-center justify-end">
                      <button
                        onClick={() => {
                          adminToggleTrackViolation(t.id);
                          showToast(isViolation ? `Đã khôi phục "${t.title}"` : `Đã gỡ bỏ "${t.title}" do vi phạm`, 'info');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors
                          ${isViolation 
                            ? 'bg-emerald-950/60 text-emerald-400 hover:bg-emerald-900 border border-emerald-500/30' 
                            : 'bg-rose-950/60 text-rose-300 hover:bg-rose-900 border border-rose-500/30'}`}
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>{isViolation ? 'Khôi phục' : 'Gỡ vi phạm'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
