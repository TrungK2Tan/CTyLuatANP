import React from "react";
import { FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail, MdOutlinePhoneIphone } from "react-icons/md";
import DcmaProtected from "../img/dmca_protected_sml_120n.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-700 text-white py-10">
      <div className="container mx-auto px-5 lg:px-0 w-full md:w-[85%] lg:w-[70%]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Cột 1: Liên hệ */}
          <div>
            <h3 className="font-bold text-xl md:text-2xl mb-3">Liên hệ</h3>
            <ul className="space-y-3 text-sm font-thin mt-5">
              <li className="flex items-start gap-2">
                <AiOutlineHome className="text-lg md:text-2xl" />
                <div>
                  <span className="font-semibold text-base md:text-lg">
                    CÔNG TY LUẬT TNHH ANP
                  </span>
                  <span className="block text-sm">CÔNG TY LUẬT TNHH ANP</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <IoLocationOutline className="text-lg md:text-2xl" />
                <div>
                  <span className="font-semibold text-base md:text-lg">
                    TRỤ SỞ CHÍNH
                  </span>
                  <span className="block text-sm">
                    Tổ dân phố Viên 3 - Phường Cổ Nhuế 2 - Quận Bắc Từ Liêm - Hà
                    Nội
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <IoLocationOutline className="text-lg md:text-2xl" />
                <div>
                  <span className="font-semibold text-base md:text-lg">
                    VĂN PHÒNG HN
                  </span>
                  <span className="block text-sm">
                    Tầng 5 Tòa N07, Trần Đăng Ninh, P. Dịch Vọng, Q. Cầu Giấy,
                    TP. Hà Nội
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <IoLocationOutline className="text-lg md:text-2xl" />
                <div>
                  <span className="font-semibold text-base md:text-lg">
                    VĂN PHÒNG HCM
                  </span>
                  <span className="block text-sm">
                    Tầng 1, Số 232 Nguyễn Thị Minh Khai, Phường Võ Thị Sáu, Quận
                    3, TP.HCM
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MdOutlinePhoneIphone className="text-lg md:text-2xl" />
                <div>
                  <span className="font-semibold text-base md:text-lg">
                    ĐIỆN THOẠI
                  </span>
                  <span className="block text-sm">090 360 1234</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MdOutlineEmail className="text-lg md:text-2xl" />
                <div>
                  <span className="font-semibold text-base md:text-lg">
                    EMAIL
                  </span>
                  <span className="block text-sm">
                    congtyluatanp.hcm@gmail.com
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-2">
              Giấy chứng nhận đăng ký hoạt động số 01021463/TP/ĐKHĐ do Sở Tư pháp Hà Nội cấp ngày 01/10/2018
              </li>
              <li className="flex items-start gap-2">
              Người đại diện: Luật sư Nguyễn Văn Thân
              </li>
            </ul>
          </div>

          {/* Cột 2: Dịch vụ luật sư */}
          <div>
  <h3 className="font-bold text-xl md:text-2xl mb-3">Dịch vụ luật sư</h3>
  <ul className="space-y-3 text-sm font-thin mt-5">
    {[
      { title: "Luật Dân Sự", slug: "luat-dan-su" },
      { title: "Luật Hình Sự", slug: "luat-hinh-su" },
      { title: "Luật Hôn Nhân Gia Đình", slug: "luat-hon-nhan-gia-dinh" },
      { title: "Tranh Chấp Đất Đai", slug: "tranh-chap-dat-dai" },
      { title: "Kinh Doanh Thương Mại", slug: "kinh-doanh-thuong-mai" },
      { title: "Tư Vấn Thừa Kế", slug: "tu-van-thua-ke" },
    ].map((item, index) => (
      <li key={index} className="flex items-center gap-2">
        <FaChevronRight className="inline-block " />
        <Link
          to={`/danh-muc/dich-vu-luat-su/${item.slug}`}
          className=" hover:text-blue-500 transition"
        >
          {item.title}
        </Link>
      </li>
    ))}
    <li className="flex items-center gap-2 mt-5">
      <img src={DcmaProtected} alt="DMCA Protected" />
    </li>
  </ul>
</div>


          {/* Cột 3: Hỏi đáp pháp luật */}
<div>
  <h3 className="font-bold text-xl md:text-2xl mb-3">Hỏi đáp pháp luật</h3>
  <ul className="space-y-3 text-sm font-thin mt-5">
    {[
      { title: "Hỏi Đáp Luật Dân Sự", slug: "hoi-dap-luat-dan-su" },
      { title: "Hỏi Đáp Luật Hôn Nhân Gia Đình", slug: "hoi-dap-luat-hon-nhan-gia-dinh" },
      { title: "Hỏi Đáp Pháp Luật Hình Sự", slug: "hoi-dap-phap-luat-hinh-su" },
      { title: "Hỏi Đáp Luật Đất Đai", slug: "hoi-dap-luat-dat-dai" },
      { title: "Hỏi Đáp Luật Thừa Kế", slug: "hoi-dap-luat-thua-ke" },
      { title: "Hỏi Đáp Hành Chính", slug: "hoi-dap-hanh-chinh" },
    ].map((item, index) => (
      <li key={index} className="flex items-center gap-2">
        <FaChevronRight className="inline-block " />
        <Link
          to={`/danh-muc/hoi-djap-phap-luat/${item.slug}`}
          className=" hover:text-blue-500 transition"
        >
          {item.title}
        </Link>
      </li>
    ))}
  </ul>
</div>


          {/* Cột 4: Fanpage */}
          <div>
            <h3 className="font-bold text-xl md:text-2xl mb-3">Fanpage</h3>
            <div className="bg-white text-gray-800 p-4 rounded-lg shadow-md">
              <a href="https://www.facebook.com/profile.php?id=61572817651130&mibextid=wwXIfr&rdid=l7kqWT4P0ss5Q8yI&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F15oz5DF5MQ%2F%3Fmibextid%3DwwXIfr#" className="italic flex gap-4 text-lg md:text-2xl text-gray-400 hover:text-blue-500 cursor-pointer">
                <FaQuoteLeft className="text-blue-300 " /> Công ty Luật TNHH ANP
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
