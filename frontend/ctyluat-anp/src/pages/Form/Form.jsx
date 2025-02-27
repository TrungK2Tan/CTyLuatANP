import React from "react";
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
      "Mẫu đơn khởi kiện vụ án hành chính do công ty Luật ANP cung cấp cho Quý bạn đọc, liên hệ luật sư của chúng tôi để được hướng...",
    image: MauDon,
    link: "#",
  },
  {
    title: "Mẫu đơn ly hôn",
    description:
      "Mẫu đơn ly hôn dành cho các trường hợp thuận tình hoặc đơn phương, giúp bạn thực hiện các thủ tục một cách chính xác...",
    image: MauDon,
    link: "#",
  },
  {
    title: "Mẫu hợp đồng lao động",
    description:
      "Mẫu hợp đồng lao động chuẩn theo quy định của pháp luật, bảo vệ quyền lợi giữa người lao động và người sử dụng lao động...",
    image: MauDon,
    link: "#",
  },
];

const Form = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      <Header />

      {/* Banner */}
      <div className="relative w-full h-[220px] mt-20">
        <img src={Banner} className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center h-full w-[70%] mx-auto">
          <h2 className="text-4xl font-semibold text-white">Biểu mẫu</h2>
        </div>
      </div>

      {/* Danh sách biểu mẫu */}
      <div className="container mx-auto px-4 py-10 w-[70%]">
        <motion.div
          initial={{ opacity: 0, y: 50 }} // Bắt đầu từ dưới lên
          animate={{ opacity: 1, y: 0 }} // Kết thúc ở vị trí ban đầu
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {forms.map((form, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300 } }} // Hiệu ứng nảy lên khi hover
            >
              <img
                src={form.image}
                alt={form.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {form.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
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
      </div>

      <Footer />
    </div>
  );
};

export default Form;
