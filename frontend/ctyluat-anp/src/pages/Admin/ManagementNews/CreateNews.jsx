import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const CreateNews = () => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (storedAdmin) {
      setAdmin(storedAdmin);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // Hiển thị ảnh trước khi upload
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await fetch(`${API_URL}/news`, {
        method: "POST",
        body: formData, // Gửi dữ liệu dạng FormData
      });

      if (res.ok) {
        alert("✅ Tin tức đã được tạo!");
        setTitle("");
        setDescription("");
        setContent("");
        setImage(null);
        setImagePreview("");
        navigate("/admin/quan-ly-tin-tuc");
      } else {
        alert("❌ Lỗi khi tạo tin tức!");
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  return (
<div className="flex min-h-screen">
  <AdminSidebar admin={admin} />
  <div className="w-3/4 p-6 bg-gray-100 ml-[20%]">
        <h1 className="text-2xl font-bold">📰 Tạo Tin Tức</h1>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4" encType="multipart/form-data">
          <input type="text" placeholder="Tiêu đề..." value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="text" placeholder="Mô tả..." value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" required />
          <textarea placeholder="Nội dung..." value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 border rounded" rows="5" required />
          
          {/* Input file thay vì nhập URL ảnh */}
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" required />
          {imagePreview && <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded" />}

          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">✅ Tạo tin tức</button>
        </form>
      </div>
    </div>
  );
};

export default CreateNews;
