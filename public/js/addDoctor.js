const name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const addDoctorB = document.querySelector('#addDoctorB');
const nameErr = document.querySelector('.nameErr');
const emailErr = document.querySelector('.emailErr');
const passwordErr = document.querySelector('.passwordErr');
const doctorimg = document.querySelector('#doctorimg');
const doctordesc = document.querySelector('#doctordesc');
const descErr = document.querySelector('.descErr');

// displaying error msg
const displayErr = (errElem, errMsg) => {
  errElem.textContent = errMsg;
  errElem.style = 'color:red;';
};

// Get the text box values when invoke the function
const collectData = () => ({
  name: name.value,
  email: email.value,
  password: password.value,
  image: doctorimg.value,
  description: doctordesc.value,
});

// check doctor name value
const checkName = () => {
  if (name.value.trim().length == 0) {
    displayErr(nameErr, 'Please Enter a Name ');
  } else {
    displayErr(nameErr, '');
    return true;
  }
};
// check doctor email validity
const checkEmail = () => {
  if (email.validity.patternMismatch) {
    displayErr(emailErr, 'Please enter a valid email address');
  } else if (email.value.trim().length == 0) {
    displayErr(emailErr, 'Please enter an email address');
  } else {
    displayErr(emailErr, '');
    return true;
  }
};
// check doctor password validity
const checkPw = () => {
  if (password.validity.patternMismatch) {
    displayErr(passwordErr, 'Password must contain at least eight characters, including one letter and one number');
  } else if (password.validity.valueMissing) {
    displayErr(passwordErr, 'Please enter a password');
  } else {
    displayErr(passwordErr, '');
    return true;
  }
};

// check doctor description exist
const checkDescription = () => {
  if (doctordesc.value.trim().length == 0) {
    displayErr(descErr, 'Please Enter The Doctor description ');
  } else {
    displayErr(descErr, '');
    return true;
  }
};

// the function is run when all the values (-img) does exist
const handleResponse = (response) => {
  if (response.Error) { passwordAlert(response.Error, 'red;font-weight:500;'); } else { window.location = response.result; }
};

// Show Error Message
const passwordAlert = (content, style) => {
  descErr.textContent = content;
  descErr.setAttribute('style', `color:${style};`);
};


const send = () => {
  if (checkName() && checkEmail() && checkPw() && checkDescription()) {
    const obj = collectData();
    fetch('/addDoctor', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    }).then(res => res.json())
      .then(handleResponse)
      .catch(() => {
        passwordAlert('Sorry There Is Error');
      });
  }
};
name.addEventListener('focusout', checkName);
email.addEventListener('focusout', checkEmail);
password.addEventListener('focusout', checkPw);
doctordesc.addEventListener('focusout', checkDescription);
addDoctorB.addEventListener('click', send);
