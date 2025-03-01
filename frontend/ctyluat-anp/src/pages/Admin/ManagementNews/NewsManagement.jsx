import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

const NewsManagement = () => {
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (storedAdmin) {
      setAdmin(storedAdmin);
    }
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar admin={admin} />

      {/* Main Content */}
      <div className="w-3/4 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold">📰 Quản lý tin tức</h1>
        <p>Trang này dành cho quản lý tin tức.</p>
      </div>
    </div>
  );
};

export default NewsManagement;
