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
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (storedAdmin) {
      setAdmin(storedAdmin);
    }

    // Fetch services
    axios
      .get(`${API_URL}/categories`)
      .then((response) => {
        const servicesList = response.data.reduce((acc, category) => {
          return [...acc, ...category.services];
        }, []);
        setServices(servicesList);
        // Auto select first service and fetch its posts
        if (servicesList.length > 0) {
          fetchPostsByService(servicesList[0]);
        }
      })
      .catch((error) => console.error("Lỗi khi lấy danh mục:", error));
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(posts.length / itemsPerPage));
  }, [posts, itemsPerPage]);

  const fetchPostsByService = (service) => {
    setLoading(true);
    axios
      .get(`${API_URL}/posts/${service.slug}`)
      .then((response) => {
        setSelectedService(service);
        setPosts(response.data.posts);
        setCurrentPage(1);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy bài viết:", error);
        setPosts([]);
        setLoading(false);
      });
  };

  const deletePost = async (slug) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) return;

    try {
      await axios.delete(`${API_URL}/posts/${slug}`);
      setPosts(posts.filter((p) => p.slug !== slug));
      alert("✅ Xóa bài viết thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa bài viết:", error);
      alert("❌ Không thể xóa bài viết.");
    }
  };

  const getCurrentData = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return posts.slice(indexOfFirstItem, indexOfLastItem);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const tableElement = document.querySelector('.bg-white.p-4');
    if (tableElement) {
      const yOffset = -20;
      const y = tableElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar admin={admin} />
      <div className="w-3/4 p-6 bg-gray-100 ml-[20%]">
        <h1 className="text-2xl font-bold">📜 Quản lý bài viết</h1>

        <div className="mt-4 bg-white p-4 rounded shadow">
          {/* Menu dropdown */}
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">🔹 Chọn dịch vụ:</h2>
              <select
                className="border rounded-md p-2 min-w-[300px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedService?.slug || ''}
                onChange={(e) => {
                  const service = services.find(s => s.slug === e.target.value);
                  if (service) {
                    fetchPostsByService(service);
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
          {selectedService && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  📝 Bài viết của "{selectedService.name}"
                </h2>
                <div className="flex gap-4">
                  <Link
                    to={`/admin/tao-bai-viet?serviceSlug=${selectedService.slug}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Tạo Bài Viết Mới
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
              </div>

              {loading ? (
                <p className="text-center py-4">Đang tải danh sách...</p>
              ) : (
                <>
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border p-2">STT</th>
                        <th className="border p-2">Tiêu đề</th>
                        <th className="border p-2">Hình ảnh</th>
                        <th className="border p-2">Mô tả</th>
                        <th className="border p-2 w-1/4">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.length > 0 ? (
                        getCurrentData().map((post, index) => (
                          <tr key={post.slug} className="text-center hover:bg-gray-50">
                            <td className="border p-2">
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td className="border p-2">{post.title}</td>
                            <td className="border p-2">
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-16 h-16 mx-auto"
                              />
                            </td>
                            <td className="border p-2">
                              <p className="line-clamp-2">
                                {post.description.length > 50
                                  ? post.description.substring(0, 50) + "..."
                                  : post.description}
                              </p>
                            </td>
                            <td className="border p-2">
                              <div className="flex justify-center gap-2">
                                <Link
                                  to={`/admin/quan-ly-bai-viet/${post.slug}`}
                                  className="text-blue-500 hover:underline"
                                >
                                  Xem chi tiết
                                </Link>
                                <Link
                                  to={`/admin/quan-ly-bai-viet/sua/${post.slug}`}
                                  className="text-yellow-500 hover:underline"
                                >
                                  Sửa
                                </Link>
                                <button
                                  onClick={() => deletePost(post.slug)}
                                  className="text-red-500 hover:underline"
                                >
                                  Xóa
                                </button>
                              </div>
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

                  {totalPages > 1 && (
                    <div className="flex justify-center mt-4">
                      <nav className="flex items-center">
                        <button
                          onClick={() => handlePageChange(1)}
                          disabled={currentPage === 1}
                          className={`mx-1 px-3 py-1 rounded ${currentPage === 1
                            ? "bg-gray-200 cursor-not-allowed"
                            : "bg-white hover:bg-gray-100 border"
                            }`}
                        >
                          &laquo;
                        </button>

                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`mx-1 px-3 py-1 rounded ${currentPage === 1
                            ? "bg-gray-200 cursor-not-allowed"
                            : "bg-white hover:bg-gray-100 border"
                            }`}
                        >
                          &lt;
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter((page) => {
                            return (
                              Math.abs(page - currentPage) < 2 ||
                              page === 1 ||
                              page === totalPages
                            );
                          })
                          .map((page, index, array) => {
                            if (index > 0 && array[index] - array[index - 1] > 1) {
                              return (
                                <React.Fragment key={`ellipsis-${page}`}>
                                  <span className="mx-1 px-3 py-1">...</span>
                                  <button
                                    onClick={() => handlePageChange(page)}
                                    className={`mx-1 px-3 py-1 rounded ${page === currentPage
                                      ? "bg-blue-500 text-white"
                                      : "bg-white hover:bg-gray-100 border"
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
                                className={`mx-1 px-3 py-1 rounded ${page === currentPage
                                  ? "bg-blue-500 text-white"
                                  : "bg-white hover:bg-gray-100 border"
                                  }`}
                              >
                                {page}
                              </button>
                            );
                          })}

                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`mx-1 px-3 py-1 rounded ${currentPage === totalPages
                            ? "bg-gray-200 cursor-not-allowed"
                            : "bg-white hover:bg-gray-100 border"
                            }`}
                        >
                          &gt;
                        </button>

                        <button
                          onClick={() => handlePageChange(totalPages)}
                          disabled={currentPage === totalPages}
                          className={`mx-1 px-3 py-1 rounded ${currentPage === totalPages
                            ? "bg-gray-200 cursor-not-allowed"
                            : "bg-white hover:bg-gray-100 border"
                            }`}
                        >
                          &raquo;
                        </button>
                      </nav>
                    </div>
                  )}

                  <div className="mt-2 text-center text-gray-600 text-sm">
                    Hiển thị {getCurrentData().length} trên {posts.length} bài viết | Trang{" "}
                    {currentPage}/{totalPages || 1}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsManagementPost;