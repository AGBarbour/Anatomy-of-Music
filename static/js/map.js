// Map variables
var mapZoom = 13
var mapCenter = [37.7749, -122.4194]

// Create Map
var myMap = L.map("map", {
    center: mapCenter ,
    zoom: mapZoom
});
  
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
maxZoom: 18,
id: "mapbox.streets",
accessToken: API_KEY
}).addTo(myMap);

// url will be set to restAPI when that is set up using python
var url = "";

d3.json(url, function(response) {

    // Call data and .addTo(myMap)

});