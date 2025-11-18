import React from 'react';
import { Navigate,Outlet } from 'react-router-dom';

// function ProtectedRoute() {
   // Hàm Kiểm Tra Trạng Thái Đăng Nhập
 export const IsLoggedIn = () => {
    const userName = localStorage.getItem('name');
    return !!userName; // Trả về true nếu userName tồn tại và không rỗng
  };

 export const AuthGuard = () => {
    const isLoggedIn = IsLoggedIn();
  
    if (!isLoggedIn) {
      // Dùng replace để ngăn người dùng quay lại trang trước đó bằng nút back
      return <Navigate to="/account/signin" replace />;
    }
    return <Outlet />;
  }
  // }
