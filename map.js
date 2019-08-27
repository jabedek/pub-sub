let googleMap;

import { addPlace, getPlaces, subscribe } from './dataService.js';

function init() {
  console.log('init');
  googleMap = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 0, lng: 0 },
    zoom: 3
  });

  googleMap.markerList = [];
  googleMap.addListener('click', addMarker);
}

function addMarker(event) {
  addPlace(event.latLng);
  renderMarkers();
}

function renderMarkers() {
  googleMap.markerList.forEach(marker => marker.setMap(null));
  googleMap.markerList = [];

  getPlaces().forEach(place => {
    const marker = new google.maps.Marker({
      position: place.position,
      map: googleMap
    });

    googleMap.markerList.push(marker);
  });
}

init();

// on launch
renderMarkers();

// on update
subscribe(renderMarkers);
