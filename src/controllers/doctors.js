const { getDoctors } = require('../model/queries/getData.js');

exports.get = (req, res) => {
  getDoctors().then((result) => {
    res.render('doctors', {
      title: 'Doctors || Chat It Out',
      headerFound: true,
      footerFound: true,
      asideFound: true,
      style: ['doctors', 'header', 'footer'],
      javascript: ['hamburger'],
      arrayOfDoctors: result.rows,
    });
  });
};
