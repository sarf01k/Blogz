const express = require("express");
const { signUp, login, logout, changePassword, updateUsername } = require("../controllers/auth.controller");
const { deserializeUser } = require("../middleware/deserializeUser");

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/signup", signUp);
authRouter.post("/logout", logout);
authRouter.patch("/change-password", deserializeUser, changePassword);
authRouter.patch("/username", deserializeUser, updateUsername);
authRouter.get("/test", deserializeUser, (req, res) => {
  return res.send("hello")
});


module.exports = authRouter;