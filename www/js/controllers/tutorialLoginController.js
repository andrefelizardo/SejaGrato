angular.module('sejaGrato').controller('tutorialLoginController', function($scope, $timeout, $state, $ionicHistory){
	
	if(typeof analytics !== undefined) {
			analytics.trackView('Tutorial Login');
		}

	$scope.home = function() {
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		$state.go('menu.sejaGrato');
	}
})