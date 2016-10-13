var BikeTracker = require("./../js/bike-tracker.js").bikeTrackerModule;
var BikeMap = require("./../js/geo.js").bikeMapModule;

var displayColor = function(city, bikeData){
  for (var i = 0; i < bikeData.length; i++) {
    $("#display").append("<h3>the bike in " + city + " is " + bikeData[i].title +"</h3>" + "<img src='"+ bikeData[i].thumb+"' >" + "<ul><li>" + bikeData[i].frame_colors+"</li>" + "<li>" +bikeData[i].stolen_location+"</li>" + "<li>" + new Date(bikeData[i].date_stolen*1000)+"</li></ul>");
  }
};


$(document).ready(function(){
  var newMap = new BikeMap();
  $.get('https://maps.googleapis.com/maps/api/geocode/json?address=portland,+or&key=AIzaSyDACEz2FVBQclbyC7BSJ5lzgDnY2aQjeAQ&libraries=geometry,places,drawing,visualization').then(function(response) {
 newMap.initMap(45.52, -122.677);
 newMap.findCoords();

 }) .fail(function(error){
    $('#display').text(error.responseJSON.message);
    console.log("failed");
  });


  $("#city").submit(function(event){
    event.preventDefault();
    $("#display").empty();
    var city = $("#bike").val();
    var newBike = new BikeTracker();
    newBike.findAll(city,displayColor);

  });
});
