const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const Username = require("../models/username.model");
const generateAccessToken = require("../utils/accessToken");
const generateRefreshToken = require("../utils/refreshToken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Account not found"
      })
    }

    const passwordIsMatch = bcrypt.compare(password, existingUser.passwordHash);

    if (!passwordIsMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password"
      })
    }

    const accessToken = generateAccessToken(existingUser._id);
    const refreshToken = generateRefreshToken(existingUser._id);

    await User.findByIdAndUpdate(
      existingUser.id,
      {
        refreshToken: refreshToken
      },
      { new: true }
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
      .cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 })
      .json({
        success: true,
        message: "Logged in successfully"
      })
  } catch (error) {
    console.error(`Error: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
}

exports.signUp = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      })
    }

    const usernameExists = await User.findOne({ username });

    if (usernameExists) {
      return res.status(400).json({
        success: false,
        message: "This username is taken"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      passwordHash: hashedPassword
    });

    await Username.create({
      userId: user.id,
      username
    });

    return res
      .status(200)
      .json({
        success: true,
        message: "User created successfully"
      })
  } catch (error) {
    console.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

exports.logout = async (req, res) => {
  try {
    return res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json({
        success: true,
        message: "Logged out successfully"
      });
  } catch (error) {
    console.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}