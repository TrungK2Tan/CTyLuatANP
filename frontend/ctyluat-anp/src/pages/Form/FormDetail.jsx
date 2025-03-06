import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Banner from "../../img/detail_banner.png";
import {
  FaChevronRight,
  FaEnvelope,
  FaPhone,
  FaRegFileAlt,
  FaSearch,
  FaUser,
} from "react-icons/fa";
import { FaFacebookF, FaTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
const FormDetail = () => {
    const { slug } = useParams();
    const [form, setForm] = useState(null);
  const [latestNews, setLatestNews] = useState([]);
    useEffect(() => {
        axios
          .get(`http://localhost:8000/forms/${slug}`)
          .then((response) => {
            setForm(response.data); // Bây giờ response.data là object, không cần [0]
          })
          .catch((error) => {
            console.error("Lỗi lấy biểu mẫu:", error);
            setForm(null); // Xử lý trường hợp lỗi
          });
          const fetchNewsList = async () => {
            try {
              const response = await axios.get("http://localhost:8000/news");
              const allNews = response.data;
      
              // Lấy 5 bài viết mới nhất
              setLatestNews(allNews.slice(-5));
            } catch (error) {
              console.error("Lỗi khi lấy danh sách bài viết:", error);
            }
          };
          fetchNewsList();
      }, [slug]);
      
  
    if (!form) return <p>Đang tải...</p>;

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-gray-100">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4 mt-20 pt-10 pb-10">
        <div className="container mx-auto w-[90%] md:w-[70%] flex items-center text-lg">
          <a className="text-blue-500 hover:underline" href="/">
            Trang Chủ
          </a>
          <span className="mx-2 text-gray-500">
            <FaChevronRight />
          </span>
          <span className="text-gray-700 font-medium">{form.title}</span>
        </div>
      </div>

      <div className="container mx-auto w-full md:w-[90%] lg:w-[70%] py-10 flex flex-col md:flex-row gap-10">
        {/* Nội dung chính */}
        <div className="w-full md:w-[75%]">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-3xl font-bold text-gray-900">{form.title}</h2>
            <p className="text-gray-700 mt-4">{form.description}</p>
            <div
              className="text-gray-700 mt-4 leading-loose border-t pt-4"
              dangerouslySetInnerHTML={{ __html: form.content }}
            ></div>
            <div className="mt-6 flex flex-col md:flex-row items-center">
              <p className="mr-2 text-gray-700 font-medium">Tải mẫu đơn</p>
              <a
                href={form.fileUrl}
                className="text-blue-600 underline hover:text-blue-800"
                download
              >
                Tại đây
              </a>
            </div>
            <div className="mt-8">
              {/* Chia sẻ */}
              <div className="flex flex-wrap items-center space-x-3">
                <span className="font-semibold text-lg">Chia sẻ:</span>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-gray-700 transition"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center bg-blue-400 text-white rounded-full hover:bg-blue-500 transition"
                >
                  <FaTwitter />
                </a>
              </div>

              {/* Form Liên hệ */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">
                  Để lại thông tin tư vấn
                </h3>
                <form className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="flex items-center gap-2 text-gray-600">
                        <FaUser /> Họ tên
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="flex items-center gap-2 text-gray-600">
                        <FaPhone /> Điện thoại
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-gray-600">
                      <FaEnvelope /> Email
                    </label>
                    <input
                      type="email"
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-gray-600">
                      <FaRegFileAlt /> Nội dung
                    </label>
                    <textarea
                      className="w-full p-2 border rounded-md"
                      rows="4"
                    ></textarea>
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600">
                    Gửi thông tin
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Cột phụ */}
        <div className="w-full md:w-[25%] flex flex-col gap-6">
          {/* Ô tìm kiếm */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2 text-center md:text-left">
              TÌM KIẾM
            </h2>
            <form className="relative">
              <input
                type="text"
                placeholder="Nhập từ khóa..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="submit"
                className="absolute right-4 top-2.5 text-gray-500 hover:text-blue-500"
              >
                <FaSearch className="text-lg" />
              </button>
            </form>
          </div>

          {/* Dịch vụ luật sư */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2 text-center md:text-left">
              DỊCH VỤ LUẬT SƯ
            </h2>
            <ul className="list-none space-y-3">
              {[
                "Luật Dân Sự",
                "Luật Hình Sự",
                "Luật Hôn Nhân Gia Đình",
                "Tranh Chấp Đất Đai",
                "Kinh Doanh Thương Mại",
                "Tư Vấn Thừa Kế",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center p-2 rounded-lg border border-gray-200 transition-all duration-300 hover:bg-blue-100 cursor-pointer"
                >
                  <FaChevronRight className="mr-2 text-blue-500" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ô bài viết mới nhất */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
              BÀI VIẾT MỚI NHẤT
            </h2>
            <div className="space-y-4">
              {latestNews.map((post) => (
                <div key={post._id} className="flex items-start space-x-3">
                  <Link
                    to={`/danhmuc/tin-tuc/${post.slug}`}
                    className="shrink-0"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-16 h-16 object-cover rounded-lg shadow-md"
                    />
                  </Link>
                  <p className="text-gray-700 text-sm hover:text-blue-500 cursor-pointer line-clamp-2 w-[calc(100%-4.5rem)]">
                    <Link to={`/danhmuc/tin-tuc/${post.slug}`}>
                      {post.title}
                    </Link>
                  </p>
                </div>
              ))}
            </div>
          </div>
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

export default FormDetail;
