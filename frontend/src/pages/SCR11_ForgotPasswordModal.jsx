import React, { useState } from 'react';
import { X, KeyRound, Mail, Lock, Terminal, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const SCR11_ForgotPasswordModal = () => {
  const { activeModal, closeModal, openModal, generateConsoleOtp, resetPassword, showToast } = useAuth();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  if (activeModal !== 'forgot-password') return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Vui lòng nhập địa chỉ email hợp lệ');
      return;
    }
    setError('');
    const code = generateConsoleOtp(email, 'Khôi phục mật khẩu');
    setGeneratedOtp(code);
    setStep(2);
    showToast('Mã OTP khôi phục mật khẩu đã được in ra Terminal Server Console!', 'info');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.trim() !== generatedOtp) {
      setError('Mã OTP không chính xác. Hãy kiểm tra Terminal Console!');
      return;
    }
    setError('');
    setStep(3);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError('Mật khẩu mới tối thiểu 6 ký tự');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không trùng khớp');
      return;
    }
    setError('');
    const success = resetPassword(email, newPassword);
    if (success) {
      openModal('login', { email });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#151821] border border-[#272d3e] rounded-3xl p-7 max-w-md w-full shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#212635]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2e1d13] border border-amber-500/40 flex items-center justify-center text-amber-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Khôi Phục Mật Khẩu</h3>
              <p className="text-xs text-gray-400">Xác thực bằng mã OTP qua Server Console</p>
            </div>
          </div>
          <button 
            onClick={closeModal}
            className="p-1.5 rounded-full hover:bg-[#222736] text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 py-4">
          <span className={`w-8 h-1.5 rounded-full ${step >= 1 ? 'bg-amber-400' : 'bg-[#222736]'}`} />
          <span className={`w-8 h-1.5 rounded-full ${step >= 2 ? 'bg-amber-400' : 'bg-[#222736]'}`} />
          <span className={`w-8 h-1.5 rounded-full ${step === 3 ? 'bg-amber-400' : 'bg-[#222736]'}`} />
        </div>

        {error && (
          <div className="mb-3 p-2.5 bg-rose-950/40 border border-rose-500/40 rounded-xl text-xs text-rose-300">
            {error}
          </div>
        )}

        {/* Step 1: Input Email */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Nhập Email tài khoản cần khôi phục
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com (VD: listener@soundwave.vn)"
                  required
                  className="w-full bg-[#1b1f2b] border border-[#272d3e] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-black font-extrabold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <span>Gửi mã OTP Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 2: Input OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            {/* Terminal Mockup */}
            <div className="bg-[#0b0d12] border border-[#1f2433] rounded-2xl p-3 font-mono text-[11px] space-y-2">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Terminal className="w-3.5 h-3.5" /> Node.js Server Console
              </div>
              <p className="text-gray-400">[FORGOT PASSWORD] Email: <span className="text-white">{email}</span></p>
              <p className="text-amber-300 font-bold">
                &gt; [AUTH OTP CONSOLE] Reset Password OTP: <span className="underline tracking-widest text-base text-white">{generatedOtp}</span>
              </p>
              <button
                type="button"
                onClick={() => setOtp(generatedOtp)}
                className="text-[10px] text-sky-400 hover:text-sky-300 underline block"
              >
                [Bấm để điền nhanh OTP: {generatedOtp}]
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Nhập mã OTP 6 số từ Terminal Console
              </label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="6 chữ số"
                className="w-full text-center tracking-[0.5em] font-mono text-lg py-2 bg-[#1b1f2b] border border-[#272d3e] rounded-xl text-white focus:outline-none focus:border-amber-400"
                autoFocus
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-2.5 rounded-xl bg-[#202534] text-xs font-bold text-gray-300"
              >
                Quay lại
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-xs font-extrabold text-black flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Xác minh OTP</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Mật khẩu mới</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Tối thiểu 6 ký tự"
                  required
                  className="w-full bg-[#1b1f2b] border border-[#272d3e] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Xác nhận mật khẩu mới</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu mới"
                  required
                  className="w-full bg-[#1b1f2b] border border-[#272d3e] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-black font-extrabold text-xs shadow-md transition-all"
            >
              Cập Nhật Mật Khẩu Mới
            </button>
          </form>
        )}

        {/* Back to Login link */}
        <div className="mt-5 pt-3 border-t border-[#212635] text-center text-xs text-gray-400">
          <button
            onClick={() => openModal('login')}
            className="text-gray-300 hover:text-white"
          >
            ← Quay lại màn hình Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};
