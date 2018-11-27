m.controller('SettingdoctorController', ['$scope', '$rootScope', 'Auth', 'Api', function ($scope, $http, $rootScope, Auth, Api) {


 var promise = Api.PROFILE_DOCTOR();
  promise.then(function(greeting) {

    
    var info_dokter=greeting.data.info_dokter;

    $scope.Review_pasien=greeting.data.review;

    $scope.rating_dokter=info_dokter.rating_dokter;
    $scope.spesialist_dokter=info_dokter.spesialist_dokter;
    $scope.alamat_dokter=info_dokter.alamat_dokter;
    

    $scope.name = info_dokter.nama;
    $scope.email = info_dokter.email;
    $scope.nomor_ijin = info_dokter.nomor_ijin;
    $scope.password =info_dokter.password;
    $scope.kota = info_dokter.kota;
    $scope.provinsi = info_dokter.provinsi;
    $scope.kecamatan = info_dokter.kecamatan;

  
    $scope.posisi_saat_ini = info_dokter.posisi_saat_ini;
  

  }, function(reason) {
     
     $location.path('/');
  }, function(update) {
    // alert('Loading');
  });



  $scope.name = "Lorem";
  $scope.email = "Lorem@lorem.com";
  $scope.nomor_ijin = "123456789";
  $scope.password = "123456789";
  $scope.kota = "jakarta";
  $scope.provinsi = "jakarta";

  $scope.kecamatan = "jakarta";

  $scope.posisi_saat_ini = "";

  // Api.Update_profil_dokter=function(DATA){

  // }
  $scope.get_position = function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {

    }
  }

  function showPosition(position) {
    $scope.posisi_saat_ini = position;
  }
  $scope.update = function () {

  }


}]);