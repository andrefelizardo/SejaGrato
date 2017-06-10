angular.module('sejaGrato').controller('loginController', function($scope, $rootScope, $ionicLoading, $timeout, $ionicPopup, $http, $ionicHistory, $state, $q, loginService, verificaInternet, getUsuario, sincronizacaoFirebase, datasService){
	$scope.logar = loginService.logar;
	$scope.conta = [{email: '', senha: ''}];
	$scope.verificaInternet = verificaInternet.verificar;
	$scope.getUsuario = getUsuario.usuarioLocal;
	$scope.sincronizarBanco = sincronizacaoFirebase.sincronizar;
	$scope.getMensagens = sincronizacaoFirebase.getMensagens;
	$scope.getDataAtual = datasService.dataAtual;
	$scope.sairLoading = function() {
		$timeout(function(){
			$ionicLoading.hide();
		}, 100);
	}

	$scope.login = function() {
		var conexao = $scope.verificaInternet();
		if(conexao) {
			$ionicLoading.show({
				content: 'Carregando dados',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
			});
			$scope.logar($scope.conta.email, $scope.conta.senha)
			.then(function(result) {
				if(result) {
					$rootScope.usuario = $scope.getUsuario();
					$scope.getMensagens($rootScope.usuario.uid)
					.then(function(mensagens){
						if(localStorage.getItem('mensagensSejaGrato') && mensagens.data) {
								// tem localstorage e banco
								var listaBanco = angular.fromJson(mensagens.data);
								var listaLocal = angular.fromJson(localStorage.getItem('mensagensSejaGrato'));
								var listaFinal = listaLocal.concat(listaBanco);
								$rootScope.lista = listaFinal;
								listaFinalJson = angular.toJson(listaFinal);
								localStorage.setItem('mensagensSejaGrato', listaFinalJson);

								$scope.sincronizarBanco($rootScope.usuario.uid, listaFinal)
								.then(function(resposta){
									if(resposta == 'Ok'){
										$scope.dataAtual = $scope.getDataAtual();
										localStorage.setItem('ultimaSincronizacao', $scope.dataAtual);
										$scope.sairLoading();

										$rootScope.dadosLocal = true;
										var alertLogado = $ionicPopup.alert({
											title: 'Conectado',
											template: 'Juntamos suas mensagens do celular com as que estavam na nuvem para você não se esquecer de nada.'
										});
										alertLogado.then(function(res){
											$ionicHistory.nextViewOptions({
												disableBack: true
											});
											$rootScope.statusUsuario = true;
											$state.go('tutorial-sync');
										});
									}
								})
								.catch(function(error) {
									$ionicLoading.show({ template: error, noBackdrop: true, duration: 2000 });
								})
							} else if (mensagens.data) {
								// tem só banco
								$rootScope.lista = mensagens.data;
								var listaJson = angular.toJson($rootScope.lista);
								localStorage.setItem('mensagensSejaGrato', listaJson);
								$rootScope.dadosLocal = true;
								$scope.sairLoading();
								var alertLogado = $ionicPopup.alert({
									title: 'Conectado',
									template: 'Agora suas mensagens da nuvem também estão no seu celular!'
								});
								alertLogado.then(function(res){
									$ionicHistory.nextViewOptions({
										disableBack: true
									});
									$rootScope.statusUsuario = true;
									$state.go('tutorial-sync');
								});
							} else if(localStorage.getItem('mensagensSejaGrato')) {
								// tem só localstorage
								var listaLocalJson = angular.fromJson(localStorage.getItem('mensagensSejaGrato'));
								
								$scope.sincronizarBanco($rootScope.usuario.uid, listaLocalJson)
								.then(function(resposta){
									if(resposta == 'Ok'){
										$scope.dataAtual = $scope.getDataAtual();
										localStorage.setItem('ultimaSincronizacao', $scope.dataAtual);
										$scope.sairLoading();

										$rootScope.dadosLocal = true;
										var alertLogado = $ionicPopup.alert({
											title: 'Conectado',
											template: 'Legal. Suas mensagens do celular agora estão na nuvem.'
										});
										alertLogado.then(function(res){
											$ionicHistory.nextViewOptions({
												disableBack: true
											});
											$rootScope.statusUsuario = true;
											$state.go('tutorial-sync');
										});
									}
								})
								.catch(function(error) {
									$ionicLoading.show({ template: error, noBackdrop: true, duration: 2000 });
								})
							} else {
								// não tem banco nem localstorage
								$scope.sairLoading();
								var alertLogado = $ionicPopup.alert({
									title: 'Conectado',
									template: 'Login feito! Aproveite para escrever sua primeira mensagem de gratidão.'
								});
								alertLogado.then(function(res){
									$ionicHistory.nextViewOptions({
										disableBack: true
									});
									$rootScope.statusUsuario = true;
									$state.go('tutorial-sync');
								});
							}
						},
						function(erro){
							$ionicLoading.show({ template: erro, noBackdrop: true, duration: 2000 });
						});
				}
			})
			.catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				$scope.sairLoading();
				if(errorCode === 'auth/wrong-password') {
					var alertPopup = $ionicPopup.alert({
						title: 'Erro',
						template: 'Senha incorreta.'
					});
				} else if(errorCode === 'auth/user-not-found') {
					var alertPopup = $ionicPopup.alert({
						title: 'Erro',
						template: 'Usuário não encontrado'
					});
				} else {
					var alertPopup = $ionicPopup.alert({
						title: 'Erro',
						template: errorMessage
					});

				}
				$ionicLoading.show({ template: error, noBackdrop: true, duration: 2000 });
			})
		} else {
			$ionicLoading.show({ template: 'Sem conexão com a internet', noBackdrop: true, duration: 2000 });
		}
	}
})