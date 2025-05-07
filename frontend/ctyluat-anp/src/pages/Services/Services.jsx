import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Header from "../../components/Header";
import Banner from "../../img/detail_banner.png";
import Footer from "../../components/Footer";

const itemsPerPage = 9;

const Services = () => {
  const { serviceSlug } = useParams();
  const [service, setService] = useState(null);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setCurrentPage(1); // Reset currentPage về 1 khi serviceSlug thay đổi
        const response = await axios.get(`${API_URL}/posts/${serviceSlug}`);
        setService(response.data.service);
        setPosts(response.data.posts || []);
      } catch (error) {
        console.error("Lỗi khi tải bài viết:", error);
        setService(null);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
    window.scrollTo(0, 0);
  }, [serviceSlug]); // Thêm serviceSlug vào dependencies

  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll đến posts section với offset để tránh banner
      const postsSection = document.getElementById('posts-section');
      const headerHeight = 220; // Chiều cao của banner
      const navbarHeight = 80; // Chiều cao của navbar
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

    // First page
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

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium ${currentPage === i
            ? "bg-orange-500 text-white hover:bg-orange-600"
            : "bg-white border border-gray-300 hover:bg-gray-50"
            }`}
        >
          {i}
        </button>
      );
    }

    // Last page
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
          <h2 className="text-4xl font-semibold text-white">
            {service ? service.name : "Đang tải..."}
          </h2>
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
            {/* Posts Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {currentPosts.length > 0 ? (
                currentPosts.map((post) => (
                  <motion.div
                    key={post._id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link to={`/${post.slug}`}>
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </Link>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {post.description}
                      </p>
                      <Link
                        to={`/${post.slug}`}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                      >
                        Xem chi tiết
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 text-center py-20">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12a4 4 0 110-8 4 4 0 010 8z"
                    />
                  </svg>
                  <p className="mt-4 text-lg text-gray-500">
                    Không có bài viết nào trong mục này
                  </p>
                </div>
              )}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 w-full"> {/* Thêm w-full */}
                <div className="flex items-center space-x-2 justify-center"> {/* Thêm justify-center */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center w-8 h-8 rounded-md text-sm ${currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                      }`}
                  >
                    <span>&lt;</span>
                  </button>

                  {renderPaginationButtons()}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center w-8 h-8 rounded-md text-sm ${currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                      }`}
                  >
                    <span>&gt;</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />

      {/* Copyright Section */}
      <div className="bg-blue-950 w-full py-4">
        <div className="container mx-auto text-white w-[70%] border-t border-white/20 pt-4 flex justify-between text-sm">
          <span>© 2024 Công ty Luật ANP. Đã đăng ký bản quyền.</span>
          <span>Thiết kế bởi DUDI Software</span>
        </div>
      </div>
    </div>
  );
};

export default Services;