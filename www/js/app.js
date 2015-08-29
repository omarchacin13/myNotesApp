(function() {

  var notes = [
    {
      id: '1',
      title: 'First note',
      description: 'This is my first note'
    },
    {
      id: '2',
      title: 'Secondnote',
      description: 'This is my second note'
    }
  ];

  function getNote(noteId) {
    for (var i=0; i < notes.length; i++) {
      if (notes[i].id === noteId) {
        return notes[i]
      }
    }
    return undefined;
  }

  function updateNote(note) {
    console.log('new note ', note);
    for (var i=0; i < notes.length; i++) {
      if (notes[i].id === note.id) {
        notes[i] = note;
        return
      }
    }
  }

  angular.module('starter', ['ionic'])

    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('list', {
          url:'/list',
          templateUrl: 'templates/list.html'
        });

      $stateProvider
        .state('edit', {
          url:'/edit/:noteId',
          templateUrl: 'templates/edit.html'
        });


      $urlRouterProvider.otherwise('/list')

    })

    .controller('ListCtrl', function ($scope) {
        $scope.notes = notes;
    })

    .controller('EditCtrl', function ($scope, $stateParams, $state) {
      $scope.noteId = $stateParams.noteId;

      $scope.note = angular.copy(getNote($stateParams.noteId));

      $scope.save = function () {
        updateNote($scope.note);
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

