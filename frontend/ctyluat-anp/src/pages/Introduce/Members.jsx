import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Banner from "../../img/detail_banner.png";
import LsuLaiVanDoan from "../../img/luatSu/luat-su-lai-van-doan-vicoly.jpg";
import LsuNguyenDacUyen from "../../img/luatSu/luat-su-nguyen-dac-uyen.jpg";
import Lsu from "../../img/luat_su.jpg";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
const Members = () => {
  // Dữ liệu danh sách luật sư
  const members = [
    {
      name: "LẠI VĂN DOÃN",
      role: "LUẬT SƯ",
      image: LsuLaiVanDoan,
    },
    {
      name: "NGUYỄN ĐẮC UYÊN",
      role: "LUẬT SƯ CHUYÊN MÔN",
      image: LsuNguyenDacUyen,
    },
    {
      name: "Triệu Thị Linh Huệ",
      role: "GIÁM ĐỐC ĐIỀU HÀNH - LUẬT SƯ",
      image: Lsu,
    },
  ];
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      <Header />
      <div className="relative w-full h-[220px] mt-20">
        <img src={Banner} className="w-full h-full object-cover" />
        {/* Căn giữa chữ theo chiều dọc nhưng nằm về bên trái */}
        <div className="absolute inset-0 flex items-center h-full w-[70%] mx-auto">
          <h2 className="text-4xl font-semibold text-white">Đội ngũ luật sư</h2>
        </div>
      </div>

      {/*Members */}
      <div className="container mx-auto px-4 py-10 w-[70%]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {members.map((member, index) => (
            <div
              key={index}
              className="group bg-white shadow-lg rounded-lg overflow-hidden relative"
            >
              {/* Ảnh Luật Sư */}
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-100 object-cover object-top"
              />

              {/* Thông tin luật sư (Luôn hiển thị, đổi màu khi hover) */}
              <div className="p-4 text-center transition-colors duration-300 bg-white group-hover:bg-blue-600">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-white">
                  {member.name}
                </h3>
                <p className="text-sm font-bold text-blue-700 group-hover:text-white">
                  {member.role}
                </p>

                {/* Mạng xã hội (Ẩn đi, chỉ hiển thị khi hover) */}
                <div className="flex justify-center space-x-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href="#"
                    className="w-10 h-10 flex items-center justify-center border border-white rounded-full text-white text-lg hover:bg-white hover:text-blue-600 transition-colors duration-300"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 flex items-center justify-center border border-white rounded-full text-white text-lg hover:bg-white hover:text-blue-600 transition-colors duration-300"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 flex items-center justify-center border border-white rounded-full text-white text-lg hover:bg-white hover:text-blue-600 transition-colors duration-300"
                  >
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      {/*Coopy right */}
      <div className="bg-blue-950 w-full">
        <div className="container mx-auto text-white w-[70%] border-t border-white pt-4 flex justify-between text-lg py-4">
          <span>Copyright © 2021 congtyluatanp.com . All rights reserved.</span>
          <span>Design by DUDI SoftWare</span>
        </div>
      </div>
    </div>
  );
};

export default Members;
