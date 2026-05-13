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

export const verifyEmail = async (token, email) => {
  const transporter = createGmailTransporter();

  const mailConfigurations = {
    from: `"EcoFriendly" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Verify Your EcoFriendly Account",
    text: `Hi! There,

Please click the link below to verify your email address:
${process.env.FRONTEND_URL}/verify/${token}

The EcoFriendly Team`,
  };

  const info = await transporter.sendMail(mailConfigurations);
  console.log("Verification Email Sent:", info.response);
  return info;
};
