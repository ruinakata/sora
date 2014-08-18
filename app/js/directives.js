home.directive(
  "repeatComplete",
  ['$rootScope',function( $rootScope ) {

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
              parent.scope().$eval("scrollDonw()");
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
  }]
);

home.directive(
  "chatboxComplete",
  ['$rootScope',function( $rootScope ) {

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
      tElement.attr( "chatbox-complete-id", id );

      // Since this directive doesn't have a linking phase,
      // remove it from the DOM node.
      tElement.removeAttr( "chatbox-complete" );

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
              parentScope.$broadcast('write-donw');
              var lastItem = parent.children( "*[ chatbox-complete-id = '" + id + "' ]:last" );
              // parent.scope().$eval("scrollDonw()");
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
  }]
);

home.directive('navLeft',function(){
  return {
    restrict : 'E',
    templateUrl : "partials/nav-bar.html",
    controller : ['$location','$scope','FacebookPromises',function($location,$scope,FacebookPromises){
      this.setView = function(view){
        console.log(' happening .-.');
        // viewCoSrv.viewInfo.partialToShow = view;
        if(view == 'home'){
          $location.path("/home");
        };
        if(view == 'my_profile'){
          $location.path("/profile");
        };
        if(view == 'friends'){
          $location.path("/myfriends");
        };
      };
      this.logout =function () {
        FacebookPromises.logout().
          then(function(){
            $location.path("/login");
          }
        );
      };
    }],
    controllerAs : 'nav'
  };
});

home.directive('chatBar',function(){
  return {
    restrict : 'E',
    templateUrl : "partials/chat-bar.html",
    controller : ['$scope','FireSrv','FacebookPromises',function($scope,FireSrv,FacebookPromises){
      that = this;
      // initialazing chat feature
      $scope.$on('showElements',function(){
        FacebookPromises.checkLoginState()
        .then(function(response){
          $scope.friendList = FireSrv.getFriendList(response.authResponse.userID).$asArray();
        },function(response){
          console.log('error happened :S : ',response);
        });
      });


      // initialazing variables
      $scope.chatThreads = [];
      $scope.friendListShow = false;
      $scope.currentChatPost = 0;
      // functions
      this.titleClick = function(){
        $scope.friendListShow = !$scope.friendListShow;
      };

      this.validateFriend = function(newId) {
        for(var i in $scope.chatThreads){
          if($scope.chatThreads[i].friendUserId == newId){
            return false;
          }
        };
        return true;
      };

      this.addChatThread = function(obj) {
        $scope.chatThreads[$scope.currentChatPost] = obj;
        $scope.currentChatPost = $scope.currentChatPost + 1;
        if($scope.currentChatPost > 4 ){
          $scope.currentChatPost = 0;
        }
      };

      this.startChat = function(friend) {

        if(that.validateFriend(friend.fbid)){
          var newThread = {};
          newThread.friendUserId = friend.fbid;
          newThread.friendName = friend.name;
          newThread.reply = '';
          newThread.show = true;
          newThread.lines = FireSrv.getChatThread(FacebookPromises.userId,friend.fbid).$asArray();
          that.addChatThread(newThread);
        }
      };

      this.addReply =function($event,chat){
        if($event.keyIdentifier=='Enter'){
          var replyDetail = {};
          replyDetail.replyUsrId = FacebookPromises.userId;
          replyDetail.text = chat.reply;
          chat.lines.$add(replyDetail);
          chat.reply = "";
        }
      };

      this.minimizeLine = function(chat) {
        chat.show = !chat.show;
      };

      this.applyHideAligment = function(chat) {
        if(!chat.show){
          return "chat-line-hide-class";
        }
      };

      this.addClass = function(index) {
        return "chat-line-"+index;
      };

      this.closeLine = function(index) {
        $scope.chatThreads.splice(index, 1);
      }

      this.defineLineStyle = function(line) {
        if (line.replyUsrId == FacebookPromises.userId) {
          return 'user-line-text';
        } else {
          return 'friend-line-text';
        };
      };

      this.setIdentifier = function(index) {
        return 'line-chat-id-' + index;
      }

      this.scrollDonw = function(index){
        var id = '.line-chat-id-' + index;
        console.log("happening :O????");
        if($(id)[0]){
          $(id).scrollTop($(id)[0].scrollHeight);
        }
      };



      $scope.$on('write-donw',function(){
        for(var i in [0,1,2,3]){
          that.scrollDonw(i);
        }
      });

    }],
    controllerAs : 'chatBar'
  }
})