import Brevo from "@getbrevo/brevo";

export const verifyEmail = async (token, email) => {
  // In many versions of this SDK, the classes are nested.
  // We check if the constructor exists on the root or the .default property.
  const ApiInstance =
    Brevo.TransactionalEmailsApi || Brevo.default.TransactionalEmailsApi;
  const SendSmtpEmail = Brevo.SendSmtpEmail || Brevo.default.SendSmtpEmail;
  const ApiKeys =
    Brevo.TransactionalEmailsApiApiKeys ||
    Brevo.default.TransactionalEmailsApiApiKeys;

  const apiInstance = new ApiInstance();

  apiInstance.setApiKey(ApiKeys.apiKey, process.env.BREVO_PASS);

  const sendSmtpEmail = new SendSmtpEmail();
  sendSmtpEmail.subject = "Verify Your EcoFriendly Account";
  sendSmtpEmail.htmlContent = `<html><body><h1>Welcome!</h1><a href="${process.env.FRONTEND_URL}/verify/${token}">Click here to verify</a></body></html>`;
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
    console.error("Brevo API Error:", error.message);
    return false;
  }
};
