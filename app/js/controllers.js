'use strict';

/* Controllers */

 angular.module('profile', [])
 .controller('ProfileCtr', ['$scope', function($scope) {

  }]);

 angular.module('SoraLogin', [])
 .controller('LoginCtr', ['$scope','FbSrv', function($scope,FbSrv) {
 		this.login = function(){
 			console.log('happening!!!!');
 			FbSrv.login().then(function(){
 				console.log('good',response);
 			},function(response){
 				console.log('error',response);
 			});
 		}
  }]);

