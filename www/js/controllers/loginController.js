angular.module('sejaGrato').controller('loginController', function($scope, loginService){
	$scope.logar = loginService.logar;
	$scope.conta = [{email: '', senha: ''}];
	$scope.login = function() {
		$scope.logar($scope.conta.email, $scope.conta.senha);
	}
})