angular.module('app.controllers', ['firebase'])

  .controller('raspberryFireCtrl', ['$scope', '$stateParams', '$state', 'Actions',
    function ($scope, $stateParams, $state, Actions) {

      $scope.actions = Actions;

      $scope.blink_red_text = 'Blink Red LED';
      $scope.blink_green_text = 'Blink Green LED';

      function blinkCreate(action, speed, text, color) {
        $scope.actions.$add({
          action: action,
          speed: speed * 1000,
          color: color,
          text: text,
          date: Date.now()
        });
      }

      $scope.blink = function (color) {
        if (color == 'red') {
          if ($scope.blink_red_text == 'Blink Red LED') {
            $scope.blink_red_text = 'STOP';
            blinkCreate('blink', $scope.ledData.blink_speed, `Blinking Red LED in ${$scope.ledData.blink_speed} speed`, 'red');
          } else {
            $scope.blink_red_text = 'Blink Red LED';
            blinkCreate('stop', $scope.ledData.blink_speed, `Red LED blinking stopped`, 'red');
          }
        } else if (color == 'green') {
          if ($scope.blink_green_text == 'Blink Green LED') {
            $scope.blink_green_text = 'STOP'
            blinkCreate('blink', $scope.ledData.blink_speed, `Blinking Green LED in ${$scope.ledData.blink_speed} speed`, 'green');
          } else {
            $scope.blink_green_text = 'Blink Green LED';
            blinkCreate('stop', $scope.ledData.blink_speed, `Green LED blinking stopped`, 'green');
          }
        }
      }

      $scope.ledData = {
        red_led: false,
        green_led: false,
        blink_speed: null
      }

      $scope.logs = function () {
        $state.go('logs')
      }

      $scope.toggleRedLED = function () {
        if ($scope.ledData.red_led) {
          $scope.actions.$add({
            action: 'on',
            color: 'red',
            text: 'Turned on Red LED',
            date: Date.now()
          })
        } else {
          $scope.actions.$add({
            action: 'off',
            color: 'red',
            text: 'Turned off Red LED',
            date: Date.now()
          })
        }
      }

      $scope.toggleGreenLED = function () {
        if ($scope.ledData.green_led) {
          $scope.actions.$add({
            action: 'on',
            color: 'green',
            text: 'Turned on Green LED',
            date: Date.now()
          })
        } else {
          $scope.actions.$add({
            action: 'off',
            color: 'green',
            text: 'Turned off Green LED',
            date: Date.now()
          })
        }
      }

    }
  ])

  .controller('logsCtrl', ['$scope', '$stateParams', '$firebaseArray',
    function ($scope, $stateParams, $firebaseArray) {
      var actionsRef = firebase.database().ref('actions');
      $scope.actions = $firebaseArray(actionsRef);

    }
  ])
