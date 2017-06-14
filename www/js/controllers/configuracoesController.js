angular.module('sejaGrato').controller('configuracoesController',  function($scope, $rootScope, $cordovaLocalNotification, getUsuario){

	if(typeof analytics !== undefined) {
		analytics.trackView('Configurações');
	}

	$scope.$on('$ionicView.enter', function(){
		$scope.getDataSincronizacao();
		$scope.usuario = $scope.getUsuario();
	});

	// colocar essa parada aqui pra verificar se o cara já salvou essa configuração
	// se já, ele não seta como true, seta o que salvou
	$scope.lembreteNoturno = true;

	$scope.agendarLembreteNoturno = function() {
		$scope.lembreteNoturno = !$scope.lembreteNoturno;
		if($scope.lembreteNoturno) {
			$cordovaLocalNotification.schedule({
				id: 2,
				text: "Taporra!",
				firstAt: tomorrow_at_8_am,
				every: 'day' // every 30 minutes
			}).then(function(result) {
				alert(result);
			});
		}
	}

	// criar uma parada pra salvar as configurações quando sair da tela.

	$scope.getUsuario = getUsuario.usuarioLocal;

	$scope.getDataSincronizacao = function() {
		var ultimaSincronizacao = angular.fromJson(localStorage.getItem('ultimaSincronizacao'));
		if(!ultimaSincronizacao) {
			return;
		}
		$scope.dataSincronizacao = ultimaSincronizacao[0].data;
		$scope.horaSincronizacao = ultimaSincronizacao[0].hora;
	}
})