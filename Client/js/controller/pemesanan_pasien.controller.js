m.controller('PesanpasienController', ['$scope', '$http', '$rootScope', 'Auth','$location','user_id', function ($scope, $http, $rootScope, Auth,$location,user_id) {

$scope.pesan=function(){
    $location.route('/');
}


}]);