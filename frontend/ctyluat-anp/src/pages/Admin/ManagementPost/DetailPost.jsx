import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const DetailPost = () => {
  const [admin, setAdmin] = useState({});
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (storedAdmin) {
      setAdmin(storedAdmin);
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null); // Reset lỗi trước khi fetch
        
        const response = await axios.get(`${API_URL}/posts/detail/${slug}`, {
          timeout: 15000, // Thêm timeout để tránh request treo quá lâu
          headers: {
            Authorization: `Bearer ${storedAdmin?.token || ''}` // Thêm token nếu cần
          }
        });
        
        if (response.data) {
          setPost(response.data);
        } else {
          throw new Error("Dữ liệu bài viết trống");
        }
      } catch (err) {
        console.error("Lỗi khi lấy thông tin bài viết:", err);
        setError("Không thể tải thông tin bài viết");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    } else {
      setError("Không tìm thấy slug bài viết");
      setLoading(false);
    }
  }, [slug]);

  const deletePost = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) return;

    try {
      await axios.delete(`${API_URL}/posts/${slug}`, {
        headers: {
          Authorization: `Bearer ${admin?.token || ''}`
        }
      });
      alert("Xóa bài viết thành công!");
      navigate("/admin/quan-ly-bai-viet");
    } catch (error) {
      console.error("Lỗi khi xóa bài viết:", error);
      alert(error.response?.data?.message || "Không thể xóa bài viết.");
    }
  };

  const retryFetch = () => {
    setLoading(true);
    setError(null);
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API_URL}/posts/detail/${slug}`, {
          headers: {
            Authorization: `Bearer ${admin?.token || ''}`
          }
        });
        setPost(response.data);
      } catch (err) {
        console.error("Lỗi khi lấy thông tin bài viết:", err);
        setError("Không thể tải thông tin bài viết");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  };

  if (loading) return (
    <div className="flex min-h-screen">
      <AdminSidebar admin={admin} />
      <div className="w-3/4 p-6 bg-gray-100 ml-[25%]">
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          <p className="ml-3">⏳ Đang tải...</p>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex min-h-screen">
      <AdminSidebar admin={admin} />
      <div className="w-3/4 p-6 bg-gray-100 ml-[25%]">
        <div className="p-6 bg-white shadow rounded">
          <p className="text-red-500">❌ {error}</p>
          <div className="mt-4 flex space-x-4">
            <button 
              onClick={retryFetch}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              🔄 Thử lại
            </button>
            <button 
              onClick={() => navigate("/admin/quan-ly-bai-viet")}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              🔙 Quay lại danh sách
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      <AdminSidebar admin={admin} />
      <div className="w-3/4 p-6 bg-gray-100 ml-[25%]">
        <h1 className="text-2xl font-bold mb-4">📄 Chi tiết bài viết</h1>
        
        <div className="p-6 bg-white shadow rounded">
          <h2 className="text-2xl font-bold">📰 {post.title}</h2>
          
          {post.service && (
            <p className="mt-2 text-gray-600 font-medium">
              Thuộc dịch vụ: {post.service.name}
            </p>
          )}
          
          <p className="text-sm text-gray-500 mt-1">
            Ngày tạo: {new Date(post.createdAt).toLocaleDateString('vi-VN')}
            {post.updatedAt !== post.createdAt && (
              <> | Cập nhật: {new Date(post.updatedAt).toLocaleDateString('vi-VN')}</>
            )}
          </p>
          
                            {/* Hiển thị hình ảnh */}
          {post.image && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Hình ảnh</h3>
              <img 
                src={post.image} 
                alt={post.title} 
                className="max-w-full h-auto rounded shadow-md"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder-image.png";
                }}
              />
            </div>
          )}

          <p className="mt-2 text-gray-500 font-medium">Mô tả: {post.description}</p>
          
          {/* Hiển thị nội dung bài viết sử dụng dangerouslySetInnerHTML */}
          <div 
            className="mt-4 text-gray-700 post-content" 
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
          

          
          <div className="mt-6 flex gap-3">
            <Link
              to={`/admin/quan-ly-bai-viet/sua/${post.slug}`}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
            >
              ✏️ Chỉnh sửa
            </Link>
            <button
              onClick={deletePost}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              🗑️ Xóa bài viết
            </button>
            <Link
              to="/admin/quan-ly-bai-viet"
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              🔙 Quay lại
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;