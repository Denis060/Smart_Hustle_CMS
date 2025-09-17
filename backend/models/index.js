// This file is located at: backend/models/index.js

const sequelize = require('../config/database');
const User = require('./User');
const Post = require('./Post');
const Course = require('./Course');
const Category = require('./Category');
const Tag = require('./Tag');
const Comment = require('./Comment');
const Subscriber = require('./Subscriber');

// --- DEFINE RELATIONSHIPS ---

// User-Post Relationship (One-to-Many)
// A user can have many posts.
User.hasMany(Post, { foreignKey: 'userId', onDelete: 'CASCADE' });
// A post belongs to a single user.
Post.belongsTo(User, { foreignKey: 'userId' });

// Post-Category Relationship (One-to-Many)
// A category can have many posts.
Category.hasMany(Post, { foreignKey: 'categoryId', onDelete: 'SET NULL' });
// A post belongs to a single category.
Post.belongsTo(Category, { foreignKey: 'categoryId' });

// Post-Comment Relationship (One-to-Many)
// A post can have many comments.
Post.hasMany(Comment, { foreignKey: 'postId', onDelete: 'CASCADE' });
// A comment belongs to a single post.
Comment.belongsTo(Post, { foreignKey: 'postId' });

// Post-Tag Relationship (Many-to-Many)
// We need a through table called 'PostTags' to manage this relationship.
Post.belongsToMany(Tag, { through: 'PostTags' });
Tag.belongsToMany(Post, { through: 'PostTags' });


// Create a db object to hold our sequelize connection and models
const db = {
  sequelize,
  User,
  Post,
  Course,
  Category,
  Tag,
  Comment,
  Subscriber,
};

module.exports = db;

