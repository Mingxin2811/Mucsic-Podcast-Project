import React, { useState } from 'react';
import { X, UserPlus, Mail, Lock, User, Terminal, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const SCR06_RegisterModal = () => {
  const { 
    activeModal, 
    closeModal, 
    openModal, 
    register, 
    generateConsoleOtp, 
    showToast 
  } = useAuth();

  const [step, setStep] = useState(1); // 1: Fill form, 2: Enter OTP
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [otpValue, setOtpValue] = useState('');
  const [currentOtp, setCurrentOtp] = useState('');
  const [errors, setErrors] = useState({});

  if (activeModal !== 'register') return null;

  const validateForm = () => {
    const errs = {};
    if (!formData.username.trim() || formData.username.trim().length < 2) {
      errs.username = 'Tên hiển thị phải từ 2 ký tự';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Email không hợp lệ';
    }
    if (!formData.password || formData.password.length < 6) {
      errs.password = 'Mật khẩu tối thiểu 6 ký tự';
    }
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Simulate OTP generation printed to server console
    const generated = generateConsoleOtp(formData.email, 'Đăng ký tài khoản');
    setCurrentOtp(generated);
    setStep(2);
    showToast('Mã OTP 6 số đã được xuất ra Terminal Server Console!', 'info');
  };

  const handleStep2Verify = (e) => {
    e.preventDefault();
    if (otpValue.trim() !== currentOtp) {
      setErrors({ otp: 'Mã OTP không chính xác. Hãy kiểm tra Terminal Console!' });
      return;
    }

    // Register user
    const newUser = register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });

    if (newUser) {
      // Per wireframe specification: Redirect to SCR07 with Toast
      showToast('Đăng ký thành công! Vui lòng nhập mật khẩu để đăng nhập', 'success');
      openModal('login', { email: formData.email });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#151821] border border-[#272d3e] rounded-3xl p-7 max-w-md w-full shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#212635]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#132c21] border border-[#2fd17b]/40 flex items-center justify-center text-[#2fd17b]">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Đăng Ký Tài Khoản</h3>
              <p className="text-xs text-gray-400">Tham gia nền tảng âm nhạc SOUNDWAVE</p>
            </div>
          </div>
          <button 
            onClick={closeModal}
            className="p-1.5 rounded-full hover:bg-[#222736] text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 py-4">
          <span className={`w-8 h-1.5 rounded-full ${step >= 1 ? 'bg-[#2fd17b]' : 'bg-[#222736]'}`} />
          <span className={`w-8 h-1.5 rounded-full ${step === 2 ? 'bg-[#2fd17b]' : 'bg-[#222736]'}`} />
        </div>

        {step === 1 ? (
          /* Step 1: User details form */
          <form onSubmit={handleStep1Submit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Tên hiển thị</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="w-full bg-[#1b1f2b] border border-[#272d3e] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#2fd17b]"
                />
              </div>
              {errors.username && <p className="text-[11px] text-rose-400 mt-1">{errors.username}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Địa chỉ Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full bg-[#1b1f2b] border border-[#272d3e] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#2fd17b]"
                />
              </div>
              {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Mật khẩu</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Tối thiểu 6 ký tự"
                  className="w-full bg-[#1b1f2b] border border-[#272d3e] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#2fd17b]"
                />
              </div>
              {errors.password && <p className="text-[11px] text-rose-400 mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Xác nhận mật khẩu</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Nhập lại mật khẩu"
                  className="w-full bg-[#1b1f2b] border border-[#272d3e] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#2fd17b]"
                />
              </div>
              {errors.confirmPassword && <p className="text-[11px] text-rose-400 mt-1">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#2fd17b] hover:bg-[#28b86c] text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-brand-glow transition-all"
            >
              <span>Tiếp tục nhận mã OTP Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Step 2: OTP verification step (Terminal Console simulation) */
          <form onSubmit={handleStep2Verify} className="space-y-4">
            {/* Terminal Console Mockup Box */}
            <div className="bg-[#0b0d12] border border-[#1f2433] rounded-2xl p-3.5 font-mono text-[11px] space-y-2">
              <div className="flex items-center justify-between text-gray-500 pb-1.5 border-b border-gray-800">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Terminal className="w-3.5 h-3.5" /> Node.js Server Console (0 VNĐ)
                </span>
                <span>PID: 8080</span>
              </div>
              <p className="text-gray-400">[SYSTEM] Yêu cầu cấp OTP cho: <span className="text-white">{formData.email}</span></p>
              <p className="text-[#2fd17b] font-bold">
                &gt; [AUTH OTP CONSOLE] Verification OTP: <span className="underline tracking-widest text-base text-yellow-300">{currentOtp}</span>
              </p>
              <button
                type="button"
                onClick={() => setOtpValue(currentOtp)}
                className="text-[10px] text-sky-400 hover:text-sky-300 underline block"
              >
                [Bấm vào đây để điền nhanh OTP: {currentOtp}]
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Nhập mã OTP 6 số từ Terminal Console
              </label>
              <input
                type="text"
                maxLength={6}
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ''))}
                placeholder="6 chữ số (VD: 123456)"
                className="w-full text-center tracking-[0.5em] font-mono text-lg py-2.5 bg-[#1b1f2b] border border-[#272d3e] rounded-xl text-white focus:outline-none focus:border-[#2fd17b]"
                autoFocus
              />
              {errors.otp && <p className="text-[11px] text-rose-400 mt-1 text-center">{errors.otp}</p>}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-2.5 rounded-xl bg-[#202534] hover:bg-[#282e3f] text-xs font-bold text-gray-300"
              >
                Quay lại
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-[#2fd17b] hover:bg-[#28b86c] text-xs font-extrabold text-black flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Xác thực & Tạo TK</span>
              </button>
            </div>
          </form>
        )}

        {/* Footer switch to login */}
        <div className="mt-5 pt-4 border-t border-[#212635] text-center text-xs text-gray-400">
          <span>Đã có tài khoản? </span>
          <button
            onClick={() => openModal('login')}
            className="text-[#2fd17b] hover:underline font-semibold"
          >
            Đăng nhập ngay
          </button>
        </div>
      </div>
    </div>
  );
};
