import React from 'react';
import { Heart, Play, Pause, Music2, Share2, Sparkles } from 'lucide-react';
import { useAudioPlayer } from '../../contexts/AudioPlayerContext';
import { useMusic } from '../../contexts/MusicContext';
import { useAuth } from '../../contexts/AuthContext';

export const CuratedPanel = () => {
  const { currentTrack, isPlaying, togglePlay, playTrack, formatTime } = useAudioPlayer();
  const { tracks, isFavorite, toggleFavorite } = useMusic();
  const { currentUser, openModal } = useAuth();

  // Curated spotlight album matching template image (White Lies or Featured Artist)
  const curatedAlbum = {
    title: 'Big TV - Soundwave Spotlight',
    artist: 'White Lies & Friends',
    tag: 'CURATED ALBUM',
    description: 'Trải nghiệm trọn vẹn những cung bậc cảm xúc sống động qua từng giai điệu được tuyển chọn kỹ lưỡng.',
    likes: '456k',
    totalTracks: 8,
    cover: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&q=80',
  };

  // Curated track list (matching right column in template image)
  const curatedTracks = tracks.slice(0, 6);

  return (
    <aside className="w-80 h-screen flex-shrink-0 bg-[#12141a] border-l border-[#1e222d] hidden xl:flex flex-col p-5 overflow-y-auto select-none">
      {/* Curated Album Header Card */}
      <div className="relative rounded-2xl overflow-hidden bg-[#181b24] border border-[#242938] p-3 shadow-lg group">
        <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
          <img 
            src={curatedAlbum.cover} 
            alt={curatedAlbum.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#2fd17b] bg-black/60 px-2 py-0.5 rounded-full border border-[#2fd17b]/30">
              {curatedAlbum.tag}
            </span>
          </div>
        </div>

        <div>
          <h3 className="font-extrabold text-base text-white tracking-tight leading-snug">
            {curatedAlbum.title}
          </h3>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
            {curatedAlbum.description}
          </p>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#232735] text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => currentUser ? toggleFavorite(curatedTracks[0]?.id) : openModal('login')}
                className="p-1 rounded-full hover:bg-[#202534] text-gray-400 hover:text-rose-400 transition-colors"
              >
                <Heart className={`w-4 h-4 ${isFavorite(curatedTracks[0]?.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
              <span>{curatedAlbum.likes} Lượt thích</span>
            </div>
            <span>{curatedTracks.length} Tác phẩm</span>
          </div>
        </div>
      </div>

      {/* Playlist Tracks list inside Side Panel */}
      <div className="mt-5 flex-1">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Danh sách tuyển chọn
          </span>
          <span className="text-[10px] text-[#2fd17b] font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Auto Queue
          </span>
        </div>

        <div className="space-y-1.5">
          {curatedTracks.map((track) => {
            const isCurrent = currentTrack?.id === track.id;
            return (
              <div
                key={track.id}
                onClick={() => playTrack(track, tracks)}
                className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all duration-200 group
                  ${isCurrent 
                    ? 'bg-[#525252] border border-[#686868]' 
                    : 'hover:bg-[#191c25]'
                  }`}
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  {/* Thumbnail / Animated Soundwave icon */}
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-[#212532]">
                    <img 
                      src={track.cover_image_path} 
                      alt={track.title} 
                      className="w-full h-full object-cover"
                    />
                    {isCurrent && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-0.5">
                        <span className="w-1 bg-[#2fd17b] rounded-full animate-soundwave-1" />
                        <span className="w-1 bg-[#2fd17b] rounded-full animate-soundwave-2" />
                        <span className="w-1 bg-[#2fd17b] rounded-full animate-soundwave-3" />
                      </div>
                    )}
                  </div>

                  <div className="overflow-hidden">
                    <p className={`text-xs font-semibold truncate ${isCurrent ? 'text-[#2fd17b]' : 'text-white'}`}>
                      {track.title}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate">
                      {track.artist_name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 pl-2">
                  <span className="text-[11px] text-gray-400 font-mono">
                    {formatTime(track.duration)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
