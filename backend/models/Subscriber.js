// This file is located at: backend/models/Subscriber.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Subscriber = sequelize.define('Subscriber', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = Subscriber;
