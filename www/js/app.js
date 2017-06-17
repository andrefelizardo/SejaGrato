angular.module('sejaGrato', ['ionic', 'ngCordova', 'ionic.cloud', 'oc.lazyLoad', 'app.routes'])

.config(function($ionicConfigProvider, $sceDelegateProvider, $ionicCloudProvider){

  $ionicCloudProvider.init({
    "core": {
      "app_id": "4300131d"
    },
    "push": {
      "sender_id": "748225522023",
      "pluginConfig": {
        "android": {
          "iconColor": "#ff8441"
        }
      }
    }
  });

  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

})

.run(function($ionicPlatform, $rootScope, $cordovaLocalNotification, $ionicPopup) {
  $rootScope.lista = [];
  $rootScope.statusUsuario = false;
  $rootScope.dadosLocal = '';
  $ionicPlatform.ready(function() {

    if(typeof analytics !== undefined) {
      analytics.startTrackerWithId('UA-101037639-1');
    }

    if(!localStorage.getItem('configuracoes')) {
      alert('não tem configurações');
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
        alert(dataNotificacaoNoturna);
        return dataNotificacaoNoturna;
      }
      var hoje_as_9_pm = new Date(dataNotificacaoNoturna());
      $cordovaLocalNotification.schedule({
        id: 2,
        title: 'Seja Grato!',
        text: 'Pelo que você se sentiu grato hoje?',
        firstAt: hoje_as_9_pm,
        every: 'day'
      }).then(function(){
        alert('agendada para ' + hoje_as_9_pm);
      });
      var configuracoes = {
        notificacaoNoturna: true
      };
      configuracoes = angular.toJson(configuracoes);
      localStorage.setItem('configuracoes', configuracoes);
    }

    $rootScope.$on('$cordovaLocalNotification:click', function(notification, state) {
      if(state.id == 2 || state.id == 3) {
        var alertPopup = $ionicPopup.alert({
          title: 'Seja Grato todos os dias',
          template: 'Pelo que você se sentiu grato hoje?'
        });
        $ionicHistory.nexViewOptions({
          disableBack: true
        });
        $state.go('menu.sejaGrato');
      }
    });

    var notificationOpenedCallback = function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      alert(JSON.stringify(jsonData.payload.title));
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