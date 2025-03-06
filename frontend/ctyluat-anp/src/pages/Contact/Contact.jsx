import React from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Banner from "../../img/detail_banner.png";
import { FaEnvelope, FaMapMarkedAlt, FaPhone, FaRegFileAlt, FaUser } from 'react-icons/fa';
const Contact = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col">
    <Header />

    {/* Banner */}
    <div className="relative w-full h-[220px] mt-20">
      <img src={Banner} className="w-full h-full object-cover" alt="Banner" />
      <div className="absolute inset-0 flex items-center h-full w-[70%] mx-auto">
        <h2 className="text-4xl font-semibold text-white uppercase">Liên hệ</h2>
      </div>
    </div>

    {/* Content */}
    <div className="container mx-auto px-4 py-10 flex flex-wrap md:flex-nowrap gap-10">
      {/* Left Side - Contact Info */}
      <div className="w-full md:w-1/2 space-y-6">
        {/* Office Addresses */}
        {[
          { title: "Trụ sở chính", address: "Tổ dân phố Viên 3 - Bắc Từ Liêm - Hà Nội" },
          { title: "Văn phòng Hà Nội", address: "Tầng 5 Tòa N07, Trần Đăng Ninh, Q. Cầu Giấy, TP. Hà Nội" },
          { title: "Văn phòng Hồ Chí Minh", address: "Tầng 1, 232 Nguyễn Thị Minh Khai, Quận 3, TP.HCM" },
        ].map((item, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <FaMapMarkedAlt className="text-blue-500" /> {item.title}
            </h3>
            <p className="text-gray-600 mt-1">{item.address}</p>
          </div>
        ))}
        {/* Email */}
        <div className="border p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <FaEnvelope className="text-blue-500" /> E-mail
          </h3>
          <p className="text-gray-600 mt-1">congtyluatanp.hcm@gmail.com</p>
        </div>
        <div className="border p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <FaPhone className="text-blue-500" /> Số điện thoại
          </h3>
          <p className="text-gray-600 mt-1">090 360 1234 (Hỗ trợ 24/7)</p>
        </div>
      </div>

      {/* Right Side - Contact Form */}
      <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Để lại thông tin</h3>
        <form className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="flex items-center gap-2 text-gray-600">
                <FaUser /> Họ tên
              </label>
              <input type="text" className="w-full p-2 border rounded-md" />
            </div>
            <div className="w-1/2">
              <label className="flex items-center gap-2 text-gray-600">
                <FaPhone /> Điện thoại
              </label>
              <input type="text" className="w-full p-2 border rounded-md" />
            </div>
          </div>
          <div>
            <label className="flex items-center gap-2 text-gray-600">
              <FaEnvelope /> Email
            </label>
            <input type="email" className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="flex items-center gap-2 text-gray-600">
              <FaRegFileAlt /> Nội dung
            </label>
            <textarea className="w-full p-2 border rounded-md" rows="4"></textarea>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600">
            Gửi thông tin
          </button>
        </form>
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
  )
}

export default Contact