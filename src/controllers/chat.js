exports.get = (req, res) => {
  if (res.locals.unlockCookie) {
    if (res.locals.unlockCookie.permission !== 'admin') {
      res.render('chat', {
        title: 'Messenger | Chat It Out', headerFound: true, footerFound: false, asideFound: true, style: ['chat', 'header'], javascript: ['hamburger', 'chat'], login: (res.locals.unlockCookie === null), username: (res.locals.unlockCookie === null) ? 'Unkown' : res.locals.unlockCookie.username,
      });
    } else {
      res.clearCookie('jwt');
      res.redirect('/signIn');
    }
  } else {
    res.clearCookie('jwt');
    res.redirect('/signIn');
  }
};
