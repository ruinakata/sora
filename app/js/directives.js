'use strict';

/* Directives */

 home.directive('chatDirective',function(){
    return {
      restrict: 'E',
      transclude: true,
      templateUrl:'partials/meeting-chat.html',
      controller: ['$scope','FireSrv','FacebookPromises',function($scope,FireSrv,FacebookPromises){

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
