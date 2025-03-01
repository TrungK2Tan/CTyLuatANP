import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import PasswordInput from "../../components/input/PasswordInput";
import { motion } from "framer-motion";

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!validateEmail(email)) {
      setError("Vui lòng nhập đúng email");
      return;
    }
    if (!password) {
      setError("Vui lòng nhập mật khẩu");
      return;
    }
  
    setError("");
    try {
      const response = await axiosInstance.post("/login", { email, password });
      
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("admin", JSON.stringify(response.data.user)); // Lưu thông tin admin
        navigate("/admin");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Có lỗi xảy ra, thử lại sau");
    }
  };
  

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-cyan-100">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-white p-12 rounded-2xl shadow-xl"
      >
        <div className="text-center mb-8">
          <img
            src="../src/img/logo-anp(1).png"
            alt="Logo ANP"
            className="mx-auto w-28 h-28 object-contain"
          />
          <h2 className="text-3xl font-semibold text-blue-600 mt-3">
            Công ty Luật ANP
          </h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="input-label text-lg">Email</label>
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="input-box text-lg py-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="input-label text-lg">Mật khẩu</label>
            <PasswordInput
              className="text-lg py-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-lg">{error}</p>}

          <button type="submit" className="btn-primary text-lg py-4">
            Đăng nhập
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginAdmin;
