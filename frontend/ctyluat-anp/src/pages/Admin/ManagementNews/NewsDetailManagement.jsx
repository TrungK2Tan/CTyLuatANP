import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const NewsDetailManagement = () => {
  const { slug } = useParams(); // 🔥 Sửa id -> slug
  const [news, setNews] = useState(null);

  useEffect(() => {
    if (!slug) return;
  
    fetch(`${API_URL}/news/${slug}`) // 🔥 Sửa lại endpoint
      .then((res) => {
        if (!res.ok) throw new Error("Không tìm thấy bài viết");
        return res.json();
      })
      .then((data) => setNews(data))
      .catch((error) => console.error("Lỗi khi lấy chi tiết tin tức:", error));
  }, [slug]);
  

  if (!news) return <p>⏳ Đang tải...</p>;

  return (
    <div className="p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold">📰 {news.title}</h1>
      <p className="mt-2 text-gray-700">{news.content}</p>
      {news.image && (
        <img src={news.image} alt="Hình ảnh" className="mt-4 w-full rounded" />
      )}
      <div className="mt-4">
        <Link
          to={`/admin/quan-ly-tin-tuc/sua/${news.slug}`}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          ✏️ Chỉnh sửa
        </Link>
        <Link
          to="/admin/quan-ly-tin-tuc"
          className="ml-2 px-4 py-2 bg-gray-500 text-white rounded"
        >
          🔙 Quay lại
        </Link>
      </div>
    </div>
  );
};

export default NewsDetailManagement;
