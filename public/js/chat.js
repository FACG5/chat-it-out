const hamburger = document.getElementsByClassName('huhamburger')[0];
const aside = document.querySelectorAll('aside .hide_aside')[0];
const side = document.getElementsByTagName('aside')[0];
const alter_header = document.getElementsByClassName('alter_header')[0];
const header = document.getElementsByTagName('header')[0];
const messages = document.querySelectorAll('.main_section .last_messages ul')[0];
const messenger_space = document.querySelector(' main .main_section .messenger');
const last_messages = document.querySelector('main .main_section .last_messages');
const back_btn = document.querySelector('.alter_header i');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    side.classList.toggle('hide');
    aside.classList.toggle('side');
    aside.classList.toggle('hide_aside');
  });
}

messages.addEventListener('click', (event) => {
  if (window.innerWidth < 750 && event.target.tagName !== 'UL') {
    last_messages.setAttribute('style', 'display:none');
    messenger_space.setAttribute('style', 'display:block');
    header.setAttribute('style', 'display:none');
    alter_header.setAttribute('style', 'display:flex');
  }
});

back_btn.addEventListener('click', (event) => {
  if (window.innerWidth < 750) {
    last_messages.setAttribute('style', 'display:block');
    messenger_space.setAttribute('style', 'display:none');
    header.setAttribute('style', 'display:flex');
    alter_header.setAttribute('style', 'display:none');
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 750) {
    last_messages.setAttribute('style', 'display:block');
    messenger_space.setAttribute('style', 'display:block');
    header.setAttribute('style', 'display:flex');
    alter_header.setAttribute('style', 'display:none');
  } else {
    last_messages.setAttribute('style', 'display:block');
    messenger_space.setAttribute('style', 'display:none');
    header.setAttribute('style', 'display:flex');
  }
});
