var locationForm = document.getElementById('location-form');
locationForm.addEventListener('submit', geocode);

function geocode(e) {
  //prevent actual submit
  e.preventDefault();

  var location = document.getElementById('location-input').value;
  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address: location,
      key: 'AIzaSyCCULqWKsXeffny_1k4S1OgSriSkZeQH8I'
    }
  })
  .then(function(response) {
    console.log(response);

    var formattedAddress = response.data.results[0].formatted_address;
    var formattedAddressOut = `
        <ul class="list-group">
          <li class="list-group-item">${formattedAddress}</li>
        </ul>
      `;

    var addressComponents = response.data.results[0].address_components;
    var addressComponentsOut = '<ul class="list-group">';
    for (var i=0; i<addressComponents.length; i++) {
      addressComponentsOut += `
        <li class="list-group-item"><strong>${addressComponents[i].types[0]}</strong>: ${addressComponents[i].long_name}</li>
      `;
    }
    addressComponentsOut += '</ul>';

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var geometryOut = `
        <ul class="list-group">
          <li class="list-group-item"><strong>lat</strong>: ${lat}</li>
          <li class="list-group-item"><strong>lng</strong>: ${lng}</li>
        </ul>
      `;

    document.getElementById('formatted-address').innerHTML = formattedAddressOut;
    document.getElementById('address-components').innerHTML = addressComponentsOut;
    document.getElementById('geometry').innerHTML = geometryOut;
  })
  .catch(function(error) {
    console.log(error);
  })
}
