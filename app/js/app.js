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

  // FacebookProvider.init('358277447659197');
  FacebookProvider.init('364072353746373');
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtr'});
  $routeProvider.when('/profile', {templateUrl: 'partials/profile.html', controller: 'ProfileCtr'});
  $routeProvider.when('/event/:eventId', {templateUrl: 'partials/event-room.html', controller: 'eventRoomController'});
  $routeProvider.when('/otherprofile/:userId', {templateUrl: 'partials/otherprofile.html', controller: 'OtherProfCtr'});
  $routeProvider.when('/home', {templateUrl: 'partials/post.html', controller: 'PostCtr'});
  $routeProvider.when('/myfriends', {templateUrl: 'partials/friends.html', controller: 'FriendCtr'});
  $routeProvider.when('/trending', {templateUrl: 'partials/trending.html', controller: 'TrendingCtr'});
  $routeProvider.when('/find', {templateUrl: 'partials/find.html', controller: 'FindCtr'});
  $routeProvider.when('/onepost', {templateUrl: 'partials/onepost.html', controller: 'OnePostCtr'});
  $routeProvider.otherwise({redirectTo: '/login'});

}]).

controller('MainController',
  ['$location',
  '$scope',
  '$route',
  'Facebook',
  'FacebookPromises',
  'FireSrv',
  function($location, $scope, $route, Facebook,FacebookPromises,FireSrv){

  $scope.loading = true;
  $scope.showLogin = false;
  $scope.loggedInToFacebook = false;

  $scope.$on('$locationChangeSuccess',function() {

    Facebook.getLoginStatus(function(response) {
      console.log('Login status response:', response);
      if (response.status === 'connected') {
        FacebookPromises.userId = response.authResponse.userID;
        FacebookPromises.query('me', 'get', { fields: 'name,picture' })
          .then(function(response){
            // console.log('!!!!!!!response!!!!!!!!!!',response);
            FacebookPromises.userName = response.name;
            FacebookPromises.userPicture = response.picture.data.url;
          });
        $scope.showLogin = false;
        $scope.$broadcast('showElements');
        $scope.loggedInToFacebook = true;
        $scope.bodyStyle = "app-body";
        $scope.loading = false;
        $scope.videoClass = 'bgvid-hide'
        $scope.showLogin = false;
        if(!FireSrv.sessionEstablished){
          FireSrv.storeUserSession(response.authResponse.userID);
          FireSrv.sessionEstablished = true;
        }
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


var home = angular.module('home',[]);

home.controller('homeController',['$scope','viewCoSrv',function($scope,viewCoSrv){
  $scope.view = viewCoSrv.viewInfo;
  $scope.setView = function(view){
    console.log(' happening .-.');
    // viewCoSrv.viewInfo.partialToShow = view;
  };
}]);


