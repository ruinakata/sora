'use strict';

// Other Profile Directive ***************************************************************


home.directive('otherprofileDirective', function(){
  return {
    restrict: 'E',
    transclude: true,
    templateUrl:'partials/otherprofile.html',
    controller: ['$scope', '$rootScope', 'viewCoSrv', '$firebase', '$http', 'Facebook', 'FacebookPromises',
      function($scope, $rootScope, viewCoSrv, $firebase, $http, Facebook, FacebookPromises) {
          var otheruserid = viewCoSrv.viewInfo.postInfo.organizerId;
          console.log("in otherprof controller")

          $scope.user = viewCoSrv.viewInfo.postInfo;
          // $scope.user.organizerId;
          // var userref = new Firebase ("https://amber-fire-4122.firebaseio.com/users/");

          $scope.otheruser = viewCoSrv.otherProfInfo;
          $scope.alreadysent = false;
          $scope.friendstatus = viewCoSrv.otherProfInfo;
          console.log('que???????',$scope.friendstatus);

          var myid = FacebookPromises.userId;
          console.log('my id:', myid);
          console.log(otheruserid);
          var isFriend = new Firebase("https://amber-fire-4122.firebaseio.com/friendreq/" + myid + '/' + otheruserid + '/status');

          console.log('isFriend:', isFriend)
          console.log("in otherprofctr")
          console.log("in otherprofiledirective")


  // FRIEND REQUEST ///////////////////////////////////////////////

        this.addfriend = function(){
          var myid = FacebookPromises.userId;
          console.log("in add friend method in otherprofctr");
          var friendreqref = new Firebase("https://amber-fire-4122.firebaseio.com/friendreq")
          var request = {}
          request[myid] = {}
          request[myid][otheruserid] = {"status": "pending"}

          // make each request have a unique key
          console.log("request hash", request);
          friendreqref.set(request);

        };
    }],
    controllerAs: 'OtherProfCtr'
  };
});


