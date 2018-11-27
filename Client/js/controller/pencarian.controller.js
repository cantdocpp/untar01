
m.controller('PencarianController', ['$scope', '$http', '$rootScope', 'Auth','Api', function ($scope, $http, $rootScope, Auth,Api) {


$scope.filter_select="harga";

$scope.find_data=function(){
    console.log($scope.filter_select);
    console.log($scope.filter_input);
}

$scope.Pencarian=[{nama_dokter:"Dr. Bernard Mahfouz",spesialist:'Spesialis Jantung',harga_praktek:'Rp. 50000 - Rp. 10000',user_id:'123456789'}];

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
        map.getSource('drone').setData(url);
    }, 2000);

    map.addSource('drone', { type: 'geojson', data: url });
    map.addLayer({
        "id": "drone",
        "type": "symbol",
        "source": "drone",
        "layout": {
            "icon-image": "rocket-15"
        }
    });
});

map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
}));


}]);