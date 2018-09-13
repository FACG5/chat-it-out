
const header = document.getElementById('header');
const messages = document.getElementById('messages');
const messenger_space = document.getElementById('messenger_space');
const last_messages = document.getElementById('last_messages');
const back_btn = document.getElementById('back_btn');

messages.addEventListener('click', (event) => {

  if (window.innerWidth < 750 && event.target.tagName !== 'UL') {
    headerVisible('none', 'block', 'none', 'flex');
  }

});
back_btn.addEventListener('click', () => {

  if (window.innerWidth < 750) {
    headerVisible('block', 'none', 'flex', 'none');
  }

});
window.addEventListener('resize', () => {

  if (window.innerWidth > 750) {
    headerVisible('block', 'block', 'flex', 'none');
  } else {
    last_messages.setAttribute('style', 'display:block');
    messenger_space.setAttribute('style', 'display:none');
    header.setAttribute('style', 'display:flex');
  }

});
const headerVisible = (last_messages, messenger_space, header, alter_header) => {
  last_messages.setAttribute('style', `display:${last_messages};`);
  messenger_space.setAttribute('style', `display:${messenger_space};`);
  header.setAttribute('style', `display:${header};`);
  alter_header.setAttribute('style', `display:${alter_header};`);
};
