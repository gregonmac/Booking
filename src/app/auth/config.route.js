(function ()
{
    'use strict';

    angular
            .module('booking.auth')
            .config(configFunction)
            .run(runFunction);

    configFunction.$inject = ['$routeProvider'];

    function configFunction($routeProvider)
    {
        $routeProvider.when('/register', {
            templateUrl: 'app/auth/register.html',
            controller: 'AuthController',
            controllerAs: 'vm'
        });
        $routeProvider.when('/forget', {
            templateUrl: 'app/auth/forget.html',
            controller: 'AuthController',
            controllerAs: 'vm'
        });
        $routeProvider.when('/login', {
            templateUrl: 'app/auth/login.html',
            controller: 'AuthController',
            controllerAs: 'vm'
        });
        $routeProvider.when('/email', {
            templateUrl: 'app/auth/email.html',
            controller: 'AuthController',
            controllerAs: 'vm'
        });
        $routeProvider.when('/confirm/:code', {
            templateUrl: 'app/auth/email.html',
            controller: 'AuthController',
            controllerAs: 'vm'
        });
    }

    runFunction.$inject = ['$location', 'authService', 'PROTECTED_PATHS'];

    function runFunction($location, authService, PROTECTED_PATHS)
    {

        authService.firebaseAuthObject.$onAuthStateChanged(function (authData)
        {
            if (!authData && pathIsProtected($location.path())) {
                authService.logout();
                $location.path('/login');
            }
        });

        function pathIsProtected(path)
        {
            return PROTECTED_PATHS.indexOf(path) !== -1;
        }
    }

})();