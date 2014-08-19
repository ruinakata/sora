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

      // Austin trending *************************************************************************
        $.ajax({
          type: "GET",
          dataType: "json",
          url: "https://api.foursquare.com/v2/venues/trending?client_id=JIT1ZQXZU3FXXLRTTI1XH22AZKJCPJLMDNCFF5T014AIQRSS&client_secret=HDW201LPH3UOJ3PNWGLM5IA2UH02KWYD0BBCWJLOZD3MMNMV&v=20130815&ll=30.25,-97.75",
          // data: data,
          success: function(data){
            console.log("Austin data", data)
            data.response.venues
          }
        });

        $scope.showAustinOptions = function(){
          $scope.austinshow = true;
          $scope.bostonshow = false;
          $scope.nycshow = false;
        };




      // NYC trending ***************************************************************************

        $.ajax({
          type: "GET",
          dataType: "json",
          url: "https://api.foursquare.com/v2/venues/trending?client_id=JIT1ZQXZU3FXXLRTTI1XH22AZKJCPJLMDNCFF5T014AIQRSS&client_secret=HDW201LPH3UOJ3PNWGLM5IA2UH02KWYD0BBCWJLOZD3MMNMV&v=20130815&ll=40.7127,-74.0059",
          // data: data,
          success: function(data){
            console.log("NYC data", data)
            data.response.venues
          }
        });

        $scope.showNycOptions = function(){
          $scope.nycshow = true;
          $scope.bostonshow = false;
          $scope.austinshow = false;
        };





      // Boston trending *********************************************************************
      var bostonll = {
        cambridge: "42.3736,-71.1106",
        southend: "42.3438,-71.0719",
        fenway: "42.3464,-71.0975",
        backbay: "42.3513,-71.0804",
        northend: "42.3649,-71.0551",
        allston: "42.3529,-71.1321"
      }
      var arrayofareas = Object.keys(bostonll)

      $scope.showBostonOptions = function(){
        $scope.bostonshow = true;
        $scope.austinshow = false;
        $scope.nycshow = false;
      };

      var trending = function(latlong, callback){
        $.ajax({
          type: "GET",
          dataType: "json",
          url: "https://api.foursquare.com/v2/venues/trending?client_id=JIT1ZQXZU3FXXLRTTI1XH22AZKJCPJLMDNCFF5T014AIQRSS&client_secret=HDW201LPH3UOJ3PNWGLM5IA2UH02KWYD0BBCWJLOZD3MMNMV&v=20130815&ll=" + latlong ,
          success: function(data){
            console.log("data", data)
            callback(data.response.venues)
          }
        }); 
      };

      $scope.showArea = function(thearea){
        var area = thearea
        var latlong = bostonll[thearea];
        console.log("latlong is", latlong)
        console.log("in showCambridge")
       trending(latlong, function (venues) {
          $scope.$apply($scope.venuearray = venues)
          console.log("venues?", $scope.venuearray)
        }) // runs without being called and executed, executed when called in success after ajax finishes
      };




    }  
  ]);












