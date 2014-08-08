'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var FbService = angular.module('FbService', []).
  factory('FbSrv',['$q',function($q){
    return{
      checkLoginState : function(){
        var deferred = $q.defer();
        FB.getLoginStatus(function(response){
          if(response.status){
            deferred.resolve(response);
          } else {
            deferred.reject(response);
          }
        });
        return deferred.promise;
      },

      login : function(){
        var deferred = $q.defer();
        FB.login(function(response){
          if (response.status === 'connected') {
            deferred.resolve(response);
          } else if (response.status === 'not_authorized') {
            deferred.resolve(response);
          } else {
            deferred.reject(response);
          }
        },{scope:"user_about_me,user_birthday,user_friends,user_hometown,user_education_history,user_photos"});
        return deferred.promise;
      }
    }
  }]);

  var FireBaseService = angular.module('FireBaseService',["firebase"]).
    factory('FireSrv',[ "$firebase",function($firebase){
      var that = this;
      var ref = new Firebase("https://amber-fire-4122.firebaseio.com/");
      var sync = $firebase(ref);
      return {
        FirebaseSync : sync
      }
    }]);
