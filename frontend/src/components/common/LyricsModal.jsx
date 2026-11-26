import React from 'react';
import { X, Mic, FileText, Clock, Play } from 'lucide-react';
import { useAudioPlayer } from '../../contexts/AudioPlayerContext';

export const LyricsModal = () => {
  const { currentTrack, showLyricsModal, setShowLyricsModal, seek } = useAudioPlayer();

  if (!showLyricsModal || !currentTrack) return null;

  const isPodcast = currentTrack.track_type === 'podcast';

  // Helper to parse podcast timestamps like [05:30]
  const renderPodcastNotes = (text) => {
    if (!text) return <p className="text-gray-500 italic">Chưa có thông tin show notes cho tập podcast này.</p>;

    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const match = line.match(/\[(\d{2}):(\d{2})\]/);
      if (match) {
        const minutes = parseInt(match[1], 10);
        const seconds = parseInt(match[2], 10);
        const totalSeconds = minutes * 60 + seconds;

        return (
          <div 
            key={idx}
            onClick={() => seek(totalSeconds)}
            className="flex items-start gap-3 p-2 rounded-xl hover:bg-[#1f2535] cursor-pointer group transition-colors"
          >
            <span className="font-mono text-xs font-bold text-[#2fd17b] bg-[#142e22] px-2 py-0.5 rounded-lg border border-[#2fd17b]/30 flex-shrink-0 group-hover:scale-105 transition-transform flex items-center gap-1">
              <Play className="w-2.5 h-2.5 fill-current" /> {match[0]}
            </span>
            <span className="text-sm text-gray-200 group-hover:text-white leading-relaxed">
              {line.replace(match[0], '').trim()}
            </span>
          </div>
        );
      }
      return (
        <p key={idx} className="text-sm text-gray-300 py-1 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div className="bg-[#141720] border border-[#262c3d] rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#212635] flex items-center justify-between bg-[#181c26]">
          <div className="flex items-center gap-4">
            <img 
              src={currentTrack.cover_image_path} 
              alt={currentTrack.title}
              className="w-14 h-14 rounded-2xl object-cover border border-[#2b3345] shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2fd17b] bg-[#142e22] px-2 py-0.5 rounded-full border border-[#2fd17b]/30">
                  {isPodcast ? 'PODCAST SHOW NOTES' : 'LỜI BÀI HÁT ĐỒNG BỘ'}
                </span>
              </div>
              <h3 className="font-extrabold text-white text-base mt-1 line-clamp-1">{currentTrack.title}</h3>
              <p className="text-xs text-gray-400">{currentTrack.artist_name}</p>
            </div>
          </div>

          <button
            onClick={() => setShowLyricsModal(false)}
            className="p-2 rounded-full hover:bg-[#252b3b] text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {isPodcast ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                <Clock className="w-4 h-4 text-[#2fd17b]" />
                <span>Nội dung & Dấu mốc thời gian (Bấm để nhảy tới đoạn)</span>
              </div>
              {renderPodcastNotes(currentTrack.description)}
            </div>
          ) : (
            <div className="text-center py-4 space-y-6">
              {currentTrack.lyrics ? (
                currentTrack.lyrics.split('\n\n').map((stanza, sIdx) => (
                  <div key={sIdx} className="space-y-2">
                    {stanza.split('\n').map((line, lIdx) => (
                      <p 
                        key={lIdx}
                        className="text-base sm:text-lg font-medium text-gray-300 hover:text-[#2fd17b] transition-colors leading-relaxed cursor-default"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                ))
              ) : (
                <div className="py-12 text-gray-500 italic space-y-2">
                  <Mic className="w-8 h-8 mx-auto text-gray-600" />
                  <p>Lời bài hát đang được cập nhật...</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#10121a] border-t border-[#1f2433] flex justify-between items-center text-xs text-gray-500">
          <span>SOUNDWAVE Karaoke & Podcast Lyrics Sync</span>
          <button 
            onClick={() => setShowLyricsModal(false)}
            className="px-4 py-1.5 rounded-xl bg-[#1e2330] hover:bg-[#282e3f] text-gray-200 font-semibold transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
