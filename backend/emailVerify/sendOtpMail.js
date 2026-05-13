import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const createGmailTransporter = () => {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    throw new Error("MAIL_USER and MAIL_PASS must be configured");
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    family: 4,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
};

export const sendOtpMail = async (otp, email) => {
  const transporter = createGmailTransporter();

  const mailConfigurations = {
    from: `"EcoFriendly" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "OTP Verification",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Password Reset OTP</h2>
        <p>Your OTP for password reset is:</p>
        <h1 style="color: green;">${otp}</h1>
        <p>This OTP will expire soon.</p>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailConfigurations);
  console.log("OTP Sent Successfully:", info.response);
  return info;
};
