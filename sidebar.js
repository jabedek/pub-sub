import { getPlaces, subscribe } from './dataService.js';

function renderCities() {
  const cityListElement = document.getElementById('citiesList');

  cityListElement.innerHTML = '';

  getPlaces().forEach(place => {
    const cityElement = document.createElement('div');
    cityElement.innerText = place.name;
    cityListElement.appendChild(cityElement);
  });
}

// on launch
renderCities();

// on update
subscribe(renderCities);
