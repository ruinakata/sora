'use strict';


Sora.controller('TrendingCtr',
  ['$scope',
   '$rootScope',
   '$firebase',
   '$http',
   'Facebook',
   'FacebookPromises',
   'viewCoSrv',
   '$location',
    function($scope, $rootScope, $firebase, $http, Facebook, FacebookPromises,viewCoSrv, $location) {
      console.log("in the trending controller");
      $scope.showthephotos = false;

      var latlongs = {
        cambridge: "42.3736,-71.1106",
        southend: "42.3438,-71.0719",
        fenway: "42.3464,-71.0975",
        backbay: "42.3513,-71.0804",
        northend: "42.3649,-71.0551",
        allston: "42.3529,-71.1321",
        greenwich: "40.7339,-74.0011",
        woodside: "40.7512123,-73.903648",
        williamsburg: "40.7133, -73.9533",
        gowanus: "40.6753,-73.9911",
        upperwest: "40.7869,-73.9753",
        timessquare: "40.7577,-73.9857",
        murrayhill: "40.7625,-73.8145",
        hoboken: "40.7500,-74.0300",
        tribeca: "40.7183,-74.0078",
        brooklyn: "40.6928,-73.9903",
        downtown: "30.2710,-97.7430",
        westcampus: "30.291351, -97.745340",
      }

// show the venues!!!!!!!!!!!!!!
      $scope.showArea = function(thearea){
        var area = thearea
        var latlong = latlongs[thearea];
        console.log("latlong is", latlong)
        console.log("in showCambridge")
       trending(latlong, function (venues) {
          $scope.$apply($scope.venuearray = venues)
          console.log("venues?", $scope.venuearray)
        }) // runs without being called and executed, executed when called in success after ajax finishes
      };


      var trending = function(latlong, callback){
        $.ajax({
          type: "GET",
          dataType: "json",
          url: "https://api.foursquare.com/v2/venues/trending?client_id=JIT1ZQXZU3FXXLRTTI1XH22AZKJCPJLMDNCFF5T014AIQRSS&client_secret=HDW201LPH3UOJ3PNWGLM5IA2UH02KWYD0BBCWJLOZD3MMNMV&v=20130815&ll=" + latlong + "&limit=100" ,
          success: function(data){
            console.log("data", data)
            callback(data.response.venues)
          }
        }); 
      };
// show the pictures!!!!!!!!!!!!!!
      $scope.showpics = function(venueid){
        $scope.showthephotos = true;
        console.log("in showpics method")
        getpics(venueid, function(photoarray){
          console.log("getpics got called")
          console.log("photoarray is", photoarray)
          var realphotoarray = [];
          var obj = {}
          for (var i=0; i<photoarray.length; i++) {
            var url = photoarray[i].prefix + "height150" + photoarray[i].suffix;
            realphotoarray.push(url)
            if(realphotoarray.length > 10) {
              var array = realphotoarray.slice(0,11)
              obj[venueid] = array
              console.log("array", array)
              $scope.photos = obj
            }
            else {
              obj[venueid] = realphotoarray
              $scope.photos = obj
            }
            console.log("photoarray is", $scope.photos)
            $scope.$apply($scope.photos)
          }
        })

      }

      var getpics = function(venueid, callback){
        console.log("the venueid is", venueid)
        $.ajax({
          type: "GET",
          dataType: "json",
          url: "https://api.foursquare.com/v2/venues/" + venueid+ "/photos?client_id=JIT1ZQXZU3FXXLRTTI1XH22AZKJCPJLMDNCFF5T014AIQRSS&client_secret=HDW201LPH3UOJ3PNWGLM5IA2UH02KWYD0BBCWJLOZD3MMNMV&v=20130815",
          success: function(data){
            // console.log("photos data:", data.response.photos.items)
            callback(data.response.photos.items)
          }
        });
      };

      // Austin trending *************************************************************************

        $scope.showAustinOptions = function(){
          $scope.austinshow = true;
          $scope.bostonshow = false;
          $scope.nycshow = false;
        };





      // NYC trending ***************************************************************************


        $scope.showNycOptions = function(){
          $scope.nycshow = true;
          $scope.bostonshow = false;
          $scope.austinshow = false;
        };



      // Boston trending *********************************************************************


      $scope.showBostonOptions = function(){
        $scope.bostonshow = true;
        $scope.austinshow = false;
        $scope.nycshow = false;
      };




    }  
  ]);












