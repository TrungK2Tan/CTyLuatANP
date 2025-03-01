const multer = require("multer");
const path = require("path");

// Cấu hình nơi lưu trữ file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads"); // Lưu vào thư mục uploads
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Đổi tên file để tránh trùng lặp
    },
});

// Bộ lọc để chấp nhận ảnh + tài liệu
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/jpeg", "image/png", "image/gif",         // Ảnh
        "application/pdf",                              // PDF
        "application/msword",                           // DOC
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" // DOCX
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Chỉ cho phép tải lên file ảnh hoặc tài liệu (.doc, .docx, .pdf)"), false);
    }
};

// Khởi tạo multer với cấu hình trên
const upload = multer({ storage, fileFilter });

module.exports = upload;
