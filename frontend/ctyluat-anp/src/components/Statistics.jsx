import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Person from "../img/persion.png";
import Success from "../img/success.png";
import Exp from "../img/expert.png";

const StatisticCard = ({ icon, targetNumber, label, animation }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true, // Chỉ chạy một lần khi xuất hiện
    threshold: 0.3, // Kích hoạt khi 30% phần tử hiển thị
  });

  useEffect(() => {
    if (!inView) return; // Nếu chưa vào màn hình, không chạy

    let start = 0;
    const duration = 4000; // 4 giây
    const stepTime = 40;
    const increment = Math.ceil(targetNumber / (duration / stepTime));

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        setCount(targetNumber);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [targetNumber, inView]);

  return (
    <motion.div
      ref={ref}
      initial={animation.initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : animation.initial}
      transition={{ duration: 1, ease: "easeOut" }}
      className="group relative text-white border border-gray-300 rounded-lg p-8 text-center h-[350px] flex flex-col justify-center items-center overflow-hidden transition-all duration-500 ease-in-out hover:border-blue-500 hover:scale-105"
    >
      <img src={icon} alt={label} className="mx-auto mb-4 w-20 relative z-10" />
      <div className="absolute bottom-[160px] left-1/2 transform -translate-x-1/2 w-24 h-[2px] bg-blue-500 transition-all duration-500 ease-in-out group-hover:bg-white z-20"></div>
      <h3 className="mt-8 text-6xl font-bold relative z-10">{count}</h3>
      <p className="text-xl uppercase relative z-10">{label}</p>
      <div className="absolute inset-0 bg-blue-500 scale-y-0 origin-bottom transition-transform duration-500 ease-in-out group-hover:scale-y-100"></div>
    </motion.div>
  );
};

const Statistics = () => {
  return (
    <div className="px-4 col-span-2 grid grid-cols-3 gap-8 items-center relative z-10">
    <StatisticCard
      icon={Person}
      targetNumber={12.596}
      label="Khách hàng"
      animation={{ initial: { opacity: 0, y: 50 } }} // Từ dưới lên
    />
    <StatisticCard
      icon={Success}
      targetNumber={8132}
      label="Hoàn thành"
      animation={{ initial: { opacity: 0, y: -50 } }} // Từ trên xuống
    />
    <StatisticCard
      icon={Exp}
      targetNumber={16}
      label="Kinh nghiệm"
      animation={{ initial: { opacity: 0, x: 50 } }} // Từ phải vào
    />
  </div>
  );
};

export default Statistics;
