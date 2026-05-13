import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const senderEmail = process.env.SENDER_EMAIL || process.env.MAIL_USER;
const senderName = process.env.SENDER_NAME || "EcoFriendly";

const required = (value, name) => {
  if (!value) {
    throw new Error(`${name} must be configured`);
  }
  return value;
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
