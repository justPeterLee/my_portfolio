const express = require("express");
const router = express.Router();

router.post("/send", (req, res) => {
  console.log(req.body);
  res.send("message recieved");
});

module.exports = router;
