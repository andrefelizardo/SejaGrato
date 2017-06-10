angular.module('sejaGrato')
.factory('loginService', ['$q',
	function ($q) {

		function logar(email, password) {
			var deferred = $q.defer();

			firebase.auth().signInWithEmailAndPassword(email, password)
			.then(function(result) {
				deferred.resolve(result);
			})
			.catch(function(error) {
				deferred.reject(error);
			})
			return deferred.promise;
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
		var deferred = $q.defer();

		firebase.auth().signOut()
		.then(function(){
			deferred.resolve('Ok');
		})
		.catch(function(error) {
			deferred.reject(error);
		})

		return deferred.promise;
	}

	return {
		logar: logar,
		sair: sair,
		verificaLogado: verificaLogado
	};
}]);