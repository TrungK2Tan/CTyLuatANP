import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios"; // Dùng axios để gọi API
import { Link } from "react-router-dom"; // Sử dụng Link để điều hướng
const News = () => {
  const [news, setNews] = useState([]); // State để lưu danh sách bài viết
  // Gọi API lấy danh sách tin tức khi component mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:8000/news");
        setNews(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tin tức:", error);
      }
    };

    fetchNews();
  }, []);

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
      <h2 className="text-[45px] font-bold text-red-500 text-center">
        TIN TỨC
      </h2>
      <div className="flex justify-center mb-10">
        <img
          src="./src/img/heading-bottom-border.png"
          className="w-[40%] max-w-xs"
          alt="Heading border"
        />
      </div>

      <section className="text-center ">
        <div className="relative container mx-auto w-[80%]">
          <Slider {...settings}>
            {news.map((news) => (
              <div
                key={news._id}
                className="bg-white rounded-lg shadow-lg p-8 relative flex flex-col h-full"
              >
                <Link to={`/danhmuc/tin-tuc/${news.slug}`}>
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-[300px] object-cover rounded-lg mb-4"
                />
                </Link>
                <h3 className="text-xl font-bold mb-3 line-clamp-1">
                  {news.title}
                </h3>
                <p className="mt-4 text-gray-600 mb-4 text-ellipsis overflow-hidden whitespace-nowrap line-clamp-2">
                  {news.description}
                </p>
                <Link
                  to={`/danhmuc/tin-tuc/${news.slug}`}
                  className=" bottom-4 left-4 px-6 py-3 mt-3 inline-block text-white bg-blue-600  rounded-lg text-sm font-bold shadow-md hover:bg-orange-500 transition duration-700"
                >
                  Đọc thêm
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default News;
