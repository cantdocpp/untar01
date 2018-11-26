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
    .when("/pasien/pesan/:userid",{
        templateUrl:'./template/pasien/pesan.template.html',
        resolve:{
             user_id:function($route) {
                return $route.current.params.userid;
              }
        }
    })

    
    .when("/dokter/pemesanan",{
        templateUrl:'./template/dokter/pemesanan.template.html',
        controller:"PesandokterController"
    })
    .otherwise({redirectTo: '/'});
});
