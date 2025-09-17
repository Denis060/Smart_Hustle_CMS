// This file is located at: backend/routes/postRoutes.js

const express = require('express');
const router = express.Router();
const { Post, User } = require('../models'); // Import Post and User models

// --- GET ALL POSTS ---
// This route will fetch all posts from the database.
router.get('/', async (req, res) => {
  try {
    // Find all posts, include the author's username
    const posts = await Post.findAll({
      include: [{
        model: User,
        attributes: ['username'] // Only include the username
      }],
      order: [['createdAt', 'DESC']] // Order by creation date, newest first
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
});

// --- GET A SINGLE POST BY ID ---
// This route fetches a single post using its primary key (id).
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: ['username']
      }]
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error: error.message });
  }
});


// --- CREATE A NEW POST ---
// This route will create a new post.
// In a real application, this would be a protected route.
router.post('/', async (req, res) => {
  try {
    const { title, content, imageUrl, isPublished, userId } = req.body;

    // Basic validation
    if (!title || !content || !userId) {
      return res.status(400).json({ message: 'Title, content, and userId are required.' });
    }

    const newPost = await Post.create({
      title,
      content,
      imageUrl,
      isPublished,
      userId
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
});

// --- UPDATE A POST ---
// This route updates an existing post by its ID.
router.put('/:id', async (req, res) => {
  try {
    const { title, content, imageUrl, isPublished } = req.body;
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Update the post with new data
    post.title = title;
    post.content = content;
    post.imageUrl = imageUrl;
    post.isPublished = isPublished;

    await post.save(); // Save the changes to the database

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error: error.message });
  }
});

// --- DELETE A POST ---
// This route deletes a post by its ID.
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await post.destroy(); // Delete the post from the database

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
});


module.exports = router;

