m.controller('profilcontroller', function ($scope, $http, user_id,Api,$location) {

    var promise=Api.profil_dokter(user_id);

    promise.then(function(greeting) {

    
        var info_dokter=greeting.data.info_dokter;

        $scope.Review_pasien=greeting.data.review;
    
        $scope.rating_dokter=info_dokter.rating_dokter;
        $scope.nama_dokter=info_dokter.nama_dokter;
        $scope.spesialist_dokter=info_dokter.spesialist_dokter;
        $scope.alamat_dokter=info_dokter.alamat_dokter;
        
      }, function(reason) {
         
         $location.path('/');
      }, function(update) {
        // alert('Loading');
      });






    $scope.tab = 1;

    $scope.setTab = function (newTab) {
      $scope.tab = newTab;
    };
  
    $scope.isSet = function (tabNum) {
      return $scope.tab === tabNum;
    };


});