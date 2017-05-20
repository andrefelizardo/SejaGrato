angular.module('sejaGrato').factory('loginService', [function (email, senha) {
	function logar(email, password, lista, $ionicPopup, $state, $ionicHistory, $rootScope, $scope, $http) {
		firebase.auth().signInWithEmailAndPassword(email, password)
		.catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
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
		.then(function(result) {
			if(result){
				var usuarioFirebase = localStorage.getItem('firebase:authUser:AIzaSyAl3rNUfKOgzjqyNpSL3JTW_6-0ocaj_FE:[DEFAULT]');
				$rootScope.usuario = angular.fromJson(usuarioFirebase);
					// Se tem mensagem em LocalStorage
					if(!localStorage.getItem('mensagensSejaGrato')) {
						$http.get('https://seja-grato.firebaseio.com/mensagens/' + $rootScope.usuario.uid + '/mensagens.json')
						.then(function(mensagens){
							lista = mensagens.data;
							$scope.atualizaListaLocal();
							var alertLogado = $ionicPopup.alert({
								title: 'Conectado',
								template: 'Sincronizado'
							});
							alertLogado.then(function(res){
								$ionicHistory.nextViewOptions({
									disableBack: true
								});
								$rootScope.statusUsuario = true;
								$state.go('menu.sejaGrato');
							});
						},
						function(erro) {
							console.log(erro);
						});
					} else {
						$http.get('https://seja-grato.firebaseio.com/mensagens/' + $rootScope.usuario.uid + '/mensagens.json')
						.then(function(mensagens){
							console.log(lista);
							// $rootScope.lista.push(mensagens.data);
							// $scope.atualizaListaLocal();
							var alertLogado = $ionicPopup.alert({
								title: 'Conectado',
								template: 'Sincronizado'
							});
							alertLogado.then(function(res){
								$ionicHistory.nextViewOptions({
									disableBack: true
								});
								$rootScope.statusUsuario = true;
								$state.go('menu.sejaGrato');
							});
						},
						function(erro) {
							console.log(erro);
						});
					}
				}
			});
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