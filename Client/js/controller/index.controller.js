m.controller('indexcontroller',['$scope', '$http','$pusher','Auth',function ($scope, $http,$pusher,Auth) {
    //Auth.store_credential_temp();
    
    $scope.logo="Logo";

    $scope.best_doctors=[
      {img_source:'aas',
       name:'Dr. Bernard Mahfouz',
       spesialist:'spesialis jantung',
       location:'jakarta',
       rating:7
     },
     {img_source:'aas',
      name:'Dr. Bernard Mahfouz',
      spesialist:'spesialis jantung',
      location:'jakarta',
      rating:7
    },
    {img_source:'aas',
     name:'Dr. Bernard Mahfouz',
     spesialist:'spesialis jantung',
     location:'jakarta',
     rating:7
   }
    ]
    //pusher
    var client = new Pusher(
      '6c6e7e68865fa076b342', {
        cluster: 'ap1',
        forceTLS: true
      }
    );
    var pusher = $pusher(client);



    var my_channel = pusher.subscribe('my-channel');
my_channel.bind('my-event', function(data) {
alert(JSON.stringify(data));
}
);
}]);
