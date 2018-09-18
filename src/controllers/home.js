const data = require('./../model/services');

exports.get = (req, res) => {
  res.render('home', {
    title: 'chat it out', headerFound: true, footerFound: true, asideFound: true, style: ['home', 'footer', 'header', 'public'], javascript: ['home', 'hamburger'], services: data.services, login: (req.unlockCookie === null), username: (req.unlockCookie === null) ? 'Unkown' : req.unlockCookie.username,
  });
};
