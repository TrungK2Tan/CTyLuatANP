import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Banner from "../../img/detail_banner.png";
import axios from "axios";

const itemsPerPage = 9;
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const News = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/news`);
        setNews(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tin tức:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const totalPages = Math.ceil(news.length / itemsPerPage);
  const currentNews = news.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const postsSection = document.getElementById('posts-section');
      const headerHeight = 220;
      const navbarHeight = 80;
      const offset = headerHeight + navbarHeight;

      window.scrollTo({
        top: postsSection.offsetTop - offset,
        behavior: 'smooth'
      });
    }
  };

  const renderPaginationButtons = () => {
    const maxVisibleButtons = 5;
    const pages = [];
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxVisibleButtons) {
      if (currentPage <= Math.floor(maxVisibleButtons / 2)) {
        endPage = maxVisibleButtons;
      } else if (currentPage + Math.floor(maxVisibleButtons / 2) >= totalPages) {
        startPage = totalPages - maxVisibleButtons + 1;
      } else {
        startPage = currentPage - Math.floor(maxVisibleButtons / 2);
        endPage = currentPage + Math.floor(maxVisibleButtons / 2);
      }
    }

    if (startPage > 1) {
      pages.push(
        <button
          key="1"
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 rounded-md text-sm bg-white border border-gray-300 hover:bg-gray-50"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="dots-1" className="px-2 py-2">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 rounded-md text-sm font-medium ${currentPage === i
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-white border border-gray-300 hover:bg-gray-50"
            }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="dots-2" className="px-2 py-2">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-2 rounded-md text-sm bg-white border border-gray-300 hover:bg-gray-50"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col">
      <Header />

      {/* Banner Section */}
      <div className="relative w-full h-[220px] mt-20">
        <img src={Banner} className="w-full h-full object-cover" alt="Banner" />
        <div className="absolute inset-0 flex items-center h-full w-[70%] mx-auto">
          <h2 className="text-4xl font-semibold text-white">Tin tức</h2>
        </div>
      </div>

      {/* Main Content Section */}
      <div id="posts-section" className="container mx-auto px-4 py-10 w-[70%]">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {currentNews.length > 0 ? (
                currentNews.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white shadow-lg rounded-lg overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link to={`/danhmuc/tin-tuc/${item.slug}`}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-80 object-cover"
                      />
                    </Link>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                        {item.description}
                      </p>
                      <Link
                        to={`/danhmuc/tin-tuc/${item.slug}`}
                        className="mt-3 inline-block text-white bg-blue-600 px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-colors duration-300"
                      >
                        Xem tiếp →
                      </Link>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 text-center py-20">
                  <p className="text-lg text-gray-500">
                    Không có tin tức nào
                  </p>
                </div>
              )}
            </motion.div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                    }`}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Trước
                </button>

                <div className="flex items-center space-x-2">
                  {renderPaginationButtons()}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                    }`}
                >
                  Sau
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />

      <div className="bg-blue-950 w-full py-4">
        <div className="container mx-auto text-white w-[70%] border-t border-white/20 pt-4 flex justify-between text-sm">
          <span>© 2024 Công ty Luật ANP. Đã đăng ký bản quyền.</span>
          <span>Thiết kế bởi DUDI Software</span>
        </div>
      </div>
    </div>
  );
};

export default News;