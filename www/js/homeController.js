angular.module('sejaGrato').controller('HomeController', function($scope){
	$scope.lista = [];
	$scope.dadosLocal = '';

	$scope.salvarTexto = function() {
				// data atual
				var data = new Date();
				var dia = data.getDate();
				var mes = data.getMonth() + 1;
				var ano = data.getFullYear();
				$scope.lista.data = [dia, mes, ano].join('/');
				$scope.lista.push({texto: $scope.lista.texto, data: $scope.lista.data});
				var listaJson = angular.toJson($scope.lista);
				localStorage.setItem('mensagensSejaGrato', listaJson);
				$scope.lista.texto = '';
			}

			$scope.pageLoad = function() {
				var listaSalva = localStorage.getItem('mensagensSejaGrato');
				if(listaSalva != null) {
					$scope.lista = angular.fromJson(listaSalva);
					$scope.dadosLocal = true;
				} else {
					$scope.dadosLocal = false;
				}
			}

			$scope.pageLoad();
		});