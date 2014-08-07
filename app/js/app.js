'use strict';


angular.module('Sora', [
	'ngRoute',
	'FbService'
]).
config(['$routeProvider', function($routeProvider) {
<<<<<<< HEAD
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);







$(document).ready(function() {

	//GET BROWSER WINDOW HEIGHT
	var currHeight = $(window).height();
	//SET HEIGHT OF SIDEBAR AND CONTENT ELEMENTS
	$('#sidebar, #content').css('height', currHeight);

	//ON RESIZE OF WINDOW
	$(window).resize(function() {

		//GET NEW HEIGHT
		var currHeight = $(window).height();	
		//RESIZE BOTH ELEMENTS TO NEW HEIGHT
		$('#sidebar, #content').css('height', currHeight);

	});

});
=======
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtr'});
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
>>>>>>> 77c2a6016127974c01200d680fed706cb9cffb09
