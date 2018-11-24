m.controller('profilcontroller', function ($scope, $http, user_id) {

    console.log(user_id);

    $scope.rating_dokter=7.5;
    $scope.nama_dokter="123";
    $scope.spesialist_dokter="123";
    $scope.alamat_dokter="123";

    $scope.Review_pasien = [{
        nama_pasien: 'sule',
        rating_pasien: 7.5,
        review_pasien: 'a'
    }];


});