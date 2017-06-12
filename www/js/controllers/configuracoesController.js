angular.module('sejaGrato').controller('configuracoesController',  function($scope, $rootScope, getUsuario){

	$scope.$on('$ionicView.enter', function(){
		$scope.getDataSincronizacao();
		$scope.usuario = $scope.getUsuario();
	});

	$scope.getUsuario = getUsuario.usuarioLocal;

	$scope.getDataSincronizacao = function() {
		var ultimaSincronizacao = angular.fromJson(localStorage.getItem('ultimaSincronizacao'));
		if(!ultimaSincronizacao) {
			return;
		}
		$scope.dataSincronizacao = ultimaSincronizacao[0].data;
		$scope.horaSincronizacao = ultimaSincronizacao[0].hora;
		console.log('peguei a data ' + $scope.horaSincronizacao);
	}
})