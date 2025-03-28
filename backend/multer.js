const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

// 🔥 Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📌 Cấu hình Multer cho ảnh -> Lưu trên Cloudinary
const storageCloudinary = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: "images",
    format: file.mimetype.split("/")[1],
    public_id: Date.now() + "-" + file.originalname,
    resource_type: "image",
  }),
});

// 📌 Cấu hình Multer cho tài liệu -> Lưu trên Cloudinary
const storageCloudinaryFile = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: "documents",
    format: file.originalname.split(".").pop(),
    public_id: Date.now() + "-" + file.originalname,
    resource_type: "auto", // ⚡ Để Cloudinary tự nhận diện file
  }),
});

// 🔥 Khởi tạo Multer với cấu hình Cloudinary
const uploadImage = multer({ storage: storageCloudinary });
const uploadFile = multer({ storage: storageCloudinaryFile });
// ✅ Cấu hình Multer lưu file tạm vào thư mục "uploads/"
const upload = multer({ dest: "uploads/" });
// ✅ Xuất các module
module.exports = { upload, uploadImage, uploadFile, cloudinary };
