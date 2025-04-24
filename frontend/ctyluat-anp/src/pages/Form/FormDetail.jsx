import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { renderAsync } from "docx-preview";
import { FaChevronRight, FaRegFileAlt, FaSearch } from "react-icons/fa";
import {
  FaEnvelope,
  FaFacebookF,
  FaPhone,
  FaTwitter,
  FaUser,
} from "react-icons/fa6";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const styles = {
  wordContainer: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '500px'
  },
  docxWrapper: {
    width: '100%',
    maxWidth: '100%',
    margin: '0 auto',
    padding: '1rem',
    overflow: 'auto',
    backgroundColor: 'white'
  }
};
const FormDetail = () => {
  const { slug } = useParams();
  const [form, setForm] = useState(null);
  const [latestNews, setLatestNews] = useState([]);
  const [relatedForms, setRelatedForms] = useState([]);
  const wordContainerRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch form data
        const formResponse = await axios.get(`${API_URL}/forms/${slug}`);
        const formData = formResponse.data;
        setForm(formData);

        // Display Word file content
        if (formData.fileUrl && wordContainerRef.current) {
          const response = await fetch(formData.fileUrl);
          const blob = await response.blob();
          const arrayBuffer = await blob.arrayBuffer();
          await renderAsync(arrayBuffer, wordContainerRef.current);
        }

        // Fetch related forms and latest news
        const [formsResponse, newsResponse] = await Promise.all([
          axios.get(`${API_URL}/forms`),
          axios.get(`${API_URL}/news`)
        ]);

        // Filter out current form and get 10 related forms
        const related = formsResponse.data
          .filter(item => item.slug !== slug)
          .slice(0, 10);
        setRelatedForms(related);
        setLatestNews(newsResponse.data.slice(-5));
      } catch (error) {
        console.error("Error fetching data:", error);
        setForm(null);
      }
    };

    fetchData();
  }, [slug]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/send-email`, formData);
      if (response.data.success) {
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

  if (!form) {
    return <div className="text-center py-10">Đang tải...</div>;
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-gray-100">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4 mt-20 pt-10 pb-10">
        <div className="container mx-auto w-[90%] md:w-[70%] flex items-center text-lg">
          <Link to="/" className="text-blue-500 hover:underline">
            Trang Chủ
          </Link>
          <FaChevronRight className="mx-2 text-gray-500" />
          <span className="text-gray-700 font-medium">{form.title}</span>
        </div>
      </div>

      <div className="container mx-auto w-full md:w-[90%] lg:w-[70%] py-10 flex flex-col md:flex-row gap-10">
        {/* Nội dung chính */}
        <div className="w-full md:w-[75%]">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-3xl font-bold text-gray-900">{form.title}</h2>
            <p className="text-gray-700 mt-4">{form.description}</p>

            {/* Word Document Display */}
            <div className="mt-4 sm:mt-8 border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-blue-50 px-3 sm:px-6 py-2 sm:py-3 border-b border-gray-200">
                <h3 className="text-base sm:text-xl font-semibold flex items-center gap-1">
                  <FaRegFileAlt className="text-blue-600 text-sm sm:text-base" />
                  <span>Nội dung mẫu đơn</span>
                </h3>
              </div>
              <div style={styles.wordContainer}>
                <div
                  ref={wordContainerRef}
                  style={styles.docxWrapper}
                  className="bg-white min-h-[500px] sm:min-h-[600px]"
                >
                  {/* docx-preview content will render here */}
                </div>
              </div>
            </div>

            {/* Usage Instructions */}
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Hướng dẫn sử dụng mẫu đơn:</h3>
              <div
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: form.content }}
              />
            </div>

            {/* Download Button */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href={form.fileUrl}
                download
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
              >
                <FaRegFileAlt />
                <span>Tải mẫu đơn gốc</span>
              </a>
              <span className="text-gray-500 text-sm italic">
                Tải về để chỉnh sửa và điền thông tin
              </span>
            </div>

            <div className="mt-8">
              {/* Chia sẻ */}
              <div className="flex flex-wrap items-center space-x-3">
                <span className="font-semibold text-lg">Chia sẻ:</span>
                <button
                  onClick={(e) => e.preventDefault()}
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-gray-700 transition"
                >
                  <FaFacebookF />
                </button>
                <button
                  onClick={(e) => e.preventDefault()}
                  className="w-10 h-10 flex items-center justify-center bg-blue-400 text-white rounded-full hover:bg-blue-500 transition"
                >
                  <FaTwitter />
                </button>
              </div>

              {/* Form Liên hệ */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Để lại thông tin tư vấn</h3>
                {successMessage && (
                  <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-4">
                    {successMessage}
                  </div>
                )}
                {errorMessage && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
                    {errorMessage}
                  </div>
                )}
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="flex items-center gap-2 text-gray-600">
                        <FaUser /> Họ tên
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="flex items-center gap-2 text-gray-600">
                        <FaPhone /> Điện thoại
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-gray-600">
                      <FaEnvelope /> Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-gray-600">
                      <FaRegFileAlt /> Nội dung
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full p-2 border rounded-md"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Gửi thông tin
                  </button>
                </form>
              </div>
            </div>

            {/* Mẫu đơn liên quan */}
            <div className="mt-10">
              <h3 className="text-2xl font-semibold mb-6">
                Mẫu đơn liên quan
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {relatedForms.map((form) => (
                  <div
                    key={form._id}
                    className="bg-white shadow-md rounded-lg overflow-hidden"
                  >
                    <Link to={`/bieu-mau/${form.slug}`}>
                      <img
                        src={form.image}
                        alt={form.title}
                        className="w-full h-40 object-cover"
                      />
                    </Link>
                    <div className="p-4">
                      <h4 className="text-lg font-medium text-gray-800 hover:text-blue-500 cursor-pointer line-clamp-2">
                        <Link to={`/bieu-mau/${form.slug}`}>
                          {form.title}
                        </Link>
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cột phụ */}
        <div className="w-full md:w-[25%] flex flex-col gap-6">
          {/* Search Box */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
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

          {/* Legal Services */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
              DỊCH VỤ LUẬT SƯ
            </h2>
            <ul className="list-none space-y-3">
              {[
                { title: "Luật Dân Sự", slug: "luat-dan-su" },
                { title: "Luật Hình Sự", slug: "luat-hinh-su" },
                { title: "Luật Hôn Nhân Gia Đình", slug: "luat-hon-nhan-gia-dinh" },
                { title: "Tranh Chấp Đất Đai", slug: "tranh-chap-dat-dai" },
                { title: "Kinh Doanh Thương Mại", slug: "kinh-doanh-thuong-mai" },
                { title: "Tư Vấn Thừa Kế", slug: "tu-van-thua-ke" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={`/danh-muc/dich-vu-luat-su/${item.slug}`}
                    className="flex items-center p-2 rounded-lg border border-gray-200 transition-all duration-300 hover:bg-blue-100 cursor-pointer"
                  >
                    <FaChevronRight className="mr-2 text-blue-500" />
                    <span className="text-gray-700 font-medium">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Latest Posts */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
              BÀI VIẾT MỚI NHẤT
            </h2>
            <div className="space-y-4">
              {latestNews.map((post) => (
                <div key={post._id} className="flex items-start space-x-3">
                  <Link to={`/danhmuc/tin-tuc/${post.slug}`} className="shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-16 h-16 object-cover rounded-lg shadow-md"
                    />
                  </Link>
                  <Link
                    to={`/danhmuc/tin-tuc/${post.slug}`}
                    className="text-gray-700 text-sm hover:text-blue-500 line-clamp-2 w-[calc(100%-4.5rem)]"
                  >
                    {post.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {/* Copyright */}
      <div className="bg-blue-950 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-white text-sm">
            <span>Copyright © 2021 congtyluatanp.com. All rights reserved.</span>
            <span>Design by DUDI SoftWare</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDetail;