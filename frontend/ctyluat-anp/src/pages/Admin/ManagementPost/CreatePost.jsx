import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const CreatePost = () => {
  const [admin, setAdmin] = useState({});
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [newPost, setNewPost] = useState({
    title: "",
    image: "",
    description: "",
    content: "",
  });
  // Thêm state cho thông báo
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serviceSlug = queryParams.get("serviceSlug");

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (storedAdmin) {
      setAdmin(storedAdmin);
    }

    axios
      .get(`${API_URL}/categories`)
      .then((response) => {
        const servicesList = response.data.reduce((acc, category) => {
          return [...acc, ...category.services];
        }, []);
        setServices(servicesList);

        if (serviceSlug) {
          const service = servicesList.find(s => s.slug === serviceSlug);
          if (service) {
            setSelectedService(service);
          }
        }
      })
      .catch((error) => console.error("Lỗi khi lấy danh mục:", error));
  }, [serviceSlug]);

  const resetForm = () => {
    setNewPost({
      title: "",
      image: "",
      description: "",
      content: "",
    });
    setImageFile(null);
    // Reset file input by clearing its value
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    } 
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const addPost = async () => {
    if (!selectedService) {
      showNotification("⚠️ Hãy chọn một dịch vụ trước!", "error");
      return;
    }
    if (!imageFile || !newPost.title || !newPost.description || !newPost.content) {
      showNotification("⚠️ Vui lòng điền đầy đủ thông tin và chọn ảnh!", "error");
      return;
    }

    const formData = new FormData();
    formData.append("service_slug", selectedService.slug);
    formData.append("title", newPost.title.trim());
    formData.append("description", newPost.description.trim());
    formData.append("content", newPost.content.trim());
    formData.append("image", imageFile);

    try {
      await axios.post(`${API_URL}/posts`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showNotification("✅ Thêm bài viết thành công!", "success");
      resetForm();
    } catch (error) {
      console.error("Lỗi khi thêm bài viết:", error.response?.data || error);
      showNotification("❌ Lỗi khi thêm bài viết. Vui lòng thử lại!", "error");
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar admin={admin} />
      <div className="w-3/4 p-6 bg-gray-100 ml-[20%]">
        <h1 className="text-2xl font-bold">➕ Thêm bài viết mới</h1>

        {/* Thông báo */}
        {notification.show && (
          <div
            className={`mt-4 p-4 rounded-lg transition-all duration-500 ${notification.type === 'success'
              ? 'bg-green-100 text-green-700 border border-green-400'
              : 'bg-red-100 text-red-700 border border-red-400'
              }`}
          >
            {notification.message}
          </div>
        )}

        <div className="mt-4 bg-white p-6 rounded shadow">
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">🔹 Chọn dịch vụ:</h2>
              <select
                className="border rounded-md p-2 min-w-[300px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedService?.slug || ''}
                onChange={(e) => {
                  const service = services.find(s => s.slug === e.target.value);
                  if (service) {
                    setSelectedService(service);
                  }
                }}
              >
                <option value="" disabled>
                  -- Chọn dịch vụ --
                </option>
                {services.map((service) => (
                  <option key={service.slug} value={service.slug}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-2">Thông tin bài viết</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
              <input
                type="text"
                placeholder="Tiêu đề bài viết"
                className="border p-2 w-full mt-1 rounded"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Hình ảnh</label>
              <input
                type="file"
                accept="image/*"
                className="border p-2 w-full mt-1 rounded"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Mô tả ngắn</label>
              <textarea
                placeholder="Mô tả ngắn về bài viết"
                className="border p-2 w-full mt-1 rounded"
                rows="3"
                value={newPost.description}
                onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Nội dung bài viết</label>
              <textarea
                placeholder="Nội dung đầy đủ của bài viết"
                className="border p-2 w-full mt-1 rounded"
                rows="10"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={addPost}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Thêm bài viết
              </button>

              <button
                onClick={() => navigate("/admin/quan-ly-bai-viet")}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;