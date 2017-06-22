angular.module('sejaGrato').controller('configuracoesController', function ($scope, $rootScope, $cordovaLocalNotification, $ionicLoading, getUsuario, datasService) {

	if (typeof analytics !== undefined) {
		analytics.trackView('Configurações');
	}

	$scope.dataNotificacao = datasService.dataNotificacao;
	$scope.dataLembranca = datasService.dataLembranca;

	$scope.$on('$ionicView.enter', function () {
		// toda vez que abrir
		$scope.getDataSincronizacao();
		$scope.usuario = $scope.getUsuario();
		$scope.getConfiguracoes();
	});

	$scope.$on('$ionicView.afterLeave', function () {
		// sempre que sair da view
		var configuracoes = {
			notificacaoNoturna: $scope.lembreteNoturno,
			primeiroAcesso: true,
			sons: $scope.sonsSistema
		};

		configuracoes = angular.toJson(configuracoes);
		localStorage.setItem('configuracoes', configuracoes);
	});

	$scope.agendarLembreteNoturno = function () {
		$scope.lembreteNoturno = !$scope.lembreteNoturno;
		if ($scope.lembreteNoturno) {
			var hoje_as_9_pm = new Date($scope.dataNotificacao());
			$cordovaLocalNotification.schedule({
				id: 2,
				title: 'Seja Grato!',
				text: "Pelo que você se sentiu grato hoje?",
				firstAt: hoje_as_9_pm,
				every: 'day'
			}).then(function (result) {
				$ionicLoading.show({ template: 'Lembrete agendado', noBackdrop: true, duration: 2000 });
			});

			$rootScope.$on('$cordovaLocalNotification:click', function (notification, state) {
				if (state.id == 2) {
					var alertPopup = $ionicPopup.alert({
						title: 'Seja Grato todos os dias',
						template: 'Pelo que você se sentiu grato hoje?'
					});
					$ionicHistory.nextViewOptions({
						disableBack: true
					});
					$state.go('menu.sejaGrato');
				}
			});
		} else {
			$cordovaLocalNotification.cancel(2, function () {
			}).then(function () {
				$ionicLoading.show({ template: 'Lembrete cancelado', noBackdrop: true, duration: 2000 });
			})
		}
	}

	$scope.configurarSonsSistema = function () {
		$scope.sonsSistema = !$scope.sonsSistema;
	}

	$scope.getUsuario = getUsuario.usuarioLocal;

	$scope.getDataSincronizacao = function () {
		var ultimaSincronizacao = angular.fromJson(localStorage.getItem('ultimaSincronizacao'));
		if (!ultimaSincronizacao) {
			return;
		}
		$scope.dataSincronizacao = ultimaSincronizacao[0].data;
		$scope.horaSincronizacao = ultimaSincronizacao[0].hora;
	}

	$scope.getConfiguracoes = function () {
		var configuracoes = angular.fromJson(localStorage.getItem('configuracoes'));
		$scope.lembreteNoturno = configuracoes.notificacaoNoturna;
		$scope.sonsSistema = configuracoes.sons;
		// $scope.lembrancaSemanal = configuracoes.lembrancaSemanal;
	}
})