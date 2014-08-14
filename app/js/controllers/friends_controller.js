'use strict';

Sora.controller('FriendCtr', 
 ['$scope', '$rootScope', 'viewCoSrv', '$firebase', '$http', 'Facebook', 'FacebookPromises', '$routeParams', 
      function($scope, $rootScope, viewCoSrv, $firebase, $http, Facebook, FacebookPromises, $routeParams) {
        console.log("in Friend controller")
        console.log("routeparams", $routeParams)
        // $scope.friendstatus = viewCoSrv.otherProfInfo;
       
        // var isFriend = new Firebase("https://amber-fire-4122.firebaseio.com/friendreq/" + myid + '/' + otheruserid + '/status');

        // .goToOtherProfile = function(){
        //   console.log("in goToOtherProfile method in FriendCtr")

        // };

        // this.addfriend = function(){
        //   var myid = FacebookPromises.userId;
        //   console.log("in add friend method in otherprofctr");
        //   var friendreqref = new Firebase("https://amber-fire-4122.firebaseio.com/friendreq");
        //   var request = {}
        //   request[otheruserid] = {}
        //   request[otheruserid][myid] = {"status": "pending"}

        //   // make each request have a unique key
        //   console.log("request hash", request);
        //   friendreqref.set(request);

        // };
    }]
  );
