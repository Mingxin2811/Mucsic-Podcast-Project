import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Filter, Play, Heart, Plus, Music2, Mic, X, SlidersHorizontal } from 'lucide-react';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';
import { useMusic } from '../contexts/MusicContext';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES, buildPath } from '../router/routes';

export const SCR02_Search = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const { currentTrack, playTrack, togglePlay, formatTime } = useAudioPlayer();
  const { tracks, genres, isFavorite, toggleFavorite } = useMusic();
  const { openModal, currentUser } = useAuth();

  const [selectedGenreId, setSelectedGenreId] = useState('all');
  const [selectedType, setSelectedType] = useState(() => searchParams.get('tab') === 'podcasts' ? 'podcast' : 'all'); // 'all' | 'music' | 'podcast'
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'newest' | 'duration'

  // Debounced search / filtering logic
  const filteredTracks = useMemo(() => {
    let result = tracks.filter(t => !t.deleted_at);

    // Search keyword filter (case-insensitive & accent-friendly)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(t => 
        t.title.toLowerCase().includes(q) ||
        t.artist_name.toLowerCase().includes(q) ||
        (t.genre_name && t.genre_name.toLowerCase().includes(q))
      );
    }

    // Genre filter
    if (selectedGenreId !== 'all') {
      result = result.filter(t => t.genre_id === Number(selectedGenreId));
    }

    // Type filter
    if (selectedType !== 'all') {
      result = result.filter(t => t.track_type === selectedType);
    }

    // Sorting
    if (sortBy === 'popular') {
      result.sort((a, b) => b.play_count - a.play_count);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortBy === 'duration') {
      result.sort((a, b) => b.duration - a.duration);
    }

    return result;
  }, [tracks, searchQuery, selectedGenreId, selectedType, sortBy]);

  return (
    <div className="space-y-6 pb-12">
      {/* Search Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Tìm Kiếm & Lọc Thể Loại</h1>
        <p className="text-xs text-gray-400 mt-1">Khám phá kho bài hát, nghệ sĩ và các tập podcast hấp dẫn</p>
      </div>

      {/* Main Search Input */}
      <div className="relative">
        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchParams(e.target.value ? { q: e.target.value } : {})}
          placeholder="Nhập tên bài hát, tên nghệ sĩ hoặc chủ đề podcast cần tìm..."
          className="w-full bg-[#161922] hover:bg-[#1a1e28] focus:bg-[#1b202c] text-sm text-white placeholder-gray-500 pl-12 pr-10 py-3.5 rounded-2xl border border-[#262c3c] focus:border-[#2fd17b] focus:outline-none transition-all shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchParams({})}
            className="absolute right-3.5 top-3.5 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Filter Toolbar: Pills Bar */}
      <div className="space-y-3">
        {/* Genre Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedGenreId('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all
              ${selectedGenreId === 'all' 
                ? 'bg-[#525252] text-white font-extrabold shadow-sm' 
                : 'bg-[#181c26] text-gray-400 hover:text-white hover:bg-[#202534] border border-[#252b3b]'
              }`}
          >
            Tất cả thể loại
          </button>
          {genres.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGenreId(g.id.toString())}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all
                ${selectedGenreId === g.id.toString() 
                  ? 'bg-[#525252] text-white font-extrabold shadow-sm' 
                  : 'bg-[#181c26] text-gray-400 hover:text-white hover:bg-[#202534] border border-[#252b3b]'
                }`}
            >
              {g.name}
            </button>
          ))}
        </div>

        {/* Secondary Filters: Type & Sort */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Format Type */}
          <div className="flex items-center gap-1.5 bg-[#141720] p-1 rounded-xl border border-[#212635]">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${selectedType === 'all' ? 'bg-[#525252] text-white' : 'text-gray-400'}`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setSelectedType('music')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${selectedType === 'music' ? 'bg-[#525252] text-white' : 'text-gray-400'}`}
            >
              <Music2 className="w-3.5 h-3.5" /> Bài hát
            </button>
            <button
              onClick={() => setSelectedType('podcast')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${selectedType === 'podcast' ? 'bg-[#525252] text-white' : 'text-gray-400'}`}
            >
              <Mic className="w-3.5 h-3.5" /> Podcast
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <SlidersHorizontal className="w-4 h-4 text-gray-500" />
            <span>Sắp xếp theo:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#181c26] border border-[#262c3b] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#2fd17b]"
            >
              <option value="popular">Lượt nghe nhiều nhất</option>
              <option value="newest">Mới phát hành</option>
              <option value="duration">Thời lượng dài nhất</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Kết quả ({filteredTracks.length} tác phẩm tìm thấy)
          </p>
        </div>

        {filteredTracks.length === 0 ? (
          <div className="py-16 text-center bg-[#141720] rounded-3xl border border-[#202534] space-y-3">
            <Search className="w-10 h-10 text-gray-600 mx-auto" />
            <h4 className="text-base font-bold text-white">Không tìm thấy tác phẩm phù hợp</h4>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Hãy thử tìm kiếm với từ khóa khác như "Sơn Tùng", "Vũ", "Vietcetera" hoặc chọn thể loại khác.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredTracks.map((track) => {
              const isCurrent = currentTrack?.id === track.id;
              return (
                <div
                  key={track.id}
                  className={`flex items-center justify-between p-3 rounded-2xl bg-[#161922] hover:bg-[#1b202c] border border-[#232938] transition-all group
                    ${isCurrent ? 'border-[#686868] bg-[#525252]/40' : ''}`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div 
                      onClick={() => playTrack(track, filteredTracks)}
                      className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#202534] flex-shrink-0 cursor-pointer"
                    >
                      <img src={track.cover_image_path} alt={track.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Play className="w-5 h-5 text-[#2fd17b] fill-current" />
                      </div>
                    </div>

                    <div className="overflow-hidden">
                      <div className="flex items-center gap-1.5">
                        <h4 
                          onClick={() => navigate(buildPath(ROUTES.TRACK_DETAIL, { id: track.id }))}
                          className={`text-sm font-bold truncate cursor-pointer hover:underline
                            ${isCurrent ? 'text-[#2fd17b]' : 'text-white'}`}
                        >
                          {track.title}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-400 truncate mt-0.5">{track.artist_name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-gray-400 bg-[#1c212e] px-2 py-0.5 rounded">
                          {track.genre_name}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">
                          {track.play_count.toLocaleString('vi-VN')} lượt
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 pl-2">
                    <button
                      onClick={() => currentUser ? toggleFavorite(track.id) : openModal('login')}
                      className="p-1.5 text-gray-400 hover:text-rose-400 transition-colors"
                      title="Yêu thích"
                    >
                      <Heart className={`w-4 h-4 ${isFavorite(track.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>

                    <button
                      onClick={() => openModal('add-to-playlist', track)}
                      className="p-1.5 text-gray-400 hover:text-[#2fd17b] transition-colors"
                      title="Thêm vào playlist"
                    >
                      <Plus className="w-4 h-4" />
                    </button>

                    <span className="text-xs font-mono text-gray-400 ml-1">
                      {formatTime(track.duration)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
