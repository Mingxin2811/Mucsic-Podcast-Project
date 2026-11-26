import React, { useState } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, 
  Volume2, VolumeX, Heart, Plus, FileText, RotateCcw, 
  RotateCw
} from 'lucide-react';
import { useAudioPlayer } from '../../contexts/AudioPlayerContext';
import { useMusic } from '../../contexts/MusicContext';
import { useAuth } from '../../contexts/AuthContext';

export const PersistentPlayer = ({ onOpenTrackDetail }) => {
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    playbackRate,
    isShuffle,
    isRepeat,
    togglePlay,
    seek,
    skip15,
    setVolume,
    toggleMute,
    setSpeed,
    toggleShuffle,
    toggleRepeat,
    playNext,
    playPrev,
    formatTime,
    setShowLyricsModal,
  } = useAudioPlayer();

  const { isFavorite, toggleFavorite } = useMusic();
  const { openModal, currentUser } = useAuth();

  if (!currentTrack) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const isPodcast = currentTrack.track_type === 'podcast';

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-24 bg-[#0d0f14]/95 backdrop-blur-xl border-t border-[#1f2430] z-40 px-6 flex items-center justify-between shadow-player select-none">
      {/* Left: Track Information */}
      <div className="flex items-center gap-3.5 w-1/4 min-w-[200px]">
        <div 
          onClick={() => onOpenTrackDetail && onOpenTrackDetail(currentTrack.id)}
          className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#1e222d] border border-[#2a3040] flex-shrink-0 cursor-pointer group shadow-md"
        >
          <img 
            src={currentTrack.cover_image_path} 
            alt={currentTrack.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-[10px] text-white font-bold bg-black/60 px-1 rounded">Xem</span>
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="flex items-center gap-2">
            <h4 
              onClick={() => onOpenTrackDetail && onOpenTrackDetail(currentTrack.id)}
              className="text-sm font-bold text-white hover:text-[#2fd17b] truncate cursor-pointer transition-colors"
              title={currentTrack.title}
            >
              {currentTrack.title}
            </h4>
            {isPodcast && (
              <span className="text-[9px] bg-purple-950/80 text-purple-300 border border-purple-500/30 px-1.5 py-0.2 rounded-full font-semibold flex-shrink-0">
                PODCAST
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 truncate mt-0.5">
            {currentTrack.artist_name} {currentTrack.genre_name ? `• ${currentTrack.genre_name}` : ''}
          </p>
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => currentUser ? toggleFavorite(currentTrack.id) : openModal('login')}
          className="p-2 text-gray-400 hover:text-rose-400 transition-colors ml-1"
          title={isFavorite(currentTrack.id) ? 'Bỏ thích' : 'Yêu thích'}
        >
          <Heart className={`w-4 h-4 ${isFavorite(currentTrack.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      {/* Center: Playback Controls & Scrubber */}
      <div className="flex flex-col items-center justify-center flex-1 max-w-2xl px-4">
        {/* Control Buttons */}
        <div className="flex items-center gap-4 mb-2">
          {/* Shuffle */}
          <button
            onClick={toggleShuffle}
            title="Bật/Tắt phát ngẫu nhiên"
            className={`p-1.5 rounded-full transition-colors ${isShuffle ? 'text-[#2fd17b]' : 'text-gray-400 hover:text-white'}`}
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <button
            onClick={() => skip15(-15)}
            title="Lùi lại 15 giây"
            aria-label="Lùi lại 15 giây"
            className="p-1.5 text-gray-300 hover:text-white transition-colors flex items-center text-xs font-semibold"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-[10px] ml-0.5">15s</span>
          </button>

          {/* Prev Track */}
          <button
            onClick={playPrev}
            title="Bài trước đó"
            className="p-1.5 text-gray-300 hover:text-white transition-colors"
          >
            <SkipBack className="w-5 h-5 fill-current" />
          </button>

          {/* Play / Pause Main Button (White/Green circle button from template) */}
          <button
            onClick={togglePlay}
            title={isPlaying ? 'Tạm dừng' : 'Phát'}
            className="w-10 h-10 rounded-full bg-white hover:bg-[#2fd17b] text-black flex items-center justify-center shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-black" />
            ) : (
              <Play className="w-5 h-5 fill-black ml-0.5" />
            )}
          </button>

          {/* Next Track */}
          <button
            onClick={playNext}
            title="Bài tiếp theo"
            className="p-1.5 text-gray-300 hover:text-white transition-colors"
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </button>

          <button
            onClick={() => skip15(15)}
            title="Tua tới 15 giây"
            aria-label="Tua tới 15 giây"
            className="p-1.5 text-gray-300 hover:text-white transition-colors flex items-center text-xs font-semibold"
          >
            <RotateCw className="w-4 h-4" />
            <span className="text-[10px] ml-0.5">15s</span>
          </button>

          {/* Repeat */}
          <button
            onClick={toggleRepeat}
            title="Lặp lại bài hát"
            className={`p-1.5 rounded-full transition-colors ${isRepeat ? 'text-[#2fd17b]' : 'text-gray-400 hover:text-white'}`}
          >
            <Repeat className="w-4 h-4" />
          </button>

        </div>

        {/* Scrubber Progress Bar */}
        <div className="w-full flex items-center gap-3">
          <span className="text-xs font-mono text-gray-400 w-10 text-right">
            {formatTime(currentTime)}
          </span>

          <div className="relative flex-1 flex items-center group cursor-pointer">
            {/* Custom Background Track */}
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={(e) => seek(Number(e.target.value))}
              className="w-full h-1 bg-[#262b3a] rounded-lg appearance-none cursor-pointer focus:outline-none"
              style={{
                background: `linear-gradient(to right, #2fd17b 0%, #2fd17b ${progressPercent}%, #262b3a ${progressPercent}%, #262b3a 100%)`
              }}
            />
          </div>

          <span className="text-xs font-mono text-gray-400 w-10 text-left">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Right: Actions, Lyrics, Add Playlist, Volume */}
      <div className="flex items-center justify-end gap-3 w-1/4 min-w-[200px]">
        {/* Lyrics Button */}
        <button
          onClick={() => setShowLyricsModal(true)}
          title="Lời bài hát & Show notes"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#181c26] hover:bg-[#222736] border border-[#262c3d] text-xs font-medium text-gray-300 hover:text-[#2fd17b] transition-colors"
        >
          <FileText className="w-3.5 h-3.5 text-[#2fd17b]" />
          <span>Lời bài hát</span>
        </button>

        {/* Add to Playlist Button [+] */}
        <button
          onClick={() => openModal('add-to-playlist', currentTrack)}
          title="Thêm vào danh sách phát [+]"
          className="p-2 text-gray-400 hover:text-[#2fd17b] hover:bg-[#1c212e] rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* Volume Controls */}
        <div className="relative flex items-center gap-2">
          <button
            onClick={() => setShowSpeedOptions((open) => !open)}
            title="Điều chỉnh tốc độ phát"
            aria-label="Điều chỉnh tốc độ phát"
            aria-expanded={showSpeedOptions}
            className="px-2 py-1 rounded-lg bg-[#181c26] border border-[#262c3d] text-[11px] font-bold text-gray-300 hover:text-[#2fd17b] hover:border-[#2fd17b]/50 transition-colors"
          >
            {playbackRate}x
          </button>
          {showSpeedOptions && (
            <div className="absolute right-full mr-2 bottom-0 z-50 flex items-center gap-1 p-1.5 rounded-xl bg-[#161922] border border-[#2b3245] shadow-xl" role="group" aria-label="Chọn tốc độ phát">
              {[0.5, 1, 1.25, 1.5].map((speed) => (
                <button
                  key={speed}
                  onClick={() => { setSpeed(speed); setShowSpeedOptions(false); }}
                  aria-pressed={playbackRate === speed}
                  className={`text-[11px] font-bold px-2 py-1 rounded-lg whitespace-nowrap ${playbackRate === speed ? 'bg-[#525252] text-white' : 'text-gray-300 hover:bg-[#252b3a] hover:text-white'}`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          )}
          <button
            onClick={toggleMute}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 h-1 bg-[#262b3a] rounded-lg cursor-pointer"
            style={{
              background: `linear-gradient(to right, #2fd17b 0%, #2fd17b ${(isMuted ? 0 : volume) * 100}%, #262b3a ${(isMuted ? 0 : volume) * 100}%, #262b3a 100%)`
            }}
          />
        </div>
      </div>
    </footer>
  );
};
