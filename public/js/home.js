const nameField = document.getElementById("username");
const emailField = document.getElementById("email");
const titleField = document.getElementById("subject");
const contentField = document.getElementById("content");
const btn = document.getElementById("btn");
const errorname = document.getElementById("errname");
const erroremail = document.getElementById("erremail");
const errortitle = document.getElementById("errtitle");
const errorcontent = document.getElementById("errcontent");


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//making sure the fields aren't empty
const emptyName = ()=>{
    if (nameField.value.trim()) {
        return true;
    }
    else {
        errorname.textContent = "Empty Field";
    }
}
const emptyEmail = ()=>{
    if (emailField.value.trim()) {
        return true;
    }
    else {
        erroremail.textContent = "Empty Field"
    }
}
const emptyTitle = ()=>{
    
    if (titleField.value.trim()) {
        return true;
    }
    else {
        errortitle.textContent = "Empty Field"
    }
}
const emptyContent = ()=>{
    if (contentField.value.trim()) {
        return true;
    }
    else {
        errorcontent.textContent = "Empty Field"
    }
}

//add event listener to the btn to send the data
btn.addEventListener("click", () => {
    const objData = {
        name: nameField.value,
        email: emailField.value,
        title: titleField.value,
        content: contentField.value,
}
if ((emptyName() && emptyEmail() && emptyTitle() && emptyContent())){
    if (validateEmail(emailField.value.trim())) {
    fetch("/contactUs", {
        body: JSON.stringify(objData),
        method: "POST",
        headers: { "Content-Type": "application/json" }
    }).then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err));
alert('enter');
} else {
    erroremail.textContent = "Please Enter Vaild Email ." ;
}
}
});