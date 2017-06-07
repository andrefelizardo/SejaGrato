angular.module('sejaGrato').controller('criarContaController', function($scope, $ionicPopup, $timeout, $ionicLoading, $rootScope, loginService, $state, $ionicHistory, $http, $ionicLoading) {
	$scope.conta = [];
	$scope.contaLocal = [];
	$scope.login = loginService.logar;
	$scope.verificaLogado = loginService.verificaLogado;


	$scope.criarConta = function() {
		if($scope.conta.senha != $scope.conta.confirmaSenha) {
			var alertPopup = $ionicPopup.alert({
				title: 'Dados Incorretos',
				template: 'Confirmação de senha deve ser igual a senha.'
			});
		} else {
			if(window.Connection) {
				if(navigator.connection.type !== Connection.NONE) {
					$ionicLoading.show({
						content: 'Criando conta',
						animation: 'fade-in',
						showBackdrop: true,
						maxWidth: 200,
						showDelay: 0
					});
					var email = $scope.conta.email;
					var senha = $scope.conta.senha;
					$scope.criarContaFirebase(email, senha);
				} else {
					var alertPopup = $ionicPopup.alert({
						title: 'Sem Internet',
						template: 'Para executar esta ação você precisa de conexão a internet!'
					});	
				}
			}
		}
	}

	$scope.criarContaFirebase = function(email, password) {
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.catch(function(error){
			$timeout(function(){
				$ionicLoading.hide();
			}, 100);
			var errorCode = error.code;
			var errorMessage = error.message;
			if(errorCode == 'auth/weak-password') {
				var alertErroSenha = $ionicPopup.alert({
					title: 'Erro',
					template: 'Senha fraca. Digite uma senha com o mínimo de 6 caracteres.'
				});
			} else if (errorCode == 'auth/email-already-in-use') {
				var alertErroEmail = $ionicPopup.alert({
					title: 'Erro',
					template: 'E-mail já cadastrado.'
				});
			} else {
				var alertErroGenerico = $ionicPopup.alert({
					title: 'Erro',
					template: errorMessage
				});
			}
		})
		.then(function(result){
			if(result != undefined) {
				$timeout(function(){
					$ionicLoading.hide();
				}, 100);
				$scope.login(email, password, $rootScope.lista, $ionicPopup, $state, $ionicHistory, $rootScope, $scope, $http, $ionicLoading, $timeout);
				$scope.verificaLogado();
				var alertSucesso = $ionicPopup.alert({
					title: 'Conta criada',
					template: 'Conta criada com sucesso. Suas mensagens de gratidão agora estão na nuvem!'
				});
				alertSucesso.then(function(res){
					$ionicHistory.nextViewOptions({
						disableBack: true
					});
					$rootScope.statusUsuario = true;
					$state.go('menu.sejaGrato');
				});
			}
		})
	}
});