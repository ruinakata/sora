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
          console.log("thepost", allpostsobject[keyarray[i]]);
          var thepost = allpostsobject[keyarray[i]];
          var thepostdate = thepost.date;
          var year = parseInt(thepostdate.slice(0,4));
          var month = parseInt(thepostdate.slice(5,7));
          var date = parseInt(thepostdate.slice(8, 10));
          console.log(year, month, date)
          var epoch = new Date(year, month, date).getTime() - 2626678266
          var plusaday = epoch + 86400000
          console.log("the date in epoch", epoch)
          if (plusaday < Date.now()) {
            console.log("it passed!")
          }
          else {
            array.push(allpostsobject[keyarray[i]]);
          }

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
       };

      $scope.showBoston = function(){
        console.log("in showBoston")
        postref.on('value', function(snapshot) {
          var allpostsobject = snapshot.val();
          var array = []
          var keyarray = [];
          for (var k in allpostsobject) {keyarray.push(k)};
          for (var i=0; i<keyarray.length; i++) {
            // var thepost = allpostsobject[keyarray[i]];
            // console.log("thepost: ", thepost)
            console.log("thepost", allpostsobject[keyarray[i]]);
            var thepost = allpostsobject[keyarray[i]];
            var thepostdate = thepost.date;
            var year = parseInt(thepostdate.slice(0,4));
            var month = parseInt(thepostdate.slice(5,7));
            var date = parseInt(thepostdate.slice(8, 10));
            console.log(year, month, date)
            var epoch = new Date(year, month, date).getTime() - 2626678266
            var plusaday = epoch + 86400000
            console.log("the date in epoch", epoch)
            if (thepost.city == "Boston" && plusaday > Date.now()) {
              array.push(allpostsobject[keyarray[i]]);
              console.log("it was in Boston!")
            }
          }
           $scope.$apply($scope.allposts = array.reverse());
        });
      };

      $scope.showAustin = function(){
        console.log("in showAustin")
        postref.on('value', function(snapshot) {
          var allpostsobject = snapshot.val();
          var array = []
          var keyarray = [];
          for (var k in allpostsobject) {keyarray.push(k)};
          for (var i=0; i<keyarray.length; i++) {
            console.log("thepost", allpostsobject[keyarray[i]]);
            var thepost = allpostsobject[keyarray[i]];
            var thepostdate = thepost.date;
            var year = parseInt(thepostdate.slice(0,4));
            var month = parseInt(thepostdate.slice(5,7));
            var date = parseInt(thepostdate.slice(8, 10));
            console.log(year, month, date)
            var epoch = new Date(year, month, date).getTime() - 2626678266
            var plusaday = epoch + 86400000
            console.log("the date in epoch", epoch)
            if (thepost.city == "Austin" && plusaday > Date.now()) {
              array.push(allpostsobject[keyarray[i]]);
              console.log("it was in Austin!")
            }
          }
          
           $scope.$apply($scope.allposts = array.reverse());
        });
      };

      $scope.showNyc = function(){
        console.log("in showNyc")
        postref.on('value', function(snapshot) {
          var allpostsobject = snapshot.val();
          var array = []
          var keyarray = [];
          for (var k in allpostsobject) {keyarray.push(k)};
          for (var i=0; i<keyarray.length; i++) {
            console.log("thepost", allpostsobject[keyarray[i]]);
            var thepost = allpostsobject[keyarray[i]];
            var thepostdate = thepost.date;
            var year = parseInt(thepostdate.slice(0,4));
            var month = parseInt(thepostdate.slice(5,7));
            var date = parseInt(thepostdate.slice(8, 10));
            console.log(year, month, date)
            var epoch = new Date(year, month, date).getTime() - 2626678266
            var plusaday = epoch + 86400000
            console.log("the date in epoch", epoch)
            if (thepost.city == "NYC" && plusaday > Date.now()) {
              array.push(allpostsobject[keyarray[i]]);
              console.log("it was in NYC!")
            }
          }
           $scope.$apply($scope.allposts = array.reverse());
        });
      };

      $scope.showEventForm = function(){
        console.log("in showEventForm")
        $scope.posteventclicked = true;
      };
    }
  ]);











