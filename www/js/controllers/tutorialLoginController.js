angular.module('sejaGrato').controller('tutorialLoginController', function($scope, $timeout, $state, $ionicHistory){
	$scope.home = function() {
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		$state.go('menu.sejaGrato');
	}
})