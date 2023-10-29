const BlogModel = require('./blogPost.model');
const Post = require('./blogPost.model');

exports.createPost = async (req, res) => {
    try {
        const { title, content, author} = req.body;
        if (!title || title === "" || !content || content === "" || !author || author === "") {
            return res.status(400).json({
                message: "Please provide title, content and author"
            })
        }

        const post = await Post.create({ title, content, author })
        res.status(201).json({
            message: "Post created",
            post: req.body
        });
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.fetchAllPosts = async (req, res) => {
    try {
        const posts = await BlogModel.find();
        res.status(200).json({
            success: "Success",
            posts: posts
        })
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.fetchPost = async (req, res) => {
    try {
        const id = req.params;
        const post = await BlogModel.findById(id);
        res.status(200).json({
            success: "Success",
            posts: post
        })
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.editPost = async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;

        const post = await BlogModel.findByIdAndUpdate(id, update, { new: true });

        if (!post) {
            return res.status(404).json({
                message: "No post was found with the provided ID"
            });
        }

        res.status(200).json({
            message: "Post updated",
            updatedPost: post
        });
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await BlogModel.findByIdAndDelete({ _id: req.params.id });

        if (!post) {
            return res.status(404).json({
                message: "No post with the provided ID found"
            });
        }

        res.status(200).json({ message: "Post deleted" });
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ message: "Internal server error" });
    }
};