import React, { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Banner from "../../img/detail_banner.png";
import MauDon from "../../img/maudon.png";

// Dữ liệu biểu mẫu
const forms = [
  {
    title: "Mẫu đơn khởi kiện dân sự",
    description:
      "Mẫu đơn khởi kiện vụ án hành chính do công ty Luật ANP cung cấp cho Quý bạn đọc...",
    image: MauDon,
    link: "#",
  },
  {
    title: "Mẫu đơn ly hôn",
    description:
      "Mẫu đơn ly hôn dành cho các trường hợp thuận tình hoặc đơn phương...",
    image: MauDon,
    link: "#",
  },
  {
    title: "Mẫu hợp đồng lao động",
    description: "Mẫu hợp đồng lao động chuẩn theo quy định của pháp luật...",
    image: MauDon,
    link: "#",
  },
  {
    title: "Mẫu hợp đồng thuê nhà",
    description: "Mẫu hợp đồng thuê nhà giúp đảm bảo quyền lợi giữa các bên...",
    image: MauDon,
    link: "#",
  },
  {
    title: "Mẫu đơn xin nghỉ việc",
    description:
      "Mẫu đơn xin nghỉ việc theo quy định, chuyên nghiệp và rõ ràng...",
    image: MauDon,
    link: "#",
  },
  {
    title: "Mẫu biên bản họp",
    description:
      "Mẫu biên bản họp được sử dụng trong các cuộc họp quan trọng...",
    image: MauDon,
    link: "#",
  },
  {
    title: "Mẫu giấy ủy quyền",
    description: "Mẫu giấy ủy quyền dùng trong nhiều trường hợp khác nhau...",
    image: MauDon,
    link: "#",
  },
  {
    title: "Mẫu đơn đăng ký kinh doanh",
    description: "Hỗ trợ đăng ký kinh doanh theo quy định của pháp luật...",
    image: MauDon,
    link: "#",
  },
];

// Số biểu mẫu mỗi trang
const itemsPerPage = 6;

const News = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Tính tổng số trang
  const totalPages = Math.ceil(forms.length / itemsPerPage);

  // Lọc danh sách biểu mẫu theo trang hiện tại
  const currentForms = forms.slice(
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
        <img src={Banner} className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center h-full w-[70%] mx-auto">
          <h2 className="text-4xl font-semibold text-white">Tin tức</h2>
        </div>
      </div>

      {/* Danh sách tin tức*/}
      <div className="container mx-auto px-4 py-10 w-[70%]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {currentForms.map((form, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <img
                src={form.image}
                alt={form.title}
                className="w-full h-80 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {form.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {form.description}
                </p>

                <a
                  href={form.link}
                  className="mt-3 inline-block text-white bg-blue-600 px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-orange-500 transition duration-700"
                >
                  Xem tiếp →
                </a>
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
