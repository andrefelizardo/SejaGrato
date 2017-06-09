angular.module('sejaGrato')
.factory('getUsuario', ['$q',
	function ($q) {
	
	function getUsuario() {

		// var deferred = $q.defer();

		if(localStorage.getItem('mensagensSejaGrato')) {
			var usuarioFirebase = localStorage.getItem('firebase:authUser:AIzaSyAl3rNUfKOgzjqyNpSL3JTW_6-0ocaj_FE:[DEFAULT]');
			var usuarioLocal = angular.fromJson(usuarioFirebase);

			return usuarioLocal;
		} else {
			return false;
		}

		// firebase.database().ref('mensagens/').child(usuario).set({
		// 		mensagens: listaBanco
		// 	})
		// 	.then(function(){
		// 		deferred.resolve('Ok');
		// 	})
		// 	.catch(function(error){
		// 		deferred.reject('Erro ao salvar' + error);
		// 	})

		// 	return deferred.promise;
	}
	return {
		usuarioLocal: getUsuario
	};
}])