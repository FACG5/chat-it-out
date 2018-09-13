const username = document.getElementById("user");
const email = document.getElementById("email");
const password = document.getElementById("pass");
const usernameErr = document.getElementById("usernameErr");
const emailErr = document.getElementById("emailErr");
const passErr = document.getElementById("passErr");
const usernameDiv = document.getElementsByClassName("username")[0];


// regex validation
const validUserName = /^[a-zA-Z0-9]{5,}$/;
const strongPassword = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
const mediumPassword = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


// username input field validation
username.addEventListener("input", () => {

    if (username.value.length === 0) {
        usernameErr.textContent = "Please fill the empty field";
    } else {
        if (!validUserName.test(username.value)) {
            usernameErr.textContent = "Try Again";
        }
        else usernameErr.textContent = "";
    }
});


// email input field validation 
email.addEventListener("input", () => {

    if (email.value.length === 0) {
        emailErr.textContent = "Please fill the empty field";
    } else {
        if (!validEmail.test(email.value)) {
            emailErr.textContent = "Please enter a proper email";
        }
        else emailErr.textContent = "";
    }
});

//password input field validation 
password.addEventListener("input", () => {
    if (password.value.length === 0) {
        passErr.textContent = "Please fill the empty field";
    } else {

        if (strongPassword.test(password.value)) {
            passErr.textContent = "strong";
            passErr.setAttribute('style', "color:green;");
        
        }
        else if (mediumPassword.test(password.value)) {
            passErr.textContent = "Meduim";
            passErr.setAttribute('style', "color:orange;");
        }
        else {
            passErr.textContent = "Weak";
            passErr.setAttribute('style', "color:red;");

        }
    }

})
