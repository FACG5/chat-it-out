const username = document.getElementById('username');
const password = document.getElementById('password');
const userErr = document.getElementById('usernameErr');
const passErr = document.getElementById('passErr');
const btn = document.getElementById('btn');

// username input feild validation
username.addEventListener('input', () => {
  if (username.value.length === 0) {
    userErr.textContent = 'Please type in your username';
    setTimeout(() => {
      userErr.textContent = '';
    }, 3000);
  }
});
password.addEventListener('input', () => {
  if (password.value.length === 0) {
    passErr.textContent = 'Please type in your password';
    setTimeout(() => {
      passErr.textContent = '';
    }, 3000);
  }
});

const collectData = () => ({
  username: username.value,
  password: password.value,
});

btn.addEventListener('click', () => {
  if (username.value && password.value) {
    fetch('/signIn', ({
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(collectData()),
    })).then(res => res.json())
      .then((res) => {
        if (res.Error) {
          passErr.textContent = res.Error;
        } else { window.location = '/'; }
      })
      .catch(() => {
        passErr.textContent = 'There Is Error , Sorry';
      });
  }
});
