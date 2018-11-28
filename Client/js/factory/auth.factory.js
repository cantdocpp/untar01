
m.factory('Auth', function(){
var user=true;

var factory={};
factory.setUser=function(aUser){
    user =true;
};
factory.isLoggedIn=function(){
    return(user)? user : false;
};
factory.get_credentials_temp=function(){
    var name="token";
     var nameEQ = name + "=";
     var ca = document.cookie.split(';');
     for(var i=0;i < ca.length;i++) {
         var c = ca[i];
         while (c.charAt(0)==' ') c = c.substring(1,c.length);
         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
     }
     return null;
};
factory.get_credentials_perm=function(){
    
  if (localStorage.getItem("token") !== null) {
      console.log(localStorage.getItem("token"))
     return localStorage.getItem("token");
  }else {
    return null;
  }

};
factory.store_credential_temp=function(tokenvalue){
   var d = new Date();
   var exdays=1;
   d.setTime(d.getTime() + (exdays*24*60*60*1000));
   var expires = "expires="+ d.toUTCString();
   var cname="token";
   var cvalue=tokenvalue;
   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

factory.store_credential_long_term=function(token){
   localStorage.setItem("token", token);
};

factory.encodeJWT=function(token){
   
              var base64Url = token.split('.')[1];
              var base64 = base64Url.replace('-', '+').replace('_', '/');
              return JSON.parse(window.atob(base64));
}

factory.logout=function(){
    alert('logout');
    var name="token";
    document.cookie = name+'=; Max-Age=-99999999;'+ "path=/";
    localStorage.removeItem("token")
}


return factory;
});


