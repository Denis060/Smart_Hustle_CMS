// This file is located at: backend/models/index.js

const sequelize = require('../config/database');
const UserModel = require('./User');
const PostModel = require('./Post');
const CourseModel = require('./Course');
const CategoryModel = require('./Category');
const TagModel = require('./Tag');
const CommentModel = require('./Comment');
const SubscriberModel = require('./Subscriber');
const SettingModel = require('./Setting');

// Initialize models
// Some models export a function (User, Setting), others export the model directly
const User = UserModel(sequelize);
const Post = PostModel;
const Course = CourseModel;
const Category = CategoryModel;
const Tag = TagModel;
const Comment = CommentModel;
const Subscriber = SubscriberModel;
const Setting = SettingModel(sequelize);

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
  Setting,
};

module.exports = db;

