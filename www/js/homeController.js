angular.module('sejaGrato').controller('HomeController', function($scope, $rootScope, loginService, $ionicPopup, $timeout, $ionicModal){
	$scope.lista = [];
	$scope.usuario = [];
	$scope.dadosLocal = '';
	$rootScope.statusUsuario = false;
	$scope.logar = loginService.logar;
	$scope.verificaLogado = loginService.verificaLogado;
	$scope.motivacao = [{frase: 'A gratidão é a memória do coração.', autor: 'Autor Desconhecido'},];

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

	$scope.editarTexto = function(index) {
		$scope.openModal();
		$scope.mensagemSelecionada = index;
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
				var listaJson = angular.toJson($scope.lista);
				localStorage.setItem('mensagensSejaGrato', listaJson);
				//salvando no Firebase
				firebase.database().ref('mensagens/' + $scope.idUsuario).set({
					email: $scope.email,
					data: $scope.lista.data,
					texto: $scope.lista.texto
				});

				$scope.dadosLocal = true;
				$scope.lista.texto = '';
			}
		}

		$scope.pageLoad = function() {
			var usuarioLocal = localStorage.getItem('usuarioSejaGrato');
			if(usuarioLocal != null) {
				$scope.usuario = angular.fromJson(usuarioLocal);
				$scope.logar($scope.usuario[0].user, $scope.usuario[0].senha);
				$scope.verificaLogado();
				if(localStorage.getItem('firebase:authUser:AIzaSyAl3rNUfKOgzjqyNpSL3JTW_6-0ocaj_FE:[DEFAULT]') != '') {
					$rootScope.statusUsuario = true;
				}
			}
			var listaSalva = localStorage.getItem('mensagensSejaGrato');
			if(listaSalva != null) {
				$scope.lista = angular.fromJson(listaSalva);
				$scope.dadosLocal = true;
			} else {
				$scope.dadosLocal = false;
			}
		}

		$scope.pageLoad();
	});