import { sendMail } from "./mailer.js";

export const verifyEmail = async (token, email) => {
  const info = await sendMail({
    to: email,
    subject: "Verify Your EcoFriendly Account",
    text: `Hi! There,

Please click the link below to verify your email address:
${process.env.FRONTEND_URL}/verify/${token}

The EcoFriendly Team`,
  });

  return info;
};
