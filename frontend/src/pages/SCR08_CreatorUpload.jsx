import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, Music, Mic, Image, FileAudio, CheckCircle2, 
  ArrowLeft, AlertCircle, Sparkles 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useMusic } from '../contexts/MusicContext';
import { ROUTES } from '../router/routes';

export const SCR08_CreatorUpload = () => {
  const navigate = useNavigate();
  const { currentUser, showToast } = useAuth();
  const { genres, creatorUploadTrack } = useMusic();

  const [trackType, setTrackType] = useState('music'); // 'music' | 'podcast'
  const [title, setTitle] = useState('');
  const [artistName, setArtistName] = useState(currentUser?.channel_name || currentUser?.username || '');
  const [genreId, setGenreId] = useState('1');
  const [lyrics, setLyrics] = useState('');
  const [description, setDescription] = useState('');
  const [audioFileName, setAudioFileName] = useState('');
  const [coverPreview, setCoverPreview] = useState('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Guard: Must be creator or admin
  if (!currentUser || (currentUser.role !== 'creator' && currentUser.role !== 'admin')) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto" />
        <h2 className="text-xl font-bold text-white">Quyền Truy Cập Bị Giới Hạn</h2>
        <p className="text-xs text-gray-400">
          Chỉ các tài khoản Nhà sáng tạo (Creator) đã được phê duyệt hoặc Admin mới có quyền tải lên tác phẩm.
        </p>
        <button
          onClick={() => navigate(ROUTES.PROFILE)}
          className="px-6 py-2.5 rounded-xl bg-[#2fd17b] text-black font-extrabold text-xs shadow-brand-glow"
        >
          Đến Trang Cá Nhân
        </button>
      </div>
    );
  }

  const handleSimulatedAudioDrop = (e) => {
    e.preventDefault();
    setAudioFileName('demo_track_audio_' + Date.now() + '.mp3');
    showToast('Đã nhận file âm thanh MP3 hợp lệ', 'info');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Vui lòng nhập tiêu đề tác phẩm', 'error');
      return;
    }

    setIsUploading(true);
    let prog = 0;
    const interval = setInterval(() => {
      prog += 25;
      setUploadProgress(prog);
      if (prog >= 100) {
        clearInterval(interval);
        creatorUploadTrack({
          title: title.trim(),
          artist_name: artistName || currentUser.channel_name || currentUser.username,
          track_type: trackType,
          genre_id: genreId,
          duration: 215,
          cover_image_path: coverPreview,
          audio_file_path: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          creator_id: currentUser.id,
          lyrics: trackType === 'music' ? lyrics : null,
          description: trackType === 'podcast' ? description : null,
        });
        setIsUploading(false);
        showToast('Tải lên tác phẩm thành công!', 'success');
        setCurrentScreen('SCR09'); // keep for now, navigate below
        navigate(ROUTES.CREATOR_STUDIO); // Redirect to Creator Studio per wireframe specs!
      }
    }, 250);
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#212635]">
        <div>
          <button
            onClick={() => navigate(ROUTES.CREATOR_STUDIO)}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại Creator Studio</span>
          </button>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Upload className="w-6 h-6 text-[#2fd17b]" />
            <span>Tải Lên Tác Phẩm Mới (SCR08 - Creator Upload)</span>
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Kênh: <strong className="text-white">{currentUser.channel_name || currentUser.username}</strong>
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Track Type Selector */}
        <div className="p-4 rounded-2xl bg-[#141720] border border-[#212634] space-y-2">
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
            1. Định dạng tác phẩm
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setTrackType('music')}
              className={`flex items-center justify-center gap-3 p-3.5 rounded-xl border text-xs font-bold transition-all
                ${trackType === 'music' 
                  ? 'bg-[#152e22] border-[#2fd17b] text-[#2fd17b] shadow-sm' 
                  : 'bg-[#1a1e28] border-[#262c3b] text-gray-400 hover:text-white'}`}
            >
              <Music className="w-5 h-5" />
              <span>Bài hát / Ca khúc (Music)</span>
            </button>

            <button
              type="button"
              onClick={() => setTrackType('podcast')}
              className={`flex items-center justify-center gap-3 p-3.5 rounded-xl border text-xs font-bold transition-all
                ${trackType === 'podcast' 
                  ? 'bg-purple-950/60 border-purple-500 text-purple-300 shadow-sm' 
                  : 'bg-[#1a1e28] border-[#262c3b] text-gray-400 hover:text-white'}`}
            >
              <Mic className="w-5 h-5" />
              <span>Tập Podcast / Talkshow</span>
            </button>
          </div>
        </div>

        {/* File Dropzones: Audio & Cover */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Audio Dropzone */}
          <div 
            onClick={handleSimulatedAudioDrop}
            className="p-6 rounded-2xl bg-[#141720] border-2 border-dashed border-[#293043] hover:border-[#2fd17b]/60 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-[#1e2330] flex items-center justify-center text-[#2fd17b] mb-3 group-hover:scale-110 transition-transform">
              <FileAudio className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-white">
              {audioFileName || 'Kéo thả hoặc nhấp chọn file Audio .MP3'}
            </p>
            <p className="text-[11px] text-gray-400 mt-1">Định dạng MP3, tối đa 30MB</p>
            {audioFileName && (
              <span className="mt-2 text-[10px] text-[#2fd17b] bg-[#142e22] px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Đã sẵn sàng tải lên
              </span>
            )}
          </div>

          {/* Cover Dropzone */}
          <div className="p-4 rounded-2xl bg-[#141720] border border-[#212634] flex items-center gap-4">
            <img 
              src={coverPreview} 
              alt="Preview" 
              className="w-20 h-20 rounded-xl object-cover border border-[#2a3040] shadow-md flex-shrink-0"
            />
            <div className="overflow-hidden flex-1 space-y-1">
              <p className="text-xs font-bold text-white">Ảnh bìa tác phẩm (1:1)</p>
              <p className="text-[10px] text-gray-400">Tỷ lệ vuông, định dạng JPG/PNG tối đa 5MB</p>
              <button
                type="button"
                onClick={() => setCoverPreview('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80')}
                className="text-[10px] text-[#2fd17b] hover:underline block pt-1"
              >
                [Đổi ảnh bìa mẫu khác]
              </button>
            </div>
          </div>
        </div>

        {/* Metadata inputs */}
        <div className="p-6 rounded-2xl bg-[#141720] border border-[#212634] space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Tiêu đề tác phẩm *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ví dụ: Chúng Ta Của Hiện Tại"
                maxLength={150}
                required
                className="w-full bg-[#1b1f2b] border border-[#272d3e] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#2fd17b]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Nghệ danh / Host kênh
              </label>
              <input
                type="text"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                placeholder="Tên hiển thị nghệ sĩ"
                className="w-full bg-[#1b1f2b] border border-[#272d3e] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#2fd17b]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Phân loại Thể loại
            </label>
            <select
              value={genreId}
              onChange={(e) => setGenreId(e.target.value)}
              className="w-full bg-[#1b1f2b] border border-[#272d3e] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#2fd17b]"
            >
              {genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          {/* Conditional field: Lyrics (Music) vs Show notes (Podcast) */}
          {trackType === 'music' ? (
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Lời bài hát (Lyrics)
              </label>
              <textarea
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                placeholder="Dán lời bài hát vào đây (mỗi câu một dòng để đồng bộ hiển thị)..."
                rows={5}
                className="w-full bg-[#1b1f2b] border border-[#272d3e] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#2fd17b]"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Mô tả tập & Mốc thời gian (Show Notes & Timestamps)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="[00:00] Giới thiệu khách mời&#10;[05:30] Chủ đề chính thảo luận..."
                rows={5}
                className="w-full bg-[#1b1f2b] border border-[#272d3e] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 font-mono"
              />
            </div>
          )}
        </div>

        {/* Upload progress bar if active */}
        {isUploading && (
          <div className="p-4 rounded-xl bg-[#181c26] border border-[#252b3a] space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-300">
              <span>Đang tải lên hệ thống SOUNDWAVE...</span>
              <span className="font-bold text-[#2fd17b]">{uploadProgress}%</span>
            </div>
            <div className="w-full h-2 bg-[#202534] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#2fd17b] transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(ROUTES.CREATOR_STUDIO)}
            className="px-5 py-2.5 rounded-xl bg-[#202534] hover:bg-[#282e3f] text-xs font-semibold text-gray-300 transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            disabled={isUploading}
            className="px-7 py-3 rounded-xl bg-[#2fd17b] hover:bg-[#28b86c] disabled:opacity-50 text-black font-extrabold text-xs shadow-brand-glow transition-all flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span>Tải Lên Tác Phẩm Ngay</span>
          </button>
        </div>
      </form>
    </div>
  );
};
