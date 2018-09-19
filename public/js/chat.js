const headerTag = document.getElementById('header');
const userslist = document.getElementById('messages');
const messengerSpaceTag = document.getElementById('messenger_space');
const lastMessagesTag = document.getElementById('last_messages');
const backBtn = document.getElementById('back_btn');
const alterHeaderTag = document.getElementById('alter_header');
const input = document.getElementById('message_sender');
const messenger = document.getElementById('messenger');
const socket = io();

function changeHeaderVisibility(lastMessages, messengerSpace, header, alterHeader) {
  lastMessagesTag.setAttribute('style', `display:${lastMessages};`);
  messengerSpaceTag.setAttribute('style', `display:${messengerSpace};`);
  headerTag.setAttribute('style', `display:${header};`);
  if (alterHeader) {
    alterHeaderTag.setAttribute('style', `display:${alterHeader};`);
  }
};

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

// create messages and add these to div  
function createMessage(content, direction) {
  const message = document.createElement('div');
  const messageDirection = document.createElement('div');
  const text = document.createElement('p')
  const messenger_space = document.getElementById('messenger_space');
  text.textContent = content;
  message.classList.add('message');
  messageDirection.classList.add(direction);
  messageDirection.appendChild(text);
  message.appendChild(messageDirection);
  messenger_space.appendChild(message);
  messenger_space.scrollTop = messenger_space.scrollHeight;
}

// Send message to sockets network
input.addEventListener('keyup', (event) => {

  if (event.keyCode === 13) {
    socket.emit('data', ({
      message: event.target.value,
      reciver: messenger.getAttribute('token'),
    }));
    createMessage(event.target.value, 'right');
    event.target.value = '';
  }
});

socket.on('data', (data) => {
  const elements = document.querySelectorAll("[username=\"" + data['sender'] + "\"]");
  const messengerUser = messenger.getAttribute('username');
  if (messengerUser === data.sender) {
    createMessage(data['msg'], 'left');
  } else {
    notifyMe(data.sender, data.msg);
  }
});

// change the reciver ;
const newMessengerConfig = (jwt, username) => {
  messenger.setAttribute('username', username);
  messenger.setAttribute('token', jwt);
  const allMessages = messenger.getElementsByClassName('messenger_space');
  const usernameSpan = messenger.getElementsByTagName('span')[0];
  usernameSpan.textContent = username;
  allMessages[0].innerHTML = '';
  fetch('/chat', ({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reciver: username })
  })).then(res => res.json())
    .then((res) => {
      if (res.Error) {
        window.location = res.Error;
      } else {
        for (let i = 0; i < res.length; i++) {
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
userslist.addEventListener('click', (e) => {
  if (e.target && e.target.nodeName !== 'UL') {
    if (e.target.nodeName === 'LI') {
      getConfig(e.target);
    } else if (e.target.nodeName === 'DIV') {
      getConfig((e.target).parentElement);
    } else {
      getConfig(((e.target).parentElement).parentElement);
    }
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

  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

function notifyMe(sender, message) {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    let notification = new Notification(sender, {
      icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
      body: message,
    });
    notification.onclick = function () {
      window.open("http://stackoverflow.com/a/13328397/1269037");
    };
  }
};
