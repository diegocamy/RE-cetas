import nodemailer from "nodemailer";
import SMTPConnection from "nodemailer/lib/smtp-connection";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const sendConfirmationEmail = (
  transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>,
  email: string,
  token: string
): Promise<SMTPTransport.SentMessageInfo> => {
  return transporter.sendMail({
    from: '"RE-cetas" <recetas@zohomail.com>',
    to: email,
    subject: "Activa tu cuenta!",
    text: "Activa tu cuenta para empezar",
    html: `<a href="http://${
      process.env.SITENAME || `localhost:${process.env.PORT}`
    }/user/confirm-account/${token}">Activa tu cuenta para empezar</a>`,
  });
};

const sendForgotPasswordEmail = (
  transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>,
  email: string,
  token: string
): Promise<SMTPTransport.SentMessageInfo> => {
  return transporter.sendMail({
    from: '"RE-cetas" <recetas@zohomail.com>',
    to: email,
    subject: "Reestablecer contraseña",
    text: "Haz clic en el este enlace para reestablecer tu contraseña",
    html: `<a href="http://${
      process.env.SITENAME || `localhost:${process.env.PORT}`
    }/user/reset-password/${token}">Haz clic en el este enlace para reestablecer tu contraseña</a>`,
  });
};

export async function sendEmail(
  email: string,
  token: string,
  type: "confirm" | "forgot-password"
) {
  const testAccount = await nodemailer.createTestAccount();

  const config: { [key: string]: SMTPConnection.Options } = {
    development: {
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    },
    production: {
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: "recetas@zohomail.com",
        pass: process.env.ZOHO_PASSWORD,
      },
    },
  };

  let transporter = nodemailer.createTransport(config[process.env.NODE_ENV!]);

  let info: SMTPTransport.SentMessageInfo;

  if (type === "confirm") {
    info = await sendConfirmationEmail(transporter, email, token);
  } else {
    info = await sendForgotPasswordEmail(transporter, email, token);
  }

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
