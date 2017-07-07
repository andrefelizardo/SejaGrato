angular
    .module('sejaGrato')
    .controller('jornadaGratidaoController',
    function ($ionicPlatform, $scope, $rootScope, $ionicLoading, $timeout, $ionicPopup, $cordovaNativeAudio, $ionicHistory, $state, datasService) {

        $scope.getDataAtual = datasService.dataAtual;
        $scope.abrirLoading = function () {
            $ionicLoading.show({
                content: 'Carregando dados',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        }

        $scope.fecharLoading = function () {
            $timeout(function () {
                $ionicLoading.hide();
            }, 100);
        }

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.abrirLoading();
        });

        $scope.$on('$ionicView.enter', function () {
            $scope.definirMensagem();
            $scope.fecharLoading();
        });

        $scope.atualizaListaLocal = function () {
            var listaJson = angular.toJson($rootScope.lista);
            localStorage.setItem('mensagensSejaGrato', listaJson);
        }

        $scope.goHome = function () {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('menu.sejaGrato');
        }

        $scope.jornadaBase = [
            { titulo: '01 - Gratidão à Motivação', texto: 'Eu tenho gratidão por você ter baixado este aplicativo. E agora a intenção é que você sinta gratidão pela sua motivação. Você teve essa força interna, que muito nos ajuda a passar por problemas, para baixar o aplicativo por exemplo, já é um início. Seja grato pela motivação que vem de fora pra dentro, como um filme ou livro ou melhor ainda pela motivação que vem de dentro e nos faz sair da zona de conforto.' },
            { titulo: '02 - Ainda sem título', texto: 'Ainda sem texto' }
        ];

        $scope.definirMensagem = function () {
            $scope.configuracoes = angular.fromJson(localStorage.getItem('configuracoes'));
            var x = $scope.configuracoes.jornadaDia;
            $scope.jornada = {
                titulo: $scope.jornadaBase[x].titulo,
                texto: $scope.jornadaBase[x].texto
            }
        }

        $scope.escreverMensagem = function () {
            $rootScope.lista = angular.fromJson(localStorage.getItem('mensagensSejaGrato'));
            var myPopup = $ionicPopup.show({
                template: "<input type='text' ng-model='lista.texto'>",
                title: 'Escreva a mensagem',
                scope: $rootScope,
                buttons: [
                    { text: 'Desistir' },
                    {
                        text: '<b>Vencer desafio!</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            if (!$rootScope.lista.texto) {
                                e.preventDefault();
                                $ionicLoading.show({ template: 'Digite um texto', noBackdrop: true, duration: 2000 });
                            } else {
                                $scope.abrirLoading();
                                $scope.dataAtual = $scope.getDataAtual();
                                $rootScope.lista.push({ texto: $rootScope.lista.texto, data: $scope.dataAtual });
                                $scope.atualizaListaLocal();
                                if ($scope.configuracoes.sons) {
                                    $cordovaNativeAudio.play('click');
                                    $timeout(function () {
                                        $cordovaNativeAudio.stop('click');
                                    }, 2000);
                                }

                                $scope.configuracoes.jornadaDia++;

                                localStorage.setItem('configuracoes', angular.toJson($scope.configuracoes));

                                if (typeof analytics !== undefined) {
                                    analytics.trackEvent('Mensagem', 'Adicionar Mensagem', 'Adicionando na tela da jornada', 50);
                                }

                                $rootScope.lista.texto = '';

                                $ionicLoading.show({ template: 'Parabéns! Desafio vencido!', noBackdrop: true, duration: 3000 });

                                $timeout(function () {
                                    $scope.goHome();
                                }, 2500);
                            }
                        }
                    }
                ]
            });
        }
    });