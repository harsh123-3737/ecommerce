import * as SibApiV3Sdk from "@getbrevo/brevo";

export const verifyEmail = async (token, email) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  apiInstance.setApiKey(
    SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_PASS,
  );

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = "Verify Your Account";
  sendSmtpEmail.htmlContent = `<html><body><a href="${process.env.FRONTEND_URL}/verify/${token}">Click here to verify</a></body></html>`;
  sendSmtpEmail.sender = {
    name: "EcoFriendly Support",
    email: process.env.BREVO_USER,
  };
  sendSmtpEmail.to = [{ email: email }];

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Verification email sent via API");
  } catch (error) {
    console.error("Brevo Verify API Error:", error.message);
  }
};
