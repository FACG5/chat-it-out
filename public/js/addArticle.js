const title = document.querySelector('#title');
const image = document.querySelector('#image');
const content = document.querySelector('#content');
const article = document.querySelector('#article');
const err = document.querySelector('#err');
const form = document.querySelector('.form');


article.addEventListener('click', () => {
  const obj = collectData();
  if (title.value.trim() && content.value.trim()) {
    fetch('/admin/addArticle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    }).then(response => response.json())
      .then((res) => {
        const success = document.createElement('h1');
        success.textContent = 'The post has been sent successfully';
        form.textContent = '';
        form.appendChild(success);
        setTimeout(() => {
          window.location = '/admin';
        }, 1000);
      })
      .catch(error => {
        form.textContent = '' + 'Internal server error';
      });
  } else {
    err.textContent = 'Please enter the empty fields';
  }
});
const collectData = () => ({
  title: title.value,
  img: image.value,
  body: content.value,
});
