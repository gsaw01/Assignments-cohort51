async function fetchData(url, errorContext) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error(`Fetching ${errorContext} error.`, error);
    renderErrorMessage(`Fetching ${errorContext} failed. ${error.message}`);
    return null;
  }
}

async function fetchAndPopulatePokemons() {
  const pokemonListData = await fetchData('https://pokeapi.co/api/v2/pokemon?limit=151', 'pokemon list');
  if (!pokemonListData) return;
  const allPokemons = pokemonListData.results;
  const selectElement = document.getElementById('pokemon-select');
  
  allPokemons.forEach(pokemon => {
    const optionElement = document.createElement('option');
    optionElement.textContent = pokemon.name;
    optionElement.value = pokemon.url;
    selectElement.append(optionElement);
  });

  selectElement.disabled = false;
}

async function fetchImage() {
  const selectElement = document.getElementById('pokemon-select');
  const imageElement = document.getElementById('pokemon-image');

  toggleLoadingAnimation(true);

  const selectedPokemonData = await fetchData(selectElement.value, 'pokemon image');
  if (!selectedPokemonData) return;

  imageElement.src = selectedPokemonData
    .sprites
    .other['official-artwork']
    .front_default;
  
  imageElement.onload = () => {
    toggleLoadingAnimation(false);
    imageElement.classList.add('animate');
    imageElement.addEventListener('animationend', () => {
      imageElement.classList.remove('animate');
    });
  };
}

function toggleLoadingAnimation(isSpinnerVisible) {
  const spinner = document.querySelector('.spinner');
  spinner.classList.toggle('visible', isSpinnerVisible);
}

function renderErrorMessage(message) {
  const imageContainer = document.getElementById('image-container');
  const showImageButton = document.getElementById('show-image-button');
  imageContainer.textContent = `🚫 ${message}`;
  showImageButton.disabled = true;
}

function generateLayout() {
  document.body.innerHTML = `
    <div id='app'>
      <h1>Explore Pokemons</h1>
      <div id='actions-container'>
        <select id='pokemon-select' disabled>
          <option value='' disabled selected>Choose Pokemon</option>
        </select>
        <button id='show-image-button' disabled>Show Image</button>
      </div>
      <div id='image-container'>
        <div class="spinner"></div>
        <img id='pokemon-image'/>
      </div>
    </div>
  `;
  initEventListeners();
}

function initEventListeners() {
  const selectElement = document.getElementById('pokemon-select');
  const showImageButton = document.getElementById('show-image-button');

  selectElement.addEventListener('change', () => showImageButton.disabled = !selectElement.value);
  showImageButton.addEventListener('click', fetchImage);
}

function main() {
  generateLayout();
  fetchAndPopulatePokemons();
}

window.addEventListener('load', main);