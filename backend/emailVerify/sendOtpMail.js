import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendOtpMail = async (otp, email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    family: 4, // Force IPv4 (fixes ENETUNREACH)
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS, // Gmail App Password
    },
  });

  const mailConfigurations = {
    from: process.env.MAIL_USER,
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

  try {
    const info = await transporter.sendMail(mailConfigurations);

    console.log("OTP Sent Successfully:", info.response);

    return true;
  } catch (error) {
    console.error("Gmail Service Error:", error);

    return false;
  }
};
