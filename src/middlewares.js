const jwt = require('jsonwebtoken');

const unlockCookie = (req, res, next) => {
  if (req.cookies.jwt) {
    const cookie = jwt.verify(req.cookies.jwt, process.env.SECRET);
    req.unlockCookie = cookie;
  } else {
    req.unlockCookie = null;
  }
  next();
};

module.exports = unlockCookie;
