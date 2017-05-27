// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('sejaGrato', ['ionic', 'ionic.cloud', 'app.controllers', 'app.routes', 'app.directives','app.services',])

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

.run(function($ionicPlatform, $rootScope) {
  $rootScope.lista = [];
  $rootScope.statusUsuario = false;
  $rootScope.dadosLocal = '';
  $ionicPlatform.ready(function() {
    
    // var push = PushNotification.init({
    //   android: {
    //     senderID: '748225522023'
    //   }
    // });


    // push.on('registration', function(data) {
    //   //data.registrationId
    // });

    // push.on('notification', function(data) {
    //   // data.message
    //   // data.title,
    //   // data.count
    //   // data.sound
    //   // data.image
    //   // data.additionalData
    // });

    // push.on('error', function(e) {
    //   // e.message
    // });

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
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