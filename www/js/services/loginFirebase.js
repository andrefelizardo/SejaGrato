angular.module('sejaGrato').factory('loginService', [function (email, senha) {
	function logar(email, password, lista, $ionicPopup, $state, $ionicHistory, $rootScope, $scope, $http, $ionicLoading, $timeout) {
		$ionicLoading.show({
			content: 'Carregando dados',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 0
		});
		firebase.auth().signInWithEmailAndPassword(email, password)
		.catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			$timeout(function(){
				$ionicLoading.hide();
			}, 100);
			if(errorCode === 'auth/wrong-password') {
				var alertPopup = $ionicPopup.alert({
					title: 'Erro',
					template: 'Senha incorreta.'
				});
			} else if(errorCode === 'auth/user-not-found') {
				var alertPopup = $ionicPopup.alert({
					title: 'Erro',
					template: 'Usuário não encontrado'
				});
			} else {
				var alertPopup = $ionicPopup.alert({
					title: 'Erro',
					template: errorMessage
				});

			}
			console.log(error);
		})
		.then(function(result){
			if(result) {
				var usuarioFirebase = localStorage.getItem('firebase:authUser:AIzaSyAl3rNUfKOgzjqyNpSL3JTW_6-0ocaj_FE:[DEFAULT]');
				$rootScope.usuario = angular.fromJson(usuarioFirebase);
				$http.get('https://seja-grato.firebaseio.com/mensagens/' + $rootScope.usuario.uid + '/mensagens.json')
				.then(function(mensagens){
					if(localStorage.getItem('mensagensSejaGrato') && mensagens.data) {
						var listaBanco = angular.fromJson(mensagens.data);
						var listaLocal = angular.fromJson(localStorage.getItem('mensagensSejaGrato'));
						var listaFinal = listaLocal.concat(listaBanco);
						$rootScope.lista = listaFinal;
						listaFinal = angular.toJson(listaFinal);
						localStorage.setItem('mensagensSejaGrato', listaFinal);

						firebase.database().ref('mensagens/').child($rootScope.usuario.uid).set({
							mensagens: listaFinal
						});

						$timeout(function(){
							$ionicLoading.hide();
						}, 100);

						$rootScope.dadosLocal = true;
						var alertLogado = $ionicPopup.alert({
							title: 'Conectado',
							template: 'Mensagens sincronizadas'
						});
						alertLogado.then(function(res){
							$ionicHistory.nextViewOptions({
								disableBack: true
							});
							$rootScope.statusUsuario = true;
							$state.go('menu.sejaGrato');
						});
					} else if (mensagens.data) {
						$rootScope.lista = mensagens.data;
						var listaJson = angular.toJson($rootScope.lista);
						localStorage.setItem('mensagensSejaGrato', listaJson);
						$rootScope.dadosLocal = true;
						$timeout(function(){
							$ionicLoading.hide();
						}, 100);
						var alertLogado = $ionicPopup.alert({
							title: 'Conectado',
							template: 'Mensagens sincronizadas'
						});
						alertLogado.then(function(res){
							$ionicHistory.nextViewOptions({
								disableBack: true
							});
							$rootScope.statusUsuario = true;
							$state.go('menu.sejaGrato');
						});
					} else if(localStorage.getItem('mensagensSejaGrato')) {
						var listaLocalJson = angular.toJson($rootScope.lista);
						firebase.database().ref('mensagens/').child($rootScope.usuario.uid).set({
							mensagens: listaLocalJson
						});
						$timeout(function(){
							$ionicLoading.hide();
						}, 100);
						var alertLogado = $ionicPopup.alert({
							title: 'Conectado',
							template: 'Mensagens sincronizadas'
						});
						alertLogado.then(function(res){
							$ionicHistory.nextViewOptions({
								disableBack: true
							});
							$rootScope.statusUsuario = true;
							$state.go('menu.sejaGrato');
						});
					}



				},
				function(erro){
					console.log(erro);
				});
			}
		})

	}

	function atualizaListaLocal() {
		var listaJson = angular.toJson($rootScope.lista);
		localStorage.setItem('mensagensSejaGrato', listaJson);
	}

	function verificaLogado() {
		firebase.auth().onAuthStateChanged(function(user) {
			if(user) {
				user.getToken().then(function(data) {
					console.log(data);
				})
				return true;
			}
		});
	}

	function sair() {
		firebase.auth().signOut()
	}

	return {
		logar: logar,
		sair: sair,
		verificaLogado: verificaLogado
	};
}]);