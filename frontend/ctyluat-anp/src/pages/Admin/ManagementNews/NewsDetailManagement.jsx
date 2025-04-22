import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const NewsDetailManagement = () => {
  const { slug } = useParams(); 
  const [news, setNews] = useState(null);
  const [admin, setAdmin] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (storedAdmin) {
      setAdmin(storedAdmin);
    }

    if (!slug) return;
  
    setLoading(true);
    fetch(`${API_URL}/news/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Không tìm thấy bài viết");
        return res.json();
      })
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy chi tiết tin tức:", error);
        setLoading(false);
      });
  }, [slug]);
  
  return (
    <div className="flex min-h-screen">
      <AdminSidebar admin={admin} />
      <div className="w-3/4 p-6 bg-gray-100 ml-[25%]">
        <h1 className="text-2xl font-bold mb-4">📋 Chi Tiết Tin Tức</h1>
        
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
            <p className="ml-3">⏳ Đang tải...</p>
          </div>
        ) : news ? (
          <div className="p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold">📰 {news.title}</h2>
            <p className="mt-2 text-gray-500 font-medium">Mô tả: {news.description}</p>
            
            {/* Sử dụng dangerouslySetInnerHTML để hiển thị nội dung HTML */}
            <div 
              className="mt-4 text-gray-700 news-content" 
              dangerouslySetInnerHTML={{ __html: news.content }}
            ></div>
            
            {news.image && (
              <img 
                src={news.image} 
                alt="Hình ảnh tin tức" 
                className="mt-6 max-w-full h-auto rounded shadow-md"
              />
            )}
            <div className="mt-6 flex gap-3">
              <Link
                to={`/admin/quan-ly-tin-tuc/sua/${news.slug}`}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              >
                ✏️ Chỉnh sửa
              </Link>
              <Link
                to="/admin/quan-ly-tin-tuc"
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              >
                🔙 Quay lại
              </Link>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-white shadow rounded">
            <p className="text-red-500">❌ Không tìm thấy tin tức</p>
            <Link
              to="/admin/quan-ly-tin-tuc"
              className="mt-4 inline-block px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              🔙 Quay lại
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsDetailManagement;