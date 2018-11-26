m.controller('PesanpasienController', ['$scope', '$http', '$rootScope', 'Auth','$location', function ($scope, $http, $rootScope, Auth,$location) {


    $scope.get_name="jack";

console.log(Auth.encodeJWT(Auth.get_credentials_temp()));

    $scope.logout=function(){
        Auth.logout();
        $location.path('/');
    }

    $scope.ongoing = [];
    $scope.history = [{
        nama: 'abc',
        spesialist: 'dokterginjal',
        nomor_telpdokter: '08123123',
        nama_pasien:'sule',
        alamat_pasien:'jln.abc',
        review_pasien:'a',
        resepn_pasien:'a',
        rekomend_dokter:'aaa',
        penyakit_pasien:'a'
    },{
        nama: 'asssdqw',
        spesialist: 'Dokter Jantung',
        nomor_telpdokter: '08123123',
        nama_pasien:'sllsse',
        alamat_pasien:'jln.qwdqwd',
        review_pasien:'a',
        resepn_pasien:'a',
        rekomend_dokter:'a',
        penyakit_pasien:'a'
    }];

    $scope.tab = 1;

    $scope.show_detail = function () {
        // console.log($event.target.getAttribute('data-location'));
        $('#detailModal').modal('show');
    }


    $scope.setTab = function (newTab) {
        $scope.tab = newTab;

    };

    $scope.isSet = function (tabNum) {
        return $scope.tab === tabNum;
    };



}]);