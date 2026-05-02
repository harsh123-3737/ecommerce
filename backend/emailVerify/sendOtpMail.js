import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
// 1. Use explicit host and port instead of 'service'
export const sendOtpMail = async (otp, email) => {
  const transporter = nodemailer.createTransport({
    // 1. Use the direct IPv4 for Google's SMTP instead of the hostname
    host: "74.125.142.108",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    // 2. THIS IS THE KEY: Force IPv4 and provide the server name for TLS
    family: 4,
    tls: {
      rejectUnauthorized: false,
      servername: "smtp.gmail.com", // Required when using a direct IP
    },
    connectionTimeout: 20000,
  });

  const mailConfigurations = {
    from: `"EcoFriendly" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    html: `<b>${otp}</b> is your verification code.`,
  };

  try {
    await transporter.sendMail(mailConfigurations);
    console.log("OTP Sent via IPv4 Direct!");
  } catch (error) {
    console.error("Final Debug Error:", error.message);
  }
};
