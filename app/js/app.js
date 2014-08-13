

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
  $routeProvider.when('/profile/:userId', {templateUrl: 'partials/profile.html', controller: 'ProfileCtr'});
  $routeProvider.when('/event/:eventId', {templateUrl: 'partials/event-room.html', controller: 'eventRoomController'});
  $routeProvider.when('/otherprofile/:userId', {templateUrl: 'partials/otherprofile.html', controller: 'OtherProfCtr'});
  $routeProvider.when('/home', {templateUrl: 'partials/post.html', controller: 'PostCtr'});
  $routeProvider.otherwise({redirectTo: '/login'});
}]).

controller('MainController',['$location','$scope', '$route', 'Facebook','FacebookPromises',function($location, $scope, $route, Facebook,FacebookPromises){

  $scope.showLogin = false;
  $scope.loggedInToFacebook = false;

  $scope.$on('$locationChangeSuccess',function() {
 
    Facebook.getLoginStatus(function(response) {
      FacebookPromises.userId = response.authResponse.userID;
      console.log(response);
      if (response.status === 'connected') {
        $scope.loggedInToFacebook = true;
        if ($route.current.redirectTo == '/login'){
         $location.path('/home');
        } 
      }
      else {
        if ($route.current.redirectTo == '/login'){
        }
        else {
          $location.path('/login');
        }
      }
    });
    console.log(':S',$route);
    if($route.current.redirectTo){
      if($route.current.redirectTo == '/login'){
        $scope.videoClass = 'bgvid-show'
        $scope.bodyStyle = "login-body";
        $scope.showLogin = true;
        console.log('showLogin:',$scope.showLogin);
      }else{
        $scope.videoClass = 'bgvid-hide'
        $scope.showLogin = false;
        $scope.bodyStyle = "app-body";
        console.log('showLogin:',$scope.showLogin);
      }
    }else if($route.current.$$route.originalPath){
      if($route.current.$$route.originalPath == '/login'){
        $scope.videoClass = 'bgvid-show'
        $scope.bodyStyle = "login-body";
        $scope.showLogin = true;
        console.log('showLogin:',$scope.showLogin);
      } else{
        $scope.videoClass = 'bgvid-hide'
        $scope.showLogin = false;
        $scope.bodyStyle = "app-body";
        console.log('showLogin:',$scope.showLogin);
      }
    }
  });
}]);
