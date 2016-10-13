

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
      lat = event.latLng.lat();
      long = event.latLng.lng();
      console.log(lat +" "+long)
  })
};

exports.bikeMapModule = BikeMap;
