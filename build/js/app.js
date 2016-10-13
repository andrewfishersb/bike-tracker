(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey ="04bd31d3a9630c7fded7c19354cf20c0b5364cab1e7ffa6fd2d5c5805ed54795";

},{}],2:[function(require,module,exports){
var apiKey = require("./../.env").apiKey;

var BikeTracker = function(){

};


BikeTracker.prototype.findAll = function (city, area, displayInfo) {
  var bikeArray =[];
  $.get("https://bikeindex.org:443/api/v2/bikes_search/stolen?page=1&proximity="+city+"&proximity_square="+area).then(function(response){
    for(var i =0;i<response.bikes.length;i++){
      bikeArray.push(response.bikes[i]);
    }
      displayInfo(city, bikeArray);
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
  $.get('https://maps.googleapis.com/maps/api/geocode/json?address=portland,+or&key=AIzaSyDACEz2FVBQclbyC7BSJ5lzgDnY2aQjeAQ&libraries=geometry,places,drawing,visualization');
  map = new google.maps.Map(document.getElementById('map'),
    {
      center: {lat: latt, lng: long},
      zoom:10
    });
  };

BikeMap.prototype.findCoords = function () {
  map.addListener("click",function(event){
      var lat = event.latLng.lat();
      var long = event.latLng.lng();
      $("#bike").val('');
      $("#bike").val($("#bike").val()+lat+","+long);
  });
};

exports.bikeMapModule = BikeMap;

},{}],4:[function(require,module,exports){
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

},{"./../js/bike-tracker.js":2,"./../js/geo.js":3}]},{},[4]);
