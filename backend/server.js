// This file is located at: backend/server.js

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./models'); // Imports the db object from models/index.js

const app = express();

// --- Middleware ---

// *** FIX: Explicitly configure CORS to allow your frontend's origin ***
const corsOptions = {
  origin: 'http://localhost:5175', // Your Vite frontend's address
  optionsSuccessStatus: 200 // For legacy browser support
};
app.use(cors(corsOptions));

app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// --- API Routes ---
const postRoutes = require('./routes/postRoutes');
const courseRoutes = require('./routes/courseRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const tagRoutes = require('./routes/tagRoutes');
const commentRoutes = require('./routes/commentRoutes');
const authRoutes = require('./routes/authRoutes');
const subscriberRoutes = require('./routes/subscriberRoutes');
const settingRoutes = require('./routes/settingRoutes'); // Import setting routes

app.use('/api/posts', postRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/settings', settingRoutes); // Use setting routes


// --- Database Connection & Server Initialization ---
const PORT = process.env.PORT || 3001;

// Test the database connection
db.sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
    // Sync models with the database
    // { alter: true } is useful in development to apply model changes
    return db.sequelize.sync({ alter: true }); 
  })
  .then(() => {
    // Start the server after the database is synced
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

