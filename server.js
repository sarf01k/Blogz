const express = require("express");
require("dotenv").config();
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const connectToDB = require("./config/db");
const authRouter = require("./routes/auth.routes");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const port = process.env.PORT || 3000;

connectToDB();
app.use("/:user/:title", require("./routes/post.routes"));
app.use("/api/auth", authRouter)

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
