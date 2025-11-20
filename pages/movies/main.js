import { allGenreAndMovies } from "../../data/datahome.js";
import { fetchAPI } from "../../services/fetchApiHome.js";

const btnThriller = document.getElementById("btn-thriller");
const btnHorror = document.getElementById("btn-horror");
const btnMarvel = document.getElementById("btn-marvel");
const btnDrama = document.getElementById("btn-drama");
const btnAction = document.getElementById("btn-action");
const btnClassics = document.getElementById("btn-classics");
const btnComedy = document.getElementById("btn-comedy");
const btnScienceFiction = document.getElementById("btn-science-fiction");
const btnAnimes = document.getElementById("btn-animes");
const btnSeries = document.getElementById("btn-series");
const btnHome = document.getElementById("btn-home");
const btnOut = document.getElementById("btn-out");

const divCards = document.getElementById("div-cards");
const divRetrieveUser = document.getElementById("retrieve-user-email");
const homeBlock = document.getElementById("home-block");
const loader = document.getElementById("loader");

// 🔹 Helpers for favorites
function getFavoritesObject() {
  const stored = localStorage.getItem("retrieveUser");
  if (!stored) return { movies: [] };

  try {
    const parsed = JSON.parse(stored);
    if (!parsed.movies) {
      return { ...parsed, movies: [] };
    }
    return parsed;
  } catch (e) {
    return { movies: [] };
  }
}

function saveFavoritesObject(obj) {
  localStorage.setItem("retrieveUser", JSON.stringify(obj));
}

// 🔹 Create cards (used for both HOME + genres)
async function createCard(movies) {
  if (!movies || movies.length === 0) {
    divCards.innerHTML = "<p>No movies to display.</p>";
    return;
  }

  // 👉 clear previous cards immediately
  divCards.innerHTML = "";

  // show loader
  if (loader) loader.classList.remove("hide");

  try {
    const data = await fetchAPI(movies);

    data.forEach((element) => {
      divCards.innerHTML += `
        <div class="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center">
          <div class="card mb-3" style="width: 22rem;">
            <img src="${element.Poster}" class="card-img-top" alt="${element.Title}">
            <div class="card-body">
              <button class="btn btn-fav">
                <i class="bi bi-star-fill"></i>
              </button>
              <h5 class="card-title">Title: ${element.Title}</h5>
              <p class="card-text">Description: ${element.Plot}</p>
              <p class="card-text">Released date: ${element.Released}</p>
            </div> 
          </div> 
        </div>
      `;
    });
  } catch (err) {
    console.error("Error loading movies:", err);
    divCards.innerHTML = "<p>There was an error loading movies.</p>";
  } finally {
    // hide loader
    if (loader) loader.classList.add("hide");
  }
}

// 🔹 Handle favorite toggle (movies = array of TITLE STRINGS)
function favoritesMovies(movies) {
  const favButtons = document.querySelectorAll(".btn-fav");
  const currentFavorites = getFavoritesObject();

  favButtons.forEach((btn, index) => {
    const movieTitle = movies[index]; // string

    // mark as favorite if already saved
    const alreadyFavorite = currentFavorites.movies.includes(movieTitle);
    if (alreadyFavorite) {
      btn.classList.add("favorite");
    }

    // avoid stacking many listeners when changing genres/home
    btn.onclick = () => {
      let favs = getFavoritesObject();
      const exists = favs.movies.includes(movieTitle);

      if (!exists) {
        btn.classList.add("favorite");
        favs.movies.push(movieTitle);
      } else {
        btn.classList.remove("favorite");
        favs.movies = favs.movies.filter((m) => m !== movieTitle);
      }

      saveFavoritesObject(favs);
    };
  });
}

// 🔹 Click on genre buttons
function handleGenreButton(btn) {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();

    // hide home area when browsing a genre
    if (homeBlock) homeBlock.classList.add("hide");

    const textValue = btn.textContent.trim().toUpperCase();
    const findGenre = allGenreAndMovies.find(
      (element) => element.genre.toUpperCase() === textValue
    );

    if (!findGenre) return;

    // findGenre.movies is an array of titles (strings)
    await createCard(findGenre.movies);
    favoritesMovies(findGenre.movies);
  });
}

[
  btnHorror,
  btnThriller,
  btnMarvel,
  btnDrama,
  btnAction,
  btnClassics,
  btnComedy,
  btnScienceFiction,
  btnAnimes,
  btnSeries,
].forEach((btn) => {
  if (btn) handleGenreButton(btn);
});

// 🔹 HOME button – show favorites again
if (btnHome) {
  btnHome.addEventListener("click", async (e) => {
    e.preventDefault();

    if (homeBlock) homeBlock.classList.remove("hide");

    const retrieveUser = getFavoritesObject();

    if (retrieveUser.movies && retrieveUser.movies.length > 0) {
      await createCard(retrieveUser.movies); // movies = array of title strings
      favoritesMovies(retrieveUser.movies);
    } else {
      divCards.innerHTML = "";
    }
  });
}

// 🔹 SIGN OUT
if (btnOut) {
  btnOut.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("retrieveUser");
    window.location.href = "../../index.html";
  });
}

// 🔹 Initial load – show HOME + favorites
window.addEventListener("load", async () => {
  const retrieveUser = getFavoritesObject();

  if (homeBlock) homeBlock.classList.remove("hide");

  if (divRetrieveUser && retrieveUser.email) {
    divRetrieveUser.textContent = retrieveUser.email;
  }

  if (retrieveUser.movies && retrieveUser.movies.length > 0) {
    await createCard(retrieveUser.movies); // favorites are title strings
    favoritesMovies(retrieveUser.movies);
  } else {
    divCards.innerHTML = "";
  }
});
