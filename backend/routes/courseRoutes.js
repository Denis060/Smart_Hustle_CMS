// This file is located at: backend/routes/courseRoutes.js

const express = require('express');
const router = express.Router();
const { Course } = require('../models');
const { protect } = require('../middleware/authMiddleware'); // Import protection

// --- PUBLIC ROUTES ---

// GET all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
});

// GET a single course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course', error: error.message });
  }
});

// --- PROTECTED ADMIN ROUTES ---

// CREATE a new course
router.post('/', protect, async (req, res) => {
  try {
    const newCourse = await Course.create(req.body);
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error: error.message });
  }
});

// UPDATE a course
router.put('/:id', protect, async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    const updatedCourse = await course.update(req.body);
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: 'Error updating course', error: error.message });
  }
});

// DELETE a course
router.delete('/:id', protect, async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    await course.destroy();
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course', error: error.message });
  }
});

module.exports = router;

