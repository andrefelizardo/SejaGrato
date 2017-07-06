angular.module('sejaGrato')
	.controller('motivacionalController',
	function ($ionicPlatform, $scope, $state, $ionicHistory, $ionicLoading, $timeout) {

		$scope.$on('$ionicView.beforeEnter', function () {
			$ionicLoading.show({
				content: 'Carregando dados',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
			});
			$scope.lembranca = angular.fromJson(localStorage.getItem('lembranca'));
			$timeout(function () {
				$ionicLoading.hide();
			}, 100);
		});

		$scope.home = function () {
			localStorage.removeItem('lembranca');
			$ionicHistory.nextViewOptions({
				disableBack: true
			});
			$state.go('menu.sejaGrato');
		}

	});