'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var FbService = angular.module('FbService', ['facebook']).
  factory('FacebookPromises' ,['$q', 'Facebook', function($q, Facebook){
    return{

      userId : 'initial',

      checkLoginState : function(){
        var deferred = $q.defer();
        Facebook.getLoginStatus(function(response) {
          if(response.status){
            if(response.status == "connected"){
              // userId = response.authResponse.userID;
            }
            deferred.resolve(response);
          } else {
            deferred.reject(response);
          }
        });
        return deferred.promise;
      },

      login : function() {
        var deferred = $q.defer();
        Facebook.login(function(response) {
          if (response.status === 'connected') {
            deferred.resolve(response);
          } else if (response.status === 'not_authorized') {
            deferred.resolve(response);
          } else {
            deferred.reject(response);
          }
        },{scope:"user_about_me,user_birthday,user_friends,user_hometown,user_education_history,user_photos"});
        return deferred.promise;
      },

      query : function(query, method, params) {
        var deferred = $q.defer();
        Facebook.api(query, method, params, function(response) {
          if (response.error) {
            deferred.reject(response);
          } else {
            deferred.resolve(response);
          }
        });
        return deferred.promise;
      }
    }
  }]);

var FireBaseService = angular.module('FireBaseService',["firebase"]).
  factory('FireSrv',[ "$firebase",function($firebase){
    var that = this;
    var ref = new Firebase("https://amber-fire-4122.firebaseio.com/");
    var sync = $firebase(ref);

    var refCR = new Firebase("https://amber-fire-4122.firebaseio.com/chat_room");
    var FirebaseSyncChatRoom = $firebase(refCR);

    return {
      FirebaseSync : sync,

      syncChtRm : FirebaseSyncChatRoom,

      getRoomChat : function(event_id) {
        var newChatRoomFireBase = new Firebase('https://amber-fire-4122.firebaseio.com/chat_rooms/' + event_id +'/talk');
        return $firebase(newChatRoomFireBase);
      },

      getLogedUsersChat :function(event_id) {
        var newRefUsersRoom = new Firebase('https://amber-fire-4122.firebaseio.com/chat_rooms/' + event_id + '/users_in_room');
        return $firebase(newRefUsersRoom);
      },

      verifySoraUser : function(user_id,createUserCallBack) {
        var userReference = new Firebase('https://amber-fire-4122.firebaseio.com/users');
        userReference.child(user_id).once('value', function(snapshot) {
          var exists = (snapshot.val() !== null);
          if(exists){
            console.log('User already exists >.< ');
          } else {
            console.log('Creating user .-.');
            createUserCallBack();
          }
        });
      },

      addUSerEventRoom : function(user_id,event_id,user_data){
        var userReference = new Firebase('https://amber-fire-4122.firebaseio.com/chat_rooms/' + event_id + '/users_in_room/'+user_id);
        userReference.set({
          userId : user_id,
          userPhoto : user_data.userPhoto,
          userName : user_data.userName
        });
        userReference.onDisconnect().remove();
      },

      createSoraUser : function(user_id,newUser){
        var userReference = new Firebase('https://amber-fire-4122.firebaseio.com/users/' + user_id);
        userReference.set(newUser);
      },

      retireUserFromChatRoom : function(user_id,event_id){
        var userReference = new Firebase('https://amber-fire-4122.firebaseio.com/chat_rooms/' + event_id + '/users_in_room/'+user_id);
        userReference.remove();
      },

      storeUserSession : function(user_id) {

        // since I can connect from multiple devices or browser tabs, we store each connection instance separately
        // any time that connectionsRef's value is null (i.e. has no children) I am offline
        var myConnectionsRef = new Firebase('https://amber-fire-4122.firebaseio.com/connected_users/'+user_id);
        var eventRoomreference = new Firebase('https://amber-fire-4122.firebaseio.com/users/' + user_id + '/event');
        // stores the timestamp of my last disconnect (the last time I was seen online)
        // var lastOnlineRef = new Firebase('https://amber-fire-4122.firebaseio.com/connected_users/'+user_id);

        var connectedRef = new Firebase('https://amber-fire-4122.firebaseio.com/.info/connected');
        connectedRef.on('value', function(snap) {
          if (snap.val() === true) {
            // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)

            // add this device to my connections list
            // this value could contain info about the device or a timestamp too
            var con = myConnectionsRef.update({connected : true});

            // when I disconnect, remove this device
            // console.log('ETF is con',con);
            myConnectionsRef.onDisconnect().update({connected : false});
            eventRoomreference.onDisconnect().remove();

            // when I disconnect, update the last time I was seen online
            // lastOnlineRef.onDisconnect().set(Firebase.ServerValue.TIMESTAMP);
          }
        });
      },
      sessionEstablished : false
    }
  }]);

var viewComunicationService = angular.module('viewComunicationService',[]).
  factory('viewCoSrv',function(){
    return {
      viewInfo : {
        partialToShow : 'post',
        postInfo : {
          organizer : '',
          organizerPicture : '',
          area : '',
          date : '',
          description : '',
          organizerId : ''
        }
      },
      otherProfInfo : {
        name : '',
        birthday : '',
        photos : '',
        aboutme : '',
        education : '',
      }
    }
  })

