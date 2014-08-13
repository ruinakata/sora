

'use strict';


var Sora = angular.module('Sora', [
  'ngRoute',
  'facebook',
  'profile',
  'SoraLogin',
  'FbService',
  'FireBaseService',
  'home',
  'firebase',
  'viewComunicationService'
]).
config(['$routeProvider', 'FacebookProvider', function($routeProvider, FacebookProvider) {
  FacebookProvider.init('358277447659197');
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtr'});
  $routeProvider.when('/profile/:id', {templateUrl: 'partials/profile.html', controller: 'ProfileCtr'});
  $routeProvider.when('/event/:eventId', {templateUrl: 'partials/event-room.html', controller: 'eventRoomController'});
  $routeProvider.when('/otherprofile/:userId', {templateUrl: 'partials/otherprofile.html', controller: 'OtherProfCtr'});
  $routeProvider.when('/home', {templateUrl: 'partials/post.html', controller: 'PostCtr'});
  $routeProvider.when('/myfriends', {templateUrl: 'partials/friends.html', controller: 'FriendCtr'});
  $routeProvider.otherwise({redirectTo: '/login'});

}]).

controller('MainController',
  ['$location',
  '$scope',
  '$route',
  'Facebook',
  'FacebookPromises',
  function($location, $scope, $route, Facebook,FacebookPromises){

  $scope.loading = true;
  $scope.showLogin = false;
  $scope.loggedInToFacebook = false;

  $scope.$on('$locationChangeSuccess',function() {

    Facebook.getLoginStatus(function(response) {
      FacebookPromises.userId = response.authResponse.userID;
      console.log('Login status response:', response);

      if (response.status === 'connected') {
        FacebookPromises.userId = response.authResponse.userID;
        $scope.showLogin = false;
        $scope.$broadcast('showElements');
        $scope.loggedInToFacebook = true;
        $scope.bodyStyle = "app-body";
        $scope.loading = false;
        $scope.videoClass = 'bgvid-hide'
        $scope.showLogin = false;
        if ($route.current.$$route.originalPath == '/login') {
          $location.path('/home');
        }
      } else {
        $scope.loading = false;
        $scope.videoClass = 'bgvid-show'
        $scope.bodyStyle = "login-body";
        $scope.$broadcast('showLoginElements');
        $scope.showLogin = true;
        FacebookPromises.userId = undefined;
        $scope.loggedInToFacebook = true;
        if ($route.current.$$route.originalPath != '/login') {
          $location.path('/login');
        };
      }
    });
  });
}]);

