import React, { useState } from "react";
import axios from "axios";

const CreateForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    content: "",
    file: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Đang tải lên...");

    try {
      // 1. Upload file trước
      let fileUrl = "";
      if (form.file) {
        const formData = new FormData();
        formData.append("file", form.file);

        const fileResponse = await axios.post(
          "http://localhost:8000/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        fileUrl = fileResponse.data.fileUrl;
      }

      // 2. Gửi dữ liệu biểu mẫu lên server
      const response = await axios.post("http://localhost:8000/forms", {
        title: form.title,
        description: form.description,
        image: form.image,
        content: form.content,
        fileUrl: fileUrl,
      });

      setMessage(response.data.message);
      setForm({
        title: "",
        description: "",
        image: "",
        content: "",
        file: null,
      });
    } catch (error) {
      setMessage("Lỗi khi tạo biểu mẫu!");
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Tạo Biểu Mẫu Mới</h2>

      {message && <p className="text-center text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Tiêu đề"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Mô tả ngắn"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="URL hình ảnh"
          className="w-full p-2 border rounded"
        />

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Nội dung bài viết..."
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="file"
          onChange={handleFileChange}
          accept=".doc,.docx,.pdf"
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Đăng bài
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
