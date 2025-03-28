import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const FormDetailManagement = () => {
  const { slug } = useParams();
  const [admin, setAdmin] = useState({});
  const [form, setForm] = useState(null);

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (storedAdmin) {
      setAdmin(storedAdmin);
    }

    // Gọi API lấy thông tin chi tiết biểu mẫu
    fetch(`${API_URL}/forms/${slug}`)
      .then((res) => res.json())
      .then((data) => setForm(data))
      .catch((error) => console.error("Lỗi tải chi tiết biểu mẫu:", error));
  }, [slug]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar admin={admin} />

      {/* Main Content */}
      <div className="w-3/4 p-6 bg-gray-100">
        {form ? (
          <div className="bg-white p-4 rounded shadow">
            <h1 className="text-2xl font-bold">{form.title}</h1>
            <p className="text-gray-600">{form.description}</p>

            {form.image && (
              <img
                src={form.image}
                alt="Biểu mẫu"
                className="mt-4 rounded-lg shadow"
                style={{ maxWidth: "300px" }}
              />
            )}

            <p className="mt-4 text-gray-800">{form.content}</p>

            {form.fileUrl && (
              <div className="mt-4">
                <a
                  href={form.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  📄 Xem file đính kèm
                </a>
              </div>
            )}
          </div>
        ) : (
          <p>Đang tải...</p>
        )}
      </div>
    </div>
  );
};

export default FormDetailManagement;
