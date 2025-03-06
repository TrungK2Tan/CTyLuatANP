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
const CategoryServices = require("./models/categoryServices.model");
const PostServices = require("./models/postServices.model");
const User = require("./models/user.model");
const Form = require("./models/form.model");
const News = require("./models/news.model");
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
app.put("/update-user", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Lấy ID từ token
    const { fullName, phone, dob, gender, password } = req.body;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ error: true, message: "User not found" });

    if (fullName) user.fullName = fullName;
    if (phone) user.phone = phone;
    if (dob) user.dob = new Date(dob);
    if (gender) user.gender = gender;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    return res.json({
      error: false,
      message: "Profile updated successfully",
      user: {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
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
    console.error(" Lỗi khi tạo biểu mẫu:", error); // In lỗi ra console
    res.status(500).json({ error: "Lỗi tạo biểu mẫu", details: error.message });
  }
});
// API Cập nhật biểu mẫu có hỗ trợ file upload
app.put(
  "/forms/:slug",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { title, description, content } = req.body;
      let form = await Form.findOne({ slug: req.params.slug });
      if (!form) {
        return res.status(404).json({ error: "Không tìm thấy biểu mẫu" });
      }
      let newSlug = form.slug;
      if (title && title !== form.title) {
        newSlug = slugify(title, { lower: true, strict: true });
      }
      const image = req.files["image"]
        ? `http://localhost:8000/uploads/${req.files["image"][0].filename}`
        : form.image;
      const fileUrl = req.files["file"]
        ? `http://localhost:8000/uploads/${req.files["file"][0].filename}`
        : form.fileUrl;
      form = await Form.findOneAndUpdate(
        { slug: req.params.slug },
        { title, slug: newSlug, description, image, content, fileUrl },
        { new: true }
      );
      res.json({ message: "Cập nhật biểu mẫu thành công", form });
    } catch (error) {
      console.error(" Lỗi khi cập nhật biểu mẫu:", error);
      res.status(500).json({ error: "Lỗi server", details: error.message });
    }
  }
);
// Xóa biểu mẫu theo slug
app.delete("/forms/:slug", async (req, res) => {
  try {
    const form = await Form.findOneAndDelete({ slug: req.params.slug });

    if (!form) {
      return res.status(404).json({ error: "Không tìm thấy biểu mẫu" });
    }

    res.json({ message: "Đã xóa biểu mẫu thành công" });
  } catch (error) {
    console.error(" Lỗi khi xóa biểu mẫu:", error);
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
// API Upload file (Hỗ trợ ảnh & tài liệu)
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file)
    return res.status(400).json({ error: "Không có file được tải lên" });
  const fileUrl = `http://localhost:8000/uploads/${req.file.filename}`;
  res.json({ fileUrl });
});
//Tao bai viet
app.post("/news", async (req, res) => {
  const { title, description, image, content } = req.body;

  if (!title || !description || !image || !content) {
    return res.status(400).json({ error: "Thiếu thông tin bài viết" });
  }

  try {
    const slug = slugify(title, { lower: true, strict: true });

    const newNews = new News({
      title,
      slug,
      description,
      image,
      content,
    });

    await newNews.save();
    res
      .status(201)
      .json({ message: "Thêm bài viết thành công", news: newNews });
  } catch (error) {
    console.error(" Lỗi khi tạo bài viết:", error);
    res.status(500).json({ error: "Lỗi server", details: error.message });
  }
});
//  API Lấy danh sách bài viết News
app.get("/news", async (req, res) => {
  try {
    const newsList = await News.find();
    res.json(newsList);
  } catch (error) {
    console.error("Lỗi lấy danh sách bài viết:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
});
//  API Lấy bài viết News theo slug
app.get("/news/:slug", async (req, res) => {
  try {
    const news = await News.findOne({ slug: req.params.slug });
    if (!news) {
      return res.status(404).json({ error: "Không tìm thấy bài viết" });
    }
    res.json(news);
  } catch (error) {
    console.error(" Lỗi lấy bài viết:", error);
    res.status(500).json({ error: "Lỗi server", details: error.message });
  }
});
//  API Cập nhật bài viết theo slug
app.put("/news/:slug", async (req, res) => {
  try {
    const { title, description, image, content } = req.body;
    let news = await News.findOne({ slug: req.params.slug });
    if (!news) {
      return res.status(404).json({ error: "Không tìm thấy bài viết" });
    }

    let newSlug = news.slug;
    if (title && title !== news.title) {
      newSlug = slugify(title, { lower: true, strict: true });
    }

    news = await News.findOneAndUpdate(
      { slug: req.params.slug },
      { title, slug: newSlug, description, image, content },
      { new: true }
    );

    res.json({ message: "Cập nhật bài viết thành công", news });
  } catch (error) {
    console.error(" Lỗi khi cập nhật bài viết:", error);
    res.status(500).json({ error: "Lỗi server", details: error.message });
  }
});
//  API Xóa bài viết theo slug
app.delete("/news/:slug", async (req, res) => {
  try {
    const news = await News.findOneAndDelete({ slug: req.params.slug });

    if (!news) {
      return res.status(404).json({ error: "Không tìm thấy bài viết" });
    }

    res.json({ message: "Đã xóa bài viết thành công" });
  } catch (error) {
    console.error(" Lỗi khi xóa bài viết:", error);
    res.status(500).json({ error: "Lỗi server", details: error.message });
  }
});
// 📌 Thêm danh mục mới
app.post("/categories", async (req, res) => {
  const { name, services } = req.body;
  if (!name || !services) {
    return res.status(400).json({ error: "Thiếu thông tin bắt buộc" });
  }

  try {
    const slug = slugify(name, { lower: true, strict: true });
    const newCategory = new CategoryServices({ name, slug, services });
    await newCategory.save();
    res
      .status(201)
      .json({ message: "Thêm danh mục thành công", category: newCategory });
  } catch (error) {
    res.status(500).json({ error: "Lỗi server", details: error.message });
  }
});
//  Lấy danh sách danh mục
app.get("/categories", async (req, res) => {
  try {
    const categories = await CategoryServices.find();
    res.json(categories);
  } catch (error) {
    console.error(" Lỗi lấy danh sách danh mục:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
});
//Lay thong tin bai viet theo service
app.get("/posts/:serviceSlug", async (req, res) => {
  try {
    const { serviceSlug } = req.params;

    // 🔹 Lấy danh mục có chứa serviceSlug
    const category = await CategoryServices.findOne({
      "services.slug": serviceSlug,
    });

    if (!category) {
      return res.status(404).json({ error: "Dịch vụ không tồn tại" });
    }

    // 🔹 Lấy tên dịch vụ từ category
    const serviceData = category.services.find((s) => s.slug === serviceSlug);

    // 🔹 Lấy danh sách bài viết thuộc dịch vụ này
    const posts = await PostServices.find({
      service_slug: serviceSlug,
    }).populate("category_id", "name slug");

    res.json({
      service: {
        name: serviceData?.name || "Không xác định",
        slug: serviceSlug,
      },
      posts: posts || [], // Trả về mảng rỗng nếu không có bài viết
    });
  } catch (error) {
    console.error(" Lỗi lấy danh sách bài viết theo dịch vụ:", error);
    res.status(500).json({ error: "Lỗi server", details: error.message });
  }
});
//Lay thong tin bai viet thuoc danh muc do
app.get("/services/:categorySlug", async (req, res) => {
  try {
    const { categorySlug } = req.params;

    // 🔹 Tìm danh mục theo slug
    const category = await CategoryServices.findOne({ slug: categorySlug });

    if (!category) {
      return res.status(404).json({ error: "Không tìm thấy danh mục" });
    }

    // 🔹 Trả về danh sách dịch vụ thuộc danh mục này
    res.json({
      category: {
        _id: category._id,
        name: category.name,
        slug: category.slug,
      },
      services: category.services, // Trả về danh sách services từ CategoryServices
    });
  } catch (error) {
    console.error(" Lỗi lấy danh sách dịch vụ:", error);
    res.status(500).json({ error: "Lỗi server", details: error.message });
  }
});
//  Lấy chi tiết một bài viết theo slug
app.get("/service/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    // 🔹 Tìm bài viết theo `slug` và populate thông tin danh mục
    const service = await PostServices.findOne({ slug }).populate(
      "category_id",
      "name slug"
    );

    if (!service) {
      return res.status(404).json({ error: "Không tìm thấy bài viết" });
    }

    res.json(service);
  } catch (error) {
    console.error(" Lỗi lấy bài viết:", error);
    res.status(500).json({ error: "Lỗi server", details: error.message });
  }
});
//  Thêm bài viết mới theo dịch vụ trong danh mục
app.post("/posts", upload.single("image"), async (req, res) => {
  try {
    const { service_slug, title, description, content } = req.body;
    const image = req.file
      ? `http://localhost:8000/uploads/${req.file.filename}`
      : null;

    if (!service_slug || !title || !description || !content) {
      return res.status(400).json({ error: "Thiếu thông tin bài viết" });
    }

    // 🔹 Tìm danh mục chứa dịch vụ
    const category = await CategoryServices.findOne({
      "services.slug": service_slug,
    });
    if (!category) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy danh mục chứa dịch vụ này" });
    }

    const category_id = category._id;
    const slug = slugify(title, { lower: true, strict: true });

    // 🔹 Kiểm tra bài viết trùng tiêu đề
    const existingPost = await PostServices.findOne({ slug });
    if (existingPost) {
      return res
        .status(400)
        .json({ error: "Bài viết với tiêu đề này đã tồn tại" });
    }

    // 🔹 Tạo bài viết mới
    const newPost = new PostServices({
      category_id,
      service_slug,
      title,
      slug,
      image,
      description,
      content,
    });

    await newPost.save();
    res
      .status(201)
      .json({ message: "Thêm bài viết thành công", post: newPost });
  } catch (error) {
    console.error(" Lỗi thêm bài viết:", error);
    res.status(500).json({ error: "Lỗi server", details: error.message });
  }
});

//  Cập nhật bài viết
app.put("/posts/:slug", upload.single("image"), async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, description, content } = req.body;
    let post = await PostServices.findOne({ slug });

    if (!post) {
      return res.status(404).json({ error: "Không tìm thấy bài viết" });
    }

    let newSlug = post.slug;
    if (title && title !== post.title) {
      newSlug = slugify(title, { lower: true, strict: true });
    }

    const image = req.file
      ? `http://localhost:8000/uploads/${req.file.filename}`
      : post.image;

    post = await PostServices.findOneAndUpdate(
      { slug },
      { title, slug: newSlug, description, content, image },
      { new: true }
    );

    res.json({ message: "Cập nhật bài viết thành công", post });
  } catch (error) {
    console.error(" Lỗi cập nhật bài viết:", error);
    res.status(500).json({ error: "Lỗi server", details: error.message });
  }
});

//  Xóa bài viết
app.delete("/posts/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    await PostServices.findOneAndDelete({ slug });
    res.json({ message: "Xóa bài viết thành công" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi server", details: error.message });
  }
});
//  Thêm dịch vụ vào danh mục
app.post("/categories/:categoryId/services", async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;
    const slug = slugify(name, { lower: true, strict: true });

    const category = await CategoryServices.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Không tìm thấy danh mục" });
    }

    category.services.push({ name, slug });
    await category.save();
    res.json({ message: "Thêm dịch vụ thành công", category });
  } catch (error) {
    res.status(500).json({ error: "Lỗi server", details: error.message });
  }
});

//  Cập nhật dịch vụ
app.put("/categories/:categoryId/services/:serviceSlug", async (req, res) => {
  try {
    const { categoryId, serviceSlug } = req.params;
    const { name } = req.body;

    const category = await CategoryServices.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Không tìm thấy danh mục" });
    }

    const service = category.services.find((s) => s.slug === serviceSlug);
    if (!service) {
      return res.status(404).json({ error: "Không tìm thấy dịch vụ" });
    }

    service.name = name;
    service.slug = slugify(name, { lower: true, strict: true });
    await category.save();
    res.json({ message: "Cập nhật dịch vụ thành công", category });
  } catch (error) {
    res.status(500).json({ error: "Lỗi server", details: error.message });
  }
});

//  Xóa dịch vụ
app.delete(
  "/categories/:categoryId/services/:serviceSlug",
  async (req, res) => {
    try {
      const { categoryId, serviceSlug } = req.params;
      const category = await CategoryServices.findById(categoryId);

      if (!category) {
        return res.status(404).json({ error: "Không tìm thấy danh mục" });
      }

      category.services = category.services.filter(
        (s) => s.slug !== serviceSlug
      );
      await category.save();
      res.json({ message: "Xóa dịch vụ thành công" });
    } catch (error) {
      res.status(500).json({ error: "Lỗi server", details: error.message });
    }
  }
);

app.get("/categories/:categorySlug/posts", async (req, res) => {
  try {
    const { categorySlug } = req.params;

    // 🔹 Tìm danh mục theo slug
    const category = await CategoryServices.findOne({ slug: categorySlug });

    if (!category) {
      return res.status(404).json({ error: "Không tìm thấy danh mục" });
    }

    // 🔹 Lấy tất cả bài viết thuộc danh mục đó
    const posts = await PostServices.find({ category_id: category._id })
      .populate("category_id", "name slug") // Populate danh mục để lấy thông tin
      .select("-content"); // Không trả về nội dung đầy đủ

    res.json({
      category: {
        _id: category._id,
        name: category.name,
        slug: category.slug,
      },
      posts,
    });
  } catch (error) {
    console.error(" Lỗi lấy danh sách bài viết theo danh mục:", error);
    res.status(500).json({ error: "Lỗi server", details: error.message });
  }
});

//serve static files from the uploads and assets directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

module.exports = app;
