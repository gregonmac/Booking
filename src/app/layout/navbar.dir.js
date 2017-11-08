(function ()
{
    'use strict';

    angular
            .module('booking.layout')
            .directive('ganNavbar', ganNavbar);

    function ganNavbar()
    {
        return {
            templateUrl: 'app/layout/navbar.html',
            restrict: 'E',
            scope: {},
            controller: NavbarController,
            controllerAs: 'vm'
        };
    }

    NavbarController.$inject = ['$location', 'authService'];

    function NavbarController($location, authService)
    {
        var vm = this;

        vm.isLoggedIn = authService.isLoggedIn;
        vm.logout = logout;
        vm.isCurrent = isCurrent;
        vm.isAdmin = authService.isAdmin;
        vm.isLoggedIn= authService.isLoggedIn;

        function isCurrent(path)
        {
            return $location.path() === path;
        }


        function logout()
        {
            authService.logout();
            $location.path('/');
        }
    }

})();