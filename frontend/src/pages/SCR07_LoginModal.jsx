import React, { useState, useEffect } from 'react';
import { X, LogIn, Mail, Lock, Sparkles, User, Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const SCR07_LoginModal = () => {
  const { activeModal, modalPayload, closeModal, openModal, login, loginAsRole } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('123456'); // Default demo seed password

  useEffect(() => {
    if (modalPayload?.email) {
      setEmail(modalPayload.email);
    }
  }, [modalPayload]);

  if (activeModal !== 'login') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-[#151821] border border-[#272d3e] rounded-3xl p-7 max-w-md w-full shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#212635]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#132c21] border border-[#2fd17b]/40 flex items-center justify-center text-[#2fd17b]">
              <LogIn className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Đăng Nhập Hệ Thống</h3>
              <p className="text-xs text-gray-400">Truy cập toàn bộ tính năng và playlist</p>
            </div>
          </div>
          <button 
            onClick={closeModal}
            className="p-1.5 rounded-full hover:bg-[#222736] text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Banner if redirected from register */}
        {modalPayload?.email && (
          <div className="my-3 p-3 bg-emerald-950/40 border border-[#2fd17b]/40 rounded-xl flex items-center gap-2 text-xs text-emerald-300">
            <Sparkles className="w-4 h-4 text-[#2fd17b] flex-shrink-0" />
            <span>Đăng ký thành công! Vui lòng nhập mật khẩu để đăng nhập.</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Địa chỉ Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full bg-[#1b1f2b] border border-[#272d3e] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#2fd17b]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-gray-300">Mật khẩu</label>
              <button
                type="button"
                onClick={() => openModal('forgot-password')}
                className="text-[11px] text-[#2fd17b] hover:underline"
              >
                Quên mật khẩu?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu (Mặc định: 123456)"
                required
                className="w-full bg-[#1b1f2b] border border-[#272d3e] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#2fd17b]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#2fd17b] hover:bg-[#28b86c] text-black font-extrabold text-xs shadow-brand-glow transition-all"
          >
            Đăng Nhập Ngay
          </button>
        </form>

        {/* Demo Fast Login Buttons */}
        <div className="mt-5 pt-4 border-t border-[#212635]">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 text-center">
            Tài khoản mẫu Demo (1-Click)
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => loginAsRole('listener')}
              className="p-2 rounded-xl bg-[#1b202c] hover:bg-[#242b3b] border border-[#262c3d] text-center transition-colors group"
            >
              <User className="w-4 h-4 mx-auto text-emerald-400 group-hover:scale-110 transition-transform mb-1" />
              <p className="text-[10px] font-bold text-white">Listener</p>
              <p className="text-[9px] text-gray-500">Minh Tâm</p>
            </button>

            <button
              onClick={() => loginAsRole('creator')}
              className="p-2 rounded-xl bg-[#1b202c] hover:bg-[#242b3b] border border-[#262c3d] text-center transition-colors group"
            >
              <Sparkles className="w-4 h-4 mx-auto text-[#2fd17b] group-hover:scale-110 transition-transform mb-1" />
              <p className="text-[10px] font-bold text-white">Creator</p>
              <p className="text-[9px] text-gray-500">Sơn Tùng</p>
            </button>

            <button
              onClick={() => loginAsRole('admin')}
              className="p-2 rounded-xl bg-[#1b202c] hover:bg-[#242b3b] border border-[#262c3d] text-center transition-colors group"
            >
              <Shield className="w-4 h-4 mx-auto text-amber-400 group-hover:scale-110 transition-transform mb-1" />
              <p className="text-[10px] font-bold text-white">Admin</p>
              <p className="text-[9px] text-gray-500">Quản Trị</p>
            </button>
          </div>
        </div>

        {/* Footer switch to register */}
        <div className="mt-4 pt-3 text-center text-xs text-gray-400">
          <span>Chưa có tài khoản? </span>
          <button
            onClick={() => openModal('register')}
            className="text-[#2fd17b] hover:underline font-semibold"
          >
            Đăng ký mới
          </button>
        </div>
      </div>
    </div>
  );
};
