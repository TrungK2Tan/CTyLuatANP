import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaAngleLeft, FaAngleRight, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import TonChi from "../img/luatanp.jpg";

const testimonials = [
  {
    id: 1,
    image: TonChi,
    quote: `Công ty Luật ANP luôn đặt ra sứ mệnh và thực hiện theo đúng Giá trị cốt lõi mà công ty đã xây dựng TÂM – TẦM – TÀI – TÍN để dẫn lối cho hành động của đội ngũ luật sư ANP và những kỳ vọng mà chúng tôi đặt vào bản thân mình cũng như kỳ vọng khách hàng đặt niềm tin tại công ty. Thực hiện đúng kim chỉ nam mà người lãnh đạo công ty luật ANP đã đặt ra`,
    author: "Luật sư Nguyễn Văn Thân",
  },
  {
    id: 2,
    image: TonChi,
    quote: `Công ty Luật ANP luôn đặt ra sứ mệnh và thực hiện theo đúng Giá trị cốt lõi mà công ty đã xây dựng TÂM – TẦM – TÀI – TÍN để dẫn lối cho hành động của đội ngũ luật sư ANP và những kỳ vọng mà chúng tôi đặt vào bản thân mình cũng như kỳ vọng khách hàng đặt niềm tin tại công ty. Thực hiện đúng kim chỉ nam mà người lãnh đạo công ty luật ANP đã đặt ra`,
    author: "Luật sư Nguyễn Văn Thân",
  },
];

const MissionStatement = () => {
  return (
    <div className="py-12 bg-gray-100">
      <h2 className="text-5xl font-bold text-red-500 text-center">
        TÔN CHỈ HOẠT ĐỘNG
      </h2>
      <div className="flex justify-center mb-10 my-4">
        <img
          src="./src/img/heading-bottom-border.png"
          className="w-[40%] max-w-sm"
          alt="Heading border"
        />
      </div>
      <div className="relative max-w-6xl mx-auto px-4">
        <Swiper
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Navigation]}
          className="mySwiper"
          spaceBetween={20}
          slidesPerView={1}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="pb-4 bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start md:w-[100%] mx-auto">
                <div className="w-full md:w-[30%] flex justify-center md:justify-start mb-4 md:mb-0">
                  <img
                    src={item.image}
                    alt="Building"
                    className="w-[80%] md:w-full h-[280px] md:h-[380px] object-cover rounded-lg"
                  />
                </div>
                <div className="w-full md:w-[70%] text-gray-700 px-4 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mt-2">
                    <FaQuoteLeft className="text-[52px] text-gray-200" />
                  </div>
                  <p className="italic text-lg leading-relaxed">
                    {item.quote}
                  </p>
                  <div className="flex justify-center md:justify-end mt-2">
                    <FaQuoteRight className="text-[52px] text-gray-200" />
                  </div>
                  <p className="mt-4 text-blue-600 text-xl font-semibold">
                    {item.author}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="absolute left-0 top-1/2 transform -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-blue-500 text-white text-2xl font-bold shadow-lg transition-all duration-500 ease-in-out hover:bg-orange-500 hover:scale-110 z-10">
         <FaAngleLeft/>
        </button>
        <button className="absolute right-0 top-1/2 transform -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-blue-500 text-white text-2xl font-bold shadow-lg transition-all duration-500 ease-in-out hover:bg-orange-500 hover:scale-110 z-10">
          <FaAngleRight/>
        </button>
      </div>
    </div>
  );
};

export default MissionStatement;
