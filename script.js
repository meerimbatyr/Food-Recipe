const searchForm = document.querySelector("form");
const searchResult = document.querySelector(".search-result");
const container = document.querySelector("container");
let searchQuery = "";
const APP_ID = `5d5e2e01`;
const APP_Key = `
63a62a9676b0035fd4f80e38a62d45b0`;

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_Key}&to=20`;
  const req = await fetch(`${baseURL}`);
  const res = await req.json();
  generateHTML(res.hits);
  console.log(res);
}

function generateHTML(data) {
  // container.classList.remove("initial");
  let generatedHTML = "";
  data.map((data) => {
    generatedHTML += `
    <div class="item">
    <img
      src="${data.recipe.image}"
      alt=""
    />
    <div class="flex-container">
      <h1 class="title">${data.recipe.label}</h1>
      <a class="view-btn" href="${
        data.recipe.url
      }" target="_blank">View Recipe</a>
    </div>
    <p class="item-data">Calories: ${data.recipe.calories.toFixed(2)}</p>
    <p class="item-data">Diet label: ${
      data.recipe.dietLabels.length > 0
        ? data.recipe.dietLabels
        : "No Data Found"
    }</p>
    <p class="item-data">Health label: ${data.recipe.healthLabels}</p>

  </div>`;
  });
  searchResult.innerHTML = generatedHTML;
}
