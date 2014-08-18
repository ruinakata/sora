'use strict';


Sora.controller('OtherProfCtr', 
 ['$scope', '$rootScope', 'viewCoSrv', '$firebase', '$http', 'Facebook', 'FacebookPromises', '$routeParams',
      function($scope, $rootScope, viewCoSrv, $firebase, $http, Facebook, FacebookPromises, $routeParams) {
          console.log("in otherprofctr")
          $scope.otheruserid = $routeParams.userId;
          $scope.myuserid = FacebookPromises.userId;
          // check if we are already friends
          $scope.notfriends = true;
          var friendsref = new Firebase("https://amber-fire-4122.firebaseio.com/friends/" + $scope.myuserid + '/' + $scope.otheruserid)
          friendsref.on('value', function(snapshot){
            var answer = snapshot.val();
            if (answer.fbid){
              $scope.notfriends = false;
              $scope.alreadyfriends = true;
            };
            console.log("are we not friends?", $scope.notfriends)
          });
          var ref = new Firebase("https://amber-fire-4122.firebaseio.com/users/" + $scope.otheruserid)
          ref.on('value', function(snapshot) {
            console.log('snapshot:', snapshot.val())
            $scope.$apply($scope.pictures = snapshot.val().photos.slice(1,25))
            console.log("pictures", $scope.pictures)
            $scope.$apply($scope.otheruser = snapshot.val());
          })
          // check the friend request status is with this person
          var friendreqref = new Firebase("https://amber-fire-4122.firebaseio.com/friendreq/" + $scope.otheruserid)
          friendreqref.on('value', function(snapshot){
            console.log("all friend reqs this person received", snapshot.val());
            var freqs = snapshot.val();
            if (freqs == null) {
              console.log("they don't have any friend requests")
              $scope.$apply($scope.showfriendbutton = true);
              console.log($scope.showfriendbutton)
            }
            else {
              console.log("they do have some friend requests")
              // if I have sent this person a friend request and they have not approved
              console.log($scope.myuserid)
              console.log("freqs:", freqs)
              if (freqs[$scope.myuserid]) {
                var status = freqs[$scope.myuserid]["status"]
                console.log("status:", status)
                // if (freqs[FacebookPromises.userId][status] == "pending") {
                // console.log("hola")
                // }
                // if pending or declined, you can't send another request
                if (status == "pending" || status == "declined") {
                  console.log("don't show add friend button!")
                  $scope.showfriendbutton = false;
                }
                else {
                  console.log("show add friend button!")
                  $scope.showfriendbutton = true;
                }
              }
              else {
                $scope.$apply($scope.showfriendbutton = true);
              }
            }


            console.log("showfriendbutton:", $scope.showfriendbutton)
            console.log("notfriends:", $scope.notfriends)

          })


  // FRIEND REQUEST ///////////////////////////////////////////////

        $scope.addfriend = function(){
          console.log("in add friend method in otherprofctr");
          var myid = FacebookPromises.userId;
          var otheruserid = $routeParams.userId;
          var friendreqref = new Firebase("https://amber-fire-4122.firebaseio.com/friendreq/" + otheruserid);
          var request = {};
          //receiver is the key
          //request[otheruserid] = {};
          request[myid] = {"status": "pending"};
          if (request[myid]) {
            console.log("some thing exists")
          }
           $scope.$apply($scope.request = request)
          console.log("request hash", request);
          friendreqref.update(request);

        }
    }]
  );


