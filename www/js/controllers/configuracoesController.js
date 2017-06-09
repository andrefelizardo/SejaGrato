angular.module('sejaGrato').controller('configuracoesController', function($scope){
	$scope.dataSincronizacao = '';

	$scope.getDataSincronizacao = function() {
		$scope.dataSincronizacao = localStorage.getItem('ultimaSincronizacao');
	}

	$scope.getDataSincronizacao();
})