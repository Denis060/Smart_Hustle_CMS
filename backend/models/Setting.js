// This file is located at: backend/models/Setting.js

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Setting = sequelize.define('Setting', {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'settings',
    timestamps: false, // No createdAt/updatedAt for settings
  });

  return Setting;
};
