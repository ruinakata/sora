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
  					deferred.resolve(response);
  				}
  			});
  			return deferred.promise;
  		}
  	}
  }]);
