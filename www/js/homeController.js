angular.module('sejaGrato').controller('HomeController', function($scope){
	$scope.lista = [];
	$scope.dadosLocal = '';
	$scope.idUsuario = '1';
	$scope.email = 'eu@andrefelizardo.com.br';
	$scope.senha = 'Engenheiro10';
	$scope.motivacao = [{frase: 'A gratidão é a memória do coração.', autor: 'Autor Desconhecido'},];

	// FIREBASE
	$scope.loginFirebase = function() {
		firebase.auth().signInWithEmailAndPassword($scope.email, $scope.senha)
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
		$scope.verificaLogadoFirebase();
	}

	$scope.verificaLogadoFirebase = function() {
		firebase.auth().onAuthStateChanged(function(user) {
			if(user) {
				console.log('Usuário logado nenem');
			}
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
				//salvando no Firebase
				firebase.database().ref('mensagens/' + $scope.idUsuario).set({
					email: $scope.email,
					data: $scope.lista.data,
					texto: $scope.lista.texto
				});

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
				$scope.loginFirebase();
			}

			$scope.pageLoad();
		});