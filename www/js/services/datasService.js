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

		function dataJornada(hour) {
			var data = new Date();
			if(data.getHours() < hour) {
				data.setDate(data.getDate());
			} else {
				data.setDate(data.getDate() + 1);
			}
			data.setHours(hour);
			data.setMinutes(0);
			data.setSeconds(0);
			var dataJornada = new Date(data);
			return dataJornada;
		}

		function dataLembrancaSemanal() {
			var data = new Date();
			data.setDate(data.getDate() + 5);
			data.setHours(19);
			data.setMinutes(0);
			data.setSeconds(0);
			var dataLembrancaSemanal = new Date(data);
			return dataLembrancaSemanal;
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
			dataNotificacao: dataJornada,
			dataLembranca: dataLembrancaSemanal
		}
	}]);