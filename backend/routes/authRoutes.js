// This file is located at: backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// --- USER REGISTRATION ---
// Creates a new admin user.
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    // The password is now passed directly to the create method.
    // The User model's `beforeSave` hook will automatically hash it.
    const newUser = await User.create({
      username,
      password: password, 
    });

    // Respond without the password
    res.status(201).json({ id: newUser.id, username: newUser.username });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Username already exists.' });
    }
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

// --- USER LOGIN ---
// Authenticates a user and returns a JSON Web Token (JWT)
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      message: 'Logged in successfully',
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

module.exports = router;

