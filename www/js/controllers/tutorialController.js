angular.module('sejaGrato').controller('tutorialController', function($scope, $state, $ionicHistory, $ionicSlideBoxDelegate){
	
	// if(typeof analytics !== undefined) {
	// 		analytics.trackView('Tutorial Inicial');
	// 	}

	$scope.$on('$ionicView.beforeEnter', function(){
		if(typeof analytics !== undefined) {
			analytics.trackView('Tutorial Inicial');
		}
	});

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