exports.get = (req, res) => {
  res.render('doctors', {
    title: 'Doctors || Chat It Out', headerFound: true, footerFound: true, asideFound: true, style: ['doctors', 'header', 'footer'], javascript: ['hamburger']
    ,
  });
};
