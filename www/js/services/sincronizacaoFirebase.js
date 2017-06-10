angular.module('sejaGrato')
.factory('sincronizacaoFirebase', ['$q',
	function ($q) {
	
	function sincronizar(usuario, listaBanco) {

		var deferred = $q.defer();

		firebase.database().ref('mensagens/').child(usuario).set({
				mensagens: listaBanco
			})
			.then(function(){
				deferred.resolve('Ok');
			})
			.catch(function(error){
				deferred.reject(error);
			})

			return deferred.promise;
	}

	function get(usuario) {

		var deferred = $q.defer();

		$http.get('https://seja-grato.firebaseio.com/mensagens/' + usuario + '/mensagens.json')
		.then(function(mensagens) {
			deferred.resolve(mensagens);
		})
		.catch(function(error) {
			deferred.reject(error);
		})

		return deferred.promise;
	}

	return {
		sincronizar: sincronizar,
		getMensagens: get
	};
}])