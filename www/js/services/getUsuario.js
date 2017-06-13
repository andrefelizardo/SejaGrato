angular.module('sejaGrato')
.factory('getUsuario', ['$q',
	function ($q) {

		function getUsuario() {

			if(localStorage.getItem('firebase:authUser:AIzaSyAl3rNUfKOgzjqyNpSL3JTW_6-0ocaj_FE:[DEFAULT]')) {
				var usuarioFirebase = localStorage.getItem('firebase:authUser:AIzaSyAl3rNUfKOgzjqyNpSL3JTW_6-0ocaj_FE:[DEFAULT]');
				var usuarioLocal = angular.fromJson(usuarioFirebase);

				return usuarioLocal;
			} else {
				return false;
			}

		}

		return {
			usuarioLocal: getUsuario
		};
	}])