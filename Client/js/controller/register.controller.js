m.controller('registercontroller', function ($scope, $http,Api) {

  $scope.isvalidating = false;
  $scope.error_patien = "";
  $scope.error_doctor= "";

  $scope.occurrenceOptions_patien = [];

  $scope.occurrenceOptions_patien.push('Pria');
  $scope.occurrenceOptions_patien.push('Wanita');

  $scope.model_patien = {}; //defined a model object
  $scope.model_patien.selectedOccurrence_patien = 'current'; //and defined property in it


  $scope.Spesialist = {
    model: null,
    availableOptions: [
      {id: '1', name: 'Option A'},
      {id: '2', name: 'Option B'},
      {id: '3', name: 'Option C'}
    ]
   };
  
  $scope.accept_patien
  
  


  $scope.tab = 1;

  $scope.setTab = function (newTab) {
    $scope.tab = newTab;
  };

  $scope.isSet = function (tabNum) {
    return $scope.tab === tabNum;
  };

  $scope.Register = function () {

    $scope.error_patien=[];
    $scope.error_doctor= [];

    if ($scope.tab == 1) {
      // var DATA={};
      // DATA.name=$scope.name_patien;
      // DATA.email=$scope.email_patien;
      // DATA.password=$scope.password_patien;
      // DATA.gender=$scope.model_patien.selectedOccurrence_patien;
      // var promise=Api.register('patien',DATA);

      // promise.then(function(greeting) {
      //   alert('Success: ' + greeting);
      // }, function(reason) {
      //   alert('Failed: ' + reason);
      // }, function(update) {
      //   alert('Got notification: ' + update);
      // });
      $scope.error_patien='ERROR in server';
        
    } else if ($scope.tab == 2) {


      
    }

  }
});