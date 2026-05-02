import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendOtpMail = (otp, email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 10000,
  });
  const mailConfigurations = {
    from: `"EcoFriendly Support" <${process.env.MAIL_USER}>`, // Fixed: added backticks and quotes
    to: email,
    // Subject of Email
    subject: "Email Verification",
    // This would be the text of email body
    html: `<p>Your Otp for Password reset is <b>${otp}</b></p>`,
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) throw Error(error);
    console.log("OTP Sent Successfully");
    console.log(info);
  });
};
