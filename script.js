import { isValidEmail, isValidPassword } from './regex.js';

const inputEmail = document.getElementById("input-email");
const inputPassword = document.getElementById("input-password");
// name is optional now
const inputName = document.getElementById("input-name");
const btnRegister = document.getElementById("btn-register");
const bntSignin = document.getElementById("btn-signin");

// Ensure "users" exists in localStorage
function initUsersStorage() {
  const existing = localStorage.getItem("users");
  if (!existing) {
    localStorage.setItem("users", JSON.stringify([]));
  }
}

initUsersStorage();

// REGISTER
if (btnRegister) {
  btnRegister.addEventListener("click", (event) => {
    event.preventDefault();

    const newUser = {
      email: inputEmail.value.trim(),
      password: inputPassword.value,
      // if there's no name input, just store empty string
      name: inputName ? inputName.value.trim() : "",
      movies: [],
    };

    if (!isValidEmail(newUser.email)) {
      return alert("This is not a valid email. Please enter a correct one.");
    }

    if (!isValidPassword(newUser.password)) {
      return alert(
        "Your password must have at least one lowercase letter, one uppercase letter, one number, one special character and be at least 8 characters long."
      );
    }

    const data = JSON.parse(localStorage.getItem("users")) || [];
    const checkUser = data.find((element) => element.email === newUser.email);

    if (checkUser) {
      return alert("This email is already in use. Please enter a new one.");
    } else {
      data.push(newUser);
      localStorage.setItem("users", JSON.stringify(data));
      alert("You've been successfully registered!!");
      window.location.reload();
    }
  });
}

// SIGN IN
if (bntSignin) {
  bntSignin.addEventListener("click", (event) => {
    event.preventDefault();

    const data = JSON.parse(localStorage.getItem("users")) || [];
    const username = inputEmail.value.trim();
    const password = inputPassword.value;

    const findUser = data.find(
      (element) => element.email === username && element.password === password
    );

    if (findUser) {
      localStorage.setItem("retrieveUser", JSON.stringify(findUser));

      // ✅ FIXED REDIRECT PATH HERE
      return (window.location.href = "./pages/movies/index.html");

    } else {
      return alert("Please, check email or password. They don't match.");
    }
  });
}
