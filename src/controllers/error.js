exports.clientError = (req, res) => {
  res.status(404).render('error', {
    title: 'Error 404',
    headerFound: false,
    footerFound: false,
    asideFound: false,
    style: ['error'],
    statusCode: '404',
    errorMsg: 'Page was not found !',
  });
};

exports.serverError = (err, req, res, next) => {
  res.status(500).render('error', {
    title: 'Error 500',
    headerFound: false,
    footerFound: false,
    asideFound: false,
    style: ['error'],
    statusCode: '500',
    errorMsg: 'Internal Server Error',
  });
  next();
};
