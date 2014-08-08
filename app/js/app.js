'use strict';


angular.module('Sora', [
  'ngRoute',
  'FbService',
  'profile',
  'SoraLogin',
  'FbService',
]).
config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtr'});
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'LoginCtr'});
  $routeProvider.when('/profile', {templateUrl: 'partials/profile.html', controller: 'ProfileCtr'});
  $routeProvider.otherwise({redirectTo: '/login'});
}]).

controller('MainController',['$scope','$route',function($scope,$route){
  $scope.showLogin = false;
  $scope.$on('$locationChangeSuccess',function(){
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
