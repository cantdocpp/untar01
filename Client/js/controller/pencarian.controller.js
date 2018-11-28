
m.controller('PencarianController', ['$scope', '$http', '$rootScope', 'Auth','Api', function ($scope, $http, $rootScope, Auth,Api) {





$scope.find_data=function(){
    // jika geolocation jump dan ganti filter
    //hover icon info 
    console.log($scope.filter_select);
    // kalau ganti kota  jump
    console.log($scope.filter_input);
    // $scope.listkota.value
    // $scope.listspesialis.value
}

$scope.Pencarian=[{nama_dokter:"Dr. Bernard Mahfouz",spesialist:'Spesialis Jantung',harga_praktek:'Rp. 50000 - Rp. 10000',user_id:'123456789'}];
$scope.listkota = [{
    name: 'Jakarta',
    value: 'JKT'
   }, {
      name: 'Bandung',
      value: 'BNDG'
   }];
$scope.listspesialis = [{
    name: 'Dokter Umum',
    value: 'UMUM'
   }, {
      name: 'Dokter Gigi',
      value: 'GIGI'
}];



$scope.goto_map=function(){
    map.flyTo({
        center: [
            -74.50 + (Math.random() - 0.5) * 10,
            40 + (Math.random() - 0.5) * 10]
    });
};


//Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoibGFsYTEyMTIiLCJhIjoiY2pvc3RoNTUyMHUyNDNqcHR4MGZrNjd6ZCJ9.5MOx28fKyQSzcx2-Z1aOBg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [126.89313932279735, -21.563861365310487],
   
    minZoom: 1,
    zoom: 3
});
var url = 'http://geojsonapp.herokuapp.com/';
map.on('load', function () {
    window.setInterval(function() {
        map.getSource('doctor').setData(url);
    }, 2000);

    map.addSource('doctor', { type: 'geojson', data: url });

    map.addLayer({
        "id": "drone",
        "type": "symbol",
        "source": "doctor",
        "layout": {
            "icon-image": "rocket-15"
        }
    });


    map.on('mouseenter','map',function(e) {
        alert('Mouse Enter');
    });

    map.on('mouseleave','map',function() {
        alert('Mouse Leave');
    });

});

map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
}));


}]);