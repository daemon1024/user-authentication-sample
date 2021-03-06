const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./routes/uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const fileUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 16
  },
  fileFilter: fileFilter
});

router.get("/signup", (req, res) => {
  res.send(
    "Send a post request with email, nickname , password and image as formdata part of request body."
  );
});

router.post("/signup", fileUpload.single("image"), (req, res) => {
  console.log(req);
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length) {
        return res.redirect(409, "/example/login");
      } else {
        bcrypt.hash(req.body.password, 7, (err, hash) => {
          if (err) {
            res.status(500).json({ error: err });
          } else {
            const user = new User({
              nickname: req.body.nickname,
              email: req.body.email,
              password: hash,
              image: req.file.path
            });
            user
              .save()
              .then(result => res.redirect(200, "/example/login"))
              .catch(
                err => console.log(err) && res.status(500).json({ error: err })
              );
          }
        });
      }
    });
});

router.get("/login", (req, res) => {
  res.send(
    "Send a post request with email, nickname and password part of request body."
  );
});

router.post("/login", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (!user.length) {
        return res.redirect(401, "/example/login");
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        const token = jwt.sign(
          {
            image: user[0].image
          },
          "xyz",
          {
            expiresIn: "1h"
          }
        );
        if (err) {
          console.log(err);
          return res.redirect(500, "/example/login");
        }
        if (result) {
          return res.redirect("/user/image?token=" + token);
        }
        res.redirect(401, "/example/login");
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
module.exports = router;
