angular.module('sejaGrato').controller('HomeController', function($scope, $rootScope, loginService, $ionicPopup, $timeout, $ionicModal, $ionicActionSheet, $http, $ionicLoading, $timeout, $ionicSlideBoxDelegate, $ionicPush, $cordovaLocalNotification, $ionicListDelegate, sincronizacaoFirebase, $q){
	$rootScope.usuario = [];
	$scope.logar = loginService.logar;
	$scope.verificaLogado = loginService.verificaLogado;
	$scope.sincronizarBanco = sincronizacaoFirebase.sincronizar;
	$scope.statusSincronizacao = '';
	$scope.motivacao = [{frase: 'A gratidão é a memória do coração.', autor: 'Autor Desconhecido'},];
	$scope.filtroDia = {
		opcoes: ['Hoje', 'Ontem', 'Sempre']};
	$scope.filtroDia.opcao = {
		opcaoEscolhida: $scope.filtroDia.opcoes[2]
	}
	$scope.dataFiltrada = '';

	$scope.$watch('filtroDia.opcao.opcaoEscolhida', function(valorNovo, valorAntigo){
		if(valorNovo == 'Hoje') {
			$scope.dataFiltrada = $scope.dataAtual;
		} else if (valorNovo == 'Ontem') {
			$scope.dataFiltrada = $scope.dataOntem;
		} else {
			$scope.dataFiltrada = '';
		}
	});

	$scope.datas = function() {
		var data = new Date();
		var dia = data.getDate();
		var diaOntem = data.getDate() - 1;
		var mes = data.getMonth() + 1;
		var ano = data.getFullYear();
		var hora = data.getHours();
		var minuto = data.getMinutes();
		$rootScope.lista.data = [dia, mes, ano].join('/');
		$scope.dataAtual = $rootScope.lista.data;
		$scope.dataOntem = [diaOntem, mes, ano].join('/');
		$scope.horaAtual = [hora, minuto].join(':');
	}

	$scope.tamanhoTextarea = function() {
		objTextArea = document.querySelector('textarea.textareaModal');
		$scope.tamanhoScroll = objTextArea.scrollHeight;
		$scope.tamanhoObjeto = objTextArea.offsetHeight;
	}

	$scope.$watch('tamanhoScroll', function(valorNovo, valorAntigo){
		if(valorNovo > valorAntigo) {
			objTextArea.rows += 1;
		}
	});

	$scope.notificacaoRapida = function() {
		var now = new Date();
		var seconds = now.setSeconds(now.getSeconds() + 30);

		$cordovaLocalNotification.schedule({
			id: '1',
			data: seconds,
			message: 'Agendado a 30 segundos',
			title: 'Notificação Local Braba!'
		}).then(function() {
			console.log('Agendada');
		});
	}

	$scope.isScheduled = function(id) {
		$cordovaLocalNotification.isScheduled(id).then(function(isScheduled) {
			alert("Notification "+id+" Scheduled: " + isScheduled);
		});
	}

	$scope.hideButtonsOptions = function() {
		$ionicListDelegate.closeOptionButtons();
	}

	// $scope.$watch('statusSincronizacao', function(valorNovo, valorAntigo){
	// 	if($rootScope.statusSincronizacao){
	// 			$scope.$broadcast('scroll.refreshComplete');
	// 		}
	// });


	$scope.sincronizar = function() {
		// verificar se tem internet
		if($rootScope.statusUsuario){
			var usuario = $rootScope.usuario.uid;
			var listaBanco = angular.copy($rootScope.lista);
			$scope.sincronizarBanco(usuario, listaBanco)
			.then(function(resposta){
				if(resposta == 'Ok'){
					$scope.datas();
					localStorage.setItem('ultimaSincronizacao', $scope.dataAtual + ' ' + $scope.horaAtual);
					$scope.$broadcast('scroll.refreshComplete');
				}
			})
		}
	}


	$scope.entrarLoading = function() {
		$ionicLoading.show({
			content: 'Carregando dados',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 0
		});
	}
	$scope.sairLoading = function() {
		$timeout(function(){
			$ionicLoading.hide();
		}, 100);
	}

	$scope.atualizaListaLocal = function() {
		var listaJson = angular.toJson($rootScope.lista);
		localStorage.setItem('mensagensSejaGrato', listaJson);
	}

	$ionicModal.fromTemplateUrl('templates/modalTextoGratidao.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal){
		$scope.modal = modal;
	});
	$scope.openModal = function() {
		$scope.modal.show();
	};
	$scope.closeModal = function() {
		$scope.modal.hide();
	}

	$scope.visualizarTexto = function(mensagem) {
		$scope.hideButtonsOptions();
		$scope.openModal();
		$scope.mensagemSelecionada = angular.copy(mensagem);
		var index = $rootScope.lista.indexOf(mensagem);
		$scope.editarTexto = function() {
			$rootScope.lista[index].texto = $scope.mensagemSelecionada.texto;
			$scope.atualizaListaLocal();
			$scope.modal.hide();
		}
	}

	$scope.excluirTexto = function(mensagem) {
		$scope.hideButtonsOptions();
		var index = $rootScope.lista.indexOf(mensagem);
		var confirmPopup = $ionicPopup.confirm({
			title: 'Excluir',
			template: 'Deseja realmente excluir esta mensagem (' + mensagem.texto + ') ?'
		});
		confirmPopup.then(function(resposta) {
			if(resposta) {
				$rootScope.lista.splice(index, 1);
				$scope.atualizaListaLocal();
			}
		});
		return true;
	}

	$scope.salvarTexto = function() {
		$scope.hideButtonsOptions();
		if($rootScope.lista.texto == '' || $rootScope.lista.texto == undefined) {
			var alertPopup = $ionicPopup.alert({
				title: 'Ainda não está grato?',
				template: 'Deixe um texto dizendo o quanto você está grato.'
			});
		} else {
				// data atual
				
				$rootScope.lista.push({texto: $rootScope.lista.texto, data: $rootScope.lista.data});
				$scope.atualizaListaLocal();

				$rootScope.dadosLocal = true;
				$rootScope.lista.texto = '';
			}
		}

		$scope.pageLoad = function() {
			$scope.entrarLoading();
			if(localStorage.getItem('mensagensSejaGrato')) {
				$rootScope.lista = angular.fromJson(localStorage.getItem('mensagensSejaGrato'));
				$rootScope.dadosLocal = true;
				if(localStorage.getItem('firebase:authUser:AIzaSyAl3rNUfKOgzjqyNpSL3JTW_6-0ocaj_FE:[DEFAULT]') != '' && localStorage.getItem('firebase:authUser:AIzaSyAl3rNUfKOgzjqyNpSL3JTW_6-0ocaj_FE:[DEFAULT]') !== null) {
					$rootScope.statusUsuario = true;
					var usuarioFirebase = localStorage.getItem('firebase:authUser:AIzaSyAl3rNUfKOgzjqyNpSL3JTW_6-0ocaj_FE:[DEFAULT]');
					$rootScope.usuario = angular.fromJson(usuarioFirebase);
				}
				$scope.sairLoading();
			} else if(localStorage.getItem('firebase:authUser:AIzaSyAl3rNUfKOgzjqyNpSL3JTW_6-0ocaj_FE:[DEFAULT]') != '' && localStorage.getItem('firebase:authUser:AIzaSyAl3rNUfKOgzjqyNpSL3JTW_6-0ocaj_FE:[DEFAULT]') !== null){
				$rootScope.dadosLocal = true;
				$rootScope.statusUsuario = true;
				var usuarioFirebase = localStorage.getItem('firebase:authUser:AIzaSyAl3rNUfKOgzjqyNpSL3JTW_6-0ocaj_FE:[DEFAULT]');
				$rootScope.usuario = angular.fromJson(usuarioFirebase);
				$http.get('https://seja-grato.firebaseio.com/mensagens/' + $rootScope.usuario.uid + '/mensagens.json')
				.then(function(mensagens){
					$rootScope.lista = mensagens.data;
					$scope.atualizaListaLocal();
				},
				function(erro) {
					console.log(erro);
				});
				$scope.sairLoading();
			} else {
				$rootScope.dadosLocal = false;
				$scope.sairLoading();	

			}
			$scope.datas();
		}

		$scope.pageLoad();
	});