'use strict';

/* Directives */

 home.directive('chatDirective',function(){
    return {
      restrict: 'E',
      transclude: true,
      templateUrl:'partials/meeting-chat.html',
      controller: ['$scope','FireSrv','FacebookPromises',function($scope,FireSrv,FacebookPromises){

        // temporal organizer
        $scope.organizer = {};
        $scope.organizer.name = "lorem ipsum";
        $scope.organizer.photo = "https://scontent-a-dfw.xx.fbcdn.net/hphotos-xpf1/t31.0-8/1529892_10152203030936394_3485758498983018165_o.jpg";
        // temporal organizer

        //temporal event info
        $scope.meeting = {};
        $scope.meeting.name = "Drinks and sausages";
        $scope.meeting.location = "Lemon park bar";
        $scope.meeting.spots = 15;
        $scope.meeting.going = 10;
        //temporal event info

        console.log('seeee:',FacebookPromises.userId);

        var syncArray = FireSrv.syncChtRm.$asArray();
        $scope.conversationRoom = syncArray;

        this.addReply = function(keyEvent){
          console.log('seeee:',FacebookPromises.userId);
          if(keyEvent.keyIdentifier=='Enter'){
            var reply = {};
            reply.replyUsrId = FacebookPromises.userId;
            reply.text = $scope.reply;
            syncArray.$add(reply);
            $scope.reply = "";
          }
        };

        this.feedClass = function(id){
          if(id == FacebookPromises.userId){
            return 'actual-user-reply';
          } else {
            return 'other-user-reply';
          }
        }
      }],
      controllerAs:'chat'
    };
 });
