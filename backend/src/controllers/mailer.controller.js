import { SMTP_PASS, SMTP_USER } from "../config";

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export const sendEmail = async (emailOptions) => {
  try {
    const info = await transporter.sendMail(emailOptions);
    console.log("Correo enviado:", info.response);
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw new Error("Failed to send email");
  }
};

export const sendResetPasswordEmail = async (email, resetToken) => {
  const emailOptions = {
    from: SMTP_USER,
    to: email,
    subject: "Restablecer Contraseña",
    html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
           <a href="http://localhost:3000/reset-password/${resetToken}">Restablecer Contraseña</a>`,
  };

  await sendEmail(emailOptions);
};
