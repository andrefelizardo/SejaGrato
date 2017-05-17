angular.module('sejaGrato').factory('loginService', [function (email, senha) {
	function logar(email, password, ionic) {
		firebase.auth().signInWithEmailAndPassword(email, password)
		.catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			if(errorCode === 'auth/wrong-password') {
				var alertPopup = ionic.alert({
					title: 'Erro',
					template: 'Senha incorreta.'
				});
			} else if(errorCode === 'auth/user-not-found') {
				var alertPopup = ionic.alert({
					title: 'Erro',
					template: 'Usuário não encontrado'
				});
			} else {
			var alertPopup = ionic.alert({
				title: 'Erro',
				template: errorMessage
			});

			}
			console.log(error);
		})
		.then(function(result) {
			console.log(result);
		});
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

	return {
		logar: logar,
		verificaLogado: verificaLogado
	};
}]);