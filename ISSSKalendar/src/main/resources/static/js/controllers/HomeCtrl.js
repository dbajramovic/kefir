var app = angular.module('dummy', [ 'ngRoute', 'ngResource', 'ngCookies','mwl.calendar', 'ui.bootstrap', 'angularjs-dropdown-multiselect','feeds' ]);

app.controller('HomeCtrl',  function($scope, $window, EventsService, StudevesService, EventService, $location,$log,$rootScope) {
	$scope.init = function() {
		  StudevesService.query({username: $rootScope.username}).$promise.then(S,E);
		  function S(response) {
			  var eve = response;
			  var pages = eve.length/7;
			  var qry = StudevesService.query({username: $rootScope.username, pagenum:0});
			  $scope.events = qry;
			  $scope.pagenums = [];
			  for(var i = 0;i<pages;i++) {
				  $scope.pagenums.push(i+1);
			  }
		  };
		  function E(response)  {
			  $log.debug(response);
		  }  
	    };
	  $scope.getPagedQuery = function(newPageNum) {
		  var pg = newPageNum-1;
		  var qry = StudevesService.query({username: $rootScope.username, pagenum:pg}).$promise.then(S,E);
		  function S(response) {
			  $scope.events = response;
		  };
		  function E(response) {
			  $log.debug(response);
		  };
	    };
});