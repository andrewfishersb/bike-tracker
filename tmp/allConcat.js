var BikeTracker = require("./../js/bike-tracker.js").bikeTrackerModule;

var displayColor = function(city, bikeData){
  for (var i = 0; i < bikeData.length; i++) {
    $("#display").append("<h3>the bike in " + city + " is " + bikeData[i].title +"</h3>" + "<img src='"+ bikeData[i].thumb+"'>" + "<ul><li>" + bikeData[i].frame_colors+"</li>"
    + "<li>" +bikeData[i].stolen_location+"</li>" + "<li>" + bikeData[i].date_stolen+"</li></ul>");
  }
  // $("#display").append("<p>the bike in " + city + " is " + bikeData +"</p>")
};

$(document).ready(function(){
  $("#city").click(function(){
    var city = $("#bike").val();
    var newBike = new BikeTracker();
    newBike.findAll(city,displayColor);

  });
});
