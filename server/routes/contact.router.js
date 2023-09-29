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
  const email = req.body.email;
  const message = req.body.message;

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (emailPattern.test(email)) {
    console.log("valid");

    async function send() {
      const info = await transporter.sendMail({
        from: `${process.env.mailAuth}`, // sender address
        to: `${process.env.mailAuth}, ${email}`, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
    }

    // send().catch(console.error);
    res.status(200).send("message sent");
  } else {
    console.log("invalid");
    res.status(500).send("invalid email");
  }
  // console.log(req.body);
});

module.exports = router;
