import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const EditProfile = () => {
  const [admin, setAdmin] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    gender: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (storedAdmin) {
      setAdmin((prevAdmin) => ({
        ...prevAdmin,
        ...storedAdmin,
        dob: storedAdmin.dob ? storedAdmin.dob.split("T")[0] : "", // Lấy phần "YYYY-MM-DD"
      }));
    }
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prevAdmin) => ({
      ...prevAdmin,
      [name]: name === "dob" ? value : value,
    }));
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Đang cập nhật...");
  
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      if (!token) {
        setMessage("Bạn chưa đăng nhập!");
        return;
      }
  
      const updatedAdmin = { ...admin };
      delete updatedAdmin.email; // Không cập nhật email
  
      const response = await axios.put(
        `${API_URL}/update-user`,
        updatedAdmin,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      localStorage.setItem("admin", JSON.stringify(response.data.user));
      setMessage("Cập nhật thành công!");
    } catch (error) {
      console.error("Lỗi cập nhật hồ sơ:", error);
      setMessage("Lỗi khi cập nhật hồ sơ!");
    }
  };
  
  

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar admin={admin} />

      {/* Main Content */}
      <div className="w-3/4 p-6 bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            ✏️ Chỉnh sửa hồ sơ
          </h2>

          {message && (
            <p className="text-center text-green-600 mb-4">{message}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Tên */}
            <div>
              <label className="block text-gray-600 font-medium">Tên:</label>
              <input
                type="text"
                name="fullName"
                value={admin.fullName}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-600 font-medium">Email:</label>
              <input
                type="email"
                name="email"
                value={admin.email}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Số điện thoại */}
            <div>
              <label className="block text-gray-600 font-medium">
                Số điện thoại:
              </label>
              <input
                type="text"
                name="phone"
                value={admin.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Ngày sinh */}
            <div>
              <label className="block text-gray-600 font-medium">
                Ngày sinh:
              </label>
              <input
                type="date"
                name="dob"
                value={admin.dob}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Giới tính */}
            <div>
              <label className="block text-gray-600 font-medium">
                Giới tính:
              </label>
              <select
                name="gender"
                value={admin.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Chọn giới tính</option>
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
                <option value="Other">Khác</option>
              </select>
            </div>

            {/* Mật khẩu */}
            <div>
              <label className="block text-gray-600 font-medium">
                Mật khẩu (mới, nếu muốn đổi):
              </label>
              <input
                type="password"
                name="password"
                value={admin.password}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Nút lưu */}
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              💾 Lưu thay đổi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
