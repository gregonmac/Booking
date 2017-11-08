(function() {
  'use strict';

  angular
    .module('booking.core')
    .factory('firebaseDataService', firebaseDataService);

  function firebaseDataService() {
    var root = firebase.database().ref();

    var service = {
      root: root,
      users: root.child('users'),
      emails: root.child('emails'),
      projects: root.child('projects'),
      logs: root.child('logs'),
      textMessages: root.child('textMessages')
    };

    return service;
  }

})();
