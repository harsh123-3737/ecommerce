import * as Brevo from "@getbrevo/brevo";
export const verifyEmail = async (token, email) => {
  // Use the standard class-based initialization
  const apiInstance = new Brevo.TransactionalEmailsApi();

  // Configure the API Key directly on the instance's authenticator
  apiInstance.setApiKey(
    Brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_PASS,
  );

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
    console.log("Brevo API Success:", data.body);
    return true;
  } catch (error) {
    // This catches the error without crashing the server
    console.error(
      "Brevo API Error:",
      error.response ? error.response.text : error.message,
    );
    return false;
  }
};
