const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  console.log("initiating auth . .. ");
  try {
    const decoded = jwt.verify(req.query.token, "xyz");
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth Failed"
    });
  }
};
