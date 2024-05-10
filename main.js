import { fetchAPI } from './services/fetchApiHome.js';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const divCards = document.getElementById("div-cards");

async function createCard() {
  const data = await fetchAPI()
  console.log(data)
  data.map(element => divCards.innerHTML += `
    <div class="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center">
      <div class="card mb-4" style="width: 22rem;">
        <img src="${element.Poster}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Title: ${element.Title}</h5>
          <p class="card-text">Discription: ${element.Plot}</p>
          <p class="card-text">Relesead date: ${element.Released}</p>
          <button class="btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill icon-favorite" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
          </button>
        </div> 
      </div> 
    </div>`)
};
createCard();

window.addEventListener("load", async () => createCard()) 