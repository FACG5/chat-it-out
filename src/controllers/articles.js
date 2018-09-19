const { getArticles } = require('../model/queries/getData');

exports.get = (req, res, next) => {
  getArticles()
    .then((result) => {
      res.render('articles', {
        title: 'Articles ',
        headerFound: true,
        footerFound: true,
        asideFound: true,
        style: ['articles', 'header', 'footer', 'public'],
        javascript: ['hamburger'],
        articlesArray: result.rows,
        login: (res.locals.unlockCookie === null),
        username: (res.locals.unlockCookie === null) ? 'Unkown' : res.locals.unlockCookie.username,
      });
    }).catch((error) => {
      next(error);
    });
};
