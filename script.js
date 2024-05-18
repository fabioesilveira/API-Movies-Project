import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const inputEmail = document.getElementById("input-email");
const inputPassword = document.getElementById("input-password");
const inputOptionMovies = document.getElementById("input-option-movies");
const btnRegister = document.getElementById("btn-register");
const bntSignin = document.getElementById("btn-signin");

const user = {
    email: "",
    password: "",
    favoriteGenre: ""
}

function userRegister() {
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify([]))
    };


}

userRegister();

btnRegister.addEventListener("click", (event) => {
    event.preventDefault()
    user.email = inputEmail.value 
    user.password = inputPassword.value
    user.favoriteGenre = inputOptionMovies.value
    
    const data = JSON.parse(localStorage.getItem("users"));
    data.push(user)
    localStorage.setItem("users", JSON.stringify(data))
})