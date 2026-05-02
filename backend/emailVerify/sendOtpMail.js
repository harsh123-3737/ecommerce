import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
// 1. Use explicit host and port instead of 'service'
export const sendOtpMail = async (otp, email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 2525, // Change from 587 to 2525
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    family: 4,
    connectionTimeout: 30000, // Increase to 30s
    greetingTimeout: 30000,
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailConfigurations = {
    from: `"EcoFriendly Support" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Password Reset OTP",
    // Using HTML for a better look in your PPT demo
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
        <h2 style="color: #2d5a27;">Password Reset Request</h2>
        <p>Your OTP for resetting your password is:</p>
        <h1 style="color: #e91e63; letter-spacing: 5px;">${otp}</h1>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
  };

  try {
    // 2. Use await instead of callback to prevent hanging
    const info = await transporter.sendMail(mailConfigurations);
    console.log("OTP Sent Successfully: " + info.response);
    return true;
  } catch (error) {
    // 3. Log the error instead of throwing to keep the server alive
    console.error("Nodemailer OTP Error:", error.message);
    return false;
  }
};
