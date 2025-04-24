import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const FormManagement = () => {
  const [admin, setAdmin] = useState({});
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (storedAdmin) {
      setAdmin(storedAdmin);
    }

    fetchForms();
  }, []);

  // Gọi API lấy danh sách biểu mẫu
  const fetchForms = () => {
    setLoading(true);
    fetch(`${API_URL}/forms`)
      .then((res) => res.json())
      .then((data) => {
        setForms(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi tải danh sách biểu mẫu:", error);
        setLoading(false);
      });
  };

  // Xóa biểu mẫu
  const handleDelete = async (slug) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa biểu mẫu này?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/forms/${slug}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        alert("✅ Xóa biểu mẫu thành công!");
        fetchForms(); // Cập nhật lại danh sách biểu mẫu
      } else {
        alert("❌ Lỗi khi xóa: " + data.error);
      }
    } catch (error) {
      console.error("Lỗi khi xóa biểu mẫu:", error);
      alert("❌ Lỗi server khi xóa biểu mẫu");
    }
  };

  return (
    <div className="flex min-h-screen">
  <AdminSidebar admin={admin} />
  <div className="w-3/4 p-6 bg-gray-100 ml-[20%]">
        <h1 className="text-2xl font-bold">📑 Quản lý biểu mẫu</h1>

        <div className="mt-4 bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Danh sách biểu mẫu</h2>
            <Link
              to="/admin/tao-bieu-mau"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
               Tạo Biểu Mẫu Mới
            </Link>
          </div>

          {loading ? (
            <p>Đang tải danh sách...</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">STT</th>
                  <th className="border p-2">Tiêu đề</th>
                  <th className="border p-2">Mô tả</th>
                  <th className="border p-2">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {forms.length > 0 ? (
                  forms.map((form, index) => (
                    <tr key={form._id} className="text-center">
                      <td className="border p-2">{index + 1}</td>
                      <td className="border p-2">{form.title}</td>
                      <td className="border p-2">{form.description}</td>
                      <td className="border p-2 flex justify-center gap-2">
                        {/* Xem chi tiết */}
                        <Link
                          to={`/admin/quan-ly-bieu-mau/${form.slug}`}
                          className="text-blue-500 hover:underline"
                        >
                          Xem chi tiết
                        </Link>

                        {/* Sửa biểu mẫu */}
                        <Link
                          to={`/admin/quan-ly-bieu-mau/sua/${form.slug}`}
                          className="text-yellow-500 hover:underline"
                        >
                          Sửa
                        </Link>

                        {/* Xóa biểu mẫu */}
                        <button
                          onClick={() => handleDelete(form.slug)}
                          className="text-red-500 hover:underline"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-4">
                      Không có biểu mẫu nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormManagement;
