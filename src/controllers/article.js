exports.get = (req, res) => {
  res.render('article', {
    headerFound: true, footerFound: true, asideFound: true, style: ['article', 'header', 'footer', 'public'], title: 'Article', javascript: ['hamburger'],
  });
};
