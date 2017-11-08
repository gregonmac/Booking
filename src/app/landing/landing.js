(function ()
{
    'use strict';

    angular.module('booking.landing', []).controller('landing', ['$http', 'authService', function ($http, authService)
    {
        var vm = this;
        vm.isLoggedIn = authService.isLoggedIn;
        var keywords = [
            'southpark',
            'pixar',
            'futurama',
            'lego',
            'simpsons',
            'computer',
            'humor',
            'joke',
            'developer',
            'big+bang+theory',
            'breaking+bad',
            'family+guy',
        ];
        vm.keyword = keywords[Math.floor(Math.random() * keywords.length)];
        $http.get('https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + vm.keyword).then(
                function (response)
                {
                    vm.giphy = response.data.data;
                });
    }]);
})();