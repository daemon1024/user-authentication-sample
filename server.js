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
app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  Users.findById(id, (err, usr) => {
    if (err) {
      res.send({ error: "An error has occurred" });
    } else {
      res.send(usr);
    }
  });
});
app.post("/signup", (req, res) => {
  console.log(req.body);
  const note = {
    nickname: req.body.nickname,
    email: req.body.email,
    password: req.body.password
  };
  Users.create(note, (err, result) => {
    if (err) {
      res.send({ error: "An error has occurred" });
    } else {
      res.send(result._id);
    }
  });
});
app.listen(port, () => {
  console.log("We are live on " + port);
});
