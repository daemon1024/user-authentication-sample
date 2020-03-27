const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
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

router.post("/signup", fileUpload.single("image"), (req, res) => {
  console.log(req.file);
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length) {
        return res.json({
          message: "E-Mail exists"
        });
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
              .then(result => res.status(201).json(result))
              .catch(
                err => console.log(err) && res.status(500).json({ error: err })
              );
          }
        });
      }
    });
});
router.post("/login", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (!user.length) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        const token = jwt.sign(
          {
            email: user[0].email,
            userId: user[0]._id
          },
          "xyz",
          {
            expiresIn: "1h"
          }
        );
        if (err) {
          console.log(err);
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          // res.status(200).json({
          //   message: "Auth successful",
          //   token: token
          // });
          // console.log(res);
          // res.body.token = token;
          return res.redirect(200, "/user/pic?token=" + token);
        }
        res.status(401).json({
          message: "Auth failed"
        });
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
