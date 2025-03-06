import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const CreateNews = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // ✅ Thêm description
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({});
  
    useEffect(() => {
      const storedAdmin = JSON.parse(localStorage.getItem("admin"));
      if (storedAdmin) {
        setAdmin(storedAdmin);
      }
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newsData = { title, description, content, image };

    try {
      const res = await fetch("http://localhost:8000/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newsData),
      });

      if (res.ok) {
        alert(" Tin tức đã được tạo!");
        // Reset form sau khi tạo
        setTitle("");
        setDescription("");
        setContent("");
        setImage("");
        navigate("/admin/quan-ly-tin-tuc");
      } else {
        alert(" Lỗi khi tạo tin tức!");
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  return (
    <div className="flex h-screen">
    {/* Sidebar */}
    <AdminSidebar admin={admin} />
      {/* Main Content */}
      <div className="w-3/4 p-6 bg-gray-100">
      <h1 className="text-2xl font-bold">📰 Tạo Tin Tức</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input
          type="text"
          placeholder="Tiêu đề..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Mô tả..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Nội dung..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded"
          rows="5"
          required
        />
        <input
          type="text"
          placeholder="URL hình ảnh..."
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          ✅ Tạo tin tức
        </button>
      </form>
      </div>
    </div>
  );
};

export default CreateNews;
