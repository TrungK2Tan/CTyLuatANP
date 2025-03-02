const mongoose = require("mongoose");
const slugify = require("slugify");

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Tạo slug trước khi lưu vào database
NewsSchema.pre("save", function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("News", NewsSchema);
