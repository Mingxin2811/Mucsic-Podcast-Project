import React, { useState } from 'react';
import { X, Plus, Check, FolderHeart, Music2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useMusic } from '../../contexts/MusicContext';

export const AddToPlaylistModal = () => {
  const { activeModal, modalPayload, closeModal, currentUser, openModal, showToast } = useAuth();
  const { playlists, addTrackToPlaylist, removeTrackFromPlaylist, createPlaylist } = useMusic();
  const [newTitle, setNewTitle] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  if (activeModal !== 'add-to-playlist' || !modalPayload) return null;

  const track = modalPayload;

  if (!currentUser) {
    return (
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-[#181b24] border border-[#272d3d] rounded-2xl p-6 max-w-sm w-full text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#1e2330] flex items-center justify-center mx-auto text-yellow-400">
            <FolderHeart className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Yêu cầu đăng nhập</h3>
          <p className="text-xs text-gray-400">
            Vui lòng đăng nhập tài khoản Người nghe để lưu bài hát <strong className="text-white">"{track.title}"</strong> vào playlist cá nhân.
          </p>
          <div className="flex gap-2">
            <button
              onClick={closeModal}
              className="flex-1 py-2 rounded-xl bg-[#202534] hover:bg-[#282e3f] text-sm text-gray-300"
            >
              Hủy
            </button>
            <button
              onClick={() => openModal('login')}
              className="flex-1 py-2 rounded-xl bg-[#2fd17b] hover:bg-[#26b86b] text-sm text-black font-semibold"
            >
              Đăng nhập ngay
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleToggle = (playlist) => {
    const isAdded = playlist.track_ids.includes(track.id);
    if (isAdded) {
      removeTrackFromPlaylist(playlist.id, track.id);
      showToast(`Đã gỡ "${track.title}" khỏi "${playlist.title}"`, 'info');
    } else {
      addTrackToPlaylist(playlist.id, track.id);
      showToast(`Đã thêm "${track.title}" vào "${playlist.title}"`, 'success');
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const pl = createPlaylist({ title: newTitle.trim() });
    addTrackToPlaylist(pl.id, track.id);
    showToast(`Đã tạo playlist "${pl.title}" và thêm bài hát!`, 'success');
    setNewTitle('');
    setShowCreateForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#161922] border border-[#272d3e] rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#212635]">
          <div className="flex items-center gap-3">
            <img 
              src={track.cover_image_path} 
              alt={track.title}
              className="w-11 h-11 rounded-xl object-cover border border-[#272d3e]" 
            />
            <div>
              <h3 className="font-bold text-white text-sm line-clamp-1">Thêm vào Playlist</h3>
              <p className="text-xs text-gray-400 line-clamp-1">{track.title} • {track.artist_name}</p>
            </div>
          </div>
          <button 
            onClick={closeModal}
            className="p-1.5 rounded-full hover:bg-[#222736] text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Playlists List */}
        <div className="py-4 space-y-2 max-h-60 overflow-y-auto">
          {playlists.length === 0 ? (
            <p className="text-xs text-center text-gray-500 py-6">Bạn chưa có playlist nào. Hãy tạo playlist mới bên dưới!</p>
          ) : (
            playlists.map((pl) => {
              const isAdded = pl.track_ids.includes(track.id);
              return (
                <div
                  key={pl.id}
                  onClick={() => handleToggle(pl)}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-200
                    ${isAdded 
                      ? 'bg-[#525252] border-[#686868] text-white' 
                      : 'bg-[#1b202c] border-[#242a3a] text-gray-300 hover:bg-[#202636]'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={pl.cover_image_path} 
                      alt={pl.title} 
                      className="w-9 h-9 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">{pl.title}</p>
                      <p className="text-[10px] text-gray-400">{pl.track_ids.length} bài hát</p>
                    </div>
                  </div>

                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border
                    ${isAdded ? 'bg-[#525252] border-[#686868] text-white' : 'border-gray-500'}`}
                  >
                    {isAdded && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Create new playlist toggle */}
        <div className="pt-3 border-t border-[#212635]">
          {showCreateForm ? (
            <form onSubmit={handleCreate} className="space-y-2">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Tên danh sách phát mới..."
                className="w-full bg-[#1a1f2b] border border-[#2b3245] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#2fd17b]"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 py-1.5 rounded-lg bg-[#202534] text-xs text-gray-300"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-1.5 rounded-lg bg-[#2fd17b] hover:bg-[#28b86c] text-xs font-bold text-black"
                >
                  Tạo & Thêm
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setShowCreateForm(true)}
              className="w-full py-2.5 rounded-xl border border-dashed border-[#2fd17b]/40 hover:bg-[#152a20] text-[#2fd17b] text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Tạo danh sách phát mới</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
