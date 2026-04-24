import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const verifyEmail = (token, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailConfigurations = {
    from: process.env.MAIL_USER,

    to: email,

    // Subject of Email
    subject: "Email Verification",

    // This would be the text of email body
    text: `Hi! There, You have recently visited 
           our website and entered your email.
           Please follow the given link to verify your email
            ${process.env.FRONTEND_URL}/verify/${token} 
           Thanks`,
    html: `
    <p>Hi! There, You have recently visited our website and entered your email.</p>
    <p>Please click the link below to verify your email:</p>
    <a href="${process.env.FRONTEND_URL}/verify/${token}" style="color:blue; text-decoration:underline;">
      Verify Email
    </a>
    <p>Thanks</p>
    `,
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) throw Error(error);
    console.log("Email Sent Successfully");
    console.log(info);
  });
};
