

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
