m.controller('registercontroller', function ($scope, $http) {

  $scope.isvalidating = false;
  $scope.error = ['Email Atau Password Salah'];

  $scope.occurrenceOptions_patien = [];

  $scope.occurrenceOptions_patien.push('Pria');
  $scope.occurrenceOptions_patien.push('Wanita');

  $scope.model_patien = {}; //defined a model object
  $scope.model_patien.selectedOccurrence_patien = 'current'; //and defined property in it

  $scope.Spesialist=[
    {name : "Dokter Jantung"},
    {name : "Dokter Mata"}
  ];  
  
  $scope.accept_patien
  
  


  $scope.tab = 1;

  $scope.setTab = function (newTab) {
    $scope.tab = newTab;
  };

  $scope.isSet = function (tabNum) {
    return $scope.tab === tabNum;
  };

  $scope.Register = function () {

    if ($scope.tab == 1) {
        asyncRegisterAsPatient($scope.name_patien,$scope.email_patien,$scope.password_patien,$scope.model_patien.selectedOccurrence_patien);
    } else if ($scope.tab == 2) {


      
    }

  }


  function asyncRegisterAsPatient(name,email,password,gender) {
    
    var deferred = $q.defer();

    setTimeout(function() {
      deferred.notify();
  
      var URL="";
      var DATA={};
      DATA.name=name;
      DATA.email=email;
      DATA.password=password;
      DATA.gender=gender;
  
      $http({
      method: 'Post',
      url :  URL,
      headers: {
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': '*'
       },
      data : DATA
    }).then(function successCallback(response) {
          console.table(response.status);

          deferred.resolve();
  
        }, function errorCallback(response) {
          //response.data
          deferred.reject();
        });
      }, 200);
  
    return deferred.promise;
  }









});