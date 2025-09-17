// This file is located at: backend/models/Comment.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('Comment', {
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'spam'),
    defaultValue: 'pending',
    allowNull: false,
  },
});

module.exports = Comment;
