import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaChevronRight, FaSearch } from "react-icons/fa";
import image1 from "../../img/about.jpg";
const Company = () => {
  const posts = [
    {
      title:
        'Việc Quy Định Về Biện Pháp "Tạm Hoãn Xuất Cảnh" Là Không Cần Thiết, Việc Quy Định Về Biện Pháp "Tạm Hoãn Xuất Cảnh" Là Không Cần Thiết',
      image: image1,
    },
    {
      title:
        'Việc Phân Loại Tội Phạm Khi Giữ Người Trong Trường Hợp Khẩn Cấp, Việc Quy Định Về Biện Pháp "Tạm Hoãn Xuất Cảnh" Là Không Cần Thiết',
      image: image1,
    },
    {
      title:
        'Quyền Và Nghĩa Vụ Của Người Đại Diện Của Bị Can, Bị Cáo, Bị Hại...,Việc Quy Định Về Biện Pháp "Tạm Hoãn Xuất Cảnh" Là Không Cần Thiết',
      image: image1,
    },
    {
      title:
        'Quyền Và Nghĩa Vụ Của Người Đại Diện Của Bị Can, Bị Cáo, Bị Hại...,Việc Quy Định Về Biện Pháp "Tạm Hoãn Xuất Cảnh" Là Không Cần Thiết',
      image: image1,
    },
    {
      title:
        'Quyền Và Nghĩa Vụ Của Người Đại Diện Của Bị Can, Bị Cáo, Bị Hại...,Việc Quy Định Về Biện Pháp "Tạm Hoãn Xuất Cảnh" Là Không Cần Thiết',
      image: image1,
    },
  ];
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      <Header />

      {/* Phần Breadcrumb (đường dẫn) */}
      <div className="bg-gray-100 py-4 mt-20 pt-10 pb-10">
        <div className="container mx-auto w-[90%] md:w-[70%] flex items-center text-lg">
          <a className="text-blue-500 hover:underline" href="/">
            Trang Chủ
          </a>
          <span className="mx-2 text-gray-500">
            <FaChevronRight />
          </span>
          <span className="text-gray-700 font-medium">
            CÔNG TY LUẬT TNHH ANP
          </span>
        </div>
      </div>

      {/* Bố cục nội dung chính */}
      <div className="container mx-auto w-[90%] md:w-[70%] py-10 flex flex-col md:flex-row gap-10">
        {/* Cột nội dung chính - 40% */}
        <div className="w-full md:w-[65%]">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">
            CÔNG TY LUẬT TNHH ANP
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed">
            Công ty Luật TNHH ANP được thành lập theo Giấy chứng nhận đăng ký số
            01021463/TP/ĐKHĐ cấp năm 2018 của Sở Tư pháp Hà Nội, với sự tâm
            huyết của những Luật sư có kinh nghiệm hành nghề, nguyên là Thẩm
            phán của Tòa Án Nhân dân Tối cao, Kiểm sát viên Viện Kiểm Sát Nhân
            dân Tối cao, các Chánh án, Thẩm phán Tòa án nhân dân các cấp với hơn
            40 năm kinh nghiệm nghề nghiệp. Bên cạnh đó, tại công ty Luật ANP tự
            hào có đội ngũ Luật sư giỏi, giàu kinh nghiệm, trình độ chuyên môn
            cao, năng động, nhiệt huyết và tận tâm trong việc tư vấn, giải quyết
            thủ tục, đại diện cho Khách hàng bảo vệ quyền, lợi ích hợp pháp
            trong nhiều vụ án Dân sự, Hình sự, Kinh tế, Thừa kế, Lao động, Hôn
            nhân và Gia đình,… Công ty Luật ANP với lợi thế có 2 văn phòng Tại
            Hà Nội và Thành phố Hồ Chí Minh giúp khách hàng thuận tiện trong
            việc gặp gỡ, trao đổi và tư vấn trực tiếp. Chúng tôi cung cấp các
            dịch vụ pháp lý tốt nhất, đáp ứng được nhu cầu kết nối thông tin tới
            luật sư kịp thời và nhanh chóng, giúp khách hàng giảm tối đa rủi ro,
            đảm bảo lợi ích hợp pháp cho khách hàng dựa trên nền tảng{" "}
            <strong className="text-red-500">
              {" "}
              “KIẾN THỨC – KINH NGHIỆM – SỰ TẬN TÂM”
            </strong>
            Chúng tôi không ngừng cố gắng phấn đấu trở thành công ty luật uy
            tín, chuyên nghiệp hàng đầu trong nước; là nơi đáng tin cậy cho
            khách hàng.
          </p>

          <h2 className="text-2xl font-semibold text-blue-800 mt-6">
            * CÁC LĨNH VỰC TƯ VẤN TẠI CÔNG TY LUẬT ANP
          </h2>
          <ul className="list-disc list-inside text-lg text-gray-700 mt-3 space-y-2">
            <li>
              Tư vấn hôn nhân gia đình: tư vấn luật hôn nhân gia đình; các thủ
              tục kết hôn có yếu tố nước ngoài; tư vấn ly hôn, thủ tục, tranh
              chấp tài sản, quyền nuôi con sau khi ly hôn.
            </li>
            <li>
              Tư vấn đất đai: tư vấn liên quan đến luật tranh chấp đất đai; tư
              vấn thủ tục hành chính; mua bán – chuyển nhượng nhà đất.
            </li>
            <li>
              Tư vấn thừa kế: tư vấn pháp luật về thừa kế; di chúc, phân chia,
              tặng cho tài sản thừa kế; giải quyết tranh chấp, thủ tục di sản
              thừa kế.
            </li>
            <li>
              Tư vấn dân sự, hình sự: tư vấn pháp luật dân sự, hình sự, giải
              quyết tranh chấp thủ tục liên quan đến lợi ích cho các cá nhân, tổ
              chức, doanh nghiệp. Luật sư bào chữa, tranh tụng vụ án hình sự
            </li>
            <li>
              Tư vấn hợp đồng: tư vấn biểu mẫu, pháp lý, soạn thảo, giải quyết
              tranh chấp hợp đồng
            </li>
            <li>
              {" "}
              Tư vấn lao động: tư vấn cho Doanh nghiệp, người sử dụng lao động
              các quy định pháp luật liên quan đến Luật lao động; giải quyết
              tranh chấp lao động giữa các cá nhân, tổ chức, doanh nghiệp
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-blue-800 mt-6">
            * GIÁ TRỊ CỐT LÕI CỦA CÔNG TY LUẬT ANP
          </h2>
          <p className="text-lg text-gray-700 mt-2">
  Suốt những năm hoạt động và phụng sự cho khách hàng, công ty Luật
  ANP luôn đặt ra sứ mệnh và thực hiện theo đúng Giá trị cốt lõi mà
  công ty đã xây dựng{" "}
  <strong className="text-red-500">"TÂM – TẦM – TÀI – TÍN"</strong> để
  dẫn lối cho những hành động của đội ngũ luật sư ANP...
</p>

<div className="text-lg text-gray-700 mt-2">
  <strong className="text-red-500">TÂM:</strong> Làm việc bằng tinh
  thần trách nhiệm...
</div>

          <p className="text-xl font-bold">---</p>
          <strong className="text-xl">CÔNG TY LUẬT TNHH ANP:</strong>
          <p className="text-lg font-medium  mt-2">
            - VP Hà Nội: Tầng 5 Tòa N07, Trần Đăng Ninh, P. Dịch Vọng, Q. Cầu
            Giấy, Hà Nội
          </p>
          <p className="text-lg font-medium  mt-2">
            - VP Hồ Chí Minh: Tầng 1, Số 232 Nguyễn Thị Minh Khai, Phường Võ Thị
            Sáu, Quận 3, TP.HCM
          </p>
          <p className="text-lg font-medium text-red-500  mt-2">
            <strong className="text-black">- Hotline:</strong> 090 360 1234
          </p>
          <p className="text-lg font-medium  mt-2">
            - Email: congtyluatanp.hcm@gmail.com
          </p>
        </div>

        {/* Cột nội dung phụ - 40% */}
        <div className="w-full md:w-[25%] flex flex-col gap-6">
          {/* Ô tìm kiếm và dịch vụ luật sư */}
          <div className=" p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2 relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-16 after:h-[3px] after:bg-blue-500">
              TÌM KIẾM
            </h2>
            <form className="relative">
              <input
                type="text"
                placeholder="Nhập từ khóa..."
               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-4 top-3 text-gray-500"
              >
                <FaSearch className="text-blue-500" />
              </button>
            </form>

            <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3 border-b border-gray-300 pb-2 relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-16 after:h-[3px] after:bg-blue-500">
              DỊCH VỤ LUẬT SƯ
            </h2>

            <ul className="list-none text-lg text-gray-400 space-y-2 ">
              <li className="flex items-center border-b border-gray-300 pb-2">
                <FaChevronRight className="mr-2 " /> Luật Dân Sự
              </li>
              <li className="flex items-center border-b border-gray-300 pb-2">
                <FaChevronRight className="mr-2 " /> Luật Hình Sự
              </li>
              <li className="flex items-center border-b border-gray-300 pb-2">
                <FaChevronRight className="mr-2 " /> Luật Hôn Nhân Gia Đình
              </li>
              <li className="flex items-center border-b border-gray-300 pb-2">
                <FaChevronRight className="mr-2 " /> Tranh Chấp Đất Đai
              </li>
              <li className="flex items-center border-b border-gray-300 pb-2">
                <FaChevronRight className="mr-2 " /> Kinh Doanh Thương Mại
              </li>
              <li className="flex items-center border-b border-gray-300 pb-2">
                <FaChevronRight className="mr-2 " /> Tư Vấn Thừa Kế
              </li>
            </ul>
          </div>

          {/* Ô bài viết mới nhất */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col">
            {/* Tiêu đề */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2 relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-16 after:h-[3px] after:bg-blue-500">
              BÀI VIẾT MỚI NHẤT
            </h2>

            {/* Danh sách bài viết */}
            <div className="space-y-4">
              {posts.map((post, index) => (
                <div key={index} className="flex items-start space-x-3 mt-5">
                   <img src={post.image} alt="Bài viết" className="w-20 h-20 object-cover rounded" />
                   <p className="text-gray-700 text-sm">{post.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Footer nhỏ */}
      <div className="bg-blue-950 w-full text-white border-t border-white py-4">
        <div className="container mx-auto w-[70%] flex justify-between text-lg">
          <span>Copyright © 2021 congtyluatanp.com . All rights reserved.</span>
          <span>Design by DUDI SoftWare</span>
        </div>
      </div>
    </div>
  );
};

export default Company;
