'use strict';


Sora.controller('OtherProfCtr', 
 ['$scope', '$rootScope', 'viewCoSrv', '$firebase', '$http', 'Facebook', 'FacebookPromises', '$routeParams',
      function($scope, $rootScope, viewCoSrv, $firebase, $http, Facebook, FacebookPromises, $routeParams) {
          //var otheruserid = viewCoSrv.viewInfo.postInfo.organizerId;

          console.log("in otherprofctr")
          $scope.otheruserid = $routeParams.userId;
          $scope.myuserid = FacebookPromises.userId;
          console.log("myuserid", $scope.myuserid)
          var ref = new Firebase("https://amber-fire-4122.firebaseio.com/users/" + $scope.otheruserid)
          ref.on('value', function(snapshot) {
            console.log('snapshot:', snapshot.val())
            $scope.$apply($scope.otheruser = snapshot.val());

          })
          // check the friend status is with this person
          var friendreqref = new Firebase("https://amber-fire-4122.firebaseio.com/friendreq")

          // console.log("routeparams userID", $routeParams.userId)
          // $scope.user = viewCoSrv.viewInfo.postInfo;
          // $scope.otheruser = viewCoSrv.otherProfInfo;
          // $scope.alreadysent = false;
          // $scope.friendstatus = viewCoSrv.otherProfInfo;
          // console.log('que???????',$scope.friendstatus);

          // var myid = FacebookPromises.userId;
          // console.log('my id:', myid);
          // console.log(otheruserid);
          // var isFriend = new Firebase("https://amber-fire-4122.firebaseio.com/friendreq/" + myid + '/' + otheruserid + '/status');
          // console.log('isFriend:', isFriend)

  // FRIEND REQUEST ///////////////////////////////////////////////

        this.addfriend = function(){
          var myid = FacebookPromises.userId;
          console.log("in add friend method in otherprofctr");
          var friendreqref = new Firebase("https://amber-fire-4122.firebaseio.com/friendreq")
          var request = {}
          //receiver is the key
          request[otheruserid] = {}
          request[otheruserid][myid] = {"status": "pending"}
          console.log("request hash", request);
          friendreqref.set(request);

        };
    }]
  );


