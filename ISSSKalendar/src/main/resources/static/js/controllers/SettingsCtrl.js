angular.module('dummy').controller('SettingsCtrl',  function($scope, $window, UserConfigurationService, $location,$log,$rootScope) {
	$scope.init = function() {
		UserConfigurationService.query({username: $rootScope.username}).$promise.then(S,E);
		  function S(response) {
			  var uc = response;
			  $scope.userconfiguration = uc[0];
			  $log.debug($scope.userconfiguration);
		  };
		  function E(response)  {
			  $log.debug(response);
		  }  
	    };
	    $scope.updateSettings = function()  {
			  // IMPLEMENT PUT REQ
		  }
});