function initMap() {
  var options = {
    zoom: 12,
    center: {lat: 42.6064, lng: -83.1498}
  }

  var map = new google.maps.Map(document.getElementById('map'), options);

  google.maps.event.addListener(map, 'click', function(event) {
    addMarker({coords:event.latLng});
  });

  var markers = [
    {
      coords: {lat: 42.593531, lng:-83.148209},
      icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      content:'<h1>krogers</h1>'
    },
    {
      coords:{lat: 42.6, lng:-83.1},
      content:'<h1>lng - 0.04</h1>'
    },
    {
      coords:{lat: 42.6, lng:-83.2}
    }
  ];

  for (var i=0;i<markers.length;i++) {
    addMarker(markers[i]);
  }

  function addMarker(props) {
    var marker = new google.maps.Marker({
      position: props.coords,
      map: map,
      // icon: props.icon
    });

    if (props.icon) {
      marker.setIcon(props.icon);
    }

    if (props.content) {
      var infoWindow = new google.maps.InfoWindow({
        content: props.content
      });

      marker.addListener('click', function() {
        infoWindow.open(map,marker);
      });
    }
  }
}
