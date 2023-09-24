const express = require("express");
const router = express.Router();

require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.forwardemail.net",
  port: 587,
  auth: {
    user: process.env.mailAuth,
    pass: process.env.mailPass,
  },
});

const test = process.env.test;
console.log(test);

router.post("/send", (req, res) => {
  async function send() {
    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      // to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  }

  // send().catch(console.error);i
  console.log(req.body);
  res.send("message recieved");
});

module.exports = router;
