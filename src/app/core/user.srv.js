(function ()
{
    'use strict';

    angular
            .module('booking.core')
            .factory('userService', userService);

    userService.$inject = ['$firebaseArray', 'firebaseDataService'];

    function userService($firebaseArray, firebaseDataService)
    {

        var users = null;

        var service = {
            User: user,
            getUsers: getUsers,
            addUser: addUser,
            reset: reset
        };

        return service;

        ////////////

        function user(user)
        {
            this.name = '';
            this.type = '';
            this.icon = '';
            this.uid = user.uid;
            this.booked = false;
        }

        function getUsers()
        {
            if (!users) {
                users = $firebaseArray(firebaseDataService.users);
            }
            return users;
        }

        function addUser(user)
        {
            firebaseDataService.users.push(user);
        }

        function reset()
        {
            if (users) {
                users.$destroy();
                users = null;
            }
        }

    }

})();
