import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

const LegalConsultPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenPopup");

    if (!hasSeenPopup) {
      setIsOpen(true);
      localStorage.setItem("hasSeenPopup", "true"); // Đánh dấu đã hiển thị popup
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-lg shadow-lg w-3/5 relative"
          >
            {/* Nút đóng */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              onClick={closeModal}
            >
              <FaTimes size={22} />
            </button>

            {/* Nội dung Modal */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Hình ảnh bên trái */}
              <div className="w-full md:w-1/3">
                <img
                  src="https://cdn4.vectorstock.com/i/1000x1000/65/13/brown-coffee-cup-on-a-beans-background-vector-49656513.jpg"
                  alt="Tư vấn pháp luật"
                  className="w-full h-auto rounded-lg"
                />
              </div>

              {/* Nội dung bên phải */}
              <div className="w-full md:w-2/3">
                {/* Chữ nhấp nháy */}
                <motion.h2
                  className="text-xl font-bold text-gray-800"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  📢 Tư vấn pháp luật miễn phí
                </motion.h2>

                {/* Chữ chạy ngang */}
                <div className="overflow-hidden whitespace-nowrap mt-2">
                  <motion.p
                    className="text-lg font-semibold text-red-500 inline-block"
                    animate={{ x: ["100%", "-100%"] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    🚀 Luật sư chuyên nghiệp - Miễn phí 100% - Đặt lịch ngay! 🚀
                  </motion.p>
                </div>

                <p className="text-gray-600 mt-3">
                  Hãy gặp luật sư tại quán cà phê để nhận tư vấn miễn phí về các
                  vấn đề pháp lý!
                </p>
                <p className="text-gray-700 font-semibold mt-3">
                  📍 Quán Caffee An Đông <br />
                  Luật sư Tư Vấn Luật Miễn Phí <br />
                  Địa chỉ: 88 Công Trường An Đông, Phường 9, Quận 5, TP HCM <br />
                  📞 Mobiphone: 083 7777771 <br />
                  📞 Vinaphone: 0846 11 22 33 <br />
                  📞 Viettel: 0355 01 01 01 <br />
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default LegalConsultPopup;
