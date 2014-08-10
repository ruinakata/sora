'use strict';

/* Controllers */

 var profileModule = angular.module('profile', ['firebase'])

 profileModule.controller('ProfileCtr', ['$scope', '$rootScope', '$firebase', '$http', 'Facebook', 'FacebookPromises', function($scope, $rootScope, $firebase, $http, Facebook, FacebookPromises) {
		console.log("is facebook ready?", Facebook.isReady());
 		if ($scope.loggedInToFacebook) {
 			getMyFacebookInfo();
 		}
 		else {
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
	 				profileRef.update(profile);


	 			}, function(response) {
 					console.log(response);
	 			})
 		}



 		var showProfileRef = new Firebase("https://amber-fire-4122.firebaseio.com/users/")
		showProfileRef.on('value', function(snapshot) {
				console.log("snapshot", snapshot.val());
				var users = snapshot.val();
				console.log("fbidddd", FacebookPromises.userId);
				var fbookid = FacebookPromises.userId;
				console.log(users);
				console.log("ihope this works", users[fbookid]);
				$scope.$apply($scope.me = users[fbookid]);
				console.log($scope.me);


				// when aboutme exists, don't show exit form. when clicked show edit form.
				$scope.aboutmeexists = false
				if ($scope.me.aboutme) {
					$scope.aboutmeexists = true
				}
				console.log("about me exists", $scope.aboutmeexists)

		});

// when submit button is clicked, save about me text to firebase
		this.submitAboutMe =function(){
			console.log("aboutmeis", $scope.aboutmetext);
			console.log(FacebookPromises.userId);
			var fbid = FacebookPromises.userId;
			var meRef = showProfileRef.child(fbid);
			meRef.update({aboutme: $scope.aboutmetext})
		};


  }]);


profileModule.controller('PostCtr', ['$scope', '$rootScope', '$firebase', '$http', 'Facebook', 'FacebookPromises', function($scope, $rootScope, $firebase, $http, Facebook, FacebookPromises) {

  }]);


 angular.module('SoraLogin', [])
 .controller('LoginCtr', ['$location', '$scope', 'FacebookPromises', function($location, $scope, FacebookPromises) {

 		this.login = function(){
 			console.log('happening!!!!');
 			FacebookPromises.login()
 				.then(function(response){
	 				// FacebookPromises.userId =  response.authResponse.userID;
	 				$location.path('/home');
	 				console.log('good',response);
	 			},function(response){
 					console.log('error',response);
 				});
 		};
  }]);

 var home = angular.module('home',[]);

 home.controller('homeController',['$scope','viewCoSrv',function($scope,viewCoSrv){
 	$scope.view = viewCoSrv.viewInfo;
 	this.setView = function(view){
    viewCoSrv.viewInfo.partialToShow = view;
  };
 }]);

