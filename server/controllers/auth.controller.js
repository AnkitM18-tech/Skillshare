const User = require("../models/User.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "Username or email already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    password: hashPassword,
    role,
  });

  await newUser.save();

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: newUser,
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  const passwordCorrectness = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!existingUser || !passwordCorrectness) {
    return res.status(401).json({
      message: "Invalid User Credentials",
      success: false,
    });
  }

  const accessToken = jwt.sign(
    {
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      role: existingUser.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );

  return res.status(200).json({
    success: true,
    message: "User Logged in Successfully",
    data: {
      accessToken,
      user: existingUser,
    },
  });
};

module.exports = { registerUser, loginUser };
