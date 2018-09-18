const { getArticle } = require('../model/queries/getData');

exports.get = (req, res, next) => {
  getArticle(req.params.id)
    .then((result) => {
      res.render('article', {
        title: 'Article ',
        headerFound: true,
        footerFound: true,
        style: ['article', 'header', 'footer', 'public'],
        javascript: ['hambruger'],
        article: result.rows[0]
      });
    }).catch((error) => {
      next(error);
    });
};
