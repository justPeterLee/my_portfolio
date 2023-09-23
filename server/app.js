const express = require("express");
const fs = require("fs");
const path = require("path");
const NodeCache = require("node-cache");

const cache = new NodeCache();
const app = express();

const PORT = process.env.PORT || 5001;

app.use("/api/v1/", express.static("./public"));

app.get("/api/v1/", (req, res) => {
  res.send("hello");
});

// app.get("/api/v1/project", (req, res) => {
//   const dataKey = "prjectKey";
//   const cacheData = cache.get(dataKey);

//   if(cacheData){
//     console.log('data served from cache');
//     res.json(cacheData)
//   }else{
//     const dataFilePath = path.join(__dirname, "public", "")
//   }
//   res.send("hello");
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
