const nodemailer = require("nodemailer");
require("dotenv").config();

exports.sendContactEmail = async (req, res) => {
  const { name, phone, email, message } = req.body;

  // Cấu hình email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Email công ty
      pass: process.env.EMAIL_PASS, // Mật khẩu ứng dụng (App Password)
    },
  });

  const mailOptions = {
    from: email,
    to: "congtyluatanp232hcm@gmail.com",
    subject: "Liên hệ từ website",
    html: `<h3>Họ tên: ${name}</h3>
    <p><strong>Điện thoại:</strong> ${phone}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Nội dung:</strong><br> ${message}</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email đã được gửi!" });
} catch (error) {
    console.error("Lỗi gửi email:", error); 
    res.status(500).json({ success: false, message: "Gửi email thất bại!", error: error.message });
}

};
