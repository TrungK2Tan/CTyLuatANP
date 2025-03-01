const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: false }, // Số điện thoại
    dob: { type: Date, required: false }, // Ngày sinh
    gender: { type: String, enum: ["Male", "Female", "Other"], required: false }, // Giới tính
    createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
