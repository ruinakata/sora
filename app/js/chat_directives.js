'use strict';

// CHAT DIRECTIVE *********************************************************************************************
 home.directive('chatDirective',function() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl:'partials/meeting-chat.html',
      controller: ['$scope','FireSrv','FacebookPromises','viewCoSrv',function($scope,FireSrv,FacebookPromises,viewCoSrv){

        // syncronizing view information
        $scope.eventDetails = viewCoSrv.viewInfo.postInfo;


        // get chat room when necesary
        $scope.$on('getChatThread',function(event,post_id){
          $scope.conversationRoom = FireSrv.getRoomChat(post_id).$asArray();
        });

        this.addReply = function(keyEvent){
          if(keyEvent.keyIdentifier=='Enter'){
            var reply = {};
            reply.replyUsrId = FacebookPromises.userId;

            var userref = new Firebase("https://amber-fire-4122.firebaseio.com/users/"+FacebookPromises.userId);
            userref.on('value',function(snapshot){
              reply.userPotho = snapshot.val().photos[0];
              reply.userName = snapshot.val().name;
            });
            reply.text = $scope.reply;
            $scope.conversationRoom.$add(reply);
            $scope.reply = "";
          }
        };

        this.feedClass = function(id){
          if(id == FacebookPromises.userId){
            return 'actual-user-reply';
          } else {
            return 'other-user-reply';
          }
        };

        this.isIdleActualUser =function(id){
          if(id == FacebookPromises.userId){
            return true;
          } else {
            return false;
          }
        };

        this.scrollDonw = function(){
          console.log("happening :O??");
          $(".chat-stream").scrollTop($(".chat-stream")[0].scrollHeight);
        };

        this.goToOtherProfile = function(){
          viewCoSrv.viewInfo.partialToShow = 'otherprofile';
          console.log("in go to other profile in chat dir", viewCoSrv.viewInfo.partialToShow)

          var profileRef = new Firebase("https://amber-fire-4122.firebaseio.com/users/" + viewCoSrv.viewInfo.postInfo.organizerId);
          profileRef.on('value', function(snapshot) {
            console.log("getting that person's info")
            console.log("snapshot", snapshot.val());
            var otheruser = snapshot.val();

            viewCoSrv.otherProfInfo.name = otheruser.name;
            viewCoSrv.otherProfInfo.education = otheruser.education;
            viewCoSrv.otherProfInfo.birthday = otheruser.birthday;
            viewCoSrv.otherProfInfo.aboutme = otheruser.aboutme;
            viewCoSrv.otherProfInfo.photos = otheruser.photos;
            var reqsisent = new Firebase("https://amber-fire-4122.firebaseio.com/friendreq/" + FacebookPromises.userId);
            var reqsent;
            console.log("Im here :D")

            var dothisafter = function(){
              console.log("reqsent is", reqsent)
              // if I've already sent a friend request to this person show request sent button and hide add button
              // make the alreadysent variable either "pending", "accepted", or "none"
              if (reqsent) {
                viewCoSrv.otherProfInfo.alreadysent = reqsent.status
              }
              else {
                viewCoSrv.otherProfInfo.alreadysent = "notyet"
              }
              console.log("viewCoSrv alreadysent:", viewCoSrv.otherProfInfo.alreadysent)
            };

            reqsisent.on('value', function(snapshot){
              var allmyreqs = snapshot.val();
              console.log("allmyreqs is", allmyreqs)
              //console.log("thiswillexist if i sent a req", allmyreqs[viewCoSrv.viewInfo.postInfo.organizerId]);
              if (allmyreqs) {
                if(allmyreqs[viewCoSrv.viewInfo.postInfo.organizerId]){

                }
                reqsent = allmyreqs[viewCoSrv.viewInfo.postInfo.organizerId]
              }
              else {
                reqsent = null
              }
              console.log("inside reqsent is ", reqsent)
              dothisafter();
            });





          });



        };

      }],
      controllerAs:'chat'
    };
 });

 home.directive(
            "repeatComplete",
            function( $rootScope ) {

                // Because we can have multiple ng-repeat directives in
                // the same container, we need a way to differentiate
                // the different sets of elements. We'll add a unique ID
                // to each set.
                var uuid = 0;


                // I compile the DOM node before it is linked by the
                // ng-repeat directive.
                function compile( tElement, tAttributes ) {

                    // Get the unique ID that we'll be using for this
                    // particular instance of the directive.
                    var id = ++uuid;

                    // Add the unique ID so we know how to query for
                    // DOM elements during the digests.
                    tElement.attr( "repeat-complete-id", id );

                    // Since this directive doesn't have a linking phase,
                    // remove it from the DOM node.
                    tElement.removeAttr( "repeat-complete" );

                    // Keep track of the expression we're going to
                    // invoke once the ng-repeat has finished
                    // rendering.
                    var completeExpression = tAttributes.repeatComplete;

                    // Get the element that contains the list. We'll
                    // use this element as the launch point for our
                    // DOM search query.
                    var parent = tElement.parent();

                    // Get the scope associated with the parent - we
                    // want to get as close to the ngRepeat so that our
                    // watcher will automatically unbind as soon as the
                    // parent scope is destroyed.
                    var parentScope = ( parent.scope() || $rootScope );

                    // Since we are outside of the ng-repeat directive,
                    // we'll have to check the state of the DOM during
                    // each $digest phase; BUT, we only need to do this
                    // once, so save a referene to the un-watcher.
                    var unbindWatcher = parentScope.$watch(
                        function() {

                            // Now that we're in a digest, check to see
                            // if there are any ngRepeat items being
                            // rendered. Since we want to know when the
                            // list has completed, we only need the last
                            // one we can find.
                            var lastItem = parent.children( "*[ repeat-complete-id = '" + id + "' ]:last" );
                            parent.scope().$eval("chat.scrollDonw()");
                            // parent.$eval(completeExpression);

                        }
                    );

                }

                // Return the directive configuration. It's important
                // that this compiles before the ngRepeat directive
                // compiles the DOM node.
                return({
                    compile: compile,
                    priority: 1001,
                    restrict: "A"
                });

            }
        );