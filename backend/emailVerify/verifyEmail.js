import * as Brevo from "@getbrevo/brevo";

export const verifyEmail = async (token, email) => {
  // 1. Initialize the API Client
  let defaultClient = Brevo.ApiClient.instance;

  // 2. Configure API Key
  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = process.env.BREVO_PASS;

  // 3. Create the Transactional Email Instance
  const apiInstance = new Brevo.TransactionalEmailsApi();

  // 4. Set up the email content
  const sendSmtpEmail = new Brevo.SendSmtpEmail();
  sendSmtpEmail.subject = "Verify Your EcoFriendly Account";
  sendSmtpEmail.htmlContent = `<html><body><h1>Welcome!</h1><a href="${process.env.FRONTEND_URL}/verify/${token}">Click here to verify your account</a></body></html>`;
  sendSmtpEmail.sender = {
    name: "EcoFriendly Support",
    email: process.env.BREVO_USER,
  };
  sendSmtpEmail.to = [{ email: email }];

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Brevo API success:", data.body);
    return true;
  } catch (error) {
    console.error("Brevo API Error:", error.message);
    return false;
  }
};
