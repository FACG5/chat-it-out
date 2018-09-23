const { getArticle } = require('../model/queries/getData');

exports.get = (req, res, next) => {
  getArticle(req.params.id)
    .then((result) => {
      res.render('article', {
        title: 'Article ',
        headerFound: true,
        footerFound: true,
        style: ['article', 'header', 'footer', 'public'],
        javascript: ['hamburger'],
        article: result.rows[0],
        login: (res.locals.unlockCookie === null),
        username: (res.locals.unlockCookie === null) ? 'Unkown' : res.locals.unlockCookie.username,
        admin: res.locals.unlockCookie !== null ? res.locals.unlockCookie.permission === 'admin' : false,
      });
    }).catch((error) => {
      next(error);
    });
};
