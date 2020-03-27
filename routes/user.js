const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");

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
        console.log(req.body, user[0]);
        if (err) {
          console.log(err);
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        console.log(result);
        if (result) {
          return res.status(200).json({
            message: "Auth successful"
          });
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
