const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const Username = require("../models/username.model");
const generateAccessToken = require("../utils/accessToken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please fill all fields"
        })
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Account not found"
      })
    }

    const passwordIsMatch = await bcrypt.compare(password, existingUser.passwordHash);

    if (!passwordIsMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password"
      })
    }

    const accessToken = generateAccessToken(existingUser._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
      .json({
        success: true,
        message: "Logged in successfully"
      })
  } catch (error) {
    console.error(`${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
}

exports.signUp = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    if (!firstName || !lastName || !username || !email || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please fill all fields"
        })
    }

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
    console.error(`${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

exports.changePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;

    if (!newPassword) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Enter a new password"
        })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.updateOne({ _id: req.user.id }, { $set: { passwordHash: hashedPassword } }, { new: true });

    return res
      .status(200)
      .json({
        success: true,
        message: "Password updated successfully"
      })
  } catch (error) {
    console.error(`${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

exports.updateUsername = async (req, res) => {
  try {
    const { newUsername } = req.body;

    if (!newUsername) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Enter a new username"
        })
    }

    const usernameExists = await User.findOne({ username: newUsername });

    if (usernameExists) {
      return res
        .status(400)
        .json({
          success: false,
          message: "This username is taken"
        })
    }

    await Username.updateOne({ username: req.user.username }, { $set: { endDate: Date(Date.now) } }, { new: true });
    await User.updateOne({ _id: req.user._id }, { $set: { username: newUsername } }, { new: true });
    await Username.create({
      userId: req.user.id,
      username: newUsername
    });

    return res
      .status(200)
      .json({
        success: true,
        message: "Username updated successfully"
      })
  } catch (error) {
    console.error(`${error}`);
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
      .json({
        success: true,
        message: "Logged out successfully"
      });
  } catch (error) {
    console.error(`${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}