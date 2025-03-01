import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="flex items-center bg-cyan-600/10 px-6 py-4 rounded-xl border border-gray-300 focus-within:ring-2 focus-within:ring-cyan-400 transition-all">
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Nhập mật khẩu"}
        type={isShowPassword ? "text" : "password"}
        className="w-full text-lg bg-transparent outline-none"
      />
      {isShowPassword ? (
        <FaRegEye
          size={24}
          className="text-cyan-400 cursor-pointer hover:text-cyan-500 transition-all"
          onClick={toggleShowPassword}
        />
      ) : (
        <FaRegEyeSlash
          size={24}
          className="text-gray-400 cursor-pointer hover:text-gray-500 transition-all"
          onClick={toggleShowPassword}
        />
      )}
    </div>
  );
};

export default PasswordInput;
