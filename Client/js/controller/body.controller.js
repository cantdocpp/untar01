m.controller('BodyController',['$scope','$http','$rootScope', function ($scope, $http,$rootScope) {


$scope.$on('currentlocation', function(event, args) {
  if(args == '/')
  {
      $scope.Title='Dokter | Karena Sehat Hak Semua Orang'
  }else if(args == '/pasien/pemesanan')
  {
    $scope.Title='Dashboard Pasien'
  }
  else{
      $scope.Title=args
  }
});



}]);
