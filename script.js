import { isValidEmail, isValidPassword } from './regex.js';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const inputEmail = document.getElementById("input-email");
const inputPassword = document.getElementById("input-password");
const inputName = document.getElementById("input-name");
const btnRegister = document.getElementById("btn-register");
const bntSignin = document.getElementById("btn-signin");

const user = {
    email: "",
    password: "",
    name: "",
    movies: []
}

function userRegister() {
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify([]))
    };
}

userRegister();
 //TODO: Verify is password has more than 6 characters, letters an numbers/ 
btnRegister.addEventListener("click", (event) => {
    event.preventDefault()
    user.email = inputEmail.value 
    user.password = inputPassword.value
    user.name = inputName.value

    if (!isValidEmail(user.email)) {
        return alert("This is not a valid email. Please enter a correct one")
    };

    if (!isValidPassword(user.password)) {
        return alert("Your password must have at least one: lowercase letter, uppercase letter, number, special character and be at least 8 digits")
    }

    const data = JSON.parse(localStorage.getItem("users"));
    const checkUser = data.find(element => element.email === inputEmail.value)

    if (checkUser) {
        return alert("This email is already in use. Please enter a new one.")
    } else {
        data.push(user)
        localStorage.setItem("users", JSON.stringify(data))
        alert("You've been successfully registered!!")
        window.location.reload();
    }

});

bntSignin.addEventListener("click", (event) => {
    event.preventDefault();

    const data = JSON.parse(localStorage.getItem("users"));
    const username = inputEmail.value
    const password = inputPassword.value

    const findUser = data.find(element => element.email === username && element.password === password)

    if (findUser) {
        localStorage.setItem("retrieveUser", JSON.stringify(findUser))
        return window.location.href = "../pages/homepage.html" 
    } else {
        return alert("Please, checkout email or password don't match")
    }

})