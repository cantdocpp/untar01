m.controller('logincontroller',['$scope','$http','$q','Auth','$location',function ($scope, $http,$q,Auth,$location) {

$scope.isvalidating=false;
$scope.error=['Email Atau Password Salah'];

$scope.occurrenceOptions = [];

$scope.occurrenceOptions.push('Pasien');
$scope.occurrenceOptions.push('Dokter');


$scope.model = {}; //defined a model object
$scope.model.selectedOccurrence = 'current'; //and defined property in it

$scope.Login=function(){

  if($scope.remember_me)
  {
    Auth.store_credential_long_term("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicGF0aWVuIiwiY2hhbm5lbF9pZCI6ImFzZCIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.b6jATX04TD-Grd-x2P44VBC-qVAPh5sbBhRss-4wxAM");
  }else{
    Auth.store_credential_temp("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicGF0aWVuIiwiY2hhbm5lbF9pZCI6ImFzZCIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.b6jATX04TD-Grd-x2P44VBC-qVAPh5sbBhRss-4wxAM");
  }
  $location.path('/');

    // //Request Login
    // var promise = asyncLoginRequest($scope.email,$scope.password,$scope.model.selectedOccurrence);
    //     promise.then(function(greeting) {

    //       // if($scope.remember_me)
    //       // {
    //       //   Auth.store_credential_long_term("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicGF0aWVuIiwiY2hhbm5lbF9pZCI6ImFzZCIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.b6jATX04TD-Grd-x2P44VBC-qVAPh5sbBhRss-4wxAM");
    //       // }else{
    //       //   Auth.store_credential_temp("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicGF0aWVuIiwiY2hhbm5lbF9pZCI6ImFzZCIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.b6jATX04TD-Grd-x2P44VBC-qVAPh5sbBhRss-4wxAM");
    //       // }

    //     }, function(reason) {
    //        $scope.isvalidating=false;

    //        $scope.error.push(reason);
    //     }, function(update) {
    //       // alert('Got notification: ' + update);
    //       $scope.isvalidating=true;
    //     });
  }



  //List Function
  function asyncLoginRequest(email,password,type) {
  var deferred = $q.defer();

  setTimeout(function() {
    deferred.notify();

    var URL="";
    var DATA={};
    DATA.email=email;
    DATA.password=password;
    DATA.password=type;

    if(type === $scope.occurrenceOptions[1])
    {URL="https://localhost/do/login"}
    else
    {URL="https://localhost/patients/login"}

    $http({
    method: 'Post',
    url :  URL,
    headers: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*'
     },
    data : DATA
  }).then(function successCallback(response) {
        //console.table(response.status);

        deferred.resolve(response.data);

      }, function errorCallback(response) {
        deferred.reject(response.data);
      });
    }, 200);

  return deferred.promise;
}

}]);
