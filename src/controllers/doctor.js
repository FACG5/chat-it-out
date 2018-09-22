const { getDoctor } = require('./../model/queries/getData');

exports.get = (req, res, next) => {
  getDoctor(req.params.id).then((result) => {
    if (result.rowCount !== 0) {
      res.render('doctor', {
        title: 'Doctor ',
        headerFound: true,
        footerFound: true,
        style: ['public', 'header', 'footer', 'doctor'],
        javascript: ['hamburger'],
        doctor: result.rows[0],
        login: (res.locals.unlockCookie === null),
        username: (res.locals.unlockCookie === null) ? 'Unkown' : (res.locals.unlockCookie.username),
      });
    } else {
      next();
    }
  });
};
