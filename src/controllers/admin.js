const { insertArticle } = require('../model/queries/addData');

exports.get = (req, res) => {
  if (res.locals.unlockCookie) {
    if (res.locals.unlockCookie.permission === 'admin') {
      res.render('admin', {
        title: 'Admin Panel',
        headerFound: true,
        footerFound: true,
        asideFound: true,
        style: ['admin', 'header', 'footer'],
        javascript: ['hamburger', 'addArticle'],
        login: (res.locals.unlockCookie === null),
        username: (res.locals.unlockCookie === null) ? 'Unkown' : res.locals.unlockCookie.username,
        admin: true,
      });
    } else {
      res.clearCookie('jwt');
      res.redirect('/');
    }
  } else {
    res.clearCookie('jwt');
    res.redirect('/signin');
  }
};

exports.addArticle = (req, res) => {
  console.log(req.body);
  insertArticle(req.body).then((result) => { res.json((result.rows[0])); });
};
