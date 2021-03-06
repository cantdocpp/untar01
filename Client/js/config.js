m.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "./template/index.template.html",
        controller:'indexcontroller',
    })
    .when("/login", {
        templateUrl : "./template/login.template.html",
        controller:'logincontroller'
    })
    .when("/home", {
        templateUrl : "./template/home.template.html"
    })
    .when("/daftar", {
        templateUrl : "./template/register.template.html",
        controller:"registercontroller"
    })
    .when("/pasien/pemesanan",{
        templateUrl:'./template/pasien/pemesanan.template.html',
        controller:"PesanpasienController"
    })
    .when("/pasien/pencarian",{
        templateUrl:'./template/pasien/pencarian.template.html',
        controller:"PencarianController"
    })
    .when("/pasien/profil/:userid",{
        templateUrl:'./template/pasien/profildokter.template.html',
        controller:"profilcontroller",
        resolve:{
             user_id:function($route) {
                return $route.current.params.userid;
              }
        }
    })
    //Pasien
    .when("/pasien/pesan/:userid",{
        templateUrl:'./template/pasien/pesan.template.html',
        controller:"BookingController",
        resolve:{
             user_id:function($route) {
                return $route.current.params.userid;
              }
        }
    })
    .when("/pasien/Pengaturan",{
        templateUrl:'./template/pasien/pengaturan',
        controller:"BookingController",
        resolve:{
             user_id:function($route) {
                return $route.current.params.userid;
              }
        }
    })

    //Dokter
    .when("/dokter/pengaturan",{
        templateUrl:'./template/dokter/setting.template.html',
        controller:'SettingdoctorController'
    })

    
    .when("/dokter/pemesanan",{
        templateUrl:'./template/dokter/pemesanan.template.html',
        controller:"PesandokterController"
    })
    .otherwise({redirectTo: '/'});
});
