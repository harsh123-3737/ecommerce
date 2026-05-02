import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const verifyEmail = async (token, email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 465,
    secure: true,
    auth: {
      user: "resend",
      pass: process.env.RESEND_API_KEY,
    },
  });

  const mailConfigurations = {
    // IMPORTANT: Resend requires 'onboarding@resend.dev' for free accounts
    from: "EcoFriendly Support <onboarding@resend.dev>",
    to: email,
    subject: "Verify Your EcoFriendly Account",
    html: `
      <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
        <h2>Welcome to EcoFriendly!</h2>
        <p>Please click the button below to verify your email address and start shopping sustainably.</p>
        <a href="${process.env.FRONTEND_URL}/verify/${token}" 
           style="background-color: #10b981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
           Verify Email
        </a>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailConfigurations);
    console.log("Verification Email Sent Successfully via Resend");
  } catch (error) {
    // If you see "Forbidden" error, it's because the 'from' address isn't onboarding@resend.dev
    console.error("Resend Error:", error.message);
  }
};
