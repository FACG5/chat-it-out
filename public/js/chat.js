const headerTag = document.getElementById('header');
const lastMessages = document.getElementById('messages');
const messengerSpaceTag = document.getElementById('messenger_space');
const lastMessagesTag = document.getElementById('last_messages');
const backBtn = document.getElementById('back_btn');
const alterHeaderTag = document.getElementById('alter_header');
const input = document.getElementById('message_sender');
const messenger = document.getElementById('messenger');
const userslist = document.getElementById('userslist');

const socket = io();

function changeHeaderVisibility(lastMessages, messengerSpace, header, alterHeader) {
  lastMessagesTag.setAttribute('style', `display:${lastMessages};`);
  messengerSpaceTag.setAttribute('style', `display:${messengerSpace};`);
  headerTag.setAttribute('style', `display:${header};`);
  if (alterHeader) {
    alterHeaderTag.setAttribute('style', `display:${alterHeader};`);
  }
}

userslist.addEventListener('click', (event) => {
  if (window.innerWidth < 750 && event.target.tagName !== 'UL') {
    changeHeaderVisibility('none', 'block', 'none', 'flex');
  }
});

backBtn.addEventListener('click', () => {
  if (window.innerWidth < 750) {
    changeHeaderVisibility('block', 'none', 'flex', 'none');
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 750) {
    changeHeaderVisibility('block', 'block', 'flex', 'none');
  } else {
    changeHeaderVisibility('block', 'none', 'flex');
  }
});

// create messages and add thier to div
function createMessage(content, direction) {
  // Create Elements ;
  const message = document.createElement('div');
  const messageDirection = document.createElement('div');
  const text = document.createElement('p');
  const messenger_space = document.getElementById('messenger_space');
  // Add Content ;
  text.textContent = content;
  // Add Classes ;
  message.classList.add('message');
  messageDirection.classList.add(direction);
  // Nesting Elements ;
  messageDirection.appendChild(text);
  message.appendChild(messageDirection);
  messenger_space.appendChild(message);
  // For Scroll Down When Add New Message
  messenger_space.scrollTop = messenger_space.scrollHeight;
}

// Send message to sockets network
input.addEventListener('keyup', (event) => {
  if (event.keyCode === 13 && event.target.value.trim()) {
    socket.emit('data', ({
      message: event.target.value,
      reciver: messenger.getAttribute('token'),
    }));
    createMessage(event.target.value, 'right');
    changeLastMessageOrder(messenger.getAttribute('username'), event.target.value, messenger.getAttribute('token'));
    event.target.value = '';
  }
});

socket.on('data', (data) => {
  const messengerUser = messenger.getAttribute('username');
  const userToken = messenger.getAttribute('token');

  if (messengerUser === data.sender) {
    createMessage(data.msg, 'left');
    changeLastMessageOrder(data.sender, data.msg, userToken);
  } else {
    notifyMe(data.sender, data.msg);
    changeLastMessageOrder(data.sender, data.msg, userToken);
  }
});

// change the reciver ;
const newMessengerConfig = (jwt, username) => {
  messenger.setAttribute('username', username);
  messenger.setAttribute('token', jwt);
  const messenger_space = messenger.getElementsByClassName('messenger_space');
  const usernameSpan = messenger.getElementsByTagName('span')[0];
  usernameSpan.textContent = username;
  messenger_space[0].textContent = '';
  fetch('/chat', ({
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reciver: username }),
  })).then(res => res.json())
    .then((res) => {
      if (res.Error) {
        window.location = res.Error;
      } else {
        for (let i = 0; i < res.length; i += 1) {
          createMessage(res[i].message, (res[i].receiver === username) ? 'right' : 'left');
        }
      }
    })
    .catch(err => console.log(err));
};

// get jwt and id from li div
const getConfig = (element) => {
  const jwt = (element.id);
  const username = (element.getAttribute('username'));
  newMessengerConfig(jwt, username);
};

// change the messenger space
lastMessages.addEventListener('click', (e) => {
  if (e.target && e.target.nodeName !== 'UL') {
    if (e.target.nodeName === 'LI') { getConfig(e.target); }
  }
}, true);

// change users
userslist.addEventListener('click', (e) => {
  if (e.target && e.target.nodeName !== 'UL') {
    if (e.target.nodeName === 'LI') { getConfig(e.target); }
  }
}, true);


// Handling Errors ;
socket.on('error', (data) => {
  alert('Something Went Wrong , Sorry');
  window.location = data.Error;
});

// Push Notification ;
document.addEventListener('DOMContentLoaded', () => {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.');
    return;
  }

  if (Notification.permission !== 'granted') { Notification.requestPermission(); }
});

function notifyMe(sender, message) {
  if (Notification.permission !== 'granted') { Notification.requestPermission(); } else {
    const notification = new Notification(sender, {
      icon: 'https://static.thenounproject.com/png/1211643-200.png',
      body: message,
    });
  }
}
const makeLiveTag = (data, usersList) => {
  const users = usersList.children;
  let done = false;
  for (let i = 0; i < users.length; i += 1) {
    for (let j = 0; j < data.userslist.length; j += 1) {
      if (users[i].getAttribute('username') === data.userslist[j]) {
        users[i].getElementsByClassName('live_logo')[0].setAttribute('style', 'display:flex;');
        done = true;
      }
    }
    if (!done) {
      users[i].getElementsByClassName('live_logo')[0].setAttribute('style', 'display:none;');
    }
  }
};

socket.on('live', (data) => {
  // For Users List (Right Side);
  makeLiveTag(data, userslist);
  // For Last Messages (Left Side) ;   
  makeLiveTag(data, lastMessages);
});


const createNewListMessage = (username, newMessage, token) => {
  const li = document.createElement('li');
  const message = document.createElement('div');
  const usernameTag = document.createElement('span');
  const liveLogo = document.createElement('span');
  const liveCircle = document.createElement('span');
  const liveWord = document.createElement('span');
  const lastMessage = document.createElement('span');

  // Add Content ;
  li.setAttribute('username', username);
  li.setAttribute('id', token);
  message.classList.add('message');
  usernameTag.classList.add('username');
  usernameTag.textContent = username;
  liveLogo.classList.add('live_logo');
  liveLogo.setAttribute('id', 'live_logo');
  liveCircle.classList.add('live_circle');
  liveWord.classList.add('live_word');
  liveWord.textContent = 'Live';
  lastMessage.classList.add('last_message');
  lastMessage.textContent = newMessage;

  li.appendChild(message);
  li.appendChild(liveLogo);
  li.appendChild(lastMessage);
  message.appendChild(usernameTag);
  liveLogo.appendChild(liveCircle);
  liveLogo.appendChild(liveWord);
  lastMessages.insertBefore(li, lastMessages.firstChild);
};

const changeLastMessageOrder = (username, newMessage, token) => {
  const { children } = lastMessages;
  let done = false;
  for (let i = 0; i < children.length; i += 1) {
    if (children[i].getAttribute('username') === username) {
      const newChild = children[i];
      newChild.getElementsByClassName('last_message')[0].textContent = newMessage;
      lastMessages.removeChild(newChild);
      lastMessages.insertBefore(newChild, lastMessages.firstChild);
      done = true;
    }
  }
  if (!done) { createNewListMessage(username, newMessage, token); }
};
window.onunload = () => {
  socket.disconnect();
};
