/**
 * Created by ganne on 05/11/2016.
 */
(function ()
{
    angular.module('booking.user', [])
            .config(configFunction)
            .controller('userController', userController);

    userController.$inject = ['userService', 'user'];

    function userController(userService, user)
    {
        var vm = this;

        vm.users = userService.getUsers();
        vm.newUser = new userService.User(user);
        vm.addUser = addUser;
        vm.removeUser = removeUser;
        vm.updateUser = updateUser;

//        user.providerData.forEach(function (profile) {
//            console.log("Sign-in provider: "+profile.providerId);
//            console.log("  Provider-specific UID: "+profile.uid);
//            console.log("  Name: "+profile.displayName);
//            console.log("  Email: "+profile.email);
//            console.log("  Photo URL: "+profile.photoURL);
//        });
//
//        user.updateProfile({
//            displayName: "Jane Q. User",
//            photoURL: "https://example.com/jane-q-user/profile.jpg",
//            metadata:{role:"admin"}
//        }).then(function() {
//            // Update successful.
//        }, function(error) {
//            // An error happened.
//        });


        function addUser()
        {
            userService.addUser(vm.newUser);
            vm.newUser = new userService.User(user);
        }
        function currentUser(user)
        {
            vm.users.$remove(user)
        }
        function removeUser(user)
        {
            vm.users.$remove(user)
        }

        function updateUser(user){
            vm.users.$save(user);
        }
    }

    configFunction.$inject = ['$routeProvider'];

    function configFunction($routeProvider)
    {
        $routeProvider
                .when('/user', {
                    templateUrl: 'app/user/main.html',
                    controller: 'userController',
                    controllerAs: 'vm',
                    resolve: {user: resolveUser}
                });
    }

    resolveUser.$inject = ['authService'];

    function resolveUser(authService)
    {
        return authService.firebaseAuthObject.$requireSignIn();
    }
})();
