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
  return d > 0.25  ? '#800026' :
         d > 0.1   ? '#BD0026' :
         d > 0.05  ? '#E31A1C' :
         d > 0.01  ? '#FC4E2A' :
         d < -0.01 ? '#FD8D3C' :
         d < -0.05 ? '#FEB24C' :
         d < -0.1  ? '#FED976' :
         d < -0.25 ? '#FFEDA0':
                    '#FFEDA0';
}

function style(feature) {
  return {
      fillColor: getColor(feature.properties.year2001),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
  }

  info.update(layer.feature.properties);
}


function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}


function onEachFeature(feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
     // click: zoomToFeature
  });
  layer.bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h2>" + feature.properties.year2001 + "</h2>")
}

var geojson;

geojson = L.geoJson(statesData, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(map);

// var legend = L.control({position: ‘bottomright’});

//     legend.onAdd = function (map) {

//         var div = L.DomUtil.create(‘div’, ‘info legend’),
//             grades = [0, 10, 20, 50, 100, 200, 500, 1000],
//             labels = [],
//             from, to;

//         for (var i = 0; i < grades.length; i++) {
//             from = grades[i];
//             to = grades[i + 1];

//             labels.push(
//                 ‘<i style=“background:’ + getColor(from + 1) + ‘“></i> ’ +
//                 from + (to ? ‘&ndash;’ + to : ‘+’));
//         }

//         div.innerHTML = labels.join(‘<br>’);
//         return div;
//     };

//     legend.addTo(map);

//   function style(feature) {
//   return {
//       fillColor: getColor(feature.properties.new_year),
//       weight: 2,
//       opacity: 1,
//       color: 'white',
//       dashArray: '3',
//       fillOpacity: 0.7
//   };
// };

// L.geoJson(statesData, {style: style}).addTo(map);
  








