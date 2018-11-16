var map = L.map("map", {
  center: [37.8, -96],
  zoom: 4
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    id: 'mapbox.streets',
    maxZoom: 18,
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    accessToken: API_KEY
}).addTo(map);

function getColor(d) {
  return d > 600000 ? '#800026' :
         d > 500000  ? '#BD0026' :
         d > 400000  ? '#E31A1C' :
         d > 300000  ? '#FC4E2A' :
         d > 200000   ? '#FD8D3C' :
         d > 100000   ? '#FEB24C' :
         d > 0   ? '#FED976' :
                    '#FFEDA0';
}

function style(feature) {
  return {
      fillColor: getColor(feature.properties.housevalue),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

L.geoJson(statesData, {style: style}).addTo(map);






