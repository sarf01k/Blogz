const express = require("express");
require("dotenv").config();
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const connectToDB = require("./config/db");
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");
const { apiReference } = require("@scalar/express-api-reference");

const app = express();
app.use(express.static("."));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const port = process.env.PORT || 3000;

connectToDB();
app.use("/api/@:username", postRouter);
app.use("/api/auth", authRouter);
app.get(
  "/", // The path where your API reference will be accessible
  apiReference({
    url: '/openapi.yaml', // The path to your OpenAPI/Swagger spec file
    theme: 'purple', // Optional: Choose a theme (e.g., 'default', 'purple', 'moon')
    // ... other configuration options as needed
  })
);

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
