// This file is located at: backend/routes/tagRoutes.js

const express = require('express');
const router = express.Router();
const { Tag } = require('../models');

// GET all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({ order: [['name', 'ASC']] });
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tags', error: error.message });
  }
});

// CREATE a new tag
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Tag name is required.' });
    }
    const newTag = await Tag.create({ name });
    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json({ message: 'Error creating tag', error: error.message });
  }
});

module.exports = router;
