import React, { useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";

const CreateForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
    content: "",
    file: null,
  });
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Đang tải lên...");

    try {
      let fileUrl = "";
      if (form.file) {
        const formData = new FormData();
        formData.append("file", form.file);

        const fileResponse = await axios.post("http://localhost:8000/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        fileUrl = fileResponse.data.fileUrl;
      }

      let imageUrl = "";
      if (form.image) {
        const imageData = new FormData();
        imageData.append("file", form.image);

        const imageResponse = await axios.post("http://localhost:8000/upload", imageData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        imageUrl = imageResponse.data.fileUrl;
      }

      const response = await axios.post("http://localhost:8000/forms", {
        title: form.title,
        description: form.description,
        image: imageUrl,
        content: form.content,
        fileUrl: fileUrl,
      });

      setMessage(response.data.message);
      setForm({ title: "", description: "", image: null, content: "", file: null });
      setImagePreview(null);
    } catch (error) {
      setMessage("Lỗi khi tạo biểu mẫu!");
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="w-3/4 p-6 bg-gray-100 overflow-auto">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">📄 Tạo Biểu Mẫu Mới</h2>

          {message && <p className="text-center text-green-600 mb-4">{message}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600 font-medium">Tiêu đề:</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium">Mô tả:</label>
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium">Chọn hình ảnh:</label>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
              )}
            </div>

            <div>
              <label className="block text-gray-600 font-medium">Nội dung:</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium">Tải tệp đính kèm:</label>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".doc,.docx,.pdf"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              📤 Đăng bài
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
