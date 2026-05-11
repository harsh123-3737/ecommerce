import * as Brevo from "@getbrevo/brevo";

export const sendOtpMail = async (otp, email) => {
  // 1. SAFE CONSTRUCTOR ACCESS (Fixes the "is not a constructor" error)
  const ApiInstance =
    Brevo.TransactionalEmailsApi || Brevo.default.TransactionalEmailsApi;
  const SendSmtpEmail = Brevo.SendSmtpEmail || Brevo.default.SendSmtpEmail;
  const ApiKeys =
    Brevo.TransactionalEmailsApiApiKeys ||
    Brevo.default.TransactionalEmailsApiApiKeys;

  const apiInstance = new ApiInstance();

  // 2. CONFIGURATION (Check your Render Env Variable name!)
  apiInstance.setApiKey(
    ApiKeys.apiKey,
    process.env.BREVO_API_KEY, // Ensure this matches the name in Render Dashboard
  );

  const sendSmtpEmail = new SendSmtpEmail();

  sendSmtpEmail.subject = "Your EcoFriendly OTP Code";
  sendSmtpEmail.htmlContent = `
    <div style="font-family: sans-serif; text-align: center; padding: 20px;">
      <h2 style="color: #10b981;">Verification Code</h2>
      <p>Your OTP for account access is:</p>
      <h1 style="letter-spacing: 5px; background: #f4f4f4; display: inline-block; padding: 10px;">${otp}</h1>
      <p>Valid for 10 minutes.</p>
    </div>
  `;

  sendSmtpEmail.sender = {
    name: "EcoFriendly Support",
    email: process.env.BREVO_USER, // Must be your verified Brevo sender email
  };
  sendSmtpEmail.to = [{ email: email }];

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    // Note: use data.body.messageId for the Brevo SDK
    console.log("OTP Sent via API. ID:", data.body.messageId);
    return true;
  } catch (error) {
    // 3. LOGGING (Captures the actual reason if it fails)
    console.error(
      "Brevo API Error:",
      error.response ? error.response.text : error.message,
    );
    return false;
  }
};
