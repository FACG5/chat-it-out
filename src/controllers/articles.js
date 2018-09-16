const { getArticles } = require('../model/queries/getData');

exports.get = (req, res, next) => {
  getArticles()
    .then((result) => {
      res.render('articles', {
        title: 'Articles ',
        headerFound: true,
        footerFound: true,
        style: ['articles', 'header', 'footer', 'public'],
        javascript: ['hambruger'],
        articlesArray: result.rows
      });
    }).catch((error) => {
      next(error);
    });
};
