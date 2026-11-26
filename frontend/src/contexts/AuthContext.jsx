import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_USERS } from '../mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Guest sessions stay signed out until the user explicitly logs in.
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('soundwave_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('soundwave_current_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Modal system (SCR06, SCR07, SCR11, etc.)
  const [activeModal, setActiveModal] = useState(null); // 'login' | 'register' | 'forgot' | 'add-to-playlist' | 'edit-track' | null
  const [modalPayload, setModalPayload] = useState(null);

  // Toast feedback system
  const [toast, setToast] = useState(null);

  // Simulated OTP Console Store (Mirroring backend console output 0 VND local)
  const [lastConsoleOtp, setLastConsoleOtp] = useState(null);

  // Save users to localStorage
  useEffect(() => {
    localStorage.setItem('soundwave_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('soundwave_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('soundwave_current_user');
    }
  }, [currentUser]);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const openModal = (modalName, payload = null) => {
    setActiveModal(modalName);
    setModalPayload(payload);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalPayload(null);
  };

  // Generate 6-digit OTP and simulate printing to server console
  const generateConsoleOtp = (email, action = 'Xác thực') => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const logMessage = `[AUTH OTP CONSOLE] ${action} - Email: ${email} -> OTP: ${otp}`;
    console.log(`%c${logMessage}`, 'color: #2fd17b; font-weight: bold; background: #111; padding: 4px;');
    setLastConsoleOtp({ email, otp, action, time: new Date().toLocaleTimeString() });
    return otp;
  };

  const login = (email, password) => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      showToast('Tài khoản email không tồn tại trong hệ thống', 'error');
      return false;
    }
    if (found.deleted_at) {
      showToast('Tài khoản này đã bị khóa bởi Quản trị viên', 'error');
      return false;
    }
    // Set token & user
    localStorage.setItem('soundwave_token', 'jwt_token_sample_' + Date.now());
    setCurrentUser(found);
    showToast(`Đăng nhập thành công! Chào mừng ${found.username}`, 'success');
    closeModal();
    return true;
  };

  const loginAsRole = (role) => {
    let target;
    if (role === 'admin') target = users.find(u => u.role === 'admin');
    else if (role === 'creator') target = users.find(u => u.role === 'creator');
    else target = users.find(u => u.role === 'listener' && u.creator_status === 'none');

    if (target) {
      setCurrentUser(target);
      localStorage.setItem('soundwave_token', 'jwt_token_' + target.role);
      showToast(`Chuyển sang vai trò: ${target.role.toUpperCase()} (${target.username})`, 'info');
      closeModal();
    }
  };

  const logout = () => {
    localStorage.removeItem('soundwave_token');
    setCurrentUser(null);
    showToast('Đã đăng xuất khỏi hệ thống', 'info');
  };

  const register = ({ username, email, password }) => {
    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      showToast('Email này đã được đăng ký trước đó', 'error');
      return false;
    }
    const newUser = {
      id: Date.now(),
      username,
      email,
      role: 'listener',
      creator_status: 'none',
      channel_name: null,
      bio: null,
      avatar_url: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80`,
      created_at: new Date().toISOString(),
      deleted_at: null,
    };
    setUsers(prev => [...prev, newUser]);
    return newUser;
  };

  const resetPassword = (email, newPassword) => {
    const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (userIndex === -1) {
      showToast('Không tìm thấy tài khoản với email này', 'error');
      return false;
    }
    showToast('Mật khẩu đã được cập nhật thành công! Vui lòng đăng nhập lại.', 'success');
    return true;
  };

  const applyCreator = ({ channel_name, bio }) => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      creator_status: 'pending',
      channel_name,
      bio,
    };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updated : u));
    showToast('Hồ sơ đăng ký Creator đã được gửi và đang chờ Admin duyệt!', 'success');
  };

  const adminReviewCreator = (userId, decision) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          role: decision === 'approved' ? 'creator' : 'listener',
          creator_status: decision === 'approved' ? 'approved' : 'rejected',
        };
      }
      return u;
    }));

    if (currentUser?.id === userId) {
      setCurrentUser(prev => ({
        ...prev,
        role: decision === 'approved' ? 'creator' : 'listener',
        creator_status: decision === 'approved' ? 'approved' : 'rejected',
      }));
    }
    showToast(`Đã ${decision === 'approved' ? 'phê duyệt' : 'từ chối'} yêu cầu Creator`, 'info');
  };

  const adminToggleUserStatus = (userId) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const isLocked = !!u.deleted_at;
        return {
          ...u,
          deleted_at: isLocked ? null : new Date().toISOString(),
        };
      }
      return u;
    }));
    showToast('Đã cập nhật trạng thái tài khoản thành công', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        activeModal,
        modalPayload,
        toast,
        lastConsoleOtp,
        login,
        loginAsRole,
        logout,
        register,
        resetPassword,
        applyCreator,
        adminReviewCreator,
        adminToggleUserStatus,
        generateConsoleOtp,
        openModal,
        closeModal,
        showToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
