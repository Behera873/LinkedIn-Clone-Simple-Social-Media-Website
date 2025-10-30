const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/posts/ - create a post
router.post('/', auth, async (req, res) => {
  try {
    const { content, imageUrl } = req.body;
    if (!content) return res.status(400).json({ message: 'Content required' });

    // fetch user from DB to get name (ensure User model is required)
    const User = require('../models/User');
    const userDoc = await User.findById(req.user.id);
    const userName = userDoc ? userDoc.name : 'Anonymous';

    const post = new Post({
      user: req.user.id,
      userName,
      content,
      imageUrl
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/posts/ - get all posts (latest first)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/posts/:id - delete own post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.user.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });
    await post.remove();
    res.json({ message: 'Post removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/posts/:id - edit own post
router.put('/:id', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.user.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    if (content) post.content = content;
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
