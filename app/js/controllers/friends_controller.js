'use strict';

Sora.controller('FriendCtr', 
 ['$scope', '$rootScope', 'viewCoSrv', '$firebase', '$http', 'Facebook', 'FacebookPromises', '$routeParams', 
      function($scope, $rootScope, viewCoSrv, $firebase, $http, Facebook, FacebookPromises, $routeParams) {
        console.log("in Friend controller")
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
        var ref = new Firebase("https://amber-fire-4122.firebaseio.com/friends/" + FacebookPromises.userId + "/" + reqsender.fbid)
        ref.set("accepted")
        var ref = new Firebase("https://amber-fire-4122.firebaseio.com/friendreq/" + FacebookPromises.userId + "/" + reqsender.fbid)
        ref.set(null);

    };

    $scope.declinerequest = function(reqsender){
        console.log("in declinerequest fxn")
        var ref = new Firebase("https://amber-fire-4122.firebaseio.com/friendreq/" + FacebookPromises.userId + "/" + reqsender.fbid)
    };


    }]
  );
