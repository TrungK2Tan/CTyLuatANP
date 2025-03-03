const mongoose = require("mongoose");

const postServicesSchema = new mongoose.Schema({
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "CategoryServices", required: true },
  service_slug: { type: String, required: true }, // Gắn bài viết với một dịch vụ cụ thể
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  image: String,
  description: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PostServices", postServicesSchema);
