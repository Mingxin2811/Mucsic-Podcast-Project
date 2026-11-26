/**
 * ProtectedRoute.jsx — Bảo vệ các route yêu cầu xác thực hoặc quyền cụ thể.
 *
 * Hành vi:
 *  - Nếu chưa đăng nhập và route yêu cầu auth → mở modal Login rồi redirect về /
 *  - Nếu đã đăng nhập nhưng role không đủ quyền → redirect về / với thông báo
 *  - Nếu đủ điều kiện → render children bình thường
 */

import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ROUTE_META } from './routes';

export const ProtectedRoute = ({ children, requiresAuth, allowedRoles }) => {
  const { currentUser, openModal } = useAuth();
  const location = useLocation();

  // Nếu chưa đăng nhập và route yêu cầu auth
  useEffect(() => {
    if (requiresAuth && !currentUser) {
      openModal('login');
    }
  }, [requiresAuth, currentUser, openModal]);

  if (requiresAuth && !currentUser) {
    // Lưu URL hiện tại để sau khi đăng nhập redirect về đúng chỗ
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Kiểm tra role
  if (allowedRoles && currentUser && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};
