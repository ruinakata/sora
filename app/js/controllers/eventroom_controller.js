'use strict';

Sora.controller('eventRoomController',[
  '$location',
  '$routeParams',
  '$scope',
  'FireSrv',
  'FacebookPromises',
  'viewCoSrv',
  function($location, $routeParams,$scope,FireSrv,FacebookPromises,viewCoSrv){
    $scope.$on('showElements',function(){
      console.log('mussels!!');
      $scope.classView = 'show-elementsview';
    });
    // syncronizing view information
    $scope.eventDetails = viewCoSrv.viewInfo.postInfo;
    // get chat room when necesary
    // $scope.$on('getChatThread',function(event,post_id){
    //   $scope.conversationRoom = FireSrv.getRoomChat(post_id).$asArray();
    // });
    console.log('see parmas:',$routeParams.eventId);
    $scope.conversationRoom = FireSrv.getRoomChat($routeParams.eventId).$asArray();
    $scope.addReply = function(keyEvent){
      if(keyEvent.keyIdentifier=='Enter'){
        var reply = {};
        reply.replyUsrId = FacebookPromises.userId;

        var userref = new Firebase("https://amber-fire-4122.firebaseio.com/users/"+FacebookPromises.userId);
        userref.on('value',function(snapshot){
          reply.userPotho = snapshot.val().photos[0];
          reply.userName = snapshot.val().name;
          reply.text = $scope.reply;
          $scope.conversationRoom.$add(reply);
          $scope.reply = "";
        });
      }
    };

    $scope.feedClass = function(id){
      if(id == FacebookPromises.userId){
        return 'actual-user-reply';
      } else {
        return 'other-user-reply';
      }
    };

    $scope.isIdleActualUser =function(id){
      if(id == FacebookPromises.userId){
        return true;
      } else {
        return false;
      }
    };

    $scope.scrollDonw = function(){
      console.log("happening :O??");
      $(".chat-stream").scrollTop($(".chat-stream")[0].scrollHeight);
    };

  $scope.goToOtherProfile = function(){
    $location.path("/otherprofile/" + viewCoSrv.viewInfo.postInfo.organizerId);
  //   viewCoSrv.viewInfo.partialToShow = 'otherprofile';
  //   console.log("in go to other profile in chat dir", viewCoSrv.viewInfo.partialToShow)

    // var profileRef = new Firebase("https://amber-fire-4122.firebaseio.com/users/" + viewCoSrv.viewInfo.postInfo.organizerId);
  //   profileRef.on('value', function(snapshot) {
  //     console.log("getting that person's info")
  //     console.log("snapshot", snapshot.val());
  //     var otheruser = snapshot.val();
  //     viewCoSrv.otherProfInfo.name = otheruser.name;
  //     viewCoSrv.otherProfInfo.education = otheruser.education;
  //     viewCoSrv.otherProfInfo.birthday = otheruser.birthday;
  //     viewCoSrv.otherProfInfo.aboutme = otheruser.aboutme;
  //     viewCoSrv.otherProfInfo.photos = otheruser.photos;
  //     var reqsisent = new Firebase("https://amber-fire-4122.firebaseio.com/friendreq/" + FacebookPromises.userId);
  //     var reqsent;

  //     var dothisafter = function(){
  //       console.log("reqsent is", reqsent)
  //       // if I've already sent a friend request to this person show request sent button and hide add button
  //       // make the alreadysent variable either "pending", "accepted", or "none"
  //       if (reqsent) {
  //         viewCoSrv.otherProfInfo.alreadysent = reqsent.status
  //       }
  //       else {
  //         viewCoSrv.otherProfInfo.alreadysent = "notyet"
  //       }
  //     };

  //     reqsisent.on('value', function(snapshot){
  //       var allmyreqs = snapshot.val();
  //       console.log("allmyreqs is", allmyreqs)
  //       //console.log("thiswillexist if i sent a req", allmyreqs[viewCoSrv.viewInfo.postInfo.organizerId]);
  //       if (allmyreqs) {
  //         if(allmyreqs[viewCoSrv.viewInfo.postInfo.organizerId]){

  //         }
  //         reqsent = allmyreqs[viewCoSrv.viewInfo.postInfo.organizerId]
  //       }
  //       else {
  //         reqsent = null
  //       }
  //       console.log("inside reqsent is ", reqsent)
  //       dothisafter();
  //     });
  //   });
   };
}]);
