const getData = require('../model/database/queries/getData');

exports.get = (req, res) => {
  getData.getArticles()
    .then((result) => {
      const articlesArray = result.rows;
      res.render('articles', {
        title: 'Articles ',
        headerFound: true,
        footerFound: true,
        style: ['articles', 'header', 'footer', 'public'],
        javascript: ['hambruger'],
        articlesArray,
      });
    }).catch((error) => {
      res.send(error);
    });
};
