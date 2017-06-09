angular.module('sejaGrato').controller('configuracoesController',  function($scope, $rootScope, getUsuario){

	$scope.$on('$ionicView.enter', function(){
		$scope.getDataSincronizacao();
	});

	$scope.getUsuario = getUsuario.usuarioLocal;

	$scope.getDataSincronizacao = function() {
		$scope.dataSincronizacao = localStorage.getItem('ultimaSincronizacao');
	}

	$scope.usuario = $scope.getUsuario();
})