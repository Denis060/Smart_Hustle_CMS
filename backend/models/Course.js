// This file is located at: backend/models/Course.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Course = sequelize.define('Course', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  provider: {
    type: DataTypes.STRING,
  },
  review: {
    type: DataTypes.TEXT,
  },
  affiliateLink: {
    type: DataTypes.STRING,
  },
  isOwned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

module.exports = Course;
