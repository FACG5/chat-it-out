exports.clientError = (req, res) => {
res.status(404).render('error', {
    title: 'Error',
    headerFound: false,
    footerFound: false,
    asideFound: false,
    style: ['public', 'error'],
    statusCode: '404',
    errorMsg: 'Page was not found !',
  });
};

exports.serverError = (err, req, res, next) => {
res.status(500).render('error', {
    title: 'Error',
    headerFound: false,
    footerFound: false,
    asideFound: false,
    style: ['public', 'error'],
    statusCode: '500',
    errorMsg: 'Internal Server Error'
  });
  next();
};
