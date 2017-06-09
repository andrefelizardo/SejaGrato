angular.module('sejaGrato')
.factory('sincronizacaoFirebase', ['$rootScope', '$q',
	function ($rootScope, $q) {
	
	function sincronizar(usuario, listaBanco) {

		var deferred = $q.defer();

		firebase.database().ref('mensagens/').child(usuario).set({
				mensagens: listaBanco
			})
			.then(function(){
				// $rootScope.statusSincronizacao = true;
				deferred.resolve('Ok');
				return deferred.promise;
			})
			.catch(function(error){
				deferred.reject('Erro ao salvar' + error);
				return deferred.promise;
			})

			return deferred.promise;
	}

	return {
		sincronizar: sincronizar
	};
}])