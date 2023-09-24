const express = require("express");
const router = express.Router();

require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.forwardemail.net",
  port: 587,
  secure: false,
  auth: {
    user: process.env.mailAuth,
    pass: process.env.mailPass,
  },
});

router.post("/send", (req, res) => {
  async function send() {
    const info = await transporter.sendMail({
      from: `${process.env.mailAuth}`, // sender address
      to: `${process.env.mailAuth}, ${process.env.gmailTest}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  }

  send().catch(console.error);
  console.log(req.body);
  res.send("message recieved");
});

module.exports = router;
