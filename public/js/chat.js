const hamburger = document.getElementById('hamburger');
const sliderbar = document.getElementById('slider_bar');
const aside = document.getElementById('aside');
const alter_header = document.getElementById('alter_header');
const header = document.getElementById('header');
const messages = document.getElementById('messages');
const messenger_space = document.getElementById('messenger_space');
const last_messages = document.getElementById('last_messages');
const back_btn = document.getElementById('back_btn');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    aside.classList.toggle('hide');
    sliderbar.classList.toggle('side');
    sliderbar.classList.toggle('hide_aside');
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
