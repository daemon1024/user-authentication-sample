const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/signup", (req, res) => {
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
              password: hash
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
