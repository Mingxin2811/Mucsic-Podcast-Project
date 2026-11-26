import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FolderHeart, Play, Shuffle, Plus, Trash2, 
  Music, Clock, X, Edit3, Sparkles 
} from 'lucide-react';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';
import { useMusic } from '../contexts/MusicContext';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES, buildPath } from '../router/routes';

export const SCR05_Playlists = () => {
  const navigate = useNavigate();
  const { currentTrack, playTrack, togglePlay, formatTime } = useAudioPlayer();
  const { playlists, tracks, createPlaylist, removeTrackFromPlaylist, deletePlaylist } = useMusic();
  const { currentUser, openModal, showToast } = useAuth();

  const [selectedPlaylistId, setSelectedPlaylistId] = useState(playlists[0]?.id || null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  if (!currentUser) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <FolderHeart className="w-16 h-16 text-gray-600 mx-auto" />
        <h2 className="text-xl font-bold text-white">Yêu cầu đăng nhập</h2>
        <p className="text-xs text-gray-400">
          Vui lòng đăng nhập để xem và quản lý các danh sách phát cá nhân của bạn.
        </p>
        <button
          onClick={() => openModal('login')}
          className="px-6 py-2.5 rounded-xl bg-[#2fd17b] hover:bg-[#28b86c] text-black font-extrabold text-xs shadow-brand-glow transition-all"
        >
          Đăng nhập ngay
        </button>
      </div>
    );
  }

  const activePlaylist = playlists.find(p => p.id === selectedPlaylistId) || playlists[0];

  // Resolve tracks inside this playlist
  const playlistTracks = activePlaylist 
    ? activePlaylist.track_ids.map(id => tracks.find(t => t.id === id)).filter(Boolean)
    : [];

  const totalDuration = playlistTracks.reduce((acc, t) => acc + t.duration, 0);

  const handlePlayAll = (shuffle = false) => {
    if (!playlistTracks.length) return;
    let list = [...playlistTracks];
    if (shuffle) list.sort(() => Math.random() - 0.5);
    playTrack(list[0], list);
  };

  const handleCreateNew = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const pl = createPlaylist({ title: newTitle.trim(), description: newDesc.trim() });
    setSelectedPlaylistId(pl.id);
    setShowCreateModal(false);
    setNewTitle('');
    setNewDesc('');
    showToast(`Đã tạo playlist "${pl.title}" thành công!`, 'success');
  };

  const handleDelete = () => {
    if (!activePlaylist) return;
    if (window.confirm(`Bạn có chắc muốn xóa playlist "${activePlaylist.title}" không?`)) {
      deletePlaylist(activePlaylist.id);
      showToast(`Đã xóa playlist "${activePlaylist.title}"`, 'info');
      const remaining = playlists.filter(p => p.id !== activePlaylist.id);
      setSelectedPlaylistId(remaining[0]?.id || null);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Playlists Management Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <FolderHeart className="w-6 h-6 text-[#2fd17b]" />
            <span>Thư Viện Playlist Cá Nhân</span>
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">Tạo và tùy biến không gian âm nhạc theo sở thích riêng</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2fd17b] hover:bg-[#28b86c] text-black font-extrabold text-xs shadow-brand-glow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo Playlist Mới</span>
        </button>
      </div>

      {/* Playlist Horizontal Tabs / Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {playlists.map((pl) => (
          <button
            key={pl.id}
            onClick={() => setSelectedPlaylistId(pl.id)}
            className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border
              ${selectedPlaylistId === pl.id 
                ? 'bg-[#525252] border-[#686868] text-white' 
                : 'bg-[#161922] border-[#242938] text-gray-300 hover:bg-[#1f2433]'}`}
          >
            <img src={pl.cover_image_path} alt={pl.title} className="w-5 h-5 rounded-md object-cover" />
            <span>{pl.title}</span>
            <span className="text-[10px] text-gray-500 font-mono">({pl.track_ids.length})</span>
          </button>
        ))}
      </div>

      {activePlaylist ? (
        <>
          {/* Active Playlist Hero Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 bg-[#151822] border border-[#242938] rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <img 
              src={activePlaylist.cover_image_path} 
              alt={activePlaylist.title}
              className="w-36 h-36 rounded-2xl object-cover border border-[#2a3040] shadow-md flex-shrink-0" 
            />

            <div className="flex-1 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#2fd17b] bg-[#142e22] px-2.5 py-0.5 rounded-full border border-[#2fd17b]/30">
                PLAYLIST CÁ NHÂN
              </span>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">{activePlaylist.title}</h2>
              <p className="text-xs text-gray-400 line-clamp-2">{activePlaylist.description}</p>
              
              <div className="flex items-center gap-3 text-xs text-gray-400 pt-1">
                <span>{currentUser.username}</span>
                <span>•</span>
                <span>{playlistTracks.length} bài hát</span>
                <span>•</span>
                <span>{Math.floor(totalDuration / 60)} phút</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3">
                <button
                  onClick={() => handlePlayAll(false)}
                  disabled={playlistTracks.length === 0}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2fd17b] hover:bg-[#28b86c] disabled:opacity-50 text-black font-extrabold text-xs shadow-brand-glow transition-all"
                >
                  <Play className="w-4 h-4 fill-black" />
                  <span>Phát tất cả</span>
                </button>

                <button
                  onClick={() => handlePlayAll(true)}
                  disabled={playlistTracks.length === 0}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1d2230] hover:bg-[#252b3d] border border-[#282f42] disabled:opacity-50 text-gray-300 font-semibold text-xs transition-colors"
                >
                  <Shuffle className="w-4 h-4" />
                  <span>Xáo trộn</span>
                </button>

                <button
                  onClick={handleDelete}
                  className="p-2.5 rounded-xl hover:bg-rose-950/40 text-gray-400 hover:text-rose-400 transition-colors ml-auto"
                  title="Xóa danh sách phát này"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Playlist Tracks Table */}
          <div className="bg-[#141720] border border-[#212634] rounded-2xl overflow-hidden shadow-md">
            <div className="grid grid-cols-12 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-500 border-b border-[#1f2433]">
              <span className="col-span-1 text-center">#</span>
              <span className="col-span-6 sm:col-span-6">Bài hát</span>
              <span className="hidden sm:block sm:col-span-3">Nghệ sĩ / Thể loại</span>
              <span className="col-span-5 sm:col-span-2 text-right">Gỡ bài hát</span>
            </div>

            {playlistTracks.length === 0 ? (
              <div className="py-16 text-center text-gray-500 text-xs space-y-2">
                <Music className="w-8 h-8 mx-auto text-gray-600" />
                <p>Danh sách phát này chưa có bài hát nào.</p>
                <button
                  onClick={() => navigate(ROUTES.HOME)}
                  className="text-[#2fd17b] hover:underline font-semibold"
                >
                  Khám phá bài hát để thêm vào [+]
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#1b202c]">
                {playlistTracks.map((track, idx) => {
                  const isCurrent = currentTrack?.id === track.id;
                  return (
                    <div
                      key={track.id}
                      className={`grid grid-cols-12 items-center px-5 py-3 hover:bg-[#1a1e29] transition-colors group
                        ${isCurrent ? 'bg-[#525252]/40' : ''}`}
                    >
                      <div className="col-span-1 flex items-center justify-center">
                        <button
                          onClick={() => playTrack(track, playlistTracks)}
                          className="text-xs font-bold text-gray-400 group-hover:text-white"
                        >
                          <span className="group-hover:hidden">{idx + 1}</span>
                          <Play className="w-4 h-4 text-[#2fd17b] fill-current hidden group-hover:block" />
                        </button>
                      </div>

                      <div className="col-span-6 sm:col-span-6 flex items-center gap-3 overflow-hidden">
                        <img src={track.cover_image_path} alt={track.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                        <div className="overflow-hidden">
                          <p 
                            onClick={() => navigate(buildPath(ROUTES.TRACK_DETAIL, { id: track.id }))}
                            className={`text-xs font-bold truncate cursor-pointer hover:underline ${isCurrent ? 'text-[#2fd17b]' : 'text-white'}`}
                          >
                            {track.title}
                          </p>
                          <p className="text-[11px] text-gray-400 truncate">{track.artist_name}</p>
                        </div>
                      </div>

                      <div className="hidden sm:block sm:col-span-3 text-xs text-gray-400">
                        {track.genre_name}
                      </div>

                      <div className="col-span-5 sm:col-span-2 flex items-center justify-end gap-3 text-xs text-gray-400">
                        <span className="font-mono text-[11px]">{formatTime(track.duration)}</span>
                        <button
                          onClick={() => {
                            removeTrackFromPlaylist(activePlaylist.id, track.id);
                            showToast(`Đã gỡ "${track.title}"`, 'info');
                          }}
                          className="p-1 hover:text-rose-400 text-gray-500 transition-colors"
                          title="Gỡ khỏi playlist"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="py-20 text-center text-gray-500">
          Chưa có playlist nào được chọn.
        </div>
      )}

      {/* Create Playlist Modal Dialog */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161922] border border-[#272d3e] rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#212635]">
              <h3 className="text-base font-bold text-white">Tạo Danh Sách Phát Mới</h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-full hover:bg-[#222736] text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNew} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">Tên danh sách phát *</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ví dụ: Nhạc Làm Việc Ban Đêm"
                  required
                  autoFocus
                  className="w-full bg-[#1b1f2b] border border-[#272d3e] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#2fd17b]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">Mô tả ngắn</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Ghi chú về thể loại hoặc cảm xúc của playlist..."
                  rows={3}
                  className="w-full bg-[#1b1f2b] border border-[#272d3e] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#2fd17b]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#202534] text-xs font-bold text-gray-300"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#2fd17b] hover:bg-[#28b86c] text-xs font-extrabold text-black shadow-brand-glow"
                >
                  Tạo Playlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
