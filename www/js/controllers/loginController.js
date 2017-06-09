angular.module('sejaGrato').controller('loginController', function($scope, loginService, verificaInternet, $ionicLoading){
	$scope.logar = loginService.logar;
	$scope.conta = [{email: '', senha: ''}];
	$scope.verificaInternet = verificaInternet.verificar;

	$scope.login = function() {
		var conexao = $scope.verificaInternet();
		if(conexao) {
			$scope.logar($scope.conta.email, $scope.conta.senha);
		} else {
			$ionicLoading.show({ template: 'Sem internet', noBackdrop: true, duration: 2000 });
		}
	}
})