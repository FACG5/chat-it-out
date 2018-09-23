const bcrypt = require('bcryptjs');
const {
  insertArticle,
  insertDoctor
} = require('../model/queries/addData');
const saltRounds = 10;

exports.get = (req, res) => {
  if (res.locals.unlockCookie && res.locals.unlockCookie.permission === 'admin') {
    res.render('addArticle', {
      title: 'Admin Panel',
      headerFound: true,
      footerFound: true,
      asideFound: true,
      style: ['admin', 'header', 'footer'],
      javascript: ['hamburger', 'addArticle'],
      login: (res.locals.unlockCookie === null), username: (res.locals.unlockCookie === null) ? 'Unkown' : res.locals.unlockCookie.username,
      layout: 'admin',
    });
  } else {
    res.redirect('/');
  }
};

exports.addArticle = (req, res) => {
  insertArticle(req.body).then((result) => {
    res.json((result.rows[0]));
  });
};

exports.addDoctor = (req, res) => {
  if (res.locals.unlockCookie && res.locals.unlockCookie.permission === 'admin') {
    res.render('addDoctor', {
      title: 'Add Doctor',
      headerFound: true,
      footerFound: true,
      asideFound: true,
      style: ['admin', 'header', 'footer', 'addDoctor'],
      javascript: ['hamburger', 'addDoctor'],
      login: (res.locals.unlockCookie === null),
      username: (res.locals.unlockCookie === null) ? 'Unkown' : res.locals.unlockCookie.username,
      layout: 'admin',
    });
  } else {
    res.redirect('/');
  }
};

exports.addDoctorDB = (req, res) => {
  let {
    password,
    image
  } = req.body;
  if (image.trim().length == 0) {
    req.body.image = 'https://myblue.bluecrossma.com/sites/g/files/csphws636/files/inline-images/Doctor%20Image%20Desktop.png';
  }
  if (password.trim().length < 7) {
    res.send({ Error: 'Please Enter Strong Password' });
  } else {
    bcrypt.hash(password, saltRounds).then((hash) => {
      req.body.password = hash;
      insertDoctor(req.body, (err) => {
        if (err) {
          if (err.code === '23505') { res.send({ Error: 'The Email Or Username Taken' }); } else {
            res.send({ Error: 'There Is Error' });
          }
        } else {
          res.send({ result: '/admin' });
        }
      });
    });
  }
};
