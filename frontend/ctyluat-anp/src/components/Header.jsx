import React, { useState, useEffect } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import Logo from "../img/logo-anp(1).png";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Lỗi lấy danh mục:", error));
  }, []);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-30 h-24 flex items-center">
      <div className="container mx-auto w-[90%] lg:w-[70%] flex justify-between items-center h-full">
        {/* Logo */}
        <a href="/">
          <img src={Logo} alt="Logo" className="h-16 md:h-20" />
        </a>

        {/* Nút mở menu trên mobile */}
        <button
          className="lg:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Menu chính */}
        <ul
          className={`${
            menuOpen ? "block" : "hidden"
          } lg:flex flex-col lg:flex-row absolute lg:static top-24 left-0 w-full lg:w-auto bg-white shadow-lg lg:shadow-none transition-all duration-300 lg:space-x-8 text-[18px] font-semibold`}
        >
          <li>
            <a href="/" className="hover:text-blue-500">
              Trang chủ
            </a>
          </li>

          {/* Mục "Giới thiệu" */}
          <li className="relative group px-6 py-4 lg:px-0 lg:py-0">
            <button
              onClick={() => toggleDropdown("about")}
              className="flex items-center gap-2 hover:text-blue-500 cursor-pointer"
            >
              Giới thiệu{" "}
              <FaChevronDown
                className="transition-transform duration-300"
                style={{
                  transform:
                    openDropdown === "about" ? "rotate(180deg)" : "rotate(0)",
                }}
              />
            </button>
            {(isMobile ? openDropdown === "about" : true) && (
              <ul className="lg:absolute left-0 top-full pt-2 bg-white shadow-lg p-2 rounded min-w-max lg:hidden group-hover:lg:block">
                <li className="px-3 py-2 text-sm hover:bg-gray-100 hover:text-blue-500">
                  <a href="/danhmuc/ve-chung-toi">CÔNG TY LUẬT TNHH ANP</a>
                </li>
                <li className="px-3 py-2 text-sm hover:bg-gray-100 hover:text-blue-500">
                  <a href="/danhmuc/doi-ngu-luat-su">Đội ngũ luật sư</a>
                </li>
              </ul>
            )}
          </li>

          {/* Render danh mục từ API (ở cùng cấp với menu tĩnh) */}
          {categories.map((category, index) => (
            <li
              key={index}
              className="relative group px-6 py-4 lg:px-0 lg:py-0"
            >
              <button
                onClick={() => toggleDropdown(index)}
                className="flex items-center gap-2 hover:text-blue-500 cursor-pointer"
              >
                {category.name}{" "}
                <FaChevronDown
                  className="transition-transform duration-300"
                  style={{
                    transform:
                      openDropdown === index ? "rotate(180deg)" : "rotate(0)",
                  }}
                />
              </button>

              {/* Danh sách dịch vụ (services) hiển thị khi hover vào danh mục */}
              {category.services && category.services.length > 0 && (
                <ul
                  className={`${
                    openDropdown === index ? "block" : "hidden"
                  } lg:absolute left-0 top-full pt-2 bg-white shadow-lg p-2 rounded min-w-max lg:hidden group-hover:lg:block`}
                >
                  {category.services.map((service, sIndex) => (
                    <li
                      key={sIndex}
                      className="px-3 py-2 text-sm hover:bg-gray-100 hover:text-blue-500"
                    >
                      <Link
                        to={`/danh-muc/${category.slug}/${service.slug}`}
                        className="flex items-center gap-2 hover:text-blue-500 cursor-pointer"
                      >
                        <p>{service.name}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}

          {/* Các mục menu tĩnh khác */}
          <li>
            <a href="/danhmuc/bieu-mau" className="hover:text-blue-500">
              Biểu mẫu
            </a>
          </li>
          <li>
            <a href="/danhmuc/tin-tuc" className="hover:text-blue-500">
              Tin tức
            </a>
          </li>
          <li>
            <a href="/danhmuc/lien-he" className="hover:text-blue-500">
              Liên hệ
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
