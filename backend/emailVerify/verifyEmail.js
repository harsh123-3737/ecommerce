import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const verifyEmail = async (token, email) => {
  // Added async
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 10000,
  });

  const mailConfigurations = {
    from: `"EcoFriendly Support" <${process.env.MAIL_USER}>`, // Fixed: added backticks and quotes
    to: email,
    subject: "Verify Your EcoFriendly Account",
    text: `Hi! There, 
    Please click the link below to verify your email address:
    ${process.env.FRONTEND_URL}/verify/${token}`, // Ensure FRONTEND_URL is correct in .env
  };

  try {
    await transporter.sendMail(mailConfigurations);
    console.log("Verification Email Sent Successfully");
  } catch (error) {
    console.error("Nodemailer Error:", error.message);
  }
};
