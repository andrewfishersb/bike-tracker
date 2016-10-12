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
