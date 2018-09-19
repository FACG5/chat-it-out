const socket = require('socket.io');
const { verify } = require('jsonwebtoken');
const addMessage = require('./model/queries/addMessage');
const socketUsers = [];


// parse cookies and get and get specfic cookie by cname ;
function getCookie(cname, cookies) {
  const name = (`${cname}=`);
  const decodedCookie = cookies;
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

// check if username is already make connection and just refreash the page
const userExists = (userId) => {
  for (let i = 0; i < socketUsers.length; i++) {
    if (socketUsers[i].userId === userId) {
      socketUsers.splice(i, 1);
    }
  }
};

const checkExists = (userId) => {
  for (let i = 0; i < socketUsers.length; i++) {
    if (socketUsers[i].userId === userId) {
      return socketUsers[i];
    }
  }
  return false;
};

// Add New User To Socket NetWork
const addUser = (object, socketId) => {
  userExists(object.username);
  socketUsers.push({ userId: object.username, socketId });
};

// Send Message To Users
const sendMessage = (io, sender, reciver, msg) => {
  io.to(`${reciver.socketId}`).emit('data', {
    msg, sender,
  });
};

// Send Error To Sender
const sendError = (io, id) => {
  io.to(`${id}`).emit('error', {
    Error: '/chat',
  });
};

// Add Message to DB
const addDB = (message, senderId, reciver, io, callback) => {
  addMessage(message, (err) => {
    if (err) {
      sendError(io, senderId);
    } else if (typeof callback === 'function') {
      callback(io, message.sender, reciver, message.message);
    }
  });
};

// When the user open messenger ;
const socketConnection = (io) => {
  io.on('connection', (userSocket) => {
    const jwt = getCookie('jwt', userSocket.handshake.headers.cookie);
    verify(jwt, process.env.SECRET, (err, decodedCookie) => {
      if (err) {
        sendError(io, userSocket.id);
      } else {
        addUser(decodedCookie, userSocket.id);
        userSocket.on('data', (data) => {
          verify(data.reciver, process.env.SECRET, (err, decoded) => {
            if (err) {
              sendError(io, userSocket.id);
            } else {
              const reciver = checkExists(decoded.username);
              if (reciver) {
                addDB({ sender: decodedCookie.username, reciver: reciver.userId, message: data.message }, userSocket.id, reciver, io, sendMessage);
              } else {
                addDB({ sender: decodedCookie.username, reciver: reciver.userId, message: data.message }, userSocket.id, io);
              }
            }
          });
        });
      }
    });
  });
};

// Socket Fire (Start Point Just)
const socketConfig = (server) => {
  const sio = socket(server);
  socketConnection(sio);
};

module.exports = socketConfig;
