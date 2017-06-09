angular.module('sejaGrato')
.factory('verificaInternet', 
	function () {
		
		function verificarInternet() {
			if(window.Connection) {
				if(navigator.connection.type !== Connection.NONE) {
					return true;
				} else {
					return false;
				}
			}
		}

		return {
			verificar: verificarInternet
		};
	})