angular.module('sejaGrato').factory('getMensagens', [function () {
	function getLista() {
		var userID = firebase.auth().currentUser.uid;
		firebase.database().ref('mensagens/').child(userID).once('value').then(function(snapshot){
			console.log(snapshot.val());
		});
	}


	return {
			getLista: getLista
	};
}])