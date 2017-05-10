angular.module('sejaGrato').controller('criarContaController', function($scope, $ionicPopup, $timeout) {
	$scope.conta = [];

	$scope.criarConta = function() {
		if(criarContaForm.email.$error.required) {
			console.log('campo obrigatório');
		}
		if($scope.conta.senha != $scope.conta.confirmaSenha) {
			var alertPopup = $ionicPopup.alert({
				title: 'Dados Incorretos',
				template: 'Confirmação de senha deve ser igual a senha.'
			});
		}
	}
});