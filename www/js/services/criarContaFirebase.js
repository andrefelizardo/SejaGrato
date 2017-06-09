angular.module('sejaGrato')
.factory('criarContaService', ['$q',
	function ($q) {

		function criarConta(email, password) {
			var deferred = $q.defer();

			firebase.auth().createUserWithEmailAndPassword(email, password)
			.catch(function(error){
				deferred.reject(error);
			})
			.then(function(result){
				deferred.resolve(result);
			})

			return deferred.promise;
		}


		return {
			criarConta: criarConta
		};
	}]);