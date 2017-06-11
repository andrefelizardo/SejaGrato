angular.module('sejaGrato').controller('menuController', function($scope, $state, $ionicPopup, $rootScope, $state, $ionicHistory, $ionicLoading, $q, loginService, getUsuario){
	$scope.sairFirebase = loginService.sair;
	$scope.getUsuario = getUsuario.usuarioLocal;

	$scope.$on('$ionicView.enter', function(){
		$scope.statusUsuario = verificaStatusUsuario();
		// console.log('verificando menu');
	});

	var verificaStatusUsuario = function() {
		var usuario = $scope.getUsuario();
		if (usuario) {
			return true;
		} else {
			return false;
		}
	}

	$scope.statusUsuario = verificaStatusUsuario();

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
						$ionicLoading.show({ template: 'Usuário desconectado', noBackdrop: true, duration: 2000 });
						$ionicHistory.nextViewOptions({
							disableBack: true
						});
						$scope.statusUsuario = false;
						$state.go('menu.sejaGrato');
					}
				})
				.catch(function(error) {
					$ionicLoading.show({ template: error, noBackdrop: true, duration: 2000 });
				})
			}
		});
	}
})