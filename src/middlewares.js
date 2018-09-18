const jwt = require('jsonwebtoken');

const unlockCookie = (req, res, next) => {
  if (req.cookies.jwt) {
    jwt.verify(req.cookies.jwt, process.env.SECRET, (err, decoded) => {
      if (err) {
        req.unlockCookie = null;
      } else if (decoded) {
        req.unlockCookie = decoded;
      } else {
        req.unlockCookie = null;
      }
    });
  } else {
    req.unlockCookie = null;
  }
  next();
};

module.exports = unlockCookie;
