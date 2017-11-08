(function() {
  'use strict';

  angular
    .module('booking.auth')
    .directive('ganAuthForm', ganAuthForm);

  function ganAuthForm() {
    return {
      templateUrl: 'app/auth/authForm.html',
      restrict: 'E',
      controller: AuthFormController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        error: '=',
        formTitle: '@',
        submitAction: '&'
      }
    };
  }

  function AuthFormController() {
    var vm = this;

    vm.user = {
      email: '',
      password: ''
    };
  }

})();