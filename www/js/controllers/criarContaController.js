angular.module('sejaGrato').controller('criarContaController', function($scope, $ionicPopup, $timeout, $ionicLoading, $rootScope, criarContaService, verificaInternet, $q) {
	$scope.conta = [];
	$scope.contaLocal = [];
	$scope.criarContaFirebase = criarContaService.criarConta;
	$scope.verificaInternet = verificaInternet.verificar;

	if(typeof analytics !== undefined) {
			analytics.trackView('Criar Conta');
		}

	$scope.criarConta = function() {
		if($scope.conta.senha != $scope.conta.confirmaSenha) {
			var alertPopup = $ionicPopup.alert({
				title: 'Dados Incorretos',
				template: 'Confirmação de senha deve ser igual a senha.'
			});
		} else {
			var conexao = $scope.verificaInternet();
			if(conexao) {
				$ionicLoading.show({
					content: 'Criando conta',
					animation: 'fade-in',
					showBackdrop: true,
					maxWidth: 200,
					showDelay: 0
				});
				var email = $scope.conta.email;
				var senha = $scope.conta.senha;
				$scope.criarContaFirebase(email, senha)
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
					if(typeof analytics !== undefined) {
						analytics.trackEvent('Conta', 'Criar Conta');
					}
				}
			})
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
			} else {
				$ionicLoading.show({ template: 'Sem internet', noBackdrop: true, duration: 2000 });
			}
		}
	}

});