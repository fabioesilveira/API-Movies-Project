import { moviesHome } from './data/datahome.js';
import { fetchAPI } from './services/fetchApiHome.js';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';




const divCards = document.getElementById("div-cards");

async function createCard(movies) {
  const data = await fetchAPI(movies)
  console.log(data)
  data.map(element => divCards.innerHTML += `
    <div class="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center">
      <div class="card mb-4" style="width: 22rem;">
        <img src="${element.Poster}" class="card-img-top" alt="...">
        <div class="card-body">
          <button class="btn">
           <i class="bi bi-x-circle-fill "></i>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
              </svg>
          </button>
          <h5 class="card-title">Title: ${element.Title}</h5>
          <p class="card-text">Discription: ${element.Plot}</p>
          <p class="card-text">Relesead date: ${element.Released}</p>
          
        </div> 
      </div> 
    </div>`)
};

window.addEventListener("load", async () => {
  createCard(moviesHome);

}) 