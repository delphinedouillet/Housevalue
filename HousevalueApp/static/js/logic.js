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
      fillColor: getColor(feature.properties.year2017),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

var geojson;

geojson = L.geoJson(statesData, {
  style: style
}).addTo(map);


document.getElementById('slider').addEventListener('input', function(e) {
  var selection = parseInt(e.target.value);
  var new_year = 'year'+selection;
  // update the map
  function style(feature) {
    console.log(new_year)
    return {
        fillColor: getColor(feature.properties[new_year]),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
  };

  function highlightFeature(e) {
    var layer = e.target;
  
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
  };
  
  
  function resetHighlight(e) {
    geojson.resetStyle(e.target);
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
    layer.bindPopup("<h3>" + feature.properties.name + "</h3> <hr> <h3>" + feature.properties[new_year] + "</h3>")
  }
  
  // update text in the UI
  document.getElementById('year').innerText = selection;
  L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);
});




// inputNumberMin.addEventListener('change', function style(feature){
//   var y = 'year' + this.value
//   console.log(y)
//   return {
//       fillColor: getColor(feature.properties.year2016),
//       weight: 2,
//       opacity: 1,
//       color: 'white',
//       dashArray: '3',
//       fillOpacity: 0.7
//   };
// });
// L.geoJson(statesData, {
//   style: style
// }).addTo(map);


// legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
    grades = [-1,-0.25, -0.1, -0.05,0.001, 0.05, 0.1, 0.25],
    colors = ['#FFEDA0','#FED976','#FEB24C','#FD8D3C','#FC4E2A','#E31A1C','#BD0026','#800026']
    labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
}

return div;
};

legend.addTo(map);
  








