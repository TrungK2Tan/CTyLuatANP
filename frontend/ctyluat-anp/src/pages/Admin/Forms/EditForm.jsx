import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const EditForm = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({});
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    fileUrl: "",
    imageUrl: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (storedAdmin) {
      setAdmin(storedAdmin);
    }

    fetch(`${API_URL}/forms/${slug}`)
      .then((res) => res.json())
      .then((data) => setForm(data))
      .catch((error) => console.error("Lỗi tải biểu mẫu:", error));
  }, [slug]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Xử lý chọn hình ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  // Xử lý chọn tệp đính kèm
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("content", form.content);
  
    if (selectedImage) {
      formData.append("image", selectedImage);
      console.log("📸 Gửi ảnh:", selectedImage.name);
    }
    if (selectedFile) {
      formData.append("file", selectedFile);
      console.log("📂 Gửi file:", selectedFile.name);
    }
  
    try {
      const response = await fetch(`${API_URL}/forms/${slug}`, {
        method: "PUT",
        body: formData,
      });
  
      const result = await response.json();
      console.log("✅ Cập nhật thành công:", result);
  
      // Reload lại dữ liệu mới sau khi cập nhật
      setForm(result.form);  
      navigate("/admin/quan-ly-bieu-mau");
    } catch (error) {
      console.error("❌ Lỗi cập nhật:", error);
    }
  };
  

  return (
    <div className="flex h-screen">
      <AdminSidebar admin={admin} />

      <div className="w-3/4 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold">✏️ Chỉnh sửa biểu mẫu</h1>

        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mt-4">
          <label className="block">
            Tiêu đề:
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="border w-full p-2 rounded mt-1"
              required
            />
          </label>

          <label className="block mt-4">
            Mô tả:
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="border w-full p-2 rounded mt-1"
              required
            />
          </label>

          <label className="block mt-4">
            Nội dung:
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              className="border w-full p-2 rounded mt-1"
              required
            />
          </label>

          {/* Xem trước hình ảnh hiện tại */}
          {form.imageUrl && (
            <div className="mt-4">
              <p>Hình ảnh hiện tại:</p>
              <img src={form.imageUrl} alt="Current" className="w-40 h-40 object-cover rounded" />
            </div>
          )}

          {/* Upload hình ảnh mới */}
          <label className="block mt-4">
            Cập nhật hình ảnh:
            <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2 w-full rounded mt-1" />
          </label>

          {/* Xem trước tệp đính kèm hiện tại */}
          {form.fileUrl && (
            <div className="mt-4">
              <p>Tệp đính kèm hiện tại:</p>
              <a href={form.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                Tải xuống tệp
              </a>
            </div>
          )}

          {/* Upload tệp mới */}
          <label className="block mt-4">
            Cập nhật tệp đính kèm:
            <input type="file" onChange={handleFileChange} className="border p-2 w-full rounded mt-1" />
          </label>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
            Lưu thay đổi
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
