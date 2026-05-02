import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
// 1. Use explicit host and port instead of 'service'
export const sendOtpMail = async (otp, email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    // 1. Force IPv4 to prevent ENETUNREACH
    family: 4,
    // 2. Increase timeouts significantly for Render's slow cold-starts
    connectionTimeout: 20000, // 20 seconds
    greetingTimeout: 20000,
    socketTimeout: 20000,
    // 3. Prevent SSL certificate issues on cloud clusters
    tls: {
      rejectUnauthorized: false,
      minVersion: "TLSv1.2",
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
