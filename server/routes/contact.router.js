const express = require("express");
const router = express.Router();

const nodemailer = require("nodemailer");

const transporter = nodemailer.transporter({
  host: "smtp.forwardemail.net",
  port: 587,
  secure: true,
  auth: {
    user: "",
    pass: "",
  },
});
router.post("/send", (req, res) => {
  console.log(req.body);
  res.send("message recieved");
});

module.exports = router;
