import { allGenreAndMovies } from '../data/datahome.js';
import { fetchAPI } from '../services/fetchApiHome.js';
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';


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
const divRetrieveUser = document.getElementById("retrieve-user-email");
const divRetrieveName = document.getElementById("retrieve-user-name");

let isFavorite = false

async function createCard(movies) {
  const data = await fetchAPI(movies)
  divCards.innerHTML = ""
  data.map(element => divCards.innerHTML += `
    <div class="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center">
      <div class="card mb-3" style="width: 22rem;">
        <img src="${element.Poster}" class="card-img-top" alt="...">
        <div class="card-body">
          <button class="btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill icon-favorite icons-star" viewBox="0 0 16 16">
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>
          </button>
          <h5 class="card-title">Title: ${element.Title}</h5>
          <p class="card-text">Description: ${element.Plot}</p>
          <p class="card-text">Relesead date: ${element.Released}</p>
          
        </div> 
      </div> 
    </div>`)
};

const favoritesListMovies = JSON.parse(localStorage.getItem("retrieveUser"));

function favoritesMovies(movies) {
  const iconsStar = document.querySelectorAll(".icons-star")
  iconsStar.forEach((e, i) => {
    e.addEventListener("click", () => {
      e.classList.add("favorite")
      favoritesListMovies.movies.push(movies[i]);
      localStorage.setItem("retrieveUser", JSON.stringify(favoritesListMovies));
    })
  });
};

btnHorror.addEventListener("click", async () => {
  const textValue = btnHorror.textContent;
  const findGenre = allGenreAndMovies.find(element => element.genre.toUpperCase() === textValue);

  await createCard(findGenre.movies);
  favoritesMovies(findGenre.movies);
});

btnThriller.addEventListener("click", async () => {
  const textValue = btnThriller.textContent;
  const findGenre = allGenreAndMovies.find(element => element.genre.toLocaleUpperCase() === textValue);

  await createCard(findGenre.movies);
  favoritesMovies(findGenre.movies);
});

btnMarvel.addEventListener("click", async () => {
  const textValue = btnMarvel.textContent;
  const findGenre = allGenreAndMovies.find(element => element.genre.toLocaleUpperCase() === textValue);

  await createCard(findGenre.movies);
  favoritesMovies(findGenre.movies);
});

btnDrama.addEventListener("click", async () => {
  const textValue = btnDrama.textContent;
  const findGenre = allGenreAndMovies.find(element => element.genre.toLocaleUpperCase() === textValue);

  await createCard(findGenre.movies);
  favoritesMovies(findGenre.movies);
});

btnAction.addEventListener("click", async () => {
  const textValue = btnAction.textContent;
  const findGenre = allGenreAndMovies.find(element => element.genre.toLocaleUpperCase() === textValue);

  await createCard(findGenre.movies);
  favoritesMovies(findGenre.movies);
});

btnClassics.addEventListener("click", async () => {
  const textValue = btnClassics.textContent;
  const findGenre = allGenreAndMovies.find(element => element.genre.toLocaleUpperCase() === textValue);

  await createCard(findGenre.movies);
  favoritesMovies(findGenre.movies);
});

btnComedy.addEventListener("click", async () => {
  const textValue = btnComedy.textContent;
  const findGenre = allGenreAndMovies.find(element => element.genre.toLocaleUpperCase() === textValue);

  await createCard(findGenre.movies);
  favoritesMovies(findGenre.movies);
});

btnScienceFiction.addEventListener("click", async () => {
  const textValue = btnScienceFiction.textContent;
  const findGenre = allGenreAndMovies.find(element => element.genre.toLocaleUpperCase() === textValue);

  await createCard(findGenre.movies);
  favoritesMovies(findGenre.movies);
});

btnAnimes.addEventListener("click", async () => {
  const textValue = btnAnimes.textContent;
  const findGenre = allGenreAndMovies.find(element => element.genre.toLocaleUpperCase() === textValue);

 await createCard(findGenre.movies);
 favoritesMovies(findGenre.movies);
});

btnSeries.addEventListener("click", async () => {
  const textValue = btnSeries.textContent;
  const findGenre = allGenreAndMovies.find(element => element.genre.toLocaleUpperCase() === textValue);

 await createCard(findGenre.movies);
 favoritesMovies(findGenre.movies);
});

window.addEventListener("load", async () => {
 const retrieveUser = JSON.parse(localStorage.getItem("retrieveUser"));
 divRetrieveUser.innerHTML = retrieveUser.email
 divRetrieveName.innerHTML = retrieveUser.name
 await createCard(retrieveUser.movies)
 
}) 