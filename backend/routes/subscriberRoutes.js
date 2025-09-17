// This file is located at: backend/routes/subscriberRoutes.js

const express = require('express');
const router = express.Router();
const { Subscriber } = require('../models');
const { protect } = require('../middleware/authMiddleware');

// --- PUBLIC ROUTE ---

// CREATE a new subscriber
// This allows anyone to sign up for the newsletter.
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    // Check if email already exists to prevent duplicates
    const existingSubscriber = await Subscriber.findOne({ where: { email } });
    if (existingSubscriber) {
      return res.status(409).json({ message: 'This email is already subscribed.' });
    }

    const newSubscriber = await Subscriber.create({ email });
    res.status(201).json(newSubscriber);
  } catch (error) {
    res.status(500).json({ message: 'Error subscribing', error: error.message });
  }
});


// --- PROTECTED ADMIN ROUTES ---

// GET all subscribers
// Only a logged-in admin can view the list of subscribers.
router.get('/', protect, async (req, res) => {
  try {
    const subscribers = await Subscriber.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscribers', error: error.message });
  }
});

// DELETE a subscriber
// Only a logged-in admin can delete a subscriber.
router.delete('/:id', protect, async (req, res) => {
  try {
    const subscriber = await Subscriber.findByPk(req.params.id);
    if (!subscriber) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }
    await subscriber.destroy();
    res.status(200).json({ message: 'Subscriber deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subscriber', error: error.message });
  }
});

module.exports = router;
