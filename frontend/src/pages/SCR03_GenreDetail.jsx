import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, Shuffle, Heart, Plus, Disc, Music, Mic } from 'lucide-react';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';
import { useMusic } from '../contexts/MusicContext';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES, buildPath } from '../router/routes';

export const SCR03_GenreDetail = ({ genreSlug }) => {
  const navigate = useNavigate();
  const { currentTrack, playTrack, togglePlay, formatTime } = useAudioPlayer();
  const { tracks, genres, getGenreBySlug, isFavorite, toggleFavorite } = useMusic();
  const { openModal, currentUser } = useAuth();
  const [filterType, setFilterType] = useState('all');

  const genre = getGenreBySlug(genreSlug) || genres[0];

  // Tracks belonging to this genre (not deleted)
  const genreTracks = tracks
    .filter(t => !t.deleted_at && t.genre_id === genre?.id)
    .filter(t => filterType === 'all' || t.track_type === filterType);

  const totalPlays = genreTracks.reduce((acc, cur) => acc + cur.play_count, 0);

  const handlePlayAll = (shuffle = false) => {
    if (!genreTracks.length) return;
    let list = [...genreTracks];
    if (shuffle) list.sort(() => Math.random() - 0.5);
    playTrack(list[0], list);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumb & Back Navigation */}
      <div className="flex items-center gap-3 text-xs text-gray-400">
        <button
          onClick={() => navigate(ROUTES.HOME)}
          className="flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Quay lại Trang chủ</span>
        </button>
        <span>/</span>
        <span className="text-gray-300">Thể loại</span>
        <span>/</span>
        <span className="text-[#2fd17b] font-semibold">{genre?.name}</span>
      </div>

      {/* Genre Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#171a24] to-[#11131a] border border-[#242938] p-8 shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 pointer-events-none">
          <img src={genre?.cover} alt={genre?.name} className="w-full h-full object-cover filter blur-xs" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#171a24] to-transparent" />
        </div>

        <div className="relative z-10 max-w-xl">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#2fd17b] bg-[#142e22] px-3 py-1 rounded-full border border-[#2fd17b]/30">
            KHÁM PHÁ THỂ LOẠI
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            {genre?.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-2 leading-relaxed">
            {genre?.description}
          </p>

          <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
            <span>{genreTracks.length} tác phẩm</span>
            <span>•</span>
            <span>{totalPlays.toLocaleString('vi-VN')} tổng lượt phát</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={() => handlePlayAll(false)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2fd17b] hover:bg-[#28b86c] text-black font-extrabold text-xs shadow-brand-glow transition-all"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>Phát tất cả</span>
            </button>
            <button
              onClick={() => handlePlayAll(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1d2230] hover:bg-[#242a3a] border border-[#2a3042] text-gray-300 font-semibold text-xs transition-colors"
            >
              <Shuffle className="w-4 h-4" />
              <span>Xáo trộn</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-[#212635] pb-3">
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors
              ${filterType === 'all' ? 'bg-[#525252] text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Tất cả ({genreTracks.length})
          </button>
          <button
            onClick={() => setFilterType('music')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors
              ${filterType === 'music' ? 'bg-[#525252] text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Bài hát
          </button>
          <button
            onClick={() => setFilterType('podcast')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors
              ${filterType === 'podcast' ? 'bg-[#525252] text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Podcast
          </button>
        </div>
      </div>

      {/* Tracks List */}
      <div className="bg-[#141720] border border-[#212634] rounded-2xl overflow-hidden">
        {genreTracks.length === 0 ? (
          <div className="py-12 text-center text-gray-500 text-xs">
            Hiện chưa có tác phẩm nào trong thể loại này.
          </div>
        ) : (
          <div className="divide-y divide-[#1b202c]">
            {genreTracks.map((track, idx) => {
              const isCurrent = currentTrack?.id === track.id;
              return (
                <div
                  key={track.id}
                  className={`grid grid-cols-12 items-center px-5 py-3 hover:bg-[#1a1e29] transition-colors group
                    ${isCurrent ? 'bg-[#525252]/40' : ''}`}
                >
                  <div className="col-span-1 text-xs text-gray-500 font-bold">
                    {idx + 1}
                  </div>

                  <div className="col-span-7 flex items-center gap-3 overflow-hidden">
                    <img 
                      src={track.cover_image_path} 
                      alt={track.title} 
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="overflow-hidden">
                      <p 
                        onClick={() => navigate(buildPath(ROUTES.TRACK_DETAIL, { id: track.id }))}
                        className={`text-xs font-bold truncate cursor-pointer hover:underline
                          ${isCurrent ? 'text-[#2fd17b]' : 'text-white'}`}
                      >
                        {track.title}
                      </p>
                      <p className="text-[11px] text-gray-400 truncate">{track.artist_name}</p>
                    </div>
                  </div>

                  <div className="col-span-4 flex items-center justify-end gap-3 text-xs text-gray-400">
                    <button
                      onClick={() => playTrack(track, genreTracks)}
                      className="p-1.5 text-gray-300 hover:text-[#2fd17b]"
                      title="Phát bài này"
                    >
                      <Play className="w-4 h-4 fill-current" />
                    </button>
                    <button
                      onClick={() => currentUser ? toggleFavorite(track.id) : openModal('login')}
                      className="p-1.5 hover:text-rose-400"
                    >
                      <Heart className={`w-4 h-4 ${isFavorite(track.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                    <button
                      onClick={() => openModal('add-to-playlist', track)}
                      className="p-1.5 hover:text-[#2fd17b]"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-[11px] w-10 text-right">
                      {formatTime(track.duration)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Switch to Other Genres */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
          Khám phá thêm các thể loại khác
        </p>
        <div className="flex flex-wrap gap-2">
          {genres.filter(g => g.slug !== genreSlug).map((g) => (
            <button
              key={g.id}
            onClick={() => navigate(buildPath(ROUTES.GENRE_DETAIL, { slug: g.slug }))}
              className="px-3.5 py-1.5 rounded-xl bg-[#181c26] hover:bg-[#202534] border border-[#252b3b] text-xs text-gray-300 hover:text-white transition-colors"
            >
              {g.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
