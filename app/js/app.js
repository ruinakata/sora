'use strict';


angular.module('Sora', [
	'ngRoute',
	'FbService'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtr'});
  $routeProvider.otherwise({redirectTo: '/login'});
}]);