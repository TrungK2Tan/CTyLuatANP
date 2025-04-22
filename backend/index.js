require("dotenv").config();
const fs = require("fs"); // ✅ Import file system để xử lý file tạm thời
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
const { upload, uploadImage, uploadFile } = require("./multer");
const CategoryServices = require("./models/categoryServices.model");
const PostServices = require("./models/postServices.model");
const User = require("./models/user.model");
const Form = require("./models/form.model");
const News = require("./models/news.model");
const { authenticateToken } = require("./utilities");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { sendContactEmail } = require("./sendmail");
const PORT = process.env.PORT || 8000;
// ✅ Sử dụng biến môi trường thay vì config.json
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("❌ MONGO_URI is not defined in .env");
  process.exit(1); // Dừng server nếu không có URI
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const toSlug = (title) => {
  return title
    .toLowerCase()
    .normalize("NFD") // Loại bỏ dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d") // Thay thế ký tự đ
    .replace(/[^a-z0-9\s]/g, "") // Loại bỏ ký tự đặc biệt
    .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu "-"
    .trim();
};
//cau hinh cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
app.post("/api/send-email", sendContactEmail);
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

  if (!title || !description || !content || !fileUrl || !image) {
    return res.status(400).json({ error: "Thiếu thông tin bắt buộc" });
  }

  try {
    const slug = toSlug(title);

    const newForm = new Form({
      title,
      slug,
      description,
      image,
      content,
      fileUrl,
    });

    await newForm.save();
    res.status(201).json({ message: "Thêm biểu mẫu thành công", form: newForm });
  } catch (error) {
    console.error("Lỗi khi tạo biểu mẫu:", error);
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
      const { slug } = req.params;
      const { title, description, content } = req.body;

      console.log("🔍 File upload:", req.files);

      const form = await Form.findOne({ slug });
      if (!form) return res.status(404).json({ message: "Không tìm thấy biểu mẫu" });

      let imageUrl = form.image;
      let fileUrl = form.fileUrl;

      // ✅ Upload ảnh lên Cloudinary từ đường dẫn file tạm thời
      if (req.files?.["image"]) {
        const imagePath = req.files["image"][0].path;
        const uploadResult = await cloudinary.uploader.upload(imagePath);
        imageUrl = uploadResult.secure_url;
        fs.unlinkSync(imagePath); // Xóa file tạm
      }

      // ✅ Upload file tài liệu lên Cloudinary từ đường dẫn file tạm thời
      if (req.files?.["file"]) {
        const filePath = req.files["file"][0].path;
        const uploadResult = await cloudinary.uploader.upload(filePath, {
          resource_type: "raw",
        });
        fileUrl = uploadResult.secure_url;
        fs.unlinkSync(filePath); // Xóa file tạm
      }

      form.title = title || form.title;
      form.description = description || form.description;
      form.content = content || form.content;
      form.image = imageUrl;
      form.fileUrl = fileUrl;

      await form.save();

      console.log("✅ Sau cập nhật:", form.image, form.fileUrl);
      res.json({ message: "Cập nhật thành công", form });
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật biểu mẫu:", error);
      res.status(500).json({ message: "Lỗi server", details: error.message });
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
app.post("/upload/image", uploadImage.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Không có ảnh được tải lên" });

  const fileUrl = req.file.path; // ✅ Link ảnh trên Cloudinary
  res.json({ fileUrl });
});

app.post("/upload/file", uploadFile.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Không có file được tải lên" });

  const fileUrl = req.file.path; // ✅ Link file trên Cloudinary
  res.json({ fileUrl });
});


//Tao bai viet
app.post("/news", uploadImage.single("image"), async (req, res) => {
  try {
    const { title, description, content } = req.body;
    if (!title || !description || !content) {
      return res.status(400).json({ error: "Thiếu thông tin bài viết" });
    }

    const slug = toSlug(title);
    let imageUrl = "";

    // Nếu có file ảnh thì upload lên Cloudinary
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "news", // Tạo thư mục lưu trữ trên Cloudinary
      });
      imageUrl = uploadResult.secure_url; // Lấy URL ảnh từ Cloudinary
    }

    const newNews = new News({
      title,
      slug,
      description,
      image: imageUrl,
      content,
    });

    await newNews.save();
    res.status(201).json({ message: "Thêm bài viết thành công", news: newNews });
  } catch (error) {
    console.error("❌ Lỗi khi tạo bài viết:", error);
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
    const { slug } = req.params;
    const newsItem = await News.findOne({ slug });

    if (!newsItem) {
      return res.status(404).json({ error: "Không tìm thấy bài viết" });
    }

    res.json(newsItem);
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết tin tức:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
});

//  API Cập nhật bài viết theo slug
app.put("/news/:slug", uploadImage.single("image"), async (req, res) => {
  try {
    const { title, description, content } = req.body;
    let news = await News.findOne({ slug: req.params.slug });

    if (!news) {
      return res.status(404).json({ error: "Không tìm thấy bài viết" });
    }

    let newSlug = news.slug;
    if (title && title !== news.title) {
      newSlug = toSlug(title);
    }

    let imageUrl = news.image;

    // Nếu có file ảnh mới, upload lên Cloudinary và xóa ảnh cũ
    if (req.file) {
      // Xóa ảnh cũ trên Cloudinary nếu có
      if (news.image) {
        const publicId = news.image.split("/").pop().split(".")[0]; // Lấy public_id từ URL
        await cloudinary.uploader.destroy(`news/${publicId}`);
      }

      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "news",
      });
      imageUrl = uploadResult.secure_url;
    }

    news = await News.findOneAndUpdate(
      { slug: req.params.slug },
      { title, slug: newSlug, description, image: imageUrl, content },
      { new: true }
    );

    res.json({ message: "Cập nhật bài viết thành công", news });
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật bài viết:", error);
    res.status(500).json({ error: "Lỗi server", details: error.message });
  }
});

//  API Xóa bài viết theo slug
app.delete("/news/:slug", async (req, res) => {
  try {
    const news = await News.findOne({ slug: req.params.slug });
    if (!news) {
      return res.status(404).json({ error: "Không tìm thấy bài viết" });
    }

    // Xóa ảnh trên Cloudinary nếu có
    if (news.image) {
      const publicId = news.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`news/${publicId}`);
    }

    await News.deleteOne({ slug: req.params.slug });
    res.json({ message: "Xóa bài viết thành công" });
  } catch (error) {
    console.error("❌ Lỗi khi xóa bài viết:", error);
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
    const slug = toSlug(name); // Sửa "title" thành "name"
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

// API Lấy chi tiết bài viết theo slug
app.get("/posts/detail/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    
    // 🔹 Tìm bài viết theo slug và populate thông tin danh mục và dịch vụ
    const post = await PostServices.findOne({ slug }).populate(
      "category_id",
      "name slug"
    );

    if (!post) {
      return res.status(404).json({ error: "Không tìm thấy bài viết" });
    }

    // 🔹 Nếu có service_slug, tìm thông tin dịch vụ
    if (post.service_slug) {
      const category = await CategoryServices.findOne({
        "services.slug": post.service_slug
      });
      
      if (category) {
        const service = category.services.find(s => s.slug === post.service_slug);
        if (service) {
          // Thêm thông tin dịch vụ vào kết quả trả về
          post._doc.service = {
            name: service.name,
            slug: service.slug
          };
        }
      }
    }

    res.json(post);
  } catch (error) {
    console.error("❌ Lỗi lấy chi tiết bài viết:", error);
    res.status(500).json({ error: "Lỗi server", details: error.message });
  }
});
//-------------------------------------------------------------------------
//  Thêm bài viết mới theo dịch vụ trong danh mục
app.post("/posts", uploadImage.single("image"), async (req, res) => {
  try {
    const { service_slug, title, description, content } = req.body;

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
    const slug = toSlug(title);

    // 🔹 Kiểm tra bài viết trùng tiêu đề
    const existingPost = await PostServices.findOne({ slug });
    if (existingPost) {
      return res
        .status(400)
        .json({ error: "Bài viết với tiêu đề này đã tồn tại" });
    }

    let imageUrl = null;

    // 🔹 Upload ảnh lên Cloudinary (Lưu vào thư mục `baiviet`)
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "baiviet", // 🟢 Thay đổi thành "baiviet"
      });
      imageUrl = uploadResult.secure_url;
    }

    // 🔹 Tạo bài viết mới
    const newPost = new PostServices({
      category_id,
      service_slug,
      title,
      slug,
      image: imageUrl,
      description,
      content,
    });

    await newPost.save();
    res.status(201).json({ message: "Thêm bài viết thành công", post: newPost });
  } catch (error) {
    console.error("❌ Lỗi thêm bài viết:", error);
    res.status(500).json({ error: "Lỗi server", details: error.message });
  }
});
//-------------------------------------------------------------------------
//  Cập nhật bài viết
app.put("/posts/:slug", uploadImage.single("image"), async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, description, content, serviceId } = req.body;
    let post = await PostServices.findOne({ slug });

    if (!post) {
      return res.status(404).json({ error: "Không tìm thấy bài viết" });
    }

    let newSlug = post.slug;
    if (title && title !== post.title) {
      newSlug = toSlug(title);
    }

    let imageUrl = post.image;
    let service_slug = post.service_slug;
    let category_id = post.category_id;

    // Nếu có serviceId mới, cập nhật service_slug và category_id
    if (serviceId) {
      // Tìm danh mục chứa dịch vụ
      const allCategories = await CategoryServices.find();
      let foundService = null;
      let foundCategory = null;

      // Tìm trong tất cả danh mục
      for (const category of allCategories) {
        const service = category.services.find(s => s._id.toString() === serviceId);
        if (service) {
          foundService = service;
          foundCategory = category;
          break;
        }
      }

      if (!foundService || !foundCategory) {
        return res.status(404).json({ error: "Không tìm thấy dịch vụ" });
      }

      service_slug = foundService.slug;
      category_id = foundCategory._id;
    }

    // 🔹 Nếu có ảnh mới, upload lên Cloudinary (Lưu vào `baiviet`) và xóa ảnh cũ
    if (req.file) {
      if (post.image) {
        try {
          const publicId = post.image.split("/").slice(-1)[0].split(".")[0];
          await cloudinary.uploader.destroy(`baiviet/${publicId}`); // 🟢 Xóa ảnh cũ trong "baiviet"
        } catch (err) {
          console.error("❌ Lỗi xóa ảnh cũ trên Cloudinary:", err);
        }
      }

      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "baiviet", // 🟢 Upload vào thư mục "baiviet"
      });
      imageUrl = uploadResult.secure_url;
    }

    post = await PostServices.findOneAndUpdate(
      { slug },
      { 
        title, 
        slug: newSlug, 
        description, 
        content, 
        image: imageUrl,
        service_slug,
        category_id 
      },
      { new: true }
    );

    // Thêm thông tin dịch vụ vào kết quả trả về
    if (post.service_slug) {
      const category = await CategoryServices.findById(post.category_id);
      if (category) {
        const service = category.services.find(s => s.slug === post.service_slug);
        if (service) {
          post._doc.service = {
            name: service.name,
            slug: service.slug
          };
        }
      }
    }

    res.json({ message: "Cập nhật bài viết thành công", post });
  } catch (error) {
    console.error("❌ Lỗi cập nhật bài viết:", error);
    res.status(500).json({ error: "Lỗi server", details: error.message });
  }
});
//-------------------------------------------------------------------------
// API Lấy tất cả dịch vụ từ tất cả danh mục
app.get("/services", async (req, res) => {
  try {
    const categories = await CategoryServices.find();
    
    // Tạo danh sách dịch vụ từ tất cả danh mục
    const services = [];
    
    categories.forEach(category => {
      category.services.forEach(service => {
        services.push({
          _id: service._id,
          name: service.name,
          slug: service.slug,
          categoryId: category._id,
          categoryName: category.name
        });
      });
    });
    
    res.json(services);
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh sách dịch vụ:", error);
    res.status(500).json({ error: "Lỗi server", details: error.message });
  }
});
//  Xóa bài viết
app.delete("/posts/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await PostServices.findOne({ slug });

    if (!post) {
      return res.status(404).json({ error: "Không tìm thấy bài viết" });
    }

    // 🔹 Xóa ảnh trên Cloudinary nếu có
    if (post.image) {
      try {
        const publicId = post.image.split("/").slice(-1)[0].split(".")[0];
        await cloudinary.uploader.destroy(`baiviet/${publicId}`); // 🟢 Xóa ảnh từ "baiviet"
      } catch (err) {
        console.error("❌ Lỗi xóa ảnh trên Cloudinary:", err);
      }
    }

    await PostServices.findOneAndDelete({ slug });
    res.json({ message: "Xóa bài viết thành công" });
  } catch (error) {
    console.error("❌ Lỗi xóa bài viết:", error);
    res.status(500).json({ error: "Lỗi server", details: error.message });
  }
});
//  Thêm dịch vụ vào danh mục
app.post("/categories/:categoryId/services", async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;
    const slug = toSlug(name);

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
    service.slug = toSlug(name)
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
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

module.exports = app;
