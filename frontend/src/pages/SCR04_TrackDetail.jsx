import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, Pause, Heart, Plus, Share2, Clock, 
  Calendar, Disc, Mic, ChevronLeft, Volume2, Sparkles 
} from 'lucide-react';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';
import { useMusic } from '../contexts/MusicContext';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES, buildPath } from '../router/routes';

export const SCR04_TrackDetail = ({ trackId }) => {
  const navigate = useNavigate();
  const { currentTrack, isPlaying, togglePlay, playTrack, seek, formatTime } = useAudioPlayer();
  const { tracks, getTrackById, isFavorite, toggleFavorite } = useMusic();
  const { openModal, currentUser } = useAuth();

  const track = getTrackById(trackId) || currentTrack || tracks[0];
  const isCurrentPlaying = currentTrack?.id === track.id && isPlaying;
  const isPodcast = track.track_type === 'podcast';

  // Related tracks from same genre or artist
  const relatedTracks = tracks
    .filter(t => !t.deleted_at && t.id !== track.id && (t.genre_id === track.genre_id || t.creator_id === track.creator_id))
    .slice(0, 4);

  return (
    <div className="space-y-8 pb-16">
      {/* Back button */}
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <button
          onClick={() => navigate(ROUTES.HOME)}
          className="flex items-center gap-1 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Quay lại Khám phá</span>
        </button>
        <span>/</span>
        <span className="text-gray-300">Không gian thưởng thức</span>
      </div>

      {/* Main Track Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-end gap-6 bg-[#151822] border border-[#242938] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2fd17b]/10 rounded-full filter blur-3xl pointer-events-none" />

        {/* 1:1 Cover Artwork */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-2xl border border-[#2b3245] flex-shrink-0 group">
          <img 
            src={track.cover_image_path} 
            alt={track.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {isCurrentPlaying && (
            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-[#2fd17b]/40">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2fd17b] animate-ping" />
              <span className="text-[10px] text-[#2fd17b] font-bold">Đang phát</span>
            </div>
          )}
        </div>

        {/* Info Column */}
        <div className="flex-1 space-y-3 z-10">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border
              ${isPodcast 
                ? 'bg-purple-950/80 text-purple-300 border-purple-500/30' 
                : 'bg-[#142e22] text-[#2fd17b] border-[#2fd17b]/30'}`}
            >
              {isPodcast ? 'TẬP PODCAST' : 'BÀI HÁT CHÍNH THỨC'}
            </span>
            <span className="text-xs text-gray-400 bg-[#1c212e] px-2.5 py-0.5 rounded-full">
              {track.genre_name}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {track.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-300 pt-1">
            <span className="font-semibold text-white">{track.artist_name}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-gray-400">
              <Clock className="w-3.5 h-3.5" /> {formatTime(track.duration)}
            </span>
            <span>•</span>
            <span className="text-gray-400 font-mono">
              {track.play_count.toLocaleString('vi-VN')} lượt nghe
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => {
                if (currentTrack?.id === track.id) {
                  togglePlay();
                } else {
                  playTrack(track, tracks);
                }
              }}
              className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-[#2fd17b] hover:bg-[#28b86c] text-black font-extrabold text-sm shadow-brand-glow transition-all hover:scale-105 active:scale-95"
            >
              {isCurrentPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-black" />
                  <span>Tạm dừng</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-black ml-0.5" />
                  <span>Phát ngay</span>
                </>
              )}
            </button>

            <button
              onClick={() => openModal('add-to-playlist', track)}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#1f2433] hover:bg-[#272d40] border border-[#2c3347] text-white font-semibold text-xs transition-colors"
            >
              <Plus className="w-4 h-4 text-[#2fd17b]" />
              <span>Thêm vào Playlist [+]</span>
            </button>

            <button
              onClick={() => currentUser ? toggleFavorite(track.id) : openModal('login')}
              className={`p-3 rounded-2xl border transition-colors
                ${isFavorite(track.id) 
                  ? 'bg-rose-950/40 border-rose-500/40 text-rose-400' 
                  : 'bg-[#1f2433] border-[#2c3347] text-gray-400 hover:text-white'}`}
              title="Yêu thích"
            >
              <Heart className={`w-4 h-4 ${isFavorite(track.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Two Columns: Lyrics/Show notes on Left, Recommendations on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lyrics or Show notes Container */}
        <div className="lg:col-span-2 bg-[#141720] border border-[#212634] rounded-3xl p-6 sm:p-8 shadow-md">
          <div className="flex items-center justify-between pb-4 border-b border-[#1f2433] mb-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              {isPodcast ? <Mic className="w-5 h-5 text-purple-400" /> : <Disc className="w-5 h-5 text-[#2fd17b]" />}
              <span>{isPodcast ? 'Tóm Tắt & Mốc Thời Gian (Show Notes)' : 'Lời Bài Hát Đồng Bộ (Lyrics)'}</span>
            </h3>
            <span className="text-xs text-gray-500 font-mono">Bản quyền SOUNDWAVE Media</span>
          </div>

          {isPodcast ? (
            <div className="space-y-4">
              {track.description ? (
                track.description.split('\n').map((line, idx) => {
                  const match = line.match(/\[(\d{2}):(\d{2})\]/);
                  if (match) {
                    const minutes = parseInt(match[1], 10);
                    const seconds = parseInt(match[2], 10);
                    const totalSecs = minutes * 60 + seconds;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          if (currentTrack?.id !== track.id) playTrack(track);
                          seek(totalSecs);
                        }}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#1a1f2c] cursor-pointer group transition-colors border border-transparent hover:border-[#2b3345]"
                      >
                        <span className="font-mono text-xs font-bold text-purple-300 bg-purple-950 px-2.5 py-1 rounded-lg border border-purple-500/30 flex items-center gap-1 group-hover:scale-105 transition-transform flex-shrink-0">
                          <Play className="w-3 h-3 fill-current" /> {match[0]}
                        </span>
                        <p className="text-xs sm:text-sm text-gray-200 group-hover:text-white leading-relaxed pt-0.5">
                          {line.replace(match[0], '').trim()}
                        </p>
                      </div>
                    );
                  }
                  return (
                    <p key={idx} className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {line}
                    </p>
                  );
                })
              ) : (
                <p className="text-xs text-gray-500 italic">Chưa có thông tin show notes.</p>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {track.lyrics ? (
                track.lyrics.split('\n\n').map((verse, vIdx) => (
                  <div key={vIdx} className="space-y-2">
                    {verse.split('\n').map((l, lIdx) => (
                      <p 
                        key={lIdx}
                        className="text-base sm:text-lg font-medium text-gray-300 hover:text-[#2fd17b] transition-colors leading-relaxed cursor-default"
                      >
                        {l}
                      </p>
                    ))}
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-gray-500 text-xs italic">
                  Lời bài hát chưa được cập nhật cho tác phẩm này.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Recommendations */}
        <div className="space-y-4">
          <div className="bg-[#141720] border border-[#212634] rounded-3xl p-6 shadow-md">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Gợi Ý Cùng Thể Loại
            </h3>

            <div className="space-y-3">
              {relatedTracks.map((relTrack) => (
                <div
                  key={relTrack.id}
                  onClick={() => navigate(buildPath(ROUTES.TRACK_DETAIL, { id: relTrack.id }))}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#1a1f2c] cursor-pointer group transition-colors"
                >
                  <img 
                    src={relTrack.cover_image_path} 
                    alt={relTrack.title} 
                    className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="overflow-hidden flex-1">
                    <p className="text-xs font-bold text-white group-hover:text-[#2fd17b] truncate transition-colors">
                      {relTrack.title}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">{relTrack.artist_name}</p>
                    <p className="text-[10px] text-gray-500 font-mono mt-0.5">{formatTime(relTrack.duration)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
