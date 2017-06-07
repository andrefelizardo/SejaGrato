angular.module('sejaGrato').controller('criarContaController', function($scope, $ionicPopup, $timeout, $ionicLoading, $rootScope, criarContaService) {
	$scope.conta = [];
	$scope.contaLocal = [];
	$scope.criarContaFirebase = criarContaService.criarConta;


	$scope.criarConta = function() {
		if($scope.conta.senha != $scope.conta.confirmaSenha) {
			var alertPopup = $ionicPopup.alert({
				title: 'Dados Incorretos',
				template: 'Confirmação de senha deve ser igual a senha.'
			});
		} else {
			if(window.Connection) {
				if(navigator.connection.type !== Connection.NONE) {
					$ionicLoading.show({
						content: 'Criando conta',
						animation: 'fade-in',
						showBackdrop: true,
						maxWidth: 200,
						showDelay: 0
					});
					var email = $scope.conta.email;
					var senha = $scope.conta.senha;
					$scope.criarContaFirebase(email, senha);
				} else {
					var alertPopup = $ionicPopup.alert({
						title: 'Sem Internet',
						template: 'Para executar esta ação você precisa de conexão a internet!'
					});	
				}
			}
		}
	}

});