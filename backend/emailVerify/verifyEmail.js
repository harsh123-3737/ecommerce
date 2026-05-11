import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const verifyEmail = async (token, email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    family: 4, // IMPORTANT
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailConfigurations = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Verify Your EcoFriendly Account",
    text: `Hi! There,

Please click the link below to verify your email address:
${process.env.FRONTEND_URL}/verify/${token}

The EcoFriendly Team`,
  };

  try {
    const info = await transporter.sendMail(mailConfigurations);
    console.log("Verification Email Sent:", info.response);
  } catch (error) {
    console.error("Gmail Service Error:", error);
  }
};
