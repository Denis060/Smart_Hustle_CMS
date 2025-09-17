const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Post model
const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
  // Foreign keys for category, tags, and user will be added via associations
}, {
  // Model options
  tableName: 'posts',
  timestamps: true,
});

module.exports = Post;
