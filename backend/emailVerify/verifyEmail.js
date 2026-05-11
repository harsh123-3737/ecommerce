import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const verifyEmail = async (token, email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_USER,
      pass: process.env.BREVO_PASS,
    },
  });

  const mailConfigurations = {
    from: `"EcoFriendly Support" <${process.env.BREVO_USER}>`,
    to: email,
    subject: "Verify Your EcoFriendly Account",
    html: `
      <h2>Welcome!</h2>
      <p>Please click the link below to verify your account:</p>
      <a href="${process.env.FRONTEND_URL}/verify/${token}" 
         style="background: #10b981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
         Verify Email Address
      </a>
    `,
  };

  try {
    await transporter.sendMail(mailConfigurations);
    console.log("Verification Email Sent Successfully");
  } catch (error) {
    console.error("Brevo Verification Error:", error.message);
  }
};
