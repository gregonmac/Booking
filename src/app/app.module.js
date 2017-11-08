(function ()
{
    'use strict';

    angular
            .module('app', [
                // Angular modules.
                'ngRoute',

                // Third party modules.
                'firebase',
                'ui.bootstrap',

                // Custom modules.
                'booking.auth',
                'booking.core',
                'booking.landing',
                'booking.layout',
//                'booking.waitList',
                'booking.user',
                'booking.project'
            ])
            .config(configFunction)
            .run(runFunction);

    configFunction.$inject = ['$routeProvider'];

    function configFunction($routeProvider)
    {
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ) {
        }
        else {
            if (Notification && Notification.permission !== 'denied') {
                Notification.requestPermission();
            }
        }

        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }

    runFunction.$inject = ['$rootScope', '$location'];

    function runFunction($rootScope, $location)
    {
        $rootScope.$on('$routeChangeError', function (event, next, previous, error)
        {
            if (error === "AUTH_REQUIRED") {
                $location.path('/');
            }
        });
    }

})();
