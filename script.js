
var loginForm = document.getElementById("login");
var registerForm = document.getElementById("register");
var btn = document.getElementById("btn");

function register(){
    loginForm.style.left = "-400px";
    registerForm.style.left = "50px";
    btn.style.left = "110px";
}

function login(){
    loginForm.style.left = "50px";
    registerForm.style.left = "450px";
    btn.style.left = "0px";
}

function togglePassword(id){
    const input = document.getElementById(id);
    input.type = input.type === "password" ? "text" : "password";
}

/* Password Strength */
const passwordInput = document.getElementById("registerPassword");
const strengthBar = document.getElementById("strengthBar");

passwordInput.addEventListener("input", () => {
    let value = passwordInput.value;
    let strength = 0;

    if(value.length >= 6) strength += 25;
    if(value.match(/[A-Z]/)) strength += 25;
    if(value.match(/[0-9]/)) strength += 25;
    if(value.match(/[^A-Za-z0-9]/)) strength += 25;

    strengthBar.style.width = strength + "%";

    if(strength <= 25) strengthBar.style.background = "red";
    else if(strength <= 50) strengthBar.style.background = "orange";
    else if(strength <= 75) strengthBar.style.background = "yellow";
    else strengthBar.style.background = "green";
});

/* Register */
registerForm.addEventListener("submit", function(e){
    e.preventDefault();

    const pass = document.getElementById("registerPassword").value;
    const confirm = document.getElementById("confirmPassword").value;
    const error = document.getElementById("registerError");

    if(pass !== confirm){
        error.textContent = "Passwords do not match!";
        registerForm.classList.add("shake");
        setTimeout(()=>registerForm.classList.remove("shake"),300);
        return;
    }

    localStorage.setItem("userEmail", document.getElementById("registerEmail").value);
    localStorage.setItem("userPassword", pass);

    alert("Registration Successful!");
    login();
});

/* Login */
loginForm.addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const pass = document.getElementById("loginPassword").value;
    const error = document.getElementById("loginError");

    const storedEmail = localStorage.getItem("userEmail");
    const storedPass = localStorage.getItem("userPassword");

    if(email === storedEmail && pass === storedPass){
        if(document.getElementById("rememberMe").checked){
            localStorage.setItem("rememberUser", email);
        }
        alert("Login Successful!");
    } else {
        error.textContent = "Invalid Email or Password!";
        loginForm.classList.add("shake");
        setTimeout(()=>loginForm.classList.remove("shake"),300);
    }
});

/* Auto-fill Remembered User */
window.onload = function(){
    const remembered = localStorage.getItem("rememberUser");
    if(remembered){
        document.getElementById("loginEmail").value = remembered;
    }
};
