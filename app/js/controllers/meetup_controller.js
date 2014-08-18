'use strict';


Sora.controller('MeetupCtr',
  ['$scope',
   '$rootScope',
   '$firebase',
   '$http',
   'Facebook',
   'FacebookPromises',
   'viewCoSrv',
   '$location',
    function($scope, $rootScope, $firebase, $http, Facebook, FacebookPromises,viewCoSrv, $location) {
      console.log("in the meetup controller");



          // Create the XHR object.
    function createCORSRequest(method, url) {
      console.log("in createCORSRequest")

      var xhr = new XMLHttpRequest();
      if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
      } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
      } else {
        // CORS not supported.
        xhr = null;
      }
      return xhr;
    }

    // Helper method to parse the title tag from the response.
    function getTitle(text) {
      return text.match('<title>(.*)?</title>')[1];
    }

    // Make the actual CORS request.
    function makeCorsRequest() {
      // All HTML5 Rocks properties support CORS.
      var url = 'http://api.meetup.com/2/groups.json/?zip=11215&key=46f745714ab6222172c44483b3e7b';
      console.log("makeCorsRequest")
      var xhr = createCORSRequest('GET', url);
      if (!xhr) {
        alert('CORS not supported');
        return;
      }

      // Response handlers.
      xhr.onload = function() {
        var text = xhr.responseText;
        var title = getTitle(text);
        alert('Response from CORS request to ' + url + ': ' + title);
      };

      xhr.onerror = function() {
        alert('Woops, there was an error making the request.');
      };

      xhr.send();

    }

    makeCorsRequest();
  


    }  
  ]);





      //   $.ajax({
      //   type: "GET",
      //   dataType: "json",
      //   url: "http://api.meetup.com/2/groups.json/?zip=11215&key=46f745714ab6222172c44483b3e7b",
      //   // data: data,
      //   success: function(data){
      //     console.log("data", data)
      //   }
      // })






