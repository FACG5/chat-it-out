const {
  insertArticle,
  insertDoctor
} = require('../model/queries/addData');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

exports.get = (req, res) => {
  console.log(res.locals.unlockCookie);
  if (res.locals.unlockCookie && res.locals.unlockCookie.permission === 'admin') {
    res.render('admin', {
      title: 'Admin Panel',
      headerFound: true,
      footerFound: true,
      asideFound: true,
      style: ['admin', 'header', 'footer'],
      javascript: ['hamburger', 'addArticle'],
      login: (res.locals.unlockCookie === null), username: (res.locals.unlockCookie === null) ? 'Unkown' : res.locals.unlockCookie.username,
    });
  } else {
    res.clearCookie('jwt');
    res.redirect('/signIn');
  }
};

exports.addArticle = (req, res) => {
  insertArticle(req.body).then((result) => {
    res.json((result.rows[0]));
  });
};

exports.addDoctor = (req, res) => {
  res.render('demoDoctor', {
    title: 'Add doctor',
    headerFound: false,
    footerFound: false,
    asideFound: false,
    javascript: ['addDoctor'],
  });
};

exports.addDoctorDB = (req, res) => {
  let {
    password,
    image
  } = req.body;
  if (image.trim().length == 0) {
    req.body.image = 'https://myblue.bluecrossma.com/sites/g/files/csphws636/files/inline-images/Doctor%20Image%20Desktop.png';
  }
  bcrypt.hash(password, saltRounds).then((hash) => {
    req.body.password = hash;
    insertDoctor(req.body).then((result) => {
      res.json((result.rows[0]));
    });
  });

};
