(function() {
  'use strict';

  angular
    .module('booking.core')
    .factory('partyService', partyService);

  partyService.$inject = ['$firebaseArray', 'firebaseDataService'];

  function partyService($firebaseArray, firebaseDataService) {

    var parties = null;
    
    var service = {
      Party: Party,
      getPartiesByUser: getPartiesByUser,
      reset: reset
    };

    return service;

    ////////////

    function Party() {
      this.name = '';
      this.phone = '';
      this.size = '';
      this.done = false;
      this.notified = false;
    }

    function getPartiesByUser(uid) {
      if (!parties) {
        parties = $firebaseArray(firebaseDataService.users.child(uid).child('parties'));
      }
      return parties;
    }

    function reset() {
      if (parties) {
        parties.$destroy();
        parties = null;
      }
    }

  }

})();
