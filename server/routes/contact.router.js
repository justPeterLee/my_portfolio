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
  const message = req.body.postScriptNote;

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (emailPattern.test(email)) {
    console.log("sent email");

    async function send() {
      const info = await transporter.sendMail({
        from: `${process.env.mailAuth}`, // sender address
        to: `${process.env.mailAuth}, ${email}`, // list of receivers
        subject: "this is the subject", // Subject line
        text: "this is the title", // plain text body
        html: `<p>Greetings Peter,</p><p>I think your website is super duper cool. I would love to get in contact with you. Please reply to the email at you earliest convince.</p><p>Yours truly, ${email}</p> ${
          message.replace(/\s+/g, "") ? `<p>PS</p> <p>${message}</p> ` : ``
        }`, // html body
      });
    }

    send().catch(() => {
      res.status(500).send(false);
    });
    res.status(200).send(true);
  } else {
    console.log("invalid");
    res.status(500).send(false);
  }
  // console.log(req.body);
});

module.exports = router;
