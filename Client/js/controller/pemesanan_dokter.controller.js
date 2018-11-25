m.controller('PesandokterController', ['$scope', '$http', '$rootScope', 'Auth','$pusher', function ($scope, $http, $rootScope, Auth,$pusher) {

    var modal_position = 0;
    var modal_position_history=0;

    var client = new Pusher(
        '6c6e7e68865fa076b342', {
            cluster: 'ap1',
            forceTLS: true
        }
    );
    var pusher = $pusher(client);
    $scope.tab = 1;

    $scope.setTab = function (newTab) {
        $scope.tab = newTab;
    };

    $scope.isSet = function (tabNum) {
        return $scope.tab === tabNum;
    };

    $scope.batal = function () {
        alert('Batal');
    }


    $scope.Data_pasien = [{
            nama_pasien: 'suel',
            alamat_pasien: 'Jl. ABC No. 50 Jakarta Pusat',
            no_telp_pasien: '0861',
            tanggal_pasien: 1543132940,
            keluhan_pasien: 'll'
        },
        {
            nama_pasien: 'Adam',
            alamat_pasien: 'Jl. Asss No. 50 Jakarta Wara',
            no_telp_pasien: '0861',
            tanggal_pasien: 1543132940,
            keluhan_pasien: 'll'
        }
    ]

    $scope.Riwayat_pasien = [];

    $scope.open_modal_diagnos = function ($event) {
        modal_position = $event.target.getAttribute('data-posisi');
        var Load_Data = $scope.Data_pasien[modal_position];
        $scope.modal_pname = Load_Data.nama_pasien;
        $scope.modal_paddress = Load_Data.alamat_pasien;
        $scope.modal_pdate = Load_Data.tanggal_pasien;
        $scope.modal_precomend = "";
        $scope.modal_presep = "";
        $('#diagnosis').modal('show');
        // $('#myModal').modal('hide');
    }


    $scope.buatdiagnosis = function () {
        alert(modal_position);
    }





    var my_channel = pusher.subscribe('my-channel');
    my_channel.bind('add-patient', function (data) {
        $scope.Data_pasien.push(data);
    });

}]);