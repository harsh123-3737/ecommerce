import { sendMail } from "./mailer.js";

export const sendOtpMail = async (otp, email) => {
  const info = await sendMail({
    to: email,
    subject: "OTP Verification",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Password Reset OTP</h2>
        <p>Your OTP for password reset is:</p>
        <h1 style="color: green;">${otp}</h1>
        <p>This OTP will expire soon.</p>
      </div>
    `,
  });

  return info;
};
