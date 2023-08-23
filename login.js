const form = document.getElementById('login-form');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', e => {
    e.preventDefault();
    checkInputs();
});

function checkInputs(){
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
    } else {
        setSuccessFor(email);
    }
    if(passwordValue.length<6) {
        setErrorFor(password, 'Password must be of 6 characters');
    } else {
        setSuccessFor(password);
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'input-box error';
    small.innerText = message;
}
function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'input-box success';
}
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function myLogPassword(){
    var a=document.getElementById('password');
    var b=document.getElementById('eye');
    var c=document.getElementById('eye-slash');
    if(a.type==="password"){
        a.type='text'
        b.style.opacity="0"
        c.style.opacity="1"
    }
    else{
        a.type="password"
        b.style.opacity="1"
        c.style.opacity="0"
    }
}

function sub(){
    if(email.value==="harman@gmail.com" && password.value==="123456"){
        window.location.assign("index.html");
    }
    else{
        alert("Oh!!! Please enter your correct details");
    }
}