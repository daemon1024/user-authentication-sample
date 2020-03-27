const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

router.get("/pic", checkAuth, (req, res) => {
  res.send(req.userData);
});

module.exports = router;
