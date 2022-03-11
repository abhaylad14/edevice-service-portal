const nodemailer = require("nodemailer");
const config = require("config")

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (options) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: config.get("SMTP_HOST"),
    port: config.get("SMTP_PORT"),
    secure: true, // true for 465, false for other ports
    auth: {
      user: config.get("SMTP_EMAIL"), 
      pass: config.get("SMTP_PASSWORD"), 
    },
  });

  // send mail with defined transport object
  const message = {
    from: `${config.get("FROM_NAME")} <${config.get("FROM_EMAIL")}>`, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message // plain text body
    // html: "<b>Hello world?</b>", // html body
  };

  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = sendEmail;