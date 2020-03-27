const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

router.get("/image", checkAuth, (req, res) => {
  res.sendFile(__dirname + "/" + req.userData.image);
});

module.exports = router;
