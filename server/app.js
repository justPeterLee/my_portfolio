const express = require("express");
const fs = require("fs");
const path = require("path");
const NodeCache = require("node-cache");
const bodyParser = require("body-parser");
const cache = new NodeCache();
const app = express();
const PORT = process.env.PORT || 5001;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/", express.static("./public"));

app.get("/api/v1/", (req, res) => {
  res.send("hello");
});

// routes
const contactRouter = require("./routes/contact.router");
app.use("/api/v1/contact/", contactRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
