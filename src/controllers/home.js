const data = require('./../model/services');

exports.get = (req, res) => {
  res.render('home', {
    title: 'chat it out', headerFound: true, footerFound: true, asideFound: true, style: ['home', 'footer', 'header', 'public'], javascript: ['home', 'hamburger'], services: data.services, login: (res.locals.unlockCookie === null), username: (res.locals.unlockCookie === null) ? 'Unkown' : res.locals.unlockCookie.username,
  });
};
