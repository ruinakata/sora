'use strict';

/* Directives */


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
              if($scope.me.aboutme) {
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
      controller: ['$scope', '$rootScope', '$firebase', '$http', 'Facebook', 'FacebookPromises','viewCoSrv',
        function($scope, $rootScope, $firebase, $http, Facebook, FacebookPromises,viewCoSrv) {
          console.log("Im in the post directive");

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
            //$scope.$apply($scope.allposts = snapshot.val());
            $scope.$apply($scope.allposts = array.reverse());
          });

          this.submitPost = function(){
            console.log("in submit post method");
            //find the user's picture and name and save with post
            var finduserref = userref.child(FacebookPromises.userId)
            finduserref.on('value', function(snapshot) {
              var userinfo = snapshot.val();
              var username = userinfo.name;
              var userpicurl = userinfo.photos[0];
              var postObj = {userid: FacebookPromises.userId, username: username, userpicurl: userpicurl, area: $scope.area, description: $scope.posttext, date: $scope.date, postedon: Date.now()};
              var newPostRef = postref.push(postObj);
              // var postID = newPostRef.name();
            })
          };

          this.goToEnventRoom = function(post){
            viewCoSrv.viewInfo.postInfo.organizer = post.username;
            viewCoSrv.viewInfo.postInfo.organizerPicture = post.userpicurl;
            viewCoSrv.viewInfo.postInfo.area = post.area;
            viewCoSrv.viewInfo.postInfo.date = post.date;
            viewCoSrv.viewInfo.postInfo.description = post.description;
            viewCoSrv.viewInfo.postInfo.organizerId = post.userid;
            viewCoSrv.viewInfo.partialToShow = 'post-chat';
            $scope.$broadcast('getChatThread',post.postedon);


           }

        }],
      controllerAs:'postCtr'
    };
 });


// Other Profile Directive ***************************************************************


home.directive('otherprofileDirective', function(){
  return {
    restrict: 'E',
    transclude: true,
    templateUrl:'partials/otherprofile.html',
    controller: ['$scope', '$rootScope', 'viewCoSrv', '$firebase', '$http', 'Facebook', 'FacebookPromises',
      function($scope, $rootScope, viewCoSrv, $firebase, $http, Facebook, FacebookPromises) {
          var otheruserid = viewCoSrv.viewInfo.postInfo.organizerId;
          console.log("in otherprof controller")

          $scope.user = viewCoSrv.viewInfo.postInfo;
          // $scope.user.organizerId;
          // var userref = new Firebase ("https://amber-fire-4122.firebaseio.com/users/");

          $scope.otheruser = viewCoSrv.otherProfInfo;
          $scope.alreadysent = false;
          $scope.friendstatus = viewCoSrv.otherProfInfo;
          console.log('que???????',$scope.friendstatus);

          var myid = FacebookPromises.userId;
          console.log('my id:', myid);
          console.log(otheruserid);
          var isFriend = new Firebase("https://amber-fire-4122.firebaseio.com/friendreq/" + myid + '/' + otheruserid + '/status');

          console.log('isFriend:', isFriend)
          console.log("in otherprofctr")
          console.log("in otherprofiledirective")


  // FRIEND REQUEST ///////////////////////////////////////////////

        this.addfriend = function(){
          var myid = FacebookPromises.userId;
          console.log("in add friend method in otherprofctr");
          var friendreqref = new Firebase("https://amber-fire-4122.firebaseio.com/friendreq")
          var request = {}
          request[myid] = {}
          request[myid][otheruserid] = {"status": "pending"}

          // make each request have a unique key
          console.log("request hash", request);
          friendreqref.set(request);

        };
    }],
    controllerAs: 'OtherProfCtr'
  };
});
































