// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('sejaGrato', ['ionic', 'ngCordova', 'oc.lazyLoad', 'app.routes'])

.config(function($ionicConfigProvider, $sceDelegateProvider){

  // $ionicCloudProvider.init({
  //   "core": {
  //     "app_id": "4300131d"
  //   },
  //   "push": {
  //     "sender_id": "748225522023",
  //     "pluginConfig": {
  //       "android": {
  //         "iconColor": "#ff8441"
  //       }
  //     }
  //   }
  // });

  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

})

.run(function($ionicPlatform, $rootScope) {
  $rootScope.lista = [];
  $rootScope.statusUsuario = false;
  $rootScope.dadosLocal = '';
  $ionicPlatform.ready(function() {

    if(!localStorage.getItem('configuracoes')) {
      var configuracoes = {notificacaoNoturna: true};

      configuracoes = angular.toJson(configuracoes);

      localStorage.setItem('configuracoes', configuracoes);
    }

    var notificationOpenedCallback = function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      alert(JSON.stringify(jsonData));
    };

    window.plugins.OneSignal
    .startInit("e42d444b-75b3-4cd0-bd7e-4150580f400b")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    // Google Analytics
    if (typeof analytics !== undefined) {
      analytics.startTrackerWithId('UA-101037639-1');
    } else {
     console.log('Google Analytics indisponível') ;
   }
 });
})

/*
  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.
  */
  .directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
      restrict: "A",  
      controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

        function stopDrag(){
          $ionicSideMenuDelegate.canDragContent(false);
        }

        function allowDrag(){
          $ionicSideMenuDelegate.canDragContent(true);
        }

        $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
        $element.on('touchstart', stopDrag);
        $element.on('touchend', allowDrag);
        $element.on('mousedown', stopDrag);
        $element.on('mouseup', allowDrag);

      }]
    };
  }])

/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
  */
  .directive('hrefInappbrowser', function() {
    return {
      restrict: 'A',
      replace: false,
      transclude: false,
      link: function(scope, element, attrs) {
        var href = attrs['hrefInappbrowser'];

        attrs.$observe('hrefInappbrowser', function(val){
          href = val;
        });

        element.bind('click', function (event) {

          window.open(href, '_system', 'location=yes');

          event.preventDefault();
          event.stopPropagation();

        });
      }
    };
  });