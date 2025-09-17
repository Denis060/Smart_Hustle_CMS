// This file is located at: backend/routes/categoryRoutes.js

const express = require('express');
const router = express.Router();
const { Category } = require('../models');

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({ order: [['name', 'ASC']] });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
});

// CREATE a new category
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Category name is required.' });
    }
    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error: error.message });
  }
});

module.exports = router;
