const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const port = 4096;

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/signup", (req, res) => {
  console.log(req.body);
  res.send("Hello");
});
app.listen(port, () => {
  console.log("We are live on " + port);
});
