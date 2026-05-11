import * as Brevo from "@getbrevo/brevo";

export const sendOtpMail = async (otp, email) => {
  // Access TransactionalEmailsApi through the namespace
  const apiInstance = new Brevo.TransactionalEmailsApi();

  // Configure API Key
  apiInstance.setApiKey(
    Brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_PASS,
  );

  const sendSmtpEmail = new Brevo.SendSmtpEmail();

  sendSmtpEmail.subject = "Your EcoFriendly OTP Code";
  sendSmtpEmail.htmlContent = `<html><body><h1>Your OTP is ${otp}</h1></body></html>`;
  sendSmtpEmail.sender = {
    name: "EcoFriendly Support",
    email: process.env.BREVO_USER,
  };
  sendSmtpEmail.to = [{ email: email }];

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("OTP Sent via API. ID:", data.body.messageId);
    return true;
  } catch (error) {
    console.error("Brevo API Error:", error.message);
    return false;
  }
};
