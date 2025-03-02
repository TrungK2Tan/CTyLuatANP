import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditNews = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState({
    title: "",
    description: "",
    content: "",
    image: "",
  });

  useEffect(() => {
    if (!slug) return;

    fetch(`http://localhost:8000/news/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("❌ Không tìm thấy bài viết!");
        return res.json();
      })
      .then((data) => setNews(data))
      .catch((error) => console.error("Lỗi khi lấy tin tức:", error));
  }, [slug]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8000/news/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(news),
      });

      if (res.ok) {
        alert("✅ Tin tức đã được cập nhật!");
        navigate("/admin/quan-ly-tin-tuc");
      } else {
        alert("❌ Lỗi khi cập nhật!");
      }
    } catch (error) {
      console.error("❌ Lỗi:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold">✏️ Chỉnh Sửa Tin Tức</h1>
      <form onSubmit={handleUpdate} className="mt-4 space-y-4">
        <input
          type="text"
          value={news.title}
          onChange={(e) => setNews({ ...news, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          value={news.description}
          onChange={(e) => setNews({ ...news, description: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Mô tả..."
          required
        />
        <textarea
          value={news.content}
          onChange={(e) => setNews({ ...news, content: e.target.value })}
          className="w-full p-2 border rounded"
          rows="5"
          required
        />
        <input
          type="text"
          value={news.image}
          onChange={(e) => setNews({ ...news, image: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          ✅ Cập nhật
        </button>
      </form>
    </div>
  );
};

export default EditNews;
