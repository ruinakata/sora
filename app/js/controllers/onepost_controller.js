'use strict';

Sora.controller('OnePostCtr',
  ['$scope',
   '$rootScope',
   '$firebase',
   '$http',
   'Facebook',
   'FacebookPromises',
   'viewCoSrv',
   '$location',
    function($scope, $rootScope, $firebase, $http, Facebook, FacebookPromises, viewCoSrv, $location) {
      console.log("in the onepost controller");

      $scope.venue = viewCoSrv.venueInfo;


      $scope.submitPost = function(){
        console.log("in submitpost()");
        var userref = new Firebase("https://amber-fire-4122.firebaseio.com/users/")
        var postref = new Firebase("https://amber-fire-4122.firebaseio.com/posts/")
        var mypostref = new Firebase("https://amber-fire-4122.firebaseio.com/posts/" + FacebookPromises.userId)
        //find the user's picture and name and save with post
        var finduserref = userref.child(FacebookPromises.userId)
        finduserref.on('value', function(snapshot) {
          var userinfo = snapshot.val();
          var username = userinfo.name;
          var userpicurl = userinfo.photos[0];
          var thearea = viewCoSrv.venueInfo.name + " (" + viewCoSrv.venueInfo.address + ")"
          var postObj = {userid: FacebookPromises.userId, username: username, userpicurl: userpicurl, city: viewCoSrv.venueInfo.city, area: thearea, description: $scope.posttext, date: $scope.date, postedon: Date.now()};
          var newPostRef = postref.push(postObj);
          // immediately edit the post we made to include the randomly generated post ID
          var postId = newPostRef.name();
          var theRefWeJustMade = new Firebase("https://amber-fire-4122.firebaseio.com/posts/" + postId);
          theRefWeJustMade.on('value', function(snapshot) {
            var thePostWeWantToEdit = snapshot.val()
            thePostWeWantToEdit["postid"] = postId;
            theRefWeJustMade.set(thePostWeWantToEdit);
          })
          $location.path('/home');
        })
      }






    }  
  ]);