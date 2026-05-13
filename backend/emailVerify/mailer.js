import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const senderEmail = process.env.SENDER_EMAIL || process.env.MAIL_USER;
const senderName = process.env.SENDER_NAME || "EcoFriendly";
const resendSender = process.env.RESEND_FROM || "EcoFriendly <onboarding@resend.dev>";

const required = (value, name) => {
  if (!value) {
    throw new Error(`${name} must be configured`);
  }
  return value;
};

const fetchWithTimeout = async (url, options, timeoutMs = 20000) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
};

const sendWithResend = async ({ to, subject, html, text }) => {
  required(process.env.RESEND_API_KEY, "RESEND_API_KEY");

  const response = await fetchWithTimeout("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: resendSender,
      to: [to],
      subject,
      html: html || text?.replace(/\n/g, "<br />"),
      text,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || data.error || `Resend API ${response.status}`);
  }

  console.log("Email sent through resend:", data.id);
  return data;
};

const sendWithBrevoApi = async ({ to, subject, html, text }) => {
  const apiKey = process.env.BREVO_API_KEY;
  required(apiKey, "BREVO_API_KEY");
  required(senderEmail, "SENDER_EMAIL or MAIL_USER");

  const response = await fetchWithTimeout("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: to }],
      subject,
      htmlContent: html || text?.replace(/\n/g, "<br />"),
      textContent: text,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || data.code || `Brevo API ${response.status}`);
  }

  console.log("Email sent through brevo-api:", data.messageId);
  return data;
};

const createTransporters = () => {
  const transporters = [];

  if (process.env.MAIL_USER && process.env.MAIL_PASS) {
    transporters.push({
      name: "gmail-587",
      transporter: nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        family: 4,
        connectionTimeout: 15000,
        greetingTimeout: 15000,
        socketTimeout: 20000,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      }),
    });

    transporters.push({
      name: "gmail-465",
      transporter: nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        family: 4,
        connectionTimeout: 15000,
        greetingTimeout: 15000,
        socketTimeout: 20000,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      }),
    });
  }

  if (process.env.BREVO_USER && process.env.BREVO_PASS) {
    transporters.push({
      name: "brevo",
      transporter: nodemailer.createTransport({
        host: process.env.BREVO_HOST || "smtp-relay.brevo.com",
        port: Number(process.env.BREVO_PORT || 587),
        secure: false,
        family: 4,
        connectionTimeout: 15000,
        greetingTimeout: 15000,
        socketTimeout: 20000,
        auth: {
          user: process.env.BREVO_USER,
          pass: process.env.BREVO_PASS,
        },
      }),
    });
  }

  if (transporters.length === 0) {
    required(process.env.MAIL_USER, "MAIL_USER");
    required(process.env.MAIL_PASS, "MAIL_PASS");
  }

  return transporters;
};

export const sendMail = async (mailOptions) => {
  required(senderEmail, "SENDER_EMAIL or MAIL_USER");

  const errors = [];
  const httpProviders = [
    { name: "resend", enabled: Boolean(process.env.RESEND_API_KEY), send: sendWithResend },
    { name: "brevo-api", enabled: Boolean(process.env.BREVO_API_KEY), send: sendWithBrevoApi },
  ];

  for (const provider of httpProviders) {
    if (!provider.enabled) {
      continue;
    }

    try {
      return await provider.send(mailOptions);
    } catch (error) {
      errors.push(`${provider.name}: ${error.message}`);
      console.error(`${provider.name} email failed:`, {
        message: error.message,
      });
    }
  }

  for (const { name, transporter } of createTransporters()) {
    try {
      const info = await transporter.sendMail({
        from: `"${senderName}" <${senderEmail}>`,
        ...mailOptions,
      });

      console.log(`Email sent through ${name}:`, info.response);
      return info;
    } catch (error) {
      errors.push(`${name}: ${error.code || error.message}`);
      console.error(`${name} email failed:`, {
        code: error.code,
        command: error.command,
        response: error.response,
        message: error.message,
      });
    }
  }

  throw new Error(`All email providers failed (${errors.join("; ")})`);
};
