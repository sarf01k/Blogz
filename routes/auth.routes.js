const express = require("express");
const { signUp, login, logout } = require("../controllers/auth.controller");
const { deserializeUser } = require("../middleware/deserializeUser");

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/signup", signUp);
authRouter.post("/logout", logout);
authRouter.get("/test", deserializeUser, (req, res) => {
  return res.send("hello")
});


module.exports = authRouter;