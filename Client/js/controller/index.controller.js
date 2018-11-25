m.controller('indexcontroller',['$scope', '$http','Auth',function ($scope, $http,Auth) {
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

}]);
