(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey ="04bd31d3a9630c7fded7c19354cf20c0b5364cab1e7ffa6fd2d5c5805ed54795";

},{}],2:[function(require,module,exports){
var apiKey = require("./../.env").apiKey;

var BikeTracker = function(){

};


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
};


exports.bikeTrackerModule = BikeTracker;

//timestamp methods

},{"./../.env":1}],3:[function(require,module,exports){


var BikeMap = function(){

};
var map;
BikeMap.prototype.initMap = function (latt,long) {
  map = new google.maps.Map(document.getElementById('map'),
    {
      center: {lat: latt, lng: long},
      zoom:10
    });
  };


exports.bikeMapModule = BikeMap;

},{}],4:[function(require,module,exports){
var BikeTracker = require("./../js/bike-tracker.js").bikeTrackerModule;
var BikeMap = require("./../js/geo.js").bikeMapModule;

var displayColor = function(city, bikeData){
  for (var i = 0; i < bikeData.length; i++) {
    $("#display").append("<h3>the bike in " + city + " is " + bikeData[i].title +"</h3>" + "<img src='"+ bikeData[i].thumb+"' >" + "<ul><li>" + bikeData[i].frame_colors+"</li>" + "<li>" +bikeData[i].stolen_location+"</li>" + "<li>" + new Date(bikeData[i].date_stolen*1000)+"</li></ul>");
  }
};


$(document).ready(function(){
  var newMap = new BikeMap();
  $.get('https://maps.googleapis.com/maps/api/geocode/json?address=portland,+or&key=AIzaSyDACEz2FVBQclbyC7BSJ5lzgDnY2aQjeAQ').then(function(response) {
 console.log(response);
 newMap.initMap(45.52, -122.677);
 }).then( function() {
   //outside of this google wasnt recognized
   google.maps.event.addListener(map,"click",function(event){
      lat = event.latLng.lat();
     console.log(lat);
      long = event.latLng.lng();
     console.log(lng);
   });
 });

  $("#city").click(function(){
    var city = $("#bike").val();
    var newBike = new BikeTracker();
    newBike.findAll(city,displayColor);

  });
});

},{"./../js/bike-tracker.js":2,"./../js/geo.js":3}]},{},[4]);
