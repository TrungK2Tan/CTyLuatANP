import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import popup from "../img/banner/popup.png";

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
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={closeModal} // Bắt sự kiện click để đóng popup
        >
          {/* Nội dung popup */}
          <div
            className="relative w-[60%] max-w-2xl"
            onClick={(e) => e.stopPropagation()} // Ngăn click bên trong làm tắt popup
          >
            {/* Nút đóng */}
            <button
              className="absolute top-2 right-2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white text-gray-700"
              onClick={closeModal}
            >
              <FaTimes size={22} />
            </button>

            {/* Hình ảnh */}
            <img
              src={popup}
              alt="Tư vấn pháp luật"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LegalConsultPopup;
