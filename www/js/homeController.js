angular.module('sejaGrato').controller('HomeController', function($scope, $rootScope, loginService, $ionicPopup, $timeout, $ionicModal, $ionicActionSheet, $http, $ionicLoading, $timeout, $ionicSlideBoxDelegate, $ionicPush){
	$rootScope.usuario = [];
	$scope.logar = loginService.logar;
	$scope.verificaLogado = loginService.verificaLogado;
	$scope.motivacao = [{frase: 'A gratidão é a memória do coração.', autor: 'Autor Desconhecido'},];

	$scope.registerPush = function() {
		$ionicPush.register().then(function(t) {
			return $ionicPush.saveToken(t);
		}).then(function(t) {
			console.log('Token saved:', t.token);
		});
	}

	$scope.$on('cloud:push:notification', function(event, data) {
		var msg = data.message;
		alert(msg.title + ': ' + msg.text);
	});	

	// $scope.options = {
	// 	loop: false,
	// 	effect: 'fade',
	// 	speed: 500,
	// }

	$scope.sincronizar = function() {
		var alertPopup = $ionicPopup.alert({
			title: 'Salvando',
			template: 'Suas mensagens já estão sendo salvas na nuvem.'
		});
		// salvando no Firebase
		if($rootScope.statusUsuario){
			var usuario = $rootScope.usuario.uid;
			var listaBanco = angular.copy($rootScope.lista);
			firebase.database().ref('mensagens/').child(usuario).set({
				mensagens: listaBanco
			});
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

	$scope.showOpcoes = function(mensagem) {
		$ionicActionSheet.show({
			titleText: 'Opções da Mensagem',
			buttons: [
			{ text: 'Editar' },
			],
			destructiveText: 'Excluir',
			cancelText: 'Cancelar',
			cancel: function() {
				console.log('Cancelado');
			},
			buttonClicked: function(index) {
				$scope.visualizarTexto(mensagem);
				return true;
			},
			destructiveButtonClicked: function() {
				var index = $rootScope.lista.indexOf(mensagem);
				var confirmPopup = $ionicPopup.confirm({
					title: 'Excluir',
					template: 'Deseja realmente excluir esta mensagem?'
				});
				confirmPopup.then(function(resposta) {
					if(resposta) {
						$rootScope.lista.splice(index, 1);
						$scope.atualizaListaLocal();
					}
				});
				return true;
			}
		});
	}

	$scope.visualizarTexto = function(mensagem) {
		$scope.openModal();
		$scope.mensagemSelecionada = mensagem;
		var index = $rootScope.lista.indexOf(mensagem);
		console.log(mensagem);
		console.log(index);
		$scope.editarTexto = function() {
			$rootScope.lista[index].texto = $scope.mensagemSelecionada.texto;
			$scope.atualizaListaLocal();
			$scope.modal.hide();
		}
	}

	$scope.salvarTexto = function() {
		if($rootScope.lista.texto == '' || $rootScope.lista.texto == undefined) {
			var alertPopup = $ionicPopup.alert({
				title: 'Ainda não está grato?',
				template: 'Deixe um texto dizendo o quanto você está grato.'
			});
		} else {
				// data atual
				var data = new Date();
				var dia = data.getDate();
				var mes = data.getMonth() + 1;
				var ano = data.getFullYear();
				$rootScope.lista.data = [dia, mes, ano].join('/');
				$rootScope.lista.push({texto: $rootScope.lista.texto, data: $rootScope.lista.data});
				$scope.atualizaListaLocal();

				$rootScope.dadosLocal = true;
				$rootScope.lista.texto = '';
				console.log($rootScope.lista);
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
				console.log('peguei do banco');
				$scope.sairLoading();
			} else {
				$rootScope.dadosLocal = false;
				$scope.sairLoading();	

			}
			$scope.registerPush();
		}

		$scope.pageLoad();
	});