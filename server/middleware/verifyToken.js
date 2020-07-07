const jsonwebtoken = require('jsonwebtoken');
const {JWT_SECRET} = require('../environments');

const validateToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    jsonwebtoken.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(404).send({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = validateToken;
