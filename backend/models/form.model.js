const mongoose = require("mongoose");
const slugify = require("slugify");

const FormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true }, // Slug thay vì ID
  description: { type: String, required: true },
  image: { type: String, required: true },
  content: { type: String, required: true },
  fileUrl: { type: String, required: true }
});

// Tạo slug trước khi lưu vào database
FormSchema.pre("save", function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Form", FormSchema);
