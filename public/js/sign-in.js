const username = document.getElementById("username");
const password = document.getElementById("password");
const userErr = document.getElementById("usernameErr");
const passErr = document.getElementById("passErr");

//username input feild validation 
username.addEventListener("input", () => {
    if (username.value.length === 0) {
        userErr.textContent = "Please type in your username";
        setTimeout(() => {
            userErr.textContent = '';
        }, 3000);
    }
})
password.addEventListener("input", () => {
    if (password.value.length === 0) {
        passErr.textContent = "Please type in your password";
        setTimeout(() => {
            passErr.textContent = '';
        }, 3000);
    }
})