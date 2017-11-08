(function ()
{
    'use strict';

    angular
            .module('booking.auth')
            .controller('AuthController', AuthController);

    AuthController.$inject = ['$location', 'authService', 'projectService'];

    function AuthController($location, authService, projectService)
    {
        var vm = this;

        vm.error = null;

        vm.register = register;
        vm.login = login;
        vm.passwordRetreive = passwordRetreive;

        function register(user)
        {
            return authService.register(user)
                    .then(function ()
                    {
                        $location.path('/email');
                    })
                    .catch(function (error)
                    {
                        vm.error = error;
                    });
        }

        function login(user)
        {
            return authService.login(user)
                    .then(function (u)
                    {
                        $location.path('/project/booking');
                    })
                    .catch(function (error)
                    {
                        vm.error = error;
                    });
        }

        function passwordRetreive(email)
        {
            return authService.sendPasswordResetEmail(email)
                    .then(function ()
                    {
                        $location.path('/login');
                    })
                    .catch(function (error)
                    {
                        vm.error = error;
                        console.log(vm.error);
                    });
        }
    }

})();