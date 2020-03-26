const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose
  .connect("mongodb://localhost:27017/stickman_backend", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Successfully connect to MongoDB."))
  .catch(err => console.error("Connection error", err));

const UserSchema = new mongoose.Schema({
  nickname: String,
  email: String,
  password: String,
  pic: String
});

const Users = mongoose.model("user", UserSchema);

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
