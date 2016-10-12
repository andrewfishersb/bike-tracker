(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey ="04bd31d3a9630c7fded7c19354cf20c0b5364cab1e7ffa6fd2d5c5805ed54795";

},{}],2:[function(require,module,exports){
var apiKey = require("./../.env").apiKey;

var BikeTracker = function(){

}


BikeTracker.prototype.findAll = function (city ,displayColor) {
  var bikeArray =[];
  $.get("https://bikeindex.org:443/api/v2/bikes_search/stolen?page=1&proximity="+city).then(function(response){
    for(var i =0;i<response.bikes.length;i++){
      bikeArray.push(response.bikes[i]);
    }
      displayColor(city, bikeArray);
  }).fail(function(error){
    $('#display').text(error.responseJSON.message);
  });
}


exports.bikeTrackerModule = BikeTracker;

},{"./../.env":1}],3:[function(require,module,exports){
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

},{"./../js/bike-tracker.js":2}]},{},[3]);
