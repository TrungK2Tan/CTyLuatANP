import React from "react";
import { FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail, MdOutlinePhoneIphone } from "react-icons/md";
import DcmaProtected from "../img/dmca_protected_sml_120n.png";
const Footer = () => {
  return (
    <footer className="bg-blue-700 text-white py-10">
      <div className="container mx-auto w-[70%]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Cột 1: Liên hệ */}
          <div>
            <h3 className="font-bold text-2xl mb-3">Liên hệ</h3>
            <ul className="space-y-2 text-sm font-thin mt-10">
              <li className="flex items-start gap-2">
                <AiOutlineHome className="shrink-0 mt-1 text-2xl" />
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">CÔNG TY</span>
                  <span className="text-sm">CÔNG TY LUẬT TNHH ANP</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <IoLocationOutline className="shrink-0 mt-1 text-2xl" />
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">TRỤ SỞ CHÍNH</span>
                  <span className="text-sm">
                    Tổ dân phố Viên 3 - Phường Cổ Nhuế 2 - Quận Bắc Từ Liêm - Hà
                    Nội
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <IoLocationOutline className="shrink-0 mt-1 text-2xl" />
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">VĂN PHÒNG HN</span>
                  <span className="text-sm">
                    Tầng 5 Tòa N07, Trần Đăng Ninh, P. Dịch Vọng, Q. Cầu Giấy,
                    TP. Hà Nội
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <IoLocationOutline className="shrink-0 mt-1 text-2xl" />
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">VĂN PHÒNG HCM</span>
                  <span className="text-sm">
                    Tầng 1, Số 232 Nguyễn Thị Minh Khai, Phường Võ Thị Sáu, Quận
                    3, TP.HCM
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MdOutlinePhoneIphone className="shrink-0 mt-1 text-2xl" />
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">ĐIỆN THOẠI</span>
                  <span className="text-sm">090 360 1234</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MdOutlineEmail className="shrink-0 mt-1 text-2xl" />
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">EMAIL</span>
                  <span className="text-sm">congtyluatanp.hcm@gmail.com</span>
                </div>
              </li>

              {/* Dòng text dài, không cần icon */}
              <li className="text-justify">
                Giấy Chứng Nhận Đăng Ký Hoạt Động Số 01021463/TP/ĐKHĐ Do Sở Tư
                Pháp Hà Nội Cấp Ngày 01/01/2018
              </li>
              <li className="text-justify">
                Người Đại Diện: Luật sư Nguyễn Văn Thân
              </li>
            </ul>
          </div>

          {/* Cột 2: Dịch vụ luật sư */}
          <div>
            <h3 className="font-bold text-2xl mb-3">Dịch vụ luật sư</h3>
            <ul className="space-y-4 text-sm font-thin mt-10">
              <li className="flex items-center gap-2">
                <FaChevronRight className="inline-block" /> Luật Dân Sự
              </li>
              <li className="flex items-center gap-2">
                <FaChevronRight className="inline-block" /> Luật Hình Sự
              </li>
              <li className="flex items-center gap-2">
                <FaChevronRight className="inline-block" /> Luật Hôn Nhân
                Gia Đình
              </li>
              <li className="flex items-center gap-2">
                <FaChevronRight className="inline-block" /> Tranh Chấp Đất
                Đai
              </li>
              <li className="flex items-center gap-2">
                <FaChevronRight className="inline-block" /> Kinh Doanh
                Thương Mại
              </li>
              <li className="flex items-center gap-2">
                <FaChevronRight className="inline-block" /> Tư Vấn Thừa Kế
              </li>
              <li className="flex items-center gap-2 mt-20">
                <img src={DcmaProtected} />
              </li>
            </ul>
          </div>

          {/* Cột 3: Hỏi đáp pháp luật */}
          <div>
            <h3 className="font-bold text-2xl mb-3">Hỏi đáp pháp luật</h3>
            <ul className="space-y-4 text-sm font-thin mt-10">
              <li className="flex items-center gap-2">
                <FaChevronRight className="inline-block" /> Hỏi Đáp Luật
                Dân Sự
              </li>
              <li className="flex items-center gap-2">
                <FaChevronRight className="inline-block" /> Hỏi Đáp Luật
                Hôn Nhân Gia Đình
              </li>
              <li className="flex items-center gap-2">
                <FaChevronRight className="inline-block" /> Hỏi Đáp Pháp
                Luật Hình Sự
              </li>
              <li className="flex items-center gap-2">
                <FaChevronRight className="inline-block" /> Hỏi Đáp Luật
                Đất Đai
              </li>
              <li className="flex items-center gap-2">
                <FaChevronRight className="inline-block" /> Hỏi Đáp Luật
                Thừa Kế
              </li>
              <li className="flex items-center gap-2">
                <FaChevronRight className="inline-block" /> Hỏi Đáp Hành
                Chính
              </li>
            </ul>
          </div>

          {/* Cột 4: Fanpage */}
          <div>
            <h3 className="font-bold text-2xl mb-3">Fanpage</h3>
            <div className="bg-white text-gray-800 p-4 rounded-lg shadow-md">
              <p className="italic flex  gap-4 text-2xl text-gray-400 ">
                <FaQuoteLeft className="text-blue-300" /> Công ty Luật TNHH ANP
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </footer>
    
  );
};

export default Footer;
