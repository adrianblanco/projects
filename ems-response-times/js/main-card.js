/** map tile **/
/** https://stackoverflow.com/questions/37166172/mapbox-tiles-and-leafletjs **/

////////////////////// Leaflet Map Projection

var map_card = L.map('map_card', {zoomControl: false}).setView([40.811712, -73.883147], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamVmZmV2ZXJoYXJ0MzgzIiwiYSI6IjIwNzVlOTA3ODI2MTY0MjM3OTgxMTJlODgzNjg5MzM4In0.QA1GsfWZccIB8u0FbhJmRg', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  opacity: 1,
  accessToken: 'pk.eyJ1IjoiamVmZmV2ZXJoYXJ0MzgzIiwiYSI6ImNqOXI2aDg5ejZhYncyd3M0bHd6cWYxc2oifQ.fzcb7maGkQhAxRZTotB4tg'
  }).addTo(map_card);

function fadeMap(){
  $(".leaflet-tile-pane").css("opacity",.1);
}

////////////////////// The journey begins here!
////////// Location, title and id of each step

var warblerWaypoints = [{
  title: "First",
  id: 1,
  location: {
    lat: 40.811712, 
    lng: -73.883147
  }
},
  {
  title: "Second",
  id: 2,
  location: {
    lat: 40.764257,
    lng: -73.973423
  }
},
  {
  title: "Third",
  id: 3,
  location: {
    lat: 40.847955,
    lng: -73.787377
  }
},
  {
  title: "Fourth",
  id: 4,
  location:  {
    lat: 40.895037,
    lng: -73.8067441
  }
},
{
  title: "Fifth",
  id: 5,
  location:  {
    lat: 40.811452,
    lng: -73.880229
  }
},
]

////////// Disable zoom, fixes the map

map_card.scrollWheelZoom.disable()

//////////

warblerWaypoints.forEach(waypoint => {
  //let marker = L.marker([waypoint.location.lat, waypoint.location.lng ]).addTo(mymap)
})

//////////

let latlngs2 = warblerWaypoints.map(waypoint => [waypoint.location.lat, waypoint.location.lng]);

/** var polyline = L.polyline(latlngs, {smoothFactor: 10, color: 'orange', weight: 120, opacity: .5}).addTo(mymap);
var polyline = L.polyline(latlngs, {color: 'red', dashArray: '12 12',}).addTo(mymap); **/

// instantiate the scrollama
const scroller2 = scrollama();
// setup the instance, pass callback functions
scroller2
  .setup({
  step: '.step' // required - class name of trigger steps
  })
  .onStepEnter(handleStepEnter)
  .onStepExit(handleStepExit);

function handleFlyTo(value){
  map_card.panTo(warblerWaypoints[value - 1].location, {animate:true, duration: 3.5})
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


function styleBuilder_card (d) {   // d, color
  console.log(d)

    return d > 11 ? 'black' :
         d > 10.5 ? '#67000d' :
         d > 10 ? '#7f2704' :
         d > 9 ? '#a63603' :
         d > 8 ? '#d94801' :
         d > 7 ? '#f16913' :
         d > 6 ? '#fd8d3c' :
         d > 5 ? '#fdae6b' : '#fff5eb';
}


function getStyle (feature) {
  return {
    color: styleBuilder_card(feature.properties.card_incident_response_min_qy),
    weight: 1.8,
    opacity: 0.9,
    fillOpacity: 0.65
    //fill-opacity: 0.6,
    // stroke: rgb(253, 141, 60);
    // stroke-opacity: 1.5;
    // stroke-linecap: round;
    // stroke-linejoin: round;
    // fill: rgb(253, 141, 60);
    // fill-opacity: 0.2;
  };
}

/////////// infowindow

function neighborhoodPopup (layer) {

  return 'ZIP Code: ' + '<strong>' + layer.feature.properties.ZIPCODE + '</strong>'
  + '<br>' + 'County: ' + '<strong>' + layer.feature.properties.COUNTY + '</strong>'
  + '<br>' + 'Population: ' + '<strong>' + layer.feature.properties.POPULATION + '</strong>'
  + '<br>' + 'Average response time: ' + '<strong>' + layer.feature.properties.card_incident_response_min_qy + ' minutes' + '</strong>'
  // COUNTY
  // POPULATION
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

dt = omnivore.topojson('data/card-avg-time.json', null, customLayer).addTo(map_card);
console.log(customLayer)

// different getStyles
// load a different one when you click
//



//var dt = omnivore.topojson('../data/zipcodes_2.json').addTo(map);

//function popupContent(layer) {
//  console.log(layer)
//   console.log(feature)
//   console.log(properties)
//
//  return layer.feature.properties.respir_incident_response_min_qy
//}
