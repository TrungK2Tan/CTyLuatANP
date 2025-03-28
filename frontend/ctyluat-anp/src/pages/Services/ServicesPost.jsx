import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../Admin/components/AdminSidebar";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const ServicesPost = () => {
  const [imageFile, setImageFile] = useState(null);
  const [admin, setAdmin] = useState({});
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editingImageFile, setEditingImageFile] = useState(null);
  const [newPost, setNewPost] = useState({
    title: "",
    image: "",
    description: "",
    content: "",
  });
  const [editingPost, setEditingPost] = useState(null);

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
      setNewPost({ title: "", description: "", content: "" });
      setImageFile(null);
      fetchPostsByService(selectedService);
    } catch (error) {
      console.error("Lỗi khi thêm bài viết:", error.response?.data || error);
      alert("Lỗi khi thêm bài viết. Kiểm tra console để biết chi tiết.");
    }
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
  const startEditing = (post) => {
    setEditingPost({ ...post });
    setEditingImageFile(null);
  };

  const updatePost = async () => {
    const formData = new FormData();
    formData.append("title", editingPost.title);
    formData.append("description", editingPost.description);
    formData.append("content", editingPost.content);
    if (editingImageFile) {
      formData.append("image", editingImageFile);
    }

    try {
      const response = await axios.put(
        `${API_URL}/posts/${editingPost.slug}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setPosts(
        posts.map((p) => (p.slug === editingPost.slug ? response.data.post : p))
      );
      setEditingPost(null);
      setEditingImageFile(null);
    } catch (error) {
      console.error("Lỗi khi cập nhật bài viết:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar admin={admin} />
      <div className="w-3/4 p-6 bg-gray-100">
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
                      <button
                        onClick={() => startEditing(post)}
                        className="bg-yellow-500 text-white p-2 rounded mx-1"
                      >
                        Sửa
                      </button>
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
            {selectedService && (
              <>
                <h2 className="text-xl font-semibold mt-4">
                  ➕ Thêm bài viết mới
                </h2>
                <input
                  type="text"
                  placeholder="Tiêu đề"
                  className="border p-2 w-full mt-2"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                />
                <input
                  type="file"
                  className="border p-2 w-full mt-2"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
                <textarea
                  placeholder="Mô tả"
                  className="border p-2 w-full mt-2"
                  value={newPost.description}
                  onChange={(e) =>
                    setNewPost({ ...newPost, description: e.target.value })
                  }
                />
                <textarea
                  placeholder="Nội dung bài viết"
                  className="border p-2 w-full mt-2"
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost({ ...newPost, content: e.target.value })
                  }
                />
                <button
                  onClick={addPost}
                  className="bg-green-500 text-white p-2 rounded mt-2"
                >
                  Thêm bài viết
                </button>
              </>
            )}
            {editingPost && (
              <div className="mt-4 p-4 bg-white shadow rounded">
                <h2 className="text-xl font-semibold">✏️ Chỉnh sửa bài viết</h2>
                <input
                  type="text"
                  className="border p-2 w-full mt-2"
                  value={editingPost.title}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, title: e.target.value })
                  }
                />
                <input
                  type="file"
                  className="border p-2 w-full mt-2"
                  onChange={(e) => setEditingImageFile(e.target.files[0])}
                />
                <textarea
                  className="border p-2 w-full mt-2"
                  value={editingPost.description}
                  onChange={(e) =>
                    setEditingPost({
                      ...editingPost,
                      description: e.target.value,
                    })
                  }
                />
                <textarea
                  className="border p-2 w-full mt-2"
                  value={editingPost.content}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, content: e.target.value })
                  }
                />
                <button
                  onClick={updatePost}
                  className="bg-blue-500 text-white p-2 rounded mt-2"
                >
                  Cập nhật
                </button>
                <button
                  onClick={() => setEditingPost(null)}
                  className="bg-gray-500 text-white p-2 rounded mt-2 ml-2"
                >
                  Hủy
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ServicesPost;
