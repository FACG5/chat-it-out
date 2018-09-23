exports.get = (req, res) => {
  res.render('addDoctor', {
    title: 'Add Doctor',
    headerFound: true,
    footerFound: true,
    asideFound: true,
    style: ['addDoctor', 'header', 'footer'],
    javascript: ['hamburger'],
    login: (res.locals.unlockCookie === null),
    username: (res.locals.unlockCookie === null) ? 'Unkown' : res.locals.unlockCookie.username,
  });
};
