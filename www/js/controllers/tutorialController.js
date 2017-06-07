angular.module('sejaGrato').controller('tutorialController', function($scope, $state, $ionicHistory, $ionicSlideBoxDelegate){
	$scope.sairSlide = function() {
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		$state.go('menu.sejaGrato');
	}
	$scope.proximoSlide = function() {
		$ionicSlideBoxDelegate.next();
	}
})