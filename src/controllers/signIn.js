const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getUserDB = require('./../model/queries/getUser');


// Vaild User Object Coming from F.E
const vaildUserObject = object => (object.username !== '' && object.password !== '');

// Set Cookie
const sendCookie = (object, res) => {
  jwt.sign({
    username: object.user_name,
    permission: object.permission,
  }, process.env.SECRET, (err, result) => {
    if (err) { res.send({ Error: 'Sorry We Have Problem ' }); } else {
      res.cookie('jwt', result, { 'Max-Age': (60 * 60 * 60 * 24), httpOnly: true });
      res.send({ result: '/' });
    }
  });
};

// Get User From DB
const getUser = (object, res) => {
  getUserDB(object, (err, resultDB) => {
    if (err) { res.send({ Error: 'Sorry We Have A Problem' }); } else if (resultDB.rows.length === 0) {
      res.send({ Error: 'Check Username Or Password' });
    } else {
      bcrypt.compare(object.password, resultDB.rows[0].user_password, (errBcrypt, result) => {
        if (errBcrypt) { res.send({ Error: 'Check Username Or Password' }); } else if (result) { sendCookie(resultDB.rows[0], res); } else { res.send({ Error: 'Check Username Or Password' }); }
      });
    }
  });
};

// Get Route
exports.get = (req, res) => {
  if ((req.unlockCookie === null)) {
    res.render('sign-in', {
      title: 'Sign-in', headerFound: false, footerFound: false, asideFound: false, style: ['signUpIn'], javascript: ['sign-in'],
    });
  } else {
    res.redirect('/');
  }
};

// Post Route
exports.post = (req, res) => {
  if (vaildUserObject(req.body)) {
    getUser(req.body, res);
  } else {
    res.send({ Error: 'Check The Fields' });
  }
};
