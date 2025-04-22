import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";


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
  const [admin, setAdmin] = useState({});

  useEffect(() => {
       const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (storedAdmin) {
      setAdmin(storedAdmin);
    }
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
       <div className="flex min-h-screen">
      <AdminSidebar admin={admin} />
      <div className="w-3/4 p-6 bg-gray-100 ml-[25%]">
        <h1 className="text-2xl font-bold">✏️ Chỉnh Sửa Tin Tức</h1>
        <div className="mt-4 bg-white p-4 rounded shadow">
          <form onSubmit={handleUpdate} className="space-y-4" encType="multipart/form-data">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
              <input type="text" value={news.title} onChange={(e) => setNews({ ...news, title: e.target.value })} className="w-full p-2 border rounded" required />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
              <input type="text" value={news.description} onChange={(e) => setNews({ ...news, description: e.target.value })} className="w-full p-2 border rounded" required />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
              <textarea value={news.content} onChange={(e) => setNews({ ...news, content: e.target.value })} className="w-full p-2 border rounded" rows="5" required />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh hiện tại</label>
              {imagePreview && <img src={imagePreview} alt="Ảnh hiện tại" className="w-40 h-40 object-cover rounded" />}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Thay đổi ảnh</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />
            </div>
            
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">✅ Cập nhật</button>
              <button type="button" onClick={() => navigate('/admin/quan-ly-tin-tuc')} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition">🔙 Quay lại</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditNews;
