angular.module('sejaGrato').controller('HomeController', function($scope, $rootScope, loginService, $ionicPopup, $timeout, $ionicModal, $ionicActionSheet, $http){
	$scope.lista = [];
	$rootScope.usuario = [];
	$scope.dadosLocal = '';
	$rootScope.statusUsuario = false;
	$scope.logar = loginService.logar;
	$scope.verificaLogado = loginService.verificaLogado;
	$scope.motivacao = [{frase: 'A gratidão é a memória do coração.', autor: 'Autor Desconhecido'},];

	$scope.atualizaListaLocal = function() {
		var listaJson = angular.toJson($scope.lista);
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
				var index = $scope.lista.indexOf(mensagem);
				var confirmPopup = $ionicPopup.confirm({
					title: 'Excluir',
					template: 'Deseja realmente excluir esta mensagem?'
				});
				confirmPopup.then(function(resposta) {
					if(resposta) {
						$scope.lista.splice(index, 1);
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
		var index = $scope.lista.indexOf(mensagem);
		console.log(mensagem);
		console.log(index);
		$scope.editarTexto = function() {
			$scope.lista[index].texto = $scope.mensagemSelecionada.texto;
			$scope.atualizaListaLocal();
			$scope.modal.hide();
		}
	}

	$scope.salvarTexto = function() {
		if($scope.lista.texto == '' || $scope.lista.texto == undefined) {
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
				$scope.lista.data = [dia, mes, ano].join('/');
				$scope.lista.push({texto: $scope.lista.texto, data: $scope.lista.data});
				$scope.atualizaListaLocal();
				//salvando no Firebase
				if($rootScope.statusUsuario){
					var usuario = $rootScope.usuario.uid;
					var listaBanco = angular.copy($scope.lista);
					console.log(listaBanco);
					firebase.database().ref('mensagens/').child(usuario).set({
						mensagens: listaBanco
					});
				}

				$scope.dadosLocal = true;
				$scope.lista.texto = '';
			}
		}

		$scope.pageLoad = function() {
			if(localStorage.getItem('mensagensSejaGrato')) {
				$scope.lista = angular.fromJson(localStorage.getItem('mensagensSejaGrato'));
				$scope.dadosLocal = true;
				console.log('peguei de localStorage');
			} else if(localStorage.getItem('firebase:authUser:AIzaSyAl3rNUfKOgzjqyNpSL3JTW_6-0ocaj_FE:[DEFAULT]') != '' && localStorage.getItem('firebase:authUser:AIzaSyAl3rNUfKOgzjqyNpSL3JTW_6-0ocaj_FE:[DEFAULT]') !== null){
				$scope.dadosLocal = true;
				$rootScope.statusUsuario = true;
				var usuarioFirebase = localStorage.getItem('firebase:authUser:AIzaSyAl3rNUfKOgzjqyNpSL3JTW_6-0ocaj_FE:[DEFAULT]');
				$rootScope.usuario = angular.fromJson(usuarioFirebase);
				$http.get('https://seja-grato.firebaseio.com/mensagens/' + $rootScope.usuario.uid + '/mensagens.json')
				.then(function(mensagens){
					$scope.lista = mensagens.data;
					$scope.atualizaListaLocal();
				},
				function(erro) {
					console.log(erro);
				});
				console.log('peguei do banco');
			} else {
				$scope.dadosLocal = false;	
			}
		}

		$scope.pageLoad();
	});