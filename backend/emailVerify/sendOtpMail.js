import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendOtpMail = async (otp, email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: "resend", // Must stay as the string "resend"
      pass: process.env.RESEND_API_KEY,
    },
  });

  const mailConfigurations = {
    // CRITICAL: Resend requires this specific 'from' address for free accounts
    from: "EcoFriendly Support <onboarding@resend.dev>",
    to: email,
    subject: "Reset Your Password - EcoFriendly",
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
        <h2 style="color: #10b981; text-align: center;">EcoFriendly Security</h2>
        <p>Hello,</p>
        <p>You requested a password reset. Please use the following One-Time Password (OTP) to proceed. This code is valid for 10 minutes.</p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #1f2937; background: #f3f4f6; padding: 10px 20px; border-radius: 5px;">
            ${otp}
          </span>
        </div>
        <p style="font-size: 12px; color: #6b7280; text-align: center;">
          If you did not request this, please ignore this email or contact support.
        </p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailConfigurations);
    console.log("OTP Sent Successfully via Resend: " + info.messageId);
    return true;
  } catch (error) {
    // If this fails, check if 'email' is the same as your Resend signup email
    console.error("Resend OTP Error:", error.message);
    return false;
  }
};
