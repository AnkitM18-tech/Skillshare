const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controller");
const authenticate = require("../middleware/auth.middleware");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/check-auth").get(authenticate, (req, res) => {
  const user = req.user;
  res
    .status(200)
    .json({ success: true, message: "User Authenticated", data: { user } });
});

module.exports = router;
