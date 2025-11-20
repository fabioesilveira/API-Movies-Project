# API-Movies-Project

A fully-interactive movie browsing platform built with **HTML, CSS, JavaScript, and Bootstrap**, featuring user authentication, genre-based movie browsing, favorites storage, and dynamic API-powered movie cards.

This project allows users to register, sign in, explore movies by category, save favorites, and revisit them on the home page — all stored locally and rendered responsively.

[Live Demo Link](https://fabioesilveira.github.io/API-Movies-Project/index.html)

---

### User Authentication

* Register with **email + password**
* Strong password + email regex validation
* Stores user data in **localStorage**
* Logged user saved in `retrieveUser`
* Redirects to movies dashboard after login

---

### Genre Browsing

Users can explore curated movie lists across categories:

* Horror
* Thriller
* Marvel
* Action
* Drama
* Comedy
* Classics
* Science Fiction
* Animes
* Series

Selecting a genre instantly loads movies using the API.

---


## Technologies Used

* **HTML5**
* **CSS3**
* **Bootstrap 5**
* **JavaScript (ES Modules)**
* **LocalStorage API**
* **OMDb API** (or similar)
* **Google Fonts**

---

## How It Works

### Registration

* User enters email and password
* Validated using regex
* Stored in `localStorage` as a new user object

### Login

* Checks credentials inside `users` array
* On success, stores user in `retrieveUser`
* Redirects to movies page

### Genre Navigation

* Click a genre button
* App hides home block
* Loads movie titles for that category
* Fetches real data for each movie
* Renders cards dynamically

### Favorites

* Clicking the star toggles favorite state
* Updated list stored in the user's profile in localStorage
* Home page displays all saved favorites

---

## Developer

**Fabio Silveira**
GitHub: [https://github.com/fabioesilveira](https://github.com/fabioesilveira)

---

## Deployed Site

![Screenshot of Deployed Website](/assets/images/Screenshot1.png)

![Screenshot of Deployed Website](/assets/images/Screenshot2.png)

![Screenshot of Deployed Website](/assets/images/Screenshot3.png)

[Live Demo Link](https://fabioesilveira.github.io/API-Movies-Project/index.html)