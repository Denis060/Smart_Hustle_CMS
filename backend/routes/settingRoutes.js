// This file is located at: backend/routes/settingRoutes.js

const express = require('express');
const router = express.Router();
const { Setting } = require('../models');
const { protect } = require('../middleware/authMiddleware');

// --- GET ALL SETTINGS (Public or Protected) ---
// This route fetches all site settings. It can be public so the frontend can display the site title, etc.
router.get('/', async (req, res) => {
  try {
    const settingsArray = await Setting.findAll();
    // Convert array of objects to a single key-value object for easier use on the frontend
    const settingsObject = settingsArray.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {});
    res.status(200).json(settingsObject);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching settings', error: error.message });
  }
});

// --- UPDATE SETTINGS (Protected Admin Route) ---
// This route updates multiple settings at once.
router.put('/', protect, async (req, res) => {
  try {
    const settings = req.body; // Expects an object like { siteTitle: 'New Title', tagline: 'New Tagline' }
    
    // Loop through the provided settings and update or create them in the database
    for (const key in settings) {
      const value = settings[key];
      await Setting.upsert({ key, value }); // upsert = update or insert
    }

    res.status(200).json({ message: 'Settings updated successfully' });
  } catch (error)
    {
    res.status(500).json({ message: 'Error updating settings', error: error.message });
  }
});

module.exports = router;
