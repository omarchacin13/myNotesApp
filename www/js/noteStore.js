angular
  .module('mynotes.noteStore', [])
  .factory('NoteStore', function ($firebaseArray, $firebaseObject, FURL) {

    /*var notes = angular.fromJson(window.localStorage['notes'] || '[]');*/

    /*function persits() {
      window.localStorage['notes'] = angular.toJson(notes);
    }*/

    var ref = new Firebase(FURL);
    var notes = $firebaseArray(ref.child('tasks'));

  var service = {
    list: list,
    getNote : getNote,
    createNote: createNote,
    updateNote: updateNote,
    remove: remove,
    move: move
  };

  return service;

  ////////////////

  function list() {
    return notes;
  }

  function getNote(noteId) {
    return $firebaseObject(ref.child('tasks').child(noteId));
  }

  function updateNote(note) {
    note.$save();
  }

  function createNote(note) {
    notes.$add(note);
  }

  function remove(note) {
    note.$remove();
  }

  function move(note, fromIndex, toIndex) {
    notes.splice(fromIndex, 1);
    notes.splice(toIndex, 0, note);
    persits();
  }


});
