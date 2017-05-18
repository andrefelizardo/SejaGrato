angular.module('sejaGrato').controller('loginController', function($scope, loginService, $ionicPopup, $timeout, $state, $ionicHistory){
	$scope.logar = loginService.logar;
	$scope.conta = [{email: '', senha: ''}];
	$scope.login = function() {
		$scope.logar($scope.conta.email, $scope.conta.senha, $ionicPopup, $state, $ionicHistory);
	}
})