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
	return {
		sincronizar: sincronizar
	};
}])