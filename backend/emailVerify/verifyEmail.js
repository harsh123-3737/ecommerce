import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const verifyEmail = (token, email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Must be false for port 587
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS, // Ensure this is a 16-character App Password
    },
    tls: {
      rejectUnauthorized: false, // Prevents "Self-signed certificate" blocks on cloud servers
    },
    connectionTimeout: 10000, // Wait 10s before timing out
  });

  const mailConfigurations = {
    from: `"EcoFriendly Support" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Verify Your EcoFriendly Account",
    text: `Hi! There, 
    
    Thank you for joining our eco-friendly community! 
    Please click the link below to verify your email address:
    
    ${process.env.FRONTEND_URL}/verify/${token}
    
    If you did not request this, please ignore this email.
    
    Thanks,
    The EcoFriendly Team`,
  };

  // Using a promise-based approach is cleaner for modern Node.js
  transporter.sendMail(mailConfigurations, (error, info) => {
    if (error) {
      console.error("Nodemailer Error:", error.message);
      return;
    }
    console.log("Verification Email Sent: " + info.response);
  });
};