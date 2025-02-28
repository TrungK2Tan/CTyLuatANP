import React from 'react';
import Slider from 'react-slick';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import KTHinhSu from "../img/ANP/khoitohinhsu.jpg";
import BuaPhap from "../img/ANP/mienchaphanh.jpg";
import TamThan from "../img/ANP/tamthan.jpg";

const newsData = [
  { id: 1, title: 'Việc áp dụng tình tiết định khung...', image: KTHinhSu, description: 'Việc áp dụng tình tiết định khungViệc áp dụng tình tiết định khungViệc áp dụng tình tiết định khung...' },
  { id: 2, title: 'Xử lý đối với hành vi vi săn bắt...', image: BuaPhap, description: 'Xử lý đối với hành vi vi săn bắtViệc áp dụng tình tiết định khungViệc áp dụng tình tiết định khungViệc áp dụng tình tiết định khung...' },
  { id: 3, title: 'Điều kiện hưởng án treo...', image: TamThan, description: 'Điều kiện hưởng án treoViệc áp dụng tình tiết định khungViệc áp dụng tình tiết định khungViệc áp dụng tình tiết định khungViệc áp dụng tình tiết định khungViệc áp dụng tình tiết định khung...' },
  { id: 4, title: 'Việc áp dụng tình tiết định khung...', image: TamThan, description: 'Việc áp dụng tình tiết định khungViệc áp dụng tình tiết định khungViệc áp dụng tình tiết định khungViệc áp dụng tình tiết định khungViệc áp dụng tình tiết định khungViệc áp dụng tình tiết định khung...' },
  { id: 5, title: 'Điều kiện hưởng án treo...', image: KTHinhSu, description: 'Điều kiện hưởng án treoViệc áp dụng tình tiết định khungViệc áp dụng tình tiết định khungViệc áp dụng tình tiết định khung...' },
  { id: 6, title: 'Việc áp dụng tình tiết định khung...', image: BuaPhap, description: 'Việc áp dụng tình tiết định khungViệc áp dụng tình tiết định khungViệc áp dụng tình tiết định khung...' },
];

const News = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <h2 className="text-[45px] font-bold text-red-500 text-center">TIN TỨC</h2>
      <div className="flex justify-center mb-10">
        <img src="./src/img/heading-bottom-border.png" className="w-[40%] max-w-xs" alt="Heading border" />
      </div>

      <section className="text-center ">
        <div className="relative container mx-auto w-[80%]">
          <Slider {...settings}>
            {newsData.map((news) => (
              <div key={news.id} className="bg-white rounded-lg shadow-lg p-8 relative flex flex-col h-full">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-[300px] object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold mb-3 line-clamp-2">{news.title}</h3>
                <p className="mt-4 text-gray-600 mb-4 text-ellipsis overflow-hidden whitespace-nowrap line-clamp-3">{news.description}</p>
                <button className="flex bottom-4 left-4 px-6 py-3 rounded bg-blue-500 text-white font-bold shadow-md hover:bg-orange-500 transition duration-700">
                  Đọc thêm
                </button>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default News;
