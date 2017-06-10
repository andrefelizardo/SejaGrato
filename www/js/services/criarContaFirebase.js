angular.module('sejaGrato')
.factory('criarContaService', ['$q',
	function ($q) {

		function criarConta(email, password) {
			var deferred = $q.defer();

			firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(function(result){
				deferred.resolve(result);
			})
			.catch(function(error){
				deferred.reject(error);
			})

			return deferred.promise;
		}


		return {
			criarConta: criarConta
		};
	}]);