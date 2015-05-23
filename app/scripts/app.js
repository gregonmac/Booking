'use strict';

/**
 * @ngdoc overview
 * @name 1664App
 * @description
 * # 1664App
 *
 * Main module of the application.
 */
angular
        .module('booking', [
            'ngCookies',
            'ngResource',
            'ngRoute',
            'ngMaterial'
        ])
        .config(function ($routeProvider, $httpProvider)
        {
            $httpProvider.defaults.headers.common["X-Parse-Application-Id"] =
            'JTmZcfjmfr8g6M0hjBnabTi9VMESVjVlwrtxfxpN';
            $httpProvider.defaults.headers.common["X-Parse-REST-API-Key"] =
            'HhsRabWUqBVZHbn3wsoPkVrVd2G3kDLjW4c53uIH';
            $routeProvider
                    .when('/', {
                        templateUrl: 'views/main.html',
                        controller: 'MainCtrl',
                        controllerAs: 'booking'
                    })
                    .otherwise({
                        redirectTo: '/#/'
                    });
        });
