import { FaChevronLeft, FaChevronRight, FaChevronDown } from "react-icons/fa";

import DatDai from "../../img/item/icon_tranh_chap_dat_dai.jpg";
import DoanhNghiep from "../../img/item/doanh-nghiep.png";
import HinhSu from "../../img/item/icon-luat-su-hinh-su.png";
import HonNhan from "../../img/item/icon-hon-nhan-gia-dinh.png";
import KeToan from "../../img/item/ke-toan.png";
import LuatSuDanSu from "../../img/item/luat-su-dan-su.png";
import Header from "../../components/Header";
import Statistics from "../../components/Statistics";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import MissionStatement from "../../components/MissionStatement";
import News from "../../components/News";
import { useState } from "react";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const toSlug = (title) => {
    return title
      .toLowerCase()
      .normalize("NFD") // Loại bỏ dấu tiếng Việt
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d") // Thay thế ký tự đ
      .replace(/[^a-z0-9\s]/g, "") // Loại bỏ ký tự đặc biệt
      .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu "-"
      .trim();
  };
  const services = [
    {
      icon: <img src={HonNhan} alt="Dịch vụ" className="w-[90px] h-[90px]" />,
      title: "HÔN NHÂN GIA ĐÌNH",
      url: `/${toSlug("HÔN NHÂN GIA ĐÌNH")}`,
      description:
        "Công ty Luật TNHH ANP tư vấn, cung cấp dịch vụ pháp lý, giải quyết thủ tục về Luật Hôn nhân gia đình như Ly hôn, Kết hôn, Tranh chấp quyền nuôi con, Chia tài sản khi ly h...",
    },
    {
      icon: <img src={KeToan} alt="Dịch vụ" className="w-[90px] h-[90px]" />,
      title: "KINH DOANH THƯƠNG MẠI",
      url: `/${toSlug("KINH DOANH THƯƠNG MẠI")}`,
      description:
        "Hợp đồng nếu không được soạn kỹ có thể gặp nhiều rủi ro: chủ thể hợp đồng, đối tượng giao dịch, điều khoản đôi bên, trách nhiệm và nghĩa vụ, thủ tục pháp lý...",
    },
    {
      icon: <img src={DoanhNghiep} alt="Dịch vụ" className="w-[90px] h-[90px]" />,
      title: " LUẬT DÂN SỰ",
      url: `/${toSlug("TƯ VẤN LUẬT DÂN SỰ")}`,
      description:
        "Công ty luật ANP cung cấp dịch vụ tư vấn luật dân sự bao gồm: tranh chấp đất đai, hôn nhân gia đình, tranh chấp hợp đồng, thừa kế tài sản...",
    },
    {
      icon: <img src={HinhSu} alt="Dịch vụ" className="w-[90px] h-[90px]" />,
      title: " LUẬT HÌNH SỰ",
      url: `/${toSlug("TƯ VẤN LUẬT HÌNH SỰ")}`,
      description:
        "Với đội ngũ luật sư chuyên gia có nhiều năm kinh nghiệm trong ngành luật và văn phòng tại Hà Nội và TP. Hồ Chí Minh, chúng tôi cam kết mang đến dịch vụ pháp lý toàn diện nhất...",
    },
    {
      icon: <img src={LuatSuDanSu} alt="Dịch vụ" className="w-[90px] h-[90px]" />,
      title: " THỪA KẾ",
      url: `/${toSlug("TƯ VẤN THỪA KẾ")}`,
      description:
        "Với kinh nghiệm hơn 15 năm trong ngành Luật, đã từng hỗ trợ - tư vấn pháp luật thừa kế, giải quyết tranh chấp thừa kế cho hàng ngàn khách hàng. Công ty Luật TNHH ANP cung cấp...",
    },
    {
      icon: <img src={DatDai} alt="Dịch vụ" className="w-[90px] h-[90px]" />,
      title: "TRANH CHẤP ĐẤT ĐAI",
      url: `/${toSlug("TRANH CHẤP ĐẤT ĐAI")}`,
      description:
        "Nhằm hạn chế tình trạng tranh chấp khi những ý kiến đưa ra giải quyết không đi đến thỏa thuận chung, khó khăn, phức tạp tốn nhiều công sức, tiền bạc gây bất lợi cho người sử dụng...",
    },
  ];
  const { ref, inView } = useInView({
    triggerOnce: false, // Chạy lại mỗi khi xuất hiện
    threshold: 0.2, // Kích hoạt khi 20% phần tử hiển thị trên màn hình
  });
  const navigate = useNavigate();

  //FQA
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Thời gian ly hôn đơn phương, thuận tình là bao lâu?",
      answer: "Còn tùy thuộc vào từng trường hợp",
      answer2:
        "Đối với ly hôn đơn phương thời gian thường từ 4 đến 6 tháng. Thuận tình ly hôn là 02 tháng.",
    },
    {
      question: "Tài sản thừa kế được phân chia như thế nào?",
      answer:
        "Chia di sản thừa kế là một nội dung trong chế định thừa kế của Bộ luật dân sự Việt Nam. Sau khi xác định được di sản thừa kế và xác định được người hưởng di sản mới có thể tiến hành phân chia di sản. Có 2 cách phân chia di sản thừa kế: Phân chia theo di chúc thừa kế và phân chia di sản theo pháp luật.",
      answer2: "",
    },
    {
      question:
        "Trường hợp tranh chấp đất đai không có sổ đỏ giải quyết như thế nào?",
      answer:
        "Do tính chất của mỗi vụ việc tranh chấp là khác nhau nên Luật sư sẽ tiếp cận và tư vấn phù hợp với yêu cầu của từng khách hàng và từng vụ việc cụ thể.",
      answer2: "Hotline: 0912.772.008 - Luật sư Thân",
    },
  ];
  return (
    <div className="relative w-full min-h-screen">
      {/* Navbar */}
      <Header />
      {/* Carousel */}
      <div className="relative w-full h-[300px] md:h-[500px] mt-20">
        <img
          src="./src/img/banner2.jpg"
          alt="Law Image"
          className="w-full h-full object-cover"
        />
        <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full">
          <FaChevronLeft />
        </button>
        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full">
          <FaChevronRight />
        </button>
      </div>
      {/* About Us */}
      <section className="py-8 bg-white text-center">
        <div className="container mx-auto px-4 md:w-3/4">
          <h2 className="text-3xl md:text-5xl font-bold text-red-500">
            GIỚI THIỆU
          </h2>
          <div className="flex justify-center my-4">
            <img
              src="./src/img/heading-bottom-border.png"
              className="w-[40%] max-w-sm"
              alt="Heading border"
            />
          </div>

          {/* Wrapper chứa cả văn bản và hình ảnh */}
          <div className="flex flex-col md:flex-row gap-2 items-center">
            {/* Cột Văn bản */}
            <div className="flex-1 text-left text-gray-700">
              <p className="font-bold text-lg text-gray-700 leading-loose ml-4 mt-10 ">
                Công ty Luật TNHH ANP được thành lập theo Giấy chứng nhận đăng
                ký số 01021463/TP/ĐKHĐ cấp năm 2018 của Sở Tư pháp Hà Nội, với
                sự tâm huyết của những Luật sư có kinh nghiệm hành nghề, nguyên
                là Thẩm phán của Tòa Án Nhân dân Tối cao, Kiểm sát viên Viện
                Kiểm Sát Nhân dân Tối cao, các Chánh án, Thẩm phán Tòa án nhân
                dân các cấp với hơn 40 năm kinh nghiệm nghề nghiệp. Hoạt động
                trong lĩnh vực tư vấn pháp luật và dịch vụ luật sư tranh tụng,
                bào chữa Dân sự, Hình sự, Kinh tế - Thương mại...
                <br />
                Công ty Luật ANP lợi thế với 2 văn phòng làm việc thuận tiện hỗ
                trợ khách hàng:
                <br />
                <br />
                Cafe cùng Luật sư: 232 Nguyễn Thị Minh Khai, Phường Võ Thị Sáu,
                Quận 3, TP.HCM
                <br />
                VP Hồ Chí Minh: 232 Nguyễn Thị Minh Khai, Phường Võ Thị Sáu,
                Quận 3, TP.HCM
                <br />
                VP Hà Nội: Tầng 5, Tòa N07, Trần Đăng Ninh, Q. Cầu Giấy, TP. Hà
                Nội
                <br />
               
                <br />
                Hotline 24/7:
                <strong className="text-red-400 font-bold">
                  {" "}
                  0909 229 689{" "}
                </strong>
                <br />
                Email: congtyluatanp232hcm@gmail.com
              </p>
              <button
      className="ml-4 mt-6 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-500 transition duration-700"
      onClick={() => navigate("/danhmuc/ve-chung-toi")}
    >
      Tìm hiểu thêm
    </button>
            </div>

            {/* Cột Hình ảnh */}
            <div className="flex-1">
              <img
                src="./src/img/about.jpg"
                alt="About Us"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Law Services */}
      <section className="py-12 bg-gray-100 text-center">
        <div className="container mx-auto px-4 md:w-3/4">
          <h2 className="text-3xl md:text-5xl font-bold text-red-500">
            DỊCH VỤ CỦA CHÚNG TÔI
          </h2>
          <div className="flex justify-center mb-10 my-4">
            <img
              src="./src/img/heading-bottom-border.png"
              className="w-[40%] max-w-sm"
              alt="Heading border"
            />
          </div>
          {/* Service Cards */}
          <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white shadow-lg p-6 text-center hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300 
                 flex flex-col justify-between items-center w-full h-[400px] rounded-xl border border-gray-200"
              >
                <div className="flex justify-center mb-4 h-16 mt-4">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold">{service.title}</h3>
                <p className="text-gray-600 text-lg mb-2 line-clamp-3 ">
                  {service.description}
                </p>
                <button
            className="px-10 py-3 bg-blue-500 text-white font-bold rounded-lg transition-colors ease-in-out hover:bg-orange-500 duration-700"
            onClick={() => (window.location.href = service.url)}
            // Điều hướng trang
          >
            CHI TIẾT
          </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
            {/*Activiti  */}
            <MissionStatement />
      
      {/*News   */}
      <News />
      {/* FAQ Section */}
      <section className="py-8 bg-white text-center mb-10">
        <div className="container mx-auto w-[90%] md:w-[70%]">
          <div className="relative flex flex-col md:flex-row items-stretch justify-between gap-6 md:gap-10">
            {/* Cột Hình ảnh - Luôn Cố Định */}
            <div className="flex-1 flex justify-center sticky top-20 h-fit">
              <img
                src="./src/img/about.jpg"
                alt="About Us"
                className="w-full max-w-xs md:max-w-xl shadow-lg object-cover"
              />
            </div>
            {/* Cột Văn bản */}
            <div className="flex-1 text-left max-w-2xl">
              
              <p className="text-red-500 font-bold text-lg text-gray-700 mb-4 mt-4 md:text-2xl">
                CÁC VẤN ĐỀ THƯỜNG HAY GẶP PHẢI
              </p>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-gray-100 p-3 bg-white shadow-md"
                  >
                    <div
                      className={`flex items-center justify-between cursor-pointer p-2 transition-all duration-300 
                ${openIndex === index ? "text-blue-500" : "text-gray-800"} 
                hover:text-blue-500`}
                      onClick={() => toggleFAQ(index)}
                    >
                      <span className="text-lg md:text-lg">{faq.question}</span>
                      {openIndex === index ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}
                    </div>
                    {openIndex === index && (
                      <>
                        <hr className="border-t border-gray-300 my-2" />
                        <div className="text-gray-600 text-base md:text-lg mt-2">
                          {faq.answer}
                        </div>
                        <div className="text-gray-600 text-base md:text-lg mt-2">
                          {faq.answer2}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
{/* Banner Bottom Responsive */}
<div
        className="relative w-full min-h-[500px] md:min-h-[500px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('./src/img/background.jpg')" }}
      >
        {/* Lớp phủ màu đen */}
        <div className="absolute inset-0 bg-black/80"></div>

        {/* Container chính */}
        <div className="relative z-10 container w-[90%] md:w-[80%] lg:w-[70%] mx-auto px-4">
          {/* Layout chính */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 min-h-[400px] pb-12">
            {/* Cột nội dung */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-white text-center md:text-left md:w-1/3"
            >
              <h2 className="text-3xl md:text-[45px] font-bold">
                CHÚNG TÔI Ở ĐÂY
              </h2>
              <p className="text-lg md:text-lg font-normal mt-12 mb-6 leading-relaxed">
                Để giải đáp mọi vướng mắc về pháp luật cho bạn. <br />
                Quyền lợi của bạn là ưu tiên hàng đầu của chúng tôi. <br />
                Hãy gửi yêu cầu nếu bạn cần luật sư giải quyết vấn đề pháp lý
                của mình.
              </p>
              <button  onClick={() => navigate("/danhmuc/lien-he")} className="py-2 px-6 bg-blue-500 text-white text-lg font-bold shadow-lg transition-all duration-700 ease-in-out hover:bg-orange-500 hover:translate-y-1">
                Gửi yêu cầu
              </button>
            </motion.div>

            {/* Cột thống kê */}
            <div className="w-full md:w-2/3 flex justify-center">
              <Statistics />
            </div>
          </div>
        </div>
      </div>
      {/*Footer */}
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
}
