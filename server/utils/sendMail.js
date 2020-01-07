const nodemailer = require("nodemailer");
const htmlToText = require("html-to-text");
const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false,
  auth: {
    user: `${process.env.SENDGRID_USERNAME}`,
    pass: `${process.env.SENDGRID_PASSWORD}`
  }
});

module.exports = (to, subject, html) => {
  transporter.sendMail({
    from: "kamaljuit@gmail.com",
    to,
    subject,
    text: htmlToText.fromString(html),
    html
  });
};
