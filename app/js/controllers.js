'use strict';

/* Controllers */

 angular.module('profile', ['firebase'])
 .controller('ProfileCtr', ['$scope', '$rootScope', '$firebase', '$http', 'Facebook', 'FacebookPromises', function($scope, $rootScope, $firebase, $http, Facebook, FacebookPromises) {
		console.log("is facebook ready?", Facebook.isReady());
 		if ($scope.loggedInToFacebook) {
 			getMyFacebookInfo();
 		} else {
	 		$scope.$watch(function() {
	 			return $scope.loggedInToFacebook;
	 		},
	 		function(loggedIn) {
	 			console.log('newVal:', loggedIn);
	 			if (loggedIn) {
		 			getMyFacebookInfo();
	 			}
	 		});
 		}
		// var profileRef = new Firebase("https://amber-fire-4122.firebaseio.com/users/")
		// profileRef.on('value', function(snapshot) {
		// 	console.log("snapshot", snapshot.val());
		// })



 		function getMyFacebookInfo() {
 			console.log('kicking off get my facebook info');
	 		FacebookPromises.query('me', 'get', { fields: 'id,name,about,birthday,education,photos,education' })
	 			.then(function(response) {
	 				console.log(response)
	 				// $scope.profileinfo = response;
	 				var uniqueid = response.id;
	 				$rootScope.facebookId = uniqueid;
	 				var name = response.name;
	 				var birthday = response.birthday;
	 				var education = response.education[response.education.length-1].school.name
	 				var photos = [];
	 				console.log("hi")
	 				for (var i=0; i<response.photos.data.length; i++) {
	 					photos.push(response.photos.data[i].source);
	 				};
	 				// Save into firebase
	 				var profileRef = new Firebase("https://amber-fire-4122.firebaseio.com/users/" + uniqueid);
			 		
			 		// angularfire!!!///////////////////////////////////////////////////////
			 		var sync = $firebase(profileRef);
			 		//download the data into a local object
			 		var syncObject = sync.$asObject();
			 		// sync the object with a three way binding, use asObject() to create a synchronized object, then call $bindTo() which binds
			 		// it to a $scope variable 
			 		syncObject.$bindTo($scope, 'profile');

	 				var profile = { name: name, birthday: birthday, photos: photos, education: education };
	 				profileRef.set(profile);
			 		
	 				
	 			}, function(response) {
 					console.log(response);
	 			})
 		}



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



