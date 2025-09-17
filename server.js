const express = require("express");
require("dotenv").config();
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const connectToDB = require("./config/db");
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const port = process.env.PORT || 3000;

connectToDB();
app.use("/api/@:username", postRouter);
app.use("/api/auth", authRouter);
app.get("/", async (req, res) => {
  res.status(200).json("Blogz API");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
