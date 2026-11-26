import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Shield, Sparkles, CheckCircle2, 
  Clock, AlertCircle, Upload, LayoutDashboard, Edit3, Lock 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES } from '../router/routes';

export const SCR12_UserProfile = () => {
  const navigate = useNavigate();
  const { currentUser, applyCreator, showToast, openModal } = useAuth();

  const [channelName, setChannelName] = useState('');
  const [bio, setBio] = useState('');
  const [focusCategory, setFocusCategory] = useState('Âm nhạc Độc lập');

  if (!currentUser) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <User className="w-16 h-16 text-gray-600 mx-auto" />
        <h2 className="text-xl font-bold text-white">Yêu cầu đăng nhập</h2>
        <p className="text-xs text-gray-400">
          Vui lòng đăng nhập để xem thông tin hồ sơ và quản lý tài khoản của bạn.
        </p>
        <button
          onClick={() => openModal('login')}
          className="px-6 py-2.5 rounded-xl bg-[#2fd17b] text-black font-extrabold text-xs shadow-brand-glow"
        >
          Đăng nhập ngay
        </button>
      </div>
    );
  }

  const handleApply = (e) => {
    e.preventDefault();
    if (!channelName.trim()) {
      showToast('Vui lòng nhập Nghệ danh hoặc Tên kênh sáng tạo', 'error');
      return;
    }
    applyCreator({
      channel_name: channelName.trim(),
      bio: bio.trim(),
    });
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Profile Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <User className="w-6 h-6 text-[#2fd17b]" />
          <span>Hồ Sơ Cá Nhân & Không Gian Creator</span>
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">
          Quản lý tài khoản người nghe và đăng ký nâng cấp thành Nhà sáng tạo (Creator)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Listener Profile Card */}
        <div className="bg-[#141720] border border-[#212634] rounded-3xl p-6 shadow-md space-y-6">
          <div className="text-center space-y-3">
            <div className="relative w-24 h-24 mx-auto">
              <img 
                src={currentUser.avatar_url} 
                alt={currentUser.username} 
                className="w-full h-full rounded-full object-cover border-2 border-[#2fd17b]/60 shadow-lg"
              />
              <button 
                title="Thay đổi ảnh đại diện"
                className="absolute bottom-0 right-0 p-1.5 bg-[#2fd17b] rounded-full text-black hover:scale-110 transition-transform"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-white">{currentUser.username}</h2>
              <p className="text-xs text-gray-400">{currentUser.email}</p>
            </div>

            <div className="flex justify-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#2fd17b] bg-[#142e22] px-3 py-1 rounded-full border border-[#2fd17b]/30">
                Vai trò: {currentUser.role}
              </span>
            </div>
          </div>

          <div className="border-t border-[#1f2433] pt-4 space-y-3 text-xs">
            <div className="flex justify-between text-gray-400">
              <span>Mã tài khoản:</span>
              <span className="font-mono text-white">#{currentUser.id}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Ngày tham gia:</span>
              <span className="text-white">Tháng 10 / 2026</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Trạng thái Creator:</span>
              <span className="font-semibold text-white capitalize">{currentUser.creator_status}</span>
            </div>
          </div>

          <div className="border-t border-[#1f2433] pt-4">
            <button
              onClick={() => openModal('forgot-password')}
              className="w-full py-2.5 rounded-xl bg-[#1b202c] hover:bg-[#222838] border border-[#252b3b] text-xs font-semibold text-gray-300 flex items-center justify-center gap-2 transition-colors"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Đổi mật khẩu tài khoản</span>
            </button>
          </div>
        </div>

        {/* Right Column: Creator Application / Tracking Space */}
        <div className="lg:col-span-2 bg-[#141720] border border-[#212634] rounded-3xl p-6 sm:p-8 shadow-md">
          <div className="pb-4 border-b border-[#1f2433] mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#2fd17b]" />
              <h3 className="text-base font-extrabold text-white">Không Gian Nhà Sáng Tạo (Creator Hub)</h3>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Dành cho các nghệ sĩ, podcast host muốn xuất bản âm nhạc và podcast đến hàng triệu thính giả
            </p>
          </div>

          {/* CASE 1: Role = Creator or Status = Approved */}
          {(currentUser.role === 'creator' || currentUser.creator_status === 'approved') && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#142e22] to-[#121f1a] border border-[#2fd17b]/40 space-y-3">
                <div className="flex items-center gap-2 text-[#2fd17b] font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Kênh Nhà Sáng Tạo Đã Được Xác Minh!</span>
                </div>
                <h4 className="text-xl font-extrabold text-white">{currentUser.channel_name || currentUser.username}</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {currentUser.bio || 'Chào mừng bạn đến với mạng lưới sáng tạo SOUNDWAVE. Bạn có toàn quyền tải lên tác phẩm mới và theo dõi lượt nghe tại Creator Studio.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setCurrentScreen('SCR09')}
                  className="p-5 rounded-2xl bg-[#161922] hover:bg-[#1c212e] border border-[#262c3b] text-left space-y-2 group transition-all"
                >
                  <LayoutDashboard className="w-6 h-6 text-[#2fd17b] group-hover:scale-110 transition-transform" />
                  <h5 className="text-sm font-bold text-white">Creator Studio</h5>
                  <p className="text-xs text-gray-400">Xem thống kê lượt nghe, danh sách tác phẩm và chỉnh sửa</p>
                </button>

                <button
                  onClick={() => setCurrentScreen('SCR08')}
                  className="p-5 rounded-2xl bg-[#161922] hover:bg-[#1c212e] border border-[#262c3b] text-left space-y-2 group transition-all"
                >
                  <Upload className="w-6 h-6 text-[#2fd17b] group-hover:scale-110 transition-transform" />
                  <h5 className="text-sm font-bold text-white">Tải Lên Mới</h5>
                  <p className="text-xs text-gray-400">Tải lên bài hát .MP3 hoặc tập podcast mới cùng lời bài hát</p>
                </button>
              </div>
            </div>
          )}

          {/* CASE 2: Status = Pending */}
          {currentUser.role === 'listener' && currentUser.creator_status === 'pending' && (
            <div className="p-6 rounded-2xl bg-[#282216] border border-amber-500/40 space-y-4">
              <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm">
                <Clock className="w-5 h-5" />
                <span>Hồ Sơ Của Bạn Đang Được Ban Quản Trị Xem Xét (Pending)</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Chúng tôi đã tiếp nhận hồ sơ đăng ký kênh <strong className="text-white">"{currentUser.channel_name}"</strong>. Ban Quản Trị (Admin) sẽ đối soát và phê duyệt trong vòng 24 giờ.
              </p>
              <div className="p-3 bg-[#181510] rounded-xl text-xs space-y-1 text-gray-400 border border-amber-900/40">
                <p>Nghệ danh: <span className="text-white font-semibold">{currentUser.channel_name}</span></p>
                <p>Mô tả: <span className="text-white">{currentUser.bio || 'Chưa cập nhật'}</span></p>
              </div>
              <p className="text-[11px] text-gray-400 italic">
                * Mẹo: Bạn có thể đăng nhập bằng tài khoản Admin qua nút góc trên phải để duyệt hồ sơ này ngay lập tức!
              </p>
            </div>
          )}

          {/* CASE 3: Status = None (Form to apply) */}
          {currentUser.role === 'listener' && currentUser.creator_status === 'none' && (
            <form onSubmit={handleApply} className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#161a24] border border-[#232838] text-xs text-gray-300 space-y-1">
                <p className="font-bold text-white">Đăng ký trở thành Nhà sáng tạo (Creator)</p>
                <p className="text-gray-400">
                  Nộp thông tin kênh của bạn để được cấp quyền xuất bản bài hát và podcast lên hệ thống.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Nghệ danh hoặc Tên kênh sáng tạo *
                </label>
                <input
                  type="text"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  placeholder="Ví dụ: Đạt Beatmaker Studio hoặc Vũ Trụ Podcast"
                  required
                  className="w-full bg-[#1b1f2b] border border-[#272d3e] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#2fd17b]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Lĩnh vực nội dung tập trung
                </label>
                <select
                  value={focusCategory}
                  onChange={(e) => setFocusCategory(e.target.value)}
                  className="w-full bg-[#1b1f2b] border border-[#272d3e] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#2fd17b]"
                >
                  <option value="Âm nhạc Độc lập">Âm nhạc Độc lập (Indie / Acoustic)</option>
                  <option value="Pop Ballad & V-Pop">Pop Ballad & V-Pop</option>
                  <option value="Rap & Hip-hop">Rap & Hip-hop</option>
                  <option value="Podcast & Talkshow">Podcast & Talkshow Đời sống</option>
                  <option value="Khởi nghiệp & Kinh doanh">Khởi nghiệp & Kinh doanh</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Giới thiệu ngắn về định hướng kênh (Bio)
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Chia sẻ kinh nghiệm sản xuất, các dự án trước đây hoặc mục tiêu định hướng..."
                  rows={4}
                  className="w-full bg-[#1b1f2b] border border-[#272d3e] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#2fd17b]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#2fd17b] hover:bg-[#28b86c] text-black font-extrabold text-xs shadow-brand-glow transition-all"
              >
                Gửi Hồ Sơ Đăng Ký Creator (UC12)
              </button>
            </form>
          )}

          {/* CASE 4: Status = Rejected */}
          {currentUser.creator_status === 'rejected' && (
            <div className="p-6 rounded-2xl bg-rose-950/30 border border-rose-500/40 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <AlertCircle className="w-5 h-5" />
                <span>Hồ Sơ Creator Chưa Đạt Yêu Cầu</span>
              </div>
              <p className="text-xs text-gray-300">
                Rất tiếc, hồ sơ của bạn chưa đáp ứng đủ tiêu chuẩn phát hành nội dung. Bạn có thể cập nhật lại thông tin và nộp lại.
              </p>
              <button
                onClick={() => applyCreator({ channel_name: currentUser.channel_name || 'Kênh mới', bio: 'Bổ sung thông tin' })}
                className="px-4 py-2 rounded-xl bg-[#202534] hover:bg-[#282e3f] text-xs font-bold text-white"
              >
                Gửi lại hồ sơ
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
