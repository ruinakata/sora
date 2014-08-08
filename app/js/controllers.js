'use strict';

/* Controllers */

 angular.module('profile', [])
 .controller('ProfileCtr', ['$scope', '$http', 'Facebook', 'FacebookPromises', function($scope, $http, Facebook, FacebookPromises) {
		console.log("is facebook ready?", Facebook.isReady());
 		if ($scope.loggedInToFacebook) {
 			getMyFacebookInfo();
 		} else {
	 		$scope.$watch(function() {
	 			return $scope.loggedInToFacebook;
	 		}, function(loggedIn) {
	 			console.log('newVal:', loggedIn);
	 			if (loggedIn) {
		 			getMyFacebookInfo();
	 			}
	 		});
 		}

 		function getMyFacebookInfo() {
 			console.log('kicking off get my facebook info');
	 		FacebookPromises.query('me', 'get', { fields: 'id,name,about,birthday,education,photos' })
	 			.then(function(response) {
	 				$scope.profileinfo = response;
	 			}, function(response) {
 					console.log(response);
	 			})
 		}
 		// $http.get('me?&fields=id,name,about,birthday,education,photos').success(function(data) 	{
 		// 	$scope.profileinfo = data;
 		// });
  }]);


 angular.module('SoraLogin', [])
 .controller('LoginCtr', ['$location', '$scope', 'FacebookPromises', function($location, $scope, FacebookPromises) {

 		this.login = function(){
 			console.log('happening!!!!');
 			FacebookPromises.login()
 				.then(function(response){
	 				$location.path('/home');
	 				console.log('good',response);
	 			},function(response){
 					console.log('error',response);
 				});
 		};

  }]);



