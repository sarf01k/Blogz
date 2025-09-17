const express = require("express");
const {
  fetchAllPosts,
  createPost,
  deletePost,
  updatePost,
  fetchPostById,
} = require("../controllers/post.controller");
const { deserializeUser } = require("../middleware/deserializeUser");

const postRouter = express.Router({ mergeParams: true });

postRouter.post("/", deserializeUser, createPost);
postRouter.get("/", fetchAllPosts);
postRouter.get("/:id", fetchPostById);
postRouter.patch("/:id", deserializeUser, updatePost);
postRouter.delete("/:id", deserializeUser, deletePost);

module.exports = postRouter;
