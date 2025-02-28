import React, { useState, useEffect } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import Logo from "../img/logo-anp(1).png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = (index) => {
    if (isMobile) {
      setOpenDropdown(openDropdown === index ? null : index);
    }
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-30 h-24 flex items-center">
      <div className="container mx-auto w-[90%] lg:w-[70%] flex justify-between items-center h-full">
        {/* Logo */}
        <a href="/">
          <img src={Logo} alt="Logo" className="h-16 md:h-20" />
        </a>

        {/* Nút mở menu trên mobile */}
        <button className="lg:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Menu chính */}
        <ul
          className={`${
            menuOpen ? "block" : "hidden"
          } lg:flex flex-col lg:flex-row absolute lg:static top-24 left-0 w-full lg:w-auto bg-white shadow-lg lg:shadow-none transition-all duration-300 lg:space-x-8 text-[18px] font-semibold`}
        >
          {[
            { label: "Trang chủ", href: "/" },
            {
              label: "Giới thiệu",
              dropdown: true,
              items: [
                { label: "CÔNG TY LUẬT TNHH ANP", href: "/danhmuc/ve-chung-toi" },
                { label: "Đội ngũ luật sư", href: "/danhmuc/doi-ngu-luat-su" },
              ],
            },
            {
              label: "Dịch vụ luật sư",
              dropdown: true,
              items: [
                { label: "Luật Dân Sự", href: "/dich-vu/luat-dan-su" },
                { label: "Luật Hình Sự", href: "/dich-vu/luat-hinh-su" },
                { label: "Luật Hôn Nhân Gia Đình", href: "/dich-vu/hon-nhan-gia-dinh" },
                { label: "Tranh Chấp Đất Đai", href: "/dich-vu/tranh-chap-dat-dai" },
                { label: "Kinh Doanh Thương Mại", href: "/dich-vu/kinh-doanh-thuong-mai" },
                { label: "Tư Vấn Thừa Kế", href: "/dich-vu/tu-van-thua-ke" },
              ],
            },
            {
              label: "Hỏi đáp pháp luật",
              dropdown: true,
              items: [
                { label: "Hỏi Đáp Luật Dân Sự", href: "/hoi-dap/dan-su" },
                { label: "Hỏi Đáp Hôn Nhân Gia Đình", href: "/hoi-dap/hon-nhan" },
                { label: "Hỏi Đáp Pháp Luật Hình Sự", href: "/hoi-dap/hinh-su" },
                { label: "Hỏi Đáp Pháp Luật Đất Đai", href: "/hoi-dap/dat-dai" },
                { label: "Hỏi Đáp Pháp Luật Thừa Kế", href: "/hoi-dap/thua-ke" },
                { label: "Hỏi Đáp Hành Chính", href: "/hoi-dap/hanh-chinh" },
              ],
            },
            { label: "Biểu mẫu", href: "/danhmuc/bieu-mau" },
            { label: "Tin tức", href: "/danhmuc/tin-tuc" },
            { label: "Liên hệ", href: "/danhmuc/lien-he" },
          ].map((item, index) => (
            <li key={index} className="relative group px-6 py-4 lg:px-0 lg:py-0">
              {item.dropdown ? (
                <button
                  onClick={() => toggleDropdown(index)}
                  className="flex items-center gap-2 hover:text-blue-500 cursor-pointer w-full text-left lg:hover:bg-gray-100"
                >
                  {item.label} <FaChevronDown className="transition-transform duration-300" style={{ transform: openDropdown === index ? "rotate(180deg)" : "rotate(0)" }} />
                </button>
              ) : (
                <a href={item.href} className="hover:text-blue-500">
                  {item.label}
                </a>
              )}

              {/* Hiệu ứng underline */}
              <span className="absolute left-0 bottom-[-6px] w-full h-[3px] bg-blue-500 transform scale-x-0 transition-transform duration-500 origin-right group-hover:origin-left group-hover:scale-x-100"></span>

              {/* Dropdown menu */}
              {item.dropdown && (isMobile ? openDropdown === index : true) && (
                <ul className="lg:absolute left-0 top-full mt-2 bg-white shadow-lg p-2 rounded min-w-max lg:hidden group-hover:lg:block">
                  {item.items.map((subItem, subIndex) => (
                    <li key={subIndex} className="px-3 py-2 text-sm hover:bg-gray-100 hover:text-blue-500">
                      <a href={subItem.href}>{subItem.label}</a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
