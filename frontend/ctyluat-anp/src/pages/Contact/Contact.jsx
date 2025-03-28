import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Banner from "../../img/detail_banner.png";
import { FaEnvelope, FaMapMarkedAlt, FaPhone, FaRegFileAlt, FaUser } from "react-icons/fa";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setSuccessMessage("Gửi email thành công!");
        setErrorMessage("");
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        setErrorMessage("Gửi email thất bại! Vui lòng thử lại.");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Lỗi kết nối đến server!");
      setSuccessMessage("");
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col">
      <Header />
      <div className="relative w-full h-[220px] mt-20">
        <img src={Banner} className="w-full h-full object-cover" alt="Banner" />
        <div className="absolute inset-0 flex items-center h-full w-[70%] mx-auto">
          <h2 className="text-4xl font-semibold text-white uppercase">Liên hệ</h2>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 flex flex-wrap md:flex-nowrap gap-10">
        {/* Thông tin liên hệ */}
        <div className="w-full md:w-1/2 space-y-6">
          {[{ title: "Văn phòng Hồ Chí Minh", address: "Tầng 1, 232 Nguyễn Thị Minh Khai, Quận 3, TP.HCM" },
            { title: "Trụ sở chính", address: "Tổ dân phố Viên 3 - Bắc Từ Liêm - Hà Nội" },
            { title: "Văn phòng Hà Nội", address: "Tầng 5 Tòa N07, Trần Đăng Ninh, Q. Cầu Giấy, TP. Hà Nội" }].map((item, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <FaMapMarkedAlt className="text-blue-500" /> {item.title}
              </h3>
              <p className="text-gray-600 mt-1">{item.address}</p>
            </div>
          ))}

          {/* Email & Số điện thoại */}
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
            <p className="text-gray-600 mt-1">0909 229 689 (Hỗ trợ 24/7)</p>
          </div>
        </div>

        {/* Form liên hệ */}
        <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Để lại thông tin</h3>
          {successMessage && <p className="text-green-600">{successMessage}</p>}
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="flex items-center gap-2 text-gray-600">
                  <FaUser /> Họ tên
                </label>
                <input type="text" name="name" value={formData.name} onChange={handleChange}
                  className="w-full p-2 border rounded-md" required />
              </div>
              <div className="w-1/2">
                <label className="flex items-center gap-2 text-gray-600">
                  <FaPhone /> Điện thoại
                </label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange}
                  className="w-full p-2 border rounded-md" required />
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2 text-gray-600">
                <FaEnvelope /> Email
              </label>
              <input type="email" name="email" value={formData.email} onChange={handleChange}
                className="w-full p-2 border rounded-md" required />
            </div>
            <div>
              <label className="flex items-center gap-2 text-gray-600">
                <FaRegFileAlt /> Nội dung
              </label>
              <textarea name="message" value={formData.message} onChange={handleChange}
                className="w-full p-2 border rounded-md" rows="4" required></textarea>
            </div>
            <button type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600">
              Gửi thông tin
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
