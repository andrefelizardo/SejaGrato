angular.module('sejaGrato')
	.controller('HomeController',
	function ($ionicPlatform, $scope, $rootScope, $ionicPopup, $timeout, $ionicModal, $ionicActionSheet, $http, $ionicLoading, $ionicSlideBoxDelegate, $cordovaLocalNotification, $ionicListDelegate, $q, $cordovaNativeAudio, $state, $ionicHistory, sincronizacaoFirebase, getUsuario, verificaInternet, datasService, loginService) {

		$scope.$on('$ionicView.beforeEnter', function () {
			if (typeof analytics !== undefined) {
				analytics.trackView('Página Inicial');
			}
			$scope.getConfiguracoesLocais();
		});

		$scope.$on('$ionicView.afterLeave', function () {
			$scope.notificacaoPrimeiraMensagem();
		});

		$scope.motivacao = [
			{ frase: 'A gratidão é a memória do coração.', autor: 'Autor Desconhecido' },
			{ frase: 'Não ofereça a Deus apenas a dor de suas penitências, ofereça também suas alegrias.', autor: 'Paulo Coelho' },
			{ frase: 'O quão feliz é uma pessoa depende da profundidade de sua gratidão.', autor: 'Autor Desconhecido' },
			{ frase: 'Aos incapazes de gratidão nunca faltam pretextos para não a ter.', autor: 'Autor Desconhecido' },
			{ frase: 'A gratidão é um fruto de grande cultura; não se encontra entre gente vulgar.', autor: 'Autor Desconhecido' },
			{ frase: 'A única pessoa que você está destinado a se tornar é a pessoa que você decide ser.', autor: 'Ralph Waldo Emerson' },
			{ frase: 'O dia de hoje não foi como você planejou? Ainda assim, agradeça.', autor: 'Fábrica de Mentes' },
			{ frase: 'As pessoas não decidem seu futuro, elas decidem seus hábitos, e seus hábitos decidem seu futuro.', autor: 'F.M. Alexander' },
			{ frase: 'Se você quer algo que nunca teve, faça algo que nunca fez.', autor: 'Thomas Jefferson' },
			{ frase: 'Cada vez que você dá uma desculpa, há alguém que tem o mesmo problema, mas passa por cima.', autor: 'Sonhe Grande' },
			{ frase: 'Sucesso é uma ciência exata que todos podem aprender.', autor: 'Flávio Augusto' },
			{ frase: 'Não é o que nos acontece que mais importa, e sim o que nós fazemos com o que nos acontece.', autor: 'Paulo Vieira' },
			{ frase: 'Não espere por uma crise para descobrir o que é importante em sua vida.', autor: 'Platão' }
		];

		$scope.imagens = ['img/tela-inicial-white.png', 'img/tutorial-01.png', 'img/tutorial-02.png', 'img/tutorial-03.png'];

		$scope.sorteios = function () {
			var total = $scope.motivacao.length;
			var numero = Math.floor((Math.random() * total) + 1);
			numero = numero - 1;
			$scope.mensagemSorteada = {
				frase: $scope.motivacao[numero].frase,
				autor: $scope.motivacao[numero].autor
			}

			var totalImagens = $scope.imagens.length;
			var numeroImagem = Math.floor((Math.random() * totalImagens) + 1);
			numeroImagem = numeroImagem - 1;
			$scope.imagemSorteada = $scope.imagens[numeroImagem];
		}

		$scope.getConfiguracoesLocais = function () {
			$scope.dadosLocais = localStorage.getItem('mensagensSejaGrato');
			$scope.configuracoes = localStorage.getItem('configuracoes');
			$scope.usuarioLogado = localStorage.getItem('firebase:authUser:AIzaSyAl3rNUfKOgzjqyNpSL3JTW_6-0ocaj_FE:[DEFAULT]');
			$scope.lembranca = localStorage.getItem('lembranca');
		}

		$scope.agendarLembranca = function () {
			if (!$scope.lembranca) {
				var total = $rootScope.lista.length;
				var numero = Math.floor((Math.random() * total) + 1);
				numero = numero - 1;
				var lembranca = {
					texto: $rootScope.lista[numero].texto,
					data: $rootScope.lista[numero].data
				}

				var data = new Date();
				var dia = data.setDate(data.getDate() + 3);
				// var minuto = data.setMinutes(data.getMinutes() + 2);
				var data = new Date(data);

				$cordovaLocalNotification.schedule({
					id: 10,
					at: data,
					title: 'Lembra desse dia?',
					text: 'Lembra do que aconteceu em ' + lembranca.data + '?'
				}).then(function () {
					localStorage.setItem('lembranca', angular.toJson(lembranca));
				});
			}
		}

		$ionicPlatform.ready(function () {
			$rootScope.$on('$cordovaLocalNotification:click', function (notification, state) {
				if (typeof analytics !== undefined) {
					analytics.trackEvent('Notificação Local', 'Motivacional', 'Clique na notificação motivacional', 20);
				}
				if (state.id == 10) {
					$ionicHistory.nextViewOptions({
						disableBack: true
					});
					$state.go('motivacional');
				}
			});
			$rootScope.$on('$cordovaLocalNotification:click', function (notification, state) {
				if (state.id == 1) {
					if (typeof analytics !== undefined) {
						analytics.trackEvent('Notificação Local', 'Primeira mensagem', 'Clique na notificação de primeira mensagem', 20);
					}
					var alertPopup = $ionicPopup.alert({
						title: 'Seja Grato!',
						template: 'Que tal adicionar sua primeira mensagem de gratidão?'
					});
					$ionicHistory.nextViewOptions({
						disableBack: true
					});
					$state.go('menu.sejaGrato');
				}
			});
			$scope.sorteios();
			var configuracoesLocais = angular.fromJson(localStorage.getItem('configuracoes'));
			if (!localStorage.getItem('configuracoes') || !configuracoesLocais.lembranca) {
				function dataNotificacaoNoturna() {
					var data = new Date();
					if (data.getHours() < 21) {
						data.setDate(data.getDate());
					} else {
						data.setDate(data.getDate() + 1);
					}
					data.setHours(21);
					data.setMinutes(0);
					data.setSeconds(0);
					var dataNotificacaoNoturna = new Date(data);
					return dataNotificacaoNoturna;
				}
				var hoje_as_9_pm = new Date(dataNotificacaoNoturna());
				$cordovaLocalNotification.schedule({
					id: 2,
					title: 'Seja Grato!',
					text: 'Pelo que você se sentiu grato hoje?',
					firstAt: hoje_as_9_pm,
					every: 'day'
				});

				var configuracoes = {
					notificacaoNoturna: true,
					primeiroAcesso: true,
					sons: true,
					lembranca: true
				};
				configuracoes = angular.toJson(configuracoes);
				localStorage.setItem('configuracoes', configuracoes);
			}

			$rootScope.$on('$cordovaLocalNotification:click', function (notification, state) {
				if (state.id == 2) {
					if (typeof analytics !== undefined) {
						analytics.trackEvent('Notificação Local', 'Lembrete diário', 'Clique na notificação de lembrete diário', 20);
					}
					var alertPopup = $ionicPopup.alert({
						title: 'Seja Grato todos os dias',
						template: 'Pelo que você se sentiu grato hoje?'
					});
					$ionicHistory.nextViewOptions({
						disableBack: true
					});
					$state.go('menu.sejaGrato');
				}
			});

			$cordovaNativeAudio
				.preloadSimple('click', 'sounds/sampler.mp3')
				.then(function (msg) {
					// alert('audio ok');
				}, function (error) {
					// console.log(error);
				});


		});

		$scope.getUsuario = getUsuario.usuarioLocal;
		$scope.logar = loginService.logar;
		$scope.verificaLogado = loginService.verificaLogado;
		$scope.sincronizarBanco = sincronizacaoFirebase.sincronizar;
		$scope.getMensagens = sincronizacaoFirebase.getMensagens;
		$scope.verificaInternet = verificaInternet.verificar;
		$scope.statusSincronizacao = '';
		$scope.getDataAtual = datasService.dataAtual;
		$scope.getDataOntem = datasService.dataOntem;
		$scope.getDataLimiteSincronizacao = datasService.dataLimiteSincronizacao;
		$scope.getHoraAtual = datasService.horaAtual;

		$scope.filtroDia = {
			opcoes: ['Hoje', 'Ontem', 'Todas']
		};
		$scope.filtroDia.opcao = {
			opcaoEscolhida: $scope.filtroDia.opcoes[0]
		}
		$scope.dataFiltrada = '';

		$scope.$watch('filtroDia.opcao.opcaoEscolhida', function (valorNovo, valorAntigo) {
			$scope.entrarLoading();
			$scope.dataAtual = $scope.getDataAtual();
			$scope.dataOntem = $scope.getDataOntem();
			if (valorNovo == 'Hoje') {
				$scope.dataFiltrada = $scope.dataAtual;
				$scope.sairLoading();
			} else if (valorNovo == 'Ontem') {
				$scope.dataFiltrada = $scope.dataOntem;
				$scope.sairLoading();
			} else {
				$scope.dataFiltrada = '';
				$scope.sairLoading();
			}
		});

		$scope.tamanhoTextarea = function () {
			objTextArea = document.querySelector('textarea.textareaModal');
			$scope.tamanhoScroll = objTextArea.scrollHeight;
			$scope.tamanhoObjeto = objTextArea.offsetHeight;
		}

		$scope.$watch('tamanhoScroll', function (valorNovo, valorAntigo) {
			if (valorNovo > valorAntigo) {
				objTextArea.rows += 1;
			}
		});

		$scope.notificacaoPrimeiraMensagem = function () {
			if ($rootScope.lista.length > 1) {
				return;
			}
			var configuracoes = angular.fromJson(localStorage.getItem('configuracoes'));
			if (!configuracoes.primeiroAcesso) {
				return;
			}

			var now = new Date();
			var minutes = now.setMinutes(now.getMinutes() + 5);
			var data = new Date(now);

			$cordovaLocalNotification.schedule({
				id: '1',
				at: data,
				message: 'Que tal adicionar sua primeira mensagem de gratidão?',
				title: 'Seja Grato!'
			});

			var configuracoes = angular.fromJson(localStorage.getItem('configuracoes'));
			configuracoes.primeiroAcesso = true;
			localStorage.setItem('configuracoes', angular.toJson(configuracoes));
		}

		$scope.hideButtonsOptions = function () {
			$ionicListDelegate.closeOptionButtons();
		}

		$scope.sincronizar = function () {
			var conexao = $scope.verificaInternet();
			if (conexao) {
				if ($rootScope.statusUsuario) {
					var usuario = $rootScope.usuario.uid;
					var listaBanco = angular.copy($rootScope.lista);
					$scope.sincronizarBanco(usuario, listaBanco)
						.then(function (resposta) {
							if (resposta == 'Ok') {
								var hora = $scope.getHoraAtual();
								var data = $scope.getDataAtual();
								var horarioSincronizacao = [];
								horarioSincronizacao.push({ data: data, hora: hora });
								horarioSincronizacao = angular.toJson(horarioSincronizacao);
								localStorage.setItem('ultimaSincronizacao', horarioSincronizacao);
								$scope.$broadcast('scroll.refreshComplete');

								if (typeof analytics !== undefined) {
									analytics.trackEvent('Sincronização', 'Sincronização de Mensagens', 'Sincronizando mensagens manualmente', 30);
								}
							}
						})
				}
			} else {
				$scope.$broadcast('scroll.refreshComplete');
				$ionicLoading.show({ template: 'Sem internet', noBackdrop: true, duration: 2000 });
			}
		}

		$scope.entrarLoading = function () {
			$ionicLoading.show({
				content: 'Carregando dados',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
			});
		}
		$scope.sairLoading = function () {
			$timeout(function () {
				$ionicLoading.hide();
			}, 100);
		}

		$scope.atualizaListaLocal = function () {
			var listaJson = angular.toJson($rootScope.lista);
			localStorage.setItem('mensagensSejaGrato', listaJson);
		}

		$ionicModal.fromTemplateUrl('templates/modalTextoGratidao.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function (modal) {
			$scope.modal = modal;
		});
		$scope.openModal = function () {
			$scope.modal.show();
		};
		$scope.closeModal = function () {
			$scope.modal.hide();
		}


		$scope.visualizarTexto = function (mensagem) {
			$scope.hideButtonsOptions();
			$scope.openModal();
			$scope.mensagemSelecionada = angular.copy(mensagem);
			var index = $rootScope.lista.indexOf(mensagem);
			$scope.editarTexto = function () {
				$rootScope.lista[index].texto = $scope.mensagemSelecionada.texto;
				$scope.atualizaListaLocal();
				$scope.modal.hide();
			}
		}

		$scope.excluirTexto = function (mensagem) {
			$scope.hideButtonsOptions();
			var index = $rootScope.lista.indexOf(mensagem);
			var confirmPopup = $ionicPopup.confirm({
				title: 'Excluir',
				template: 'Deseja realmente excluir esta mensagem (' + mensagem.texto + ') ?'
			});
			confirmPopup.then(function (resposta) {
				if (resposta) {
					$rootScope.lista.splice(index, 1);
					$scope.atualizaListaLocal();
				}
			});
			return true;
		}

		$scope.salvarTexto = function () {
			$scope.hideButtonsOptions();
			if ($rootScope.lista.texto == '' || $rootScope.lista.texto == undefined) {
				var alertPopup = $ionicPopup.alert({
					title: 'Ainda não está grato?',
					template: 'Deixe um texto dizendo o quanto você está grato.'
				});
			} else {
				$scope.dataAtual = $scope.getDataAtual();
				$rootScope.lista.push({ texto: $rootScope.lista.texto, data: $scope.dataAtual });
				$scope.atualizaListaLocal();

				$rootScope.dadosLocal = true;
				$rootScope.lista.texto = '';

				var configuracoesLocais = angular.fromJson(localStorage.getItem('configuracoes'));

				if (configuracoesLocais.sons) {
					$cordovaNativeAudio.play('click');
					$timeout(function () {
						$cordovaNativeAudio.stop('click');
					}, 3000);
				}

				if (typeof analytics !== undefined) {
					analytics.trackEvent('Mensagem', 'Adicionar Mensagem', 'Adicionando na tela inicial', 10);
				}
				if ($rootScope.lista.length > 20 && configuracoesLocais.lembranca == true) {
					$scope.agendarLembranca();
				}
			}
		}

		$scope.sincronizacaoAutomatica = function () {
			var ultimaSincronizacao = angular.fromJson(localStorage.getItem('ultimaSincronizacao'));
			if (!ultimaSincronizacao) {
				$scope.sincronizar();
				return;
			}
			var dataSincronizacao = ultimaSincronizacao[0].data;
			var dataLimite = $scope.getDataLimiteSincronizacao();
			var arrayTemp = dataSincronizacao.split('/');
			var auxiliar = arrayTemp[1];
			arrayTemp[1] = arrayTemp[0];
			arrayTemp[0] = auxiliar;
			dataLimite = new Date(dataLimite);
			dataSincronizacao = new Date(arrayTemp.join('/'));
			if (dataLimite > dataSincronizacao)
				$scope.sincronizar();
		}

		$scope.pageLoad = function () {
			$scope.entrarLoading();
			$scope.getConfiguracoesLocais();
			if ($scope.dadosLocais) {
				$rootScope.lista = angular.fromJson(localStorage.getItem('mensagensSejaGrato'));
				if (!$rootScope.lista) {
					localStorage.removeItem('mensagensSejaGrato');
					return;
				} else {
					$rootScope.dadosLocal = true;
				}
				if ($scope.usuarioLogado != '' && $scope.usuarioLogado !== null) {
					$rootScope.statusUsuario = true;
					$rootScope.usuario = $scope.getUsuario();
					$scope.sincronizacaoAutomatica();
				}
				$scope.sairLoading();
			} else if ($scope.usuarioLogado != '' && $scope.usuarioLogado !== null) {
				$rootScope.dadosLocal = true;
				$rootScope.statusUsuario = true;
				$rootScope.usuario = $scope.getUsuario();
				$scope.getMensagens($$rootScope.usuario.uid)
					.then(function (mensagens) {
						$rootScope.lista = mensagens.data;
						$scope.atualizaListaLocal();
					},
					function (erro) {
						alert(erro);
					});
				$scope.sairLoading();
			} else {
				$rootScope.dadosLocal = false;
				$scope.sairLoading();
			}
		}

		$scope.pageLoad();
	});