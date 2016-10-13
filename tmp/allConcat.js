var BikeTracker = require("./../js/bike-tracker.js").bikeTrackerModule;
var BikeMap = require("./../js/geo.js").bikeMapModule;

var displayInfo = function(city, bikeData){
  for (var i = 0; i < bikeData.length; i++) {
    $("#display").append("<div class='bike-info bike-img'><h4>"+bikeData[i].title+"</h4><img src='"+ bikeData[i].thumb+"' >" + "<ul><li><strong>Frame Color: </strong>" + bikeData[i].frame_colors+"</li><li><strong>Location: </strong>" +bikeData[i].stolen_location+"</li><li><strong>Date Stolen: </strong>" + new Date(bikeData[i].date_stolen*1000)+"</li></ul></div>");
  }
};


$(document).ready(function(){
  var newMap = new BikeMap();
  $.get('https://maps.googleapis.com/maps/api/geocode/json?address=portland,+or&key=AIzaSyDACEz2FVBQclbyC7BSJ5lzgDnY2aQjeAQ&libraries=geometry,places,drawing,visualization').then(function(response) {
 newMap.initMap(45.52, -122.677);
 newMap.findCoords();
 }).fail(function(error){
    $('#display').text(error.responseJSON.message);
    console.log("failed");
  });

  // $("#map").click(function(event) {
  //   console.log(newMap.findCoords());
  //   $("#bike").append(newMap.findCoords());
  //   console.log(newMap.findCoords());
  // });


  $("#city").submit(function(event){
    event.preventDefault();
    $("#display").empty();
    var city = $("#bike").val();
    var area = $('#area').val();
    var newBike = new BikeTracker();
    newBike.findAll(city,area,displayInfo);
  });
});
