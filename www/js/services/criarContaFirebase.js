angular.module('sejaGrato')
.factory('criarContaService', ['$timeout', '$ionicLoading', '$ionicPopup', '$rootScope', '$ionicHistory', '$state',
	function ($timeout, $ionicLoading, $ionicPopup, $rootScope, $ionicHistory, $state) {

		function criarConta(email, password) {
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
					// $scope.conta = '';
				}
			})
		}


		return {
			criarConta: criarConta
		};
	}]);