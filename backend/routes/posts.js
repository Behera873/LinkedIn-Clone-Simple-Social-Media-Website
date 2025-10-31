const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const Post = require("../models/Post");

// ✅ Create a post
router.post("/", async (req, res) => {
  try {
    const { user, userName, content, imageUrl } = req.body;
    const newPost = new Post({ user, userName, content, imageUrl });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
