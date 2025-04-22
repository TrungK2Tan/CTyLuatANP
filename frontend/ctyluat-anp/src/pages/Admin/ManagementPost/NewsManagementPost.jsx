import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const NewsManagementPost = () => {
  const [admin, setAdmin] = useState({});
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [posts, setPosts] = useState([]);

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
      })
      .catch((error) => console.error("Lỗi khi lấy danh mục:", error));
  }, []);

  const fetchPostsByService = (service) => {
    axios
      .get(`${API_URL}/posts/${service.slug}`)
      .then((response) => {
        setSelectedService(service);
        setPosts(response.data.posts);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy bài viết:", error);
        setPosts([]);
      });
  };

  const deletePost = async (slug) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) return;

    try {
      await axios.delete(`${API_URL}/posts/${slug}`);
      setPosts(posts.filter((p) => p.slug !== slug));
    } catch (error) {
      console.error("Lỗi khi xóa bài viết:", error);
      alert("Không thể xóa bài viết.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar admin={admin} />
      <div className="w-3/4 p-6 bg-gray-100 ml-[25%]">
        <h1 className="text-2xl font-bold">📜 Quản lý bài viết</h1>

        <h2 className="text-xl font-semibold mt-4">🔹 Chọn dịch vụ</h2>
        <div className="flex flex-wrap">
          {services.map((service) => (
            <button
              key={service.slug}
              className={`p-2 m-1 border ${
                selectedService?.slug === service.slug
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
              onClick={() => fetchPostsByService(service)}
            >
              {service.name}
            </button>
          ))}
        </div>

        {selectedService && (
          <>
            <h2 className="text-xl font-semibold mt-4">
              📝 Bài viết của "{selectedService.name}"
            </h2>
            <div className="mt-2 mb-4">
             <Link 
                to={`/admin/tao-bai-viet?serviceSlug=${selectedService.slug}`} 
                className="bg-green-500 text-white p-2 rounded"
              >
                Thêm bài viết mới
              </Link>
            </div>
            <table className="w-full bg-white shadow rounded mt-2">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Tiêu đề</th>
                  <th className="p-2">Hình ảnh</th>
                  <th className="p-2">Mô tả</th>
                  <th className="p-2">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.slug} className="border-t hover:bg-gray-100">
                    <td className="p-2">{post.title}</td>
                    <td className="p-2">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-16 h-16"
                      />
                    </td>
                    <td className="p-2">
                      {post.description.length > 50
                        ? post.description.substring(0, 50) + "..."
                        : post.description}
                    </td>
                    <td className="p-2">
                     <Link
                        to={`/admin/quan-ly-bai-viet/${post.slug}`}
                        className="bg-blue-500 text-white p-2 rounded mx-1"
                      >
                        Chi tiết
                      </Link>
                      <Link
                        to={`/admin/quan-ly-bai-viet/sua/${post.slug}`}
                        className="bg-yellow-500 text-white p-2 rounded mx-1"
                      >
                        Sửa
                      </Link>
                      <button
                        onClick={() => deletePost(post.slug)}
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsManagementPost;