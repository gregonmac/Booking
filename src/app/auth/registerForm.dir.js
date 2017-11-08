(function() {
  'use strict';

  angular
    .module('booking.auth')
    .directive('ganRegisterForm', ganAuthForm);

  function ganAuthForm() {
    return {
      templateUrl: 'app/auth/registerForm.html',
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