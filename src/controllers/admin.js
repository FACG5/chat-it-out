exports.get = (req, res) => {
  console.log(req.unlockCookie);
  if (req.unlockCookie.permission === 'admin') {
    res.render('admin', {
      title: 'Admin Panel', headerFound: true, footerFound: true, asideFound: true, style: ['admin', 'header', 'footer'], javascript: ['hamburger', 'admin'],
    });
  } else {
    res.clearCookie('jwt');
    res.redirect('/signIn');
  }
};
