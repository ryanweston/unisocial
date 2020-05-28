const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //Verify token
  try {
    jwt.verify(token, config.get('jwtSecret'), (error, decrypted) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decrypted.user;
        next();
      }
    });
  } catch (err) {
    console.error('Middleware failed');
    return res.status(500).json({ msg: 'Server Error' });
  }
};
