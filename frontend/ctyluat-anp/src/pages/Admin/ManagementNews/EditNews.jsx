import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditNews = () => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const { slug } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState({
    title: "",
    description: "",
    content: "",
    image: "",
  });
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (!slug) return;

    fetch(`${API_URL}/news/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("❌ Không tìm thấy bài viết!");
        return res.json();
      })
      .then((data) => {
        setNews(data);
        setImagePreview(data.image); // Hiển thị ảnh cũ
      })
      .catch((error) => console.error("Lỗi khi lấy tin tức:", error));
  }, [slug]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    setImagePreview(URL.createObjectURL(file)); // Hiển thị ảnh mới trước khi upload
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", news.title);
    formData.append("description", news.description);
    formData.append("content", news.content);
    if (newImage) {
      formData.append("image", newImage);
    }

    try {
      const res = await fetch(`${API_URL}/news/${slug}`, {
        method: "PUT",
        body: formData, // Gửi dữ liệu dạng FormData
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
      <form onSubmit={handleUpdate} className="mt-4 space-y-4" encType="multipart/form-data">
        <input type="text" value={news.title} onChange={(e) => setNews({ ...news, title: e.target.value })} className="w-full p-2 border rounded" required />
        <input type="text" value={news.description} onChange={(e) => setNews({ ...news, description: e.target.value })} className="w-full p-2 border rounded" required />
        <textarea value={news.content} onChange={(e) => setNews({ ...news, content: e.target.value })} className="w-full p-2 border rounded" rows="5" required />
        
        {/* Hiển thị ảnh cũ */}
        {imagePreview && <img src={imagePreview} alt="Ảnh hiện tại" className="w-32 h-32 object-cover rounded" />}
        
        {/* Input file để thay đổi ảnh */}
        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />
        
        <button type="submit" className="px-4 py-2 bg-yellow-500 text-white rounded">✅ Cập nhật</button>
      </form>
    </div>
  );
};

export default EditNews;
