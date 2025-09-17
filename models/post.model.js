const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;