import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Sử dụng Link để điều hướng
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Banner from "../../img/detail_banner.png";
import axios from "axios"; // Dùng axios để gọi API

const itemsPerPage = 6;

const News = () => {
  const [news, setNews] = useState([]); // State để lưu danh sách bài viết
  const [currentPage, setCurrentPage] = useState(1);

  // Gọi API lấy danh sách tin tức khi component mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:8000/news");
        setNews(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tin tức:", error);
      }
    };

    fetchNews();
  }, []);

  // Tính tổng số trang
  const totalPages = Math.ceil(news.length / itemsPerPage);

  // Lọc danh sách bài viết theo trang hiện tại
  const currentNews = news.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Xử lý chuyển trang
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col">
      <Header />

      {/* Banner */}
      <div className="relative w-full h-[220px] mt-20">
        <img src={Banner} className="w-full h-full object-cover" alt="Banner" />
        <div className="absolute inset-0 flex items-center h-full w-[70%] mx-auto">
          <h2 className="text-4xl font-semibold text-white">Tin tức</h2>
        </div>
      </div>

      {/* Danh sách tin tức */}
      <div className="container mx-auto px-4 py-10 w-[70%]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {currentNews.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <Link to={`/danhmuc/tin-tuc/${item.slug}`}>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-80 object-cover"
              />
              </Link>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {item.description}
                </p>

                <Link
                  to={`/danhmuc/tin-tuc/${item.slug}`}
                  className="mt-3 inline-block text-white bg-blue-600 px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-orange-500 transition duration-700"
                >
                  Xem tiếp →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Phân trang */}
        <div className="flex justify-start mt-8 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg shadow-md font-bold ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            ← Trước
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-lg shadow-md font-bold ${
                currentPage === index + 1
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg shadow-md font-bold ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            Sau →
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default News;
