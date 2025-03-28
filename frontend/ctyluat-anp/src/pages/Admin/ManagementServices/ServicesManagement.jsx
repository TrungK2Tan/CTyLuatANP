import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const ServicesManagement = () => {
  const [admin, setAdmin] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newServiceName, setNewServiceName] = useState("");

  const [editingService, setEditingService] = useState(null);
  const [editServiceName, setEditServiceName] = useState("");

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (storedAdmin) {
      setAdmin(storedAdmin);
    }

    axios.get(`${API_URL}/categories`)
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => console.error("Lỗi khi lấy danh mục:", error));
  }, []);

  const fetchServicesByCategory = (category) => {
    axios.get(`${API_URL}/services/${category.slug}`)
      .then(response => {
        setSelectedCategory(category);
        setServices(response.data.services);
        setSelectedService(null);
        setPosts([]);
      })
      .catch(error => console.error("Lỗi khi lấy dịch vụ:", error));
  };

  const fetchPostsByService = (service) => {
    axios.get(`${API_URL}/posts/${service.slug}`)
      .then(response => {
        setSelectedService(service);
        setPosts(response.data.posts);
      })
      .catch(error => {
        console.error("Lỗi khi lấy bài viết:", error);
        setPosts([]);
      });
  };

  const addService = () => {
    if (!selectedCategory || !newServiceName) return;

    axios.post(`${API_URL}/categories/${selectedCategory._id}/services`, { name: newServiceName })
      .then(response => {
        setServices(response.data.category.services);
        setNewServiceName("");
      })
      .catch(error => console.error("Lỗi khi thêm dịch vụ:", error));
  };

  const deleteService = (serviceSlug) => {
    axios.delete(`${API_URL}/categories/${selectedCategory._id}/services/${serviceSlug}`)
      .then(() => {
        setServices(services.filter(s => s.slug !== serviceSlug));
      })
      .catch(error => console.error("Lỗi khi xóa dịch vụ:", error));
  };

  const startEditingService = (service) => {
    setEditingService(service);
    setEditServiceName(service.name);
  };

  const updateService = () => {
    if (!editingService || !editServiceName) return;

    axios.put(`${API_URL}/categories/${selectedCategory._id}/services/${editingService.slug}`, { name: editServiceName })
      .then(response => {
        setServices(response.data.category.services);
        setEditingService(null);
        setEditServiceName("");
      })
      .catch(error => console.error("Lỗi khi cập nhật dịch vụ:", error));
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar admin={admin} />
      <div className="w-3/4 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold">👨‍⚖️ Quản lý dịch vụ</h1>

        <h2 className="text-xl font-semibold mt-4">📂 Danh mục</h2>
        <table className="w-full bg-white shadow rounded mt-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Tên danh mục</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category._id} className="border-t cursor-pointer hover:bg-gray-100"
                onClick={() => fetchServicesByCategory(category)}>
                <td className="p-2 text-blue-600">{category.name}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedCategory && (
          <>
            <h2 className="text-xl font-semibold mt-6">🔹 Dịch vụ thuộc "{selectedCategory.name}"</h2>
            <input 
              type="text" 
              placeholder="Nhập tên dịch vụ mới" 
              className="border p-2 mr-2" 
              value={newServiceName} 
              onChange={(e) => setNewServiceName(e.target.value)}
            />
            <button onClick={addService} className="bg-blue-500 text-white p-2 rounded">Thêm</button>

            <table className="w-full bg-white shadow rounded mt-2">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Tên dịch vụ</th>
                  <th className="p-2">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {services.map(service => (
                  <tr key={service.slug} className="border-t hover:bg-gray-100">
                    <td className="p-2 text-green-600 cursor-pointer" onClick={() => fetchPostsByService(service)}>
                      {service.name}
                    </td>
                    <td className="p-2">
                      <button onClick={() => startEditingService(service)} className="bg-yellow-500 text-white p-2 rounded">Sửa</button>
                      <button onClick={() => deleteService(service.slug)} className="bg-red-500 text-white p-2 rounded ml-2">Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* Form chỉnh sửa dịch vụ */}
        {editingService && (
          <div className="mt-4 p-4 bg-white shadow rounded">
            <h2 className="text-lg font-semibold">✏️ Cập nhật dịch vụ</h2>
            <input 
              type="text" 
              className="border p-2 w-full mt-2" 
              value={editServiceName} 
              onChange={(e) => setEditServiceName(e.target.value)} 
            />
            <button onClick={updateService} className="bg-blue-500 text-white p-2 mt-2 rounded w-full">Lưu thay đổi</button>
            <button onClick={() => setEditingService(null)} className="bg-gray-400 text-white p-2 mt-2 rounded w-full">Hủy</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesManagement;
