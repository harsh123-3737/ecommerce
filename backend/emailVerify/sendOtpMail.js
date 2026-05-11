import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendOtpMail = async (otp, email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // TLS
    auth: {
      user: process.env.BREVO_USER, // Your Brevo login email
      pass: process.env.BREVO_PASS, // Your Brevo SMTP Key
    },
  });

  const mailConfigurations = {
    from: `"EcoFriendly Support" <${process.env.BREVO_USER}>`,
    to: email,
    subject: "OTP Verification",
    html: `
      <div style="font-family: sans-serif; text-align: center;">
        <h2>Password Reset OTP</h2>
        <p>Use the code below to reset your password. It is valid for 10 minutes.</p>
        <h1 style="color: #10b981; letter-spacing: 5px;">${otp}</h1>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailConfigurations);
    console.log("OTP Sent Successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("Brevo OTP Error:", error.message);
    return false;
  }
};