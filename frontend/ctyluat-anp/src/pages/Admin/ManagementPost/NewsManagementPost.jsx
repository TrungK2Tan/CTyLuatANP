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
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

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

  useEffect(() => {
    // Calculate total pages when posts or itemsPerPage changes
    setTotalPages(Math.ceil(posts.length / itemsPerPage));
  }, [posts, itemsPerPage]);

  const fetchPostsByService = (service) => {
    axios
      .get(`${API_URL}/posts/${service.slug}`)
      .then((response) => {
        setSelectedService(service);
        setPosts(response.data.posts);
        setCurrentPage(1); // Reset to first page when changing service
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

  // Get current page data
  const getCurrentData = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return posts.slice(indexOfFirstItem, indexOfLastItem);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar admin={admin} />
      <div className="w-3/4 p-6 bg-gray-100 ml-[20%]">
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
            <div className="mt-2 mb-4 flex justify-between items-center">
              <Link 
                to={`/admin/tao-bai-viet?serviceSlug=${selectedService.slug}`} 
                className="bg-green-500 text-white p-2 rounded"
              >
                Thêm bài viết mới
              </Link>
              
              <div className="flex items-center">
                <label htmlFor="itemsPerPage" className="mr-2">Hiển thị:</label>
                <select
                  id="itemsPerPage"
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="border rounded p-1"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
            
            <table className="w-full bg-white shadow rounded mt-2">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">STT</th>
                  <th className="p-2">Tiêu đề</th>
                  <th className="p-2">Hình ảnh</th>
                  <th className="p-2">Mô tả</th>
                  <th className="p-2">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {posts.length > 0 ? (
                  getCurrentData().map((post, index) => (
                    <tr key={post.slug} className="border-t hover:bg-gray-100">
                      <td className="p-2 text-center">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td className="p-2">{post.title}</td>
                      <td className="p-2">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-16 h-16"
                        />
                      </td>
                      <td className="p-2">
                        <p className="line-clamp-2">
                          {post.description.length > 50
                            ? post.description.substring(0, 50) + "..."
                            : post.description}
                        </p>
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-4">
                      Không có bài viết nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <nav className="flex items-center">
                  <button 
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className={`mx-1 px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:bg-gray-100 border'}`}
                  >
                    &laquo;
                  </button>
                  
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`mx-1 px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:bg-gray-100 border'}`}
                  >
                    &lt;
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => {
                      // Display 5 pages near current page
                      return Math.abs(page - currentPage) < 2 || page === 1 || page === totalPages;
                    })
                    .map((page, index, array) => {
                      // Add ellipsis if there's a gap between pages
                      if (index > 0 && array[index] - array[index - 1] > 1) {
                        return (
                          <React.Fragment key={`ellipsis-${page}`}>
                            <span className="mx-1 px-3 py-1">...</span>
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`mx-1 px-3 py-1 rounded ${
                                page === currentPage
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-white hover:bg-gray-100 border'
                              }`}
                            >
                              {page}
                            </button>
                          </React.Fragment>
                        );
                      }
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`mx-1 px-3 py-1 rounded ${
                            page === currentPage
                              ? 'bg-blue-500 text-white'
                              : 'bg-white hover:bg-gray-100 border'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  
                  <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`mx-1 px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:bg-gray-100 border'}`}
                  >
                    &gt;
                  </button>
                  
                  <button 
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className={`mx-1 px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:bg-gray-100 border'}`}
                  >
                    &raquo;
                  </button>
                </nav>
              </div>
            )}
            
            <div className="mt-2 text-center text-gray-600 text-sm">
              Hiển thị {getCurrentData().length} trên {posts.length} bài viết | Trang {currentPage}/{totalPages || 1}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsManagementPost;