const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.deserializeUser = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const user = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);

    if (user) {
      req.user = await User.findById(user.id);
    }

    next();
  } catch (error) {
    console.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}