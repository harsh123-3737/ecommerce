import Brevo from "@getbrevo/brevo";

export const sendOtpMail = async (otp, email) => {
  // 1. Initialize the instance directly from the Brevo package
  const apiInstance = new Brevo.TransactionalEmailsApi();

  // 2. Set the API Key (Use BREVO_API_KEY from your dashboard)
  apiInstance.setApiKey(
    Brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_PASS, // Ensure this matches your Render Environment Variable name
  );

  const sendSmtpEmail = new Brevo.SendSmtpEmail();

  sendSmtpEmail.subject = "Your EcoFriendly OTP Code";
  sendSmtpEmail.htmlContent = `
    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #10b981;">Security Verification</h2>
      <p>Hello,</p>
      <p>Your one-time password (OTP) for account access is:</p>
      <h1 style="background: #f3f4f6; display: inline-block; padding: 10px 20px; border-radius: 5px; letter-spacing: 5px;">
        ${otp}
      </h1>
      <p>This code expires in 10 minutes. If you didn't request this, please ignore this email.</p>
      <p>Best,<br>The EcoFriendly Team</p>
    </div>
  `;

  // 3. Configure Sender and Recipient
  sendSmtpEmail.sender = {
    name: "EcoFriendly Support",
    email: process.env.BREVO_USER,
  };
  sendSmtpEmail.to = [{ email: email }];

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(
      "OTP Sent Successfully via API. Message ID:",
      data.body.messageId,
    );
    return true;
  } catch (error) {
    // 🛡️ Error handling that won't crash your server
    console.error(
      "Brevo OTP Delivery Failed:",
      error.response ? error.response.text : error.message,
    );
    return false;
  }
};
