import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";

const HomeAdmin = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (storedAdmin) {
      setAdmin(storedAdmin);
    } else {
      navigate("/admin/login"); // Nếu không có thông tin admin, chuyển về trang đăng nhập
    }
  }, [navigate]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar admin={admin} />

      {/* Main Content */}
      <div className="w-3/4 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeAdmin;
