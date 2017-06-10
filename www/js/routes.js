angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  
  

  .state('menu.sejaGrato', {
    url: '/home',
    views: {
      'side-menu21': {
        templateUrl: 'templates/sejaGrato.html',
        controller: 'sejaGratoCtrl'
      }
    }
  })

  .state('tutorial', {
    url: '/tutorial',
    templateUrl: 'templates/tutorial.html'
  })

  .state('tutorial-sync', {
    url: '/tutorial-sync',
    templateUrl: 'templates/tutorialLogin.html'
  })

  .state('menu.sobre', {
    url: '/sobre',
    views: {
      'side-menu21': {
        templateUrl: 'templates/sobre.html',
        controller: 'sobreCtrl'
      }
    }
  })

  .state('menu.criarConta', {
    url: '/criarConta',
    views: {
      'side-menu21':{
        templateUrl: 'templates/criarConta.html'
      }
    }
  })

  .state('menu.login', {
    url: '/login',
    views: {
      'side-menu21': {
        templateUrl: 'templates/login.html'
      }
    }
  })  

  .state('menu.configuracoes', {
    url: '/configuracoes',
    views: {
      'side-menu21': {
        templateUrl: 'templates/configuracoes.html'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  if(localStorage.getItem('mensagensSejaGrato')) {
    $urlRouterProvider.otherwise('/side-menu21/home')
  } else {
    $urlRouterProvider.otherwise('/tutorial')
  }

  

});