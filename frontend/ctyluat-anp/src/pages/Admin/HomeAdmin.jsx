import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

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

  const fullName = admin.fullName || "Admin";
  const email = admin.email || "admin@example.com";
  const phone = admin.phone || "Chưa cập nhật";
  const dob = admin.dob || "Chưa cập nhật";
  const gender =
    admin.gender === "male" ? "Nam" : admin.gender === "female" ? "Nữ" : "Khác";

  // Lấy chữ cái đầu của tên để làm avatar
  const avatarLetter = fullName.charAt(0).toUpperCase();

  // Hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/admin/login"); // Quay về trang đăng nhập
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar - Chiếm 25% */}
      <div className="w-1/4 bg-gray-900 text-white p-6 flex flex-col">
        {/* Thông tin Admin (Căn giữa đầu sidebar) */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center text-2xl font-bold rounded-full">
            {avatarLetter}
          </div>
          <p className="mt-2 text-lg font-semibold">{fullName}</p>
          <p className="text-sm text-gray-400">{email}</p>
        </div>

        {/* Menu Admin */}
        <div className="flex-1">
          <ul className="space-y-4">
            <li>
              <Link to="/admin" className="block p-3 hover:bg-gray-700 rounded">
                📊 Trang Chủ
              </Link>
            </li>
            <li>
              <Link
                to="/admin/quan-ly-bieu-mau"
                className="block p-3 hover:bg-gray-700 rounded"
              >
                📑 Quản lý biểu mẫu
              </Link>
            </li>
            <li>
              <Link
                to="/admin/quan-ly-tin-tuc"
                className="block p-3 hover:bg-gray-700 rounded"
              >
                📰 Quản lý tin tức
              </Link>
            </li>
            <li>
              <Link
                to="/admin/hoi-dap-phap-luat"
                className="block p-3 hover:bg-gray-700 rounded"
              >
                ⚖️ Quản lý hỏi đáp pháp luật
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dich-vu-luat-su"
                className="block p-3 hover:bg-gray-700 rounded"
              >
                👨‍⚖️ Quản lý dịch vụ luật sư
              </Link>
            </li>
          </ul>
        </div>

        {/* Chỉnh sửa & Đăng xuất */}
        <div className="border-t border-gray-700 pt-4">
          <Link
            to="/admin/chinh-sua-thong-tin"
            className="block p-2 text-center bg-blue-500 rounded hover:bg-blue-600"
          >
            ✏️ Chỉnh sửa thông tin
          </Link>
          <button
            onClick={handleLogout}
            className="w-full mt-3 p-2 bg-red-500 rounded hover:bg-red-600"
          >
            🚪 Đăng xuất
          </button>
        </div>
      </div>

      {/* Main Content - Chiếm 75% */}
      <div className="w-3/4 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeAdmin;
