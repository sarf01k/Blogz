const Post = require("../models/post.model");
const User = require("../models/user.model");
const validateMongoDbId = require("../utils/validateMongoId");

exports.createPost = async (req, res) => {
  try {
    const { title, subtitle, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Please provide blog title and content"
      });
    }

    const author = req.user._id
    const post = await Post.create({ title, subtitle, content, author });

    return res.status(201).json({
      success: true,
      message: "Post created",
      post: post
    });
  } catch (error) {
    console.error(`${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// for a user
exports.fetchAllPosts = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    const posts = await Post.find({ author: user._id });

    return res.status(200).json({
      success: true,
      posts: posts,
    });
  } catch (error) {
    console.error(`${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

exports.fetchPostById = async (req, res) => {
  try {
    const { username, id } = req.params;
    validateMongoDbId

    const user = await User.findOne({ username });
    const post = await Post.findOne({ author: user._id, _id: id });

    if (!user || !post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      post: post,
    });
  } catch (error) {
    console.error(`${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const update = req.body;

    const post = await Post.findByIdAndUpdate(id, update, { new: true });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "No post was found with the provided ID",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post updated",
      updatedPost: post,
    });
  } catch (error) {
    console.error(`${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "No post with the provided ID found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post deleted"
    });
  } catch (error) {
    console.error(`${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
