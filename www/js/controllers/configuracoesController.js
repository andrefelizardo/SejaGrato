angular.module('sejaGrato').controller('configuracoesController',  function($scope, $rootScope, $cordovaLocalNotification, getUsuario, datasService){

	$scope.dataNotificacao = datasService.dataNotificacao;

	if(typeof analytics !== undefined) {
		analytics.trackView('Configurações');
	}

	$scope.$on('$ionicView.enter', function(){
		$scope.getDataSincronizacao();
		$scope.usuario = $scope.getUsuario();
	});

	$scope.agendarLembreteNoturno = function() {
		$scope.lembreteNoturno = !$scope.lembreteNoturno;
		var configuracoes = {notificacaoNoturna: $scope.lembreteNoturno};
		configuracoes = angular.toJson(configuracoes);
		localStorage.setItem('configuracoes', configuracoes);
		if($scope.lembreteNoturno) {
			var hoje_as_9_pm = new Date($scope.dataNotificacao());
			$cordovaLocalNotification.schedule({
				id: 2,
				title: 'Seja Grato!',
				text: "Pelo que você se sentiu grato hoje?",
				firstAt: hoje_as_9_pm,
				every: 'day'
			}).then(function(result) {
				console.log(result);
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

	$scope.getConfiguracoes = function() {
		var configuracoes = angular.fromJson(localStorage.getItem('configuracoes'));
		$scope.lembreteNoturno = configuracoes.notificacaoNoturna;
	}
})