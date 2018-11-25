var m = angular.module("App", ["ngRoute", "pusher-angular"]);

m.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {


    $rootScope.$on('$routeChangeStart', function (event) {

        $rootScope.$broadcast('currentlocation', $location.$$path);
         console.log($location.$$path);   
        
        var restrict = ['/dokter/pemesanan', '/pasien/pemesanan','/pasien/pencarian','/pasien/profil'];
        var find_restict=0;
        for (var t = 0; t < restrict.length; t++) {

            if ($location.$$path.match(restrict[t])) {
                //console.log('DENY');
                if (Auth.get_credentials_temp()) {
                    
                    $rootScope.$broadcast('getname_temp',Auth.get_credentials_temp());
                    find_restict++;
                } else if (Auth.get_credentials_perm()) {
                    $rootScope.$broadcast('getname_perm',Auth.get_credentials_perm());
                    find_restict++;
                } else {
                    
                    $location.path('/login');
                }

            } 
        }

        if(find_restict<1)
        {
            
                
                if (Auth.get_credentials_temp()) {
                   
                    if (Auth.encodeJWT(Auth.get_credentials_temp()).role == "patient") {
                        $location.path('/pasien/pemesanan');
                    }else if(Auth.encodeJWT(Auth.get_credentials_temp()).role == "dokter")
                    {
                        $location.path('/dokter/pemesanan');
                    }

                } else if (Auth.get_credentials_perm()) {
            
                    if (Auth.encodeJWT(Auth.get_credentials_perm()).role == "patient") {
                        $location.path('/pasien/pemesanan');
                    }else if(Auth.encodeJWT(Auth.get_credentials_perm()).role == "dokter")
                    {
                        $location.path('/dokter/pemesanan');
                    }
                } 

                //console.log('ALLOW');
                //$location.path('/home');
            
        }

    });

}]);


m.filter('convert_timestamp', function() {
    return function(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
    };
  })


// m.directive('myMaps', function () {
//     return {
//         restrict: 'E',
//         template: '<div ></div>',
//         replace: true,
//         link: function (scope, element, attrs) {
            


//             });




//         }
//     }
// });



// var myLatLng=new google.maps.LatLng(28.070011,83.24939);
// var mapOptions={
//   center:myLatLng,
//   zoom:16,
//   mapTypeId:google.maps.MapTypeId.SATELLITE
// };
// var map= new google.maps.Map(document.getElementById(attrs.id),mapOptions);
// var marker = new google.maps.Marker({position:myLatLng,map:map,title:"My Home Town"});
// marker.setMap(map);