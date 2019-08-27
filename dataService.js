let myPlaces = [];
const geocoder = new google.maps.Geocoder();
let changeListeners = [];

export function subscribe(callbackFunction) {
  changeListeners.push(callbackFunction);
}

function publish() {
  changeListeners.forEach(changeListener => {
    changeListener();
  });
}

export function addPlace(latLng) {
  geocoder.geocode({ location: latLng }, function(results) {
    try {
      // try to extract city name from results in this callback
      const cityName = results.find(result => result.types.includes('locality'))
        .address_components[0].long_name;

      // push to our array
      myPlaces.push({ position: latLng, name: cityName });

      publish();

      // and sync it with local storage
      localStorage.setItem('myPlaces', JSON.stringify(myPlaces));
    } catch (e) {
      console.log('No city found ', e);
    }
  });
}

export function getPlaces() {
  return myPlaces;
}

// function that tries to init Places collection from local storage
function initLocalStorage() {
  const placesFromLocaLStorage = JSON.parse(localStorage.getItem('myPlaces'));
  if (Array.isArray(placesFromLocaLStorage)) {
    myPlaces = placesFromLocaLStorage;
    publish();
  }
}

initLocalStorage();
