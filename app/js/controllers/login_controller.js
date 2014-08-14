'use strict';

/* Controllers */

 var profileModule = angular.module('profile', ['firebase'])


/////////  LOGIN CONTROLLER  /////////////////////////////////////////////////////////////////

 angular.module('SoraLogin', [])


 .controller('LoginCtr', ['$location', '$scope', 'FacebookPromises','FireSrv', function($location, $scope, FacebookPromises,FireSrv) {

    $scope.$on('showLoginElements',function(){
      console.log('mussels!!');
      $scope.classView = 'show-element-login';
    });
    $scope.login = function(){
      console.log('In Login Ctr');
      FacebookPromises.login()
        .then(function(response){
          var userId = response.authResponse.userID;
          FireSrv.verifySoraUser(userId,function(){
            FacebookPromises.query('me', 'get', { fields: 'id,name,about,birthday,education,photos,education' })
              .then(function(response){
                var newUser = {};
                newUser.name = response.name;
                newUser.birthday = response.birthday;
                newUser.education = response.education[response.education.length-1].school.name;
                newUser.photos = [];
                for (var i=0; i<response.photos.data.length; i++) {
                  newUser.photos.push(response.photos.data[i].source);
                };
                FireSrv.createSoraUser(userId,newUser);
              });
          });
          $location.path('/home');
          console.log('good',response);
        },function(response){
          console.log('error',response);
        });
    };
  }]);

