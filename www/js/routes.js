angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

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
            resolve: {
              loadDependencies: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                  {
                    serie: true,
                    files: ['js/services/sincronizacaoFirebase.js', 'js/services/getUsuario.js', 'js/services/verificaInternet.js', 'js/services/datasService.js', 'js/services/loginFirebase.js', 'js/controllers/homeController.js', 'css/home.css']
                  }
                ]);
              }
            }
          }
        }
      })

      .state('tutorial', {
        url: '/tutorial',
        templateUrl: 'templates/tutorial.html',
        resolve: {
          loadController: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              {
                files: ['js/controllers/tutorialController.js', 'css/tutorial.css']
              }
            ]);
          }
        }
      })

      .state('tutorial-sync', {
        url: '/tutorial-sync',
        templateUrl: 'templates/tutorialLogin.html',
        resolve: {
          loadController: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              {
                files: ['js/controllers/tutorialLoginController.js', 'css/tutorialLogin.css']
              }
            ]);
          }
        }
      })

      .state('motivacional', {
        url: '/jornada-gratidao',
        templateUrl: 'templates/motivacional.html',
        resolve: {
          loadController: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              {
                files: ['js/controllers/motivacionalController.js', 'css/motivacional.css']
              }
            ]);
          }
        }
      })

      .state('menu.sobre', {
        url: '/sobre',
        views: {
          'side-menu21': {
            templateUrl: 'templates/sobre.html',
            resolve: {
              loadDependencies: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                  {
                    files: ['css/sobre.css']
                  }
                ]);
              }
            }
          }
        }
      })

      .state('menu.criarConta', {
        url: '/criarConta',
        views: {
          'side-menu21': {
            templateUrl: 'templates/criarConta.html',
            resolve: {
              loadDependencies: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                  {
                    serie: true,
                    files: ['js/services/criarContaFirebase.js', 'js/services/verificaInternet.js', 'js/controllers/criarContaController.js', 'css/criarConta.css']
                  }
                ]);
              }
            }
          }
        }
      })

      .state('menu.login', {
        url: '/login',
        views: {
          'side-menu21': {
            templateUrl: 'templates/login.html',
            resolve: {
              loadDependecies: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                  {
                    serie: true,
                    files: ['js/services/loginFirebase.js', 'js/services/verificaInternet.js', 'js/services/getUsuario.js', 'js/services/sincronizacaoFirebase.js', 'js/services/datasService.js', 'js/controllers/loginController.js', 'css/login.css']
                  }
                ]);
              }
            }
          }
        }
      })

      .state('menu.configuracoes', {
        url: '/configuracoes',
        views: {
          'side-menu21': {
            templateUrl: 'templates/configuracoes.html',
            resolve: {
              loadDependencies: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                  {
                    serie: true,
                    files: ['js/services/getUsuario.js', 'js/services/datasService.js', 'js/controllers/configuracoesController.js']
                  }
                ]);
              }
            }
          }
        }
      })

      .state('menu', {
        url: '/side-menu21',
        templateUrl: 'templates/menu.html',
        resolve: {
          loadDependencies: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              {
                serie: true,
                files: ['js/services/loginFirebase.js', 'js/services/getUsuario.js', 'js/controllers/menuController.js', 'css/menu.css']
              }
            ])
          }
        }
      })

    if (localStorage.getItem('mensagensSejaGrato')) {
      $urlRouterProvider.otherwise('/side-menu21/home')
    } else {
      $urlRouterProvider.otherwise('/tutorial')
    }



  });