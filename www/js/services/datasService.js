angular.module('sejaGrato')
.factory('datasService', ['$q', 
	function($q) {
		function dataAtual() {
			var data = new Date();
			var dia = data.getDate();
			var mes = data.getMonth() + 1;
			var ano = data.getFullYear();
			var dataAtual = [dia, mes, ano].join('/');
			return dataAtual;
		}

		function dataNotificacaoNoturna() {
			var data = new Date();
			if(data.getHours() < 21) {
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

		function dataOntem() {
			var data = new Date();
			var dia = data.getDate() - 1;
			var mes = data.getMonth() + 1;
			var ano = data.getFullYear();
			var dataOntem = [dia, mes, ano].join('/');
			return dataOntem;
		}

		function dataLimiteSincronizacao() {
			var data = new Date();
			var dia = data.getDate();
			var mes = data.getMonth() + 1;
			if(dia > 6){
				dia = dia - 5;
			} else if (mes <= 2) {
				mes = 12;
				dia = 28;
			} else {
				dia = 28;
				mes = mes - 1;
			}
			var ano = data.getFullYear();
			var dataLimiteSincronizacao = [mes, dia, ano].join('/');
			return dataLimiteSincronizacao;
		}

		function horaAtual() {
			var data = new Date();
			var hora = (data.getHours()<10?'0':'') + data.getHours();
			var minutos = (data.getMinutes()<10?'0':'') + data.getMinutes();
			var horaAtual = [hora, minutos].join(':');
			return horaAtual;
		}

		return {
			dataAtual: dataAtual,
			dataOntem: dataOntem,
			dataLimiteSincronizacao: dataLimiteSincronizacao,
			horaAtual: horaAtual,
			dataNotificacao: dataNotificacaoNoturna
		}
	}]);