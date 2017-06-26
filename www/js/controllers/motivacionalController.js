angular.module('sejaGrato')
	.controller('motivacionalController',
	function ($scope, $state, $ionicHistory) {

		$scope.motivacao = [
			{ titulo: '01 - Gratidão à Motivação', frase: 'Eu tenho gratidão por você ter baixado este aplicativo. E agora a intenção é que você sinta gratidão pela motivação. Você teve essa força interna, que muito nos ajuda a passar por problemas, para baixar o aplicativo, já é um início. Seja grato pela motivação que vem de fora pra dentro, como um filme ou livro ou melhor ainda pela motivação que vem de dentro e nos faz sair da zona de conforto. Que tal escrever uma mensagem de gratidão sobre isso?', imagem: 'Autor Desconhecido' },
			{ titulo: '02 - Gratidão à Motivação', frase: 'Eu tenho gratidão por você ter baixado este aplicativo. E agora a intenção é que você sinta gratidão pela motivação. Você teve essa força interna, que muito nos ajuda a passar por problemas, para baixar o aplicativo, já é um início. Seja grato pela motivação que vem de fora pra dentro, como um filme ou livro ou melhor ainda pela motivação que vem de dentro e nos faz sair da zona de conforto. Que tal escrever uma mensagem de gratidão sobre isso?', imagem: 'Autor Desconhecido' },
		];

		$scope.sorteios = function () {
			var total = $scope.motivacao.length;
			var numero = Math.floor((Math.random() * total) + 1);
			numero = numero - 1;
			$scope.mensagemSorteada = {
				titulo: $scope.motivacao[numero].titulo,
				frase: $scope.motivacao[numero].frase,
				autor: $scope.motivacao[numero].autor
			}
		}

		$scope.home = function () {
			$ionicHistory.nextViewOptions({
				disableBack: true
			});
			$state.go('menu.sejaGrato');
		}

		$scope.sorteios();

	});