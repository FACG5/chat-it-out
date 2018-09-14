exports.get = (req, res) => {
  res.render('admin', {
    title: 'Admin Panel', headerFound: true, style: ['admin', 'header'], javascript: ['hamburger', 'admin'],
  });
};
