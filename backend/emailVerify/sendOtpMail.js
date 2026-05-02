import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

// Initialize Resend with your API Key
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpMail = async (otp, email) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "EcoFriendly Support <onboarding@resend.dev>",
      to: email, // Remember: On free tier, this must be your own email!
      subject: "Your OTP Code - EcoFriendly",
      html: `<strong>Your verification code is: ${otp}</strong>`,
    });

    if (error) {
      console.error("Resend API Error:", error.message);
      return false;
    }

    console.log("Email sent successfully via API:", data.id);
    return true;
  } catch (err) {
    console.error("Critical Resend Failure:", err.message);
    return false;
  }
};
