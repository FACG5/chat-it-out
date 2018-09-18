const { insertArticle } = require('../model/queries/addData');

exports.get = (req, res) => {
  res.render('admin', {
    title: 'Admin Panel', headerFound: true, footerFound: true, asideFound: true, style: ['admin', 'header', 'footer'], javascript: ['hamburger', 'admin', 'addArticle'],
  });
};

exports.addArticle = (req, res) => {
  insertArticle(req.body).then((result) => { res.json((result.rows[0])); });
};
