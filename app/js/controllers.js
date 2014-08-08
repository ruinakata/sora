'use strict';

/* Controllers */

 angular.module('profile', [])
 .controller('ProfileCtr', ['$scope', function($scope) {

  }]);

 angular.module('SoraLogin', [])
 .controller('LoginCtr', ['$location','$scope','FbSrv', function($location,$scope,FbSrv) {

 		this.login = function(){
 			console.log('happening!!!!');
 			FbSrv.login().then(function(response){
 				$location.path('/home');
 				console.log('good',response);
 			},function(response){
 				console.log('error',response);
 			});
 		};

  }]);

