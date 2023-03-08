const jwt = require('jsonwebtoken');
const secretKey = 'mySecretKey';

const authMiddleware = (req, res, next) => {
    // Get the JWT token from the request headers
    const token = req.rawHeaders[1]; // Get the token from the Authorization header
    
    try {
      //   // Verify the token and extract the user's roles
      // const decoded = jwt.verify(token, secretKey);
      // const roles = decoded.roles;
      
  
      // // Check if the user is an admin
      // if (!roles.includes('admin')) {
      //   return res.status(401).send('Unauthorized');
      // }
  
      // If the user is authorized, call the next middleware
      next();
    } catch (err) {
      return res.status(401).send('Unauthorized');
    }
  }

module.exports = authMiddleware;
