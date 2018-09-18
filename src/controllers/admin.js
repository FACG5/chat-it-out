const { insertArticle } = require('../model/queries/addData');

exports.get = (req, res) => {
  console.log(res.locals.unlockCookie);
  if (res.locals.unlockCookie.permission === 'admin') {
    res.render('admin', {
      title: 'Admin Panel', headerFound: true, footerFound: true, asideFound: true, style: ['admin', 'header', 'footer'], javascript: ['hamburger', 'admin'], login: (res.locals.unlockCookie === null), username: (res.locals.unlockCookie === null) ? 'Unkown' : res.locals.unlockCookie.username,
    });
  } else {
    res.clearCookie('jwt');
    res.redirect('/signIn');
  }
};

exports.addArticle = (req, res) => {
  insertArticle(req.body).then((result) => { res.json((result.rows[0])); });
};
