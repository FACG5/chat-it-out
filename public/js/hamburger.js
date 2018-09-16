const hamburger = document.getElementById('hamburger');
const sliderbar = document.getElementById('slider_bar');
const aside = document.getElementById('aside');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    aside.classList.toggle('hide');
    sliderbar.classList.toggle('side');
    sliderbar.classList.toggle('hide_aside');
  });
}
