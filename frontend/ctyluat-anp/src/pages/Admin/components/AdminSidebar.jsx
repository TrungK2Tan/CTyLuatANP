import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminSidebar = ({ admin }) => {
  const navigate = useNavigate();

  // Lấy thông tin admin
  const fullName = admin?.fullName || "Admin";
  const email = admin?.email || "admin@example.com";

  // Lấy chữ cái đầu của tên để làm avatar
  const avatarLetter = fullName.charAt(0).toUpperCase();

  // Hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/admin/login"); // Chuyển hướng về trang đăng nhập
  };

  return (
    <div className="w-1/4 bg-gray-900 text-white p-6 flex flex-col fixed top-0 left-0 h-screen overflow-y-auto">
      {/* Thông tin Admin */}
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
            <Link to="/admin/quan-ly-bieu-mau" className="block p-3 hover:bg-gray-700 rounded">
              📑 Quản lý biểu mẫu
            </Link>
          </li>
          <li>
            <Link to="/admin/quan-ly-tin-tuc" className="block p-3 hover:bg-gray-700 rounded">
              📰 Quản lý tin tức
            </Link>
          </li>
         
          <li>
            <Link to="/admin/quan-ly-dich-vu-hoi-dap" className="block p-3 hover:bg-gray-700 rounded">
              👨‍⚖️ Quản lý dịch vụ luật sư và hỏi đáp
            </Link>
          </li>
          <li>
            <Link to="/admin/quan-ly-bai-viet" className="block p-3 hover:bg-gray-700 rounded">
              👨‍⚖️ Quản lý bài viết
            </Link>
          </li>
        </ul>
      </div>

      {/* Chỉnh sửa & Đăng xuất */}
      <div className="border-t border-gray-700 pt-4">
        <Link to="/admin/chinh-sua-thong-tin" className="block p-2 text-center bg-blue-500 rounded hover:bg-blue-600">
          ✏️ Chỉnh sửa thông tin
        </Link>
        <button onClick={handleLogout} className="w-full mt-3 p-2 bg-red-500 rounded hover:bg-red-600">
          🚪 Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;