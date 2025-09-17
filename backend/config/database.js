// Import the Sequelize library
const { Sequelize } = require('sequelize');
// Import dotenv to access environment variables
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create a new Sequelize instance to connect to the database.
// It reads the connection parameters from your .env file.
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql', // Specify that we are using MySQL
    logging: false,   // Disable logging of SQL queries to the console for cleaner output
  }
);

// Export the sequelize instance to be used in other parts of the application
module.exports = sequelize;
