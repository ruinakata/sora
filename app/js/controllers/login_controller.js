'use strict';

/* Controllers */

 var profileModule = angular.module('profile', ['firebase'])


/////////  LOGIN CONTROLLER  /////////////////////////////////////////////////////////////////

 angular.module('SoraLogin', [])


 .controller('LoginCtr', ['$location', '$scope', 'FacebookPromises', function($location, $scope, FacebookPromises) {

    $scope.$on('showLoginElements',function(){
      console.log('mussels!!');
      $scope.classView = 'show-element-login';
    });
    $scope.login = function(){
      console.log('In Login Ctr');
      FacebookPromises.login()
        .then(function(response){
          $location.path('/home');
          console.log('good',response);
        },function(response){
          console.log('error',response);
        });
    };
  }]);

