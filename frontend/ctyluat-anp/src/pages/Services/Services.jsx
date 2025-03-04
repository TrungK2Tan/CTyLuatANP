import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Header from "../../components/Header";
import Banner from "../../img/detail_banner.png";

const itemsPerPage = 3;

const Services = () => {
  const { serviceSlug } = useParams();
  const [service, setService] = useState(null);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/posts/${serviceSlug}`);
  
        setService(response.data.service);
        setPosts(response.data.posts || []); // Nếu không có bài viết, đặt posts là mảng rỗng
      } catch (error) {
        console.error("Lỗi khi tải bài viết:", error);
        setService(null);
        setPosts([]); // Nếu lỗi API, đặt posts thành mảng rỗng
      } finally {
        setLoading(false);
      }
    };
  
    fetchPosts();
  }, [serviceSlug]);
  

  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col">
      <Header />
      <div className="relative w-full h-[220px] mt-20">
        <img src={Banner} className="w-full h-full object-cover" alt="Banner" />
        <div className="absolute inset-0 flex items-center h-full w-[70%] mx-auto">
          <h2 className="text-4xl font-semibold text-white">
            {service ? service.name : "Đang tải..."}
          </h2>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 w-[70%]">
        {/* Hiển thị danh sách bài viết */}
        {loading ? (
          <p className="text-center text-gray-500 text-lg">Đang tải dữ liệu...</p>
        ) : (
          <>
           
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentPosts.length > 0 ? (
                currentPosts.map((post) => (
                  <motion.div
                    key={post._id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Link to={`/${post.slug}`}>
                      <img src={post.image} alt={post.title} className="w-full h-80 object-cover" />
                    </Link>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-3">{post.description}</p>
                      <Link
                        to={`/${post.slug}`}
                        className="mt-3 inline-block text-white bg-blue-600 px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-orange-500 transition duration-700"
                      >
                        Xem tiếp →
                      </Link>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-gray-500 text-lg">Không có bài viết nào.</p>
              )}
            </motion.div>

            {/* Phân trang */}
            {totalPages > 1 && (
              <div className="flex justify-start mt-8 space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg shadow-md font-bold ${
                    currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-orange-500 text-white hover:bg-orange-600"
                  }`}
                >
                  ← Trước
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 rounded-lg shadow-md font-bold ${
                      currentPage === index + 1 ? "bg-orange-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg shadow-md font-bold ${
                    currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-orange-500 text-white hover:bg-orange-600"
                  }`}
                >
                  Sau →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Services;
