const nameField = document.getElementById('username');
const emailField = document.getElementById('email');
const titleField = document.getElementById('subject');
const contentField = document.getElementById('content');
const btn = document.getElementById('btn');
const alertField = document.getElementById('alertField');

// function that returns the values of the contact us section ;
const objData = () => {
  const dataObject =
  {
    name: nameField.value,
    email: emailField.value,
    title: titleField.value,
    content: contentField.value,
  };
  titleField.value = '';
  nameField.value = '';
  contentField.value = '';
  emailField.value = '';
  return dataObject;
};

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// add event listener to the btn to send the data
btn.addEventListener('click', () => {
  if ((nameField.value.trim() && emailField.value.trim() && titleField.value.trim() && contentField.value.trim())) {
    if (validateEmail(emailField.value)) {
      fetch('/contactUs', {
        body: JSON.stringify(objData()),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then((res) => {
          alertField.textContent = res.result;
          setTimeout(() => {
            alertField.textContent = '';
          }, 1000);
        }).catch(err => window.location = '/');
    } else {
      alertField.textContent = 'Please Enter Vaild Email';
    }
  } else {
    alertField.textContent = 'Please Fill Fields';
  }
});
