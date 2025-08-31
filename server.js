const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const connectToDB = require("./config/db");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;

connectToDB();
app.use("/", require("./routes/post.routes"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
