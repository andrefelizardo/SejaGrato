angular.module('sejaGrato').factory('loginService', [function (email, senha) {
	function logar(email, password) {
		firebase.auth().signInWithEmailAndPassword(email, password)
		.catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			if(errorCode === 'auth/wrong-password') {
				alert('Senha errada.');
			} else {
				alert(errorMessage);
			}
			console.log(error);
		});
	}

	function verificaLogado() {
		firebase.auth().onAuthStateChanged(function(user) {
			if(user) {
				return true;
			}
		});
	}

	return {
		logar: logar,
		verificaLogado: verificaLogado
	};
}]);