exports.get = (req, res) => {
  res.render('admin', {
    title: 'Admin Panel', headerFound: true, footerFound: true, style: ['admin', 'header', 'footer'], javascript: ['hamburger', 'admin'],
  });
};