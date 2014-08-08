'use strict';

/* Directives */

 home.directive('chatDirective',function(){
 		return {
 			restrict: 'E',
 			transclude: true,
 			templateUrl:'partials/meeting-chat.html',
 			controller: ['$scope','FireSrv',function($scope,FireSrv){
 				console.log('FireSrv.FirebaseSync:',FireSrv.FirebaseSync);
 				var syncObject = FireSrv.FirebaseSync.$asObject();
 				syncObject.$bindTo($scope, "data");
 			}],
 			controllerAs:'chat'
 		};
 });
