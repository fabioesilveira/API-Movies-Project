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
    favoriteGenre: "",
    movies: []
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
    const checkUser = data.find(element => element.email === inputEmail.value)

    if (checkUser) {
        return alert("this email is already taken, please enter a new one")
    } else {
        data.push(user)
        localStorage.setItem("users", JSON.stringify(data))
        alert("you've been registered succesfully!!")
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
        return window.location.href = "/pages/homePage.html" 
    } else {
        return alert("please, checkout email or password don't match")
    }

})