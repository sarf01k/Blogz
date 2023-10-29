const express = require('express');
const { fetchAllPosts, createPost, deletePost, editPost, fetchPost } = require('./postController');

const postRouter = express.Router();

postRouter.post('/create-post', createPost)
postRouter.get('/posts', fetchAllPosts)
postRouter.get('/posts/:id', fetchPost)
postRouter.patch('/update-post/:id', editPost)
postRouter.delete('/delete-post/:id', deletePost)

module.exports = postRouter;