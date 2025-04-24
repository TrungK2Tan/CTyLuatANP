import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import axios from "axios";

const EditPost = () => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
    const { slug } = useParams();
    const navigate = useNavigate();
    const contentEditableRef = useRef(null);

    const [post, setPost] = useState({
        title: "",
        description: "",
        content: "",
        image: "",
        category_id: null,
        serviceId: "", // Added serviceId field
    });
    const [newImage, setNewImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [admin, setAdmin] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [services, setServices] = useState([]); // Added services state

    useEffect(() => {
        const storedAdmin = JSON.parse(localStorage.getItem("admin"));
        if (storedAdmin) {
            setAdmin(storedAdmin);
        }

        // Fetch services list
        // Trong useEffect
        const fetchServices = async () => {
            try {
                // 1. Lấy danh sách các danh mục
                const categoriesResponse = await axios.get(`${API_URL}/categories`);
                const categories = categoriesResponse.data || [];

                // 2. Tạo danh sách services đầy đủ từ các danh mục
                const allServices = [];
                categories.forEach(category => {
                    if (category.services && Array.isArray(category.services)) {
                        category.services.forEach(service => {
                            allServices.push({
                                _id: service._id,
                                name: service.name,
                                slug: service.slug,
                                categoryName: category.name,
                                categoryId: category._id
                            });
                        });
                    }
                });

                setServices(allServices);
            } catch (err) {
                console.error("Lỗi khi lấy danh sách dịch vụ:", err);
            }
        };

        fetchServices();

        if (!slug) return;

        const fetchPost = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/posts/detail/${slug}`);
                const postData = response.data;

                // Tìm serviceId từ service_slug
                let serviceId = "";
                if (postData.service && postData.service_slug) {
                    const service = services.find(s => s.slug === postData.service_slug);
                    if (service) {
                        serviceId = service._id;
                    }
                }

                setPost({
                    ...postData,
                    serviceId
                });

                setImagePreview(postData.image);

                if (contentEditableRef.current) {
                    contentEditableRef.current.innerHTML = postData.content || '';
                }
                setLoading(false);
            } catch (err) {
                console.error("Lỗi khi lấy thông tin bài viết:", err);
                setError("❌ Không thể tải thông tin bài viết");
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewImage(file);
        setImagePreview(URL.createObjectURL(file)); // Hiển thị ảnh mới trước khi upload
    };

    const handleContentChange = (e) => {
        // Cập nhật nội dung từ trình soạn thảo
        const content = e.target.innerHTML;
        setPost({ ...post, content });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        // Cập nhật nội dung từ contentEditable trước khi gửi
        if (contentEditableRef.current) {
            setPost(prev => ({ ...prev, content: contentEditableRef.current.innerHTML }));
        }

        if (!post.title || !post.description) {
            return alert("Vui lòng điền đầy đủ thông tin!");
        }

        const formData = new FormData();
        formData.append("title", post.title.trim());
        formData.append("description", post.description.trim());
        formData.append("content", contentEditableRef.current ? contentEditableRef.current.innerHTML : post.content);
        formData.append("serviceId", post.serviceId); // Added serviceId
        if (newImage) {
            formData.append("image", newImage);
        }

        try {
            await axios.put(`${API_URL}/posts/${post.slug}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("✅ Cập nhật bài viết thành công!");
            navigate("/admin/quan-ly-bai-viet");
        } catch (error) {
            console.error("❌ Lỗi khi cập nhật bài viết:", error.response?.data || error);
            alert("❌ Lỗi khi cập nhật bài viết!");
        }
    };

    if (loading) return (
        <div className="flex min-h-screen">
            <AdminSidebar admin={admin} />
            <div className="w-3/4 p-6 bg-gray-100 ml-[20%]">
                <p>🔄 Đang tải...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="flex min-h-screen">
            <AdminSidebar admin={admin} />
            <div className="w-3/4 p-6 bg-gray-100 ml-[20%]">
                <p className="text-red-500">{error}</p>
                <button
                    onClick={() => navigate("/admin/quan-ly-bai-viet")}
                    className="bg-gray-500 text-white p-2 rounded mt-4 hover:bg-gray-600"
                >
                    🔙 Quay lại
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen">
            <AdminSidebar admin={admin} />
            <div className="w-3/4 p-6 bg-gray-100 ml-[20%]">
                <h1 className="text-2xl font-bold">✏️ Chỉnh Sửa Bài Viết</h1>
                <div className="mt-4 bg-white p-4 rounded shadow">
                    <form onSubmit={handleUpdate} className="space-y-4" encType="multipart/form-data">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
                            <input
                                type="text"
                                value={post.title}
                                onChange={(e) => setPost({ ...post, title: e.target.value })}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                            <input
                                type="text"
                                value={post.description}
                                onChange={(e) => setPost({ ...post, description: e.target.value })}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        {/* Service selection dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Chọn dịch vụ</label>
                            {/* Hiển thị dịch vụ hiện tại */}
                            {post.service && (
                                <div className="mb-2 p-2 bg-blue-50 border border-blue-200 rounded">
                                    <p className="text-sm text-blue-800">
                                        <span className="font-medium">Dịch vụ hiện tại:</span> {post.service.name}
                                    </p>
                                </div>
                            )}
                            <select
                                value={post.serviceId}
                                onChange={(e) => setPost({ ...post, serviceId: e.target.value })}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">-- Chọn dịch vụ --</option>
                                dịch vụ Hiện Tại: {post.service.name}
                                {services.map((service) => (
                                    <option key={service._id} value={service._id}>
                                        {service.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
                            <div className="border rounded mb-2">
                                <div className="bg-gray-100 p-2 border-b flex justify-between">
                                    <div className="flex space-x-2">
                                        <button type="button" onClick={() => document.execCommand('bold')} className="px-2 py-1 bg-white border rounded hover:bg-gray-100">
                                            <strong>B</strong>
                                        </button>
                                        <button type="button" onClick={() => document.execCommand('italic')} className="px-2 py-1 bg-white border rounded hover:bg-gray-100">
                                            <em>I</em>
                                        </button>
                                        <button type="button" onClick={() => document.execCommand('underline')} className="px-2 py-1 bg-white border rounded hover:bg-gray-100">
                                            <u>U</u>
                                        </button>
                                        <button type="button" onClick={() => document.execCommand('formatBlock', false, 'h1')} className="px-2 py-1 bg-white border rounded hover:bg-gray-100">
                                            H1
                                        </button>
                                        <button type="button" onClick={() => document.execCommand('formatBlock', false, 'h2')} className="px-2 py-1 bg-white border rounded hover:bg-gray-100">
                                            H2
                                        </button>
                                        <button type="button" onClick={() => document.execCommand('formatBlock', false, 'p')} className="px-2 py-1 bg-white border rounded hover:bg-gray-100">
                                            P
                                        </button>
                                        <button type="button" onClick={() => document.execCommand('insertUnorderedList')} className="px-2 py-1 bg-white border rounded hover:bg-gray-100">
                                            • List
                                        </button>
                                    </div>
                                </div>
                                <div
                                    ref={contentEditableRef}
                                    contentEditable="true"
                                    className="p-3 min-h-[300px] post-content"
                                    onInput={handleContentChange}
                                    onBlur={handleContentChange}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-500">
                                Sử dụng thanh công cụ phía trên để định dạng nội dung.
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh hiện tại</label>
                            {imagePreview && <img src={imagePreview} alt="Ảnh hiện tại" className="w-40 h-40 object-cover rounded" />}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Thay đổi ảnh</label>
                            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />
                        </div>

                        <div className="flex gap-2">
                            <button type="submit" className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">✅ Cập nhật</button>
                            <button type="button" onClick={() => navigate('/admin/quan-ly-bai-viet')} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition">🔙 Quay lại</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPost;