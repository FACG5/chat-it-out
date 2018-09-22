const { sign } = require('jsonwebtoken');
const AllUsers = require('./../model/queries/getAllUsers');
const lastMessages = require('./../model/queries/lastMessages');
const getMessages = require('./../model/queries/getAllUserMessages');

// make token for every uesr
const makeLastMessageToken = (sessionUsers, users) => {
  const array = [];
  let length = users.length;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (users[i].sender === users[j].receiver && users[i].receiver === users[j].sender) {
        users.splice(i, 1);
        length--;
        i--;
        break;
      }
    }
  }
  length = users.length;
  for (let i = 0; i < length; i++) {
    if (users[i]['sender'] === sessionUsers) {
      const token = sign({ username: users[i].receiver }, process.env.SECRET);
      array.push({
        username: users[i].receiver,
        message: users[i].message,
        token,
      });
    } else {
      const token = sign({ username: users[i].sender }, process.env.SECRET);
      array.push({
        username: users[i].sender,
        message: users[i].message,
        token,
      });
    }
  }
  return array;
};


// make token for every uesr
const makeUsersToken = (users) => {
  const array = users.slice(0, users.length);
  for (let i = 0; i < array.length; (i += 1)) {
    const user = { username: array[i].user_name, permission: array[i].permission };
    array[i] = { username: array[i].user_name, token: sign(user, process.env.SECRET) };
  }
  return array;
};

const renderChat = (req, res) => {
  const { username } = res.locals.unlockCookie;
  lastMessages(username, (err, result) => {
    if (err) {
      res.redirect('/');
    } else {
      const lastMessages = makeLastMessageToken(username, result.rows).reverse();
       getAllUsers(req, res, (users) => {
        res.render('chat', {
          title: 'Messenger | Chat It Out',
          headerFound: true,
          footerFound: false,
          asideFound: true,
          style: ['chat', 'header'],
          javascript: ['hamburger', 'chat'],
          login: (res.locals.unlockCookie === null),
          username: (res.locals.unlockCookie === null) ? 'Unkown' : res.locals.unlockCookie.username,
          lastMessages,
          users,
          admin: res.locals.unlockCookie !== null ? res.locals.unlockCookie.permission === 'admin' : false,
        });
      });
      // const usersToken = makeUsersToken(uesrs);
    }
  });
};


// Render Chat Page ;
const getAllUsers = (req, res, callback) => {
  let permission = 'doctor';
  if (res.locals.unlockCookie.permission === permission) {
    permission = 'patient';
  }
  AllUsers(permission, (err, result) => {
    if (err) {
      res.redirect('/');
    } else {
      const users = makeUsersToken(result.rows);
      callback(users);
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
  const recvierObject = req.body;
  const { username } = res.locals.unlockCookie;
  getMessages({ username, reciver: recvierObject.reciver }, (err, result) => {
    if (err) {
      res.send({ Error: '/' });
    } else {
      res.send(result.rows);
    }
  });
};

