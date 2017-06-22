angular.module('sejaGrato')
.controller('motivacionalController', 
function($scope){

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

        $scope.sorteios = function () {
			var total = $scope.motivacao.length;
			var numero = Math.floor((Math.random() * total) + 1);
			numero = numero - 1;
			$scope.mensagemSorteada = {
				frase: $scope.motivacao[numero].frase,
				autor: $scope.motivacao[numero].autor
			}
        }

        $scope.sorteios();

});