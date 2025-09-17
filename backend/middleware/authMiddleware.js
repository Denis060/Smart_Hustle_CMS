// This file is located at: backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

// This function will act as middleware to protect routes
const protect = (req, res, next) => {
  let token;

  // Check if the 'Authorization' header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (e.g., "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user information from the token to the request object
      // This makes it available in our protected route handlers
      req.user = decoded;

      // Proceed to the next function in the middleware chain (the route handler)
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
