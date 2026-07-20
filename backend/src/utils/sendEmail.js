import nodemailer from 'nodemailer';


export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 2525,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 5000, 
    greetingTimeout: 5000,
  });

  const mailOptions = {
    from: 'Store Support <noreply@ecom-store.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(" Email sent successfully:", info.messageId);
  } catch (error) {
    console.error(" Email failed to send. Error :", error.message);
  }
};

export default sendEmail;