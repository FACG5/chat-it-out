exports.get = (req, res) => {
  if (req.unlockCookie.permission === 'admin') {
    res.render('admin', {
      title: 'Admin Panel', headerFound: true, footerFound: true, asideFound: true, style: ['admin', 'header', 'footer'], javascript: ['hamburger', 'admin'], login: (req.unlockCookie === null), username: (req.unlockCookie === null) ? 'Unkown' : req.unlockCookie.username,
    });
  } else {
    res.clearCookie('jwt');
    res.redirect('/signIn');
  }
};
