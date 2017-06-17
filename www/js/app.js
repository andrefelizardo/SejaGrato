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

    if(typeof analytics !== undefined) {
      analytics.startTrackerWithId('UA-101037639-1');
      // alert('tem analytics');
    }

    var notificationOpenedCallback = function(jsonData) {
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