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
        
        // If serviceSlug was provided in URL params, preselect it
        if (serviceSlug) {
          const service = servicesList.find(s => s.slug === serviceSlug);
          if (service) {
            setSelectedService(service);
          }
        }
      })
      .catch((error) => console.error("Lỗi khi lấy danh mục:", error));
  }, [serviceSlug]);

  const addPost = async () => {
    if (!selectedService) return alert("Hãy chọn một dịch vụ trước!");
    if (
      !imageFile ||
      !newPost.title ||
      !newPost.description ||
      !newPost.content
    ) {
      alert("Vui lòng điền đầy đủ thông tin và chọn ảnh!");
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
    alert("Thêm bài viết thành công!");
    navigate("/admin/quan-ly-bai-viet");
    } catch (error) {
      console.error("Lỗi khi thêm bài viết:", error.response?.data || error);
      alert("Lỗi khi thêm bài viết. Kiểm tra console để biết chi tiết.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar admin={admin} />
      <div className="w-3/4 p-6 bg-gray-100 ml-[25%]">
        <h1 className="text-2xl font-bold">➕ Thêm bài viết mới</h1>
        
        <div className="mt-4 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Chọn dịch vụ</h2>
          <div className="flex flex-wrap mb-4">
            {services.map((service) => (
              <button
                key={service.slug}
                className={`p-2 m-1 border ${
                  selectedService?.slug === service.slug
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`}
                onClick={() => setSelectedService(service)}
              >
                {service.name}
              </button>
            ))}
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
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                Thêm bài viết
              </button>
              
              <button
                onClick={() => navigate("/admin/quan-ly-bai-viet")}
                className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
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