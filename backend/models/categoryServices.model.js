const mongoose = require("mongoose");

const categoryServicesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  services: [
    {
      name: String,
      slug: String,
    },
  ],
});

module.exports = mongoose.model("CategoryServices", categoryServicesSchema);
