import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const NewsManagement = () => {
  const [admin, setAdmin] = useState({});
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [itemsPerPage, setItemsPerPage] = useState(10);// Số lượng tin tức hiển thị mỗi trang
  const [totalPages, setTotalPages] = useState(0);// Tổng số trang

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (storedAdmin) {
      setAdmin(storedAdmin);
    }
    fetchNews();
  }, []);

  useEffect(() => {
    // Tính toán tổng số trang khi news hoặc itemsPerPage thay đổi
    setTotalPages(Math.ceil(news.length / itemsPerPage));
  }, [news, itemsPerPage]);

  const fetchNews = () => {
    setLoading(true);
    fetch(`${API_URL}/news`)
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi tải danh sách tin tức:", error);
        setLoading(false);
      });
  };

  const handleDelete = async (slug) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa tin tức này?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/news/${slug}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        alert("✅ Xóa tin tức thành công!");
        fetchNews();
      } else {
        alert("❌ Lỗi khi xóa: " + data.error);
      }
    } catch (error) {
      console.error("Lỗi khi xóa tin tức:", error);
      alert("❌ Lỗi server khi xóa tin tức");
    }
  };

  // Lấy dữ liệu cho trang hiện tại
  const getCurrentData = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return news.slice(indexOfFirstItem, indexOfLastItem);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi số item mỗi trang
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar admin={admin} />
      <div className="w-3/4 p-6 bg-gray-100 ml-[25%]">
        <h1 className="text-2xl font-bold">📰 Quản lý tin tức</h1>

        <div className="mt-4 bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Danh sách tin tức</h2>
            <Link
              to="/admin/tao-tin-tuc"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Tạo Tin Tức Mới
            </Link>
          </div>
          
          <div className="flex justify-end mb-4">
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

          {loading ? (
            <p>Đang tải danh sách...</p>
          ) : (
            <>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">STT</th>
                    <th className="border p-2">Tiêu đề</th>
                    <th className="border p-2">Mô tả</th>
                    <th className="border p-2 w-1/4">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {news.length > 0 ? (
                    getCurrentData().map((item, index) => (
                      <tr key={item._id} className="text-center">
                        <td className="border p-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td className="border p-2">{item.title}</td>
                        <td className="border p-2">
                          <p className="line-clamp-2">{item.description}</p>
                        </td>

                        <td className="border p-2">
                          <div className="flex justify-center gap-2 flex-wrap">
                            <Link
                              to={`/admin/quan-ly-tin-tuc/${item.slug}`}
                              className="text-blue-500 hover:underline"
                            >
                              Xem chi tiết
                            </Link>

                            <Link
                              to={`/admin/quan-ly-tin-tuc/sua/${item.slug}`}
                              className="text-yellow-500 hover:underline"
                            >
                              Sửa
                            </Link>

                            <button
                              onClick={() => handleDelete(item.slug)}
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
                      <td colSpan="4" className="text-center p-4">
                        Không có tin tức nào.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              
              {/* Phân trang */}
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
                        // Hiển thị 5 trang gần trang hiện tại
                        return Math.abs(page - currentPage) < 2 || page === 1 || page === totalPages;
                      })
                      .map((page, index, array) => {
                        // Thêm dấu ... nếu có khoảng trống giữa các số trang
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
                Hiển thị {getCurrentData().length} trên {news.length} tin tức | Trang {currentPage}/{totalPages}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsManagement;