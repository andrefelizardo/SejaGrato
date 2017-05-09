angular.module('sejaGrato').controller('HomeController', function($scope, $firebaseSimpleLogin){
	$scope.lista = [];
	$scope.dadosLocal = '';
	$scope.motivacao = [{frase: 'A gratidão é a memória do coração.', autor: 'Autor Desconhecido'},];

	// FIREBASE
	var firebaseObj = new Firebase('https://seja-grato.firebaseio.com/');
	var loginObj = $firebaseSimpleLogin(firebaseObj);

	$scope.loginFirebase = function($scope) {
		event.preventDefault(); //para previnir refresh do form
		var username = 'eu@andrefelizardo.com.br';
		var password = 'Engenheiro10';

		loginObj.$login('password', {
			email: username,
			password: password
		})
		.then(function(user) {
			// se funcionar
			console.log('autenticou!')
		}, function(error) {
			// se não funcionar
			console.log('nem autenticou');
		});
	}

	$scope.salvarTexto = function() {
				// data atual
				var data = new Date();
				var dia = data.getDate();
				var mes = data.getMonth() + 1;
				var ano = data.getFullYear();
				$scope.lista.data = [dia, mes, ano].join('/');
				$scope.lista.push({texto: $scope.lista.texto, data: $scope.lista.data});
				var listaJson = angular.toJson($scope.lista);
				localStorage.setItem('mensagensSejaGrato', listaJson);
				$scope.dadosLocal = true;
				$scope.lista.texto = '';
			}

			$scope.pageLoad = function() {
				var listaSalva = localStorage.getItem('mensagensSejaGrato');
				if(listaSalva != null) {
					$scope.lista = angular.fromJson(listaSalva);
					$scope.dadosLocal = true;
				} else {
					$scope.dadosLocal = false;
				}
			}

			$scope.pageLoad();
			$scope.loginFirebase();
		});