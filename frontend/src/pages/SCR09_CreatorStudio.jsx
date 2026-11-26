import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Plus, Edit3, Trash2, Play, 
  BarChart3, Music2, Mic, AlertTriangle, X, Check, Eye 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useMusic } from '../contexts/MusicContext';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';
import { ROUTES } from '../router/routes';

export const SCR09_CreatorStudio = () => {
  const navigate = useNavigate();
  const { currentUser, showToast } = useAuth();
  const { tracks, genres, creatorDeleteTrack, creatorUpdateTrack } = useMusic();
  const { playTrack, formatTime } = useAudioPlayer();

  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'active' | 'deleted'
  const [editingTrack, setEditingTrack] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Guard: Only approved creator or admin
  if (!currentUser || (currentUser.role !== 'creator' && currentUser.role !== 'admin')) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <LayoutDashboard className="w-16 h-16 text-gray-600 mx-auto" />
        <h2 className="text-xl font-bold text-white">Yêu Cầu Quyền Creator Studio</h2>
        <p className="text-xs text-gray-400">
          Bạn cần nộp hồ sơ và được Ban Quản Trị phê duyệt tài khoản Creator tại trang cá nhân để mở không gian này.
        </p>
        <button
          onClick={() => navigate(ROUTES.PROFILE)}
          className="px-6 py-2.5 rounded-xl bg-[#2fd17b] text-black font-extrabold text-xs shadow-brand-glow"
        >
          Nộp hồ sơ Creator tại Hồ sơ
        </button>
      </div>
    );
  }

  // Get tracks uploaded by current creator (or all if admin)
  const myTracks = tracks.filter(t => {
    if (currentUser.role === 'admin') return true;
    return t.creator_id === currentUser.id;
  });

  const filteredTracks = myTracks.filter(t => {
    if (filterStatus === 'active') return !t.deleted_at;
    if (filterStatus === 'deleted') return !!t.deleted_at;
    return true;
  });

  const totalPlays = myTracks.reduce((acc, t) => acc + t.play_count, 0);
  const totalActive = myTracks.filter(t => !t.deleted_at).length;

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingTrack) return;
    creatorUpdateTrack(editingTrack.id, {
      title: editingTrack.title,
      genre_id: editingTrack.genre_id,
      lyrics: editingTrack.lyrics,
      description: editingTrack.description,
    });
    showToast(`Đã cập nhật thông tin "${editingTrack.title}"`, 'success');
    setEditingTrack(null);
  };

  const handleSoftDelete = (id) => {
    creatorDeleteTrack(id);
    showToast('Tác phẩm đã được chuyển sang trạng thái xóa mềm (ẩn khỏi người dùng)', 'info');
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-[#2fd17b]" />
            <span>Quản Lý Tác Phẩm Của Tôi (SCR09 - Creator Studio)</span>
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Kênh: <strong className="text-white">{currentUser.channel_name || currentUser.username}</strong> • Thống kê và chỉnh sửa kho nội dung
          </p>
        </div>

        <button
          onClick={() => navigate(ROUTES.CREATOR_UPLOAD)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2fd17b] hover:bg-[#28b86c] text-black font-extrabold text-xs shadow-brand-glow transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tải Lên Tác Phẩm Mới</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#141720] border border-[#212634] shadow-md">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Tổng lượt nghe</p>
          <h3 className="text-2xl font-extrabold text-white mt-1 font-mono">
            {totalPlays.toLocaleString('vi-VN')}
          </h3>
          <span className="text-[10px] text-[#2fd17b] mt-1 block">Tăng trưởng ổn định</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#141720] border border-[#212634] shadow-md">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Tác phẩm đang hiển thị</p>
          <h3 className="text-2xl font-extrabold text-white mt-1 font-mono">
            {totalActive} / {myTracks.length}
          </h3>
          <span className="text-[10px] text-gray-400 mt-1 block">Hoạt động công khai</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#141720] border border-[#212634] shadow-md">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Trạng thái Kênh</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2fd17b]" />
            <span className="text-sm font-bold text-white capitalize">{currentUser.creator_status} (Đã xác minh)</span>
          </div>
          <span className="text-[10px] text-gray-400 mt-1 block">Sẵn sàng phân phối toàn cầu</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-[#212635] pb-3">
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors
              ${filterStatus === 'all' ? 'bg-[#525252] text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Tất cả ({myTracks.length})
          </button>
          <button
            onClick={() => setFilterStatus('active')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors
              ${filterStatus === 'active' ? 'bg-[#525252] text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Đang hiển thị ({totalActive})
          </button>
          <button
            onClick={() => setFilterStatus('deleted')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors
              ${filterStatus === 'deleted' ? 'bg-[#525252] text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Đã bị gỡ ({myTracks.length - totalActive})
          </button>
        </div>
      </div>

      {/* Tracks Management Table */}
      <div className="bg-[#141720] border border-[#212634] rounded-2xl overflow-hidden shadow-md">
        <div className="grid grid-cols-12 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-500 border-b border-[#1f2433]">
          <span className="col-span-5 sm:col-span-5">Tác phẩm</span>
          <span className="hidden sm:block sm:col-span-2">Thể loại & Loại</span>
          <span className="hidden sm:block sm:col-span-2">Lượt nghe</span>
          <span className="col-span-3 sm:col-span-1">Trạng thái</span>
          <span className="col-span-4 sm:col-span-2 text-right">Thao tác</span>
        </div>

        {filteredTracks.length === 0 ? (
          <div className="py-16 text-center text-gray-500 text-xs space-y-2">
            <p>Không có tác phẩm nào theo bộ lọc này.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#1b202c]">
            {filteredTracks.map((track) => {
              const isDeleted = !!track.deleted_at;

              return (
                <div
                  key={track.id}
                  className={`grid grid-cols-12 items-center px-5 py-3.5 hover:bg-[#181c26] transition-colors
                    ${isDeleted ? 'opacity-50 bg-[#161317]' : ''}`}
                >
                  {/* Title & Cover */}
                  <div className="col-span-5 sm:col-span-5 flex items-center gap-3 overflow-hidden pr-2">
                    <img 
                      src={track.cover_image_path} 
                      alt={track.title} 
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-white truncate">{track.title}</p>
                      <p className="text-[11px] text-gray-400 truncate">{track.artist_name}</p>
                    </div>
                  </div>

                  {/* Genre & Type */}
                  <div className="hidden sm:flex sm:col-span-2 items-center gap-1.5 text-xs text-gray-300">
                    <span>{track.genre_name}</span>
                    <span className="text-[10px] text-gray-500 capitalize">({track.track_type})</span>
                  </div>

                  {/* Play count */}
                  <div className="hidden sm:block sm:col-span-2 text-xs font-mono text-gray-300">
                    {track.play_count.toLocaleString('vi-VN')}
                  </div>

                  {/* Status Badge */}
                  <div className="col-span-3 sm:col-span-1">
                    {isDeleted ? (
                      <span className="text-[10px] font-bold text-rose-400 bg-rose-950/60 border border-rose-500/30 px-2 py-0.5 rounded">
                        Đã bị gỡ
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-[#2fd17b] bg-[#142e22] border border-[#2fd17b]/30 px-2 py-0.5 rounded">
                        Hiển thị
                      </span>
                    )}
                  </div>

                  {/* Actions: Listen, Edit, Soft Delete */}
                  <div className="col-span-4 sm:col-span-2 flex items-center justify-end gap-2 text-xs">
                    {!isDeleted && (
                      <>
                        <button
                          onClick={() => playTrack(track, filteredTracks)}
                          className="p-1.5 text-gray-400 hover:text-[#2fd17b] transition-colors"
                          title="Nghe thử"
                        >
                          <Play className="w-4 h-4 fill-current" />
                        </button>

                        <button
                          onClick={() => setEditingTrack(track)}
                          className="p-1.5 text-gray-400 hover:text-sky-400 transition-colors"
                          title="Chỉnh sửa thông tin"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setDeleteConfirmId(track.id)}
                          className="p-1.5 text-gray-400 hover:text-rose-400 transition-colors"
                          title="Xóa mềm tác phẩm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Edit Track Modal */}
      {editingTrack && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161922] border border-[#272d3e] rounded-3xl p-6 max-w-lg w-full shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#212635]">
              <h3 className="text-base font-bold text-white">Chỉnh Sửa Thông Tin Tác Phẩm</h3>
              <button 
                onClick={() => setEditingTrack(null)}
                className="p-1.5 rounded-full hover:bg-[#222736] text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Tiêu đề *</label>
                <input
                  type="text"
                  value={editingTrack.title}
                  onChange={(e) => setEditingTrack({ ...editingTrack, title: e.target.value })}
                  maxLength={150}
                  required
                  className="w-full bg-[#1b1f2b] border border-[#272d3e] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2fd17b]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Thể loại</label>
                <select
                  value={editingTrack.genre_id}
                  onChange={(e) => setEditingTrack({ ...editingTrack, genre_id: e.target.value })}
                  className="w-full bg-[#1b1f2b] border border-[#272d3e] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2fd17b]"
                >
                  {genres.map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              </div>

              {editingTrack.track_type === 'music' ? (
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Lời bài hát (Lyrics)</label>
                  <textarea
                    value={editingTrack.lyrics || ''}
                    onChange={(e) => setEditingTrack({ ...editingTrack, lyrics: e.target.value })}
                    rows={4}
                    className="w-full bg-[#1b1f2b] border border-[#272d3e] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#2fd17b]"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Show Notes / Timestamps</label>
                  <textarea
                    value={editingTrack.description || ''}
                    onChange={(e) => setEditingTrack({ ...editingTrack, description: e.target.value })}
                    rows={4}
                    className="w-full bg-[#1b1f2b] border border-[#272d3e] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400 font-mono"
                  />
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingTrack(null)}
                  className="flex-1 py-2 rounded-xl bg-[#202534] text-xs font-bold text-gray-300"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#2fd17b] hover:bg-[#28b86c] text-xs font-extrabold text-black"
                >
                  Lưu Thay Đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#181418] border border-rose-500/40 rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-950/80 flex items-center justify-center mx-auto text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Xác nhận gỡ tác phẩm?</h3>
            <p className="text-xs text-gray-400">
              Tác phẩm sẽ được xóa mềm (soft delete) và ẩn khỏi trang khám phá. Bản ghi vẫn được lưu trữ theo quy định hệ thống.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 rounded-xl bg-[#202534] text-xs font-bold text-gray-300"
              >
                Hủy
              </button>
              <button
                onClick={() => handleSoftDelete(deleteConfirmId)}
                className="flex-1 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-xs font-bold text-white shadow-md"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
