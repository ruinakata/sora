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
              this.userId = response.authResponse.userID;
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
        var newChatRoomFireBase = new Firebase('https://amber-fire-4122.firebaseio.com/chat_rooms/'+event_id);
        return $firebase(newChatRoomFireBase);
      }
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

