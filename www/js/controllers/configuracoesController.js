angular.module('sejaGrato').controller('configuracoesController', function ($ionicPlatform, $scope, $rootScope, $cordovaLocalNotification, $ionicLoading, getUsuario, datasService, $timeout) {

	if (typeof analytics !== undefined) {
		analytics.trackView('Configurações');
	}

	$scope.dataNotificacao = datasService.dataNotificacao;
	$scope.dataLembranca = datasService.dataLembranca;

	$scope.$on('$ionicView.beforeEnter', function () {
		$ionicLoading.show({
			content: 'Carregando dados',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 0
		});
	});

	$scope.$on('$ionicView.enter', function () {
		// toda vez que abrir
		$scope.getDataSincronizacao();
		$scope.usuario = $scope.getUsuario();
		$scope.getConfiguracoes();
		$timeout(function () {
			$ionicLoading.hide();
		}, 100);
	});

	$scope.$on('$ionicView.afterLeave', function () {
		// sempre que sair da view
		var configuracoes = {
			notificacaoNoturna: $scope.lembreteNoturno,
			primeiroAcesso: true,
			sons: $scope.sonsSistema,
			lembranca: $scope.lembranca
		};

		configuracoes = angular.toJson(configuracoes);
		localStorage.setItem('configuracoes', configuracoes);
	});

	$ionicPlatform.ready(function () {
		$rootScope.$on('$cordovaLocalNotification:click', function (notification, state) {
			if (state.id == 2) {
				if (typeof analytics !== undefined) {
					analytics.trackEvent('Notificação Local', 'Lembrete diário', 'Clique na notificação de lembrete diário', 20);
				}
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
		} else {
			$cordovaLocalNotification.cancel(2, function () {
			}).then(function () {
				$ionicLoading.show({ template: 'Lembrete cancelado', noBackdrop: true, duration: 2000 });
			})
		}
	}

	$scope.configurarSonsSistema = function () {
		$scope.sonsSistema = !$scope.sonsSistema;
		if ($scope.sonsSistema) {
			$ionicLoading.show({ template: 'Sons ativados', noBackdrop: true, duration: 2000 });
		} else {
			$ionicLoading.show({ template: 'Sons desativados', noBackdrop: true, duration: 2000 });
		}
	}

	$scope.configurarLembranca = function () {
		$scope.lembranca = !$scope.lembranca;
		if ($scope.lembranca) {
			$ionicLoading.show({ template: 'Mensagens nostálgicas ativadas', noBackdrop: true, duration: 2000 });
		} else {
			$ionicLoading.show({ template: 'Mensagens nostálgicas desativadas', noBackdrop: true, duration: 2000 });
		}
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
		$scope.lembranca = configuracoes.lembranca;
		// $scope.lembrancaSemanal = configuracoes.lembrancaSemanal;
	}
})