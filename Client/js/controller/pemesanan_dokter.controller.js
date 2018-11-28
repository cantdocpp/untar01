m.controller('PesandokterController', ['$scope', '$http', '$rootScope', 'Auth','$pusher','$location','Api', function ($scope, $http, $rootScope, Auth,$pusher,$location,Api) {


    $scope.get_name=(Auth.encodeJWT(Auth.get_credentials_temp())).name;

    var modal_position = 0;
    var modal_position_history=0;

    // 5bfe93a028a6201f540b520a


    $scope.logout=function(){
        Auth.logout();
        $location.path('/');
    }
    var client = new Pusher(
        'eb98b9cdfd884e56a7b0', {
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

    $scope.batal = function ($event) {
        modal_position = $event.target.getAttribute('data-posisi');

        
             Api.remove_patien($scope.Data_pasien[modal_position].id)
            .then(function successCallback(response) {
                $scope.Data_pasien.splice(modal_position, 1);
              }, function errorCallback(response) {
                alert('Tidak bisa dibatalkan silakan coba lagi')
              });
    }


    $scope.Data_pasien = [{
            id:'123',
            nama_pasien: 'suel',
            alamat_pasien: 'Jl. ABC No. 50 Jakarta Pusat',
            no_telp_pasien: '0861',
            tanggal_pasien: 1543132940,
            keluhan_pasien: 'll'
        },
        {   id:'234',
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
        $scope.modal_keluhan_pasien=Load_Data.keluhan_pasien;
        $('#diagnosis').modal('show');
        // $('#myModal').modal('hide');
    }


    $scope.buatdiagnosis = function () {
   
        
    }




    var code=Auth.encodeJWT(Auth.get_credentials_temp())
    setTimeout(function(){ 
        var my_channel = pusher.subscribe(code.channel_id);
        my_channel.bind('add-patient', function (data) {
            // $scope.Data_pasien.push(data);
            console.log(data.data);
            var hasil =data.data;
            var data={};
            data.id=hasil._id;
            data.nama_pasien=hasil.nama_pasien;
            data.alamat_pasien=hasil.Alamat;
            data.no_telp_pasien='0000000';
            data.tanggal_pasien=hasil.tanggal_pesan;
            data.keluhan_pasien=hasil.keluhan;
            $scope.Data_pasien.push(data);
        });
     }, 1000);
  



}]);