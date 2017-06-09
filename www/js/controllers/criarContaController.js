angular.module('sejaGrato').controller('criarContaController', function($scope, $ionicPopup, $timeout, $ionicLoading, $rootScope, criarContaService, verificaInternet) {
	$scope.conta = [];
	$scope.contaLocal = [];
	$scope.criarContaFirebase = criarContaService.criarConta;
	$scope.verificaInternet = verificaInternet.verificar;


	$scope.criarConta = function() {
		if($scope.conta.senha != $scope.conta.confirmaSenha) {
			var alertPopup = $ionicPopup.alert({
				title: 'Dados Incorretos',
				template: 'Confirmação de senha deve ser igual a senha.'
			});
		} else {
			var conexao = $scope.verificaInternet();
			if(conexao) {
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
				$ionicLoading.show({ template: 'Sem internet', noBackdrop: true, duration: 2000 });
			}
		}
	}

});