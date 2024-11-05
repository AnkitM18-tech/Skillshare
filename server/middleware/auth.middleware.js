const jwt = require("jsonwebtoken");

const verifyJWT = (token, secret) => {
  return jwt.verify(token, secret);
};

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({
      success: false,
      message: "User is not authenticated",
    });
  }
  const token = authHeader.split(" ")[1];
  const user = verifyJWT(token, process.env.JWT_SECRET);
  req.user = user;
  next();
};

module.exports = authenticate;
