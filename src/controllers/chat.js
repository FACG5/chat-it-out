exports.get = (req, res) => {
  res.render('chat', {
    title: 'Messenger Page || Chat It Out', headerFound: true, footerFound: false, style: ['chat', 'header'], javascript: ['chat'],
  });
};
