angular.module('sejaGrato').factory('loginService', [function (email, senha) {
	function logar(email, password, $ionicPopup, $state, $ionicHistory) {
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
				var alertLogado = $ionicPopup.alert({
					title: 'Conectado',
					template: 'Sincronizado'
				});
				alertLogado.then(function(res){
					$ionicHistory.nextViewOptions({
						disableBack: true
					});
					$state.go('menu.sejaGrato');
				});
			}
		});
	}

	// function logarLocalStorage(email, senha) {
	// 	var contaLocal = [];
	// 	contaLocal.push({user: email, senha: senha})
	// 	var contaJson = angular.toJson(contaLocal);
	// 	localStorage.setItem('usuarioSejaGrato', contaJson);
	// 	// $rootScope.statusUsuario = true;
	// }

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

	function sair($state, $ionicHistory) {
		firebase.auth().signOut()
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		$state.go('menu.sejaGrato');
	}

	return {
		logar: logar,
		sair: sair,
		verificaLogado: verificaLogado
	};
}]);