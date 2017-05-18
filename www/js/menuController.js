angular.module('sejaGrato').controller('menuController', function($scope, $state, loginService, $ionicPopup, $rootScope, $state, $ionicHistory){
	$scope.sairFirebase = loginService.sair;

	$scope.sair = function() {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Sair',
			template: 'Deseja realmente desconectar da sua conta?'
		});
		confirmPopup.then(function(resposta) {
			if(resposta) {
				$scope.sairFirebase();
				$ionicHistory.nextViewOptions({
					disableBack: true
				});
				$rootScope.statusUsuario = false;
				$state.go('menu.sejaGrato');
			}
		});
	}
})