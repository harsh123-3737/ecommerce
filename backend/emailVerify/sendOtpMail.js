import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendOtpMail = async (otp, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Using the built-in Gmail service
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS, // Your 16-character Google App Password
    },
  });

  const mailConfigurations = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "OTP Verification",
    html: `<p>Your OTP for password reset is <b>${otp}</b></p>`,
  };

  try {
    const info = await transporter.sendMail(mailConfigurations);
    console.log("OTP Sent Successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("Gmail Service Error:", error.message);
    return false;
  }
};
