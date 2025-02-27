import React from 'react';
import { FaChevronDown } from "react-icons/fa";
import Logo from "../img/logo-anp(1).png"
const Header = () => {
  return (
    <>
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-30 h-24 flex items-center">
        <div className="container mx-auto w-[70%] flex justify-between items-center h-full">
          {/* Logo sát lề trái */}
          <a href="/">
            <img src={Logo} alt="Logo" className="h-20 ml-0" />
          </a>

          {/* Menu sát lề phải */}
          <ul className="text-[18px] flex items-center space-x-8 font-semibold h-20 mr-10">
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
              <li key={index} className="relative group h-full flex items-center">
                {item.dropdown ? (
                  <span className="hover:text-blue-500 flex items-center gap-1 relative cursor-pointer">
                    {item.label} <FaChevronDown />
                  </span>
                ) : (
                  <a href={item.href} className="hover:text-blue-500 cursor-pointer relative">
                    {item.label}
                  </a>
                )}

                {/* Hiệu ứng underline */}
                <span className="absolute left-0 bottom-[-6px] w-full h-[6px] bg-blue-500 transform scale-x-0 transition-transform duration-500 origin-right group-hover:origin-left group-hover:scale-x-100"></span>

                {/* Dropdown menu hiển thị khi hover */}
                {item.dropdown && (
                  <ul className="absolute left-0 top-full mt-2 bg-white shadow-lg p-2 rounded hidden group-hover:block w-auto min-w-max">
                    {item.items.map((subItem, subIndex) => (
                      <li key={subIndex} className="px-3 py-2 text-sm font-normal hover:bg-gray-100 cursor-pointer hover:text-blue-500">
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
    </>
  );
};

export default Header;
