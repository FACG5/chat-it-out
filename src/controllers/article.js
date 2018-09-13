exports.get = (req, res) => {
  res.render('article', {
    headerFound: true, footerFound: true, style: ['article', 'header', 'footer'], title: 'Article',
  });
};
