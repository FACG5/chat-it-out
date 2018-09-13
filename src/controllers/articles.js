exports.get = (req, res) => {
  res.render('articles', {
    title: 'Articles ', headerFound: true, footerFound: true, style: ['articles', 'header', 'footer'], javascript: ['hambruger'],
});
};
