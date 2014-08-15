'use strict';

Sora.controller('FriendCtr', 
 ['$scope', '$rootScope', 'viewCoSrv', '$firebase', '$http', 'Facebook', 'FacebookPromises', '$routeParams', 
      function($scope, $rootScope, viewCoSrv, $firebase, $http, Facebook, FacebookPromises, $routeParams) {
        console.log("in Friend controller")

        // friend request list *****************************************************
        // check if I have any friend requests that I need to respond to
        var ref = new Firebase("https://amber-fire-4122.firebaseio.com/friendreq/" + FacebookPromises.userId)
        ref.on('value', function(snapshot){
            console.log("snapshot is ", snapshot.val());
            var friendreqs = snapshot.val();
            if (friendreqs){
                var senderarray = Object.keys(friendreqs)
                console.log("senderararyis", senderarray)
                var reqsenders = []
                for (var i=0; i<senderarray.length; i++) {
                    var senderinfo;
                    var senderid = senderarray[i];
                    console.log("senderid:", senderid)
                    var status = friendreqs[senderid].status 
                    console.log("status is", status)
                    if (status == "pending") {
                        console.log("in status==pending!")
                        var senderref = new Firebase("https://amber-fire-4122.firebaseio.com/users/" + senderid)
                        senderref.on('value', function(snapshot){
                            senderinfo = snapshot.val();
                            console.log("senderinfo", senderinfo)
                            var obj = {name: senderinfo.name, profpic: senderinfo.photos[0], fbid: senderid}
                            reqsenders.push(obj);
                            console.log("reqsenders", reqsenders)
                            $scope.$apply($scope.reqsenders = reqsenders)
                        })
                    }     
                }
            }

        })

        $scope.acceptrequest = function(reqsender){
            console.log("in acceptrequest fxn")
            // add to friend list on both ends
            var ref = new Firebase("https://amber-fire-4122.firebaseio.com/friends/" + FacebookPromises.userId + "/" + reqsender.fbid)
            ref.set({fbid: reqsender.fbid})
            var ref = new Firebase("https://amber-fire-4122.firebaseio.com/friends/" + reqsender.fbid + "/" + FacebookPromises.userId)
            ref.set({fbid: FacebookPromises.userId})
            var ref = new Firebase("https://amber-fire-4122.firebaseio.com/friendreq/" + FacebookPromises.userId + "/" + reqsender.fbid)
            ref.set(null);
        };

        $scope.declinerequest = function(reqsender){
            console.log("in declinerequest fxn")
            var ref = new Firebase("https://amber-fire-4122.firebaseio.com/friendreq/" + FacebookPromises.userId + "/" + reqsender.fbid)
            ref.update({status: "declined"})
        };

        // friend list *********************************************************************
        console.log("in friend list");
        var ref = new Firebase("https://amber-fire-4122.firebaseio.com/friends/" + FacebookPromises.userId)
        ref.on('value', function(snapshot){
            var allmyfriends = snapshot.val(); 
            console.log("allmyfriends", allmyfriends);
            var myfriendsidarray = Object.keys(allmyfriends);
            console.log(myfriendsidarray)
            var allfriendsinfo = []
            for (var i=0; i<myfriendsidarray.length; i++) {
                var ref = new Firebase("https://amber-fire-4122.firebaseio.com/users/" + myfriendsidarray[i])
                ref.on('value', function(snapshot){
                    var friend = snapshot.val();
                    var obj = {name: friend.name, profpic: friend.photos[0], fbid: myfriendsidarray[i]}
                    console.log("friend", obj);
                    allfriendsinfo.push(obj)
                    console.log("allfriendsinfo", allfriendsinfo)
                    $scope.$apply($scope.allmyfriends = allfriendsinfo);
                });
                
            }
        });
    }]
  );
