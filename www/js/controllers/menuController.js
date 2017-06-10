angular.module('sejaGrato').controller('menuController', function($scope, $state, $ionicPopup, $rootScope, $state, $ionicHistory, $ionicLoading, $q, loginService){
	$scope.sairFirebase = loginService.sair;

	$scope.sair = function() {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Sair',
			template: 'Deseja realmente desconectar de ' + $rootScope.usuario.email + ' ?'
		});
		confirmPopup.then(function(resposta) {
			if(resposta) {
				$scope.sairFirebase()
				.then(function(response) {
					if(response == 'Ok') {
						$ionicHistory.nextViewOptions({
							disableBack: true
						});
						$rootScope.statusUsuario = false;
						$state.go('menu.sejaGrato');
						$ionicLoading.show({ template: 'Usuário desconectado', noBackdrop: true, duration: 2000 });
					}
				})
				.catch(function(error) {
					$ionicLoading.show({ template: error, noBackdrop: true, duration: 2000 });
				})
			}
		});
	}
})