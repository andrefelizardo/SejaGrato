angular.module('sejaGrato').controller('loginController', function($scope, loginService, $ionicPopup, $timeout, $state, $ionicHistory, $rootScope, $http){
	$scope.logar = loginService.logar;
	$scope.conta = [{email: '', senha: ''}];
	$scope.login = function() {
		$scope.logar($scope.conta.email, $scope.conta.senha, $rootScope.lista, $ionicPopup, $state, $ionicHistory, $rootScope, $scope, $http);
	}
})