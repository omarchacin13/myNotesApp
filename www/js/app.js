(function() {


  angular.module('groceryList', ['ionic', 'firebase', 'mynotes.noteStore' ])

    .constant('FURL', 'https://groceries-reminder.firebaseio.com/')

    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('list', {
          url:'/list',
          templateUrl: 'templates/list.html',
          controller: 'ListCtrl'
        });

      $stateProvider
        .state('edit', {
          url:'/edit/:noteId',
          templateUrl: 'templates/edit.html',
          controller: 'EditCtrl'
        });

      $stateProvider
        .state('add', {
          url:'/add',
          templateUrl: 'templates/edit.html',
          controller: 'AddCtrl'
        });


      $urlRouterProvider.otherwise('/list')

    })

    .controller('ListCtrl', function ($scope, NoteStore) {

      $scope.reordering = false;
      $scope.notes = NoteStore.list();

      $scope.remove = function (noteId) {
        $scope.note = NoteStore.getNote(noteId);
        NoteStore.remove($scope.note);
      };

      $scope.move = function (note, fromIndex, toIndex) {
        NoteStore.move(note, fromIndex, toIndex)
      };

      $scope.toggleReordering = function () {
        $scope.reordering = !$scope.reordering;
      }
    })

    .controller('EditCtrl', function ($scope, $stateParams, $state, NoteStore) {

      $scope.noteId = $stateParams.noteId;

      $scope.note = NoteStore.getNote($scope.noteId);
      console.log('Edit note ', $scope.note);

      $scope.save = function () {
        NoteStore.updateNote($scope.note);
        $state.go('list')
      }
    })

    .controller('AddCtrl', function ($scope, $state, NoteStore) {
      $scope.note = {
        id: new Date().getTime().toString(),
        title: '',
        description: ''
      };

      $scope.save = function () {
        NoteStore.createNote($scope.note);
        $state.go('list')
      }
    })

    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    });

})();

