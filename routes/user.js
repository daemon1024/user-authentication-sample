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
  const user = {
    nickname: req.body.nickname,
    email: req.body.email,
    password: req.body.password
  };
  Users.findOne(user, (err, result) => {
    if (err) {
      res.send({ error: "Error has occured" });
    } else {
      res.send(result ? result._id : "not found");
    }
  });
});
module.exports = router;
