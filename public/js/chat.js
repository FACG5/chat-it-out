
const headerTag = document.getElementById('header');
const messagesTag = document.getElementById('messages');
const messengerSpaceTag = document.getElementById('messenger_space');
const lastMessagesTag = document.getElementById('last_messages');
const backBtn = document.getElementById('back_btn');
const alterHeaderTag = document.getElementById('alter_header');

messagesTag.addEventListener('click', (event) => {
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

function changeHeaderVisibility(lastMessages, messengerSpace, header, alterHeader) {

  lastMessagesTag.setAttribute('style', `display:${lastMessages};`);
  messengerSpaceTag.setAttribute('style', `display:${messengerSpace};`);
  headerTag.setAttribute('style', `display:${header};`);
  if (alterHeader) {
    alterHeaderTag.setAttribute('style', `display:${alterHeader};`);
  }

};
