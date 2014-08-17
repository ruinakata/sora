'use strict';


Sora.controller('PostCtr',
  ['$scope',
   '$rootScope',
   '$firebase',
   '$http',
   'Facebook',
   'FacebookPromises',
   'viewCoSrv',
   '$location',
    function($scope, $rootScope, $firebase, $http, Facebook, FacebookPromises,viewCoSrv, $location) {
      console.log("Im in the post directive");
      $scope.$on('showElements',function(){
        console.log('mussels!!');
        $scope.classView = 'show-elementsview';
      });
      var userref = new Firebase("https://amber-fire-4122.firebaseio.com/users/")
      var postref = new Firebase("https://amber-fire-4122.firebaseio.com/posts/")
      var mypostref = new Firebase("https://amber-fire-4122.firebaseio.com/posts/" + FacebookPromises.userId)

    // when page loads show all posts with most recent at top
      postref.on('value', function(snapshot) {
        var allpostsobject = snapshot.val();
        var array = []
        var keyarray = [];
        for (var k in allpostsobject) {keyarray.push(k)};
        for (var i=0; i<keyarray.length; i++) {
          array.push(allpostsobject[keyarray[i]]);
        }
        $scope.$apply($scope.allposts = array.reverse());
      });

      $scope.submitPost = function(){
        console.log("in submit post method");
        //find the user's picture and name and save with post
        var finduserref = userref.child(FacebookPromises.userId)
        finduserref.on('value', function(snapshot) {
          var userinfo = snapshot.val();
          var username = userinfo.name;
          var userpicurl = userinfo.photos[0];
          var postObj = {userid: FacebookPromises.userId, username: username, userpicurl: userpicurl, city: $scope.city, area: $scope.area, description: $scope.posttext, date: $scope.date, postedon: Date.now()};
          var newPostRef = postref.push(postObj);
          // immediately edit the post we made to include the randomly generated post ID
          var postId = newPostRef.name();
          var theRefWeJustMade = new Firebase("https://amber-fire-4122.firebaseio.com/posts/" + postId);
          theRefWeJustMade.on('value', function(snapshot) {
            var thePostWeWantToEdit = snapshot.val()
            thePostWeWantToEdit["postid"] = postId;
            theRefWeJustMade.set(thePostWeWantToEdit);
          })
        })
      };

      $scope.goToEnventRoom = function(post){
        console.log("in goToEventRoom");
        viewCoSrv.viewInfo.postInfo.organizer = post.username;
        viewCoSrv.viewInfo.postInfo.organizerPicture = post.userpicurl;
        viewCoSrv.viewInfo.postInfo.area = post.area;
        viewCoSrv.viewInfo.postInfo.date = post.date;
        viewCoSrv.viewInfo.postInfo.description = post.description;
        viewCoSrv.viewInfo.postInfo.organizerId = post.userid;
        viewCoSrv.viewInfo.postInfo.eventId = post.postid;
        viewCoSrv.viewInfo.partialToShow = 'post-chat';
        $scope.$broadcast('getChatThread',post.postedon);
        $location.path("/event/" + post.postid);
       }
    }
  ]);