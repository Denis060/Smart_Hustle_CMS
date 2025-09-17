// This file is located at: backend/routes/commentRoutes.js

const express = require('express');
const router = express.Router();
const { Comment, Post } = require('../models');

// GET all comments (for moderation)
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [{ model: Post, attributes: ['title'] }],
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error: error.message });
  }
});

// UPDATE comment status (for moderation)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (!['pending', 'approved', 'spam'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status provided.' });
    }
    comment.status = status;
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment status', error: error.message });
  }
});

// DELETE a comment
router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        await comment.destroy();
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error: error.message });
    }
});

module.exports = router;
