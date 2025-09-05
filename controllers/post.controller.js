const Post = require("../models/post.model");

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (
      !title ||
      title === "" ||
      !content ||
      content === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide blog title and content"
      });
    }

    const post = await Post.create({ title, content, author });

    return res.status(201).json({
      success: true,
      message: "Post created",
      post: post
    });
  } catch (error) {
    console.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

exports.fetchAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    return res.status(200).json({
      success: true,
      posts: posts,
    });
  } catch (error) {
    console.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

exports.fetchPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    return res.status(200).json({
      success: true,
      posts: post,
    });
  } catch (error) {
    console.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

exports.editPost = async (req, res) => {
  try {
    const { id } = req.params;
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
    console.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete({ _id: req.params.id });

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
    console.error(`Error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
