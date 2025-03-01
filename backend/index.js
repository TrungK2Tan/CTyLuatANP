require("dotenv").config();
const config = require("./config.json");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
const upload = require("./multer");
const slugify = require("slugify");

const User = require("./models/user.model");
const Form = require("./models/form.model");
const { authenticateToken } = require("./utilities");

mongoose.connect(config.connectionString);

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// Create account
app.post("/create-account", async (req, res) => {
  const { fullName, email, password, phone, dob, gender } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({
      error: true,
      message: "Full name, email, and password are required",
    });
  }

  const isUser = await User.findOne({ email });
  if (isUser) {
    return res
      .status(400)
      .json({ error: true, message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    fullName,
    email,
    password: hashedPassword,
    phone: phone || null, // Nếu không có phone, sẽ là null
    dob: dob ? new Date(dob) : null, // Chuyển dob sang Date object nếu có
    gender: gender || "Other", // Nếu không có, mặc định là "Other"
  });

  await user.save();

  if (!process.env.ACCESS_TOKEN_SECRET) {
    return res
      .status(500)
      .json({ error: true, message: "Server configuration error" });
  }

  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "72h" }
  );

  return res.status(201).json({
    error: false,
    user: {
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      dob: user.dob,
      gender: user.gender,
    },
    accessToken,
    message: "Registration Successful",
  });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "72h" }
  );

  return res.json({
    error: false,
    message: "Login Successful",
    user: {
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      dob: user.dob,
      gender: user.gender,
    },
    accessToken,
  });
});

//  API Thêm biểu mẫu mới
app.post("/forms", async (req, res) => {
  const { title, description, image, content, fileUrl } = req.body;

  if (!title || !description || !content || !fileUrl) {
    return res.status(400).json({ error: "Thiếu thông tin bắt buộc" });
  }

  try {
    const slug = slugify(title, { lower: true, strict: true });

    const newForm = new Form({
      title,
      slug,
      description,
      image,
      content,
      fileUrl,
    });

    await newForm.save();
    res
      .status(201)
      .json({ message: "Thêm biểu mẫu thành công", form: newForm });
  } catch (error) {
    console.error("❌ Lỗi khi tạo biểu mẫu:", error); // In lỗi ra console
    res.status(500).json({ error: "Lỗi tạo biểu mẫu", details: error.message });
  }
});
// Sửa biểu mẫu theo slug
app.put("/forms/:slug", async (req, res) => {
    try {
      const { title, description, image, content, fileUrl } = req.body;
  
      // Kiểm tra nếu biểu mẫu tồn tại
      let form = await Form.findOne({ slug: req.params.slug });
      if (!form) {
        return res.status(404).json({ error: "Không tìm thấy biểu mẫu" });
      }
  
      // Nếu có thay đổi title, cập nhật slug
      let newSlug = form.slug;
      if (title && title !== form.title) {
        newSlug = slugify(title, { lower: true, strict: true });
      }
  
      form = await Form.findOneAndUpdate(
        { slug: req.params.slug },
        { title, slug: newSlug, description, image, content, fileUrl },
        { new: true } // Trả về object mới sau khi cập nhật
      );
  
      res.json({ message: "Cập nhật biểu mẫu thành công", form });
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật biểu mẫu:", error);
      res.status(500).json({ error: "Lỗi server", details: error.message });
    }
  });
  
  // Xóa biểu mẫu theo slug
  app.delete("/forms/:slug", async (req, res) => {
    try {
      const form = await Form.findOneAndDelete({ slug: req.params.slug });
  
      if (!form) {
        return res.status(404).json({ error: "Không tìm thấy biểu mẫu" });
      }
  
      res.json({ message: "Đã xóa biểu mẫu thành công" });
    } catch (error) {
      console.error("❌ Lỗi khi xóa biểu mẫu:", error);
      res.status(500).json({ error: "Lỗi server", details: error.message });
    }
  });
  

// API Lấy danh sách biểu mẫu
app.get("/forms", async (req, res) => {
  try {
    const forms = await Form.find(); // Lấy toàn bộ biểu mẫu
    res.json(forms);
  } catch (error) {
    console.error("Lỗi lấy danh sách biểu mẫu:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
});

// API Lấy chi tiết biểu mẫu theo slug
app.get("/forms/:slug", async (req, res) => {
  try {
    const form = await Form.findOne({ slug: req.params.slug });
    if (!form) {
      return res.status(404).json({ error: "Không tìm thấy biểu mẫu" });
    }
    res.json(form);
  } catch (error) {
    console.error("Lỗi lấy biểu mẫu:", error);
    res.status(500).json({ error: "Lỗi server", details: error.message });
  }
});

// API Upload file DOC
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file)
    return res.status(400).json({ error: "Không có file được tải lên" });
  const fileUrl = `http://localhost:8000/uploads/${req.file.filename}`;
  res.json({ fileUrl });
});
//serve static files from the uploads and assets directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

module.exports = app;
