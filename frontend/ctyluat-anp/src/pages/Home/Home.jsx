import { FaChevronLeft, FaChevronRight, FaChevronDown} from "react-icons/fa";

import DatDai from "../../img/item/dat-dai.png";
import DoanhNghiep from "../../img/item/doanh-nghiep.png";
import HinhSu from "../../img/item/hinh-su.png";
import HonNhan from "../../img/item/hon-nhan.png";
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

export default function Home() {
  const services = [
    {
      icon: <img src={HonNhan} alt="Dịch vụ" className="w-[90px] h-[90px]" />,
      title: "HÔN NHÂN GIA ĐÌNH",
      description:
        "Công ty Luật TNHH ANP tư vấn, cung cấp dịch vụ pháp lý, giải quyết thủ tục về Luật Hôn nhân gia đình như Ly hôn, Kết hôn, Tranh chấp quyền nuôi con, Chia tài sản khi ly h...",
    },
    {
      icon: <img src={KeToan} alt="Dịch vụ" className="w-[90px] h-[90px]" />,
      title: "KINH DOANH THƯƠNG MẠI",
      description:
        "Hợp đồng nếu không được soạn kỹ có thể gặp nhiều rủi ro: chủ thể hợp đồng, đối tượng giao dịch, điều khoản đôi bên, trách nhiệm và nghĩa vụ, thủ tục pháp lý...",
    },
    {
      icon: (
        <img src={DoanhNghiep} alt="Dịch vụ" className="w-[90px] h-[90px]" />
      ),
      title: "TƯ VẤN LUẬT DÂN SỰ",
      description:
        "Công ty luật ANP cung cấp dịch vụ tư vấn luật dân sự bao gồm: tranh chấp đất đai, hôn nhân gia đình, tranh chấp hợp đồng, thừa kế tài sản...",
    },
    {
      icon: <img src={HinhSu} alt="Dịch vụ" className="w-[90px] h-[90px]" />,
      title: "TƯ VẤN LUẬT HÌNH SỰ",
      description:
        "Với đội ngũ luật sư chuyên gia có nhiều năm kinh nghiệm trong ngành luật và văn phòng tại Hà Nội và TP. Hồ Chí Minh, chúng tôi cam kết mang đến dịch vụ pháp lý toàn diện nhất cho k...",
    },
    {
      icon: (
        <img src={LuatSuDanSu} alt="Dịch vụ" className="w-[90px] h-[90px]" />
      ),
      title: "TƯ VẤN THỪA KẾ",
      description:
        "Với kinh nghiệm hơn 15 năm trong ngành Luật, đã từng hỗ trợ - tư vấn pháp luật thừa kế, giải quyết tranh chấp thừa kế cho hàng ngàn khách hàng. Công ty Luật TNHH ANP cung cấp các d...",
    },
    {
      icon: <img src={DatDai} alt="Dịch vụ" className="w-[90px] h-[90px]" />,
      title: "TƯ VẤN LUẬT DÂN SỰ",
      description:
        "Nhằm hạn chế tình trạng tranh chấp khi những ý kiến đưa ra giải quyết không đi đến thỏa thuận chung, khó khăn, phức tạp tốn nhiều công sức, tiền bạc gây bất lợi cho người sử dụng đ...",
    },
  ];
  const { ref, inView } = useInView({
    triggerOnce: false, // Chạy lại mỗi khi xuất hiện
    threshold: 0.2, // Kích hoạt khi 20% phần tử hiển thị trên màn hình
  });
  
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
    <div className="relative w-full h-screen">
      {/* Navbar */}
      <Header />
      {/* Carousel */}
      <div className="relative w-full h-[500px] mt-24">
        <img
          src="./src/img/banner2.jpg"
          alt="Law Image"
          className="w-full h-full object-cover"
        />
        <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full">
          <FaChevronLeft />
        </button>
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full">
          <FaChevronRight />
        </button>
      </div>
      {/* About Us */}
      <section className="py-8 bg-white text-center mb-10">
        <div className="container mx-auto w-[70%]">
          <h2 className="text-[45px] font-bold text-red-500 text-center ">
            VỀ CHÚNG TÔI
          </h2>
          <div className="flex justify-center mb-10">
            <img
              src="./src/img/heading-bottom-border.png"
              className="w-[40%] max-w-xs"
              alt="Heading border"
            />
          </div>

          {/* Wrapper chứa cả văn bản và hình ảnh */}
          <div className="relative flex flex-col md:flex-row items-stretch justify-between gap-10">
            {/* Cột Văn bản */}
            <div className="flex-1 text-left max-w-2xl h-full">
              <p className="font-bold text-lg text-gray-700 leading-loose h-full">
                Công ty Luật TNHH ANP được thành lập theo Giấy chứng nhận đăng
                ký số 01021463/TP/ĐKHĐ cấp năm 2018 của Sở Tư pháp Hà Nội, với
                sự tâm huyết của những Luật sư có kinh nghiệm hành nghề, nguyên
                là Thẩm phán của Tòa Án Nhân dân Tối cao, Kiểm sát viên Viện
                Kiểm Sát Nhân dân Tối cao, các Chánh án, Thẩm phán Tòa án nhân
                dân các cấp với hơn 40 năm kinh nghiệm nghề nghiệp. Hoạt động
                trong lĩnh vực tư vấn pháp luật và dịch vụ luật sư tranh tụng,
                bào chữa Dân sự, Hình sự, Kinh tế - Thương mại...
                <br />
                <br />
                Công ty Luật ANP lợi thế với 2 văn phòng làm việc thuận tiện hỗ
                trợ khách hàng:
                <br />
                VP Hà Nội: Tầng 5, Tòa N07, Trần Đăng Ninh, Q. Cầu Giấy, TP. Hà
                Nội
                <br />
                VP Hồ Chí Minh: 232 Nguyễn Thị Minh Khai, Phường Võ Thị Sáu,
                Quận 3, TP.HCM
                <br />
                <br />
                Hotline 24/7:
                <strong className="text-red-400 font-bold">
                  {" "}
                  090 360 1234{" "}
                </strong>
                <br />
                Email: congtyluatanp.hcm@gmail.com
              </p>
            </div>

            {/* Cột Hình ảnh */}
            <div className="flex-1 flex justify-center self-stretch">
              <img
                src="./src/img/about.jpg"
                alt="About Us"
                className="w-full rounded-lg shadow-lg object-cover mr-10"
              />
            </div>

            {/* Nút "Tìm hiểu thêm" ở góc trái dưới cột văn bản & hình ảnh */}
            <button  className="absolute left-0 -bottom-12 px-6 py-3 rounded bg-blue-500 text-white font-bold shadow-md hover:bg-orange-500 transition duration-700">
              Tìm hiểu thêm
            </button>
          </div>
        </div>
      </section>
      {/* Law Services */}
      <section className="py-12 bg-gray-100 text-center">
        <div className="container mx-auto w-[70%]">
          <h2 className="text-[45px] font-bold text-red-500 text-center">
            DỊCH VỤ LUẬT SƯ
          </h2>
          <div className="flex justify-center mb-10">
            <img
              src="./src/img/heading-bottom-border.png"
              className="w-[40%] max-w-xs"
              alt="Heading border"
            />
          </div>

          {/* Service Cards */}
          <div className="grid md:grid-cols-3 gap-8 px-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 text-center transition duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button className="relative px-6 py-3 rounded-lg bg-blue-500 text-white font-bold shadow-md overflow-hidden transition-all duration-700 ease-in-out hover:bg-orange-500 hover:translate-y-1">
                  <span className="relative z-10">CHI TIẾT</span>
                  <span className="absolute inset-0 bg-white opacity-0 translate-y-[-100%] transition-all duration-700 ease-in-out hover:opacity-100 hover:translate-y-0"></span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Banner Bottom */}
      <div className="relative w-full h-[440px]">
        {/* Hình ảnh nền */}
        <img
          src="./src/img/background.jpg"
          alt="Law Image"
          className="w-full h-full object-cover"
        />
        {/* Lớp phủ màu đen với opacity */}
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center h-full w-full">
          <div className="container w-[70%] mx-auto mt-8">
            {/* Grid chia thành 3 phần */}
            <div className="grid grid-cols-3 gap-6 px-6 min-h-[400px] pb-12">
              {/* Cột nội dung (chiếm 1 phần) */}
              <div className="text-white text-left">
                <motion.div
                  ref={ref} // Gán ref để theo dõi phần tử
                  initial={{ opacity: 0, x: -100 }} // Bắt đầu từ bên trái
                  animate={
                    inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }
                  } // Khi nhìn thấy, chạy hiệu ứng
                  transition={{ duration: 1, ease: "easeOut" }} // Hiệu ứng mượt trong 1 giây
                  className="text-white text-left"
                >
                  <h2 className="text-3xl md:text-[40px] font-bold">
                    CHÚNG TÔI Ở ĐÂY
                  </h2>
                  <p className="text-xl md:text-[18px] font-normal mt-10 mb-10 ">
                    Để giải đáp mọi vướng mắc về pháp luật cho bạn. <br />
                    Quyền lợi của bạn là ưu tiên hàng đầu của chúng tôi, <br />
                    Hãy gửi yêu cầu nếu bạn cần luật sư giải quyết mọi vấn đề
                    pháp lý của mình.
                  </p>
                  <button className="py-2 px-6 bg-blue-500 text-white text-lg font-bold shadow-lg transition-all duration-700 ease-in-out hover:bg-orange-500 hover:translate-y-1">
                    Gửi yêu cầu
                  </button>
                </motion.div>
              </div>
              {/* Cột thống kê (chiếm 2 phần) */}
              <Statistics />
            </div>
          </div>
        </div>
      </div>
      {/*Activiti */}
      <MissionStatement />
      {/*News */}
      <News />
      {/*FQA */}
      <section className="py-8 bg-white text-center mb-10">
        <div className="container mx-auto w-[70%]">
          <div className="relative flex flex-col md:flex-row items-stretch justify-between gap-10">
            {/* Cột Hình ảnh */}
            <div className="flex-1 flex justify-center self-stretch">
              <img
                src="./src/img/about.jpg"
                alt="About Us"
                className="w-full rounded-lg shadow-lg object-cover mr-10"
              />
            </div>
            {/* Cột Văn bản */}
            <div className="flex-1 text-left max-w-2xl h-full">
              <h2 className="text-red-500 font-bold text-2xl">FQA</h2>
              <p className="font-bold text-lg text-gray-700 mb-4">
                CÁC VẤN ĐỀ THƯỜNG HAY GẶP PHẢI
              </p>
              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <div key={index} className="border  p-3 bg-white shadow-md">
                    <div
                      className={`flex items-center justify-between cursor-pointer p-2 transition-colors duration-300 
                ${openIndex === index ? "text-blue-500" : "text-gray-800"} 
                hover:text-blue-500`}
                      onClick={() => toggleFAQ(index)}
                    >
                      <span className="font-bold text-xl">{faq.question}</span>
                      {openIndex === index ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}
                    </div>
                    {openIndex === index && (
                      <>
                        <hr className="border-t border-gray-300 my-2" />
                        <div className="font-medium text-[20px] mt-2 text-gray-600">
                          {faq.answer}
                        </div>
                        <div className="font-medium text-[20px] mt-2 text-gray-600">
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
      {/*Footer */}
      <Footer/>
      {/*COpy right */}
      <div className="bg-blue-950 w-full">
        <div className="container mx-auto text-white w-[70%] border-t border-white pt-4 flex justify-between text-lg py-4">
          <span>Copyright © 2021 congtyluatanp.com . All rights reserved.</span>
          <span>Design by DUDI SoftWare</span>
        </div>
      </div>
    </div>
  );
}
