$('.enter_link').click(function () {
    $(this).parent('#splashscreen').fadeOut(500);
});

// Provide access token
mapboxgl.accessToken = 'pk.eyJ1IjoibHpjYW11dGkiLCJhIjoiY2o3a281dWJvMHE4ajMzbGF4enJyNHRiciJ9.DhYjvPk5E_wJvys5DU5v2A';  // replace with your own access token

// Link to a mapbox studio style
var map = new mapboxgl.Map({
	container: 'map',
  style: 'mapbox://styles/lzcamuti/cj8ynio1pi4vq2rpqzlze1s4d', 
  center:[-80.647, 41.100],
	zoom: 13.1,
  bearing: 0,
  pitch: 0
});

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// code to add interactivity once map loads

// TIMELINE //

map.on('load', function() { // the event listener that does some code after the map loads
    var layers = map.getStyle().layers;
    // Find the index of the first symbol layer in the map style
    var firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
            firstSymbolId = layers[i].id;
            break;
        }
      } 

   
    // TIMELINE SLIDER
    map.addLayer({
    id: 'combinedvacantg',
    type: 'fill',
    source: {
      type: 'geojson',
      data: 'data/combinedvacantg.geojson' // replace this with the url of your own geojson
    },
    'paint': {
                    'fill-color': {
                    property: 'Year',
                    stops: [
                        [2008, '#f5babd'],
                        [2010, '#f0979c'],
                        [2012, '#eb757b'],
                        [2016, '#ac6d6c']
                    ]
                },
    },
    filter: ['==', 'Year', 2008]
    }, firstSymbolId);

    document.getElementById('slider').addEventListener('input', function(e) {
      // get the current hour as a integer
      var year = parseInt(e.target.value);
      // map.setFilter(layer-name, filter)
      map.setFilter('combinedvacantg', ['==', 'Year', year]);
      document.getElementById('year-label').innerText = year
    });

    
$("#slider").on('input',function(e) {
    var year = e.target.value;
    var barClass = ".bar.y" + year;

    var bar = $(barClass);
    
    bar.toggle();
})

// FINISH TIMELINE SLIDER //


//SCROLL NARRATIVE //
var chapters = {
    'downtown': {
        bearing: 0,
        center: [ -80.648964, 41.100695],
        zoom: 16.5,
        pitch: 20
    },
        'arlington': {
        bearing: 0,
        center: [ -80.658536, 41.108903],
        zoom: 17,
        pitch: 20
    },
            'ysu': {
        bearing: 0,
        center: [ -80.644414, 41.106266],
        zoom: 16.5,
        pitch: 20
    },
            'wick': {
        bearing: 0,
        center: [ -80.642269, 41.116097],
        zoom: 16.5,
        pitch: 20
    },
            'brier': {
        bearing: 0,
        center: [ -80.668642, 41.121691],
        zoom: 16.5,
        pitch: 20
    },
            'steelton': {
        bearing: 0,
        center: [ -80.685509, 41.114969],
        zoom: 15.5,
        pitch: 20
    },
            'commons': {
        bearing: 0,
        center: [ -80.664161, 41.101868],
        zoom: 16.5,
        pitch: 20
    },
            'east': {
        bearing: 0,
        center: [-80.625638, 41.097551],
        zoom: 16,
        pitch: 20
    },
            'sharon': {
        bearing: 0,
        center: [  -80.613653, 41.114751],
        zoom: 16,
        pitch: 20
    },
         'gibson': {
        bearing: 0,
        center: [-80.644963, 41.0875],
        zoom: 16.5,
        pitch: 20
    },
         'lansingville': {
        bearing: 0,
        center: [ -80.632623, 41.07411],
        zoom: 16.5,
        pitch: 20
    },
        'erie': {
        bearing: 0,
        center: [-80.653578, 41.081632],
        zoom: 16,
        pitch: 20
    },

        'oak': {
        bearing: 0,
        center: [-80.662559, 41.092036],
        zoom: 16.5,
        pitch: 20
    },
            'warren': {
        bearing: 0,
        center: [-80.66522, 41.08088],
        zoom: 16.5,
        pitch: 20
    },
            'idora': {
        bearing: 0,
        center: [-80.679685, 41.074227],
        zoom: 16.5,
        pitch: 20
    },
            'kirkmire': {
        bearing: 0,
        center: [-80.692162, 41.067967],
        zoom: 16,
        pitch: 20
    },
            'sch': {
        bearing: 0,
        center: [-80.686507, 41.092162],
        zoom: 16,
        pitch: 20
    },
    };

    // window.onscroll = function() {
 $("#features").scroll(function(e) {

          var chapterNames = Object.keys(chapters);

          for (var i = 0; i < chapterNames.length; i++) {
            
            var chapterName = chapterNames[i];
            var chapterElem = $("#" + chapterName);

            if (chapterElem.length) {

                if (checkInView($("#features"), chapterElem, true)) {
                  setActiveChapter(chapterName);
                  break;

                }
            }
          }
      });

      var activeChapterName = 'downtown';
      function setActiveChapter(chapterName) {
        if (chapterName === activeChapterName) return;

        map.flyTo(chapters[chapterName]);

        document.getElementById(chapterName).setAttribute('class', 'active');
        document.getElementById(activeChapterName).setAttribute('class', '');

        activeChapterName = chapterName;
    }


// function isElementOnScreen(id) {
//     var element = document.getElementById(id);
//     var bounds = element.getBoundingClientRect();
//     return bounds.top < window.innerHeight && bounds.bottom > 0;
// };

// function isScrolledIntoView(elem)
// {
//     var docViewTop = $(window).scrollTop();
//     var docViewBottom = docViewTop + $(window).height();

//     var elemTop = $(elem).offset().top;
//     var elemBottom = elemTop + $(elem).height();

//     return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
// }
    function checkInView(container, elem,partial) {
        var contHeight = container.height();
        var contTop = container.scrollTop();
        var contBottom = contTop + contHeight ;

        var elemTop = $(elem).offset().top - container.offset().top;
        var elemBottom = elemTop + $(elem).height();


        var isTotal = (elemTop >= 0 && elemBottom <=contHeight);
        var isPart = ((elemTop < 0 && elemBottom > 0 ) || (elemTop > 0 && elemTop <= container.height())) && partial ;
        console.log(isPart);

        return  isTotal  || isPart ;
    }
//FINISH SCROLL NARRATIVE // 

// POP-UPS

    map.on('click', function(e) {
      var stops = map.queryRenderedFeatures(e.polygon, {
        layers: ['Buildings'] // replace this with the name of the layer
      });

      // if the layer is empty, this if statement will return NULL, exiting the function (no popups created) -- this is a failsafe to avoid endless loops
      if (!stops.length) {
        return;
      }

      var stop = stops[0];
      
      // Initiate the popup
      var popup = new mapboxgl.Popup({ 
        closeButton: true, 
        closeOnClick: true, 
        anchor: 'bottom', 
        // offset: [0, -15] 
      });

      // Set the popup location based on each feature
      popup.setLngLat(e.lngLat);

      // Set the contents of the popup window
      popup.setHTML('<h3>Mailing Address: '  + stop.properties.MAIL_ADDRE // 'stop_id' field of the dataset will become the title of the popup
                           + '<h3>Acreage: ' + stop.properties.ACRES
                           + '<h3>Current Owner: ' + stop.properties.OWNNAME1
                           + '<h3>Property Value: $' + stop.properties.TOTALMARKE// 'stop_name' field of the dataset will become the body of the popup
                           + '<h3>');

      // Add the popup to the map
      popup.addTo(map);  // replace "map" with the name of the variable in line 28, if different
    });

// });



//LAYER TOGGLE B
var toggleableLayerIds = [ 'Topography' ];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);

var toggleableLayerIds = [ 'Buildings' ];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
}
var toggleableLayerIds = [ 'Woods' ];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
}

var toggleableLayerIds = [ 'Grassland' ];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
}

var toggleableLayerIds = [ 'Historic Vegetation' ];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
}

var toggleableLayerIds = [ 'Parks' ];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);




};

   // Show "About this Map" modal when clicking on button
$('#about').on('click', function() {

    $('#screen').fadeToggle();  // toggles visibility of background screen when clicked (shows if hidden, hides if visible)

    $('.modal').fadeToggle();  // toggles visibility of background screen when clicked (shows if hidden, hides if visible)                          
    
});

// Close "About this Map" modal when close button in modal is clicked
$('.modal .close-button').on('click', function() {

    $('#screen').fadeToggle();  // toggles visibility of background screen when clicked (shows if hidden, hides if visible)

    $('.modal').fadeToggle();  // toggles visibility of background screen when clicked (shows if hidden, hides if visible)                          
    
});
});

$('.enter_link').click(function () {
    $(this).parent('#splashscreen').fadeOut(500);
});
