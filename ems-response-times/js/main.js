/** map tile **/
/** https://stackoverflow.com/questions/37166172/mapbox-tiles-and-leafletjs **/

////////////////////// Leaflet Map Projection

var map = L.map('map2', {zoomControl: false}).setView([40.838389, -73.940975], 14.5);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamVmZmV2ZXJoYXJ0MzgzIiwiYSI6IjIwNzVlOTA3ODI2MTY0MjM3OTgxMTJlODgzNjg5MzM4In0.QA1GsfWZccIB8u0FbhJmRg', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  opacity: 0.7,
  accessToken: 'pk.eyJ1IjoiamVmZmV2ZXJoYXJ0MzgzIiwiYSI6ImNqOXI2aDg5ejZhYncyd3M0bHd6cWYxc2oifQ.fzcb7maGkQhAxRZTotB4tg'
  }).addTo(map);

function fadeMap(){
  $(".leaflet-tile-pane").css("opacity",.1);
}

////////////////////// The journey begins here!
////////// Location, title and id of each step

var warblerWaypoints2 = [{
  title: "First",
  id: 1,
  location2: {
    lat: 40.758494,
    lng: -73.973019
  }
},
  {
  title: "Second",
  id: 2,
  location2: {
    lat: 40.758870,
    lng: -73.978674
  }
},
  {
  title: "Third",
  id: 3,
  location2: {
    lat: 40.750939,
    lng: -73.993434,
  }
},
]

////////// Disable zoom, fixes the map

map.scrollWheelZoom.disable()

//////////

warblerWaypoints.forEach(waypoint => {
  //let marker = L.marker([waypoint.location.lat, waypoint.location.lng ]).addTo(mymap)
})

//////////

let latlngs = warblerWaypoints.map(waypoint => [waypoint.location.lat, waypoint.location.lng]);

/** var polyline = L.polyline(latlngs, {smoothFactor: 10, color: 'orange', weight: 120, opacity: .5}).addTo(mymap);
var polyline = L.polyline(latlngs, {color: 'red', dashArray: '12 12',}).addTo(mymap); **/

// instantiate the scrollama
const scroller = scrollama();
// setup the instance, pass callback functions
scroller
  .setup({
  step: '.step' // required - class name of trigger steps
  })
  .onStepEnter(handleStepEnter)
  .onStepExit(handleStepExit);

function handleFlyTo(value){
  map.panTo(warblerWaypoints[value - 1].location, {animate:true, duration: 2})
}



function handleStepEnter(e){
  console.log('enter')
  let value = e.element.attributes['data-step'].value
  handleFlyTo(value)
}

function handleStepExit(e){
    console.log('exit')
    console.log(e)
}


////////////////////// zipcodes map

// https://stackoverflow.com/questions/35420915/topojson-in-leaflet-via-omnivore-reading-properties

////////// color palette

var color2 = "blue" // por defecto puedo poner


function styleBuilder (d) {   // d, color
  console.log(d)

  if (color2 == "dark") {

    return d < 8.5 ? '#ffffcc' :
         d > 10.5 ? '#a1dab4' :
         d > 10.5 ? '#41b6c4' :
         d > 10.5 ? '#2c7fb8' :
         d > 9.5 ? 'blue' : '#253494';
  }

  if (color2 == "blue") {

    return d < 4.5 ? '#ffffcc' :
         d > 10.5 ? '#a1dab4' :
         d > 10.5 ? '#41b6c4' :
         d > 10.5 ? '#2c7fb8' :
         d > 9.5 ? 'yellow' : '#253494';
  }
}


function getStyle (feature) {
  return {
    color: styleBuilder(feature.properties.respir_incident_response_min_qy)
  };
}

/////////// infowindow

function neighborhoodPopup (layer) {
  return 'quartier ' + layer.feature.properties.STATE
}

// This is where we design our neighborhoods
// layer. Usually you do L.geoJSON(data), but
// because we're using an external file we don't
// get to do that. This just designs the style
// and the tooltip/popups, we hook in the data
// later using omnivore (see below)


var customLayer = L.geoJSON(null, {
// http://leafletjs.com/reference.html#geojson-style
  'style': getStyle
}).bindTooltip(neighborhoodPopup)


// This is where we create a layer using topojson!
// If we didn't want to customize the color or have a
// tooltip/popup or anything, we could just use
//   omnivore.topojson('ny_final.json').addTo(map)
// but because we have opinions, we're going to use
// customLayer (see above) where we designed it
//omnivore.topojson('../data/zipcodes_respir.geojson', null, customLayer).addTo(map);

// EPSG:4326 problem with NY state projection, map shaper, leaflet did not recognize it
// 
// BORRAR var dt = null, dt2 = null, dt3 = null

dt = omnivore.topojson('data/respir.json', null, customLayer).addTo(map);
console.log(customLayer)

// different getStyles
// load a different one when you click
//

// Create updateLayer




//var dt = omnivore.topojson('../data/zipcodes_2.json').addTo(map);

//function popupContent(layer) {
//  console.log(layer)
//   console.log(feature)
//   console.log(properties)
//
//  return layer.feature.properties.respir_incident_response_min_qy
//}
