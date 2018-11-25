m.factory('Api', function($http){

    var factory={};

    var URL_LIST={
        LOGIN:"",
        REGISTER_PATIEN:"",
        REGISTER_DOCTOR:""
    };
    
    factory.login=function(Role,Data){

    };
    factory.register=function(ROLE,DATA){
        
        var Url;
        var deferred = $q.defer();

        if(ROLE === "patien")
        {
            Url=URL_LIST.REGISTER_PATIEN;
        }else if(ROLE === "doctor")
        {
            Url=URL_LIST.REGISTER_DOCTOR;
        }
            

            setTimeout(function() {
              deferred.notify();
          

              $http({
              method: 'Post',
              url :  Url,
              headers: {
                   'Content-Type': 'application/json',
                   'Access-Control-Allow-Origin': '*'
               },
              data : DATA
            }).then(function successCallback(response) {
                //   console.table(response.status);
        
                  deferred.resolve(response);
          
                }, function errorCallback(response) {
                  //response.data
                  deferred.reject();
                });
              }, 200);
          
            return deferred.promise;
    };


    factory.dalam_proses_pasien=function(){};
    factory.selesai_pasien=function(){};
    factory.profil_dokter=function(){};
    factory.pencarian=function(){};
    factory.best_doctor=function(){};
    return factory;
    });