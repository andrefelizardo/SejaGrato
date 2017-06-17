angular.module('sejaGrato').controller('configuracoesController',  function($scope, $rootScope, $cordovaLocalNotification, $ionicLoading, getUsuario, datasService){

	if(typeof analytics !== undefined) {
		analytics.trackView('Configurações');
	}

	$scope.dataNotificacao = datasService.dataNotificacao;
	$scope.dataLembranca = datasService.dataLembranca;/

	$scope.$on('$ionicView.enter', function(){
		// toda vez que abrir
		$scope.getDataSincronizacao();
		$scope.usuario = $scope.getUsuario();
		$scope.getConfiguracoes();
	});

	$scope.$on('$ionicView.afterLeave', function() {
		// sempre que sair da view
		var configuracoes = {
			notificacaoNoturna: $scope.lembreteNoturno
		};

		configuracoes = angular.toJson(configuracoes);
		localStorage.setItem('configuracoes', configuracoes);
	});

	$scope.agendarLembreteNoturno = function() {
		$scope.lembreteNoturno = !$scope.lembreteNoturno;
		if($scope.lembreteNoturno) {
			var hoje_as_9_pm = new Date($scope.dataNotificacao());
			$cordovaLocalNotification.schedule({
				id: 3,
				title: 'Seja Grato!',
				text: "Pelo que você se sentiu grato hoje?",
				firstAt: hoje_as_9_pm,
				every: 'day'
			}).then(function(result) {
				$ionicLoading.show({ template: 'Lembrete agendado', noBackdrop: true, duration: 2000 });
			});
		} else {
			$cordovaLocalNotification.cancel(2, function () {
			}).then(function(){
				$ionicLoading.show({ template: 'Lembrete cancelado', noBackdrop: true, duration: 2000 });
			})
		}
	}

	// $scope.agendarLembrancaSemanal = function() {
	// 	$scope.lembrancaSemanal = !$scope.lembrancaSemanal;
	// 	if($scope.lembrancaSemanal) {
	// 		var primeira_lembranca = new Date($scope.dataLembranca());
	// 		$cordovaLocalNotification.schedule({
	// 			id: 3,
	// 			title: 'Se lembra desse dia?',
	// 			text: "Pelo que você se sentiu grato hoje?",
	// 			firstAt: primeira_lembranca,
	// 			every: 'week'
	// 		}).then(function(result) {
	// 			$ionicLoading.show({ template: 'Lembrança agendado', noBackdrop: true, duration: 2000 });
	// 		});
	// 	} else {
	// 		$cordovaLocalNotification.cancel(2, function () {
	// 			$ionicLoading.show({ template: 'Lembrança cancelada', noBackdrop: true, duration: 2000 });
	// 		}, scope);
	// 	}
	// }

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
		// $scope.lembrancaSemanal = configuracoes.lembrancaSemanal;
	}
})