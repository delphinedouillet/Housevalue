Plotly.d3.csv('https://raw.githubusercontent.com/delphinedouillet/Housevalue/master/static/js/plotlyformatted.csv', function(err, rows){

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    var allCountryNames = unpack(rows, 'State'),
        allYear = unpack(rows, 'Year'),
        allGdp = unpack(rows, 'GDP'),
        allHousing = unpack(rows, 'Housing'),
        listofCountries = [],
        currentCountry,
        currentGdp = [],
        currentHouse = [],
        currentYear = [];

    for (var i = 0; i < allCountryNames.length; i++ ){
        if (listofCountries.indexOf(allCountryNames[i]) === -1 ){
            listofCountries.push(allCountryNames[i]);
        }
    }

    function getCountryData(chosenCountry) {
        currentGdp = [];
        currentYear = [];
        currentHouse =[];
        for (var i = 0 ; i < allCountryNames.length ; i++){
            if ( allCountryNames[i] === chosenCountry ) {
                currentGdp.push(allGdp[i]);
                currentYear.push(allYear[i]);
                currentHouse.push(allHousing[i]);
            }
        }
    };

    // Default Country Data
    setBubblePlot('Illinois');

    function setBubblePlot(chosenCountry) {
        getCountryData(chosenCountry);

        var trace1 = {
            x: currentYear,
            y: currentGdp,
            name:'GDP per state',
            mode: 'lines+markers',
            marker: {
                size: 12,
                opacity: 0.5
            }
        
          };

        var trace2 = {
          x: currentYear,
          y: currentHouse,
          yaxis: 'y2',
          name:'Housing value',
          mode: 'lines+markers',
          marker: {
          size: 12,
          opacity: 0.5
          }

        };

        var data = [trace1,trace2];

        var layout = {
            title:'Housing value and GDP',
            height: 500,
            width: 800,
            yaxis2: {
              title: 'yaxis2 title',
              titlefont: {color: 'rgb(148, 103, 189)'},
              tickfont: {color: 'rgb(148, 103, 189)'},
              overlaying: 'y',
              side: 'right'
            }
        };

        Plotly.newPlot('plotdiv', data, layout);
    };

    var innerContainer = document.querySelector('[data-num="0"'),
        plotEl = innerContainer.querySelector('.plot'),
        countrySelector = innerContainer.querySelector('.countrydata');

    function assignOptions(textArray, selector) {
        for (var i = 0; i < textArray.length;  i++) {
            var currentOption = document.createElement('option');
            currentOption.text = textArray[i];
            selector.appendChild(currentOption);
        }
    }

    assignOptions(listofCountries, countrySelector);

    function updateCountry(){
        setBubblePlot(countrySelector.value);
    }

    countrySelector.addEventListener('change', updateCountry, false);
});





