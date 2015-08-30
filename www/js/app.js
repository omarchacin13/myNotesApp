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

      $stateProvider
        .state('login', {
          url:'/login',
          templateUrl: 'templates/login.html',
          controller: 'AuthCtrl'
        });


      $urlRouterProvider.otherwise('/login')

    })

    .controller('ListCtrl', function ($scope, NoteStore, auth, $state) {

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
      };

      $scope.logout = function() {
        auth.logout();
        console.log('Loggin out');
        $state.go('login');
      }
    })

    .controller('EditCtrl', function ($scope, $stateParams, $state, NoteStore) {

      $scope.title = "Edit Grocery";
      $scope.noteId = $stateParams.noteId;
      $scope.currentUser = auth.user;
      console.log('Current user ', $scope.currentUser);

      $scope.note = NoteStore.getNote($scope.noteId);
      console.log('Edit note ', $scope.note);

      $scope.save = function () {
        NoteStore.updateNote($scope.note);
        $state.go('list')
      }
    })

    .controller('AddCtrl', function ($scope, $state, NoteStore) {

      $scope.title = "New Grocery";
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

    .controller('AuthCtrl', function ($scope, auth, $state) {
      $scope.title = 'AuthCtrl';

      $scope.register = function(user) {
        console.log('calling')
        auth.register(user)
          .then(function() {
            console.log('Register successfully');
            $state.go('list')
          }, function(error) {
            console.log('Error ', error);
          });
      };

      $scope.login= function(user) {
        auth.login(user)
          .then(function() {
            console.log('Login successfully');
            $state.go('list')
          }, function(error) {
            console.log('Error ', error);
          });
      };

      $scope.changePassword = function(user) {
        auth.changePassword(user)
          .then(function() {

            /*Reset form*/
            $scope.user.email = '';
            $scope.user.oldPass = '';
            $scope.user.newPass = '';

            console.log('Password changed successfully')
          }, function(error) {
            console.log('error ', error);
          })
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

