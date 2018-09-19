const { sign } = require('jsonwebtoken');
const AllUsers = require('./../model/queries/getAllUsers');
const getMessages = require('./../model/queries/getAllUserMessages');

// make token for every uesr
const makeToken = (users) => {
  const array = users.slice(0, users.length);
  for (let i = 0; i < array.length; (i += 1)) {
    const user = { username: array[i].user_name, permission: array[i].permission };
    array[i] = { username: array[i].user_name, token: sign(user, process.env.SECRET) };
  }
  return array;
};

// Render Chat Page ;
const renderChat = (req, res) => {
  let permission = 'doctor';
  if (res.locals.unlockCookie.permission === permission) {
    permission = 'patient';
  }
  AllUsers(permission, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const users = makeToken(result.rows);
      res.render('chat', {
        title: 'Messenger | Chat It Out', headerFound: true, footerFound: false, asideFound: true, style: ['chat', 'header'], javascript: ['hamburger', 'chat'], login: (res.locals.unlockCookie === null), username: (res.locals.unlockCookie === null) ? 'Unkown' : res.locals.unlockCookie.username, users,
      });
    }
  });
};

// Handling Chat (Get Method )
exports.get = (req, res) => {
  if (res.locals.unlockCookie) {
    if (res.locals.unlockCookie.permission !== 'admin') {
      renderChat(req, res);
    } else {
      res.clearCookie('jwt');
      res.redirect('/');
    }
  } else {
    res.clearCookie('jwt');
    res.redirect('/signIn');
  }
};

exports.post = (req, res) => {
  const { reciver } = req.body;
  const sender = res.locals.unlockCookie.username;
  getMessages({ reciver, sender }, (err, result) => {
    if (err) {
      res.send({ Error: '/' });
    } else {
      res.send(result.rows);
    }
  });
};
