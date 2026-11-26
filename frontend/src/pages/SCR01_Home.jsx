import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, Pause, Heart, Plus, Sparkles, CheckCircle2, 
  TrendingUp, Radio, Calendar, MapPin, Disc, ChevronRight 
} from 'lucide-react';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';
import { useMusic } from '../contexts/MusicContext';
import { useAuth } from '../contexts/AuthContext';
import { TOUR_ITEMS } from '../mockData';
import { ROUTES, buildPath } from '../router/routes';

export const SCR01_Home = () => {
  const navigate = useNavigate();
  const { currentTrack, isPlaying, togglePlay, playTrack, formatTime } = useAudioPlayer();
  const { tracks, genres, isFavorite, toggleFavorite } = useMusic();
  const { openModal, currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'music' | 'podcast'

  // Filter non-deleted tracks
  const activeTracks = tracks.filter(t => !t.deleted_at);

  // Hero Spotlight Track (Featured track #1 or #8)
  const heroTrack = activeTracks.find(t => t.id === 1) || activeTracks[0];
  const isHeroPlaying = currentTrack?.id === heroTrack?.id && isPlaying;

  // Filtered tracks for Trending section
  const trendingTracks = activeTracks
    .filter(t => activeTab === 'all' || t.track_type === activeTab)
    .sort((a, b) => b.play_count - a.play_count)
    .slice(0, 8);

  const handleTrackClick = (track) => {
    navigate(buildPath(ROUTES.TRACK_DETAIL, { id: track.id }));
  };

  const handleGenreClick = (slug) => {
    navigate(buildPath(ROUTES.GENRE_DETAIL, { slug }));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. HERO SPOTLIGHT BANNER (Matching the template image layout!) */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#171b24] via-[#1a1f2b] to-[#12151c] border border-[#242b3b] shadow-2xl p-8 lg:p-10">
        {/* Background artwork with dark gradient overlay */}
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src={heroTrack.cover_image_path} 
            alt={heroTrack.title}
            className="w-full h-full object-cover object-center filter blur-xs"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1015] via-[#0e1015]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl">
          {/* Verified Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-[#2fd17b] bg-[#142e22]/90 border border-[#2fd17b]/30 px-3 py-1 rounded-full backdrop-blur-md">
              <CheckCircle2 className="w-3.5 h-3.5" /> Nghệ sĩ xác minh • Nổi bật trong tuần
            </span>
            <span className="text-xs text-gray-400 font-mono">
              Hơn {heroTrack.play_count.toLocaleString('vi-VN')} lượt nghe
            </span>
          </div>

          {/* Title & Artist */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {heroTrack.artist_name}
          </h1>
          <p className="text-lg sm:text-xl font-medium text-gray-200 mt-2">
            {heroTrack.title}
          </p>
          <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-lg line-clamp-2 leading-relaxed">
            {heroTrack.lyrics ? heroTrack.lyrics.substring(0, 110) + '...' : 'Tác phẩm đang đứng đầu danh sách thịnh hành tuần này trên SOUNDWAVE.'}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-6">
            <button
              onClick={() => {
                if (currentTrack?.id === heroTrack.id) {
                  togglePlay();
                } else {
                  playTrack(heroTrack, activeTracks);
                }
              }}
              className="flex items-center gap-2.5 px-7 py-3 rounded-2xl bg-[#2fd17b] hover:bg-[#28b86c] text-black font-extrabold text-sm shadow-brand-glow transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {isHeroPlaying ? (
                <>
                  <Pause className="w-5 h-5 fill-black" />
                  <span>Tạm dừng</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-black" />
                  <span>Phát ngay</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleTrackClick(heroTrack)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#1d2230]/80 hover:bg-[#252b3d] border border-[#2b3345] text-white font-semibold text-sm backdrop-blur-sm transition-all"
            >
              <span>Xem chi tiết & Lời bài hát</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. CURRENTLY ON TOUR / EVENTS */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white tracking-tight">Sự kiện & Tour diễn độc quyền</h2>
          <span className="text-xs text-gray-400 hover:text-white cursor-pointer transition-colors">Xem tất cả</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TOUR_ITEMS.map((item, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-4 p-4 rounded-2xl bg-[#161922] hover:bg-[#1a1e29] border border-[#242938] transition-all group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-xl bg-[#202534] border border-[#2b3345] flex flex-col items-center justify-center text-center p-2 flex-shrink-0 group-hover:border-[#2fd17b]/40 transition-colors">
                <span className="text-[10px] font-bold text-[#2fd17b] uppercase">{item.date.split(' ')[0]}</span>
                <span className="text-xs font-extrabold text-white">{item.date.split(' ')[1]} {item.date.split(' ')[2]}</span>
              </div>
              <div className="overflow-hidden">
                <h4 className="text-sm font-bold text-white group-hover:text-[#2fd17b] transition-colors truncate">{item.city}</h4>
                <p className="text-xs text-gray-400 truncate">{item.title}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{item.time} • {item.venue}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TRENDING & POPULAR SECTION */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#2fd17b]" />
              <span>Bảng Xếp Hạng Thịnh Hành (Trending Top)</span>
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">Các tác phẩm được nghe nhiều nhất tuần này</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#161922] border border-[#242938] self-start">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                ${activeTab === 'all' ? 'bg-[#525252] text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setActiveTab('music')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                ${activeTab === 'music' ? 'bg-[#525252] text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              Nhạc Hot
            </button>
            <button
              onClick={() => setActiveTab('podcast')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                ${activeTab === 'podcast' ? 'bg-[#525252] text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              Podcast Hot
            </button>
          </div>
        </div>

        {/* Tracks Table */}
        <div className="bg-[#141720] border border-[#212634] rounded-2xl overflow-hidden shadow-md">
          {/* Table Header */}
          <div className="grid grid-cols-12 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-500 border-b border-[#1f2433]">
            <span className="col-span-1 text-center">#</span>
            <span className="col-span-6 sm:col-span-5">Tiêu đề tác phẩm</span>
            <span className="hidden sm:block sm:col-span-4">Thể loại / Kênh</span>
            <span className="col-span-5 sm:col-span-2 text-right">Thời lượng & Thao tác</span>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-[#1b202c]">
            {trendingTracks.map((track, idx) => {
              const isCurrent = currentTrack?.id === track.id;
              const isItemPlaying = isCurrent && isPlaying;

              return (
                <div
                  key={track.id}
                  className={`grid grid-cols-12 items-center px-5 py-3.5 hover:bg-[#1a1e29] transition-colors group
                    ${isCurrent ? 'bg-[#525252]/40' : ''}`}
                >
                  {/* # Index or Play button */}
                  <div className="col-span-1 flex items-center justify-center">
                    <button
                      onClick={() => {
                        if (isCurrent) togglePlay();
                        else playTrack(track, activeTracks);
                      }}
                      className="text-xs font-bold text-gray-400 group-hover:text-white flex items-center justify-center"
                    >
                      <span className="group-hover:hidden">{idx + 1}</span>
                      <Play className="w-4 h-4 text-[#2fd17b] fill-current hidden group-hover:block" />
                    </button>
                  </div>

                  {/* Title & Cover & Artist */}
                  <div className="col-span-6 sm:col-span-5 flex items-center gap-3.5 overflow-hidden pr-2">
                    <img 
                      src={track.cover_image_path} 
                      alt={track.title} 
                      className="w-11 h-11 rounded-xl object-cover border border-[#262c3b] flex-shrink-0 cursor-pointer"
                      onClick={() => handleTrackClick(track)}
                    />
                    <div className="overflow-hidden">
                      <p 
                        onClick={() => handleTrackClick(track)}
                        className={`text-sm font-bold truncate cursor-pointer hover:underline
                          ${isCurrent ? 'text-[#2fd17b]' : 'text-white'}`}
                      >
                        {track.title}
                      </p>
                      <p className="text-xs text-gray-400 truncate mt-0.5">
                        {track.artist_name}
                      </p>
                    </div>
                  </div>

                  {/* Genre / Channel */}
                  <div className="hidden sm:flex sm:col-span-4 items-center gap-2">
                    <span 
                      onClick={() => handleGenreClick(track.genre_slug)}
                      className="text-xs text-gray-300 bg-[#1c212e] hover:bg-[#252c3e] px-2.5 py-1 rounded-lg border border-[#272d3e] cursor-pointer transition-colors"
                    >
                      {track.genre_name}
                    </span>
                    {track.track_type === 'podcast' && (
                      <span className="text-[10px] text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded font-semibold border border-purple-500/20">
                        Podcast
                      </span>
                    )}
                  </div>

                  {/* Duration, Favorite, Add to Playlist */}
                  <div className="col-span-5 sm:col-span-2 flex items-center justify-end gap-2.5 text-xs text-gray-400">
                    <button
                      onClick={() => currentUser ? toggleFavorite(track.id) : openModal('login')}
                      className="p-1.5 hover:text-rose-400 transition-colors"
                      title="Yêu thích"
                    >
                      <Heart className={`w-4 h-4 ${isFavorite(track.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>

                    <button
                      onClick={() => openModal('add-to-playlist', track)}
                      className="p-1.5 hover:text-[#2fd17b] transition-colors"
                      title="Thêm vào playlist [+]"
                    >
                      <Plus className="w-4 h-4" />
                    </button>

                    <span className="font-mono text-gray-400 w-12 text-right">
                      {formatTime(track.duration)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. GENRES EXPLORE ROW */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Disc className="w-5 h-5 text-[#2fd17b]" />
            <span>Khám Phá Các Thể Loại Nổi Bật</span>
          </h2>
          <span className="text-xs text-gray-400 hover:text-white cursor-pointer">Xem tất cả</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {genres.slice(0, 6).map((genre) => (
            <div
              key={genre.id}
              onClick={() => handleGenreClick(genre.slug)}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group border border-[#242a3a] shadow-md"
            >
              <img 
                src={genre.cover} 
                alt={genre.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-3">
                <h4 className="font-bold text-white text-xs group-hover:text-[#2fd17b] transition-colors">
                  {genre.name}
                </h4>
                <p className="text-[10px] text-gray-400">{genre.count} tác phẩm</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
