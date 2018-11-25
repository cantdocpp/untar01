m.controller('logincontroller',['$scope','$q','Auth','$location','Api',function ($scope,$q,Auth,$location,Api) {

$scope.isvalidating=false;
$scope.error="";

$scope.occurrenceOptions = [];

$scope.occurrenceOptions.push('Pasien');
$scope.occurrenceOptions.push('Dokter');


$scope.model = {}; //defined a model object
$scope.model.selectedOccurrence = 'current'; //and defined property in it

$scope.Login=function(){
  var DATA={};
  DATA.email=$scope.email;
  DATA.password=$scope.password;
  if($scope.model.selectedOccurrence == 'current'){
    $scope.model.selectedOccurrence = 'Pasien';
  }
  var promise=Api.login($scope.model.selectedOccurrence,DATA);

        promise.then(function(greeting) {
          if($scope.remember_me)
          {
           Auth.store_credential_long_term(greeting.data.token);
          }else{
            Auth.store_credential_temp(greeting.token);
          }
           $location.path('/');

        }, function(reason) {
           $scope.isvalidating=false;
           $scope.error=reason.data.message;
        }, function(update) {
          $scope.isvalidating=true;
        });

  }

}]);
