'use strict';

/* Directives */
// CHAT DIRECTIVE *********************************************************************************************
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

// PROFILE DIRECTIVE *************************************************************************************************

home.directive('profileDirective', function(){
    return {
      restrict: 'E',
      transclude: true,
      templateUrl:'partials/profile.html',
      controller: ['$scope', '$rootScope', '$firebase', '$http', 'Facebook', 'FacebookPromises', 
        function($scope, $rootScope, $firebase, $http, Facebook, FacebookPromises) {
          console.log("is facebook ready?", Facebook.isReady());
          if ($scope.loggedInToFacebook) {
            getMyFacebookInfo();
          } 
          else {
            $scope.$watch(function() {
              return $scope.loggedInToFacebook;
            },
            function(loggedIn) {
              console.log('newVal:', loggedIn);
              if (loggedIn) {
                getMyFacebookInfo();
              }
            });
          }


          function getMyFacebookInfo() {
            console.log('kicking off get my facebook info');
            FacebookPromises.query('me', 'get', { fields: 'id,name,about,birthday,education,photos,education' })
              .then(function(response) {
                console.log(response)
                // $scope.profileinfo = response;
                var uniqueid = response.id;
                $rootScope.facebookId = uniqueid;
                var name = response.name;
                var birthday = response.birthday;
                var education = response.education[response.education.length-1].school.name
                var photos = [];
                console.log("hi")
                for (var i=0; i<response.photos.data.length; i++) {
                  photos.push(response.photos.data[i].source);
                };
                // Save into firebase
                var profileRef = new Firebase("https://amber-fire-4122.firebaseio.com/users/" + uniqueid);
                
                // angularfire!!!///////////////////////////////////////////////////////
                var sync = $firebase(profileRef);
                //download the data into a local object
                var syncObject = sync.$asObject();
                // sync the object with a three way binding, use asObject() to create a synchronized object, then call $bindTo() which binds
                // it to a $scope variable 
                syncObject.$bindTo($scope, 'profile');

                var profile = { name: name, birthday: birthday, photos: photos, education: education };
                profileRef.update(profile);
                
                
              }, function(response) {
                console.log(response);
              })
          }



          var showProfileRef = new Firebase("https://amber-fire-4122.firebaseio.com/users/")
          showProfileRef.on('value', function(snapshot) {
              console.log("snapshot", snapshot.val());
              var users = snapshot.val();
              console.log("fbidddd", FacebookPromises.userId);
              var fbookid = FacebookPromises.userId;
              console.log(users);
              console.log("ihope this works", users[fbookid]);
              $scope.$apply($scope.me = users[fbookid]); 
              console.log($scope.me);


              // when aboutme exists, don't show exit form. when clicked show edit form.
              $scope.aboutmeexists = false
              if ($scope.me.aboutme) {
                $scope.aboutmeexists = true
              }
              console.log("about me exists", $scope.aboutmeexists)

          });

      // when submit button is clicked, save about me text to firebase
          this.submitAboutMe =function(){
            console.log("aboutmeis", $scope.aboutmetext);
            console.log(FacebookPromises.userId);
            var fbid = FacebookPromises.userId;
            var meRef = showProfileRef.child(fbid);
            meRef.update({aboutme: $scope.aboutmetext})
          };


        }],

      controllerAs:'ProfileCtr'

    };
  });


// Post Directive *************************************************************************


 home.directive('postDirective',function(){
    return {
      restrict: 'E',
      transclude: true,
      templateUrl:'partials/post.html',
      controller: ['$scope', '$rootScope', '$firebase', '$http', 'Facebook', 'FacebookPromises', 
        function($scope, $rootScope, $firebase, $http, Facebook, FacebookPromises) {
          console.log("Im in the post directive")

          this.submitPost = function () {
            console.log("in submit post");
            console.log("posttext taken", $scope.posttext ) 
          }









      }],
      controllerAs:'post'
    };
 });






























