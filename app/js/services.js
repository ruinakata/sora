'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var FbService = angular.module('FbService', ['facebook']).
  factory('FacebookPromises' ,['$q', 'Facebook', function($q, Facebook){
    return{
      checkLoginState : function(){
        var deferred = $q.defer();
        Facebook.getLoginStatus(function(response) {
          if(response.status){
            deferred.resolve(response);
          } else {
            deferred.reject(response);
          }
        });
        return deferred.promise;
      },

      login : function() {
        var deferred = $q.defer();
        Facebook.login(function(response) {
          if (response.status === 'connected') {
            deferred.resolve(response);
          } else if (response.status === 'not_authorized') {
            deferred.resolve(response);
          } else {
            deferred.reject(response);
          }
        },{scope:"user_about_me,user_birthday,user_friends,user_hometown,user_education_history,user_photos"});
        return deferred.promise;
      },

      query : function(query, method, params) {
        var deferred = $q.defer();
        Facebook.api(query, method, params, function(response) {
          if (response.error) {
            deferred.reject(response);
          } else {
            deferred.resolve(response);
          }
        });
        return deferred.promise;
      }
    }
  }]);


// var DataService = angular.module('DataService', []).
//   factory('DataSrv', ['$firebase',function($firebase) {
//       return {
//         // now we can use $firebase to synchronize data between clients and the server!
//         ref : new Firebase("https://radiant-fire-317.firebaseio.com/"),
//         sync : $firebase(ref)
//       }

//     });
//   ]);