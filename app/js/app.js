'use strict';


angular.module('Sora', [
	'ngRoute',
	'FbService',
	'profile'
]).
config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtr'});
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'LoginCtr'});
  $routeProvider.when('/profile', {templateUrl: 'partials/profile.html', controller: 'ProfileCtr'});
  // $routeProvider.otherwise({redirectTo: '/login'});
}]);
