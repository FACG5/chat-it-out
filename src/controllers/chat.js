exports.get = (req, res, next) => {
  res.render('chat', {
    title: 'Messenger Page || Chat It Out', headerFound: true, footerFound: false, style: ['chat', 'header'], javascript: ['chat'],
  });
}
