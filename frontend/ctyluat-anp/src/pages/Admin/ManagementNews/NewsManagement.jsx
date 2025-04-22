import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const NewsManagement = () => {
  const [admin, setAdmin] = useState({});
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (storedAdmin) {
      setAdmin(storedAdmin);
    }
    fetchNews();
  }, []);

  const fetchNews = () => {
    setLoading(true);
    fetch(`${API_URL}/news`)
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi tải danh sách tin tức:", error);
        setLoading(false);
      });
  };

  const handleDelete = async (slug) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa tin tức này?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/news/${slug}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        alert("✅ Xóa tin tức thành công!");
        fetchNews();
      } else {
        alert("❌ Lỗi khi xóa: " + data.error);
      }
    } catch (error) {
      console.error("Lỗi khi xóa tin tức:", error);
      alert("❌ Lỗi server khi xóa tin tức");
    }
  };

  return (
  <div className="flex min-h-screen">
    <AdminSidebar admin={admin} />
  <div className="w-3/4 p-6 bg-gray-100 ml-[25%]">
        <h1 className="text-2xl font-bold">📰 Quản lý tin tức</h1>

        <div className="mt-4 bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Danh sách tin tức</h2>
            <Link
              to="/admin/tao-tin-tuc"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Tạo Tin Tức Mới
            </Link>
          </div>

          {loading ? (
            <p>Đang tải danh sách...</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300 ">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">STT</th>
                  <th className="border p-2">Tiêu đề</th>
                  <th className="border p-2">Mô tả</th>
                  <th className="border p-2 w-1/4">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {news.length > 0 ? (
                  news.map((item, index) => (
                    <tr key={item._id} className="text-center">
                      <td className="border p-2">{index + 1}</td>
                      <td className="border p-2">{item.title}</td>
                      <td className="border p-2">
                        <p className="line-clamp-2">{item.description}</p>
                      </td>

                      <td className="border p-2">
                        <div className="flex justify-center gap-2 flex-wrap">
                          <Link
                            to={`/admin/quan-ly-tin-tuc/${item.slug}`}
                            className="text-blue-500 hover:underline"
                          >
                            Xem chi tiết
                          </Link>

                          <Link
                            to={`/admin/quan-ly-tin-tuc/sua/${item.slug}`}
                            className="text-yellow-500 hover:underline"
                          >
                            Sửa
                          </Link>

                          <button
                            onClick={() => handleDelete(item.slug)}
                            className="text-red-500 hover:underline"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-4">
                      Không có tin tức nào.
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

export default NewsManagement;
