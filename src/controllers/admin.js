exports.get = (req, res) => {
  res.render('admin', {
    title: 'Admin Panel', headerFound: true, style: ['header', 'admin'], javascript: ['hamburger', 'admin'],
  });
};
