'use strict';


// Other Profile Directive ***************************************************************

Sora.controller('OtherProfCtr',
 ['$scope', '$rootScope', 'viewCoSrv', '$firebase', '$http', 'Facebook', 'FacebookPromises',
      function($scope, $rootScope, viewCoSrv, $firebase, $http, Facebook, FacebookPromises) {
          $scope.$on('showElements',function(){
            console.log('mussels!!');
            $scope.classView = 'show-elementsview';
          });
          var otheruserid = viewCoSrv.viewInfo.postInfo.organizerId;
          console.log("in otherprofctr")
          $scope.user = viewCoSrv.viewInfo.postInfo;
          $scope.otheruser = viewCoSrv.otherProfInfo;
          $scope.alreadysent = false;
          $scope.friendstatus = viewCoSrv.otherProfInfo;
          console.log('que???????',$scope.friendstatus);

          var myid = FacebookPromises.userId;
          console.log('my id:', myid);
          console.log(otheruserid);
          var isFriend = new Firebase("https://amber-fire-4122.firebaseio.com/friendreq/" + myid + '/' + otheruserid + '/status');
          console.log('isFriend:', isFriend)

  // FRIEND REQUEST ///////////////////////////////////////////////

        this.addfriend = function(){
          var myid = FacebookPromises.userId;
          console.log("in add friend method in otherprofctr");
          var friendreqref = new Firebase("https://amber-fire-4122.firebaseio.com/friendreq")
          var request = {}
          request[otheruserid] = {}
          request[otheruserid][myid] = {"status": "pending"}

          // make each request have a unique key
          console.log("request hash", request);
          friendreqref.set(request);

        };
    }]
  );


