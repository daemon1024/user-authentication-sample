const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.body.token, "xyz");
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth Failed"
    });
  }
};
