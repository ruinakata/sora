'use strict';


angular.module('Sora', [
  'ngRoute',
  'facebook',
  'profile',
  'SoraLogin',
  'FbService',
  'firebase'
]).
config(['$routeProvider', 'FacebookProvider', function($routeProvider, FacebookProvider) {
  FacebookProvider.init('358277447659197');
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtr'});
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'LoginCtr'});
  $routeProvider.when('/profile', {templateUrl: 'partials/profile.html', controller: 'ProfileCtr'});
  $routeProvider.otherwise({redirectTo: '/login'});
}]).

controller('MainController',['$scope', '$route', 'Facebook',function($scope, $route, Facebook){

  $scope.showLogin = false;
  $scope.loggedInToFacebook = false;
  $scope.$on('$locationChangeSuccess',function() {

    Facebook.getLoginStatus(function(response) {
      console.log(response);
      if (response.status === 'connected') {
        $scope.loggedInToFacebook = true;
      } else {
      }
    });

    // FbSrv.checkLoginState()
    // .then(function(response){
    //   console.log('login status',response);
    // },function(response){
    //   console.log('login status error',response);
    // });
    // console.log('casa')

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
