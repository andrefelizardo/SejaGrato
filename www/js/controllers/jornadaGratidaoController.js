angular
    .module('sejaGrato')
    .controller('jornadaGratidaoController',
    function ($ionicPlatform, $scope, $rootScope, $ionicLoading, $timeout) {
        $scope.$on('$ionicView.beforeEnter', function () {
            $ionicLoading.show({
                content: 'Carregando dados',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        });

        $scope.jornadaBase = [
            { titulo: '01 - Gratidão à Motivação', texto: 'Eu tenho gratidão por você ter baixado este aplicativo. E agora a intenção é que você sinta gratidão pela sua motivação. Você teve essa força interna, que muito nos ajuda a passar por problemas, para baixar o aplicativo por exemplo, já é um início. Seja grato pela motivação que vem de fora pra dentro, como um filme ou livro ou melhor ainda pela motivação que vem de dentro e nos faz sair da zona de conforto.' },
            { titulo: '02 - Ainda sem título', texto: 'Ainda sem texto'}
        ];

        $scope.definirMensagem = function() {
            var x = angular.fromJson(localStorage.getItem('jornada'));
            $scope.jornada = {
                titulo: $scope.jornadaBase[x].titulo,
                texto: $scope.jornadaBase[x].texto
            }
        }
    });