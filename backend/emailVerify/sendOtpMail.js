import * as SibApiV3Sdk from "@getbrevo/brevo";

export const sendOtpMail = async (otp, email) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  // Configure API Key
  apiInstance.setApiKey(
    SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_PASS,
  );

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = "Your EcoFriendly OTP";
  sendSmtpEmail.htmlContent = `<html><body><h1>Your OTP is ${otp}</h1></body></html>`;
  sendSmtpEmail.sender = {
    name: "EcoFriendly Support",
    email: process.env.BREVO_USER,
  };
  sendSmtpEmail.to = [{ email: email }];

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(
      "API called successfully. Returned data: " + JSON.stringify(data),
    );
    return true;
  } catch (error) {
    console.error("Brevo API Final Failure:", error.message);
    return false;
  }
};
