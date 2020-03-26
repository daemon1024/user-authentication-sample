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

const app = express();
const userRoutes = require("./routes/user");

const port = 4096;

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("We are live on " + port);
});
