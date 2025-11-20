import { allGenreAndMovies } from '../../data/datahome.js';
import { fetchAPI } from '../../services/fetchApiHome.js';

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
const divCards = document.getElementById("div-cards");
const btnOut = document.getElementById("btn-out");

// these may no longer exist in the HTML – so we guard when using them
const divRetrieveUser = document.getElementById("retrieve-user-email");
const divRetrieveName = document.getElementById("retrieve-user-name");

function showLoader() {
  const loader = document.getElementById("loader");
  if (loader) loader.classList.remove("hide");
}

function hideLoader() {
  const loader = document.getElementById("loader");
  if (loader) loader.classList.add("hide");
}

async function createCard(movies) {
  showLoader();   // <--- show spinner

  const data = await fetchAPI(movies);

  hideLoader();   // <--- hide spinner

  divCards.innerHTML = "";

  data.forEach(element => {
    divCards.innerHTML += `
      <div class="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center">
        <div class="card mb-3" style="width: 22rem;">
          <img src="${element.Poster}" class="card-img-top" alt="${element.Title}">
          <div class="card-body">
            <button class="btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                fill="currentColor" class="bi bi-star-fill icon-favorite icons-star">
                <path d="M3.612 15.443c-.386..."/>
              </svg>
            </button>
            <h5 class="card-title">Title: ${element.Title}</h5>
            <p class="card-text">Description: ${element.Plot}</p>
            <p class="card-text">Released date: ${element.Released}</p>
          </div>
        </div>
      </div>`;
  });
}

// ---- favorites storage helper ----
function getFavoritesObject() {
  // we expect an object like: { email, name, movies: [] }
  const stored = localStorage.getItem("retrieveUser");
  if (!stored) {
    return { movies: [] };
  }
  try {
    const parsed = JSON.parse(stored);
    if (!parsed.movies) {
      return { ...parsed, movies: [] };
    }
    return parsed;
  } catch {
    return { movies: [] };
  }
}

function saveFavoritesObject(obj) {
  localStorage.setItem("retrieveUser", JSON.stringify(obj));
}

function favoritesMovies(movies) {
  const iconsStar = document.querySelectorAll(".icons-star");

  iconsStar.forEach((icon, i) => {
    icon.addEventListener("click", () => {
      let favorites = getFavoritesObject();
      const currentMovie = movies[i];

      const alreadyFavorite = favorites.movies.some((m) => m === currentMovie);

      if (!alreadyFavorite) {
        icon.classList.add("favorite");
        favorites.movies.push(currentMovie);
        saveFavoritesObject(favorites);
      } else {
        icon.classList.remove("favorite");
        favorites.movies = favorites.movies.filter((m) => m !== currentMovie);
        saveFavoritesObject(favorites);
      }
    });
  });
}

// ---- buttons by genre ----
function handleGenreButton(btn) {
  btn.addEventListener("click", async () => {
    const textValue = btn.textContent.trim().toUpperCase();
    const findGenre = allGenreAndMovies.find(
      (element) => element.genre.toUpperCase() === textValue
    );

    if (!findGenre) return;

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

// ---- initial load ----
window.addEventListener("load", async () => {
  const retrieveUser = getFavoritesObject();

  // only try to show name/email if those elements exist and values exist
  if (divRetrieveUser && retrieveUser.email) {
    divRetrieveUser.innerHTML = retrieveUser.email;
  }
  if (divRetrieveName && retrieveUser.name) {
    divRetrieveName.innerHTML = retrieveUser.name;
  }

  if (retrieveUser.movies && retrieveUser.movies.length > 0) {
    await createCard(retrieveUser.movies);
    favoritesMovies(retrieveUser.movies);
  }
});

// SIGN OUT

if (btnOut) {
  btnOut.addEventListener("click", (event) => {
    event.preventDefault();

    // remove current logged user (or clear all if you prefer)
    localStorage.removeItem("retrieveUser");
    // optional: also clear favorites tied to user if you stored separately
    // localStorage.removeItem("users");

    // redirect back to login page (root index.html)
    window.location.href = "../../index.html"; 
    // if you're serving from root and this file path is different, 
    // `/index.html` also works.
  });
}
