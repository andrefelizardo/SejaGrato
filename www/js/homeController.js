angular.module('sejaGrato').controller('HomeController', function($scope){
	$scope.lista = [];


	$scope.salvarTexto = function() {
				// data atual
				var data = new Date();
				var dia = data.getDate();
				var mes = data.getMonth() + 1;
				var ano = data.getFullYear();
				$scope.lista.data = [dia, mes, ano].join('/');
				$scope.lista.push({texto: $scope.lista.texto, data: $scope.lista.data});
				$scope.lista.texto = '';
			}
		});