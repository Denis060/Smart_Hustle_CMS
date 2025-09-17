// This file is located at: backend/models/User.js
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  class User extends Model {}

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      // This 'beforeSave' hook will run automatically before a User record is created or updated.
      beforeSave: async (user) => {
        // Only hash the password if it has been changed or is new
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  });

  return User;
};

