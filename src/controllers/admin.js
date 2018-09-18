exports.get = (req, res) => {
  if (res.locals.unlockCookie.permission === 'admin') {
    res.render('admin', {
      title: 'Admin Panel', headerFound: true, footerFound: true, asideFound: true, style: ['admin', 'header', 'footer'], javascript: ['hamburger', 'admin'], login: (res.locals.unlockCookie === null), username: (res.locals.unlockCookie === null) ? 'Unkown' : res.locals.unlockCookie.username,
    });
  } else {
    res.clearCookie('jwt');
    res.redirect('/signIn');
  }
};
