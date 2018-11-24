m.controller('PesanpasienController', ['$scope', '$http', '$rootScope', 'Auth', function ($scope, $http, $rootScope, Auth) {




    $scope.$on('getname_temp', function (event, args) {
        $scope.get_name = args;
    });

    $scope.$on('getname_perm', function (event, args) {
        change(args);
    });


    $scope.ongoing = [];
    $scope.history = [{
        nama: 'abc',
        spesialist: 'dokterginjal',
        nomor_telpdokter: '08123123',
        nama_pasien:'sule',
        alamat_pasien:'jln.abc',
        review_pasien:'a',
        resepn_pasien:'a',
        rekomend_dokter:'a',
        penyakit_pasien:'a'
    },{
        nama: 'abc',
        spesialist: 'dokterginjal',
        nomor_telpdokter: '08123123',
        nama_pasien:'sule',
        alamat_pasien:'jln.abc',
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

    function change(args) {

        $scope.get_name = Auth.encodeJWT(args);
    }

}]);