var burgerAppServices = angular.module('booking');
/*global $, Tools, angular*/

burgerAppServices.factory('booking', ['$http', function ($http)
{
    'use strict';
    var service = {};
    var parseUrl = 'https://api.parse.com/1/classes/';

    /** ****************** *
     * Gestion des beacons *
     ** ****************** */
    service.getBeacons = function ()
    {
        return $http({method: 'GET', url: parseUrl + 'beacon/'});
    };

    service.deleteBeacon = function (beacon)
    {
        if (!beacon) {
            return false;
        }
        return $http({method: 'DELETE', url: parseUrl + 'beacon/' + beacon.objectId});
    };

    service.editBeacon = function (beacon)
    {
        if (!beacon) {
            return false;
        }
        var method = ((beacon.objectId) ? 'PUT' : 'POST');
        return $http({
            url: parseUrl + 'beacon/' + (typeof(beacon.objectId) != 'undefined' ? beacon.objectId : ''),
            method: method,
            data: beacon
        });
    };

    /** **************** *
     * Gestion des zones *
     ** **************** */
    service.getZones = function ()
    {
        return $http({method: 'GET', url: parseUrl + 'zone/', params: {'include': 'beacon_id'}});
    };

    service.deleteZone = function (zone)
    {
        if (!zone) {
            return false;
        }
        return $http({method: 'DELETE', url: parseUrl + 'zone/' + zone.objectId});
    };

    service.editZone = function (zone)
    {
        if (!zone) {
            return false;
        }
        var method = ((zone.objectId) ? 'PUT' : 'POST');

        if (zone.selected_beacon_id !== false) {
            zone.beacon_id = [];
            zone.beacon_id.push({"__type": "Pointer", "className": "beacon", "objectId": zone.selected_beacon_id});
        }

        delete zone.selected_zone_id;

        return $http({
            url: parseUrl + 'zone/' + (typeof(zone.objectId) != 'undefined' ? zone.objectId : ''),
            method: method,
            data: zone
        });
    };

    /** ****************** *
     * Gestion des coupons *
     ** ****************** */
    service.getCoupons = function ()
    {
        return $http({method: 'GET', url: parseUrl + 'coupon/', params: {'include': 'zone_id'}});
    };

    service.deleteCoupon = function (coupon)
    {
        if (!coupon) {
            return false;
        }
        return $http({method: 'DELETE', url: parseUrl + 'coupon/' + coupon.objectId});
    };

    service.editCoupon = function (coupon)
    {
        if (!coupon) {
            return false;
        }
        var method = ((coupon.objectId) ? 'PUT' : 'POST');

        if (coupon.selected_zone_id !== false) {
            coupon.zone_id = {"__type": "Pointer", "className": "zone", "objectId": coupon.selected_zone_id};
        }

        delete coupon.selected_zone_id;
        return $http({
            url: parseUrl + 'coupon/' + ((typeof(coupon.objectId) !== 'undefined') ? coupon.objectId : ''),
            method: method,
            data: coupon
        });
    };

    return service;
}]);
