const jwt = require("jsonwebtoken")

exports.deserializeUser = (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }

  const user = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
  console.log(user);

  if (user) {
    req.user = user;
  }

  // const refresh = user.re

  next();
}