const jwt = require("jsonwebtoken")

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: "1d" });
}

module.exports = generateAccessToken;