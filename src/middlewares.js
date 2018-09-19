const { verify } = require('jsonwebtoken');

const unlockCookie = (req, res, next) => {
  if (req.cookies.jwt) {
    verify(req.cookies.jwt, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.locals.unlockCookie = null;
      } else if (decoded) {
        res.locals.unlockCookie = decoded;
      } else {
        res.locals.unlockCookie = null;
      }
    });
  } else {
    res.locals.unlockCookie = null;
  }
  next();
};

module.exports = unlockCookie;
