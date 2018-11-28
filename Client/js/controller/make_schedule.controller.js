m.controller('BookingController', ['$scope', '$http', '$rootScope', 'Auth','$location','user_id', function ($scope, $http, $rootScope, Auth,$location,user_id) {
    $scope.logout=function(){
        Auth.logout();
        $location.path('/');
    }
}]);