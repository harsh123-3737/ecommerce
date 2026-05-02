import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendOtpMail = async (otp, email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 2525, // Try 2525 instead of 587
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    family: 4,
    connectionTimeout: 20000,
  });
  const mailConfigurations = {
    from: `"EcoFriendly Support" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "OTP Verification",
    html: `<p>Your OTP for password reset is <b>${otp}</b></p>`,
  };

  // 3. Use Try/Catch instead of Throw for a stable server
  try {
    const info = await transporter.sendMail(mailConfigurations);
    console.log("OTP Sent Successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("Nodemailer Fix Attempt Failed:", error.message);
    return false;
  }
};
