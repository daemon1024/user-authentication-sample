const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose
  .connect(
    "mongodb://barun:helloworld@cluster0-shard-00-00-e6kxz.mongodb.net:27017,cluster0-shard-00-01-e6kxz.mongodb.net:27017,cluster0-shard-00-02-e6kxz.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("Successfully connect to MongoDB."))
  .catch(err => console.error("Connection error", err));

const app = express();
const userAuth = require("./routes/auth");
const userRoute = require("./routes/user");

const port = 4096;

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", userAuth);
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("We are live on " + port);
});
