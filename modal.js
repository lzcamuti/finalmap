mapboxgl.accessToken = 'pk.eyJ1IjoibHpjYW11dGkiLCJhIjoiY2o3a281dWJvMHE4ajMzbGF4enJyNHRiciJ9.DhYjvPk5E_wJvys5DU5v2A';

var map = new mapboxgl.Map({
	container: 'map',
	minZoom: 12.7,
	maxZoom: 18,
	pitchWithRotate: false,
	style: 'mapbox://styles/lzcamuti/cj8ynio1pi4vq2rpqzlze1s4d' 
});

// PARKS - INFO WINDOW CHANGES ON HOVER
// code to add interactivity once map loads
map.on('load', function() {	// the event listener that does some code after the map loads

	// add a legend to the map
	for (i = 0; i < layers.length; i++) {
	  var layer = layers[i];
	  var color = colors[i];
	  var item = document.createElement('div');
	  var key = document.createElement('span');
	  key.className = 'legend-key';
	  key.style.backgroundColor = color;

	  var value = document.createElement('span');
	  value.innerHTML = layer;
	  item.appendChild(key);
	  item.appendChild(value);
	  legend.appendChild(item);
	}

	// -----------------------------------------------------------------------
	// BUS STOPS - MODALS
	// code to add modals
    // event listener for clicks on map
    map.on('click', function(e) {
      var stops = map.queryRenderedFeatures(e.point, {
        layers: ['combinedvacantg'] // replace this with the name of the layer
      });

      // if the layer is empty, this if statement will return NULL, exiting the function (no popups created) -- this is a failsafe to avoid endless loops
      if (!stops.length) {
        return;
      }

      // Sets the current feature equal to the clicked-on feature using array notation, in which the first item in the array is selected using arrayName[0]. The event listener above ("var stops = map...") returns an array of clicked-on bus stops, and even though the array might only have one item, we need to isolate it by using array notation as follows below.
      var stop = stops[0];
      
      // Initiate the popup
      var popup = new mapboxgl.Popup({ 
        closeButton: true, // If true, a close button will appear in the top right corner of the popup. Default = true
        closeOnClick: true, // If true, the popup will automatically close if the user clicks anywhere on the map. Default = true
        anchor: 'bottom', // The popup's location relative to the feature. Options are 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left' and 'bottom-right'. If not set, the popup's location will be set dynamically to make sure it is always visible in the map container.
        offset: [0, -15] // A pixel offset from the centerpoint of the feature. Can be a single number, an [x,y] coordinate, or an object of [x,y] coordinates specifying an offset for each of the different anchor options (e.g. 'top' and 'bottom'). Negative numbers indicate left and up.
      });

      // Set the popup location based on each feature
      popup.setLngLat(stop.geometry.coordinates);

      // Set the contents of the popup window
      popup.setHTML('<h3>' + stop.properties.Name   // 'stop_id' field of the dataset will become the title of the popup
                           + '</h3><p>' + stop.properties.Conditions // 'stop_name' field of the dataset will become the body of the popup
                           + '</p>');

      // Add the popup to the map
      popup.addTo(map);  // replace "map" with the name of the variable in line 28, if different
    });

